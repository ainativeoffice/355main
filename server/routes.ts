import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { createContact, updateContact } from "./hubspot";
import { validateEmail, validateWaitlistEntry } from "@shared/validation";
import { z } from "zod";
import { db } from "./db";
import { members, memberPreferences } from "@shared/schema";
import { eq } from "drizzle-orm";
import { sendSlackNotification, formatWaitlistNotification, formatMemberNotification } from "./slack";
import { sendWaitlistConfirmation, sendMemberConfirmation } from "./email";
import { verifyRecaptcha } from "./recaptcha";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute per IP

function rateLimit(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    next();
    return;
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    res.status(429).json({ 
      success: false, 
      message: "Too many requests. Please try again in a minute." 
    });
    return;
  }
  
  record.count++;
  next();
}

// Cleanup old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  const entries = Array.from(rateLimitMap.entries());
  for (const [ip, record] of entries) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW_MS);

// Validation schemas
const memberSchema = z.object({
  email: z.string().email("Valid email is required"),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  company: z.string().max(200).optional(),
  jobRole: z.string().max(100).optional(),
  teamSize: z.string().max(20).optional(),
  moveInTiming: z.string().max(50).optional(),
  brandSource: z.string().max(50).optional(),
});

const preferencesSchema = z.object({
  workspaceArchetype: z.string().max(50).optional(),
  privateOfficeDesks: z.number().int().min(0).max(1000).optional(),
  hybridMemberships: z.number().int().min(0).max(1000).optional(),
  amenities: z.array(z.string().max(50)).max(20).optional(),
  notes: z.string().max(2000).optional(),
}).optional();

const memberRequestSchema = z.object({
  member: memberSchema,
  preferences: preferencesSchema,
});

