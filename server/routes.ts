import type { Express } from "express";
import { createServer, type Server } from "http";
import { getUncachableHubSpotClient } from "./hubspot";
import { validateEmail, validateWaitlistEntry } from "@shared/validation";

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
    const startTime = Date.now();
    
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

  // Full waitlist with preferences - sends to HubSpot
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

      try {
        const hubspotClient = await getUncachableHubSpotClient();
        
        try {
          await hubspotClient.crm.contacts.basicApi.create({
            properties: standardProperties
          });
        } catch (hubspotError: any) {
          if (hubspotError.body?.category === "CONFLICT") {
            // Contact exists - try to update
            const existingContactId = hubspotError.body?.message?.match(/Existing ID: (\d+)/)?.[1];
            if (existingContactId) {
              await hubspotClient.crm.contacts.basicApi.update(existingContactId, {
                properties: standardProperties
              });
            }
          } else {
            console.error("HubSpot sync warning:", hubspotError.message || hubspotError);
          }
        }
      } catch (hubspotConnectionError) {
        console.error("HubSpot connection error:", hubspotConnectionError);
        // Continue - don't fail the request if HubSpot is unavailable
      }

      res.status(201).json({ 
        success: true, 
        message: "Welcome to 355 Main! We'll be in touch soon."
      });
    } catch (error: any) {
      console.error("Waitlist sign-up error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to complete sign-up. Please try again." 
      });
    }
  });

  return httpServer;
}
