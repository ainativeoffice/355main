# 355 Main - Commercial Workplace Marketing Site

## Overview

355 Main is a static marketing and lead generation website for **Sovereign Intelligence, anchored in Armonk** — three executive commercial workspaces at 355 & 357 Main Street, Armonk, New York. The site presents the offering and captures inquiries directly to HubSpot CRM.

### Positioning: Sovereign Shells

355 Main offers three executive **Sovereign Shells** — Class A commercial real estate fused with on-premises, deterministic AI and outfitted with Vitra furniture. Each shell is held for a single institution. The project adopts North Castle Ventures' identity: **"Sovereign Intelligence, anchored in Armonk."**

The thesis: regulated legal and financial institutions cannot send sensitive data to public model APIs. The answer is on-premises, deterministic AI co-located with the people who use it — compute, counsel, and capital in one room. Guiding principles are determinism over probability, premises over cloud, and institution over crowd. **Alpha School** is referenced as a proof point.

**Shells (real suite data, Floor 1):** Shell A = Suite A (814 USF / 1,065 RSF, available), Shell B = Suite B (888 USF / 1,162 RSF, available), Shell C = Suite C (810 USF / 1,060 RSF, held by Trucast.ai — the "physical model of the thesis," in occupancy).

**Other tenants (proof points, not shells):** Northwell holds the Floor 1 back suite (2,440 USF / 3,193 RSF); Alpha School occupies all of Floor 2 (5,800 USF / 7,590 RSF). Total building: 10,752 USF / 14,070 RSF. Pricing and load factor are private — never published on the site.

### Ecosystem

- **North Castle Ventures** — northcastleventures.com (operator)
- **The RFC** — ainativeoffice.org
- **Nate** — nativeagentic.com
- **Trucast** — trucast.ai

### FF&E Partners

The building is outfitted with best-in-class furniture, fixtures, and equipment:

**Furniture**
- **Vitra** - Premium furniture enabling dynamic space reconfiguration

**Lighting**
- **BASO Lighting** - Round architectural fixtures above dynamic spaces
- **Louis Poulsen** - Danish architectural lighting design
- **Coronet** - Linear office fixtures for ambient illumination
- **Marset** - Soho pendants and mono points for accent and task lighting

**Controls & Smart Building**
- **Casambi** - Wireless lighting controls and scene management

### FF&E Index
- The full 30-item FF&E product photo catalog (recovered from the original pre-rebrand site) lives in `client/src/components/ffe-index.tsx` and is rendered in "The build" section of `/about`
- Each item: original product photo, brand, description, and outbound partner link (with UTM params)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

This is a **static-first marketing site** with minimal backend requirements.

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui component library (New York style) built on Radix UI
- **Animations**: Framer Motion for page transitions
- **Fonts**: Inter (sans-serif) and Playfair Display (serif)

### Backend Architecture
- **Runtime**: Node.js with Express (minimal server)
- **Purpose**: Static file serving + HubSpot API proxy + SSR rendering
- **Build**: Vite for client bundling, esbuild for server
- **SSR**: Server-side rendering enabled for production (improved SEO and AI crawler access)

