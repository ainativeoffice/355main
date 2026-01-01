import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import bcrypt from "bcrypt";
import { WorkOS } from "@workos-inc/node";
import Stripe from "stripe";
import { storage } from "./storage";
import { pool } from "./db";
import { config } from "./config";
import { getUncachableHubSpotClient } from "./hubspot";
import { validateEmail, validateWaitlistEntry } from "@shared/validation";
import { insertTestimonialSchema, insertNewsSchema, insertMemberSchema, insertMemberPreferencesSchema } from "@shared/schema";

// Environment-aware credentials - resolved lazily in registerRoutes
let workos: WorkOS | null = null;
let stripe: Stripe | null = null;
let clientId: string | undefined;
let stripeWebhookSecret: string | undefined;

function getEnvironmentCredentials() {
  // Simplified: use same secrets for dev and production
  // Secrets are managed in Replit's Secrets panel
  return {
    workosApiKey: process.env.WORKOS_API_KEY,
    workosClientId: process.env.WORKOS_CLIENT_ID,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  };
}

// Membership tier pricing (price IDs would come from Stripe dashboard in production)
const MEMBERSHIP_TIERS = {
  free: {
    name: "Explorer",
    price: 0,
    features: ["Day pass access", "Community events", "Basic amenities"],
  },
  hybrid: {
    name: "Hybrid",
    price: 299,
    priceId: "price_hybrid_monthly", // Replace with actual Stripe price ID
    features: ["5 days/month access", "Dedicated desk hours", "All amenities", "Meeting room credits"],
  },
  private: {
    name: "Private Office",
    price: 599,
    priceId: "price_private_monthly", // Replace with actual Stripe price ID  
    features: ["Unlimited access", "Private office space", "All amenities", "Priority support"],
  },
  enterprise: {
    name: "Enterprise",
    price: null, // Custom pricing
    features: ["Custom floor plans", "Dedicated team spaces", "Concierge support", "Custom integrations"],
  },
};

declare module "express-session" {
  interface SessionData {
    adminId: number;
    adminUsername: string;
    // Member auth via WorkOS - per best practices, store tokens for refresh
    memberId: number;
    memberEmail: string;
    workosUserId: string;
    workosAccessToken: string;
    workosRefreshToken: string;
    workosTokenExpiresAt: number;
  }
}

const SALT_ROUNDS = 10;

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

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

function parseIdParam(id: string | undefined): number | null {
  if (!id) return null;
  const parsed = parseInt(id, 10);
  if (isNaN(parsed) || parsed <= 0) return null;
  return parsed;
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.adminId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  next();
}

