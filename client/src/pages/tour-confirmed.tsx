import { useEffect } from "react";
import { Link } from "wouter";
import { SEO } from "@/components/seo";
import { CheckCircle } from "lucide-react";
import { trackEvent, trackConversion } from "@/lib/analytics";

export default function TourConfirmed() {
  useEffect(() => {
    trackEvent('tour_booked', 'conversion', 'tour_confirmation');
    trackConversion('tour_booking');
  }, []);

  return (
    <div className="min-h-screen bg-white text-foreground flex flex-col">
      <SEO 
        title="Tour Confirmed | 355 Main"
        description="Your tour at 355 Main has been confirmed. We look forward to showing you around."
        canonical="/tour-confirmed"
      />
      
      <header className="py-6 border-b border-border">
        <div className="container mx-auto px-6 text-center">
          <Link href="/" className="font-serif text-2xl tracking-tight hover:opacity-80 transition-opacity" data-testid="link-logo-confirmed">
            355 Main
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-6 max-w-2xl text-center py-24">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl mb-6">Tour Confirmed</h1>
          
          <p className="text-xl text-muted-foreground mb-4">
            Thank you for scheduling a tour of 355 Main.
          </p>
          
          <p className="text-muted-foreground mb-8">
            You'll receive a calendar invitation shortly with all the details. We look forward to showing you around the space.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              data-testid="link-explore-site"
            >
              Explore 355 Main
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-border bg-muted/20">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p className="mb-2">355 Main Street, Armonk, NY</p>
          <p className="text-xs">© 2025 355 Main. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
