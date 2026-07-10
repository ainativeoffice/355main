import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";

import exterior355 from "@assets/355_main_exterior.jpg";
import spaceExecutiveSuite from "@assets/space/executive-suite.jpeg";
import spaceOpenFloor from "@assets/space/open-floor.jpeg";
import spaceMeetingRoom from "@assets/space/meeting-room.jpeg";
import ffeSoftWork from "@assets/82707787_1769278810327.jpg";
import ffeJoyn from "@assets/77433396_1769277628600.jpg";
import ffeTyde2 from "@assets/82655552_1769278417914.jpg";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

interface ShellSpec {
  label: string;
  value: string;
}

interface Shell {
  id: string;
  ref: string;
  index: string;
  name: string;
  headline: string;
  body: string[];
  images: [{ src: string; caption: string }, { src: string; caption: string }];
  specs: ShellSpec[];
  flagship?: boolean;
  held?: boolean;
}

const shells: Shell[] = [
  {
    id: "a",
    ref: "REF_01",
    index: "01 — 03",
    name: "Shell A",
    headline: "The Executive Node.",
    body: [
      "Engineered for a principal-led practice that runs lean and highly secure. Class A commercial space fused with a localized NVIDIA hardware vault.",
      "Sized for a principal and immediate counsel who require their capital, strategy, and compute to remain within arm's reach. No data leaves the room.",
    ],
    images: [
      { src: spaceExecutiveSuite, caption: "CAM_01 · SHELL A" },
      { src: ffeSoftWork, caption: "FF&E · VITRA SOFT WORK" },
    ],
    specs: [
      { label: "REF", value: "SHELL_A" },
      { label: "Area", value: "814 USF / 1,065 RSF" },
      { label: "Floor", value: "Floor 1 — Suite A" },
      { label: "Acoustics", value: "STC-55 shielding" },
      { label: "Network", value: "Dedicated air-gapped fiber" },
      { label: "FF&E", value: "Vitra Executive" },
      { label: "Occupancy", value: "Single institution" },
      { label: "Status", value: "Available" },
    ],
  },
  {
    id: "b",
    ref: "REF_02",
    index: "02 — 03",
    name: "Shell B",
    headline: "The Operations Node.",
    body: [
      "The largest of the three shells — built for a small institution operating at full multi-agent stride. Open working desks, private counsel space, and high-density on-premises compute in one continuous, sovereign environment.",
      "Deterministic AI infrastructure sits inside your walls, not in a distant cloud.",
    ],
    images: [
      { src: spaceOpenFloor, caption: "CAM_02 · SHELL B" },
      { src: ffeJoyn, caption: "FF&E · VITRA JOYN 2 TOUCHDOWN" },
    ],
    specs: [
      { label: "REF", value: "SHELL_B" },
      { label: "Area", value: "888 USF / 1,162 RSF" },
      { label: "Floor", value: "Floor 1 — Suite B" },
      { label: "Acoustics", value: "STC-55 shielding" },
      { label: "Network", value: "Dedicated air-gapped fiber" },
      { label: "FF&E", value: "Vitra Operations" },
      { label: "Occupancy", value: "Single institution" },
      { label: "Status", value: "Available" },
    ],
  },
  {
    id: "c",
    ref: "REF_03",
    index: "03 — 03",
    name: "Shell C",
    headline: "The Orchestration Node.",
    body: [
      "The physical model of the thesis, in active occupancy. Trucast.AI holds Suite C as their integration headquarters, running sovereign intelligence exactly as designed.",
      "Compute, counsel, and code share a single room. Shell C stands as empirical proof that the architecture works — the argument made concrete.",
    ],
    images: [
      { src: spaceMeetingRoom, caption: "CAM_03 · SHELL C — TRUCAST.AI" },
      { src: ffeTyde2, caption: "FF&E · VITRA TYDE 2" },
    ],
    specs: [
      { label: "REF", value: "SHELL_C" },
      { label: "Area", value: "810 USF / 1,060 RSF" },
      { label: "Floor", value: "Floor 1 — Suite C" },
      { label: "Compute", value: "Localized / deterministic" },
      { label: "Occupant", value: "Trucast.AI" },
      { label: "Status", value: "Held" },
    ],
    flagship: true,
    held: true,
  },
];

