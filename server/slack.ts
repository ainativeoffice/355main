const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

interface SlackMessage {
  text: string;
  blocks?: any[];
}

export async function sendSlackNotification(message: SlackMessage): Promise<boolean> {
  if (!SLACK_WEBHOOK_URL) {
    console.log("[Slack] Webhook URL not configured, skipping notification");
    return false;
  }

  try {
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      console.error("[Slack] Failed to send notification:", response.status);
      return false;
    }

    console.log("[Slack] Notification sent successfully");
    return true;
  } catch (error: any) {
    console.error("[Slack] Error sending notification:", error.message);
    return false;
  }
}

export function formatWaitlistNotification(email: string, brandSource: string = "355main"): SlackMessage {
  return {
    text: `🚀 New Lead: ${email} just requested access.`,
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "🚀 New Lead", emoji: true }
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `*${email}* just requested access.` }
      },
      {
        type: "context",
        elements: [
          { type: "mrkdwn", text: `Source: ${brandSource} | Submitted at ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET` }
        ]
      }
    ]
  };
}

interface MemberData {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  jobRole?: string;
  teamSize?: string;
  moveInTiming?: string;
  brandSource?: string;
}

interface PreferencesData {
  workspaceArchetype?: string;
  privateOfficeDesks?: number;
  hybridMemberships?: number;
  amenities?: string[];
}

export function formatMemberNotification(member: MemberData, preferences?: PreferencesData): SlackMessage {
  const name = [member.firstName, member.lastName].filter(Boolean).join(" ") || "Not provided";
  
  const fields = [
    { type: "mrkdwn", text: `*Email:*\n${member.email}` },
    { type: "mrkdwn", text: `*Name:*\n${name}` },
  ];

  if (member.company) {
    fields.push({ type: "mrkdwn", text: `*Company:*\n${member.company}` });
  }
  if (member.jobRole) {
    fields.push({ type: "mrkdwn", text: `*Role:*\n${member.jobRole}` });
  }
  if (member.teamSize) {
    fields.push({ type: "mrkdwn", text: `*Team Size:*\n${member.teamSize}` });
  }
  if (member.moveInTiming) {
    fields.push({ type: "mrkdwn", text: `*Move-in:*\n${member.moveInTiming}` });
  }

  const blocks: any[] = [
    {
      type: "header",
      text: { type: "plain_text", text: "🏢 New Lead Submission", emoji: true }
    },
    {
      type: "section",
      fields: fields.slice(0, 10)
    }
  ];

  if (preferences && (preferences.workspaceArchetype || preferences.privateOfficeDesks !== undefined || preferences.hybridMemberships !== undefined || preferences.amenities?.length)) {
    const prefFields = [];
    if (preferences.workspaceArchetype) {
      prefFields.push({ type: "mrkdwn", text: `*Workspace Type:*\n${preferences.workspaceArchetype}` });
    }
    if (preferences.privateOfficeDesks !== undefined) {
      prefFields.push({ type: "mrkdwn", text: `*Private Desks:*\n${preferences.privateOfficeDesks}` });
    }
    if (preferences.hybridMemberships !== undefined) {
      prefFields.push({ type: "mrkdwn", text: `*Hybrid Members:*\n${preferences.hybridMemberships}` });
    }
    if (preferences.amenities?.length) {
      prefFields.push({ type: "mrkdwn", text: `*Amenities:*\n${preferences.amenities.join(", ")}` });
    }
    
    if (prefFields.length > 0) {
      blocks.push({
        type: "section",
        fields: prefFields
      });
    }
  }

  const source = member.brandSource || "355main";
  blocks.push({
    type: "context",
    elements: [
      { type: "mrkdwn", text: `Source: ${source} | Submitted at ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET` }
    ]
  });

  return {
    text: `New lead: ${name} (${member.email})${member.company ? ` from ${member.company}` : ""}`,
    blocks
  };
}
