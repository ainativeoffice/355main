import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Check, Users, Plug, LayoutGrid, Settings } from "lucide-react";

import heroImage from "@assets/Hero_1767222668713.png";
import officeImage from "@assets/vs_exterior_glass.jpg";

import tyde2System from "@assets/82655552-2_1769527039463.jpg";
import myntChair from "@assets/86857078_1769527235782.jpg";
import myntSketch from "@assets/86864757_1769527235784.jpg";
import mikadoChair from "@assets/82677988-2_1769531347394.jpg";
import mikadoSketch from "@assets/82660803_1769527337840.jpg";
import mikadoCushion from "@assets/82678104_1769527337840.jpg";

import zone1 from "@assets/zones/zone2_201.svg";
import zone5a from "@assets/zones/zone5_opt_b.svg";
import zone6 from "@assets/zones/zone6_suite207.svg";

export default function PrivateOffices() {
  return (
    <Layout>
      <SEO 
        title="Private Offices | 355 Main"
        description="Move-in ready private offices with Vitra Tyde 2 configurations for teams of 1-15. Premium furnishings at 355 Main in Armonk, NY."
        canonical="/solutions/private-offices"
      />
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
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">The Foundation</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">Three Key Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every private office at 355 Main is built around three essential elements: the desk, the desk chair, and the passive chair. We've selected each for its design excellence, ergonomic innovation, and long-term support from Vitra.
            </p>
          </div>

          <div className="space-y-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <img 
                  src={tyde2System} 
                  alt="Vitra Tyde 2 System" 
                  className="w-full aspect-[4/3] object-cover bg-[#f5f5f5]"
                  loading="lazy"
                  data-testid="img-tyde2"
                />
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">The Desk</span>
                <h3 className="font-serif text-2xl md:text-3xl mb-2">Tyde 2 System</h3>
                <p className="text-sm text-muted-foreground mb-4">Vitra</p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We chose the Tyde 2 for its modularity—single units integrate seamlessly into different configurations, adapting as your team grows. The unified electrical and structural backbone means adding or reconfiguring desks without complex infrastructure changes.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Modular configurations for any team size</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Height-adjustable sit-stand functionality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Vitra maintenance and long-term product support</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 lg:order-1">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">The Desk Chair</span>
                <h3 className="font-serif text-2xl md:text-3xl mb-2">Mynt</h3>
                <p className="text-sm text-muted-foreground mb-4">Erwan Bouroullec, 2025</p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Mynt redefines the desk chair with intuitive, weight-activated movement. The synchronized mechanism responds naturally to your body—lean back and the seat tilts, shift forward and it follows. No levers, no adjustments. Just effortless, infinite posture support throughout the workday.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Weight-activated synchronized mechanism</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Infinite posture support without manual adjustment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Engineered against static fatigue</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
                <img 
                  src={myntChair} 
                  alt="Mynt Chair" 
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                  data-testid="img-mynt-chair"
                />
                <img 
                  src={myntSketch} 
                  alt="Mynt movement sketch" 
                  className="w-full aspect-square object-contain bg-[#f5f5f5]"
                  loading="lazy"
                  data-testid="img-mynt-sketch"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="grid grid-cols-3 gap-4">
                <img 
                  src={mikadoChair} 
                  alt="Mikado Chair" 
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                  data-testid="img-mikado-chair"
                />
                <img 
                  src={mikadoSketch} 
                  alt="Mikado movement sketch by Barber & Osgerby" 
                  className="w-full aspect-square object-contain bg-[#f5f5f5]"
                  loading="lazy"
                  data-testid="img-mikado-sketch"
                />
                <img 
                  src={mikadoCushion} 
                  alt="Mikado comfortable seat cushion" 
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                  data-testid="img-mikado-cushion"
                />
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">The Passive Chair</span>
                <h3 className="font-serif text-2xl md:text-3xl mb-2">Mikado</h3>
                <p className="text-sm text-muted-foreground mb-4">Edward Barber & Jay Osgerby, 2024</p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  For visitors and side seating, Mikado delivers unexpected comfort through subtle movement. The flexing backrest responds gently to your posture, preventing the static fatigue of traditional side chairs. Upholstered on all sides with a comfortable seat cushion—design that invites you to stay.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Subtle rocking mechanism for dynamic comfort</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Upholstery on all sides</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Comfortable seat cushion</span>
                  </li>
                </ul>
              </div>
            </motion.div>
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
              className="bg-background border border-border overflow-hidden"
              data-testid="card-config-solo"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#f5f5f5] p-4 flex items-center justify-center">
                <img 
                  src={zone5a} 
                  alt="Solo Office Layout" 
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-serif text-xl">Solo Office</h3>
                    <p className="text-sm text-muted-foreground">1 person</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Engineered against static fatigue. The Mynt's weight-activated infinite posture and the Mikado's subtle rocking mechanism encourage micro-movements to keep you energized. Paired with electrified tabletops—a complete performance system designed to sustain focus.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Mynt desk chair with dynamic movement
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Mikado side chair for visitors
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Electrified workstation
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-background border border-border overflow-hidden"
              data-testid="card-config-team"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#f5f5f5] p-4 flex items-center justify-center">
                <img 
                  src={zone6} 
                  alt="Team Office Layout" 
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <LayoutGrid className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-serif text-xl">Team Office</h3>
                    <p className="text-sm text-muted-foreground">2-3 people</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  A command center for synchronized leadership. The Tyde 2 system creates a self-contained suite: sit-stand workstations for deep individual focus, plus a dedicated table for collaboration. Pivot instantly from 'heads-down' production to 'heads-up' strategy sessions.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Tyde 2 sit-stand workstations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Internal collaboration zone
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Mikado side chairs
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-background border border-border overflow-hidden"
              data-testid="card-config-suite"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#f5f5f5] p-4 flex items-center justify-center">
                <img 
                  src={zone1} 
                  alt="Production Suite Layout" 
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-serif text-xl">Production Suite</h3>
                    <p className="text-sm text-muted-foreground">4-8 people</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  A hybrid engine for high-stakes work. Lightweight touchdown tables paired with ergonomic .04 chairs create a space that pivots instantly—a polished conference room for client presentations in the morning, or a dedicated 'war room' for your team to sprint on a project.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Reconfigurable touchdown tables
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Client presentation ready
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Team sprint capability
                  </li>
                </ul>
              </div>
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
                loading="lazy"
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
            Private offices at 355 Main are move-in ready. Contact us to schedule a tour and find the right configuration for your team.
          </p>
          <a 
            href="mailto:leasing@355main.com" 
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
            <Link href="/solutions/hybrid" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-primary/90 transition-colors" data-testid="link-hybrid">
              Hybrid Memberships
            </Link>
            <Link href="/solutions/custom-offices" className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-muted transition-colors" data-testid="link-custom-offices">
              Custom Offices
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
