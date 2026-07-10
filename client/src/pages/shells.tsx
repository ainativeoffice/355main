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
    headline: "The principal's chamber.",
    body: [
      "An executive suite on the ground floor, engineered for a principal-led practice that runs lean and close. Class A commercial space fused with an on-premises, deterministic AI stack — no data leaves the room.",
      "Outfitted in Vitra throughout. Held by a single institution, sized for a principal and immediate counsel who keep capital, counsel, and compute within arm's reach.",
    ],
    images: [
      { src: spaceExecutiveSuite, caption: "CAM_01 · SHELL A" },
      { src: ffeSoftWork, caption: "FF&E · VITRA SOFT WORK" },
    ],
    specs: [
      { label: "REF", value: "SHELL_A" },
      { label: "Area", value: "814 USF / 1,065 RSF" },
      { label: "Floor", value: "Floor 1 — Suite A" },
      { label: "Compute", value: "On-prem AI" },
      { label: "FF&E", value: "Vitra" },
      { label: "Occupancy", value: "Single institution" },
      { label: "Status", value: "Available" },
    ],
  },
  {
    id: "b",
    ref: "REF_02",
    index: "02 — 03",
    name: "Shell B",
    headline: "The working suite.",
    body: [
      "The largest of the three shells — an executive suite built for a small institution operating at full stride. Working desks, private counsel space, and on-premises compute in one continuous, sovereign environment.",
      "Deterministic AI infrastructure sits inside the walls, not in a distant cloud. Vitra throughout. One tenant, one standard.",
    ],
    images: [
      { src: spaceOpenFloor, caption: "CAM_02 · SHELL B" },
      { src: ffeJoyn, caption: "FF&E · VITRA JOYN 2 TOUCHDOWN" },
    ],
    specs: [
      { label: "REF", value: "SHELL_B" },
      { label: "Area", value: "888 USF / 1,162 RSF" },
      { label: "Floor", value: "Floor 1 — Suite B" },
      { label: "Compute", value: "On-prem AI" },
      { label: "FF&E", value: "Vitra" },
      { label: "Occupancy", value: "Single institution" },
      { label: "Status", value: "Available" },
    ],
  },
  {
    id: "c",
    ref: "REF_03",
    index: "03 — 03",
    name: "Shell C",
    headline: "Held by Trucast.ai — the thesis in occupancy.",
    body: [
      "Shell C is the physical model of the thesis, and it is no longer an argument — it is occupied. Trucast.ai holds the suite, running sovereign intelligence exactly as designed: Class A space and on-premises, deterministic AI operating as one instrument, held by a single institution.",
      "Compute, counsel, and capital share a single room. Nothing is sent out to be reasoned over elsewhere. Shell C is not available; it stands as proof that the model works — the argument made concrete, and in use.",
    ],
    images: [
      { src: spaceMeetingRoom, caption: "CAM_03 · SHELL C — TRUCAST.AI" },
      { src: ffeTyde2, caption: "FF&E · VITRA TYDE 2" },
    ],
    specs: [
      { label: "REF", value: "SHELL_C" },
      { label: "Area", value: "810 USF / 1,060 RSF" },
      { label: "Floor", value: "Floor 1 — Suite C" },
      { label: "Compute", value: "On-prem AI · deterministic" },
      { label: "FF&E", value: "Vitra" },
      { label: "Occupancy", value: "Trucast.ai" },
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
            355 Main is three executive Sovereign Shells on the North Castle
            Ventures campus in Armonk, New York. Each is held by a single
            institution — sovereignty of space, and sovereignty of compute.
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
            <span className="text-annotation">CAM_00 · 355 MAIN · ARMONK NY</span>
          </figcaption>
        </motion.figure>
      </section>

      {/* Intro — what a Sovereign Shell is */}
      <section className="section container-page border-t border-border">
        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div {...reveal} className="lg:col-span-4">
            <span className="text-label" data-testid="text-intro-label">
              REF_00 / DEFINITION
            </span>
          </motion.div>
          <motion.div {...reveal} className="lg:col-span-8">
            <h2 className="heading-subsection mb-8">What a Sovereign Shell is.</h2>
            <p className="text-body-lg mb-6">
              A Sovereign Shell is Class A commercial real estate fused with
              on-premises, deterministic AI infrastructure — outfitted end to
              end in Vitra. The building and the compute are one instrument.
            </p>
            <p className="text-body">
              Each shell is held by one institution. Data does not leave the
              premises to be reasoned over elsewhere; the model runs where the
              people who use it work. This is the difference between renting
              square footage and holding sovereign ground.
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
              REF_04 / THE BUILDING
            </span>
          </motion.div>
          <motion.div {...reveal} className="lg:col-span-8">
            <h2 className="heading-subsection mb-8">
              The shells are the last available ground in an occupied building.
            </h2>
            <p className="text-body-lg mb-6" data-testid="text-building-tenants">
              355 Main is already working. Northwell holds the back suite on the
              ground floor. Alpha School — the proof point of the thesis in
              education — occupies the entire second floor, 5,800 usable square
              feet of it. Trucast.ai holds Shell C.
            </p>
            <p className="text-body">
              What remains are Shells A and B: two executive suites on the
              ground floor, alongside institutions that have already made the
              same decision.
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
            REF_05 / INQUIRY
          </span>
          <h2 className="heading-section mt-6 mb-8">
            Three shells. Held one institution at a time.
          </h2>
          <p className="text-body-lg mb-10">
            Shells at 355 Main are placed deliberately, not listed broadly. To
            discuss availability and fit, begin an inquiry.
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
