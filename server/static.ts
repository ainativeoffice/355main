import express, { type Express } from "express";
import fs from "fs";
import path from "path";

interface RenderResult {
  html: string;
  head: {
    title: string;
    description: string;
    canonical: string | null;
    jsonLd: string;
  };
}

type RenderFunction = (url: string) => RenderResult;

export async function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  const ssrPath = path.resolve(__dirname, "ssr/entry-server.js");
  
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  let template = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");
  
  let render: RenderFunction | null = null;
  
  if (fs.existsSync(ssrPath)) {
    try {
      const ssrModule = await import(ssrPath);
      render = ssrModule.render;
      console.log("[SSR] Server-side rendering enabled");
    } catch (err) {
      console.error("[SSR] Failed to load SSR module:", err);
    }
  } else {
    console.log("[SSR] SSR bundle not found, falling back to client-side rendering");
  }

  // index: false so "/" falls through to the SSR handler below instead of
  // being served the raw index.html template by the static middleware.
  app.use(express.static(distPath, { index: false }));

  const validRoutes = new Set(["/", "/shells", "/thesis", "/about", "/inquiry"]);

  app.use("*", (req, res) => {
    const url = req.originalUrl.split('?')[0]!.split('#')[0]!;
    const statusCode = validRoutes.has(url) ? 200 : 404;
    
    if (render) {
      try {
        const { html, head } = render(url);

        const gscVerification = process.env.GOOGLE_SITE_VERIFICATION
          ? `\n    <meta name="google-site-verification" content="${process.env.GOOGLE_SITE_VERIFICATION}" />`
          : "";

        let page = template
          .replace("<!--ssr-outlet-->", html)
          .replace(
            /<!--ssr-title-->[\s\S]*?<!--\/ssr-title-->/,
            `<title>${head.title}</title>`
          )
          .replace(
            /<!--ssr-meta-->[\s\S]*?<!--\/ssr-meta-->/,
            `<meta property="og:title" content="${head.title}" />
    <meta property="og:description" content="${head.description}"/>
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${head.canonical ?? "https://355main.com/"}" />
    <meta property="og:site_name" content="355 Main" />
    <meta property="og:image" content="https://355main.com/opengraph.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${head.title}" />
    <meta name="twitter:description" content="${head.description}" />
    <meta name="twitter:image" content="https://355main.com/opengraph.jpg" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image:alt" content="355 Main campus exterior in Armonk, New York" />
    <meta name="twitter:image:alt" content="355 Main campus exterior in Armonk, New York" />
    
    <meta name="description" content="${head.description}" />${head.canonical === null ? `\n    <meta name="robots" content="noindex,follow" />` : `\n    <meta name="keywords" content="Sovereign Shells, Armonk, Westchester, Class A office, on-premises AI, deterministic AI, executive workspace, North Castle Ventures, Vitra" />\n    <link rel="canonical" href="${head.canonical}" />`}${gscVerification}`
          )
          .replace(
            /<!--ssr-jsonld-->[\s\S]*?<!--\/ssr-jsonld-->/,
            head.jsonLd
          );
        
        res.status(statusCode).set({ "Content-Type": "text/html" }).end(page);
      } catch (err) {
        console.error("[SSR] Render error:", err);
        res.status(statusCode).sendFile(path.resolve(distPath, "index.html"));
      }
    } else {
      res.status(statusCode).sendFile(path.resolve(distPath, "index.html"));
    }
  });
}
