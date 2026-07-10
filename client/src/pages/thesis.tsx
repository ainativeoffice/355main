import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";

import abstractDeterministic from "@assets/generated_images/thesis_abstract_deterministic.png";
import abstractOneRoom from "@assets/generated_images/thesis_abstract_one_room.png";
import abstractSovereignGround from "@assets/generated_images/thesis_abstract_sovereign_ground.png";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const principles = [
  {
    ref: "01",
    title: "Determinism over probability",
    body:
      "Regulated work demands reproducible answers. On-premises, localized GraphRAG systems return the same output for the same input — auditable, defensible, and immune to the silent model drift that plagues public APIs.",
  },
  {
    ref: "02",
    title: "Premises over cloud",
    body:
      "Data that cannot leave the building should never touch a third-party endpoint. Absolute hardware custody ensures sovereignty of space and sovereignty of compute.",
  },
  {
    ref: "03",
    title: "Institution over crowd",
    body:
      "Each Sovereign Shell is held by a single institution. No shared tenancy, no shared inference, no shared risk. The Tripartite Ownership model guarantees the landlord never touches the data layer.",
  },
];

const ecosystem = [
  {
    name: "northcastle",
    label: "North Castle Ventures",
    description: "The landlord. Provisions the 208V power, cooling, and masonry.",
    url: "https://northcastleventures.com",
  },
  {
    name: "rfc",
    label: "The RFC · ainativeoffice.org",
    description: "The open-source reference blueprint for the physical standard.",
    url: "https://ainativeoffice.org",
  },
  {
    name: "nate",
    label: "Nate · nativeagentic.com",
    description: "The autonomous technical engineer. Provisions and audits the local silicon.",
    url: "https://nativeagentic.com",
  },
  {
    name: "trucast",
    label: "Trucast.AI",
    description: "The Integration HQ. Deterministic intelligence for regulated work.",
    url: "https://trucast.ai",
  },
];

