# Threat Model

## Project Overview

355 Main is a public marketing and lead-capture site with a small Express backend. In production, the security-relevant surface is limited to public SSR page delivery and two unauthenticated form endpoints (`/api/waitlist` and `/api/members`) that accept visitor data and forward it to PostgreSQL, HubSpot, Slack, and Resend. The deployment is public, TLS is handled by the platform, and mock/dev-only surfaces should be ignored unless they are proven production-reachable.

## Assets

- **Lead PII** — email addresses, names, company names, job roles, move-in timing, and free-form inquiry notes. Exposure or tampering would affect users and business operations.
- **Internal notification channels** — Slack notifications and transactional email flows used by staff to react to leads. Abuse can create alert fatigue, misleading internal messages, or operational disruption.
- **CRM and datastore integrity** — PostgreSQL records and HubSpot contacts must reflect genuine submissions. Spam or forged submissions pollute sales workflows and can trigger downstream actions.
- **Application secrets** — `DATABASE_URL`, `RECAPTCHA_SECRET_KEY`, `RESEND_API_KEY`, Slack webhook URL, and HubSpot connector credentials. Compromise would enable direct abuse of external systems and stored lead data.
- **Service availability and cost envelope** — the public form endpoints are intentionally open to the internet and can be abused for spam, autoscale churn, and downstream API traffic if anti-automation controls fail.

## Trust Boundaries

- **Browser to Express API** — all client input is untrusted. Both public POST endpoints must validate and constrain attacker-controlled input before it reaches storage or third-party services.
- **Express to PostgreSQL** — the server persists lead records and preferences. Query construction and record updates must resist injection and avoid accidental data exposure.
- **Express to third parties** — the backend sends user-supplied content to HubSpot, Slack, Resend, and Google reCAPTCHA. Each integration is a separate trust boundary where untrusted content and secrets cross into external systems.
- **Public internet to internal business tooling** — unauthenticated visitors can indirectly trigger internal workflows through Slack notifications, CRM updates, and email sends. That bridge must be strongly constrained.
- **Production vs dev-only code** — Vite dev server paths, tests, coverage output, and legacy schema artifacts are not in scope unless a current production route or server import proves reachability.

## Scan Anchors

- **Production entry points:** `server/index.ts`, `server/routes.ts`, `server/static.ts`, `client/src/entry-server.tsx`
- **Highest-risk areas:** `server/routes.ts`, `server/recaptcha.ts`, `server/slack.ts`, `server/email.ts`, `server/hubspot.ts`, `server/db.ts`
- **Public surfaces:** `/`, `/shells`, `/thesis`, `/about`, `/inquiry`, `GET /api/health`, `POST /api/waitlist`, `POST /api/members`
- **Usually ignore unless proven reachable:** `server/vite.ts`, test files under `client/src/test/`, coverage output, and legacy auth/admin-related schema tables without live routes

## Threat Categories

### Spoofing

The application intentionally accepts unauthenticated public submissions, so anti-automation controls are the primary identity check at the public/API boundary. The system must reject forged or replayed lead submissions unless the request passes the intended spam-defense checks, and it must not treat client claims like `brandSource` or other metadata as trusted business truth.

### Tampering

Attackers control every field sent to the lead endpoints, including free-form notes that are copied into internal systems. The server must validate shape, size, and allowed content before storing or forwarding data so attackers cannot manipulate CRM records, inject misleading internal notifications, or poison downstream workflows.

### Information Disclosure

Lead submissions contain business-contact data and inquiry details. The application must avoid leaking this data through logs, error responses, SSR output, or overly broad API responses, and secrets for third-party integrations must remain server-only.

### Denial of Service

Because the lead endpoints are public and fan out to database and third-party calls, they are attractive abuse targets even without authentication. The service must enforce effective anti-automation and request throttling so bots cannot generate sustained spam, notification floods, or excessive downstream API traffic.

### Elevation of Privilege

This codebase does not currently expose authenticated or admin production routes, so classic role-escalation risk is low on the live surface. The main guarantee here is that legacy auth/admin code paths and schema remnants must remain unreachable from production until they are backed by real server-side authentication and authorization checks.
