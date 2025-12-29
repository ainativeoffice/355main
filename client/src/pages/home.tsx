import { motion } from "framer-motion";
import { ArrowDown, Check, Wifi, Monitor, Armchair, Coffee, MapPin, Layers, Settings2, Download, ExternalLink, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Layout } from "@/components/layout";
import { useState, useEffect } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AnimatePresence } from "framer-motion";

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
import ffeStoolTool from "@assets/stock_images/vitra_stool-tool_sta_40c83676.jpg";
import ffeDancingWall from "@assets/stock_images/vitra_dancing_wall_m_2c963453.jpg";
import ffeSoftWorkTable from "@assets/stock_images/vitra_soft_work_tabl_33f184fc.jpg";
import ffeMedaMorph from "@assets/stock_images/vitra_medamorph_conf_c497432e.jpg";
import ffeHal from "@assets/stock_images/vitra_hal_chair_jasp_dfd599d1.jpg";
import ffeMynt from "@assets/stock_images/vitra_mynt_office_ch_f0f49d65.jpg";
import ffeFauteuilDirection from "@assets/stock_images/vitra_fauteuil_direc_ad92c663.jpg";
import ffeTyde2 from "@assets/stock_images/vitra_tyde_2_sit_sta_39a22b81.jpg";
import ffeJoyn2 from "@assets/stock_images/vitra_joyn_2_office__e6b47274.jpg";
import ffeSuperFold from "@assets/stock_images/vitra_super_fold_tab_65189058.jpg";
import ffeBelleville from "@assets/stock_images/vitra_belleville_tab_58774a45.jpg";
import ffe03 from "@assets/stock_images/vitra_.03_chair_maar_ed81eaa6.jpg";
import ffe04 from "@assets/stock_images/vitra_.04_chair_offi_b4b13e10.jpg";
import ffeSoftWorkSeating from "@assets/stock_images/vitra_soft_work_seat_c7c7c364.jpg";
import ffe05 from "@assets/stock_images/vitra_.05_chair_maar_01327ebe.jpg";
import ffeFollowMe from "@assets/stock_images/vitra_follow_me_mobi_fade2168.jpg";