### API Endpoints
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/health` | GET | Health check with uptime |
| `/api/waitlist` | POST | Simple email capture to HubSpot |
| `/api/members` | POST | Inquiry (RFC) form — lead + brief/notes to HubSpot, Resend, Slack |

### Project Structure
```
├── client/src/          # React frontend
│   ├── components/      # App components
│   │   ├── ui/          # shadcn/ui components (includes breadcrumb.tsx)
│   │   ├── breadcrumbs.tsx # Route-aware breadcrumb navigation
│   │   ├── layout.tsx   # Shared layout with header, footer, breadcrumbs
│   │   └── seo.tsx      # Dynamic SEO meta tags
│   ├── pages/           # Route components
│   ├── entry-server.tsx # SSR entry point
│   ├── entry-client.tsx # Client hydration entry
│   └── lib/             # Utilities
├── server/              # Express backend (minimal)
│   └── static.ts        # Production SSR rendering
├── shared/              # Shared validation schemas
└── attached_assets/     # Static images and SVGs
```

### Breadcrumbs
- Route-aware breadcrumbs rendered in the Layout component, visible on all content pages except the homepage
- Uses `wouter` `useLocation` to build trail from URL path segments
- Top-level pages show: Home > {Page} (e.g. Home > The Shells)
- The 404 page intentionally does not use Layout and has no breadcrumbs

### SEO Titles
- Content pages follow a consistent format: `{Page Name} – {Category Context} | 355 Main`
- Homepage uses brand-first format: `355 Main | Sovereign Intelligence, Anchored in Armonk`
- Titles kept under 60 characters for Google indexing

### Design System: Navy Accent
- Deep navy color token: `--color-navy: hsl(220 40% 20%)` — used for text highlights (eyebrow labels, ghost buttons, breadcrumb hover)
- Accent updated to light navy tint: `--color-accent: hsl(220 30% 95%)` — used for UI hover/focus backgrounds (shadcn/ui compatible)
- Ring/focus color: `--color-ring: hsl(220 40% 20%)` — matches navy
- Primary (charcoal) remains unchanged as the main brand color

### SSR & SEO
- `entry-server.tsx` wraps render with `MotionConfig reducedMotion="always"` so framer-motion content renders visible (at `animate` state) instead of hidden (at `initial={{ opacity: 0 }}`) — critical for Google indexing
- Trailing-slash URLs redirect 301 to canonical non-trailing-slash version (middleware in `routes.ts`)
- `static.ts` strips query strings/fragments before SSR meta lookup
- `robots.txt` at `client/public/robots.txt`, `sitemap.xml` at `client/public/sitemap.xml`
- Sitemap includes all public pages: `/`, `/shells`, `/thesis`, `/about`, `/inquiry`

### Listing Brochure
- PDF: `attached_assets/355_Main_-_Brochure_1774538930934.pdf`
- Download filename: `355_Main_Listing_Brochure.pdf`
- Retained in `attached_assets/` but not currently linked from the Sovereign IA pages

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Sovereign Intelligence, anchored in Armonk |
| `/shells` | The Shells — three executive Sovereign Shells (A/B/C) |
| `/thesis` | The Thesis — the argument for on-premises, deterministic AI |
| `/about` | The Campus — 355 & 357 Main on the North Castle Ventures campus |
| `/inquiry` | Inquiry — Request for Comment (RFC) lead form |

## External Services

### HubSpot CRM
- **Lead Capture**: All waitlist/contact forms push to HubSpot
- **Library**: `@hubspot/api-client`
- **Authentication**: 
  - **Production**: Replit Connectors (auto OAuth refresh)
  - **Development**: Private App token via `HUBSPOT_DEV_ACCESS_TOKEN`
- **Properties**: Uses standard HubSpot fields (firstname, lastname, company, jobtitle, numemployees, message)
- **Team Size Mapping**: App values mapped to HubSpot `numemployees` format
- **Preferences**: Stored in `message` field to avoid custom property errors
- **Tour Booking**: HubSpot Meetings embed at `meetings-na2.hubspot.com/parham/book-a-tour`

### Resend (Email Confirmations)
- **Purpose**: Send confirmation emails to leads after form submission
- **Library**: `resend` (replaced SendGrid in July 2026 after its account ran out of credits)
- **From Address**: `355 Main <leasing@northcastleventures.com>` (verified domain in Resend)
- **Reply-To**: `leasing@355main.com`
- **Templates**: 
  - Waitlist confirmation (simple signup)
  - Member confirmation (full lead form with personalized greeting)
- **Error Handling**: Non-blocking - form submissions succeed even if email fails

### Slack Notifications
- **Purpose**: Instant notifications when new leads submit forms
- **Webhook**: Incoming webhook to designated Slack channel
- **Notifications**:
  - Waitlist signups (email only)
  - Full lead submissions (name, company, role, team size, preferences)
- **Error Handling**: Non-blocking - form submissions succeed even if Slack fails

### reCAPTCHA v3 (Spam Protection)
- **Purpose**: Protect forms from spam submissions
- **Version**: reCAPTCHA v3 (invisible, score-based)
- **Site Key**: `6Lcell4sAAAAAFA3SCozHZMm34rouyzu2IMstGEc`
- **Score Threshold**: 0.5 (submissions below are blocked)
- **Protected Endpoints**: `/api/waitlist`, `/api/members`
- **Frontend**: `client/src/lib/recaptcha.ts` handles token generation
- **Backend**: `server/recaptcha.ts` verifies tokens

### Analytics
- **Google Tag Manager**: GTM-NW3M6VN8
- **Google Analytics**: G-2VR7386HM6
- **Google Ads**: AW-17910816102
- **Loading**: Script loads async, config called after load

## Development

### Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run check` | TypeScript type checking |

