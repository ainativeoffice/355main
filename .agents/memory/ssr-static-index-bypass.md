---
name: express.static can bypass SSR on "/"
description: Why the homepage may serve raw template HTML instead of SSR output, and how to verify per-route meta actually renders.
---

**Rule:** When Express serves a built SPA with `express.static(distPath)` in front of an SSR catch-all, the static middleware serves `dist/public/index.html` directly for `/`, silently bypassing SSR. Use `express.static(distPath, { index: false })` so `/` falls through to the SSR handler.

**Why:** The homepage looked SSR-rendered (same default title as the template fallback), so the bypass was invisible until per-route-only markers (og:url, google-site-verification, JSON-LD) were checked. Only the homepage was affected; other routes have no matching static file.

**How to apply:** After any change to SSR head injection, verify with `curl` against a production build on ALL routes including `/`, grepping for values that only the SSR path can produce (e.g. env-driven meta tags or per-route canonical). Also note: `vite-plugin-meta-images` rewrites og:image in the built template to the Replit dev domain — harmless in prod because the runtime SSR meta block overwrites it with the canonical https://355main.com URL.