const zones = [
  {
    id: 1,
    title: "Production Suite",
    desc: "A dedicated environment for high-output teams.",
    x: 22, y: 35,
    images: [zone1],
    products: [
      {
        name: "Mynt",
        brand: "Vitra",
        image: ffeMynt,
        url: "https://www.vitra.com/en-us/product/mynt",
        pdf: "/documents/mynt.pdf",
        desc: "An ergonomic office chair for dynamic sitting."
      },
      {
        name: ".04 Chair",
        brand: "Vitra",
        image: ffe04,
        url: "https://www.vitra.com/en-us/product/04",
        pdf: "/documents/04_chair.pdf",
        desc: "Unobtrusive design with ergonomic comfort for long periods of sitting."
      },
      {
        name: "Tyde 2",
        brand: "Vitra",
        image: ffeTyde2,
        url: "https://www.vitra.com/en-us/product/tyde-2",
        pdf: "/documents/tyde2.pdf",
        desc: "Height-adjustable sit-stand table system."
      }
    ]
  },
  {
    id: 4,
    title: "Conference Area",
    desc: "High-stakes strategy room.",
    x: 75, y: 25,
    images: [zone4],
    products: [
      {
        name: "MedaMorph",
        brand: "Vitra",
        image: ffeMedaMorph,
        url: "https://www.vitra.com/en-us/product/medamorph",
        pdf: "/documents/medamorph.pdf",
        desc: "Elegant conference table system for any size meeting."
      },
      {
        name: "Eames Aluminum Group",
        brand: "Vitra",
        image: ffeEames,
        url: "https://www.vitra.com/en-us/product/aluminium-group",
        pdf: "/documents/03_chair.pdf", // Using .03 as placeholder for general chair info if Eames PDF missing
        desc: "Timeless elegance for the executive boardroom."
      }
    ]
  },
  {
    id: 5,
    title: "Private Office",
    desc: "Flexible private workspace with multiple configurations.",
    x: 82, y: 50,
    images: [zone5a, zone5b],
    products: [
      {
        name: "Fauteuil Direction",
        brand: "Vitra",
        image: ffeFauteuilDirection,
        url: "https://www.vitra.com/en-us/product/fauteuil-direction",
        pdf: "/documents/fauteuil_direction.pdf",
        desc: "Comfortable armchair especially suited for table seating."
      },
       {
        name: "Stool 60",
        brand: "Artek",
        image: ffeStool60,
        url: "https://www.artek.fi/en/products/stool-60",
        pdf: "#",
        desc: "The iconic three-legged stool designed by Alvar Aalto."
      }
    ]
  },
  {
    id: 6,
    title: "Team Offices",
    desc: "Collaborative suites for small groups.",
    x: 18, y: 55,
    images: [zone6],
    products: [
       {
        name: "Joyn 2",
        brand: "Vitra",
        image: ffeJoyn2,
        url: "https://www.vitra.com/en-us/product/joyn-2",
        pdf: "/documents/joyn2.pdf",
        desc: "Adaptable office table system for teamwork."
      },
      {
        name: "Follow Me",
        brand: "Vitra",
        image: ffeFollowMe,
        url: "https://www.vitra.com/en-us/product/follow-me",
        pdf: "/documents/follow_me.pdf",
        desc: "Robust, lockable mobile pedestal with a decorative pull strap."
      }
    ]
  },
  {
    id: 7,
    title: "Resource Room",
    desc: "Utility and production hub.",
    x: 35, y: 40,
    images: [zone7],
    products: []
  },
  {
    id: 8,
    title: "Dynamic Space",
    desc: "Aggressively flexible collaborative area.",
    x: 65, y: 35,
    images: [zone8a, zone8b, zone8c, zone8d],
    products: [
       {
        name: "Dancing Wall",
        brand: "Vitra",
        image: ffeDancingWall,
        url: "https://www.vitra.com/en-us/product/dancing-wall",
        pdf: "/documents/dancing_wall.pdf",
        desc: "Mobile partition that can be used to divide offices into zones."
      },
      {
        name: "Stool-Tool",
        brand: "Vitra",
        image: ffeStoolTool,
        url: "https://www.vitra.com/en-us/product/stool-tool",
        pdf: "/documents/stool_tool.pdf",
        desc: "Stackable sculpture that serves as both chair and table."
      },
      {
        name: "Super Fold Table",
        brand: "Vitra",
        image: ffeSuperFold,
        url: "https://www.vitra.com/en-us/product/super-fold-table",
        pdf: "/documents/super_fold_table.pdf",
        desc: "Foldable table for flexible meeting arrangements."
      }
    ]
  },
  {
    id: 9,
    title: "Break Room",
    desc: "Hospitality-grade refreshment zone.",
    x: 65, y: 65,
    images: [zone9a, zone9b],
    products: [
       {
        name: "HAL",
        brand: "Vitra",
        image: ffeHal,
        url: "https://www.vitra.com/en-us/product/hal",
        pdf: "/documents/hal_chair.pdf",
        desc: "Versatile shell chair by Jasper Morrison."
      }
    ]
  },
  {
    id: 10,
    title: "Diner",
    desc: "Social hearth with integrated power.",
    x: 30, y: 70,
    images: [zone10a, zone10b, zone10c],
    products: [
      {
        name: "Belleville Table",
        brand: "Vitra",
        image: ffeBelleville,
        url: "https://www.vitra.com/en-us/product/belleville-table",
        pdf: "/documents/belleville_table.pdf",
        desc: "Elegant bistro table with variable appearances."
      },
      {
        name: ".03 Chair",
        brand: "Vitra",
        image: ffe03,
        url: "https://www.vitra.com/en-us/product/03",
        pdf: "/documents/03_chair.pdf",
        desc: "Sleek, slim shape with extraordinary comfort."
      },
      {
        name: ".05 Chair",
        brand: "Vitra",
        image: ffe05,
        url: "https://www.vitra.com/en-us/product/05",
        pdf: "/documents/05_chair.pdf",
        desc: "Uncompromising form and flexible comfort in a cantilever chair."
      }
    ]
  },
  {
    id: 11,
    title: "The Lantern",
    desc: "The beacon of transparency.",
    x: 50, y: 15,
    images: [zone11a, zone11b],
    products: []
  }
];

