import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";

import exterior355 from "@assets/355_main_exterior.jpg";
import exterior357 from "@assets/357_exterior_1.jpg";
import interiorSuite from "@assets/space/executive-suite.jpeg";
import interiorMeeting from "@assets/space/meeting-room.jpeg";
import interiorLobby from "@assets/space/lobby-reception.jpeg";
import vitraTyde2 from "@assets/82655552_1769278417914.jpg";
import vitraJoyn from "@assets/77433396_1769277628600.jpg";
import vitraDancingWall from "@assets/vitra_dancing_wall.jpg";
import vitraAlcove from "@assets/vitra_alcove_lowback.jpg";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const shells = [
  { ref: "SHELL_A", area: "±2,400 SF", note: "The compact executive shell." },
  { ref: "SHELL_B", area: "±3,800 SF", note: "The institution's floor." },
  { ref: "SHELL_C", area: "±5,200 SF", note: "The physical model of the thesis." },
];

const ffe = [
  { src: vitraTyde2, cap: "CAM_01 · TYDE 2" },
  { src: vitraJoyn, cap: "CAM_02 · JOYN 2 TOUCHDOWN" },
  { src: vitraDancingWall, cap: "CAM_03 · DANCING WALL" },
  { src: vitraAlcove, cap: "CAM_04 · ALCOVE" },
];

