---
name: Inquiry (RFC) pipeline in production
description: How /api/members behaves in the live deploy, which integration legs are healthy, and email provider history (SendGrid → Resend)
---

# /api/members production pipeline

The RFC inquiry form (`/inquiry`) and the simple waitlist both post to `/api/members` and `/api/waitlist`. Each submission runs, in order: reCAPTCHA → DB save → HubSpot sync → Slack → confirmation email. Every downstream leg is best-effort; the endpoint returns 201 even if HubSpot/Slack/email fail.

**Verified live (submission to https://355main.com/api/members, July 2026):**
- HubSpot: works via Replit Connectors (contact created/updated). The connector is NOT visible from `listConnections('hubspot')` in the dev/code_execution sandbox (returns `[]`) — that does not mean prod is broken; trust the deployment logs (`[HubSpot] Contact synced`) instead.
- Slack: works (`[Slack] Notification sent successfully`).
- Non-blocking design confirmed: an email failure still returns 201 and the lead is saved everywhere else.

**Email provider: Resend (since July 2026).** SendGrid was dropped because its account ran out of credits — sends failed with HTTP 401 body `{"errors":[{"message":"Maximum credits exceeded"}]}`, which `@sendgrid/mail` misleadingly surfaced as just "Unauthorized". A key that passes `GET /v3/scopes` can still fail sends this way; always POST to the provider's send endpoint directly with curl to see the real error body.

**Resend specifics:**
- Secret: `RESEND_API_KEY`. Sender: `355 Main <leasing@northcastleventures.com>` (verified domain), reply-to `leasing@355main.com`. `355main.com` is NOT verified in Resend — the plan's domain slots were full, so the user chose northcastleventures.com as sender.
- Resend domain verification: add domain via `POST /domains`, DNS records may show "pending" for several minutes even after the records are publicly resolvable; re-trigger `POST /domains/{id}/verify` and poll.
- **Why:** regulated-lead confirmation emails must come from a domain the user controls and has verified; sender changes are a user/brand decision, not a technical default.

**How to verify this pipeline without external access:** POST a clearly-marked test inquiry to the prod URL, then `fetch_deployment_logs` filtered for `DB|HubSpot|Slack|Email` — the app logs the success/failure of each leg by name. `process.env` is not exposed in the code_execution sandbox (secrets ARE available in the bash tool's env), so test provider keys with curl from bash.