export default function Thesis() {
  return (
    <Layout>
      <SEO
        title="The Thesis | 355 Main"
        description="Sovereign Intelligence, anchored in Armonk. On-premises, deterministic AI co-located with the regulated legal and financial institutions that depend on it."
        canonical="/thesis"
      />

      {/* Hero */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="container-page max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-label-wide" data-testid="text-eyebrow-thesis">
              <span className="marker-dot" />
              THE THESIS
            </span>
            <h1 className="heading-display mt-6 max-w-4xl" data-testid="text-heading-thesis">
              The case for on-premises AI
              <br />
              in executive office space.
            </h1>
            <p className="text-body-lg mt-8 max-w-2xl">
              The most consequential legal and financial institutions cannot send their
              operational alpha to public APIs. The answer is not a better cloud contract.
              It is a different physical architecture — deterministic AI, held on-premises,
              cryptographically sealed in the same building as the people it serves.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="section border-b border-border">
        <div className="container-page grid lg:grid-cols-12 gap-12 items-start">
          <motion.div {...reveal} className="lg:col-span-4">
            <span className="text-label" data-testid="text-ref-problem">REF_01 — THE CLOUD EGRESS TRAP</span>
            <h2 className="heading-subsection mt-4">
              Software cryptography cannot fix a physical leak.
            </h2>
          </motion.div>
          <motion.div {...reveal} className="lg:col-span-7 lg:col-start-6 space-y-6">
            <p className="text-body-lg">
              Law firms, funds, and financial institutions hold privileged, material,
              non-public information. Sending it to a public model API triggers the
              Cloud Egress Trap: you either breach compliance, or you redact the data
              so heavily that the AI output becomes useless.
            </p>
            <p className="text-body">
              For these principals, the public cloud is not a convenience. It is a
              structural liability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Answer */}
      <section className="section border-b border-border">
        <div className="container-page grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...reveal} className="order-2 lg:order-1">
            <span className="text-label" data-testid="text-ref-answer">REF_02 — THE SOVEREIGN SHELL</span>
            <h2 className="heading-subsection mt-4">
              Silicon, context, and capital in one room.
            </h2>
            <div className="mt-8 space-y-6">
              <p className="text-body-lg">
                The intelligence lives where the institution lives. Compute is installed
                directly on the premises, operated by the tenant, and never reaches for
                an outside endpoint.
              </p>
              <p className="text-body">
                Co-location closes the loop: the proprietary weights, the unredacted
                data, and the executives who rely on both occupy a single, zero-egress
                physical node.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <img
              src={abstractDeterministic}
              alt="Abstract figure — signals converging into a single held form: on-premises, deterministic intelligence"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
              data-testid="img-fig-deterministic"
            />
            <p className="text-annotation mt-3">FIG_01 · SIGNAL, HELD ON PREMISES</p>
          </motion.div>
        </div>
      </section>

      {/* Why place matters */}
      <section className="section border-b border-border">
        <div className="container-page grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={abstractOneRoom}
              alt="Abstract figure — three forms gathered inside one boundary: compute, counsel, and capital in one room"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
              data-testid="img-fig-one-room"
            />
            <p className="text-annotation mt-3">FIG_02 · COMPUTE, COUNSEL, CAPITAL — ONE ROOM</p>
          </motion.div>
          <motion.div {...reveal}>
            <span className="text-label" data-testid="text-ref-place">REF_03 — WHY CONCRETE MATTERS</span>
            <h2 className="heading-subsection mt-4">
              You cannot audit what you do not physically own.
            </h2>
            <div className="mt-8 space-y-6">
              <p className="text-body-lg">
                Sovereignty is not merely a property of software.
              </p>
              <p className="text-body">
                When the infrastructure and the decision-makers sit inside the same
                STC-55 acoustic masonry, latency collapses and accountability sharpens.
                Physical place makes the thesis operational: Class A real estate fused
                with dedicated E-Line fiber, outfitted for principals who answer to no
                one else's server.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Principles — dark band */}
      <section className="section-dark bg-ink text-background">
        <div className="container-page">
          <motion.div {...reveal} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-white/50">
              <span className="marker-dot bg-ember" />
              PRINCIPLES / 01 — 03
            </span>
            <h2 className="heading-section mt-6">
              Three commitments hold the thesis together.
            </h2>
          </motion.div>

          <div className="mt-16 grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {principles.map((p) => (
              <motion.div
                key={p.ref}
                {...reveal}
                className="bg-ink p-8"
                data-testid={`card-principle-${p.ref}`}
              >
                <span className="font-mono text-sm text-ember tracking-[0.2em]">{p.ref}</span>
                <h3 className="font-serif text-2xl mt-4 mb-4">{p.title}</h3>
                <p className="text-white/55 leading-relaxed text-sm">{p.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...reveal} className="mt-16 pt-8 border-t border-white/10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              41.1265° N, 73.7140° W · ARMONK, NEW YORK
            </p>
          </motion.div>
        </div>
      </section>

      {/* Proof — Alpha School */}
      <section className="section border-b border-border">
        <div className="container-page grid lg:grid-cols-12 gap-12 items-start">
          <motion.div {...reveal} className="lg:col-span-4">
            <span className="text-label" data-testid="text-ref-proof">REF_04 — THE PROOF</span>
            <h2 className="heading-subsection mt-4">
              The proof point moved in upstairs.
            </h2>
          </motion.div>
          <motion.div {...reveal} className="lg:col-span-7 lg:col-start-6 space-y-6">
            <p className="text-body-lg">
              <span className="text-foreground font-medium">Alpha School</span> is
              real-world evidence that high-density AI operations work at scale in
              suburban assets. They leased the entire second floor of 355 Main —
              5,800 usable square feet, now delivered — and open in the fall,
              deploying their AI-powered "2 Hour Learning" model.
            </p>
            <p className="text-body" data-testid="text-alpha-lease">
              It is proof that the thermodynamic and network infrastructure of this
              campus can sustain intensive, continuous AI compute. The thesis is not a
              projection. It is upstairs.
            </p>
            <p className="text-body-sm text-muted-foreground">
              <a
                href="https://my.matterport.com/show/?m=NwcGiRWQ3th&mls=1"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
                data-testid="link-walkthrough"
              >
                Initialize the 3D walkthrough
              </a>{" "}
              — captured pre-fit-out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="section border-b border-border">
        <div className="container-page">
          <motion.div {...reveal} className="max-w-3xl mb-16">
            <span className="inline-flex items-center gap-2 text-label-wide">
              <span className="marker-dot" />
              THE ECOSYSTEM
            </span>
            <h2 className="heading-section mt-6">
              The Native Agentic ecosystem.
            </h2>
            <p className="text-body-lg mt-6">
              355 Main sits within a wider effort — the operator, the blueprint, and the
              systems that make sovereign intelligence practical.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
            {ecosystem.map((item) => (
              <motion.a
                key={item.name}
                {...reveal}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-background p-8 flex items-start justify-between gap-6 hover:bg-accent transition-colors"
                data-testid={`link-ecosystem-${item.name}`}
              >
                <div>
                  <h3 className="font-serif text-xl md:text-2xl">{item.label}</h3>
                  <p className="text-body-sm mt-2">{item.description}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-1" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-dark bg-ink text-background">
        <div className="container-page grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...reveal}>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-white/50">
              <span className="marker-dot bg-ember" />
              INQUIRE
            </span>
            <h2 className="heading-section mt-6">
              Hold a shell. Hold the thesis.
            </h2>
            <p className="text-white/55 leading-relaxed mt-6 max-w-md">
              Three executive Sovereign Shells on the North Castle Ventures campus — held
              one institution per shell. Enquiries are handled directly.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/inquiry"
                className="btn-white"
                data-testid="link-inquiry"
                onClick={() => window.scrollTo(0, 0)}
              >
                Inquire about a Sovereign Shell
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/shells"
                className="inline-flex items-center justify-center gap-2 border border-white/25 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-background hover:bg-white/10 transition-colors"
                data-testid="link-shells"
                onClick={() => window.scrollTo(0, 0)}
              >
                View the shells
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={abstractSovereignGround}
              alt="Abstract figure — a slender form rising from an anchored foundation: sovereign ground, held"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
              data-testid="img-fig-sovereign-ground"
            />
            <p className="text-annotation mt-3 text-white/40">FIG_03 · SOVEREIGN GROUND, HELD</p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
