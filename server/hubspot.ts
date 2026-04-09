import { Client } from '@hubspot/api-client';
import { config } from './config';

let connectionSettings: any;

async function getOAuthAccessToken() {
  if (connectionSettings?.settings?.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!hostname || !xReplitToken) {
    throw new Error('HubSpot connector environment not available');
  }

  const response = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=hubspot',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  );

  if (!response.ok) {
    throw new Error(`HubSpot connector API returned ${response.status}`);
  }

  const data = await response.json();
  connectionSettings = data.items?.[0];

  if (!connectionSettings?.settings) {
    throw new Error('HubSpot not connected — please set up the HubSpot integration');
  }

  const accessToken = connectionSettings.settings.access_token 
    || connectionSettings.settings.oauth?.credentials?.access_token;

  if (!accessToken) {
    throw new Error('HubSpot access token not found in connection settings');
  }
  return accessToken;
}

async function getAccessToken(): Promise<string> {
  if (config.isDevelopment && process.env.HUBSPOT_DEV_ACCESS_TOKEN) {
    return process.env.HUBSPOT_DEV_ACCESS_TOKEN;
  }
  return getOAuthAccessToken();
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
// Always call this function again to get a fresh client.
export async function getUncachableHubSpotClient() {
  const accessToken = await getAccessToken();
  return new Client({ accessToken });
}
