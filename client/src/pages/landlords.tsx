import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { ArrowRight, TrendingUp, Users, Building2, Star, Lightbulb, Leaf, Wifi, Monitor, Zap } from "lucide-react";
import { Link } from "wouter";

import heroImage from "@assets/C818EAD8-FC36-4C5E-A2FB-2241953A2134_1767201676925.png";
import buildingImage from "@assets/stock_images/commercial_real_esta_82168a19.jpg";
import exteriorImage from "@assets/vs_exterior_glass.jpg";
import building357Exterior from "@assets/357_exterior_1.jpg";
import interiorImage from "@assets/Hero_1767201488037.png";

export default function Landlords() {
  return (
    <Layout>
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Property development" 
            className="w-full h-full object-cover"
            data-testid="img-hero-landlords"
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
            Property Partnerships
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-6"
          >
            Unlock Your Portfolio's True Potential
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8"
          >
            North Castle Ventures transforms properties into dynamic workplace destinations, increasing value across your entire portfolio with design-forward, experience-driven spaces.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            href="mailto:partnerships@opus355.com"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-white/90 transition-colors"
            data-testid="button-partner-landlord"
          >
            Partner With Us
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
              data-testid="card-satisfaction"
            >
              <div className="aspect-[4/3] overflow-hidden mb-6">
                <img 
                  src={interiorImage} 
                  alt="Premium interior" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-2xl mb-4">Highest Quality Standards</h3>
              <p className="text-muted-foreground leading-relaxed">
                We have a deep understanding of modern occupiers' needs, delivering premium experiences with world-class design partners like Vitra, resulting in spaces that attract and retain quality tenants.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
              data-testid="card-value"
            >
              <div className="aspect-[4/3] overflow-hidden mb-6">
                <img 
                  src={exteriorImage} 
                  alt="Building exterior" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-2xl mb-4">Increase Portfolio Value</h3>
              <p className="text-muted-foreground leading-relaxed">
                We partner with landlords to transform buildings into dynamic workplace destinations, increasing the value of your entire portfolio with minimal risk through proven management and operations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Value Creation</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">How We Create Value</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background border border-border p-8"
              data-testid="card-value-churn"
            >
              <div className="text-6xl font-serif text-primary mb-4">01</div>
              <h3 className="font-serif text-xl mb-4">Decrease Churn</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Tenants grow into flexible spaces and come to rely on services within the building, creating sticky, long-term relationships.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-background border border-border p-8"
              data-testid="card-value-premium"
            >
              <div className="text-6xl font-serif text-primary mb-4">02</div>
              <h3 className="font-serif text-xl mb-4">Drive Rent Premiums</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                In-demand amenities, elevated service levels, and increased employee productivity justify premium positioning in the market.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-background border border-border p-8"
              data-testid="card-value-valuation"
            >
              <div className="text-6xl font-serif text-primary mb-4">03</div>
              <h3 className="font-serif text-xl mb-4">Higher Valuation</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Attract high-quality tenants from top companies, commanding a higher market valuation for your property assets.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Infrastructure</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">The Nervous System</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Behind every seamless experience is invisible technology that just works. We've solved your IT headaches before you even tour.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-muted/30 border border-border p-8"
              data-testid="card-tech-lighting"
            >
              <Zap className="w-10 h-10 text-primary mb-6" />
              <h3 className="font-serif text-xl mb-2">Casambi Wireless Mesh</h3>
              <p className="text-sm text-muted-foreground mb-4">Intelligent Lighting Control</p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Lighting that adjusts to your circadian rhythm automatically. Bluetooth-based controls mean no complex wiring, easy reconfiguration, and energy savings up to 80%.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-muted/30 border border-border p-8"
              data-testid="card-tech-av"
            >
              <Monitor className="w-10 h-10 text-primary mb-6" />
              <h3 className="font-serif text-xl mb-2">Dante AV Network</h3>
              <p className="text-sm text-muted-foreground mb-4">Professional Audio/Video</p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Conference calls that just work, in any room. Broadcast-quality AV over standard ethernet means crystal-clear audio and seamless video from day one.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-muted/30 border border-border p-8"
              data-testid="card-tech-connectivity"
            >
              <Wifi className="w-10 h-10 text-primary mb-6" />
              <h3 className="font-serif text-xl mb-2">Lightpath Fiber</h3>
              <p className="text-sm text-muted-foreground mb-4">Enterprise Connectivity</p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Enterprise-grade fiber with 99.99% uptime. Dedicated connectivity means your team is never fighting for bandwidth, even during all-hands video calls.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.2em] text-white/50 mb-4 block">About North Castle Ventures</span>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">A Vision for Westchester</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                North Castle Ventures is developing a new paradigm for commercial real estate in the Northern Westchester corridor. Our approach combines design excellence, operational expertise, and deep local knowledge.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                Opus 355 at 355 Main Street, Armonk represents our flagship project — a dynamic workplace destination that reimagines the office for the distributed work era. We're actively seeking partnerships with property owners who share our vision for elevating the workplace experience.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-white/80">Design-forward approach with premium furnishing partners</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-white/80">Innovative flexible workspace concepts</span>
                </li>
                <li className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-white/80">Sustainability-conscious development practices</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img 
                src={building357Exterior} 
                alt="North Castle Ventures project" 
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
                data-testid="img-ncv-project"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Building2 className="w-16 h-16 text-primary mx-auto mb-8" />
            <h2 className="font-serif text-3xl md:text-5xl mb-6">Own Property in Westchester?</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We're actively seeking partnership opportunities with property owners who want to transform their assets into dynamic workplace destinations. Let's explore how North Castle Ventures can add value to your portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:partnerships@opus355.com" 
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-primary/90 transition-colors"
                data-testid="button-contact-partnerships"
              >
                Discuss Partnership
              </a>
              <Link 
                href="/"
                className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-muted transition-colors"
                data-testid="link-see-opus355"
              >
                See Opus 355
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
