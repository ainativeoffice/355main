import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getUncachableHubSpotClient } from "./hubspot";
import { validateEmail, validateWaitlistEntry } from "@shared/validation";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Waitlist endpoint - adds contact to HubSpot
  app.post("/api/waitlist", async (req, res) => {
    try {
      const { email } = req.body;
      
      // Validate using shared validation module
      const validation = validateWaitlistEntry({ email });
      if (!validation.valid) {
        res.status(400).json({ 
          success: false, 
          message: validation.errors[0] || "Invalid input"
        });
        return;
      }

      const hubspotClient = await getUncachableHubSpotClient();

      // Create or update contact in HubSpot
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
      
      // Handle duplicate email (contact already exists)
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

  // Testimonials endpoints
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

  // News endpoints
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

  return httpServer;
}
