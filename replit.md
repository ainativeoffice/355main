# Opus 355 - Commercial Workplace Platform

## Overview

Opus 355 is a marketing and lead generation website for a design-led commercial workplace property located at 355 Main Street, Armonk, New York. The application showcases the building's architectural zones, furniture and equipment specifications, and allows prospective tenants to join a waitlist through HubSpot integration.

The project follows a "Commercial Town Hall" concept - positioning the office space as a flexible, modular workspace designed for the distributed work era. The site features rich visual presentations of different workspace zones with interactive floor plans and detailed equipment specifications.

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
- **Google Analytics 4**: Tracking via gtag.js (ID: G-2VR7386HM6)
- **Environment-aware**: GA only loads in production (via `/api/config` endpoint)

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