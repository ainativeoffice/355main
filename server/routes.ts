import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getUncachableHubSpotClient } from "./hubspot";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Waitlist endpoint - adds contact to HubSpot
  app.post("/api/waitlist", async (req, res) => {
    try {
      const { email } = waitlistSchema.parse(req.body);

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

  return httpServer;
}