export default function Shells() {
  return (
    <Layout>
      <SEO
        title="The Shells | 355 Main"
        description="Three executive Sovereign Shells on the North Castle Ventures campus in Armonk, NY — Class A commercial real estate fused with on-premises, deterministic AI, outfitted with Vitra."
        canonical="/shells"
      />

      {/* Hero */}
      <section className="section container-page">
        <motion.div {...reveal} className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="marker-dot" />
            <span className="text-label-wide" data-testid="text-hero-eyebrow">
              THE SHELLS / 01 — 03
            </span>
          </div>
          <h1 className="heading-display mb-8" data-testid="text-hero-headline">
            Three shells. One standard of sovereignty.
          </h1>
          <p className="text-body-lg max-w-2xl">
            355 Main features three executive Sovereign Shells on the North Castle
            Ventures campus in Armonk, New York. Each physical node is
            cryptographically isolated and held by a single institution — ensuring
            absolute sovereignty of space and compute.
          </p>
        </motion.div>

        <motion.figure {...reveal} className="mt-16">
          <div className="aspect-[16/9] overflow-hidden bg-muted">
            <img
              src={exterior355}
              alt="355 Main exterior, Armonk, New York"
              className="w-full h-full object-cover"
              data-testid="img-hero-exterior"
            />
          </div>
          <figcaption className="mt-3 flex items-center gap-2">
            <span className="marker-dot" />
            <span className="text-annotation">CAM_00 · 355 MAIN · ARMONK NY · 41.1265° N, 73.7140° W</span>
          </figcaption>
        </motion.figure>
      </section>

      {/* Intro — what a Sovereign Shell is */}
      <section className="section container-page border-t border-border">
        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div {...reveal} className="lg:col-span-4">
            <span className="text-label" data-testid="text-intro-label">
              REF_00 / DEFINITION OF A SOVEREIGN SHELL
            </span>
          </motion.div>
          <motion.div {...reveal} className="lg:col-span-8">
            <h2 className="heading-subsection mb-8">What a Sovereign Shell is.</h2>
            <p className="text-body-lg mb-6">
              A Sovereign Shell is a physical containment zone for enterprise AI.
              It fuses Class A commercial real estate with STC-55 acoustic
              isolation, dedicated E-Line fiber, and on-premises deterministic
              compute. The building and the silicon operate as a single instrument.
            </p>
            <p className="text-body">
              Data never leaves the premises to be reasoned over elsewhere; the
              model runs exactly where the executives work. This is the difference
              between renting square footage and holding sovereign ground.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shell entries */}
      {shells.map((shell, i) => {
        const imageFirst = i % 2 === 0;
        return (
          <section
            key={shell.id}
            className="section container-page border-t border-border"
            data-testid={`section-shell-${shell.id}`}
          >
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image column */}
              <motion.div
                {...reveal}
                className={`space-y-4 ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
              >
                <figure>
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={shell.images[0].src}
                      alt={`${shell.name} interior`}
                      className="w-full h-full object-cover"
                      data-testid={`img-shell-${shell.id}-primary`}
                    />
                  </div>
                  <figcaption className="mt-3 flex items-center gap-2">
                    <span className="marker-dot" />
                    <span className="text-annotation">{shell.images[0].caption}</span>
                  </figcaption>
                </figure>
                <figure>
                  <div className="aspect-[16/9] overflow-hidden bg-muted">
                    <img
                      src={shell.images[1].src}
                      alt={`${shell.name} furnishings`}
                      className="w-full h-full object-cover"
                      data-testid={`img-shell-${shell.id}-secondary`}
                    />
                  </div>
                  <figcaption className="mt-3 flex items-center gap-2">
                    <span className="marker-dot" />
                    <span className="text-annotation">{shell.images[1].caption}</span>
                  </figcaption>
                </figure>
              </motion.div>

              {/* Content column */}
              <motion.div
                {...reveal}
                className={imageFirst ? "lg:order-2" : "lg:order-1"}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="marker-dot" />
                    <span className="text-label-wide">{shell.ref}</span>
                  </div>
                  <span className="text-annotation">{shell.index}</span>
                </div>

                {shell.held && (
                  <span
                    className="status-pill text-ember mb-6"
                    data-testid={`status-shell-${shell.id}`}
                  >
                    <span className="marker-dot bg-ember" />
                    HELD · TRUCAST.AI
                  </span>
                )}

                <h2
                  className="heading-subsection mt-2 mb-6"
                  data-testid={`text-shell-${shell.id}-name`}
                >
                  {shell.name}. {shell.headline}
                </h2>

                {shell.body.map((p, idx) => (
                  <p key={idx} className={idx === 0 ? "text-body-lg mb-5" : "text-body mb-5"}>
                    {p}
                  </p>
                ))}

                {shell.flagship && (
                  <Link
                    href="/thesis"
                    onClick={() => window.scrollTo(0, 0)}
                    className="btn-ghost mb-8"
                    data-testid="link-shell-c-thesis"
                  >
                    Read the thesis <ArrowRight className="w-4 h-4" />
                  </Link>
                )}

                <dl className="mt-8">
                  {shell.specs.map((spec) => (
                    <div className="spec-row" key={spec.label}>
                      <dt>{spec.label}</dt>
                      <dd data-testid={`spec-shell-${shell.id}-${spec.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* The building — tenants */}
      <section className="section container-page border-t border-border">
        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div {...reveal} className="lg:col-span-4">
            <span className="text-label" data-testid="text-building-label">
              REF_04 / INSTITUTIONAL VALIDATION
            </span>
          </motion.div>
          <motion.div {...reveal} className="lg:col-span-8">
            <h2 className="heading-subsection mb-8">
              The last available ground in a fully operational, highly regulated
              building.
            </h2>
            <p className="text-body-lg mb-6" data-testid="text-building-tenants">
              Northwell Health holds the rear suite on the ground floor,
              validating the strict compliance and privacy parameters of the
              campus. Upstairs, Alpha School occupies the entire 5,800 SF second
              floor, running their AI-powered "2 Hour Learning" model — proving
              the campus's thermodynamic capacity to handle continuous,
              high-density compute.
            </p>
            <p className="text-body">
              Shells A and B sit alongside institutions that have already made
              the same decision — a coalition of regulated, AI-forward entities
              proving the capacity of the base building.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dark band */}
      <section className="bg-ink text-background py-24">
        <div className="container-page">
          <motion.div {...reveal} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="marker-dot bg-ember" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
                41.1265° N, 73.7140° W
              </span>
            </div>
            <h2 className="heading-section mb-8">
              Sovereignty of space is only half of it. The other half is
              sovereignty of compute.
            </h2>
            <p className="text-lg leading-relaxed text-white/60 max-w-2xl">
              A shell holds one institution and one intelligence. The walls are
              yours; the model is yours; the data never leaves. That is what it
              means to hold sovereign ground at 355 Main.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section container-page border-t border-border">
        <motion.div {...reveal} className="max-w-2xl">
          <span className="text-label" data-testid="text-cta-label">
            REF_05 / INITIALIZE INQUIRY
          </span>
          <h2 className="heading-section mt-6 mb-8">
            Three shells. Held one institution at a time.
          </h2>
          <p className="text-body-lg mb-10">
            Shells at 355 Main are provisioned deliberately to qualifying
            entities. To run a deployment diagnostic and discuss availability,
            initialize an inquiry.
          </p>
          <Link
            href="/inquiry"
            onClick={() => window.scrollTo(0, 0)}
            className="btn-primary"
            data-testid="link-inquiry"
          >
            Inquire about a shell <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
}
