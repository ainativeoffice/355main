# Opus 355 - Commercial Workplace Platform

## Overview

Opus 355 is a marketing and lead generation website for a design-led commercial workplace property located at 355 Main Street, Armonk, New York. The application showcases the building's architectural zones, furniture and equipment specifications, and allows prospective tenants to join a waitlist through HubSpot integration.

### Positioning: The Office Club

Opus 355 operates as a **Destination Workplace**—a place people want to go, not just have to go. The project follows the **Office Club** model, serving both single-user tenants and flex office segments with public, semi-private, and private zones designed for the distributed work era.

The space features **Dynamic Spaces**—flexible zones that transform to support different work modes including focus work, collaboration, meetings, workshops, and presentations. Premium furniture enables rapid reconfiguration to match any work style or team need.

### FF&E Partners

The building is outfitted with best-in-class furniture, fixtures, and equipment from industry-leading partners:

**Furniture**
- **Vitra** - Premium furniture enabling dynamic space reconfiguration; trusted partner for modular office solutions

**Lighting**
- **BASO Lighting** - Round architectural fixtures above dynamic spaces
- **Louis Poulsen** - Danish architectural lighting design
- **Coronet** - Linear office fixtures for ambient illumination
- **Marset** - Soho pendants and mono points for accent and task lighting

**Controls & Smart Building**
- **Casambi** - Wireless lighting controls and scene management enabling personalized lighting experiences throughout the space

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with custom design tokens defined in CSS variables
- **UI Components**: shadcn/ui component library (New York style) built on Radix UI primitives
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Fonts**: Inter (sans-serif) and Playfair Display (serif) for brand typography

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ES modules
- **Build System**: 
  - Vite for client-side bundling
  - esbuild for server bundling (optimized for cold start performance)
- **Development**: Hot module replacement via Vite dev server with proxy to Express

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Validation**: Zod schemas with drizzle-zod integration
- **Migrations**: Drizzle Kit with `db:push` command

### Project Structure
```
├── client/src/          # React frontend
│   ├── components/ui/   # shadcn/ui components
│   ├── pages/           # Route components
│   └── lib/             # Utilities and query client
├── server/              # Express backend
├── shared/              # Shared types and schemas
└── attached_assets/     # Static images and zone SVGs
```

### Key Design Decisions

1. **Monorepo Structure**: Client and server code coexist with shared types, enabling type safety across the full stack without additional tooling.

2. **Whitebox Component Strategy**: UI components are copied into the project (shadcn/ui approach) rather than installed as dependencies, allowing full customization of the design system.

3. **Static Asset Strategy**: Zone visualization SVGs and building imagery are stored in `attached_assets/` and imported directly into components for optimal bundling.

4. **API Pattern**: Simple REST endpoints under `/api/*` prefix, with the Express server serving the built client in production.

## External Dependencies

### Third-Party Services

#### WorkOS Authentication
- **Authentication**: WorkOS AuthKit with OAuth 2.0 flow
- **Session**: Tokens stored server-side in encrypted session (HttpOnly cookies)
- **Token Refresh**: Automatic refresh when access token expires (5 min default)
- **Integration Pattern**: Store access + refresh tokens, rotate on refresh

#### Stripe Subscriptions  
- **Payments**: Stripe Checkout Sessions for subscription signup
- **Webhooks**: `invoice.paid` as primary access granter (more reliable than checkout.session.completed)
- **Idempotency**: Event ID tracking to prevent duplicate processing
- **Customer Portal**: Self-service billing management

#### HubSpot CRM
- **Lead Capture**: Contact management via `@hubspot/api-client`
- **Authentication**: 
  - **Production**: Replit Connectors (OAuth token refresh)
  - **Development**: Private App token via `HUBSPOT_DEV_ACCESS_TOKEN`
- **Custom Properties**: `opus_membership_tier`, `opus_subscription_status`, `opus_member_id`, `opus_move_in_timing`, workspace preferences
- **Team Size Mapping**: App values mapped to HubSpot `numemployees` format (e.g., "1" → "1-5", "30+" → "25-50")
- **Lifecycle Automation**: Lead → Subscriber on tier upgrade, sync on subscription changes

### Analytics
- **Google Tag Manager**: GT-TNSNWWM7 (Google Tag via gtag.js)
- **Loading**: Script loads async, config called after script loads

### Infrastructure
- **Database**: PostgreSQL (connection via `DATABASE_URL` environment variable)
- **Session Storage**: connect-pg-simple for PostgreSQL-backed sessions

## Hospitality & Smart Building Features

### Member Preferences System
- **Beverage Preferences**: Morning/afternoon drink selections with special instructions
- **Workspace Comfort**: Temperature and lighting preferences, preferred zone
- **Arrival Settings**: Hospitality notification toggle, calendar sync, location-based arrival
- **Special Touches**: Birthday, dietary restrictions, special notes