function mapTeamSizeToHubSpot(teamSize: string): string {
  const mapping: Record<string, string> = {
    "1": "1-5",
    "2-5": "1-5",
    "6-15": "5-25",
    "16-30": "25-50",
    "30+": "25-50",
  };
  return mapping[teamSize] || teamSize;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Legacy IA (coworking) → Sovereign Shells IA, plus removed app-only routes.
  // Every legacy URL 301s to its best-fit new destination to preserve SEO/link
  // equity and avoid sending bookmarked/indexed links to the 404 page.
  const legacyRedirects: Record<string, string> = {
    // Old coworking "solutions" pages → The Shells
    '/solutions': '/shells',
    '/solutions/custom-offices': '/shells',
    '/solutions/private-offices': '/shells',
    '/solutions/hybrid': '/shells',
    // Audience landing pages → Inquiry (RFC lead form)
    '/enterprise': '/inquiry',
    '/landlords': '/inquiry',
    '/brokers': '/inquiry',
    // Tour flow → Inquiry
    '/book-a-tour': '/inquiry',
    '/tour-confirmed': '/inquiry',
    // Removed app-only routes → Home
    '/dashboard': '/',
    '/preferences': '/',
    '/join': '/',
    '/auth-error': '/',
    '/admin': '/',
    '/admin/login': '/',
    '/admin/members': '/',
    '/admin/testimonials': '/',
    '/admin/news': '/',
  };

  // Single middleware handles both legacy redirects and trailing-slash
  // canonicalization so a legacy URL (even with a trailing slash) resolves to
  // its destination in exactly one 301 hop.
  app.use((req, res, next) => {
    const hasTrailingSlash = req.path !== '/' && req.path.endsWith('/');
    const cleanPath = hasTrailingSlash ? req.path.slice(0, -1) : req.path;
    const query = req.url.slice(req.path.length);

    const destination = legacyRedirects[cleanPath];
    if (destination) {
      return res.redirect(301, destination + query);
    }

    if (hasTrailingSlash) {
      return res.redirect(301, cleanPath + query);
    }

    next();
  });

  // Health check endpoint
  app.get("/api/health", async (req, res) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        hubspot: { status: "configured" }
      }
    });
  });

  // Simple waitlist endpoint - saves to database first, then syncs to HubSpot
  app.post("/api/waitlist", rateLimit, async (req, res) => {
    try {
      const { email, recaptchaToken } = req.body;

      // Verify reCAPTCHA first
      const recaptchaResult = await verifyRecaptcha(recaptchaToken, "waitlist");
      if (!recaptchaResult.valid) {
        console.log(`[reCAPTCHA] Blocked waitlist submission: ${recaptchaResult.error}`);
        res.status(400).json({ 
          success: false, 
          message: "Please try again. If the problem persists, contact us directly at leasing@355main.com"
        });
        return;
      }
      
      const validation = validateWaitlistEntry({ email });
      if (!validation.valid) {
        res.status(400).json({ 
          success: false, 
          message: validation.errors[0] || "Invalid input"
        });
        return;
      }

      // Step 1: Save to database first (so lead is never lost)
      let memberId: number;
      let isExisting = false;
      
      try {
        const existing = await db.select().from(members).where(eq(members.email, email)).limit(1);
        if (existing.length > 0 && existing[0]) {
          memberId = existing[0].id;
          isExisting = true;
        } else {
          const result = await db.insert(members).values({ email }).returning();
          const newMember = result[0];
          if (!newMember) throw new Error("Failed to insert member");
          memberId = newMember.id;
          console.log(`[DB] New waitlist member saved: ${email} (ID: ${memberId})`);
        }
      } catch (dbError: any) {
        console.error("[DB] Failed to save waitlist entry:", dbError);
        res.status(500).json({ 
          success: false, 
          message: "Failed to join waitlist. Please try again." 
        });
        return;
      }

      let hubspotContactId: string | null = null;
      try {
        const brandSource = req.body.brandSource || "355main";
        const contact = await createContact({
          email: email,
          lifecyclestage: "lead",
          hs_lead_status: "NEW",
          message: `Source: ${brandSource} Waitlist`
        });
        hubspotContactId = contact.id;
        await db.update(members).set({ hubspotContactId }).where(eq(members.id, memberId));
        console.log(`[HubSpot] Contact synced: ${email} -> ${hubspotContactId}`);
      } catch (hubspotError: any) {
        if (hubspotError.body?.category === "CONFLICT") {
          console.log(`[HubSpot] Contact already exists: ${email}`);
        } else {
          console.error(`[HubSpot] Sync failed for ${email}:`, hubspotError.message);
        }
      }

      // Step 3: Send notifications (best effort, non-blocking)
      if (!isExisting) {
        const brandSource = req.body.brandSource || "355main";
        sendSlackNotification(formatWaitlistNotification(email, brandSource)).catch(() => {});
        sendWaitlistConfirmation(email).catch(() => {});
      }

      // Return a uniform message regardless of whether the email already existed.
      // Varying the response would let anyone probe whether a given address is in
      // the lead database (email-oracle vulnerability).
      res.json({ 
        success: true, 
        message: "Successfully joined the waitlist!"
      });
    } catch (error: any) {
      console.error("Waitlist error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to join waitlist. Please try again." 
      });
    }
  });

  // Full waitlist with preferences - saves to database first, then syncs to HubSpot
  app.post("/api/members", rateLimit, async (req, res) => {
    // Verify reCAPTCHA first
    const recaptchaToken = req.body.recaptchaToken;
    const recaptchaResult = await verifyRecaptcha(recaptchaToken, "members");
    if (!recaptchaResult.valid) {
      console.log(`[reCAPTCHA] Blocked member submission: ${recaptchaResult.error}`);
      res.status(400).json({ 
        success: false, 
        message: "Please try again. If the problem persists, contact us directly at leasing@355main.com"
      });
      return;
    }

    // Validate request body
    const parseResult = memberRequestSchema.safeParse(req.body);
    if (!parseResult.success) {
      const errors = parseResult.error.errors.map(e => e.message).join(", ");
      res.status(400).json({ 
        success: false, 
        message: errors || "Invalid request data"
      });
      return;
    }

    const { member, preferences } = parseResult.data;

    // Step 1: Save to database first (so lead is never lost).
    // If the email is already on record we do NOT overwrite it — an unauthenticated
    // caller cannot prove ownership of the address, so allowing updates would let
    // anyone poison existing lead records (and propagate false data into HubSpot,
    // Slack, and email). Return a uniform success response so the response itself
    // does not reveal whether the address was already in the database.
    let memberId: number;
    let isExisting = false;

    try {
      const existing = await db.select().from(members).where(eq(members.email, member.email)).limit(1);
      const existingMember = existing[0];

      if (existingMember) {
        // Email already registered — silently short-circuit without touching data.
        isExisting = true;
        console.log(`[DB] Duplicate member submission ignored: ${member.email}`);
      } else {
        const result = await db.insert(members).values({
          email: member.email,
          firstName: member.firstName,
          lastName: member.lastName,
          company: member.company,
          jobRole: member.jobRole,
          teamSize: member.teamSize,
          moveInTiming: member.moveInTiming,
        }).returning();
        const newMember = result[0];
        if (!newMember) throw new Error("Failed to insert member");
        memberId = newMember.id;

        // Save preferences only for new members
        if (preferences) {
          await db.insert(memberPreferences).values({
            memberId,
            workspaceArchetype: preferences.workspaceArchetype,
            privateOfficeDesks: preferences.privateOfficeDesks,
            hybridMemberships: preferences.hybridMemberships,
            amenities: preferences.amenities,
            notes: preferences.notes,
          });
        }

        console.log(`[DB] Member saved: ${member.email} (ID: ${memberId})`);
      }
    } catch (dbError: any) {
      console.error("[DB] Failed to save member:", dbError);
      res.status(500).json({ 
        success: false, 
        message: "We couldn't complete your sign-up. Please try again or contact us directly at leasing@355main.com"
      });
      return;
    }

    // Step 2 & 3: Sync to HubSpot and send notifications only for new records.
    // Skipping downstream fan-out for duplicate submissions prevents false Slack
    // alerts, unsolicited confirmation emails to victims, and HubSpot pollution.
    if (!isExisting) {
      const standardProperties: Record<string, string> = {
        email: member.email,
        lifecyclestage: "lead",
        hs_lead_status: "NEW"
      };
      
      if (member.firstName) standardProperties.firstname = member.firstName;
      if (member.lastName) standardProperties.lastname = member.lastName;
      if (member.company) standardProperties.company = member.company;
      if (member.jobRole) standardProperties.jobtitle = member.jobRole;
      if (member.teamSize) standardProperties.numemployees = mapTeamSizeToHubSpot(member.teamSize);
      
      const brandSource = member.brandSource || "355main";
      const notesParts: string[] = [`Source: ${brandSource}`];
      if (member.moveInTiming) notesParts.push(`Move-in timing: ${member.moveInTiming}`);
      if (preferences?.workspaceArchetype) notesParts.push(`Shell interest: ${preferences.workspaceArchetype}`);
      if (preferences?.privateOfficeDesks) notesParts.push(`Private desks needed: ${preferences.privateOfficeDesks}`);
      if (preferences?.hybridMemberships) notesParts.push(`Hybrid memberships: ${preferences.hybridMemberships}`);
      if (preferences?.amenities?.length) notesParts.push(`Amenities: ${preferences.amenities.join(", ")}`);
      if (preferences?.notes) notesParts.push(`Brief: ${preferences.notes}`);
      
      standardProperties.message = notesParts.join(" | ");

      let hubspotContactId: string | null = null;
      try {
        try {
          const contact = await createContact(standardProperties);
          hubspotContactId = contact.id;
        } catch (createError: any) {
          if (createError.body?.category === "CONFLICT") {
            const existingContactId = createError.body?.message?.match(/Existing ID: (\d+)/)?.[1];
            if (existingContactId) {
              await updateContact(existingContactId, standardProperties);
              hubspotContactId = existingContactId;
            }
            console.log(`[HubSpot] Contact updated: ${member.email}`);
          } else {
            console.error(`[HubSpot] Create failed for ${member.email}:`, createError.message);
          }
        }
        
        if (hubspotContactId) {
          await db.update(members).set({ hubspotContactId }).where(eq(members.id, memberId!));
          console.log(`[HubSpot] Contact synced: ${member.email} -> ${hubspotContactId}`);
        }
      } catch (connectionError: any) {
        console.error(`[HubSpot] Connection failed for ${member.email}:`, connectionError.message);
      }

      // Step 3: Send notifications (best effort, non-blocking)
      const memberWithSource = { ...member, brandSource: member.brandSource || "355main" };
      sendSlackNotification(formatMemberNotification(memberWithSource, preferences)).catch(() => {});
      sendMemberConfirmation(member).catch(() => {});
    }

    res.status(201).json({ 
      success: true, 
      message: "Welcome to 355 Main! We'll be in touch soon."
    });
  });

  return httpServer;
}
