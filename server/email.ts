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
              <p style="margin: 8px 0 0; font-size: 14px; color: #666;">The Destination Workplace</p>
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
    <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 600; color: #1a1a1a;">Access Requested</h2>
    <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #444;">
      We have received your request for 355 Main. A member of our team will review your application shortly.
    </p>
  `);

  const text = `Access Requested

We have received your request for 355 Main. A member of our team will review your application shortly.

---
355 Main Street, Armonk, New York
Questions? Contact us at leasing@355main.com`;

  return sendEmail({
    to: email,
    subject: "Access Requested: 355 Main",
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
    <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 600; color: #1a1a1a;">Thanks for Reaching Out, ${name}</h2>
    <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #444;">
      We've received your inquiry and our leasing team is excited to connect with you about workspace solutions at 355 Main.
    </p>
    <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #444;">
      <strong>What happens next?</strong>
    </p>
    <ul style="margin: 0 0 20px; padding-left: 20px; font-size: 16px; line-height: 1.8; color: #444;">
      <li>A member of our team will reach out within 1-2 business days</li>
      <li>We'll discuss your workspace needs and preferences</li>
      <li>We'll arrange a personalized tour of 355 Main</li>
    </ul>
    <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #444;">
      355 Main isn't just a workplace – it's a <strong>Destination Workplace</strong>. A place people want to go, not just have to go. We look forward to showing you what makes our space different.
    </p>
    <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #444;">
      See you soon,<br>
      <strong>The 355 Main Team</strong>
    </p>
  `);

  const text = `Thanks for Reaching Out, ${name}

We've received your inquiry and our leasing team is excited to connect with you about workspace solutions at 355 Main.

What happens next?
- A member of our team will reach out within 1-2 business days
- We'll discuss your workspace needs and preferences
- We'll arrange a personalized tour of 355 Main

355 Main isn't just a workplace – it's a Destination Workplace. A place people want to go, not just have to go. We look forward to showing you what makes our space different.

See you soon,
The 355 Main Team

---
355 Main Street, Armonk, New York
Questions? Contact us at leasing@355main.com`;

  return sendEmail({
    to: member.email,
    subject: `Thanks for Your Interest in 355 Main${member.firstName ? `, ${member.firstName}` : ""}`,
    html,
    text,
  });
}
