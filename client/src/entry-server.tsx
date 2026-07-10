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
    jsonLd: string;
  };
}

const BASE_URL = "https://355main.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "355 Main",
  alternateName: "North Castle Ventures — 355 Main",
  url: BASE_URL,
  logo: `${BASE_URL}/logo-355main.png`,
  image: `${BASE_URL}/opengraph.jpg`,
  email: "leasing@355main.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "355 Main Street",
    addressLocality: "Armonk",
    addressRegion: "NY",
    postalCode: "10504",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Leasing",
    email: "leasing@355main.com",
  },
  sameAs: [
    "https://northcastleventures.com",
    "https://ainativeoffice.org",
    "https://nativeagentic.com",
    "https://trucast.ai",
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "355 Main",
  alternateName: "Sovereign Intelligence, Anchored in Armonk",
  url: BASE_URL,
  publisher: { "@id": `${BASE_URL}/#organization` },
};

const buildingPlaceSchema = {
  "@context": "https://schema.org",
  "@type": "Place",
  "@id": `${BASE_URL}/#building`,
  name: "355 & 357 Main Street",
  description:
    "Class A commercial buildings on the North Castle Ventures campus in Armonk, New York — home of the three executive Sovereign Shells, fused with on-premises, deterministic AI and outfitted with Vitra.",
  url: BASE_URL,
  image: `${BASE_URL}/opengraph.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "355 Main Street",
    addressLocality: "Armonk",
    addressRegion: "NY",
    postalCode: "10504",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.1265,
    longitude: -73.714,
  },
};

function buildBreadcrumbList(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function shellListing(
  name: string,
  suite: string,
  usf: number,
  rsf: number,
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: `${name} — ${suite}, 355 Main, Armonk NY`,
    url: `${BASE_URL}/shells`,
    description,
    datePosted: "2026-07-10",
    about: {
      "@type": "Accommodation",
      name: `${name} (${suite})`,
      accommodationCategory: "Commercial office suite",
      floorLevel: "1",
      floorSize: {
        "@type": "QuantitativeValue",
        value: usf,
        unitText: "USF (usable square feet)",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "355 Main Street",
        addressLocality: "Armonk",
        addressRegion: "NY",
        postalCode: "10504",
        addressCountry: "US",
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Rentable area",
        value: `${rsf.toLocaleString("en-US")} RSF`,
      },
      { "@type": "PropertyValue", name: "Status", value: "Available" },
      {
        "@type": "PropertyValue",
        name: "Occupancy model",
        value: "Single institution per shell",
      },
    ],
  };
}

const routeJsonLd: Record<string, object[]> = {
  "/": [buildingPlaceSchema],
  "/shells": [
    buildBreadcrumbList([
      { name: "Home", url: BASE_URL },
      { name: "The Shells", url: `${BASE_URL}/shells` },
    ]),
    shellListing(
      "Shell A",
      "Suite A",
      814,
      1065,
      "The Executive Node — executive Sovereign Shell on Floor 1 of 355 Main, Armonk. 814 USF / 1,065 RSF of Class A space fused with on-premises, deterministic AI, STC-55 acoustic shielding, and dedicated air-gapped fiber, outfitted with Vitra. Available for a single institution.",
    ),
    shellListing(
      "Shell B",
      "Suite B",
      888,
      1162,
      "The Operations Node — the largest executive Sovereign Shell on Floor 1 of 355 Main, Armonk. 888 USF / 1,162 RSF of Class A space fused with on-premises, deterministic AI, STC-55 acoustic shielding, and dedicated air-gapped fiber, outfitted with Vitra. Available for a single institution.",
    ),
  ],
  "/thesis": [
    buildBreadcrumbList([
      { name: "Home", url: BASE_URL },
      { name: "The Thesis", url: `${BASE_URL}/thesis` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "@id": `${BASE_URL}/thesis#article`,
      headline: "The Thesis — Sovereign Intelligence, Anchored in Armonk",
      description:
        "Why regulated legal and financial institutions need on-premises, deterministic AI co-located with the people who use it. The 355 Main thesis.",
      url: `${BASE_URL}/thesis`,
      mainEntityOfPage: `${BASE_URL}/thesis`,
      image: `${BASE_URL}/opengraph.jpg`,
      datePublished: "2026-07-10",
      author: { "@id": `${BASE_URL}/#organization` },
      publisher: { "@id": `${BASE_URL}/#organization` },
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: [
        { "@type": "Thing", name: "On-premises AI" },
        { "@type": "Thing", name: "Deterministic AI" },
        { "@type": "Thing", name: "Sovereign workspace" },
        { "@type": "Thing", name: "Commercial real estate" },
      ],
      keywords:
        "on-premises AI, deterministic AI, sovereign workspace, regulated institutions, legal AI, financial AI, Armonk, North Castle Ventures",
    },
  ],
  "/about": [
    buildBreadcrumbList([
      { name: "Home", url: BASE_URL },
      { name: "The Campus", url: `${BASE_URL}/about` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${BASE_URL}/about#page`,
      name: "The Campus — 355 & 357 Main, Armonk, New York",
      url: `${BASE_URL}/about`,
      description:
        "355 & 357 Main Street on the North Castle Ventures campus in Armonk, New York — Class A buildings outfitted with Vitra for sovereign work.",
      about: { "@id": `${BASE_URL}/#building` },
      isPartOf: { "@id": `${BASE_URL}/#website` },
    },
    buildingPlaceSchema,
  ],
  "/inquiry": [
    buildBreadcrumbList([
      { name: "Home", url: BASE_URL },
      { name: "Inquiry", url: `${BASE_URL}/inquiry` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `${BASE_URL}/inquiry#page`,
      name: "Inquiry — Request for Comment | 355 Main",
      url: `${BASE_URL}/inquiry`,
      description:
        "Begin a private inquiry for a Sovereign Shell at 355 Main, Armonk. Inquiries are reviewed personally by North Castle Ventures.",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#organization` },
    },
  ],
};

function buildJsonLd(url: string): string {
  const blocks = [
    organizationSchema,
    webSiteSchema,
    ...(routeJsonLd[url] ?? []),
  ];
  return blocks
    .map(
      (block) =>
        `<script type="application/ld+json">${JSON.stringify(block).replace(/</g, "\\u003c")}</script>`,
    )
    .join("\n    ");
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
      jsonLd: buildJsonLd(url),
    },
  };
}
