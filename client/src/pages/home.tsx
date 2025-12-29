import { motion } from "framer-motion";
import { ArrowDown, Check, Wifi, Monitor, Armchair, Coffee, MapPin, Layers, Settings2 } from "lucide-react";
import { Layout } from "@/components/layout";
import { useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

import { Slider } from "@/components/ui/slider";

import heroImage from "@assets/355-main-office-gallery-01-big-7_1766959299960.jpg";
import lanternImage from "@assets/vs_exterior_glass.jpg";
import entranceImage from "@assets/vs_entrance.jpg";
import elevatorImage from "@assets/opus_elevator.jpg";
import building357Exterior from "@assets/357_exterior_1.jpg";
import building357Interior from "@assets/357_exterior_2.jpg";

import constructionImage from "@assets/construction_update.jpg";
import townSquareImage from "@assets/generated_images/interior_of_the_town_square_open_office_with_vitra_furniture..png";
import greenNookImage from "@assets/generated_images/the_green_nook_lounge_area_with_velvet_seating..png";

// Campus & Floorplate Assets
import building3d from "@assets/building3d.svg";
import buildingPlate from "@assets/building.svg";

// Zone Assets
import zone1 from "@assets/zones/zone2_201.svg";
import zone2 from "@assets/zones/zone2_reception.svg";
import zone3 from "@assets/zones/zone3_lounge.svg";
import zone4 from "@assets/zones/zone4.svg";
import zone5a from "@assets/zones/zone5_opt_b.svg";
import zone5b from "@assets/zones/zone5_opt_2.svg";
import zone6 from "@assets/zones/zone6_suite207.svg";
import zone7 from "@assets/zones/zone7_copy.svg";
import zone8a from "@assets/zones/zone8_opt3_focus.svg";
import zone8b from "@assets/zones/zone8_opt4_standup.svg";
import zone8c from "@assets/zones/zone8_opt5_symposium.svg";
import zone8d from "@assets/zones/zone8_opt2_pres.svg";
import zone9a from "@assets/zones/zone9_break1.svg";
import zone9b from "@assets/zones/zone9_break2.svg";
import zone10a from "@assets/zones/zone10_cafe.svg";
import zone10b from "@assets/zones/zone10_cafe1.svg";
import zone10c from "@assets/zones/zone10_cafe3_power.svg";
import zone11a from "@assets/zones/zone11_view2.svg";
import zone11b from "@assets/zones/zone11_closed_mtg.svg";

// FF&E Assets
import ffeEames from "@assets/stock_images/vitra_eames_aluminum_5d44eb46.jpg";
import ffeStool60 from "@assets/stock_images/artek_stool_60_stack_580858e0.jpg";
import ffeJoyn from "@assets/stock_images/vitra_joyn_conferenc_f78e65b8.jpg";
import ffeAlcove from "@assets/stock_images/vitra_alcove_sofa_hi_354cd378.jpg";

const zones = [
  {
    id: 1,
    title: "Production Suite",
    desc: "A dedicated environment for high-output teams.",
    images: [zone1],
    products: [
      {
        name: "Aluminum Group EA 117",
        brand: "Vitra",
        image: ffeEames,
        url: "#",
        desc: "The classic Eames office chair combining comfort with a prestigious silhouette."
      },
      {
        name: "Joyn Conference",
        brand: "Vitra",
        image: ffeJoyn,
        url: "#",
        desc: "A flexible office platform that promotes dynamic communication."
      }
    ]
  },
  {
    id: 2,
    title: "Green Nook & Reception",
    desc: "Biophilic arrival experience and reception.",
    images: [zone2],
    products: []
  },
  {
    id: 3,
    title: "Lounge Area",
    desc: "Informal social condenser.",
    images: [zone3],
    products: [
      {
        name: "Alcove Highback",
        brand: "Vitra",
        image: ffeAlcove,
        url: "#",
        desc: "A room within a room for focused work or small meetings in open areas."
      }
    ]
  },
  {
    id: 4,
    title: "Conference Area",
    desc: "High-stakes strategy room.",
    images: [zone4],
    products: [
      {
        name: "Eames Aluminum Group",
        brand: "Vitra",
        image: ffeEames,
        url: "#",
        desc: "Timeless elegance for the executive boardroom."
      }
    ]
  },
  {
    id: 5,
    title: "Private Office",
    desc: "Flexible private workspace with multiple configurations.",
    images: [zone5a, zone5b],
    products: [
      {
        name: "Stool 60",
        brand: "Artek",
        image: ffeStool60,
        url: "#",
        desc: "The iconic three-legged stool designed by Alvar Aalto."
      }
    ]
  },
  {
    id: 6,
    title: "Team Offices",
    desc: "Collaborative suites for small groups.",
    images: [zone6],
    products: []
  },
  {
    id: 7,
    title: "Resource Room",
    desc: "Utility and production hub.",
    images: [zone7],
    products: []
  },
  {
    id: 8,
    title: "Dynamic Space",
    desc: "Aggressively flexible collaborative area.",
    images: [zone8a, zone8b, zone8c, zone8d],
    products: [
        {
        name: "Joyn",
        brand: "Vitra",
        image: ffeJoyn,
        url: "#",
        desc: "Configurable work tables for project-based collaboration."
      }
    ]
  },
  {
    id: 9,
    title: "Break Room",
    desc: "Hospitality-grade refreshment zone.",
    images: [zone9a, zone9b],
    products: []
  },
  {
    id: 10,
    title: "Diner",
    desc: "Social hearth with integrated power.",
    images: [zone10a, zone10b, zone10c],
    products: []
  },
  {
    id: 11,
    title: "The Lantern",
    desc: "The beacon of transparency.",
    images: [zone11a, zone11b],
    products: []
  }
];

export default function Home() {
  const [activeZone, setActiveZone] = useState(zones[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeBuilding, setActiveBuilding] = useState<"355" | "357">("355");

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
            A Design-Led<br />Workplace
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

      {/* Campus Architecture Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">The Campus</span>
            <h2 className="font-serif text-4xl mt-4">Armonk Professional Center</h2>
          </div>
          
          <div className="flex justify-center mb-12">
            <div className="bg-muted p-1 rounded-full flex gap-1">
              <button 
                onClick={() => setActiveBuilding("355")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeBuilding === "355" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                355 Main Street
              </button>
              <button 
                onClick={() => setActiveBuilding("357")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeBuilding === "357" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                357 Main Street
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto min-h-[500px]">
            <motion.div 
               key={activeBuilding}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
               className="space-y-6 text-lg leading-relaxed text-muted-foreground"
            >
              {activeBuilding === "355" ? (
                <>
                  <p>
                    The original Armonk Professional Center, built in the 1960s, is a 2-story office building with a rich history. 
                  </p>
                  <p>
                    An addition to the lobby by famed <span className="text-foreground font-medium">Architect Vatche Simonian</span> seamlessly merges old and new. 
                    The new two-story glass enclosure and stone-clad elevator tower contrast with and yet complement the structure’s original brick facade.
                  </p>
                  <p>
                    The elevator tower is clad with oversized stone panels that continue to the interior of the lobby and conceal the mechanical room doors,
                    creating a monolithic anchor for the site.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    357 Main Street represents the modern evolution of the campus. Designed in 2006 by <span className="text-foreground font-medium">Vatche Simonian</span>, 
                    the same visionary architect behind the 355 lobby addition.
                  </p>
                  <p>
                    The footprint of this 22,000-square-foot glass-and-steel structure was maximized by including a subterranean parking deck. 
                    Large windows take advantage of natural light, while brick accents add continuity with the other office buildings in the complex.
                  </p>
                  <p>
                    The project required substantial site work, including blasting of existing rock, which was salvaged and used as retaining walls—grounding the 
                    modern structure in the site's geology.
                  </p>
                </>
              )}
            </motion.div>
            
            <motion.div 
               key={`${activeBuilding}-images`}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6 }}
               className="grid grid-cols-2 gap-4"
            >
              <img 
                src={activeBuilding === "355" ? lanternImage : building357Exterior} 
                alt="Exterior Facade" 
                className="w-full h-64 object-cover" 
              />
              <img 
                src={activeBuilding === "355" ? entranceImage : building357Interior} 
                alt="Interior/Detail" 
                className="w-full h-64 object-cover translate-y-8" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Blueprint Section - Floor Plate & FF&E */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">The Blueprint</span>
            <h2 className="font-serif text-4xl mt-4">Spatial Intelligence</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="bg-muted/10 p-8 border border-border relative"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h3 className="font-serif text-xl flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  Composite Floor Plate
                </h3>
              </div>

              <div className="aspect-square md:aspect-[16/9] bg-white relative overflow-hidden border border-border/50">
                {/* Base Layer: Building Floor Plate */}
                <div className="absolute inset-0 p-8 flex items-center justify-center">
                   <img 
                    src={buildingPlate} 
                    alt="Building Floor Plate" 
                    className="w-full h-full object-contain opacity-100" 
                  />
                </div>
                
                {/* Overlay Layer: FF&E */}
                <div 
                  className="absolute inset-0 p-8 flex items-center justify-center"
                >
                   <img 
                    src={building3d} 
                    alt="Vitra FF&E Layout" 
                    className="w-full h-full object-contain mix-blend-multiply opacity-80" 
                  />
                </div>
              </div>
              
              <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-border bg-white" />
                  <span>Base Build</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary/20 border border-primary" />
                  <span>Furnishing Overlay</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Offering */}
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

      {/* The Zones Detail Section - Interactive */}
      <section id="zones" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">Interior Architecture</span>
            <h2 className="font-serif text-4xl mt-4">Zone by Zone</h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
            {/* Zone List */}
            <div className="lg:col-span-4 space-y-2 h-[600px] overflow-y-auto pr-4 scrollbar-hide">
              {zones.map((zone) => (
                <button 
                  key={zone.id}
                  onClick={() => { setActiveZone(zone); setActiveImageIndex(0); }}
                  className={`w-full text-left p-6 border transition-all duration-300 group ${
                    activeZone.id === zone.id 
                      ? "bg-primary text-primary-foreground border-primary" 
                      : "bg-background border-border hover:border-primary/30"
                  }`}
                >
                  <span className={`text-xs uppercase tracking-widest block mb-2 ${
                    activeZone.id === zone.id ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                    Zone {zone.id}
                  </span>
                  <h3 className="font-serif text-xl">{zone.title}</h3>
                </button>
              ))}
            </div>

            {/* Zone Display */}
            <div className="lg:col-span-8 bg-muted/10 border border-border p-8 md:p-12 flex flex-col items-center justify-center min-h-[600px] relative">
              <div className="w-full max-w-2xl">
                <motion.div
                  key={`${activeZone.id}-${activeImageIndex}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="aspect-[16/9] bg-white border border-border shadow-sm p-4 mb-8 flex items-center justify-center"
                >
                  <img 
                    src={activeZone.images[activeImageIndex]} 
                    alt={activeZone.title} 
                    className="w-full h-full object-contain" 
                  />
                </motion.div>

                {/* Image Toggles if multiple */}
                {activeZone.images.length > 1 && (
                  <div className="flex justify-center gap-4 mb-8">
                    {activeZone.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          activeImageIndex === idx ? "bg-primary" : "bg-border hover:bg-primary/50"
                        }`}
                      />
                    ))}
                  </div>
                )}

                <div className="text-center">
                  <h3 className="font-serif text-3xl mb-4">{activeZone.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto mb-8">
                    {activeZone.desc}
                  </p>

                  {/* FF&E Selection */}
                  {activeZone.products && activeZone.products.length > 0 && (
                    <div className="border-t border-border pt-8 mt-8">
                      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-6">
                        Curated Furnishings
                      </span>
                      <div className="flex flex-wrap justify-center gap-4">
                        {activeZone.products.map((product, idx) => (
                          <HoverCard key={idx}>
                            <HoverCardTrigger asChild>
                              <a 
                                href={product.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border hover:border-primary/50 rounded-full transition-all group"
                              >
                                <span className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                                <span className="font-medium text-sm">{product.brand}</span>
                                <span className="text-muted-foreground text-sm">• {product.name}</span>
                              </a>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80 p-0 overflow-hidden border-border bg-background shadow-xl" sideOffset={10}>
                              <div className="aspect-[4/3] bg-muted relative">
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 opacity-0 hover:opacity-100 transition-opacity">
                                  <span className="text-white text-xs font-medium uppercase tracking-wider">View Product Specs →</span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h4 className="font-serif text-lg mb-1">{product.name}</h4>
                                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">{product.brand}</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {product.desc}
                                </p>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
            <h2 className="font-serif text-3xl md:text-5xl mb-6">Secure Your Membership</h2>
            <p className="text-muted-foreground mb-10">
              Membership at Opus 355 is limited. Join the waitlist to be notified when applications open.
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
