import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import bcrypt from "bcrypt";
import { storage } from "./storage";
import { getUncachableHubSpotClient } from "./hubspot";
import { validateEmail, validateWaitlistEntry } from "@shared/validation";
import { insertTestimonialSchema, insertNewsSchema } from "@shared/schema";

declare module "express-session" {
  interface SessionData {
    adminId: number;
    adminUsername: string;
  }
}

const SALT_ROUNDS = 10;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.adminId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.use(session({
    secret: process.env.SESSION_SECRET || "opus355-admin-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    }
  }));

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
      const id = parseInt(req.params.id);
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
      const id = parseInt(req.params.id);
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
      const id = parseInt(req.params.id);
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
      const id = parseInt(req.params.id);
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