### Environment Variables
- `PORT` - Server port (default: 5000)
- `HUBSPOT_DEV_ACCESS_TOKEN` - HubSpot private app token (dev only)
- `RESEND_API_KEY` - Resend API key for confirmation emails
- `SLACK_WEBHOOK_URL` - Slack incoming webhook for lead notifications
- `RECAPTCHA_SECRET_KEY` - reCAPTCHA v3 secret key for spam protection
- `GOOGLE_SITE_VERIFICATION` - (optional) Google Search Console HTML-tag verification code; rendered as a meta tag when set

### Error Handling
- **Error Boundary**: `client/src/components/error-boundary.tsx` wraps app
- **HubSpot Failures**: Fail gracefully - don't block user experience

## SEO & Crawlers

- **Sitemap**: `client/public/sitemap.xml` (all 5 pages, absolute URLs, lastmod dates)
- **Robots**: `client/public/robots.txt` — explicitly allows major search + AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) and references the sitemap
- **LLMs.txt**: `client/public/llms.txt` for AI crawler context; `client/public/llms-full.txt` has a full page-by-page content summary
- **Structured data (JSON-LD)**: rendered server-side per route via `entry-server.tsx` (`buildJsonLd`) and injected by `server/static.ts` between `<!--ssr-jsonld-->` markers in `client/index.html`. Site-wide: `Organization` + `WebSite`. Per-page: `Place` (home, about), `RealEstateListing` for Shells A/B (no pricing — private), `AboutPage`, `ContactPage`. The static block in `index.html` is the dev/CSR fallback.
- **Open Graph**: SSR injects og:title/description/type/url/site_name/image (absolute URL) + Twitter card tags per route
- **Domain**: https://355main.com

### Google Search Console Setup (for the owner)
1. **Verify the property** at https://search.google.com/search-console — two options:
   - **DNS (recommended)**: add the property as a Domain property (`355main.com`) and add the TXT record Google gives you to the domain's DNS.
   - **HTML meta tag**: add the property as a URL-prefix property (`https://355main.com`), copy the `content` value from the meta tag Google gives you, and set it as the `GOOGLE_SITE_VERIFICATION` environment variable (production secret). The site renders `<meta name="google-site-verification" ...>` automatically when it's set — no code change needed. Redeploy after setting it.
2. **Submit the sitemap**: in GSC → Sitemaps, submit `https://355main.com/sitemap.xml`.
3. **Request indexing**: in GSC → URL Inspection, paste each of the 5 URLs (`/`, `/shells`, `/thesis`, `/about`, `/inquiry`) and click "Request Indexing".

## Security Dependency Overrides

The `package.json` includes npm `overrides` to pin transitive dependencies to secure versions:
- **minimatch**: 10.2.3 (addresses vulnerabilities in v3.x and v9.x)
- **axios**: 1.13.5 (addresses vulnerabilities in v1.13.2)
- **basic-ftp**: 6.0.1 (addresses multiple high-severity vulnerabilities in v5.x)
- **uuid**: >=11.1.1 (addresses GHSA-w5hq-g745-h8pq missing bounds check)
- **esbuild**: $esbuild (forces @esbuild-kit/core-utils to use project's safe esbuild version, addresses GHSA-67mh-4wv8-2f99)

Additionally, **vitest** was upgraded to 4.1.x (from 4.0.16) to clear a critical advisory (GHSA-5xrq-8626-4rwp) that was blocking deployment.

Note: rollup remains at 4.x as required by Vite 7. The security scan suggestion to downgrade to 2.80.0 is incompatible with the build toolchain and appears to be a false positive.

## Contact

- **Leasing**: leasing@355main.com
- **Support**: support@355main.com
