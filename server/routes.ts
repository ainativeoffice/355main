import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { getUncachableHubSpotClient } from "./hubspot";
import { validateEmail, validateWaitlistEntry } from "@shared/validation";
import { z } from "zod";

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
});

const preferencesSchema = z.object({
  workspaceArchetype: z.string().max(50).optional(),
  privateOfficeDesks: z.number().int().min(0).max(1000).optional(),
  hybridMemberships: z.number().int().min(0).max(1000).optional(),
  amenities: z.array(z.string().max(50)).max(20).optional(),
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

  // Simple waitlist endpoint - just email to HubSpot
  app.post("/api/waitlist", rateLimit, async (req, res) => {
    try {
      const { email } = req.body;
      
      const validation = validateWaitlistEntry({ email });
      if (!validation.valid) {
        res.status(400).json({ 
          success: false, 
          message: validation.errors[0] || "Invalid input"
        });
        return;
      }

      const hubspotClient = await getUncachableHubSpotClient();

      const contactObj = {
        properties: {
          email: email,
          lifecyclestage: "lead",
          hs_lead_status: "NEW"
        }
      };

      const response = await hubspotClient.crm.contacts.basicApi.create(contactObj);

      res.json({ 
        success: true, 
        message: "Successfully joined the waitlist!",
        contactId: response.id 
      });
    } catch (error: any) {
      console.error("HubSpot API Error:", error);
      
      if (error.body?.category === "CONFLICT") {
        res.status(200).json({ 
          success: true, 
          message: "You're already on the waitlist!" 
        });
        return;
      }

      res.status(500).json({ 
        success: false, 
        message: "Failed to join waitlist. Please try again." 
      });
    }
  });

  // Full waitlist with preferences - sends to HubSpot
  app.post("/api/members", rateLimit, async (req, res) => {
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

    // Build HubSpot contact properties
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
    
    // Custom properties (if configured in HubSpot)
    if (member.moveInTiming) standardProperties.opus_move_in_timing = member.moveInTiming;
    if (preferences?.privateOfficeDesks) standardProperties.opus_private_desks = preferences.privateOfficeDesks.toString();
    if (preferences?.hybridMemberships) standardProperties.opus_hybrid_seats = preferences.hybridMemberships.toString();
    if (preferences?.amenities?.length) standardProperties.opus_amenities = preferences.amenities.join(", ");
    if (preferences?.workspaceArchetype) standardProperties.opus_workspace_type = preferences.workspaceArchetype;

    let hubspotSuccess = false;
    let hubspotError: string | null = null;

    try {
      const hubspotClient = await getUncachableHubSpotClient();
      
      try {
        await hubspotClient.crm.contacts.basicApi.create({
          properties: standardProperties
        });
        hubspotSuccess = true;
      } catch (createError: any) {
        if (createError.body?.category === "CONFLICT") {
          // Contact exists - try to update
          const existingContactId = createError.body?.message?.match(/Existing ID: (\d+)/)?.[1];
          if (existingContactId) {
            await hubspotClient.crm.contacts.basicApi.update(existingContactId, {
              properties: standardProperties
            });
            hubspotSuccess = true;
          } else {
            // Contact exists but couldn't update - still consider it a success
            hubspotSuccess = true;
          }
        } else {
          hubspotError = createError.message || "Failed to create contact";
          console.error("HubSpot create error:", createError);
        }
      }
    } catch (connectionError: any) {
      hubspotError = connectionError.message || "Connection failed";
      console.error("HubSpot connection error:", connectionError);
    }

    // Report actual HubSpot status
    if (hubspotSuccess) {
      res.status(201).json({ 
        success: true, 
        message: "Welcome to 355 Main! We'll be in touch soon."
      });
    } else {
      console.error("Lead capture failed for:", member.email, "Error:", hubspotError);
      res.status(500).json({ 
        success: false, 
        message: "We couldn't complete your sign-up. Please try again or contact us directly at leasing@355main.com"
      });
    }
  });

  return httpServer;
}