### Hospitality Dashboard (Staff Only)
- **Real-time Arrivals**: View members arriving with ETA, beverage orders, and zone destinations
- **Workflow**: Mark beverages as prepared, confirm member arrivals
- **Authorization**: Staff/admin role required (requireStaff middleware)

### Future Smart Building Integrations
- **Casambi**: Lighting control system API
- **Dante AV**: Audio-visual routing system
- **Otis Elevator**: Elevator dispatch on member arrival
- **Virtual Keypad**: Access control integration

## Integration Best Practices

- **Stripe**: Use `invoice.paid` (not `checkout.session.completed`) as most reliable event for granting access
- **WorkOS**: Access tokens expire in 5 minutes; refresh tokens rotate on each use; clear session on refresh failure
- **HubSpot**: Provision custom properties in portal; fail gracefully on API errors to not block primary flows
- **Architecture**: Services should fail gracefully—external service failures shouldn't break core flows
- **Staff Authorization**: Hospitality routes use `requireStaff` middleware checking member role for admin/staff access

### Development Tools
- **Replit Plugins**: 
  - Runtime error overlay
  - Cartographer (development only)
  - Dev banner (development only)
  - Meta images plugin for OpenGraph tag management

### Environment Validation
- **Location**: `server/env-validation.ts`
- **Behavior**: Validates required environment variables at startup, fails fast with clear error messages
- **Required**: `DATABASE_URL`
- **Optional with defaults**: `SESSION_SECRET`, `PORT`
- **Optional**: `WORKOS_API_KEY`, `WORKOS_CLIENT_ID`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`

### Error Boundaries
- **Component**: `client/src/components/error-boundary.tsx`
- **Behavior**: Catches React component errors, displays friendly error message with retry/reload options
- **Development**: Shows technical details (error message, component stack) in expandable section
- **Usage**: Wraps entire app in `App.tsx`

### Database Seeding
- **Script**: `scripts/seed.ts`
- **Run Command**: `npx tsx scripts/seed.ts`
- **Creates**: Sample testimonials, news articles, members, and member preferences
- **Cleanup**: Uses seed marker email to track and clean up seeded data on re-run
- **Note**: Safe to run multiple times (clears previous seeded data first)

### Test Authentication (Development Only)
- **Routes**: `POST /api/test/auth/login`, `POST /api/test/auth/logout`
- **Guard**: Only available when `REPLIT_DEPLOYMENT !== "1"`
- **Purpose**: Enables automated testing of authenticated features without OAuth

## Health & Monitoring

### Health Check Endpoint
- **Endpoint**: GET `/api/health`
- **Returns**: JSON with status, timestamp, uptime, and services health
- **Database**: Checks connectivity and measures latency (ms)
- **External Services**: Reports WorkOS and Stripe configuration status
- **HTTP Codes**: 200 (healthy), 503 (unhealthy)

### Performance Testing
- **Lighthouse CI**: Configured via `lighthouserc.js`
- **Pages Tested**: /, /solutions, /enterprise, /landlords
- **Thresholds**: Performance ≥0.7, Accessibility ≥0.9, Best Practices ≥0.8, SEO ≥0.8
- **Run Command**: `npx lhci autorun` (requires server running)

## Code Quality

### TypeScript Strict Mode
- **Configuration**: `tsconfig.json` with strict mode enabled
- **Additional Flags**: `noUncheckedIndexedAccess`, `noImplicitOverride`, `forceConsistentCasingInFileNames`, `noFallthroughCasesInSwitch`, `noImplicitReturns`
- **Run Check**: `npx tsc --noEmit`

### Route Parameter Validation
- **Helper**: `parseIdParam(id: string | undefined): number | null` in `server/routes.ts`
- **Pattern**: All routes with `:id` params must validate using this helper before database access
- **Returns**: Valid positive integer or `null` for invalid/missing IDs
- **Usage**: Return 400 status with error message when `parseIdParam` returns `null`

### Code Formatting
- **Prettier**: Configured via `.prettierrc`
- **ESLint Integration**: `eslint-config-prettier` disables conflicting rules
- **Format Check**: `npx prettier --check "**/*.{ts,tsx,js,jsx,json,css,md}"`
- **Format Fix**: `npx prettier --write "**/*.{ts,tsx,js,jsx,json,css,md}"`

### Pre-commit Hooks
- **Tool**: Lefthook (configured via `lefthook.yml`)
- **Pre-commit**: Runs ESLint, TypeScript check, and Prettier on staged files
- **Pre-push**: Runs Vitest tests
- **Install Hooks**: `npx lefthook install`