import { ReplitConnectors } from "@replit/connectors-sdk";

const connectors = new ReplitConnectors();

interface HubSpotContact {
  id: string;
  properties: Record<string, string>;
}

interface HubSpotError {
  status: string;
  message: string;
  category: string;
}

async function hubspotRequest(endpoint: string, options: { method: string; body?: any }): Promise<any> {
  const response = await connectors.proxy("hubspot", endpoint, {
    method: options.method,
    headers: { "Content-Type": "application/json" },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    const error: any = new Error(data.message || `HubSpot API error ${response.status}`);
    error.body = data;
    error.statusCode = response.status;
    throw error;
  }

  return data;
}

export async function createContact(properties: Record<string, string>): Promise<HubSpotContact> {
  return hubspotRequest("/crm/v3/objects/contacts", {
    method: "POST",
    body: { properties },
  });
}

export async function updateContact(contactId: string, properties: Record<string, string>): Promise<HubSpotContact> {
  return hubspotRequest(`/crm/v3/objects/contacts/${contactId}`, {
    method: "PATCH",
    body: { properties },
  });
}
