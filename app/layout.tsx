import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";
import "./globals.css";

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
    images: [{ url: "/images/355-main-social.png", width: 1200, height: 630, alt: "355 Main in Armonk, New York" }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "355 Main | Armonk, NY", description: "A building for the work ahead.", images: ["/images/355-main-social.png"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f4f1ea" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable} bg-background`}>
      <body>{children}<Analytics /><SpeedInsights /></body>
    </html>
  );
}
