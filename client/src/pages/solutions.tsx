import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Link } from "wouter";
import { ArrowRight, Building2, Users, Zap, Layers, Video } from "lucide-react";
import { Testimonials } from "@/components/testimonials";
import { NewsSection } from "@/components/news-section";

import customOfficeImage from "@assets/355_main_exterior.jpg";
import dynamicSpacesImage from "@assets/zones/zone8_opt5_symposium.svg";
import conferenceRoomsImage from "@assets/zones/zone11_closed_mtg.svg";

import zone5a from "@assets/zones/zone5_opt_b.svg";
import zone6 from "@assets/zones/zone6_suite207.svg";
import zone1 from "@assets/zones/zone2_201.svg";
import zone8 from "@assets/zones/zone8_opt5_symposium.svg";
import zone10 from "@assets/zones/zone10_cafe.svg";
import zone11 from "@assets/zones/zone11_closed_mtg.svg";

const privateOfficeConfigs = [
  { image: zone5a, label: "Solo Office", capacity: "1 person" },
  { image: zone6, label: "Team Office", capacity: "2-3 people" },
  { image: zone1, label: "Custom Office", capacity: "4-8 people" },
];

const flexSpaces = [
  { image: zone8, label: "Dynamic Space", type: "Collaboration" },
  { image: zone10, label: "Shared Café", type: "Social" },
  { image: zone11, label: "Conference Room", type: "Meetings" },
];

export default function Solutions() {
  return (
    <Layout>
      <SEO 
        title="Workspace Solutions | 355 Main"
        description="Workspace solutions that adapt to how you work. Private offices, flex memberships, and custom suites at 355 Main in Armonk, NY."
        canonical="/solutions"
      />
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
            From dedicated private offices to flexible memberships, 355 Main offers workspace solutions that adapt to how you work.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Dedicated Workspace</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">A Workplace That Adapts to You</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Link href="/solutions/private-offices">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group block bg-card border border-border overflow-hidden hover:border-primary/50 transition-colors cursor-pointer"
                data-testid="card-private-offices"
              >
                <div className="grid grid-cols-3">
                  {privateOfficeConfigs.map((config, index) => (
                    <div key={index} className="relative bg-[#f5f5f5] overflow-hidden border-r last:border-r-0 border-border">
                      <div className="aspect-[4/3] p-4">
                        <img 
                          src={config.image} 
                          alt={config.label} 
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="bg-foreground/95 px-3 py-2">
                        <p className="text-white text-sm font-medium leading-tight">{config.label}</p>
                        <p className="text-white/60 text-xs">{config.capacity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-primary" />
                    <h3 className="font-serif text-2xl">Private Offices</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">For teams: 1-8 people</p>
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

            <Link href="/solutions/hybrid">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group block bg-card border border-border overflow-hidden hover:border-primary/50 transition-colors cursor-pointer"
                data-testid="card-hybrid-membership"
              >
                <div className="grid grid-cols-3">
                  {flexSpaces.map((space, index) => (
                    <div key={index} className="relative bg-[#f5f5f5] overflow-hidden border-r last:border-r-0 border-border">
                      <div className="aspect-[4/3] p-4">
                        <img 
                          src={space.image} 
                          alt={space.label} 
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="bg-foreground/95 px-3 py-2">
                        <p className="text-white text-sm font-medium leading-tight">{space.label}</p>
                        <p className="text-white/60 text-xs">{space.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                    <h3 className="font-serif text-2xl">Flex Membership</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">For hybrid workers and distributed teams</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Flexible access to shared workspaces, private offices, and all-inclusive amenities. Work from our beautiful common areas whenever you need a professional environment.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Access to shared workspaces
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Private office access, as available
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

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Bespoke Space</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">Custom Suites</h2>
            <p className="text-muted-foreground">at Armonk Professional Center</p>
          </div>

          <div className="max-w-2xl mx-auto">
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
                    alt="Custom Suites at Armonk Professional Center" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                    <h3 className="font-serif text-2xl">Custom Suites</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">For organizations seeking dedicated space</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Bespoke workspace tailored to your organization at Armonk Professional Center—available through a 3rd floor addition at 355 Main, the neighboring 357 Main building, or new leases as they become available.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      3rd floor addition at 355 Main
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      357 Main Street building
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      New leases on turnover
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

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Club Amenities</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">Shared Spaces</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Premium shared spaces designed to support every mode of work—from deep focus to collaborative sessions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border overflow-hidden"
              data-testid="card-dynamic-spaces"
            >
              <div className="aspect-[16/9] overflow-hidden bg-[#f5f5f5] p-6 flex items-center justify-center">
                <img 
                  src={dynamicSpacesImage} 
                  alt="Dynamic Spaces" 
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="w-6 h-6 text-primary" />
                  <h3 className="font-serif text-2xl">Dynamic Spaces</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Flexible workspace configurations</p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our flagship flexible zone transforms to support symposiums, focused work sessions, stand-up meetings, and presentations. Vitra furniture enables rapid reconfiguration for any work style.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Symposium layout for workshops
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Focus mode for deep work
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Stand-up configurations for agile teams
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Presentation setup with AV integration
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card border border-border overflow-hidden"
              data-testid="card-conference-rooms"
            >
              <div className="aspect-[16/9] overflow-hidden bg-[#f5f5f5] p-6 flex items-center justify-center">
                <img 
                  src={conferenceRoomsImage} 
                  alt="Conference Rooms" 
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Video className="w-6 h-6 text-primary" />
                  <h3 className="font-serif text-2xl">Conference Rooms</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Professional meeting spaces</p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The Lantern—our signature conference room featuring floor-to-ceiling glass for maximum transparency. Equipped with premium AV technology for seamless hybrid meetings.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Floor-to-ceiling glass walls
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Dante AV integration
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Video conferencing ready
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Seats up to 12 people
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials section - enable post-launch when real testimonials are available
      <Testimonials featured={true} />
      */}

      <NewsSection limit={3} />

      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-5xl mb-6">Need Help Choosing?</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Our team can help you find the perfect workspace solution for your organization's needs.
          </p>
          <a 
            href="mailto:leasing@355main.com" 
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