export default function Home() {
  return (
    <Layout>
      <SEO
        title="355 Main | Sovereign Intelligence, Anchored in Armonk"
        description="Three executive Sovereign Shells on the North Castle Ventures campus in Armonk, NY — Class A commercial real estate fused with on-premises AI, outfitted with Vitra."
        canonical="/"
      />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="container-page pt-16 pb-0 sm:pt-24">
          <motion.div {...reveal} className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="marker-dot" />
              <span className="text-label-wide">Sovereign Intelligence · Armonk NY</span>
            </div>
            <h1 className="heading-display" data-testid="text-hero-headline">
              Sovereign Intelligence,<br />anchored in Armonk.
            </h1>
            <p className="text-body-lg max-w-2xl mt-8">
              Three executive shells on the North Castle Ventures campus — Class A commercial
              real estate fused with on-premises, deterministic AI and outfitted with Vitra.
              One institution per shell.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/shells" className="btn-primary" data-testid="link-hero-shells" onClick={() => window.scrollTo(0, 0)}>
                View the Shells <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/thesis" className="btn-secondary" data-testid="link-hero-thesis" onClick={() => window.scrollTo(0, 0)}>
                Read the Thesis
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.figure {...reveal} className="mt-16 relative">
          <img
            src={exterior355}
            alt="355 Main Street, Armonk — exterior"
            className="w-full h-[42vh] sm:h-[64vh] object-cover"
            data-testid="img-hero"
          />
          <figcaption className="text-annotation absolute bottom-4 left-4 bg-background/80 backdrop-blur px-3 py-1.5">
            CAM_00 · 355 MAIN ST · 41.1265° N, 73.7140° W
          </figcaption>
        </motion.figure>
      </section>

      {/* Thesis teaser */}
      <section className="section container-page">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <motion.div {...reveal} className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="marker-dot" />
              <span className="text-label">The Thesis</span>
            </div>
          </motion.div>
          <motion.div {...reveal} className="lg:col-span-8">
            <h2 className="heading-section max-w-3xl">
              Regulated institutions can't send their data to a public API. So the
              intelligence comes to them.
            </h2>
            <p className="text-body-lg max-w-2xl mt-8">
              355 Main co-locates deterministic AI with the people who use it — compute,
              counsel, and capital in one room. Sovereignty of space, and sovereignty of
              compute, held together.
            </p>
            <Link href="/thesis" className="btn-ghost mt-8" data-testid="link-thesis-more" onClick={() => window.scrollTo(0, 0)}>
              Read the full thesis <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Shells preview */}
      <section className="section-dark">
        <div className="container-page">
          <motion.div {...reveal} className="flex items-center gap-3 mb-10">
            <span className="marker-dot" />
            <span className="text-label-wide text-background/70">The Shells / 01 — 03</span>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {shells.map((s, i) => (
              <motion.div
                key={s.ref}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.08 }}
                className="bg-ink p-8 flex flex-col justify-between min-h-[280px]"
                data-testid={`card-${s.ref.toLowerCase()}`}
              >
                <div>
                  <div className="text-annotation text-background/50">{s.ref}</div>
                  <div className="font-serif text-4xl mt-6">{s.area}</div>
                </div>
                <p className="text-background/70 text-lg leading-snug mt-8">{s.note}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...reveal} className="mt-10">
            <Link href="/shells" className="btn-white" data-testid="link-shells" onClick={() => window.scrollTo(0, 0)}>
              Explore the Shells <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Interiors */}
      <section className="section container-page">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { src: interiorLobby, cap: "CAM_05 · RECEPTION" },
            { src: interiorSuite, cap: "CAM_06 · EXECUTIVE SUITE" },
            { src: interiorMeeting, cap: "CAM_07 · BOARD ROOM" },
          ].map((img, i) => (
            <motion.figure
              key={img.cap}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.08 }}
              className="relative"
            >
              <img src={img.src} alt={img.cap} className="w-full aspect-[4/5] object-cover" />
              <figcaption className="text-annotation absolute bottom-3 left-3 bg-background/80 backdrop-blur px-2.5 py-1">
                {img.cap}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* FF&E / Vitra */}
      <section className="section container-page border-t border-border">
        <div className="grid lg:grid-cols-12 gap-10 items-start mb-12">
          <motion.div {...reveal} className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="marker-dot" />
              <span className="text-label">Outfitted by Vitra</span>
            </div>
          </motion.div>
          <motion.div {...reveal} className="lg:col-span-8">
            <h2 className="heading-subsection max-w-2xl">
              Every shell is delivered complete — furnished to institutional standard.
            </h2>
            <p className="text-body max-w-xl mt-6">
              A curated Vitra program: architectural systems, executive seating, and
              reconfigurable meeting environments. Nothing to specify, nothing to source.
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ffe.map((item, i) => (
            <motion.figure
              key={item.cap}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.06 }}
              className="relative"
            >
              <img src={item.src} alt={item.cap} className="w-full aspect-square object-cover bg-card" />
              <figcaption className="text-annotation absolute bottom-3 left-3 bg-background/80 backdrop-blur px-2.5 py-1">
                {item.cap}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* Campus */}
      <section className="section container-page border-t border-border">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.figure {...reveal} className="relative order-2 lg:order-1">
            <img src={exterior357} alt="357 Main Street — campus" className="w-full aspect-[4/3] object-cover" />
            <figcaption className="text-annotation absolute bottom-3 left-3 bg-background/80 backdrop-blur px-2.5 py-1">
              CAM_08 · 357 MAIN · NORTH CASTLE CAMPUS
            </figcaption>
          </motion.figure>
          <motion.div {...reveal} className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="marker-dot" />
              <span className="text-label">The Campus</span>
            </div>
            <h2 className="heading-section">A campus, not a building.</h2>
            <p className="text-body-lg mt-6">
              355 &amp; 357 Main Street sit on the North Castle Ventures campus in Armonk,
              New York — the efficiency of a Midtown headquarters without the commute.
            </p>
            <Link href="/about" className="btn-ghost mt-8" data-testid="link-about" onClick={() => window.scrollTo(0, 0)}>
              About the campus <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark">
        <div className="container-page text-center">
          <motion.div {...reveal} className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="marker-dot" />
              <span className="text-label-wide text-background/70">Inquiry</span>
            </div>
            <h2 className="heading-section">Three shells. Held one institution at a time.</h2>
            <p className="text-body-lg text-background/70 mt-6 max-w-xl mx-auto">
              Inquiries are reviewed personally. Tell us who you are and what you need.
            </p>
            <Link href="/inquiry" className="btn-white mt-10" data-testid="link-cta-inquiry" onClick={() => window.scrollTo(0, 0)}>
              Begin an inquiry <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {[
                { label: "North Castle Ventures", href: "https://northcastleventures.com" },
                { label: "The RFC", href: "https://ainativeoffice.org" },
                { label: "Nate", href: "https://nativeagentic.com" },
                { label: "Trucast", href: "https://trucast.ai" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-background/50 hover:text-background transition-colors"
                  data-testid={`link-eco-${l.label.split(" ")[0]!.toLowerCase()}`}
                >
                  {l.label} <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