async function requireStaff(req: Request, res: Response, next: NextFunction) {
  if (!req.session.memberId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  
  try {
    const member = await storage.getMemberById(req.session.memberId);
    if (!member || (member.role !== "admin" && member.role !== "staff")) {
      res.status(403).json({ message: "Forbidden - Staff access required" });
      return;
    }
    next();
  } catch {
    res.status(500).json({ message: "Authorization check failed" });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Lazy initialization of external service clients with validation
  const creds = getEnvironmentCredentials();
  const envName = config.isDevelopment ? "development" : "production";
  
  if (creds.workosApiKey) {
    workos = new WorkOS(creds.workosApiKey);
    clientId = creds.workosClientId;
    console.log(`[startup] WorkOS initialized for ${envName}`);
  } else {
    console.warn(`[startup] WorkOS not configured - missing API key for ${envName}`);
  }
  
  if (creds.stripeSecretKey) {
    stripe = new Stripe(creds.stripeSecretKey);
    stripeWebhookSecret = creds.webhookSecret;
    console.log(`[startup] Stripe initialized for ${envName}`);
  } else {
    console.warn(`[startup] Stripe not configured - missing secret key for ${envName}`);
  }
  
  const PgSession = connectPgSimple(session);
  
  app.use(session({
    store: new PgSession({
      pool: pool,
      tableName: 'session',
      createTableIfMissing: true,
      pruneSessionInterval: 60 * 15
    }),
    secret: process.env.SESSION_SECRET || "opus355-admin-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    }
  }));

  // ==========================================
  // Environment Config (for frontend)
  // ==========================================
  app.get("/api/config", (req, res) => {
    const isProduction = process.env.REPLIT_DEPLOYMENT === "1";
    res.json({
      isProduction,
      gaTrackingId: isProduction ? "G-2VR7386HM6" : null,
    });
  });

  // ==========================================
  // Health Check Endpoint
  // ==========================================
  app.get("/api/health", async (req, res) => {
    const health: {
      status: "healthy" | "degraded" | "unhealthy";
      timestamp: string;
      uptime: number;
      services: {
        database: { status: string; latency?: number };
        workos: { status: string };
        stripe: { status: string };
      };
    } = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        database: { status: "unknown" },
        workos: { status: workos ? "configured" : "not_configured" },
        stripe: { status: stripe ? "configured" : "not_configured" },
      },
    };

    // Check database connectivity
    try {
      const start = Date.now();
      await pool.query("SELECT 1");
      health.services.database = {
        status: "connected",
        latency: Date.now() - start,
      };
    } catch (error) {
      health.services.database = { status: "disconnected" };
      health.status = "unhealthy";
    }

    // Set overall status based on critical services
    if (health.services.database.status !== "connected") {
      health.status = "unhealthy";
    } else if (!workos || !stripe) {
      health.status = "degraded";
    }

    const statusCode = health.status === "unhealthy" ? 503 : 200;
    res.status(statusCode).json(health);
  });

  // ==========================================
  // WorkOS Authentication Routes
  // ==========================================

  // Get authorization URL for login
  app.get("/api/auth/login", (req, res) => {
    console.log("WorkOS login attempt - clientId exists:", !!clientId, "clientId prefix:", clientId?.substring(0, 10));
    if (!workos || !clientId) {
      console.error("WorkOS credentials not configured");
      res.status(500).json({ error: "Authentication not configured. Please contact support." });
      return;
    }

    // Use X-Forwarded-Proto header for proper HTTPS detection behind proxy
    const protocol = req.get("x-forwarded-proto") || req.protocol;
    const host = req.get("host");
    const redirectUri = `${protocol}://${host}/api/auth/callback`;
    
    console.log("WorkOS redirect URI:", redirectUri);
    
    const authorizationUrl = workos.userManagement.getAuthorizationUrl({
      provider: "authkit",
      redirectUri,
      clientId,
    });

    console.log("WorkOS authorization URL:", authorizationUrl);
    res.redirect(authorizationUrl);
  });

  // Handle OAuth callback from WorkOS
  app.get("/api/auth/callback", async (req, res) => {
    try {
      if (!workos || !clientId) {
        console.error("WorkOS credentials not configured");
        res.redirect("/?error=auth_not_configured");
        return;
      }

      const { code } = req.query;
      
      if (!code || typeof code !== "string") {
        res.redirect("/?error=missing_code");
        return;
      }

      // Per WorkOS best practices: get user + tokens from auth code
      const authResult = await workos.userManagement.authenticateWithCode({
        clientId,
        code,
      });

      const { user, accessToken, refreshToken } = authResult;

      // Validate that user has a verified email
      if (!user.email) {
        console.error("WorkOS user has no email");
        res.redirect("/?error=no_email");
        return;
      }

      if (!user.emailVerified) {
        console.error("WorkOS user email not verified:", user.email);
        res.redirect("/?error=email_not_verified");
        return;
      }

      // Find or create member in our database
      let member = await storage.getMemberByEmail(user.email);
      
      if (!member) {
        // Create new member from WorkOS user data
        member = await storage.createMember({
          email: user.email,
          firstName: user.firstName || null,
          lastName: user.lastName || null,
          company: null,
          jobRole: null,
          teamSize: null,
          moveInTiming: null,
        });
      }
      
      // Update workosUserId if not set
      if (!member.workosUserId) {
        await storage.updateMember(member.id, { workosUserId: user.id } as any);
      }

      // Per best practices: Store tokens in server-side session (HttpOnly, encrypted)
      req.session.memberId = member.id;
      req.session.memberEmail = member.email;
      req.session.workosUserId = user.id;
      req.session.workosAccessToken = accessToken;
      req.session.workosRefreshToken = refreshToken;
      // Access tokens expire in 5 minutes by default
      req.session.workosTokenExpiresAt = Date.now() + (5 * 60 * 1000);

      // Redirect to member dashboard
      res.redirect("/dashboard");
    } catch (error) {
      console.error("WorkOS callback error:", error);
      res.redirect("/?error=auth_failed");
    }
  });

  // Get current authenticated member
  app.get("/api/auth/me", async (req, res) => {
    if (!req.session.memberId) {
      res.status(401).json({ authenticated: false });
      return;
    }

    try {
      const member = await storage.getMemberById(req.session.memberId);
      if (!member) {
        req.session.destroy(() => {});
        res.status(401).json({ authenticated: false });
        return;
      }

      const preferences = await storage.getMemberPreferences(member.id);
      
      // Get organization info if member belongs to one
      let organization = null;
      let teamMembers: any[] = [];
      if (member.organizationId) {
        organization = await storage.getOrganization(member.organizationId);
        if (organization && member.role === "admin") {
          const orgMembers = await storage.getOrganizationMembers(member.organizationId);
          teamMembers = orgMembers.map(m => ({
            id: m.id,
            email: m.email,
            firstName: m.firstName,
            lastName: m.lastName,
            role: m.role,
          }));
        }
      }
      
      res.json({
        authenticated: true,
        member: {
          id: member.id,
          email: member.email,
          firstName: member.firstName,
          lastName: member.lastName,
          company: member.company,
          jobRole: member.jobRole,
          role: member.role,
          organizationId: member.organizationId,
          stripeCustomerId: member.stripeCustomerId,
          subscriptionId: member.subscriptionId,
          subscriptionStatus: member.subscriptionStatus,
          subscriptionTier: member.subscriptionTier,
        },
        preferences,
        organization,
        teamMembers,
      });
    } catch (error) {
      console.error("Auth check error:", error);
      res.status(500).json({ authenticated: false, error: "Server error" });
    }
  });

  // Logout - fully destroy session
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destroy error on logout:", err);
        res.status(500).json({ success: false, error: "Logout failed" });
        return;
      }
      res.clearCookie("connect.sid");
      res.json({ success: true });
    });
  });

  // Helper to refresh WorkOS access token if expired (per best practices)
  async function refreshWorkosTokenIfNeeded(req: Request): Promise<boolean> {
    if (!workos || !clientId) {
      return false; // WorkOS not configured
    }
    
    if (!req.session.workosRefreshToken || !req.session.workosTokenExpiresAt) {
      return false;
    }

    // Check if token needs refresh (with 60s buffer)
    if (Date.now() < req.session.workosTokenExpiresAt - 60000) {
      return true; // Token is still valid
    }

    try {
      const { accessToken, refreshToken } = await workos.userManagement.authenticateWithRefreshToken({
        clientId,
        refreshToken: req.session.workosRefreshToken,
      });

      // Update session with new tokens (rotate refresh token per best practice)
      req.session.workosAccessToken = accessToken;
      req.session.workosRefreshToken = refreshToken;
      req.session.workosTokenExpiresAt = Date.now() + (5 * 60 * 1000);
      
      console.log(`Refreshed WorkOS token for member ${req.session.memberId}`);
      return true;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    }
  }

  // Middleware to require member authentication with token refresh
  function requireMember(req: Request, res: Response, next: NextFunction) {
    if (!req.session.memberId) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }
    
    // Async token refresh (non-blocking)
    refreshWorkosTokenIfNeeded(req).catch(err => 
      console.error("Token refresh error:", err)
    );
    
    next();
  }

  // ==========================================
  // End WorkOS Authentication Routes
  // ==========================================

  // ==========================================
  // Stripe Subscription Routes
  // ==========================================

  // Get membership tiers and pricing
  app.get("/api/membership/tiers", (req, res) => {
    res.json(MEMBERSHIP_TIERS);
  });

  // Create checkout session for subscription
  app.post("/api/stripe/create-checkout-session", requireMember, async (req, res) => {
    if (!stripe) {
      res.status(500).json({ error: "Payment system not configured" });
      return;
    }
    
    try {
      const { tier } = req.body;
      const memberId = req.session.memberId!;

      if (!tier || !["hybrid", "private"].includes(tier)) {
        res.status(400).json({ error: "Invalid membership tier" });
        return;
      }

      const member = await storage.getMemberById(memberId);
      if (!member) {
        res.status(404).json({ error: "Member not found" });
        return;
      }

      // Get or create Stripe customer
      let customerId = member.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: member.email,
          name: `${member.firstName || ""} ${member.lastName || ""}`.trim() || undefined,
          metadata: {
            memberId: memberId.toString(),
          },
        });
        customerId = customer.id;
        await storage.updateMember(memberId, { stripeCustomerId: customerId } as any);
      }

      const tierConfig = MEMBERSHIP_TIERS[tier as keyof typeof MEMBERSHIP_TIERS];
      if (!tierConfig || !("priceId" in tierConfig)) {
        res.status(400).json({ error: "Tier not available for checkout" });
        return;
      }

      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ["card"],
        line_items: [
          {
            price: tierConfig.priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${req.headers.origin}/dashboard?subscription=success`,
        cancel_url: `${req.headers.origin}/dashboard?subscription=cancelled`,
        metadata: {
          memberId: memberId.toString(),
          tier,
        },
      });

      res.json({ sessionId: session.id, url: session.url });
    } catch (error) {
      console.error("Stripe checkout error:", error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  // Create customer portal session for managing subscription
  app.post("/api/stripe/create-portal-session", requireMember, async (req, res) => {
    if (!stripe) {
      res.status(500).json({ error: "Payment system not configured" });
      return;
    }
    
    try {
      const memberId = req.session.memberId!;
      const member = await storage.getMemberById(memberId);

      if (!member?.stripeCustomerId) {
        res.status(400).json({ error: "No subscription found" });
        return;
      }

      const session = await stripe.billingPortal.sessions.create({
        customer: member.stripeCustomerId,
        return_url: `${req.headers.origin}/dashboard`,
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error("Stripe portal error:", error);
      res.status(500).json({ error: "Failed to create portal session" });
    }
  });

  // Track processed webhook events to prevent duplicates (in production, use database)
  const processedWebhookEvents = new Set<string>();

  // Helper to find member by Stripe customer ID efficiently
  async function findMemberByStripeCustomerId(customerId: string) {
    const members = await storage.getMembers();
    return members.find(m => m.stripeCustomerId === customerId);
  }

  // Helper to sync subscription data to HubSpot
  async function syncSubscriptionToHubSpot(member: any, tier: string, status: string) {
    try {
      if (!member.hubspotContactId) return;
      
      const hubspotClient = await getUncachableHubSpotClient();
      await hubspotClient.crm.contacts.basicApi.update(member.hubspotContactId, {
        properties: {
          opus_membership_tier: tier,
          opus_subscription_status: status,
          lifecyclestage: status === "active" ? "customer" : "lead",
        }
      });
      console.log(`HubSpot sync: Updated ${member.email} with tier=${tier}, status=${status}`);
    } catch (error) {
      console.error("HubSpot sync error:", error);
    }
  }

  // Stripe webhook handler - optimized per Stripe best practices
  app.post("/api/stripe/webhook", async (req, res) => {
    if (!stripe || !stripeWebhookSecret) {
      res.status(500).send("Payment webhook not configured");
      return;
    }
    
    const sig = req.headers["stripe-signature"] as string;
    
    let event: Stripe.Event;
    try {
      const rawBody = req.rawBody as Buffer;
      if (!rawBody) {
        console.error("No raw body available for webhook verification");
        res.status(400).send("Webhook Error: No raw body");
        return;
      }
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        stripeWebhookSecret
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      res.status(400).send("Webhook Error");
      return;
    }

    // Idempotency: Skip already processed events
    if (processedWebhookEvents.has(event.id)) {
      console.log(`Webhook event ${event.id} already processed, skipping`);
      res.json({ received: true });
      return;
    }

    try {
      // Handle subscription events per Stripe best practices
      switch (event.type) {
        // Best practice: Use checkout.session.completed to link subscription to member
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          const memberId = parseInt(session.metadata?.memberId || "0");
          const tier = session.metadata?.tier;

          if (memberId && tier) {
            await storage.updateMember(memberId, {
              subscriptionId: session.subscription as string,
              subscriptionStatus: "pending", // Wait for invoice.paid to confirm
              subscriptionTier: tier,
            } as any);
            console.log(`Checkout completed for member ${memberId}, tier: ${tier}`);
          }
          break;
        }

        // Best practice: invoice.paid is the MOST RELIABLE event for granting access
        case "invoice.paid": {
          const invoice = event.data.object as Stripe.Invoice;
          const customerId = invoice.customer as string;
          const subscriptionId = (invoice as any).subscription as string;

          const member = await findMemberByStripeCustomerId(customerId);
          if (member) {
            await storage.updateMember(member.id, {
              subscriptionId: subscriptionId,
              subscriptionStatus: "active",
            } as any);
            
            // Sync to HubSpot - update lifecycle stage to customer
            await syncSubscriptionToHubSpot(member, member.subscriptionTier || "hybrid", "active");
            console.log(`Invoice paid: Activated subscription for member ${member.id}`);
          }
          break;
        }

        // Handle failed payments - notify and update status
        case "invoice.payment_failed": {
          const invoice = event.data.object as Stripe.Invoice;
          const customerId = invoice.customer as string;

          const member = await findMemberByStripeCustomerId(customerId);
          if (member) {
            await storage.updateMember(member.id, {
              subscriptionStatus: "past_due",
            } as any);
            
            // Sync to HubSpot
            await syncSubscriptionToHubSpot(member, member.subscriptionTier || "free", "past_due");
            console.log(`Payment failed for member ${member.id}`);
          }
          break;
        }

        case "customer.subscription.updated": {
          const subscription = event.data.object as Stripe.Subscription;
          const customerId = subscription.customer as string;
          
          const member = await findMemberByStripeCustomerId(customerId);
          if (member) {
            // Fetch full subscription to get accurate status
            const fullSubscription = await stripe.subscriptions.retrieve(subscription.id);
            await storage.updateMember(member.id, {
              subscriptionStatus: fullSubscription.status,
            } as any);
            
            await syncSubscriptionToHubSpot(member, member.subscriptionTier || "hybrid", fullSubscription.status);
            console.log(`Subscription updated for member ${member.id}: ${fullSubscription.status}`);
          }
          break;
        }

        case "customer.subscription.deleted": {
          const subscription = event.data.object as Stripe.Subscription;
          const customerId = subscription.customer as string;
          
          const member = await findMemberByStripeCustomerId(customerId);
          if (member) {
            await storage.updateMember(member.id, {
              subscriptionStatus: "cancelled",
              subscriptionTier: "free",
            } as any);
            
            // Sync to HubSpot - downgrade lifecycle stage
            await syncSubscriptionToHubSpot(member, "free", "cancelled");
            console.log(`Subscription cancelled for member ${member.id}`);
          }
          break;
        }
      }

      // Mark event as processed
      processedWebhookEvents.add(event.id);
      
      // Cleanup old events (keep last 1000)
      if (processedWebhookEvents.size > 1000) {
        const firstEvent = processedWebhookEvents.values().next().value;
        if (firstEvent) processedWebhookEvents.delete(firstEvent);
      }

    } catch (error) {
      console.error("Webhook processing error:", error);
      // Return 200 to prevent Stripe from retrying (we log the error for debugging)
    }

    res.json({ received: true });
  });

  // ==========================================
  // End Stripe Subscription Routes
  // ==========================================

  // Waitlist endpoint - adds contact to HubSpot
  app.post("/api/waitlist", async (req, res) => {
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

  // Member sign-up endpoint - creates member with preferences and syncs to HubSpot
  app.post("/api/members", async (req, res) => {
    try {
      const { member, preferences } = req.body;
      
      if (!member?.email || !validateEmail(member.email)) {
        res.status(400).json({ 
          success: false, 
          message: "Valid email is required"
        });
        return;
      }

      const existingMember = await storage.getMemberByEmail(member.email);
      if (existingMember) {
        if (preferences) {
          const existingPrefs = await storage.getMemberPreferences(existingMember.id);
          if (existingPrefs) {
            await storage.updateMemberPreferences(existingMember.id, preferences);
          } else {
            await storage.createMemberPreferences({ ...preferences, memberId: existingMember.id });
          }
        }
        if (member.firstName || member.lastName || member.company || member.jobRole || member.teamSize || member.moveInTiming) {
          await storage.updateMember(existingMember.id, member);
        }
        res.json({ 
          success: true, 
          message: "Welcome back! Your profile has been updated.",
          memberId: existingMember.id
        });
        return;
      }

      const parsed = insertMemberSchema.safeParse(member);
      if (!parsed.success) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid member data",
          errors: parsed.error.errors 
        });
        return;
      }

      const createdMember = await storage.createMember(parsed.data);

      if (preferences) {
        await storage.createMemberPreferences({ 
          ...preferences, 
          memberId: createdMember.id 
        });
      }

      try {
        const hubspotClient = await getUncachableHubSpotClient();
        
        // Sync comprehensive member data to HubSpot per best practices
        const contactProperties: Record<string, string> = {
          email: createdMember.email,
          lifecyclestage: "lead",
          hs_lead_status: "NEW"
        };
        
        // Standard HubSpot properties
        if (createdMember.firstName) contactProperties.firstname = createdMember.firstName;
        if (createdMember.lastName) contactProperties.lastname = createdMember.lastName;
        if (createdMember.company) contactProperties.company = createdMember.company;
        if (createdMember.jobRole) contactProperties.jobtitle = createdMember.jobRole;
        if (createdMember.teamSize) contactProperties.numemployees = mapTeamSizeToHubSpot(createdMember.teamSize);
        
        // Custom Opus 355 properties (requires creating in HubSpot dashboard first)
        if (createdMember.moveInTiming) contactProperties.opus_move_in_timing = createdMember.moveInTiming;
        contactProperties.opus_membership_tier = "free";
        contactProperties.opus_subscription_status = "waitlist";
        contactProperties.opus_member_id = createdMember.id.toString();
        
        // Sync workspace preferences if provided
        if (preferences) {
          if (preferences.privateOfficeDesks) {
            contactProperties.opus_private_desks = preferences.privateOfficeDesks.toString();
          }
          if (preferences.hybridMemberships) {
            contactProperties.opus_hybrid_seats = preferences.hybridMemberships.toString();
          }
          if (preferences.amenities?.length) {
            contactProperties.opus_amenities = preferences.amenities.join(", ");
          }
          if (preferences.decisionStage) {
            contactProperties.opus_decision_stage = preferences.decisionStage;
          }
        }
        
        const hubspotResponse = await hubspotClient.crm.contacts.basicApi.create({
          properties: contactProperties
        });

        await storage.updateMember(createdMember.id, { 
          hubspotContactId: hubspotResponse.id 
        } as any);
        
        console.log(`HubSpot: Created contact ${hubspotResponse.id} for ${createdMember.email}`);
      } catch (hubspotError: any) {
        // Best practice: Don't fail signup if HubSpot sync fails
        if (hubspotError.body?.category === "CONFLICT") {
          console.log(`HubSpot: Contact ${createdMember.email} already exists`);
        } else {
          console.error("HubSpot sync warning:", hubspotError.message);
        }
      }

      res.json({ 
        success: true, 
        message: "Welcome to Opus 355! You're now a member.",
        memberId: createdMember.id
      });
    } catch (error: any) {
      console.error("Member sign-up error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to complete sign-up. Please try again." 
      });
    }
  });

  // Update member preferences (for multi-step form)
  app.put("/api/members/:id/preferences", async (req, res) => {
    try {
      const memberId = parseIdParam(req.params.id);
      if (!memberId) {
        res.status(400).json({ success: false, message: "Invalid member ID" });
        return;
      }
      const preferences = req.body;
      
      const existingPrefs = await storage.getMemberPreferences(memberId);
      
      if (existingPrefs) {
        const updated = await storage.updateMemberPreferences(memberId, preferences);
        res.json({ success: true, preferences: updated });
      } else {
        const created = await storage.createMemberPreferences({ 
          ...preferences, 
          memberId 
        });
        res.json({ success: true, preferences: created });
      }
    } catch (error) {
      console.error("Error updating preferences:", error);
      res.status(500).json({ success: false, message: "Failed to save preferences" });
    }
  });

  // Member preferences (authenticated member)
  app.put("/api/member/preferences", requireMember, async (req, res) => {
    try {
      const memberId = req.session.memberId!;
      const preferences = req.body;
      
      const existingPrefs = await storage.getMemberPreferences(memberId);
      
      if (existingPrefs) {
        const updated = await storage.updateMemberPreferences(memberId, preferences);
        res.json({ success: true, preferences: updated });
      } else {
        const created = await storage.createMemberPreferences({ 
          ...preferences, 
          memberId 
        });
        res.json({ success: true, preferences: created });
      }
    } catch (error) {
      console.error("Error updating member preferences:", error);
      res.status(500).json({ success: false, message: "Failed to save preferences" });
    }
  });

  // ==========================================
  // Hospitality Dashboard Routes
  // ==========================================

  // Get pending arrivals for hospitality team (staff only)
  app.get("/api/hospitality/arrivals", requireStaff, async (req, res) => {
    try {
      const arrivals = await storage.getPendingArrivals();
      const todaysArrivals = await storage.getTodaysArrivals();
      res.json([...arrivals, ...todaysArrivals.filter(a => a.status !== "pending")]);
    } catch (error) {
      console.error("Error fetching arrivals:", error);
      res.status(500).json({ message: "Failed to fetch arrivals" });
    }
  });

  // Member announces arrival
  app.post("/api/member/arriving", requireMember, async (req, res) => {
    try {
      const memberId = req.session.memberId!;
      const { estimatedArrival, guestCount, guestNames, notes } = req.body;
      
      // Check if member has notifyHospitalityOnArrival enabled
      const prefs = await storage.getMemberPreferences(memberId);
      if (prefs && prefs.notifyHospitalityOnArrival === false) {
        res.json({ success: true, message: "Arrival notification is disabled in your preferences" });
        return;
      }
      
      // Validate and clamp estimated arrival time
      const minArrivalTime = new Date(Date.now() + 60 * 1000); // At least 1 minute from now
      const defaultArrivalTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes default
      let arrivalTime: Date;
      
      if (estimatedArrival) {
        arrivalTime = new Date(estimatedArrival);
        // If invalid or in the past, use default
        if (isNaN(arrivalTime.getTime()) || arrivalTime < minArrivalTime) {
          arrivalTime = defaultArrivalTime;
        }
      } else {
        arrivalTime = defaultArrivalTime;
      }
      
      const arrival = await storage.createArrival({
        memberId,
        estimatedArrival: arrivalTime,
        guestCount: Math.max(0, guestCount || 0),
        guestNames: guestNames || null,
        notes: notes || null,
        status: "pending"
      });
      
      res.json({ success: true, arrival });
    } catch (error) {
      console.error("Error creating arrival:", error);
      res.status(500).json({ success: false, message: "Failed to announce arrival" });
    }
  });

  // Mark beverage ready (staff only)
  app.post("/api/hospitality/arrivals/:id/ready", requireStaff, async (req, res) => {
    try {
      const arrivalId = parseIdParam(req.params.id);
      if (!arrivalId) {
        res.status(400).json({ success: false, message: "Invalid arrival ID" });
        return;
      }
      const updated = await storage.markBeverageReady(arrivalId);
      
      if (!updated) {
        res.status(404).json({ message: "Arrival not found" });
        return;
      }
      
      res.json({ success: true, arrival: updated });
    } catch (error) {
      console.error("Error marking beverage ready:", error);
      res.status(500).json({ success: false, message: "Failed to update arrival" });
    }
  });

  // Mark member arrived (staff only)
  app.post("/api/hospitality/arrivals/:id/arrived", requireStaff, async (req, res) => {
    try {
      const arrivalId = parseIdParam(req.params.id);
      if (!arrivalId) {
        res.status(400).json({ success: false, message: "Invalid arrival ID" });
        return;
      }
      const updated = await storage.markArrivalComplete(arrivalId);
      
      if (!updated) {
        res.status(404).json({ message: "Arrival not found" });
        return;
      }
      
      res.json({ success: true, arrival: updated });
    } catch (error) {
      console.error("Error marking arrived:", error);
      res.status(500).json({ success: false, message: "Failed to update arrival" });
    }
  });

  // Admin members endpoints
  app.get("/api/admin/members", requireAdmin, async (req, res) => {
    try {
      const members = await storage.getMembers();
      res.json(members);
    } catch (error) {
      console.error("Error fetching members:", error);
      res.status(500).json({ message: "Failed to fetch members" });
    }
  });

  app.delete("/api/admin/members/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseIdParam(req.params.id);
      if (!id) {
        res.status(400).json({ message: "Invalid member ID" });
        return;
      }
      const deleted = await storage.deleteMember(id);
      
      if (!deleted) {
        res.status(404).json({ message: "Member not found" });
        return;
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting member:", error);
      res.status(500).json({ message: "Failed to delete member" });
    }
  });

  // Public testimonials endpoints
  app.get("/api/testimonials", async (req, res) => {
    try {
      const { solutionType, featured } = req.query;
      
      if (featured === "true") {
        const testimonials = await storage.getFeaturedTestimonials();
        res.json(testimonials);
        return;
      }
      
      const testimonials = await storage.getTestimonials(solutionType as string | undefined);
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Public news endpoints
  app.get("/api/news", async (req, res) => {
    try {
      const { category, featured, limit } = req.query;
      
      if (featured === "true") {
        const newsItems = await storage.getFeaturedNews();
        res.json(newsItems);
        return;
      }
      
      const newsItems = await storage.getNews(
        category as string | undefined, 
        limit ? parseInt(limit as string) : undefined
      );
      res.json(newsItems);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  // Admin auth endpoints
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        res.status(400).json({ message: "Username and password required" });
        return;
      }

      const admin = await storage.getAdminByUsername(username);
      
      if (!admin) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const isValid = await verifyPassword(password, admin.passwordHash);
      if (!isValid) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      req.session.adminId = admin.id;
      req.session.adminUsername = admin.username;

      res.json({ success: true, username: admin.username });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Logout failed" });
        return;
      }
      res.json({ success: true });
    });
  });

  app.get("/api/admin/me", (req, res) => {
    if (!req.session.adminId) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }
    res.json({ id: req.session.adminId, username: req.session.adminUsername });
  });

  // Admin testimonials CRUD
  app.post("/api/admin/testimonials", requireAdmin, async (req, res) => {
    try {
      const parsed = insertTestimonialSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
        return;
      }
      
      const testimonial = await storage.createTestimonial(parsed.data);
      res.json(testimonial);
    } catch (error) {
      console.error("Error creating testimonial:", error);
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });

  app.put("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseIdParam(req.params.id);
      if (!id) {
        res.status(400).json({ message: "Invalid testimonial ID" });
        return;
      }
      const testimonial = await storage.updateTestimonial(id, req.body);
      
      if (!testimonial) {
        res.status(404).json({ message: "Testimonial not found" });
        return;
      }
      
      res.json(testimonial);
    } catch (error) {
      console.error("Error updating testimonial:", error);
      res.status(500).json({ message: "Failed to update testimonial" });
    }
  });

  app.delete("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseIdParam(req.params.id);
      if (!id) {
        res.status(400).json({ message: "Invalid testimonial ID" });
        return;
      }
      const deleted = await storage.deleteTestimonial(id);
      
      if (!deleted) {
        res.status(404).json({ message: "Testimonial not found" });
        return;
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });

  // Admin news CRUD
  app.post("/api/admin/news", requireAdmin, async (req, res) => {
    try {
      const parsed = insertNewsSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
        return;
      }
      
      const newsItem = await storage.createNews(parsed.data);
      res.json(newsItem);
    } catch (error) {
      console.error("Error creating news:", error);
      res.status(500).json({ message: "Failed to create news" });
    }
  });

  app.put("/api/admin/news/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseIdParam(req.params.id);
      if (!id) {
        res.status(400).json({ message: "Invalid news ID" });
        return;
      }
      const newsItem = await storage.updateNews(id, req.body);
      
      if (!newsItem) {
        res.status(404).json({ message: "News item not found" });
        return;
      }
      
      res.json(newsItem);
    } catch (error) {
      console.error("Error updating news:", error);
      res.status(500).json({ message: "Failed to update news" });
    }
  });

  app.delete("/api/admin/news/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseIdParam(req.params.id);
      if (!id) {
        res.status(400).json({ message: "Invalid news ID" });
        return;
      }
      const deleted = await storage.deleteNews(id);
      
      if (!deleted) {
        res.status(404).json({ message: "News item not found" });
        return;
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting news:", error);
      res.status(500).json({ message: "Failed to delete news" });
    }
  });

  // Setup initial admin - requires ADMIN_SETUP_KEY environment variable
  app.post("/api/admin/setup", async (req, res) => {
    try {
      const { username, password, setupKey } = req.body;
      
      const requiredSetupKey = process.env.ADMIN_SETUP_KEY;
      if (!requiredSetupKey) {
        res.status(503).json({ message: "Setup not configured" });
        return;
      }
      
      if (setupKey !== requiredSetupKey) {
        res.status(403).json({ message: "Invalid setup key" });
        return;
      }
      
      const existing = await storage.getAdminByUsername(username);
      if (existing) {
        res.status(400).json({ message: "Admin user already exists" });
        return;
      }
      
      const hashedPassword = await hashPassword(password);
      const admin = await storage.createAdminUser(username, hashedPassword);
      res.json({ success: true, username: admin.username });
    } catch (error) {
      console.error("Setup error:", error);
      res.status(500).json({ message: "Setup failed" });
    }
  });

  return httpServer;
}
