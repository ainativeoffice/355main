import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { ArrowRight, Building2, Users, Zap } from "lucide-react";

import customOfficeImage from "@assets/357_exterior_1.jpg";
import privateOfficeImage from "@assets/355-main-office-gallery-01-big-7_1766959299960.jpg";
import hybridImage from "@assets/generated_images/interior_of_the_town_square_open_office_with_vitra_furniture..png";

export default function Solutions() {
  return (
    <Layout>
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-muted/30">
        <div className="container mx-auto px-6 py-24 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 block"
          >
            Workspace Solutions
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-6"
          >
            Find Your Perfect Workspace
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            From dedicated private offices to flexible hybrid memberships, Opus 355 offers workspace solutions designed for how you work today.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Dedicated Workspace</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">A Workplace That's All Yours</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Link href="/solutions/custom-offices">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group block bg-card border border-border overflow-hidden hover:border-primary/50 transition-colors cursor-pointer"
                data-testid="card-custom-offices"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={customOfficeImage} 
                    alt="Custom Offices" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                    <h3 className="font-serif text-2xl">Custom Offices</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">For organizations seeking dedicated space</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Design-build custom office space on the parcel, separate from Opus 355. A ground-up solution tailored to your organization's unique requirements.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Ground-up design-build
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Separate from main building
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Upon availability
                    </li>
                  </ul>
                  <span className="inline-flex items-center gap-2 text-primary text-sm uppercase tracking-widest font-medium group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            </Link>

            <Link href="/solutions/private-offices">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group block bg-card border border-border overflow-hidden hover:border-primary/50 transition-colors cursor-pointer"
                data-testid="card-private-offices"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={privateOfficeImage} 
                    alt="Private Offices" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-primary" />
                    <h3 className="font-serif text-2xl">Private Offices</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">For teams: 1-15 people</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Move-in ready private spaces featuring Vitra Tyde 2 configurations that integrate into different layouts with unified electrical and structural support.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Tyde 2 modular configurations
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Integrated electrical support
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Move-in ready
                    </li>
                  </ul>
                  <span className="inline-flex items-center gap-2 text-primary text-sm uppercase tracking-widest font-medium group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Flexible Access</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">Membership Options</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <Link href="/solutions/hybrid">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group block bg-card border border-border overflow-hidden hover:border-primary/50 transition-colors cursor-pointer"
                data-testid="card-hybrid-membership"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={hybridImage} 
                    alt="Hybrid Membership" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                    <h3 className="font-serif text-2xl">Hybrid Memberships</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">For hybrid workers and distributed teams</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Flexible access to shared workspaces, private phone booths, and all-inclusive amenities. Work from our beautiful common areas whenever you need a professional environment.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Access to shared workspaces
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Private phone booths
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      All-inclusive amenities
                    </li>
                  </ul>
                  <span className="inline-flex items-center gap-2 text-primary text-sm uppercase tracking-widest font-medium group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-5xl mb-6">Need Help Choosing?</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Our team can help you find the perfect workspace solution for your organization's needs.
          </p>
          <a 
            href="mailto:leasing@opus355.com" 
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-white/90 transition-colors"
            data-testid="button-contact-solutions"
          >
            Contact Our Team
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </Layout>
  );
}
