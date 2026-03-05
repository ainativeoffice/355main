import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Link } from "wouter";
import { ArrowRight, Check, Building2, Ruler, Palette, TreePine } from "lucide-react";

import heroImage from "@assets/357_exterior_1.jpg";
import exteriorImage from "@assets/vs_exterior_glass.jpg";
import interiorImage from "@assets/Hero_1767222668713.png";

export default function CustomOffices() {
  return (
    <Layout>
      <SEO 
        title="Custom Office Suites – Tailored Workspaces | 355 Main"
        description="Custom suites at Armonk Professional Center—tailored to your organization and re-tailored as you evolve. Available through 355 Main, 357 Main, or new leases."
        canonical="/solutions/custom-offices"
      />
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Custom Office Building" 
            className="w-full h-full object-cover"
            data-testid="img-hero-custom-offices"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-6"
          >
            Custom Offices
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-4"
          >
            A workspace tailored to your organization—and re-tailored as you evolve. Available through a 3rd floor addition at 355 Main, the neighboring 357 Main building, or new leases as they become available.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm uppercase tracking-widest text-white/60"
          >
            Three Pathways to Customization
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">The Opportunity</span>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">Three Pathways to Your Custom Workspace</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                For organizations seeking a truly dedicated presence in Armonk, we offer three distinct pathways to a custom workspace—one that can be tailored and re-tailored endlessly as your organization evolves.
              </p>
              <ul className="space-y-6">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium">3rd Floor Addition at 355 Main</span>
                    <p className="text-muted-foreground text-sm mt-1">A new floor built above the existing 355 Main building, offering premium elevation and views with direct access to shared amenities.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium">357 Main Street</span>
                    <p className="text-muted-foreground text-sm mt-1">The neighboring building offers a dedicated address with private entrance, while maintaining proximity to the 355 Main campus and amenities.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium">New Lease on Turnover</span>
                    <p className="text-muted-foreground text-sm mt-1">As existing tenants transition, prime suites within 355 Main become available for full customization to your brand and workflow.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img 
                src={exteriorImage} 
                alt="Building Exterior" 
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
                data-testid="img-exterior"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">The Process</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">From Concept to Completion</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
              data-testid="card-process-discover"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-serif text-primary mb-4">01</div>
              <h3 className="font-serif text-xl mb-3">Discover</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We learn about your organization's culture, workflow, and spatial requirements.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
              data-testid="card-process-design"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-serif text-primary mb-4">02</div>
              <h3 className="font-serif text-xl mb-3">Design</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Our architectural partners develop a custom design that reflects your brand and needs.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
              data-testid="card-process-build"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Ruler className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-serif text-primary mb-4">03</div>
              <h3 className="font-serif text-xl mb-3">Build</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Ground-up construction with premium materials and meticulous attention to detail.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
              data-testid="card-process-occupy"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TreePine className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-serif text-primary mb-4">04</div>
              <h3 className="font-serif text-xl mb-3">Occupy</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Move into your bespoke workspace and join the 355 Main community.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.2em] text-white/50 mb-4 block">Availability</span>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">Express Your Interest</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Custom office opportunities depend on timing and availability across our three pathways: the 3rd floor addition at 355 Main, the neighboring 357 Main building, or new leases as existing tenants transition.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                We work with qualified organizations on a case-by-case basis. Contact our team to discuss your requirements, preferred pathway, and timeline.
              </p>
              <a 
                href="mailto:leasing@355main.com" 
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-white/90 transition-colors"
                data-testid="button-inquire-custom"
              >
                Inquire About Availability
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="relative">
              <img 
                src={interiorImage} 
                alt="Office Interior" 
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
                data-testid="img-interior"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Explore Other Solutions</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Not ready for a custom build? Explore our private offices and hybrid memberships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/solutions/private-offices" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-primary/90 transition-colors" data-testid="link-private-offices">
              Private Offices
            </Link>
            <Link href="/solutions/hybrid" className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-muted transition-colors" data-testid="link-hybrid">
              Hybrid Memberships
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
