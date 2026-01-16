import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { ExternalLink, Building, Users, Sparkles } from "lucide-react";

import lanternImage from "@assets/vs_exterior_glass.jpg";
import entranceImage from "@assets/vs_entrance.jpg";
import building357Exterior from "@assets/357_exterior_1.jpg";
import building357Interior from "@assets/357_exterior_2.jpg";

import ffeEames from "@assets/stock_images/vitra_eames_aluminum_5d44eb46.jpg";
import ffeDancingWall from "@assets/stock_images/vitra_dancing_wall_m_2c963453.jpg";
import ffeTyde2 from "@assets/stock_images/vitra_tyde_2_sit_sta_39a22b81.jpg";

const ffePartners = [
  {
    category: "Furniture",
    partners: [
      {
        name: "Vitra",
        description: "Swiss furniture manufacturer known for iconic designs and innovative workplace solutions. Their modular systems enable the Dynamic Spaces concept at 355 Main.",
        url: "https://www.vitra.com",
        image: ffeEames,
      },
    ],
  },
  {
    category: "Lighting",
    partners: [
      {
        name: "BASO Lighting",
        description: "Round architectural fixtures positioned above dynamic spaces, providing balanced ambient illumination.",
        url: "https://www.basolighting.com",
      },
      {
        name: "Louis Poulsen",
        description: "Danish architectural lighting design, bringing Scandinavian craftsmanship to accent areas.",
        url: "https://www.louispoulsen.com",
      },
      {
        name: "Coronet",
        description: "Linear office fixtures delivering consistent ambient light across work zones.",
        url: "https://www.coronetled.com",
      },
      {
        name: "Marset",
        description: "Soho pendants and mono points for accent and task lighting throughout the space.",
        url: "https://www.marset.com",
      },
    ],
  },
  {
    category: "Controls & Smart Building",
    partners: [
      {
        name: "Casambi",
        description: "Wireless lighting controls and scene management enabling personalized lighting experiences. Members can adjust their environment through the Opus app.",
        url: "https://www.casambi.com",
      },
    ],
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block"
          >
            About 355 Main
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl mb-8 leading-tight"
          >
            A New Chapter for<br />the American Office
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            355 Main reimagines the workplace for the distributed era—where exceptional 
            design, hospitality, and flexibility converge to create spaces people genuinely 
            want to inhabit.
          </motion.p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                Our Vision
              </span>
              <h2 className="font-serif text-3xl md:text-4xl mt-4 mb-6">
                The Destination Workplace
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  The office of tomorrow isn't just a place to work—it's a place people 
                  <em> choose</em> to be. We call this the <strong className="text-foreground">Destination Workplace</strong>.
                </p>
                <p>
                  355 Main operates as an <strong className="text-foreground">Office Club</strong>: 
                  a members-only environment serving both dedicated tenants and flex workers, 
                  with public, semi-private, and private zones designed for how people actually 
                  work today.
                </p>
                <p>
                  Our <strong className="text-foreground">Dynamic Spaces</strong> transform 
                  throughout the day—reconfiguring for focus work, collaboration, meetings, 
                  workshops, and presentations. Premium furniture enables rapid adaptation 
                  to match any work style or team need.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={lanternImage}
                alt="355 Main Glass Exterior"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm px-4 py-2 border border-border">
                <span className="text-sm font-medium">Glass Curtain Wall</span>
                <p className="text-xs text-muted-foreground">Transparency by design</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ownership Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              Landlord-Operated
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mt-4">
              One Vision. One Team.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card p-8 border border-border"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Building className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-3">Direct Ownership</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Unlike co-working franchises or third-party operators, 355 Main is directly 
                owned and operated by the landlord. This means faster decisions, consistent 
                service, and a long-term commitment to quality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card p-8 border border-border"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-3">Aligned Incentives</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We succeed when our members succeed. There are no middlemen, no franchise 
                fees, no conflicting interests—just a shared commitment to creating the 
                best possible workspace experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card p-8 border border-border"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-3">Flexible Growth</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                From furnishings to tech to service, everything is aligned under one vision 
                and can flex with your team as you grow. Scale up, scale down, or reconfigure 
                without bureaucratic friction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campus Architecture (moved from home) */}
      <section id="campus" className="py-24 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              The Campus
            </span>
            <h2 className="font-serif text-4xl mt-4">Armonk Professional Center</h2>
            <a
              href="https://armonkprofessionalcenter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-armonk-professional-center"
            >
              armonkprofessionalcenter.com
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* 355 Main Street */}
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-lg leading-relaxed text-muted-foreground"
            >
              <h3 className="font-serif text-2xl text-foreground">355 Main Street</h3>
              <p>
                The original Armonk Professional Center, built in the 1960s, is a 2-story 
                office building with a rich history.
              </p>
              <p>
                An addition to the lobby by famed{" "}
                <span className="text-foreground font-medium">Architect Vatche Simonian</span>{" "}
                seamlessly merges old and new. The new two-story glass enclosure and stone-clad 
                elevator tower contrast with and yet complement the structure's original brick facade.
              </p>
              <p>
                The elevator tower is clad with oversized stone panels that continue to the 
                interior of the lobby and conceal the mechanical room doors, creating a 
                monolithic anchor for the site.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src={lanternImage}
                alt="355 Main Street Exterior"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <img
                src={entranceImage}
                alt="355 Main Street Entrance"
                className="w-full h-64 object-cover translate-y-8"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* 357 Main Street */}
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4 order-2 md:order-1"
            >
              <img
                src={building357Exterior}
                alt="357 Main Street Exterior"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <img
                src={building357Interior}
                alt="357 Main Street Interior"
                className="w-full h-64 object-cover translate-y-8"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-lg leading-relaxed text-muted-foreground order-1 md:order-2"
            >
              <h3 className="font-serif text-2xl text-foreground">357 Main Street</h3>
              <p>
                357 Main Street represents the modern evolution of the campus. Designed in 2006 
                by <span className="text-foreground font-medium">Vatche Simonian</span>, the 
                same visionary architect behind the 355 lobby addition.
              </p>
              <p>
                The footprint of this 22,000-square-foot glass-and-steel structure was maximized 
                by including a subterranean parking deck. Large windows take advantage of natural 
                light, while brick accents add continuity with the other office buildings in the complex.
              </p>
              <p>
                The project required substantial site work, including blasting of existing rock, 
                which was salvaged and used as retaining walls—grounding the modern structure in 
                the site's geology.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FF&E Partners */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              Our Partners
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mt-4 mb-4">
              Best-in-Class FF&E
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              355 Main is outfitted with furniture, fixtures, and equipment from 
              industry-leading partners who share our commitment to design excellence.
            </p>
          </div>

          <div className="space-y-16 max-w-4xl mx-auto">
            {ffePartners.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-sm uppercase tracking-widest font-semibold text-primary mb-6">
                  {category.category}
                </h3>
                <div className="grid gap-6">
                  {category.partners.map((partner) => (
                    <div
                      key={partner.name}
                      className="flex items-start gap-6 p-6 bg-card border border-border hover:border-primary/30 transition-colors"
                    >
                      {partner.image && (
                        <div className="w-20 h-20 bg-white rounded border border-border overflow-hidden shrink-0">
                          <img
                            src={partner.image}
                            alt={partner.name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-serif text-lg">{partner.name}</h4>
                          <a
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {partner.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Featured Products - Commented out for now
          <div className="mt-24 max-w-5xl mx-auto">
            <h3 className="text-center font-serif text-2xl mb-12">Featured Products</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border overflow-hidden group"
              >
                <div className="aspect-square bg-white p-8">
                  <img
                    src={ffeTyde2}
                    alt="Vitra Tyde 2"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Vitra</span>
                  <h4 className="font-serif text-lg mt-1">Tyde 2</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Height-adjustable sit-stand table system for ergonomic flexibility.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border overflow-hidden group"
              >
                <div className="aspect-square bg-white p-8">
                  <img
                    src={ffeDancingWall}
                    alt="Vitra Dancing Wall"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Vitra</span>
                  <h4 className="font-serif text-lg mt-1">Dancing Wall</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Mobile partitions enabling rapid space reconfiguration.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border overflow-hidden group"
              >
                <div className="aspect-square bg-white p-8">
                  <img
                    src={ffeEames}
                    alt="Vitra Eames Aluminum Group"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Vitra</span>
                  <h4 className="font-serif text-lg mt-1">Eames Aluminum Group</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Timeless elegance for executive spaces and conference rooms.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
          */}
        </div>
      </section>
    </Layout>
  );
}
