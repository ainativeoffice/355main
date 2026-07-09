import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = "leasing@355main.com";
const FROM_NAME = "355 Main";

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  if (!SENDGRID_API_KEY) {
    console.log("[Email] SendGrid not configured, skipping email");
    return false;
  }

  try {
    await sgMail.send({
      to: options.to,
      from: { email: FROM_EMAIL, name: FROM_NAME },
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    console.log(`[Email] Sent to ${options.to}: ${options.subject}`);
    return true;
  } catch (error: any) {
    console.error(`[Email] Failed to send to ${options.to}:`, error.message);
    return false;
  }
}

const emailTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>355 Main</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; border-bottom: 1px solid #eee;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 600; color: #1a1a1a; letter-spacing: -0.5px;">355 Main</h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: #666;">Sovereign Intelligence, anchored in Armonk</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #eee; border-radius: 0 0 8px 8px;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #666; text-align: center;">
                355 Main Street, Armonk, New York
              </p>
              <p style="margin: 0; font-size: 13px; color: #999; text-align: center;">
                Questions? Reply to this email or contact us at 
                <a href="mailto:leasing@355main.com" style="color: #666;">leasing@355main.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export function sendWaitlistConfirmation(email: string): Promise<boolean> {
  const html = emailTemplate(`
    <h2 style="margin: 0 0 30px; font-size: 28px; font-weight: 600; color: #1a1a1a; line-height: 1.3;">You just bought back 10 hours a week.</h2>
    
    <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.7; color: #444;">
      Most professionals in North Castle view the commute to Manhattan as a "cost of doing business."
    </p>
    
    <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.7; color: #444;">
      We view it as a leak in your P&L.
    </p>
    
    <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.7; color: #444;">
      By requesting access to 355 Main, you aren't just looking for a desk. You are looking for the efficiency of a Midtown HQ with the proximity of a home office.
    </p>
    
    <div style="background-color: #f8f8f8; padding: 24px; margin: 0 0 24px; border-left: 3px solid #1a1a1a;">
      <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #1a1a1a;">The Math of 355 Main:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-size: 16px; color: #444; border-bottom: 1px solid #eee;"><strong>Commute:</strong></td>
          <td style="padding: 8px 0; font-size: 16px; color: #444; border-bottom: 1px solid #eee; text-align: right;">5 minutes vs. 75 minutes</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 16px; color: #444; border-bottom: 1px solid #eee;"><strong>Annual Time Saved:</strong></td>
          <td style="padding: 8px 0; font-size: 16px; color: #444; border-bottom: 1px solid #eee; text-align: right;">~480 hours (20 full days)</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 16px; color: #444;"><strong>Overhead:</strong></td>
          <td style="padding: 8px 0; font-size: 16px; color: #444; text-align: right;">A fraction of NYC, zero fit-out costs</td>
        </tr>
      </table>
    </div>
    
    <h3 style="margin: 0 0 12px; font-size: 18px; font-weight: 600; color: #1a1a1a;">What happens next?</h3>
    
    <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.7; color: #444;">
      We are curating our founding members now. Because we are prioritizing the right mix of industries (Finance, Law, Tech), we review every application personally.
    </p>
    
    <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.7; color: #444;">
      You will hear from us shortly with floor plans and pre-launch rates.
    </p>
    
    <p style="margin: 0; font-size: 16px; line-height: 1.7; color: #444; font-style: italic;">
      Welcome to the destination.
    </p>
  `);

  const text = `You just bought back 10 hours a week.

Most professionals in North Castle view the commute to Manhattan as a "cost of doing business."

We view it as a leak in your P&L.

By requesting access to 355 Main, you aren't just looking for a desk. You are looking for the efficiency of a Midtown HQ with the proximity of a home office.

THE MATH OF 355 MAIN:
• Commute: 5 minutes vs. 75 minutes
• Annual Time Saved: ~480 hours (that's 20 full days of your life)
• Overhead: A fraction of a NYC commercial lease, with zero fit-out costs

WHAT HAPPENS NEXT?
We are curating our founding members now. Because we are prioritizing the right mix of industries (Finance, Law, Tech), we review every application personally.

You will hear from us shortly with floor plans and pre-launch rates.

Welcome to the destination.

---
355 Main Street, Armonk, New York
Questions? Contact us at leasing@355main.com`;

  return sendEmail({
    to: email,
    subject: "Welcome to 355 Main: Your 2026 Strategy",
    html,
    text,
  });
}

interface MemberInfo {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
}

export function sendMemberConfirmation(member: MemberInfo): Promise<boolean> {
  const name = member.firstName || "there";
  
  const html = emailTemplate(`
    <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 600; color: #1a1a1a;">Inquiry received, ${name}.</h2>
    <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #444;">
      Thank you for your interest in the Sovereign Shells at 355 Main. Your brief has been logged and is under review by our team.
    </p>
    <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #444;">
      <strong>What happens next?</strong>
    </p>
    <ul style="margin: 0 0 20px; padding-left: 20px; font-size: 16px; line-height: 1.8; color: #444;">
      <li>We review each inquiry personally to confirm fit</li>
      <li>A principal will respond within 1–2 business days</li>
      <li>Qualified inquiries receive shell specifications and a private walkthrough</li>
    </ul>
    <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #444;">
      355 Main is a set of three executive shells on the North Castle Ventures campus in Armonk — Class A commercial real estate fused with on-premises AI, outfitted with Vitra. We hold each shell for a single institution.
    </p>
    <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #444;">
      Regards,<br>
      <strong>355 Main · North Castle Ventures</strong>
    </p>
  `);

  const text = `Inquiry received, ${name}.

Thank you for your interest in the Sovereign Shells at 355 Main. Your brief has been logged and is under review by our team.

What happens next?
- We review each inquiry personally to confirm fit
- A principal will respond within 1-2 business days
- Qualified inquiries receive shell specifications and a private walkthrough

355 Main is a set of three executive shells on the North Castle Ventures campus in Armonk - Class A commercial real estate fused with on-premises AI, outfitted with Vitra. We hold each shell for a single institution.

Regards,
355 Main - North Castle Ventures

---
355 Main Street, Armonk, New York
Questions? Contact us at leasing@355main.com`;

  return sendEmail({
    to: member.email,
    subject: `Your 355 Main inquiry has been received${member.firstName ? `, ${member.firstName}` : ""}`,
    html,
    text,
  });
}
