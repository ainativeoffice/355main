import Image from "next/image";
import { ArrowRight, ArrowUpRight, Cpu, KeyRound, Server } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SuiteInventory } from "@/components/suite-inventory";
import { TrackedLink } from "@/components/tracked-link";
import { ecosystemUrl, leasingEmail } from "@/lib/links";

export default function HomePage() {
  return (
    <main id="top">
      <SiteHeader />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true" /> Armonk, New York · Class A</p>
          <h1 id="hero-title">A building for the work ahead.</h1>
          <p className="hero-intro">355 Main brings considered workspace and sovereign technology together within Armonk Professional Center.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#suites">View available suites <ArrowRight aria-hidden="true" /></a>
            <TrackedLink className="text-link" href={leasingEmail()} eventName="leasing_click" eventData={{ placement: "hero" }}>Contact leasing</TrackedLink>
          </div>
        </div>
        <figure className="hero-image">
          <Image src="/images/355-main-exterior.jpg" alt="Brick and glass exterior of 355 Main in Armonk, New York" fill priority sizes="(max-width: 768px) 100vw, 52vw" />
          <figcaption>CAM_01 / 355 MAIN / ARMONK NY</figcaption>
        </figure>
      </section>

      <section className="intro section-rule" aria-labelledby="intro-title">
        <div className="section-label">01 / The building</div>
        <div>
          <h2 id="intro-title">One address. A more complete way to work.</h2>
          <div className="two-col-copy">
            <p>Owned and managed by North Castle Ventures, 355 Main is a focused building and suites experience within Armonk Professional Center—the campus-level destination encompassing 355 Main and 357 Main.</p>
            <p>The environment pairs Class A workplace standards with infrastructure for organizations that value control, privacy, and proximity to their technology.</p>
          </div>
        </div>
      </section>

      <section id="suites" className="suites-section" aria-labelledby="suites-title">
        <div className="section-heading light">
          <p className="eyebrow"><span aria-hidden="true" /> 02 / Current inventory</p>
          <h2 id="suites-title">Space with a clear status.</h2>
          <p>Two suites are now leasing. Occupied space and tenant milestones are shown separately and are not available offers.</p>
        </div>
        <SuiteInventory />
      </section>

      <section id="standard" className="standard section-rule" aria-labelledby="standard-title">
        <div className="section-label">03 / The standard</div>
        <div className="standard-content">
          <h2 id="standard-title">The room as the machine.</h2>
          <p className="lede">A workplace can be more than an endpoint. At 355 Main, a Sovereign Shell can support private, on-premises intelligence as part of the built environment.</p>
          <div className="principles">
            <article><Server aria-hidden="true" /><h3>Local infrastructure</h3><p>NVIDIA-powered hardware can operate on premises rather than routing sensitive work through public systems.</p></article>
            <article><KeyRound aria-hidden="true" /><h3>Tenant custody</h3><p>Tenants retain ownership and custody of their hardware and data.</p></article>
            <article><Cpu aria-hidden="true" /><h3>Operated layer</h3><p>Native Agentic operates the sovereign technology layer, with Nate — Native Agentic Technical Engineer supporting the environment.</p></article>
          </div>
          <div className="standard-links">
            <TrackedLink href={ecosystemUrl("rfc", "standard-rfc")} target="_blank" rel="noreferrer" eventName="ecosystem_click" eventData={{ destination: "rfc", placement: "standard-rfc" }}>Read the AI-Native Office RFC <ArrowUpRight aria-hidden="true" /></TrackedLink>
            <TrackedLink href={ecosystemUrl("nativeAgentic", "standard-native-agentic")} target="_blank" rel="noreferrer" eventName="ecosystem_click" eventData={{ destination: "native-agentic", placement: "standard-native-agentic" }}>Visit Native Agentic <ArrowUpRight aria-hidden="true" /></TrackedLink>
          </div>
        </div>
      </section>

      <section className="photo-pair" aria-label="355 Main interior">
        <figure><Image src="/images/355-main-lobby.jpeg" alt="Elevator lobby at 355 Main" fill sizes="(max-width: 768px) 100vw, 50vw" /></figure>
        <figure><Image src="/images/355-main-workspace.jpeg" alt="Curved meeting space at 355 Main" fill sizes="(max-width: 768px) 100vw, 50vw" /></figure>
      </section>

      <section className="milestone section-rule" aria-labelledby="milestone-title">
        <div className="section-label">04 / Tenant milestone</div>
        <div className="milestone-grid">
          <div>
            <p className="eyebrow"><span aria-hidden="true" /> Leased · Not available</p>
            <h2 id="milestone-title">Alpha School selects 355 Main.</h2>
            <p>Alpha School, an AI-powered K–8 education platform, leased the 2nd Level Full-Floor Flagship Suite. The space represents a tenant milestone—not current availability.</p>
            <div className="standard-links">
              <TrackedLink href={ecosystemUrl("alpha", "milestone-alpha")} target="_blank" rel="noreferrer" eventName="ecosystem_click" eventData={{ destination: "alpha-school", placement: "milestone-alpha" }}>Explore Alpha School <ArrowUpRight aria-hidden="true" /></TrackedLink>
              <TrackedLink href={ecosystemUrl("alphaPress", "milestone-press-release")} target="_blank" rel="noreferrer" eventName="ecosystem_click" eventData={{ destination: "ncv-alpha-release", placement: "milestone-press-release" }}>North Castle Ventures announcement <ArrowUpRight aria-hidden="true" /></TrackedLink>
            </div>
          </div>
          <figure><Image src="/images/355-main-suite.jpeg" alt="Light-filled suite interior at 355 Main" fill sizes="(max-width: 768px) 100vw, 42vw" /></figure>
        </div>
      </section>

      <section className="campus" aria-labelledby="campus-title">
        <p className="eyebrow"><span aria-hidden="true" /> 05 / The campus</p>
        <h2 id="campus-title">355 Main is part of something larger.</h2>
        <p>Armonk Professional Center is the campus-level destination for 355 Main and 357 Main. For campus-wide questions, visit APC. For a specific suite at 355 Main, contact building leasing.</p>
        <div className="hero-actions">
          <TrackedLink className="button button-light" href={ecosystemUrl("apc", "campus-cta")} target="_blank" rel="noreferrer" eventName="ecosystem_click" eventData={{ destination: "apc", placement: "campus-cta" }}>Explore the campus <ArrowUpRight aria-hidden="true" /></TrackedLink>
          <TrackedLink className="text-link light-link" href={ecosystemUrl("ncv", "campus-owner")} target="_blank" rel="noreferrer" eventName="ecosystem_click" eventData={{ destination: "ncv", placement: "campus-owner" }}>North Castle Ventures</TrackedLink>
        </div>
      </section>

      <footer>
        <div><a className="footer-brand" href="#top">355 Main</a><p>Armonk Professional Center<br />Armonk, New York</p></div>
        <div><p className="footer-label">Building leasing</p><TrackedLink href={leasingEmail()} eventName="leasing_click" eventData={{ placement: "footer" }}>leasing@355main.com</TrackedLink></div>
        <div><p className="footer-label">Campus questions</p><TrackedLink href={ecosystemUrl("apc", "footer-campus")} target="_blank" rel="noreferrer" eventName="ecosystem_click" eventData={{ destination: "apc", placement: "footer-campus" }}>Armonk Professional Center <ArrowUpRight aria-hidden="true" /></TrackedLink></div>
        <p className="copyright">© {new Date().getFullYear()} North Castle Ventures</p>
      </footer>
    </main>
  );
}
