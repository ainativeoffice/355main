import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Switch, Route } from "wouter";
import { MotionConfig } from "framer-motion";

import Home from "@/pages/home";
import Shells from "@/pages/shells";
import Thesis from "@/pages/thesis";
import About from "@/pages/about";
import Inquiry from "@/pages/inquiry";
import NotFound from "@/pages/not-found";

function StaticRouter({ url }: { url: string }) {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shells" component={Shells} />
      <Route path="/thesis" component={Thesis} />
      <Route path="/about" component={About} />
      <Route path="/inquiry" component={Inquiry} />
      <Route component={NotFound} />
    </Switch>
  );
}

interface RenderResult {
  html: string;
  head: {
    title: string;
    description: string;
    canonical: string;
  };
}

const DEFAULT_DESCRIPTION =
  "Three executive Sovereign Shells on the North Castle Ventures campus in Armonk, NY — Class A commercial real estate fused with on-premises AI, outfitted with Vitra.";

const routeMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "355 Main | Sovereign Intelligence, Anchored in Armonk",
    description: DEFAULT_DESCRIPTION,
  },
  "/shells": {
    title: "The Shells \u2013 Three Sovereign Shells | 355 Main",
    description:
      "Three executive Sovereign Shells at 355 Main, Armonk — Class A space fused with on-premises AI and outfitted with Vitra. Held one institution per shell.",
  },
  "/thesis": {
    title: "The Thesis \u2013 Sovereign Intelligence | 355 Main",
    description:
      "Why regulated legal and financial institutions need on-premises, deterministic AI co-located with the people who use it. The 355 Main thesis.",
  },
  "/about": {
    title: "The Campus \u2013 Armonk, New York | 355 Main",
    description:
      "355 & 357 Main Street on the North Castle Ventures campus in Armonk, New York — Class A buildings outfitted with Vitra for sovereign work.",
  },
  "/inquiry": {
    title: "Inquiry \u2013 Request for Comment | 355 Main",
    description:
      "Begin a private inquiry for a Sovereign Shell at 355 Main, Armonk. Inquiries are reviewed personally by North Castle Ventures.",
  },
};

export function render(url: string): RenderResult {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
      },
    },
  });

  const staticHook = (): [string, (path: string) => void] => [url, () => {}];

  const html = renderToString(
    <MotionConfig reducedMotion="always">
      <Router hook={staticHook}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <StaticRouter url={url} />
          </TooltipProvider>
        </QueryClientProvider>
      </Router>
    </MotionConfig>
  );

  const meta = routeMeta[url] ?? routeMeta["/"]!;

  return {
    html,
    head: {
      title: meta.title,
      description: meta.description,
      canonical: `https://355main.com${url === "/" ? "" : url}`,
    },
  };
}
