import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Check, Users, Plug, LayoutGrid, Settings } from "lucide-react";

import heroImage from "@assets/355-main-office-gallery-01-big-7_1766959299960.jpg";
import tyde2Image from "@assets/generated_images/interior_of_the_town_square_open_office_with_vitra_furniture..png";
import officeImage from "@assets/vs_exterior_glass.jpg";

export default function PrivateOffices() {
  return (
    <Layout>
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Private Office" 
            className="w-full h-full object-cover"
            data-testid="img-hero-private-offices"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <Link href="/solutions">
            <a className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors" data-testid="link-back-solutions">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm uppercase tracking-widest">All Solutions</span>
            </a>
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-6"
          >
            Private Offices
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-4"
          >
            Move-in ready private spaces featuring Vitra Tyde 2 configurations with integrated electrical and structural support.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm uppercase tracking-widest text-white/60"
          >
            For Teams: 1-15 People
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={tyde2Image} 
                alt="Vitra Tyde 2 Desk" 
                className="w-full aspect-[4/3] object-cover"
                data-testid="img-tyde2"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">The Foundation</span>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">Vitra Tyde 2 System</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Every private office at Opus 355 is built around the Vitra Tyde 2 height-adjustable desk system. This modular platform allows single units to integrate seamlessly into different layouts.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                The Tyde 2's unified electrical and structural support means your workspace can evolve with your team — adding or reconfiguring desks without complex infrastructure changes.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Height-adjustable sit-stand functionality</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Integrated cable management</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Modular expansion capability</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Premium Vitra craftsmanship</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Configurations</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">Office Layouts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From solo professionals to growing teams, our private offices adapt to your needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background border border-border p-8"
              data-testid="card-config-solo"
            >
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-serif text-xl">Solo Office</h3>
                  <p className="text-sm text-muted-foreground">1 person</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A dedicated private space with a single Tyde 2 workstation. Ideal for focused individual work with all the amenities of Opus 355.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Single Tyde 2 desk
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Ergonomic seating
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Private entrance
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-background border border-border p-8"
              data-testid="card-config-team"
            >
              <div className="flex items-center gap-3 mb-6">
                <LayoutGrid className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-serif text-xl">Team Office</h3>
                  <p className="text-sm text-muted-foreground">2-6 people</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Multiple Tyde 2 units configured for collaborative work. Integrated electrical spine supports the entire team.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  2-6 connected Tyde 2 desks
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Shared collaboration zone
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Unified cable management
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-background border border-border p-8"
              data-testid="card-config-suite"
            >
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-serif text-xl">Suite</h3>
                  <p className="text-sm text-muted-foreground">7-15 people</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A dedicated suite with multiple Tyde 2 configurations, private meeting space, and room to grow.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Flexible desk configurations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Private meeting room
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Expansion capability
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Infrastructure</span>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">Integrated Support Systems</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                The Tyde 2 system's singular electrical and structural backbone means your office is ready for anything. Power, data, and support infrastructure are integrated from day one.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <Plug className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Power Integration</h4>
                    <p className="text-sm text-muted-foreground">Unified electrical spine with ample outlets at every workstation</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <LayoutGrid className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Modular Growth</h4>
                    <p className="text-sm text-muted-foreground">Add desks without rewiring or construction</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={officeImage} 
                alt="Team Office Configuration" 
                className="w-full aspect-[4/3] object-cover"
                data-testid="img-team-office"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-5xl mb-6">Ready to Move In?</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Private offices at Opus 355 are move-in ready. Contact us to schedule a tour and find the right configuration for your team.
          </p>
          <a 
            href="mailto:leasing@opus355.com" 
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-white/90 transition-colors"
            data-testid="button-schedule-tour"
          >
            Schedule a Tour
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Explore Other Solutions</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Need more flexibility? Check out our hybrid memberships or custom office options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/solutions/hybrid">
              <a className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-primary/90 transition-colors" data-testid="link-hybrid">
                Hybrid Memberships
              </a>
            </Link>
            <Link href="/solutions/custom-offices">
              <a className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-muted transition-colors" data-testid="link-custom-offices">
                Custom Offices
              </a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
