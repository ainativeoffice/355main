import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Check, Building2, Ruler, Palette, TreePine } from "lucide-react";

import heroImage from "@assets/357_exterior_1.jpg";
import exteriorImage from "@assets/vs_exterior_glass.jpg";
import interiorImage from "@assets/Hero_1767216807768.png";

export default function CustomOffices() {
  return (
    <Layout>
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
          <Link href="/solutions" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors" data-testid="link-back-solutions">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm uppercase tracking-widest">All Solutions</span>
          </Link>
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
            Ground-up design-build on the 355 Main Street parcel. A bespoke workspace tailored entirely to your organization.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm uppercase tracking-widest text-white/60"
          >
            Upon Availability
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">The Opportunity</span>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">Build Your Vision</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                For organizations seeking a truly dedicated presence in Armonk, we offer the opportunity to design and build a custom office structure on available parcels adjacent to Opus 355.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                This is not a renovation or fit-out — it's a ground-up development tailored to your exact specifications, constructed separately from the main Opus 355 building while benefiting from the same prime location and campus amenities.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Complete architectural freedom</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Dedicated building with private entrance</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Access to Opus 355 amenities and services</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Prime Armonk location with ample parking</span>
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
                Move into your bespoke workspace and join the Opus 355 community.
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
              <h2 className="font-serif text-3xl md:text-4xl mb-6">Limited Parcel Availability</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Custom office opportunities are subject to parcel availability on the 355 Main Street property. We work with qualified organizations on a case-by-case basis.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                If your organization is interested in exploring a custom office development, we encourage you to contact our team to discuss your requirements and timeline.
              </p>
              <a 
                href="mailto:leasing@opus355.com" 
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
