# 355 Main - Commercial Workplace Marketing Site

## Overview

355 Main is a static marketing and lead generation website for **The Destination Workplace** - a commercial workspace property located at 355 Main Street, Armonk, New York. The site showcases workspace solutions and captures leads directly to HubSpot CRM.

### Positioning: The Office Club

355 Main operates as a **Destination Workplace**—a place people want to go, not just have to go. The project follows the **Office Club** model, serving both single-user tenants and flex office segments with public, semi-private, and private zones designed for the distributed work era.

The space features **Dynamic Spaces**—flexible zones that transform to support different work modes including focus work, collaboration, meetings, workshops, and presentations. Premium furniture enables rapid reconfiguration to match any work style or team need.

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
| `/api/members` | POST | Full lead form with preferences to HubSpot |

### Project Structure
```
├── client/src/          # React frontend
│   ├── components/ui/   # shadcn/ui components
│   ├── pages/           # Route components
│   ├── entry-server.tsx # SSR entry point
│   ├── entry-client.tsx # Client hydration entry
│   └── lib/             # Utilities
├── server/              # Express backend (minimal)
│   └── static.ts        # Production SSR rendering
├── shared/              # Shared validation schemas
└── attached_assets/     # Static images and SVGs
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home - The Destination Workplace overview |
| `/about` | Building story and vision |
| `/solutions` | Workspace solutions overview |
| `/solutions/custom-offices` | Fully customizable private suites |
| `/solutions/private-offices` | Ready-to-use furnished offices |
| `/solutions/hybrid` | Flexible access memberships |
| `/enterprise` | Large organization solutions |
| `/landlords` | Partnership opportunities for property owners |
| `/brokers` | Commercial real estate professional info |
| `/book-a-tour` | Google Ads landing page with HubSpot calendar embed |
| `/tour-confirmed` | Tour booking confirmation with conversion tracking |

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

### SendGrid (Email Confirmations)
- **Purpose**: Send confirmation emails to leads after form submission
- **Library**: `@sendgrid/mail`
- **From Address**: `leasing@355main.com`
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
- `SENDGRID_API_KEY` - SendGrid API key for confirmation emails
- `SLACK_WEBHOOK_URL` - Slack incoming webhook for lead notifications
- `RECAPTCHA_SECRET_KEY` - reCAPTCHA v3 secret key for spam protection

### Error Handling
- **Error Boundary**: `client/src/components/error-boundary.tsx` wraps app
- **HubSpot Failures**: Fail gracefully - don't block user experience

## SEO & Crawlers

- **Sitemap**: `client/public/sitemap.xml`
- **LLMs.txt**: `client/public/llms.txt` for AI crawler context
- **Domain**: https://355main.com

## Security Dependency Overrides

The `package.json` includes npm `overrides` to pin transitive dependencies to secure versions:
- **minimatch**: 10.2.3 (addresses vulnerabilities in v3.x and v9.x)
- **axios**: 1.13.5 (addresses vulnerabilities in v1.13.2)
- **basic-ftp**: 5.2.0 (addresses vulnerabilities in v5.1.0)

Note: rollup remains at 4.x as required by Vite 7. The security scan suggestion to downgrade to 2.80.0 is incompatible with the build toolchain and appears to be a false positive.

## Contact

- **Leasing**: leasing@355main.com
- **Support**: support@355main.com
