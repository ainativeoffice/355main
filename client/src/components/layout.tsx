import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "./breadcrumbs";

const navLinks = [
  { href: "/shells", label: "The Shells" },
  { href: "/thesis", label: "The Thesis" },
  { href: "/about", label: "The Campus" },
];

const externalNavLinks = [
  { href: "https://nativeagentic.com", label: "Nate", id: "nate" },
  { href: "https://ainativeoffice.org", label: "The RFC", id: "rfc" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-primary/20">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/85 backdrop-blur-md transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-xl sm:text-2xl tracking-tight hover:opacity-80 transition-opacity z-10"
            data-testid="link-logo"
          >
            355&nbsp;Main
          </Link>

          <button
            className="md:hidden p-2 text-foreground z-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <nav className="hidden md:flex gap-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors"
                data-testid={`link-nav-${link.href.slice(1)}`}
              >
                {link.label}
              </Link>
            ))}

            {externalNavLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                data-testid={`link-nav-${link.id}`}
              >
                {link.label} <ArrowUpRight className="w-3 h-3" />
              </a>
            ))}

            <span className="status-pill text-foreground/70" data-testid="status-pill-header">
              <span className="marker-dot bg-ember" />
              355 · 357 MAIN / ARMONK NY
            </span>

            <Link
              href="/inquiry"
              className="bg-primary text-primary-foreground px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors"
              data-testid="button-nav-inquiry"
            >
              Inquire
            </Link>
          </nav>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden bg-background border-t border-border px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.2em] hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-${link.href.slice(1)}`}
              >
                {link.label}
              </Link>
            ))}

            {externalNavLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] hover:text-foreground transition-colors py-2"
                data-testid={`link-mobile-${link.id}`}
              >
                {link.label} <ArrowUpRight className="w-3 h-3" />
              </a>
            ))}

            <Link
              href="/inquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-primary text-primary-foreground px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-center hover:bg-primary/90 transition-colors mt-2 block"
              data-testid="button-mobile-inquiry"
            >
              Inquire
            </Link>
          </nav>
        )}
      </header>

      <main className="flex-grow pt-16 sm:pt-20">
        <Breadcrumbs />
        {children}
      </main>

      <footer className="bg-ink text-background py-20 border-t border-white/10" id="contact">
        <div className="container mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-3xl mb-4">355 Main</h2>
            <p className="text-white/55 max-w-md leading-relaxed">
              Sovereign Intelligence, anchored in Armonk. Three executive shells on the
              North Castle Ventures campus — Class A commercial real estate fused with
              on-premises AI.
            </p>
            <a
              href="https://northcastleventures.com?utm_source=355main&utm_medium=referral&utm_campaign=footer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-6 font-mono text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
              data-testid="link-footer-northcastle"
            >
              North Castle Ventures <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Location</h3>
            <p className="text-lg leading-snug">
              355 &amp; 357 Main Street<br />Armonk, New York
            </p>
            <p className="font-mono text-xs text-white/40 tracking-[0.12em]">
              41.1265° N, 73.7140° W
            </p>

            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 pt-4">Inquiries</h3>
            <a
              href="mailto:leasing@355main.com"
              className="text-lg hover:text-white/80 transition-colors block"
              data-testid="link-footer-email"
            >
              leasing@355main.com
            </a>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Explore</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/shells" className="text-lg hover:text-white/80 transition-colors" data-testid="link-footer-shells" onClick={() => window.scrollTo(0, 0)}>
                The Shells
              </Link>
              <Link href="/thesis" className="text-lg hover:text-white/80 transition-colors" data-testid="link-footer-thesis" onClick={() => window.scrollTo(0, 0)}>
                The Thesis
              </Link>
              <Link href="/about" className="text-lg hover:text-white/80 transition-colors" data-testid="link-footer-about" onClick={() => window.scrollTo(0, 0)}>
                The Campus
              </Link>
              <Link href="/inquiry" className="text-lg hover:text-white/80 transition-colors" data-testid="link-footer-inquiry" onClick={() => window.scrollTo(0, 0)}>
                Inquiry
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Ecosystem</h3>
            <nav className="flex flex-col gap-3">
              <a href="https://ainativeoffice.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-lg hover:text-white/80 transition-colors" data-testid="link-footer-rfc">
                The RFC <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a href="https://nativeagentic.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-lg hover:text-white/80 transition-colors" data-testid="link-footer-nate">
                Nate <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a href="https://trucast.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-lg hover:text-white/80 transition-colors" data-testid="link-footer-trucast">
                Trucast <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </nav>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/10 font-mono text-xs text-white/30 tracking-[0.12em] uppercase">
          <span>© 2026 355 Main · A North Castle Ventures Campus</span>
        </div>
      </footer>
    </div>
  );
}
