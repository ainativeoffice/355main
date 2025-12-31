import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Check, Zap, Coffee, Phone, Calendar, Wifi, Clock } from "lucide-react";

import heroImage from "@assets/IMG_1101_1767223655433.jpeg";
import coworkingImage from "@assets/stock_images/modern_corporate_ent_56277f1f.jpg";
import amenitiesImage from "@assets/Hero_1767222668713.png";

export default function HybridMemberships() {
  return (
    <Layout>
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Shared Workspace" 
            className="w-full h-full object-cover"
            data-testid="img-hero-hybrid"
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
            Hybrid Memberships
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-4"
          >
            Flexible access to premium shared workspaces, private offices, and all-inclusive amenities.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm uppercase tracking-widest text-white/60"
          >
            For Hybrid Workers & Distributed Teams
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Membership Options</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">Choose Your Access Level</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you need a few days a month or unlimited access, we have a membership that fits your work style.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border p-8"
              data-testid="card-membership-flex"
            >
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl mb-2">Flex</h3>
              <p className="text-sm text-muted-foreground mb-6">5 days per month</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Perfect for occasional office needs. Access shared workspaces and amenities on your schedule.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  5 days of access per month
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  Shared workspace seating
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  Private office access
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  All-day amenities
                </li>
              </ul>
              <a 
                href="mailto:leasing@opus355.com?subject=Flex Membership Inquiry"
                className="block w-full text-center border border-border py-3 text-sm uppercase tracking-widest font-medium hover:bg-muted transition-colors"
                data-testid="button-flex-inquiry"
              >
                Inquire
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card border-2 border-primary p-8 relative"
              data-testid="card-membership-standard"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-xs uppercase tracking-widest">
                Popular
              </div>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl mb-2">Standard</h3>
              <p className="text-sm text-muted-foreground mb-6">10 days per month</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Ideal for hybrid workers who split time between home and office. More access, more flexibility.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  10 days of access per month
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  Shared workspace seating
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  Priority private office booking
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  2 meeting room hours/month
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  All-day amenities
                </li>
              </ul>
              <a 
                href="mailto:leasing@opus355.com?subject=Standard Membership Inquiry"
                className="block w-full text-center bg-primary text-primary-foreground py-3 text-sm uppercase tracking-widest font-medium hover:bg-primary/90 transition-colors"
                data-testid="button-standard-inquiry"
              >
                Inquire
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-border p-8"
              data-testid="card-membership-unlimited"
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl mb-2">Unlimited</h3>
              <p className="text-sm text-muted-foreground mb-6">Unlimited access</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Full-time access without a dedicated desk. Come in whenever you want, work however you want.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  Unlimited access
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  Shared workspace seating
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  Unlimited private office access
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  4 meeting room hours/month
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  Mail handling
                </li>
              </ul>
              <a 
                href="mailto:leasing@opus355.com?subject=Unlimited Membership Inquiry"
                className="block w-full text-center border border-border py-3 text-sm uppercase tracking-widest font-medium hover:bg-muted transition-colors"
                data-testid="button-unlimited-inquiry"
              >
                Inquire
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">What's Included</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">All-Inclusive Amenities</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center p-6"
              data-testid="card-amenity-wifi"
            >
              <Wifi className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-serif text-lg mb-2">High-Speed WiFi</h3>
              <p className="text-sm text-muted-foreground">Enterprise-grade connectivity throughout</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-6"
              data-testid="card-amenity-coffee"
            >
              <Coffee className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-serif text-lg mb-2">Coffee & Refreshments</h3>
              <p className="text-sm text-muted-foreground">Premium coffee, tea, and snacks all day</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6"
              data-testid="card-amenity-phone"
            >
              <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-serif text-lg mb-2">Private Offices</h3>
              <p className="text-sm text-muted-foreground">Private spaces for calls and focused work</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">The Space</span>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">Work From the Town Square</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Hybrid members have access to our beautiful shared workspaces, designed as a modern "Town Square" for the distributed workforce. Work alongside other professionals in a thoughtfully designed environment.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                With premium Vitra furniture throughout and spaces designed for both focused work and collaboration, you'll have everything you need to be productive.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Vitra-furnished workspaces</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Quiet zones for focused work</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Collaboration areas</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Natural light throughout</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img 
                src={coworkingImage} 
                alt="Coworking Space" 
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
                data-testid="img-coworking"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-5xl mb-6">Try Before You Commit</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Schedule a tour to experience Opus 355 firsthand. See our spaces, meet the community, and find the membership that works for you.
          </p>
          <a 
            href="mailto:leasing@opus355.com?subject=Hybrid Membership Tour"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-white/90 transition-colors"
            data-testid="button-tour-hybrid"
          >
            Schedule a Tour
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Need a Dedicated Space?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            If you need a permanent home for your team, explore our private office options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/solutions/private-offices" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-primary/90 transition-colors" data-testid="link-private-offices">
              Private Offices
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
