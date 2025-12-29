import { motion } from "framer-motion";
import { ArrowDown, Check, Wifi, Monitor, Armchair, Coffee } from "lucide-react";
import { Layout } from "@/components/layout";

import heroImage from "@assets/355-main-office-gallery-01-big-7_1766959299960.jpg";
import lanternImage from "@assets/vs_exterior_glass.jpg";
import entranceImage from "@assets/vs_entrance.jpg";
import elevatorImage from "@assets/opus_elevator.jpg";
import constructionImage from "@assets/generated_images/empty_office_interior_under_construction,_white_walls,_concrete_floor..png";
import townSquareImage from "@assets/generated_images/interior_of_the_town_square_open_office_with_vitra_furniture..png";
import greenNookImage from "@assets/generated_images/the_green_nook_lounge_area_with_velvet_seating..png";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section - Refined & Timeless */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Opus 355 Lantern" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6 text-sm md:text-base uppercase tracking-[0.25em] font-medium text-white/90"
          >
            355 Main Street • Armonk, NY
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1] tracking-tight"
          >
            A Design-Led Workplace
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light font-serif italic"
          >
            "Form follows function, but feeling follows form."
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Intro Concept - Minimalist Promise */}
      <section id="concept" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-5xl mb-12 text-foreground leading-tight"
          >
            Success is the space you work in.
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed font-light"
          >
            <p>
              Opus 355 is designed for professionals who want more than four walls and a door. 
              Here, you get a beautifully curated, move-in ready space in a boutique campus setting.
            </p>
            <p>
              It feels less like a traditional office, and more like a private club for getting your 
              best work, relationships, and ideas off the ground.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Offering - Brochure Integration */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Our Offering</span>
            <h2 className="font-serif text-4xl mt-4">Choose How You Work</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
             {[
               {
                 title: "Private Office",
                 desc: "A turnkey private office tailored for modern working styles. Ideal for focused work and client conversations.",
                 capacity: "1-20 People",
                 features: ["Secure Storage", "Ergonomic Seating", "Height-Adjustable Desks"]
               },
               {
                 title: "Team Suite",
                 desc: "Built for teams that create, build, and collaborate. Room to spread out with shared worktables and hardwired power.",
                 capacity: "2-6 People",
                 features: ["Shared Workstations", "Meeting Table", "Team Privacy"]
               },
               {
                 title: "Hybrid Membership",
                 desc: "For executives and local professionals who don't need a dedicated office but want access to the lounge and café.",
                 capacity: "Individual",
                 features: ["Lounge Access", "Meeting Rooms", "Café Amenities"]
               }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: i * 0.1 }}
                 className="bg-background p-8 border border-border hover:border-primary/20 transition-colors shadow-sm"
               >
                 <h3 className="font-serif text-2xl mb-2">{item.title}</h3>
                 <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-6">{item.capacity}</span>
                 <p className="text-muted-foreground mb-8 text-sm leading-relaxed min-h-[80px]">
                   {item.desc}
                 </p>
                 <ul className="space-y-3">
                   {item.features.map((feat, j) => (
                     <li key={j} className="flex items-center gap-3 text-sm">
                       <Check className="w-4 h-4 text-primary/60" />
                       <span>{feat}</span>
                     </li>
                   ))}
                 </ul>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* The Zones Grid - Refined */}
      <section id="zones" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">Visual Tour</span>
            <h2 className="font-serif text-4xl mt-4">Form Follows Function</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-1 bg-white p-1 shadow-2xl shadow-black/5">
            {/* Lantern Feature */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] md:aspect-auto md:row-span-2 group overflow-hidden"
            >
              <img 
                src={lanternImage} 
                alt="The Lantern" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                <h3 className="font-serif text-3xl mb-2">The Lantern</h3>
                <p className="text-white/80 max-w-sm">
                  A beacon of transparency, dissolving the threshold between the street and the suite.
                </p>
              </div>
            </motion.div>

            {/* Town Square */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-[4/3] group overflow-hidden"
            >
              <img 
                src={townSquareImage} 
                alt="Town Square" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="font-serif text-2xl mb-2">The Club Lounge</h3>
                <p className="text-white/80 text-sm">
                  A central hearth for coffee, conversation, and community events.
                </p>
              </div>
            </motion.div>

            {/* Green Nook */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[4/3] group overflow-hidden"
            >
              <img 
                src={greenNookImage} 
                alt="Green Nook" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="font-serif text-2xl mb-2">Focus Nooks</h3>
                <p className="text-white/80 text-sm">
                  Quiet alcoves with acoustic privacy for deep work and reflection.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Construction Progress */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6">
           <div className="grid md:grid-cols-2 gap-12 items-center">
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
             >
               <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">In Progress</span>
               <h2 className="font-serif text-4xl mt-6 mb-6">Building in Public</h2>
               <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                 We are stripping back the layers to reveal the essential structure. 
                 The walls are primed. The subfloor is prepped. 
               </p>
               <div className="flex items-center gap-4">
                 <div className="bg-muted px-4 py-2 rounded-full text-sm font-medium">
                    Current Status: <span className="text-foreground">Flooring Installation</span>
                 </div>
               </div>
             </motion.div>
             
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative aspect-video bg-muted overflow-hidden shadow-2xl"
             >
                <img 
                  src={constructionImage} 
                  alt="Construction Progress - Flooring Prep" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 text-xs uppercase tracking-widest">
                  Live Update
                </div>
             </motion.div>
           </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-24 bg-muted text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-5xl mb-6">Secure Your Citizenship</h2>
            <p className="text-muted-foreground mb-10">
              Citizenship at Opus 355 is limited. Join the waitlist to be notified when applications open.
            </p>
            
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow px-6 py-4 bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
              <button className="bg-foreground text-background px-8 py-4 font-medium hover:bg-primary hover:text-primary-foreground transition-colors uppercase tracking-widest text-sm">
                Join List
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              By joining, you agree to receive updates about Opus 355.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy / Features */}
      <section id="philosophy" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Features</span>
              <h2 className="font-serif text-4xl md:text-5xl mt-6 mb-8 leading-tight">
                Everything you need to<br/>
                feel at home at work.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Because it’s landlord-owned and operated, everything — from furnishings to tech to service — 
                is aligned under one vision and can flex with your team as you grow.
              </p>
              
              <div className="space-y-4">
                {[
                  "Vitra + Artek Premium Furnishings",
                  "Casambi Wireless Mesh Lighting",
                  "High-Speed Fiber Connectivity",
                  "Daily Cleaning & Hospitality Service"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="h-px w-8 bg-border group-hover:bg-primary transition-colors" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-8 aspect-square flex flex-col justify-between hover:bg-muted/80 transition-colors cursor-default">
                <Wifi className="w-8 h-8 text-primary" />
                <span className="font-serif text-xl">Fiber<br/>Wifi</span>
              </div>
              <div className="bg-muted p-8 aspect-square flex flex-col justify-between hover:bg-muted/80 transition-colors cursor-default translate-y-8">
                <Monitor className="w-8 h-8 text-primary" />
                <span className="font-serif text-xl">Plug &<br/>Play</span>
              </div>
              <div className="bg-muted p-8 aspect-square flex flex-col justify-between hover:bg-muted/80 transition-colors cursor-default">
                <Armchair className="w-8 h-8 text-primary" />
                <span className="font-serif text-xl">Premium<br/>Design</span>
              </div>
              <div className="bg-muted p-8 aspect-square flex flex-col justify-between hover:bg-muted/80 transition-colors cursor-default translate-y-8">
                <Coffee className="w-8 h-8 text-primary" />
                <span className="font-serif text-xl">Café &<br/>Lounge</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-primary text-primary-foreground text-center px-6">
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
         >
           <h2 className="font-serif text-4xl md:text-6xl mb-8">Ready for a better way to work?</h2>
           <p className="text-white/80 max-w-xl mx-auto mb-12 text-lg">
             Schedule a tour to experience Opus 355 in person.
           </p>
           <a 
             href="mailto:leasing@opus355.com"
             className="inline-block border border-white/30 bg-white/5 hover:bg-white text-white hover:text-primary px-10 py-4 text-sm uppercase tracking-widest font-semibold transition-all duration-300"
           >
             Contact Leasing
           </a>
         </motion.div>
      </section>
    </Layout>
  );
}
