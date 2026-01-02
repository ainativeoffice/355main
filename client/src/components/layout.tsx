import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { JoinWaitlistDialog } from "./join-waitlist-dialog";
import { ChatBubble } from "./chat-bubble";

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [membershipOpen, setMembershipOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-primary/20">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl sm:text-2xl tracking-tight hover:opacity-80 transition-opacity z-10" data-testid="link-logo">
            Opus 355
          </Link>

          <button 
            className="md:hidden p-2 text-foreground z-10" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium text-muted-foreground items-center">
            <a href="/#concept" className="hover:text-primary transition-colors" data-testid="link-nav-concept">Concept</a>
            <a href="/#campus" className="hover:text-primary transition-colors" data-testid="link-nav-campus">Campus</a>
            <a href="/#blueprint" className="hover:text-primary transition-colors" data-testid="link-nav-blueprint">Blueprint</a>
            <Link href="/solutions" className="hover:text-primary transition-colors" data-testid="link-nav-solutions">Solutions</Link>
            <a href="/#contact" className="hover:text-primary transition-colors" data-testid="link-nav-contact">Contact</a>
            
            {/* Sign In button deprecated - auth moves to app.opus355.com */}
            <button 
              onClick={() => setMembershipOpen(true)}
              className="bg-primary text-primary-foreground px-5 py-2 hover:bg-primary/90 transition-colors"
              data-testid="button-nav-membership"
            >
              Join Waitlist
            </button>
          </nav>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden bg-background border-t border-border px-4 py-6 flex flex-col gap-4">
            <a href="/#concept" className="text-sm uppercase tracking-widest font-medium hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-concept">Concept</a>
            <a href="/#campus" className="text-sm uppercase tracking-widest font-medium hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-campus">Campus</a>
            <a href="/#blueprint" className="text-sm uppercase tracking-widest font-medium hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-blueprint">Blueprint</a>
            <Link href="/solutions" className="text-sm uppercase tracking-widest font-medium hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-solutions">Solutions</Link>
            <a href="/#contact" className="text-sm uppercase tracking-widest font-medium hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-contact">Contact</a>
            
            {/* Sign In button deprecated - auth moves to app.opus355.com */}
            <button 
              onClick={() => { setMobileMenuOpen(false); setMembershipOpen(true); }}
              className="bg-primary text-primary-foreground px-5 py-3 text-sm uppercase tracking-widest font-medium text-center hover:bg-primary/90 transition-colors mt-2"
              data-testid="button-mobile-membership"
            >
              Join Waitlist
            </button>
          </nav>
        )}
      </header>

      <main className="flex-grow pt-16 sm:pt-20">
        {children}
      </main>

      <footer className="bg-foreground text-background py-20 border-t border-white/10" id="contact">
        <div className="container mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-12">
          <div>
            <h2 className="font-serif text-3xl mb-6">Opus 355</h2>
            <p className="text-white/60 max-w-md leading-relaxed">
              A Design-Led Workplace.<br/>
              A new typology for the distributed age.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-widest font-semibold text-white/40">Location</h3>
            <p className="text-lg">355 Main Street<br/>Armonk, New York</p>
            
            <h3 className="text-sm uppercase tracking-widest font-semibold text-white/40 mt-8">Inquiries</h3>
            <a href="mailto:leasing@opus355.com" className="text-lg hover:text-white/80 transition-colors block">
              leasing@opus355.com
            </a>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-widest font-semibold text-white/40">Solutions</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/solutions/custom-offices" className="text-lg hover:text-white/80 transition-colors" data-testid="link-footer-custom-offices" onClick={() => window.scrollTo(0, 0)}>
                Custom Offices
              </Link>
              <Link href="/solutions/private-offices" className="text-lg hover:text-white/80 transition-colors" data-testid="link-footer-private-offices" onClick={() => window.scrollTo(0, 0)}>
                Private Offices
              </Link>
              <Link href="/solutions/hybrid" className="text-lg hover:text-white/80 transition-colors" data-testid="link-footer-hybrid" onClick={() => window.scrollTo(0, 0)}>
                Hybrid Memberships
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-widest font-semibold text-white/40">Partners</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/brokers" className="text-lg hover:text-white/80 transition-colors" data-testid="link-footer-brokers" onClick={() => window.scrollTo(0, 0)}>
                Brokers
              </Link>
              <Link href="/enterprise" className="text-lg hover:text-white/80 transition-colors" data-testid="link-footer-enterprise" onClick={() => window.scrollTo(0, 0)}>
                Enterprise
              </Link>
              <Link href="/landlords" className="text-lg hover:text-white/80 transition-colors" data-testid="link-footer-landlords" onClick={() => window.scrollTo(0, 0)}>
                Landlords
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-widest font-semibold text-white/40">Opening</h3>
            <p className="text-lg">February 2026</p>
            <button 
              onClick={() => setMembershipOpen(true)}
              className="inline-block mt-4 bg-primary text-primary-foreground px-6 py-3 text-sm uppercase tracking-widest font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-footer-membership"
            >
              Join Waitlist
            </button>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/10 text-xs text-white/30">
          <span>© 2025 Opus 355. All rights reserved.</span>
        </div>
      </footer>

      <JoinWaitlistDialog open={membershipOpen} onOpenChange={setMembershipOpen} />
      <ChatBubble />
    </div>
  );
}
