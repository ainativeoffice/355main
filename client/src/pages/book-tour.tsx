import { useEffect } from "react";
import { Link } from "wouter";
import { SEO } from "@/components/seo";
import { Wifi, Armchair, Building2, Download } from "lucide-react";
import listingBrochure from "@assets/355_Main_Street_-_Listing_Brochure_Full_1774273451504.pdf";
import { trackEvent } from "@/lib/analytics";

export default function BookTour() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
    script.async = true;
    document.body.appendChild(script);
    trackEvent('landing_page_view', 'engagement', 'book_tour');
  }, []);

  return (
    <div className="min-h-screen bg-white text-foreground">
      <SEO 
        title="Book a Tour – Visit 355 Main in Armonk, NY"
        description="Tour 355 Main — now pre-leasing. Opening Spring 2026. Schedule your visit today."
        canonical="/book-a-tour"
      />
      
      <header className="py-6 border-b border-border">
        <div className="container mx-auto px-6 text-center">
          <Link href="/" className="font-serif text-2xl tracking-tight hover:opacity-80 transition-opacity" data-testid="link-logo-landing">
            355 Main
          </Link>
        </div>
      </header>

      <main>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h1 className="font-serif text-4xl md:text-6xl mb-6 tracking-tight">
              The Destination Workplace.<br />Now Previewing.
            </h1>
            <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              Now Pre-Leasing · Opening Spring 2026. Schedule a tour to see the space.
            </p>
            <p className="text-sm text-primary font-medium uppercase tracking-widest">
              Founding memberships and Level 2 contracts are currently under review.
            </p>
          </div>
        </section>

        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container mx-auto px-6 max-w-3xl">
            <div 
              className="meetings-iframe-container w-full min-h-[600px] bg-white border border-border shadow-sm" 
              data-src="https://meetings-na2.hubspot.com/parham/book-a-tour?embed=true"
              data-testid="hubspot-calendar-embed"
            />
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-8">
              <p className="text-sm text-primary font-medium uppercase tracking-widest mb-4">Preview Before You Visit</p>
              <h2 className="font-serif text-2xl md:text-3xl mb-3">Walk the Space</h2>
              <p className="text-muted-foreground text-lg">Explore Level 2 in 3D — before your visit.</p>
            </div>
            <div
              className="relative w-full aspect-video bg-muted overflow-hidden border border-border"
              data-testid="matterport-embed-tour"
            >
              <iframe
                src="https://my.matterport.com/show/?m=7pttzw8hwz6tizifpx9tsuxea"
                className="w-full h-full border-0"
                allowFullScreen
                allow="xr-spatial-tracking"
                title="355 Main - 3D Virtual Tour"
                loading="lazy"
              />
            </div>
            <div className="text-center mt-8">
              <a
                href={listingBrochure}
                download="355_Main_Listing_Brochure.pdf"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest font-medium"
                data-testid="link-download-brochure-tour"
              >
                <Download className="w-4 h-4" />
                Share with Your Team
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-2xl md:text-3xl text-center mb-12">Why Tour 355 Main</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wifi className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Grade A Spec</h3>
                <p className="text-muted-foreground text-sm">
                  Casambi Wireless Lighting & Enterprise Fiber.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Armchair className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Vitra & Artek</h3>
                <p className="text-muted-foreground text-sm">
                  Furnished with the best in Swiss & Finnish design.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">The Campus</h3>
                <p className="text-muted-foreground text-sm">
                  36,000 SF boutique ecosystem in the heart of Armonk.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border bg-muted/20">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p className="mb-2">355 Main Street, Armonk, NY</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/" className="hover:text-foreground transition-colors">
              Main Website
            </Link>
          </div>
          <p className="mt-4 text-xs">© 2025 355 Main. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
