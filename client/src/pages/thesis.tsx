import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";

import exteriorImage from "@assets/355_main_exterior.jpg";
import openFloorImage from "@assets/space/open-floor.jpeg";
import meetingRoomImage from "@assets/space/meeting-room.jpeg";

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
      "Regulated work demands reproducible answers. On-premises, deterministic systems return the same output for the same input — auditable, defensible, and free of the drift that follows a public model API.",
  },
  {
    ref: "02",
    title: "Premises over cloud",
    body:
      "Data that cannot leave the building should never touch a third-party endpoint. Compute is co-located with the institution that owns it — sovereignty of space and sovereignty of compute in the same room.",
  },
  {
    ref: "03",
    title: "Institution over crowd",
    body:
      "Each shell is held by a single institution. No shared tenancy, no shared inference, no shared risk. The premises, the infrastructure, and the intelligence answer to one principal.",
  },
];

const ecosystem = [
  {
    name: "northcastle",
    label: "North Castle Ventures",
    description: "The operator of the Armonk campus.",
    url: "https://northcastleventures.com",
  },
  {
    name: "rfc",
    label: "The RFC · AI-Native Office",
    description: "The reference blueprint for the AI-native office.",
    url: "https://ainativeoffice.org",
  },
  {
    name: "nate",
    label: "Nate · Native Agentic",
    description: "Agentic systems built to operate on-premises.",
    url: "https://nativeagentic.com",
  },
  {
    name: "trucast",
    label: "Trucast",
    description: "Deterministic intelligence for regulated work.",
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
              Sovereign Intelligence,
              <br />
              anchored in Armonk.
            </h1>
            <p className="text-body-lg mt-8 max-w-2xl">
              The most consequential legal and financial institutions cannot send their
              data to public model APIs. The answer is not a better API. It is a different
              architecture — deterministic AI, held on-premises, in the same building as
              the people it serves.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="section border-b border-border">
        <div className="container-page grid lg:grid-cols-12 gap-12 items-start">
          <motion.div {...reveal} className="lg:col-span-4">
            <span className="text-label" data-testid="text-ref-problem">REF_01 — THE PROBLEM</span>
            <h2 className="heading-subsection mt-4">
              Regulated data cannot leave the room.
            </h2>
          </motion.div>
          <motion.div {...reveal} className="lg:col-span-7 lg:col-start-6 space-y-6">
            <p className="text-body-lg">
              Law firms, funds, and financial institutions hold privileged, material,
              non-public information. Sending it to a public model API is not a workflow
              decision — it is a breach of the duties those institutions are built on.
            </p>
            <p className="text-body">
              Confidentiality, privilege, and regulatory obligation all point the same
              direction: the most sensitive work cannot be handed to infrastructure the
              institution does not control. For these principals, the public cloud is not a
              convenience with caveats. It is a line that cannot be crossed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Answer */}
      <section className="section border-b border-border">
        <div className="container-page grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...reveal} className="order-2 lg:order-1">
            <span className="text-label" data-testid="text-ref-answer">REF_02 — THE ANSWER</span>
            <h2 className="heading-subsection mt-4">
              On-premises, deterministic, co-located.
            </h2>
            <div className="mt-8 space-y-6">
              <p className="text-body-lg">
                The intelligence lives where the institution lives. Compute is installed on
                the premises, operated by the tenant, and never reaches for an outside
                endpoint to do its work.
              </p>
              <p className="text-body">
                Deterministic systems return the same answer to the same question — a
                property that turns AI from a liability into an instrument of record.
                Co-location closes the loop: the model, the data, and the people who rely
                on both occupy one secured space.
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
              src={openFloorImage}
              alt="Interior of a sovereign shell at 355 Main"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
            <p className="text-annotation mt-3">CAM_01 · 355 MAIN / SHELL INTERIOR</p>
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
              src={meetingRoomImage}
              alt="Meeting room within a sovereign shell"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
            <p className="text-annotation mt-3">CAM_02 · 355 MAIN / COUNSEL ROOM</p>
          </motion.div>
          <motion.div {...reveal}>
            <span className="text-label" data-testid="text-ref-place">REF_03 — WHY PLACE MATTERS</span>
            <h2 className="heading-subsection mt-4">
              Compute, counsel, and capital in one room.
            </h2>
            <div className="mt-8 space-y-6">
              <p className="text-body-lg">
                Sovereignty is not only a property of software. It is a property of the
                building it runs in and the institution that occupies it.
              </p>
              <p className="text-body">
                When the infrastructure, the decision-makers, and the work sit inside the
                same walls, latency collapses and accountability sharpens. Physical place
                is what makes the thesis operational rather than theoretical — Class A real
                estate fused with on-premises intelligence, outfitted for principals who
                answer to no one else's server.
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
              The model already operates at scale.
            </h2>
          </motion.div>
          <motion.div {...reveal} className="lg:col-span-7 lg:col-start-6 space-y-6">
            <p className="text-body-lg">
              <span className="text-foreground font-medium">Alpha School</span> is
              real-world evidence that AI-native operations work at scale — an institution
              run on the same premise that machine intelligence, applied deterministically
              and close to the people who use it, changes what an organization can do.
            </p>
            <p className="text-body">
              We reference it as a proof point, not a partnership: standing evidence that
              this is an operating reality, not a projection. The thesis behind 355 Main is
              already running in the world. Armonk is where it takes institutional form.
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
              A network building the AI-native institution.
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
                Inquire about a shell
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
              src={exteriorImage}
              alt="Exterior of 355 Main, Armonk, New York"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
            <p className="text-annotation mt-3 text-white/40">CAM_03 · 355 MAIN / EXTERIOR</p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
