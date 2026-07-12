import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";
import { availableSuites } from "@/lib/suites";
import "./globals.css";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://355main.com/#owner", name: "North Castle Ventures", url: "https://northcastleventures.com" },
    {
      "@type": ["Place", "OfficeBuilding"],
      "@id": "https://355main.com/#building",
      name: "355 Main",
      url: "https://355main.com",
      address: { "@type": "PostalAddress", streetAddress: "355 Main Street", addressLocality: "Armonk", addressRegion: "NY", addressCountry: "US" },
      owner: { "@id": "https://355main.com/#owner" },
      managedBy: { "@id": "https://355main.com/#owner" },
      isPartOf: { "@type": "Place", name: "Armonk Professional Center", url: "https://armonkprofessionalcenter.com" },
    },
    ...availableSuites.map((suite) => ({
      "@type": "Offer",
      name: `${suite.name} at 355 Main`,
      availability: "https://schema.org/InStock",
      itemOffered: { "@type": "Accommodation", name: suite.name, floorSize: { "@type": "QuantitativeValue", value: suite.area.replace(/[^0-9]/g, ""), unitText: "square feet" }, containedInPlace: { "@id": "https://355main.com/#building" } },
    })),
  ],
};

const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://355main.com"),
  title: "355 Main | Class A Office Suites in Armonk, NY",
  description: "Explore available Class A office suites at 355 Main, part of Armonk Professional Center and owned and managed by North Castle Ventures.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "355 Main | A Building for the Work Ahead",
    description: "Class A office suites and sovereign technology infrastructure within Armonk Professional Center.",
    url: "https://355main.com",
    siteName: "355 Main",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "355 Main — Class A office suites in Armonk, New York" }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "355 Main | Armonk, NY", description: "A building for the work ahead.", images: ["/opengraph-image"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f4f1ea" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable} bg-background`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
