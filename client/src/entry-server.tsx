import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Switch, Route } from "wouter";
import { MotionConfig } from "framer-motion";

import Home from "@/pages/home";
import About from "@/pages/about";
import Brokers from "@/pages/brokers";
import Enterprise from "@/pages/enterprise";
import Landlords from "@/pages/landlords";
import Solutions from "@/pages/solutions";
import CustomOffices from "@/pages/solutions/custom-offices";
import PrivateOffices from "@/pages/solutions/private-offices";
import HybridMemberships from "@/pages/solutions/hybrid";
import NotFound from "@/pages/not-found";

function StaticRouter({ url }: { url: string }) {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/brokers" component={Brokers} />
      <Route path="/enterprise" component={Enterprise} />
      <Route path="/landlords" component={Landlords} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/solutions/custom-offices" component={CustomOffices} />
      <Route path="/solutions/private-offices" component={PrivateOffices} />
      <Route path="/solutions/hybrid" component={HybridMemberships} />
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

const routeMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "355 Main | The Destination Workplace in Armonk, NY",
    description: "Premium workspace solutions at 355 Main Street, Armonk NY. Custom offices, private offices, and hybrid memberships for the distributed work era.",
  },
  "/about": {
    title: "About Us \u2013 Our Vision & Story | 355 Main",
    description: "Discover 355 Main - The Office Club reimagining workspace for the distributed age. Premium location at 355 Main Street, Armonk, New York.",
  },
  "/solutions": {
    title: "Workspace Solutions \u2013 Offices & Memberships | 355 Main",
    description: "Explore workspace solutions at 355 Main: custom offices, private offices, and hybrid memberships designed for modern teams.",
  },
  "/solutions/custom-offices": {
    title: "Custom Office Suites \u2013 Tailored Workspaces | 355 Main",
    description: "Ground-up design-build workspace tailored to your organization. Fully customizable private office suites at 355 Main in Armonk, NY.",
  },
  "/solutions/private-offices": {
    title: "Private Offices \u2013 Move-In Ready | 355 Main",
    description: "Move-in ready private offices with Vitra Tyde 2 configurations for teams of 1-15. Premium furnishings at 355 Main in Armonk, NY.",
  },
  "/solutions/hybrid": {
    title: "Hybrid Memberships \u2013 Flexible Workspace Access | 355 Main",
    description: "Flexible workspace access for distributed teams. Day passes, monthly memberships, and all-inclusive amenities at 355 Main.",
  },
  "/enterprise": {
    title: "Enterprise Solutions \u2013 Large Team Workspaces | 355 Main",
    description: "Custom workspace solutions for large organizations. Flexible terms, dedicated support, and premium amenities at 355 Main.",
  },
  "/brokers": {
    title: "Broker Partners \u2013 Commercial Leasing | 355 Main",
    description: "Partner with 355 Main to offer your clients premium workspace solutions. Competitive commissions and dedicated broker support.",
  },
  "/landlords": {
    title: "Landlord Partnerships \u2013 Property Solutions | 355 Main",
    description: "Transform your commercial property into a destination workplace. Partnership opportunities with 355 Main.",
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
