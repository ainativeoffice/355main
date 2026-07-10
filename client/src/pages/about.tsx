import { motion } from "framer-motion";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import exterior355 from "@assets/355_main_exterior.jpg";
import exterior357a from "@assets/357_exterior_1.jpg";
import exterior357b from "@assets/357_exterior_2.jpg";
import lobbyReception from "@assets/space/lobby-reception.jpeg";
import { FFEIndex } from "@/components/ffe-index";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function About() {
  return (
    <Layout>
      <SEO
        title="The Campus | 355 Main"
        description="355 & 357 Main Street, Armonk, New York — Class A buildings on the North Castle Ventures campus, outfitted with Vitra. A campus built for sovereign work."
        canonical="/about"
      />

      {/* Hero */}
      <section className="section bg-background">
        <div className="container-page">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-8"
              data-testid="text-eyebrow-campus"
            >
              <span className="marker-dot" />
              <span className="text-label-wide">THE CAMPUS / ARMONK NY</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="heading-display mb-8"
              data-testid="text-hero-heading"
            >
              A campus for sovereign work.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-body-lg max-w-2xl"
            >
              355 &amp; 357 Main Street, Armonk, New York. Two Class A buildings on the
              North Castle Ventures campus — where sovereignty of space meets
              sovereignty of compute, thirty-five minutes from Manhattan.
            </motion.p>
          </div>

          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-16"
          >
            <div className="overflow-hidden">
              <img
                src={exterior355}
                alt="355 Main Street exterior, Armonk, New York"
                className="w-full aspect-[16/9] object-cover"
                data-testid="img-hero-exterior"
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between">
              <span className="text-annotation">CAM_00 · 355 MAIN</span>
              <span className="text-annotation">41.1265° N, 73.7140° W</span>
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* 01 — The Place */}
      <section className="section bg-background border-t border-border">
        <div className="container-page">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <motion.div {...reveal} className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="marker-dot" />
                <span className="text-label">REF_01</span>
              </div>
              <h2 className="heading-subsection" data-testid="text-section-place">
                The place
              </h2>
            </motion.div>

            <motion.div {...reveal} className="lg:col-span-8 space-y-6">
              <p className="text-body-lg">
                The campus occupies 355 &amp; 357 Main Street in Armonk, New York —
                two Class A commercial buildings held and operated as a single estate.
              </p>
              <p className="text-body">
                Armonk sits in northern Westchester County, thirty-five minutes from
                Manhattan and minutes from Westchester County Airport. The proximity
                is deliberate: institutions can convene principals, counsel, and capital
                without surrendering to the commute or the noise of the city.
              </p>
              <p className="text-body">
                Each building is a Class A shell — structurally sound, precisely
                serviced, and prepared to be held one institution at a time. The
                campus is not a co-working floor. It is an address engineered for
                tenants who require the space and the compute to be their own.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 02 — North Castle Ventures */}
      <section className="section bg-muted/30 border-t border-border">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...reveal} className="order-2 lg:order-1">
              <figure>
                <div className="overflow-hidden">
                  <img
                    src={exterior357a}
                    alt="357 Main Street on the North Castle Ventures campus"
                    className="w-full aspect-[4/5] object-cover"
                    data-testid="img-northcastle"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-3 text-annotation">
                  CAM_04 · 357 MAIN
                </figcaption>
              </figure>
            </motion.div>

            <motion.div {...reveal} className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="marker-dot" />
                <span className="text-label">REF_02</span>
              </div>
              <h2 className="heading-subsection mb-6" data-testid="text-section-operator">
                North Castle Ventures
              </h2>
              <div className="space-y-6">
                <p className="text-body-lg">
                  The campus is operated by North Castle Ventures — the group behind
                  the thesis that place and compute should be sovereign, and held
                  together.
                </p>
                <p className="text-body">
                  North Castle Ventures assembles the ecosystem around the campus:
                  the shells, the on-premises infrastructure, and the institutions
                  who occupy them. The estate is stewarded as a long-term holding,
                  not a leasing product — one operator, one standard, one vision.
                </p>
                <a
                  href="https://northcastleventures.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-ember"
                  data-testid="link-northcastle"
                >
                  North Castle Ventures
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 03 — The Build */}
      <section className="section bg-background border-t border-border">
        <div className="container-page">
          <motion.div {...reveal} className="max-w-3xl mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="marker-dot" />
              <span className="text-label">REF_03</span>
            </div>
            <h2 className="heading-subsection mb-6" data-testid="text-section-build">
              The build
            </h2>
            <p className="text-body-lg">
              Every shell is outfitted with Vitra — furniture chosen for its
              restraint, its longevity, and its ability to reconfigure around the
              work rather than dictate it. The full FF&amp;E index, as specified
              and installed.
            </p>
          </motion.div>

          <FFEIndex />
        </div>
      </section>

      {/* Dark band — The standard */}
      <section className="section-dark bg-ink text-background border-t border-white/10">
        <div className="container-page">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <motion.div {...reveal} className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="marker-dot" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">
                  REF_04
                </span>
              </div>
              <h2 className="heading-subsection" data-testid="text-section-standard">
                The standard
              </h2>
            </motion.div>

            <motion.div {...reveal} className="lg:col-span-8 space-y-6">
              <p className="text-xl md:text-2xl leading-relaxed">
                The campus is built to a single premise: that an institution should
                own the room it works in and the compute that works for it.
              </p>
              <p className="text-white/60 leading-relaxed">
                Materials are chosen to last. Systems are specified to be held, not
                rented. The design ethos is deliberate understatement — nothing that
                distracts from the seriousness of the work, and nothing that ages the
                address before its time. This is what it means to build for sovereignty:
                permanence over trend, premises over cloud, one institution per shell.
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 pt-2">
                41.1265° N, 73.7140° W · ARMONK, NEW YORK
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facts / spec sheet */}
      <section className="section bg-background border-t border-border">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...reveal}>
              <div className="flex items-center gap-3 mb-6">
                <span className="marker-dot" />
                <span className="text-label">CAMPUS SPECIFICATION</span>
              </div>
              <dl>
                <div className="spec-row">
                  <dt>Location</dt>
                  <dd data-testid="spec-location">Armonk, New York</dd>
                </div>
                <div className="spec-row">
                  <dt>Buildings</dt>
                  <dd data-testid="spec-buildings">355 &amp; 357 Main</dd>
                </div>
                <div className="spec-row">
                  <dt>Class</dt>
                  <dd data-testid="spec-class">A</dd>
                </div>
                <div className="spec-row">
                  <dt>Campus</dt>
                  <dd data-testid="spec-campus">North Castle Ventures</dd>
                </div>
                <div className="spec-row">
                  <dt>Coordinates</dt>
                  <dd data-testid="spec-coordinates">41.1265° N, 73.7140° W</dd>
                </div>
                <div className="spec-row">
                  <dt>FF&amp;E</dt>
                  <dd data-testid="spec-ffe">Vitra</dd>
                </div>
              </dl>
            </motion.div>

            <motion.div {...reveal}>
              <figure>
                <div className="overflow-hidden">
                  <img
                    src={lobbyReception}
                    alt="Reception at 355 Main"
                    className="w-full aspect-[4/5] object-cover"
                    data-testid="img-reception"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-3 text-annotation">
                  CAM_05 · RECEPTION · 355 MAIN
                </figcaption>
              </figure>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-dark bg-ink text-background border-t border-white/10">
        <div className="container-page text-center">
          <motion.div {...reveal} className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="marker-dot" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">
                INQUIRE
              </span>
            </div>
            <h2 className="heading-section mb-6">
              Hold a shell on the campus.
            </h2>
            <p className="text-white/60 leading-relaxed mb-10">
              The campus is held one institution per shell. Enquiries are reviewed
              in confidence.
            </p>
            <Link
              href="/inquiry"
              className="btn-white"
              data-testid="link-inquiry"
              onClick={() => window.scrollTo(0, 0)}
            >
              Inquire
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
