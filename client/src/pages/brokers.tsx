import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { ArrowRight, Check, Building2, Users, TrendingUp, Handshake } from "lucide-react";
import { Link } from "wouter";

import heroImage from "@assets/stock_images/professional_busines_850cb7b8.jpg";
import meetingImage from "@assets/stock_images/professional_busines_c9623543.jpg";
import buildingExterior from "@assets/vs_exterior_glass.jpg";
import interiorImage from "@assets/355-main-office-gallery-01-big-7_1766959299960.jpg";

export default function Brokers() {
  return (
    <Layout>
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Broker partnership" 
            className="w-full h-full object-cover"
            data-testid="img-hero-brokers"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4 block"
          >
            Broker Partnerships
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-6"
          >
            Your Partner for the New Era of Work
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8"
          >
            The office is evolving. Now more than ever, owners and occupiers rely on you as their trusted CRE advisors. Opus 355 is your competitive advantage in Westchester.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            href="mailto:leasing@opus355.com"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-white/90 transition-colors"
            data-testid="button-partner-cta"
          >
            Become a Partner
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Solutions</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">A Solution for Every Client</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The distributed workforce is here to stay, but it looks different for every organization. Opus 355 provides the flexibility your clients need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border p-8 hover:border-primary/50 transition-colors"
              data-testid="card-solution-remote"
            >
              <Users className="w-10 h-10 text-primary mb-6" />
              <h3 className="font-serif text-2xl mb-4">Remote Teams</h3>
              <p className="text-muted-foreground leading-relaxed">
                Give remote team members a professional place to work outside of the home. Opus 355 offers a consistent, premium experience in the heart of Armonk.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card border border-border p-8 hover:border-primary/50 transition-colors"
              data-testid="card-solution-distributed"
            >
              <Building2 className="w-10 h-10 text-primary mb-6" />
              <h3 className="font-serif text-2xl mb-4">Satellite Office</h3>
              <p className="text-muted-foreground leading-relaxed">
                Quickly establish a hub-and-spoke presence that brings the office closer to Westchester-based employees, reducing commute times and increasing productivity.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-border p-8 hover:border-primary/50 transition-colors"
              data-testid="card-solution-headquarters"
            >
              <TrendingUp className="w-10 h-10 text-primary mb-6" />
              <h3 className="font-serif text-2xl mb-4">Regional Headquarters</h3>
              <p className="text-muted-foreground leading-relaxed">
                Partner with our team to design custom, private suites for teams that want a dedicated presence with the flexibility of a managed workspace.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Why Opus 355</span>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">The Commercial Town Hall Advantage</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Opus 355 represents a new typology for the distributed age. Unlike conventional flex space, we've designed a true commercial destination that elevates your clients' workplace experience.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Design-forward interiors with Vitra furniture throughout</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Prime Armonk location with ample parking</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Flexible terms for evolving business needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Opening February 2026 — early access for partners</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img 
                src={buildingExterior} 
                alt="Opus 355 Exterior" 
                className="w-full aspect-[4/3] object-cover"
                data-testid="img-building-exterior"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-white/50 mb-4 block">Compensation</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">Partner Commission Structure</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              We value our broker partnerships and offer competitive compensation for successful referrals.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 border border-white/10 p-8" data-testid="card-commission-initial">
                <h3 className="text-sm uppercase tracking-widest text-white/50 mb-4">Initial Term (12+ months)</h3>
                <div className="text-5xl font-serif mb-4">10%</div>
                <p className="text-white/60 text-sm">of total contract value on months 1-12</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-8" data-testid="card-commission-extended">
                <h3 className="text-sm uppercase tracking-widest text-white/50 mb-4">Extended Terms</h3>
                <div className="text-5xl font-serif mb-4">2%</div>
                <p className="text-white/60 text-sm">of total contract value on months 13-36</p>
              </div>
            </div>

            <div className="mt-8 bg-primary/20 border border-primary/30 p-6 text-center">
              <p className="text-white/80">
                <strong className="text-white">Pre-Opening Special:</strong> 15% TCV on deals closed within 60 days of opening
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <Handshake className="w-16 h-16 text-primary mx-auto mb-8" />
          <h2 className="font-serif text-3xl md:text-5xl mb-6">Ready to Partner?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Join our broker network and give your clients access to Westchester's most innovative workplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:leasing@opus355.com" 
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-contact-broker"
            >
              Contact Our Team
            </a>
            <Link href="/">
              <a 
                className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-muted transition-colors"
                data-testid="link-explore-space"
              >
                Explore the Space
              </a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