export default function Home() {
  const [activeZone, setActiveZone] = useState(zones[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeBuilding, setActiveBuilding] = useState<"355" | "357">("355");

  const openZone = (zone: typeof zones[0]) => {
    setActiveZone(zone);
    setActiveImageIndex(0);
    setIsDetailOpen(true);
  };

  const nextZone = () => {
    const currentIndex = zones.findIndex(z => z.id === activeZone.id);
    const nextIndex = (currentIndex + 1) % zones.length;
    openZone(zones[nextIndex]);
  };

  const prevZone = () => {
    const currentIndex = zones.findIndex(z => z.id === activeZone.id);
    const prevIndex = (currentIndex - 1 + zones.length) % zones.length;
    openZone(zones[prevIndex]);
  };

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

      {/* The Zones Detail Section - Interactive Map & Overlay */}
      <section id="zones" className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">The Blueprint</span>
            <h2 className="font-serif text-4xl mt-4">Spatial Intelligence</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Explore the composite floor plate. Click on the illuminated points below to view zone details and curated furnishings.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto bg-muted/5 border border-border/50 rounded-lg overflow-hidden shadow-2xl">
            {/* Interactive Floor Plan Map */}
            <div className="relative aspect-[16/9] w-full bg-[#f8f8f8]">
               <img 
                 src={buildingPlate} 
                 alt="Interactive Floor Plan" 
                 className="w-full h-full object-contain scale-110"
               />
               
               {/* Hotspots */}
               {zones.map((zone) => (
                 <motion.button
                   key={zone.id}
                   style={{ 
                     top: `${zone.y}%`, 
                     left: `${zone.x}%` 
                   }}
                   className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
                   onClick={() => openZone(zone)}
                   whileHover={{ scale: 1.2 }}
                 >
                   <div className="relative w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                     <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75" />
                     <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] border-2 border-primary/10 transition-colors group-hover:border-primary" />
                     <div className="absolute w-2 h-2 bg-primary rounded-full" />
                     
                     {/* Tooltip on Hover */}
                     <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                       <div className="bg-foreground text-background text-xs uppercase tracking-widest px-3 py-1.5 rounded shadow-lg">
                         {zone.title}
                       </div>
                       <div className="w-2 h-2 bg-foreground rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                     </div>
                   </div>
                 </motion.button>
               ))}

               {/* Hint Overlay (Fades out when engaged or logic could remove it) */}
               {!isDetailOpen && (
                 <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm border border-border px-4 py-2 rounded-full shadow-sm flex items-center gap-2 pointer-events-none animate-pulse">
                   <ZoomIn className="w-4 h-4 text-primary" />
                   <span className="text-xs font-medium uppercase tracking-wider text-foreground">Click points to explore</span>
                 </div>
               )}
            </div>

            {/* Detail Overlay (Modal-like) */}
            <AnimatePresence>
              {isDetailOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="absolute inset-0 z-30 bg-background/95 backdrop-blur-xl overflow-y-auto"
                >
                   {/* Navigation Controls */}
                   <div className="sticky top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-40 bg-background/80 backdrop-blur border-b border-border">
                     <button 
                       onClick={() => setIsDetailOpen(false)}
                       className="p-2 hover:bg-muted rounded-full transition-colors flex items-center gap-2 group"
                     >
                       <div className="bg-primary/10 p-1.5 rounded-full group-hover:bg-primary/20 transition-colors">
                         <X className="w-4 h-4 text-primary" />
                       </div>
                       <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground group-hover:text-foreground">Back to Map</span>
                     </button>
                     
                     <div className="flex items-center gap-2">
                       <button 
                         onClick={prevZone}
                         className="p-2 hover:bg-muted rounded-full transition-colors border border-border hover:border-primary/50 group"
                         title="Previous Zone"
                       >
                         <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                       </button>
                       <span className="text-xs font-mono text-muted-foreground px-2">
                         {activeZone.id.toString().padStart(2, '0')} / {zones.length.toString().padStart(2, '0')}
                       </span>
                       <button 
                         onClick={nextZone}
                         className="p-2 hover:bg-muted rounded-full transition-colors border border-border hover:border-primary/50 group"
                         title="Next Zone"
                       >
                         <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                       </button>
                     </div>
                   </div>

                   {/* Content */}
                   <div className="container mx-auto px-6 py-12 max-w-5xl">
                     <div className="grid md:grid-cols-2 gap-12 items-start">
                       {/* Left: Images */}
                       <div className="space-y-6">
                         <motion.div
                            key={activeZone.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="aspect-[4/3] bg-muted relative overflow-hidden rounded-lg shadow-lg border border-border"
                          >
                            <img 
                              src={activeZone.images[activeImageIndex]} 
                              alt={activeZone.title} 
                              className="w-full h-full object-contain p-4" 
                            />
                          </motion.div>
                          {activeZone.images.length > 1 && (
                            <div className="flex justify-center gap-2">
                              {activeZone.images.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setActiveImageIndex(idx)}
                                  className={`w-2 h-2 rounded-full transition-all ${
                                    activeImageIndex === idx ? "bg-primary w-6" : "bg-border hover:bg-primary/50"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                       </div>

                       {/* Right: Info */}
                       <div>
                         <motion.div
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           key={`text-${activeZone.id}`}
                           transition={{ delay: 0.2 }}
                         >
                           <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
                             Zone {activeZone.id}
                           </span>
                           <h3 className="text-3xl md:text-4xl mb-6 text-foreground font-light tracking-tight">{activeZone.title}</h3>
                           <p className="text-lg text-muted-foreground leading-relaxed mb-10 border-l border-primary/20 pl-6 font-light">
                             {activeZone.desc}
                           </p>

                           {/* Products Grid */}
                           {activeZone.products && activeZone.products.length > 0 && (
                             <div>
                               <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-6 flex items-center gap-2">
                                 <div className="w-4 h-px bg-border" />
                                 Curated Furnishings
                                 <div className="flex-grow h-px bg-border" />
                               </h4>
                               <div className="grid gap-4">
                                 {activeZone.products.map((product, idx) => (
                                   <div key={idx} className="group relative bg-muted/30 hover:bg-muted/60 border border-border rounded-lg p-4 transition-all flex items-start gap-4">
                                      <div className="w-20 h-20 bg-white rounded-md overflow-hidden shrink-0 border border-border">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
                                      </div>
                                      <div className="flex-grow min-w-0">
                                        <div className="flex justify-between items-start">
                                          <div>
                                            <h5 className="font-medium text-lg leading-tight mb-1">{product.name}</h5>
                                            <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.brand}</p>
                                          </div>
                                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                             {product.pdf && (
                                               <a href={product.pdf} target="_blank" title="Download Factbook" className="p-1.5 hover:bg-background rounded-full border border-transparent hover:border-border text-muted-foreground hover:text-primary transition-colors">
                                                 <Download className="w-4 h-4" />
                                               </a>
                                             )}
                                             <a href={product.url} target="_blank" title="View Product" className="p-1.5 hover:bg-background rounded-full border border-transparent hover:border-border text-muted-foreground hover:text-primary transition-colors">
                                               <ExternalLink className="w-4 h-4" />
                                             </a>
                                          </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{product.desc}</p>
                                      </div>
                                   </div>
                                 ))}
                               </div>
                             </div>
                           )}
                         </motion.div>
                       </div>
                     </div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
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
