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
- **Purpose**: Static file serving + HubSpot API proxy
- **Build**: Vite for client bundling, esbuild for server

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
│   └── lib/             # Utilities
├── server/              # Express backend (minimal)
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

## External Services

### HubSpot CRM
- **Lead Capture**: All waitlist/contact forms push to HubSpot
- **Library**: `@hubspot/api-client`
- **Authentication**: 
  - **Production**: Replit Connectors (auto OAuth refresh)
  - **Development**: Private App token via `HUBSPOT_DEV_ACCESS_TOKEN`
- **Custom Properties**: `opus_move_in_timing`, `opus_private_desks`, `opus_hybrid_seats`, `opus_amenities`, `opus_workspace_type`
- **Team Size Mapping**: App values mapped to HubSpot `numemployees` format

### Analytics
- **Google Tag Manager**: GT-TNSNWWM7
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

### Error Handling
- **Error Boundary**: `client/src/components/error-boundary.tsx` wraps app
- **HubSpot Failures**: Fail gracefully - don't block user experience

## SEO & Crawlers

- **Sitemap**: `client/public/sitemap.xml`
- **LLMs.txt**: `client/public/llms.txt` for AI crawler context
- **Domain**: https://355main.com

## Contact

- **Leasing**: leasing@355main.com
- **Support**: support@355main.com
