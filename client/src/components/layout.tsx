import { Link } from "wouter";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-primary/20">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <a className="font-serif text-2xl tracking-tight hover:opacity-80 transition-opacity">
              Opus 355
            </a>
          </Link>

          <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium text-muted-foreground items-center">
            <a href="#concept" className="hover:text-primary transition-colors">The Concept</a>
            <a href="#zones" className="hover:text-primary transition-colors">The Zones</a>
            <a href="#philosophy" className="hover:text-primary transition-colors">Philosophy</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            <a 
              href="#waitlist" 
              className="bg-primary text-primary-foreground px-5 py-2 hover:bg-primary/90 transition-colors"
            >
              Join Waitlist
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-20">
        {children}
      </main>

      <footer className="bg-foreground text-background py-20 border-t border-white/10" id="contact">
        <div className="container mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
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
              <Link href="/solutions/custom-offices">
                <a className="text-lg hover:text-white/80 transition-colors" data-testid="link-footer-custom-offices">Custom Offices</a>
              </Link>
              <Link href="/solutions/private-offices">
                <a className="text-lg hover:text-white/80 transition-colors" data-testid="link-footer-private-offices">Private Offices</a>
              </Link>
              <Link href="/solutions/hybrid">
                <a className="text-lg hover:text-white/80 transition-colors" data-testid="link-footer-hybrid">Hybrid Memberships</a>
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-widest font-semibold text-white/40">Opening</h3>
            <p className="text-lg">February 2026</p>
            <a 
              href="#waitlist" 
              className="inline-block mt-4 bg-primary text-primary-foreground px-6 py-3 text-sm uppercase tracking-widest font-medium hover:bg-primary/90 transition-colors"
              data-testid="link-footer-waitlist"
            >
              Join Waitlist
            </a>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/10 text-xs text-white/30 flex justify-between">
          <span>© 2025 Opus 355. All rights reserved.</span>
          <span>Designed with Replit</span>
        </div>
      </footer>
    </div>
  );
}
