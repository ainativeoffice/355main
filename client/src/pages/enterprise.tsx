import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { useState } from "react";
import { ArrowRight, Calendar, MapPin, Laptop, Shield } from "lucide-react";
import { Link } from "wouter";
import { JoinMembershipDialog } from "@/components/join-membership-dialog";

import heroImage from "@assets/stock_images/modern_corporate_ent_54a2da38.jpg";
import teamImage from "@assets/stock_images/modern_corporate_ent_56277f1f.jpg";
import interiorImage from "@assets/Hero_1767216807768.png";
import townSquareImage from "@assets/generated_images/interior_of_the_town_square_open_office_with_vitra_furniture..png";

export default function Enterprise() {
  const [membershipOpen, setMembershipOpen] = useState(false);

  return (
    <Layout>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Enterprise collaboration" 
            className="w-full h-full object-cover"
            data-testid="img-hero-enterprise"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4 block"
            >
              Enterprise Solutions
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
            >
              Custom Workspace Solutions for Your Organization
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-white/80"
            >
              Whether you're building a regional hub, supporting distributed teams, or reimagining your workplace strategy, Opus 355 delivers flexibility without compromise.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-background p-8 shadow-2xl"
          >
            <h2 className="font-serif text-2xl mb-6">Enterprise Membership</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Join Opus 355 to access custom workspace solutions, priority support, and exclusive enterprise benefits for your organization.
            </p>
            <button
              onClick={() => setMembershipOpen(true)}
              className="w-full bg-primary text-primary-foreground py-4 text-sm uppercase tracking-widest font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-become-member"
            >
              Join Now
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Benefits</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">Why Enterprise Teams Choose Opus 355</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center p-8"
              data-testid="card-benefit-agile"
            >
              <Calendar className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="font-serif text-2xl mb-4">Agile Flexibility</h3>
              <p className="text-muted-foreground leading-relaxed">
                Scale up or down as your business evolves. Our terms adapt to your needs, not the other way around.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-8"
              data-testid="card-benefit-liability"
            >
              <Shield className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="font-serif text-2xl mb-4">Minimize Liability</h3>
              <p className="text-muted-foreground leading-relaxed">
                Enjoy a cost-effective workplace solution without the constraints of a lengthy traditional lease or capital expenditure.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-8"
              data-testid="card-benefit-choice"
            >
              <Laptop className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="font-serif text-2xl mb-4">Employee Choice</h3>
              <p className="text-muted-foreground leading-relaxed">
                Let your employees choose when, where, and how they work with spaces designed to give them a reason to come in.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Solutions</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">Workplace Solutions Built for Change</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group"
              data-testid="card-solution-hybrid"
            >
              <div className="aspect-[4/3] overflow-hidden mb-6">
                <img 
                  src={townSquareImage} 
                  alt="Hybrid workspace" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-2xl mb-3">Hybrid Workforce</h3>
              <p className="text-muted-foreground leading-relaxed">
                Combine dedicated offices with flexible access to give your employees the space they want, when they want it.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group"
              data-testid="card-solution-hub"
            >
              <div className="aspect-[4/3] overflow-hidden mb-6">
                <img 
                  src={interiorImage} 
                  alt="Local hub" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-2xl mb-3">Westchester Hub</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our team can design private suites that reflect your brand and are customized for your team's unique workflow.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
              data-testid="card-solution-distributed"
            >
              <div className="aspect-[4/3] overflow-hidden mb-6">
                <img 
                  src={teamImage} 
                  alt="Distributed teams" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-2xl mb-3">Distributed Teams</h3>
              <p className="text-muted-foreground leading-relaxed">
                Give your Westchester-based employees a premium workspace, whether they're local residents or traveling for business.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6 text-center">
          <MapPin className="w-16 h-16 text-primary mx-auto mb-8" />
          <h2 className="font-serif text-3xl md:text-5xl mb-6">Opening February 2026</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Be among the first enterprises to establish presence at Opus 355. Early partners receive priority access and preferred terms.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-white/90 transition-colors"
            data-testid="link-explore-space"
          >
            Explore the Space
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <JoinMembershipDialog open={membershipOpen} onOpenChange={setMembershipOpen} />
    </Layout>
  );
}
