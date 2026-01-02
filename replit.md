# Opus 355 - Lead Generation Marketing Website

## Overview

Opus 355 is a lead generation marketing website for a design-led commercial workplace property located at 355 Main Street, Armonk, New York. The application showcases the building's architectural zones, furniture and equipment specifications, and allows prospective tenants to join a waitlist through HubSpot integration.

The project follows a "Commercial Town Hall" concept - positioning the office space as a flexible, modular workspace designed for the distributed work era. The site features rich visual presentations of different workspace zones with interactive floor plans and detailed equipment specifications.

**Architecture Note**: This is a marketing-only site. All authenticated member experiences (dashboard, preferences, hospitality) have been moved to a separate application at `app.opus355.com`. This site focuses on lead generation and waitlist capture.

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
│   └── replit_integrations/  # AI chat and image modules
├── shared/              # Shared types and schemas
└── attached_assets/     # Static images and zone SVGs
```

### Key Design Decisions

1. **Monorepo Structure**: Client and server code coexist with shared types, enabling type safety across the full stack without additional tooling.

2. **Whitebox Component Strategy**: UI components are copied into the project (shadcn/ui approach) rather than installed as dependencies, allowing full customization of the design system.

3. **Static Asset Strategy**: Zone visualization SVGs and building imagery are stored in `attached_assets/` and imported directly into components for optimal bundling.

4. **API Pattern**: Simple REST endpoints under `/api/*` prefix, with the Express server serving the built client in production.

5. **Marketing-First Architecture**: Authentication deprecated on this site; member login redirects to `app.opus355.com`.

## AI Concierge Chatbot

### Overview
The site features an AI-powered concierge chatbot to assist visitors with questions about the workspace. Uses Replit AI Integrations (OpenAI-compatible) - no API key needed, billed to Replit credits.

### Technical Implementation
- **Provider**: Replit AI Integrations (OpenAI-compatible API)
- **Model**: gpt-5.1 (or newer)
- **Streaming**: Server-Sent Events for real-time responses
- **Storage**: `conversations` and `messages` tables in PostgreSQL
- **Routes**: `/api/conversations/*` endpoints

### Chat Components
- **Backend**: `server/replit_integrations/chat/` - routes, storage, streaming
- **Frontend**: `client/src/components/chat-bubble.tsx` - floating chat UI
- **Schema**: `shared/models/chat.ts` - Drizzle schema for conversations

### Provider-Agnostic Design
The chat system is designed to be provider-agnostic for future flexibility:
- OpenAI integration via Replit AI (default)
- Easy to swap to Anthropic, Gemini, or OpenRouter
- Enterprise tenants could potentially choose their preferred AI provider

### Batch Processing
For bulk AI operations, use the batch utilities in `server/replit_integrations/batch/`:
- `batchProcess()` - Parallel processing with rate limiting
- `batchProcessWithSSE()` - Sequential processing with SSE progress
- Built-in retry logic for rate limit handling

## External Dependencies

### Third-Party Services

#### Stripe Payments (Retained)
- **Purpose**: Future AI-assisted deal closing from chatbot
- **Payments**: Stripe Checkout Sessions for subscription signup
- **Webhooks**: `invoice.paid` as primary access granter
- **Customer Portal**: Self-service billing management
- **Note**: Stripe kept for potential chatbot-initiated checkout flows

#### HubSpot CRM
- **Lead Capture**: Contact management via `@hubspot/api-client`
- **Authentication**: 
  - **Production**: Replit Connectors (OAuth token refresh)
  - **Development**: Private App token via `HUBSPOT_DEV_ACCESS_TOKEN`
- **Custom Properties**: `opus_membership_tier`, `opus_subscription_status`, `opus_member_id`, `opus_move_in_timing`, workspace preferences
- **Team Size Mapping**: App values mapped to HubSpot `numemployees` format

### Analytics
- **Google Analytics 4**: Tracking via gtag.js (ID: G-2VR7386HM6)
- **Environment-aware**: GA only loads in production (via `/api/config` endpoint)

### Infrastructure
- **Database**: PostgreSQL (connection via `DATABASE_URL` environment variable)
- **Session Storage**: connect-pg-simple for PostgreSQL-backed sessions

## Deprecated Features (Moved to app.opus355.com)

The following features have been deprecated on this marketing site and moved to the member application:

- **WorkOS Authentication**: Sign-in button commented out; OAuth flow preserved in code but not used
- **Member Dashboard**: `/dashboard` route removed from frontend routing
- **Member Preferences**: `/preferences` route removed
- **Hospitality Dashboard**: `/hospitality` route removed
- **Admin Panel**: `/admin` routes removed

## Integration Best Practices

- **Stripe**: Use `invoice.paid` (not `checkout.session.completed`) as most reliable event for granting access
- **HubSpot**: Provision custom properties in portal; fail gracefully on API errors to not block primary flows
- **Architecture**: Services should fail gracefully—external service failures shouldn't break core flows
- **AI Chat**: Conversations stored server-side; streaming enabled for responsive UX

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
- **Optional**: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- **AI**: `AI_INTEGRATIONS_OPENAI_API_KEY`, `AI_INTEGRATIONS_OPENAI_BASE_URL` (auto-configured by Replit)

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

## Health & Monitoring

### Health Check Endpoint
- **Endpoint**: GET `/api/health`
- **Returns**: JSON with status, timestamp, uptime, and services health
- **Database**: Checks connectivity and measures latency (ms)
- **External Services**: Reports Stripe configuration status
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
