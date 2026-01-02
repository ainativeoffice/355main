import { motion } from "framer-motion";
import { ArrowDown, Wifi, Monitor, Armchair, Coffee, Layers, Settings2, Download, ExternalLink, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Sliders, Copy, CheckCheck, Building2, Users, Zap, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout";
import { useState, useRef, useCallback } from "react";
import { Link } from "wouter";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AnimatePresence } from "framer-motion";
import { getNextZoneIndex, getPrevZoneIndex, getZoneIndex } from "@shared/zones";
import { JoinWaitlistDialog } from "@/components/join-waitlist-dialog";

import heroImage from "@assets/Hero_1767222668713.png";
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
import zone8a from "@assets/zones/zone8_opt5_symposium.svg";
import zone8b from "@assets/zones/zone8_opt3_focus.svg";
import zone8c from "@assets/zones/zone8_opt4_standup.svg";
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
import ffeMyntNew from "@assets/stock_images/vitra_mynt_office_ch_a355dc34.jpg";
import ffeMikado from "@assets/stock_images/vitra_mikado_side_ch_98a71565.jpg";
import listingBrochure from "@assets/355_Main_Street_-_Listing_Brochure_Brokers_1766972457245.pdf";

const zones = [
  {
    id: 1,
    title: "Production Suite",
    desc: "A dedicated environment for high-output teams.",
    x: 39, y: 10.5,
    images: [zone1],
    products: [
      {
        name: "Joyn 2",
        brand: "Vitra",
        image: ffeJoyn2,
        url: "https://www.vitra.com/en-us/product/joyn-2",
        pdf: "/documents/joyn2.pdf",
        desc: "Adaptable office table system for teamwork and collaboration."
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
        name: "Dancing Wall",
        brand: "Vitra",
        image: ffeDancingWall,
        url: "https://www.vitra.com/en-us/product/dancing-wall",
        pdf: "/documents/dancing_wall.pdf",
        desc: "Mobile partition that can be used to divide offices into zones."
      }
    ]
  },
  {
    id: 4,
    title: "Conference Area",
    desc: "High-stakes strategy room.",
    x: 10.5, y: 41.5,
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
    x: 26.5, y: 49,
    images: [zone5a, zone5b],
    products: [
      {
        name: "Tyde 2",
        brand: "Vitra",
        image: ffeTyde2,
        url: "https://www.vitra.com/en-us/product/tyde-2",
        pdf: "/documents/tyde2.pdf",
        desc: "Height-adjustable sit-stand table system."
      },
      {
        name: "Mynt",
        brand: "Vitra",
        image: ffeMyntNew,
        url: "https://www.vitra.com/en-us/product/mynt",
        pdf: "/documents/mynt.pdf",
        desc: "An ergonomic office chair for dynamic sitting."
      },
      {
        name: "Mikado Side Chair",
        brand: "Vitra",
        image: ffeMikado,
        url: "https://www.vitra.com/en-us/product/mikado",
        pdf: "/documents/mikado.pdf",
        desc: "Elegant side chair with a flexible backrest for comfort."
      }
    ]
  },
  {
    id: 6,
    title: "Team Offices",
    desc: "Collaborative suites for small groups.",
    x: 31, y: 54.5,
    images: [zone6],
    products: [
      {
        name: "Tyde 2",
        brand: "Vitra",
        image: ffeTyde2,
        url: "https://www.vitra.com/en-us/product/tyde-2",
        pdf: "/documents/tyde2.pdf",
        desc: "Height-adjustable sit-stand table system."
      },
      {
        name: "Mynt",
        brand: "Vitra",
        image: ffeMyntNew,
        url: "https://www.vitra.com/en-us/product/mynt",
        pdf: "/documents/mynt.pdf",
        desc: "An ergonomic office chair for dynamic sitting."
      },
      {
        name: "Mikado Side Chair",
        brand: "Vitra",
        image: ffeMikado,
        url: "https://www.vitra.com/en-us/product/mikado",
        pdf: "/documents/mikado.pdf",
        desc: "Elegant side chair with a flexible backrest for comfort."
      }
    ]
  },
  {
    id: 7,
    title: "Resource Room",
    desc: "Utility and production hub.",
    x: 42, y: 50.5,
    images: [zone7],
    products: []
  },
  {
    id: 8,
    title: "Dynamic Space",
    desc: "Aggressively flexible collaborative area.",
    x: 57.5, y: 55,
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
    x: 85.5, y: 58.5,
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
    x: 48, y: 36.5,
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
    x: 36.5, y: 34,
    images: [zone11a, zone11b],
    products: []
  }
];

import { VendorMarquee } from "@/components/vendor-marquee";

export default function Home() {
  const dynamicSpaceZone = zones.find(z => z.id === 8) || zones[0]!;
  const [activeZone, setActiveZone] = useState(dynamicSpaceZone);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeBuilding, setActiveBuilding] = useState<"355" | "357">("355");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [membershipOpen, setMembershipOpen] = useState(false);
  
  // Zone Tuner - Commented out for production
  // const [showTuner, setShowTuner] = useState(false);
  // const [zoneCoords, setZoneCoords] = useState<Record<number, {x: number, y: number}>>(
  //   Object.fromEntries(zones.map(z => [z.id, { x: z.x, y: z.y }]))
  // );
  // const [copiedConfig, setCopiedConfig] = useState(false);
  // const [draggingZone, setDraggingZone] = useState<number | null>(null);
  // const floorPlanRef = useRef<HTMLDivElement>(null);

  // Zone Tuner functions - Commented out for production
  // const updateZoneCoord = (id: number, axis: 'x' | 'y', value: number) => {
  //   setZoneCoords(prev => ({
  //     ...prev,
  //     [id]: { ...prev[id], [axis]: value }
  //   }));
  // };

  // const handleDragStart = useCallback((zoneId: number, e: React.PointerEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setDraggingZone(zoneId);
  //   openZone(zones.find(z => z.id === zoneId)!);
  //   (e.target as HTMLElement).setPointerCapture(e.pointerId);
  // }, []);

  // const handleDragMove = useCallback((e: React.PointerEvent) => {
  //   if (draggingZone === null || !floorPlanRef.current) return;
  //   
  //   const rect = floorPlanRef.current.getBoundingClientRect();
  //   const x = ((e.clientX - rect.left) / rect.width) * 100;
  //   const y = ((e.clientY - rect.top) / rect.height) * 100;
  //   
  //   const clampedX = Math.max(0, Math.min(100, x));
  //   const clampedY = Math.max(0, Math.min(100, y));
  //   
  //   setZoneCoords(prev => ({
  //     ...prev,
  //     [draggingZone]: { x: Math.round(clampedX * 2) / 2, y: Math.round(clampedY * 2) / 2 }
  //   }));
  // }, [draggingZone]);

  // const handleDragEnd = useCallback(() => {
  //   setDraggingZone(null);
  // }, []);

  // const copyZoneConfig = () => {
  //   const config = zones.map(z => ({
  //     id: z.id,
  //     title: z.title,
  //     x: zoneCoords[z.id].x,
  //     y: zoneCoords[z.id].y
  //   }));
  //   navigator.clipboard.writeText(JSON.stringify(config, null, 2));
  //   setCopiedConfig(true);
  //   setTimeout(() => setCopiedConfig(false), 2000);
  // };

  // const getZoneCoord = (zone: typeof zones[0]) => zoneCoords[zone.id] || { x: zone.x, y: zone.y };
  const getZoneCoord = (zone: typeof zones[0]) => ({ x: zone.x, y: zone.y });
  
  const openZone = (zone: typeof zones[0]) => {
    setActiveZone(zone);
    setActiveImageIndex(0);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  const nextZone = () => {
    if (!activeZone) return;
    const currentIndex = getZoneIndex(zones, activeZone.id);
    const nextIndex = getNextZoneIndex(currentIndex, zones.length);
    openZone(zones[nextIndex]!);
  };

  const prevZone = () => {
    if (!activeZone) return;
    const currentIndex = getZoneIndex(zones, activeZone.id);
    const prevIndex = getPrevZoneIndex(currentIndex, zones.length);
    openZone(zones[prevIndex]!);
  };

  return (
    <Layout>
      {/* 1. Hero Section - Refined & Timeless */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Opus 355 Lantern" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
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

      {/* 2. Intro Concept - Minimalist Promise */}
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

      {/* 3. Campus Architecture Section (Moved UP) */}
      <section id="campus" className="py-24 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">The Campus</span>
            <h2 className="font-serif text-4xl mt-4">Armonk Professional Center</h2>
            <a 
              href="https://armonkprofessionalcenter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-armonk-professional-center"
            >
              armonkprofessionalcenter.com
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          
          <div className="flex justify-center mb-12">
            <div className="bg-muted p-1 rounded-full flex gap-1">
              <button 
                onClick={() => setActiveBuilding("355")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeBuilding === "355" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="button-building-355"
              >
                355 Main Street
              </button>
              <button 
                onClick={() => setActiveBuilding("357")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeBuilding === "357" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="button-building-357"
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
                loading="lazy"
              />
              <img 
                src={activeBuilding === "355" ? entranceImage : building357Interior} 
                alt="Interior/Detail" 
                className="w-full h-64 object-cover translate-y-8"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. The Zones Detail Section - Interactive Map & Overlay */}
      <section id="blueprint" className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">The Blueprint</span>
            <h2 className="font-serif text-4xl mt-4">Spatial Intelligence</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Explore the composite floor plate. Click on the illuminated points below to view zone details and curated furnishings.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto bg-muted/5 border border-border/50 rounded-lg overflow-hidden shadow-2xl">
            {/* Interactive Floor Plan Map - Scrollable on mobile for better viewing */}
            <div className="relative">
              <div className="overflow-x-auto md:overflow-x-visible scrollbar-hide flex justify-center">
                <p className="md:hidden text-xs text-muted-foreground text-center py-2 bg-muted/50 border-b border-border absolute top-0 left-0 right-0 z-10">
                  ← Swipe to explore the floor plan →
                </p>
              <div 
                className="relative aspect-[16/9] w-[150%] md:w-full bg-[#f8f8f8] border-b border-border min-w-[500px] md:min-w-0 mt-8 md:mt-0"
              >
                 <img 
                   src={buildingPlate} 
                   alt="Interactive Floor Plan" 
                   className="w-full h-full object-contain scale-110 pointer-events-none select-none"
                   loading="lazy"
                 />
               
               {/* Hotspots */}
               {zones.map((zone) => {
                 const coords = getZoneCoord(zone);
                 return (
                 <div
                   key={zone.id}
                   style={{ 
                     top: `${coords.y}%`, 
                     left: `${coords.x}%` 
                   }}
                   className="absolute -translate-x-1/2 -translate-y-1/2 group z-10 cursor-pointer"
                   onClick={(e) => {
                     e.stopPropagation();
                     openZone(zone);
                   }}
                   data-testid={`button-zone-${zone.id}`}
                 >
                   <div className={`relative w-6 h-6 md:w-8 md:h-8 flex items-center justify-center transition-all duration-300 ${activeZone.id === zone.id ? 'scale-125' : 'opacity-80 hover:opacity-100'}`}>
                     {activeZone.id === zone.id && (
                       <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75" />
                     )}
                     <div className={`absolute inset-0 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] border-2 transition-colors ${activeZone.id === zone.id ? 'bg-primary border-primary' : 'bg-white border-primary/10 group-hover:border-primary'}`} />
                     <div className={`absolute w-2 h-2 rounded-full ${activeZone.id === zone.id ? 'bg-white' : 'bg-primary'}`} />
                     
                     {/* Tooltip on Hover */}
                     <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                       <div className="bg-zinc-900 text-white text-xs px-2 py-1 rounded shadow-lg">
                         {zone.title}
                       </div>
                       <div className="w-2 h-2 bg-zinc-900 rotate-45 absolute bottom-[-4px] left-1/2 -translate-x-1/2" />
                     </div>
                   </div>
                 </div>
               );
               })}
              </div>
              </div>
            </div>

            {/* Zone Detail View (Always Visible Panel) */}
            <div className="bg-background">
               <div className="flex flex-col md:grid md:grid-cols-2">
                 {/* Left: Content & Products */}
                 <div className="p-6 md:p-12 flex flex-col h-full md:border-r border-border order-2 md:order-1">
                    <div className="mb-8">
                       <div className="flex items-center justify-between mb-4">
                         <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                           Zone {activeZone.id.toString().padStart(2, '0')}
                         </span>
                         <div className="flex gap-2">
                           <button onClick={prevZone} className="p-2 hover:bg-muted rounded-full transition-colors" data-testid="button-prev-zone">
                             <ChevronLeft className="w-4 h-4" />
                           </button>
                           <button onClick={nextZone} className="p-2 hover:bg-muted rounded-full transition-colors" data-testid="button-next-zone">
                             <ChevronRight className="w-4 h-4" />
                           </button>
                         </div>
                       </div>
                       <h3 className="font-serif text-3xl md:text-4xl mb-4">{activeZone.title}</h3>
                       <p className="text-muted-foreground text-lg leading-relaxed">{activeZone.desc}</p>
                    </div>

                    <div className="mt-auto">
                      <h4 className="text-sm uppercase tracking-widest font-semibold mb-4 text-primary">Key Components</h4>
                      {activeZone.products.length > 0 ? (
                        <div className="space-y-3">
                          {activeZone.products.map((product, idx) => (
                             <div key={idx} className="group flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                <div className="w-12 h-12 bg-white rounded border border-border overflow-hidden shrink-0">
                                   <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" loading="lazy" />
                                </div>
                                <div className="flex-1 min-w-0">
                                   <div className="flex items-baseline justify-between mb-1">
                                     <span className="font-medium truncate pr-2">{product.name}</span>
                                     <span className="text-xs text-muted-foreground whitespace-nowrap">{product.brand}</span>
                                   </div>
                                   <p className="text-xs text-muted-foreground line-clamp-1">{product.desc}</p>
                                </div>
                                <a href={product.pdf} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:text-primary" data-testid={`link-product-download-${idx}`}>
                                  <Download className="w-4 h-4" />
                                </a>
                             </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-6 border border-dashed border-border rounded-lg text-center text-muted-foreground text-sm">
                          Spec sheet available upon request.
                        </div>
                      )}
                    </div>
                 </div>

                 {/* Right: Visuals */}
                 <div className="relative h-[300px] md:h-auto min-h-[300px] bg-[#f5f5f5] overflow-hidden order-1 md:order-2">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={`${activeZone.id}-${activeImageIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, scale: zoomLevel }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 w-full h-full origin-center flex items-center justify-center p-8"
                      >
                        <img 
                            src={activeZone.images[activeImageIndex]}
                            className="w-full h-full object-contain"
                            alt={`${activeZone.title} View`}
                            loading="lazy"
                        />
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Image Navigation - Dots and swipe hint for mobile */}
                    {activeZone.images.length > 1 && (
                      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
                        <div className="flex gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
                          {activeZone.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                  setActiveImageIndex(idx);
                                  setZoomLevel(1);
                              }}
                              className={`rounded-full transition-all shadow-sm ${
                                idx === activeImageIndex 
                                  ? "bg-white w-3 h-3 md:w-2 md:h-2 md:w-4" 
                                  : "bg-white/50 hover:bg-white/80 w-2 h-2"
                              }`}
                              data-testid={`button-image-nav-${idx}`}
                            />
                          ))}
                        </div>
                        <span className="md:hidden text-[10px] text-white/80 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded">
                          {activeImageIndex + 1} / {activeZone.images.length}
                        </span>
                      </div>
                    )}

                    <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                      <button 
                        onClick={handleZoomIn}
                        className="bg-black/20 backdrop-blur-md hover:bg-black/40 text-white p-2 rounded-full transition-colors"
                        data-testid="button-zoom-in"
                      >
                         <ZoomIn className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= 0.5}
                        className={`bg-black/20 backdrop-blur-md text-white p-2 rounded-full transition-colors ${zoomLevel <= 0.5 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/40'}`}
                        data-testid="button-zoom-out"
                      >
                         <ZoomOut className="w-5 h-5" />
                      </button>
                    </div>
                 </div>
               </div>
            </div>
          </div>
          
          {/* Zone Tuner - Commented out for production
          <div className="mt-8 max-w-5xl mx-auto">
            <button
              onClick={() => setShowTuner(!showTuner)}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
            >
              <Sliders className="w-4 h-4" />
              {showTuner ? "Hide" : "Show"} Zone Tuner
            </button>
            
            {showTuner && (
              <div className="mt-4 p-6 bg-muted/50 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-sm">Zone Coordinates</h4>
                  <button
                    onClick={copyZoneConfig}
                    className="flex items-center gap-2 text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded hover:bg-primary/90 transition-colors"
                  >
                    {copiedConfig ? <CheckCheck className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedConfig ? "Copied!" : "Copy Config"}
                  </button>
                </div>
                
                <div className="grid gap-3 max-h-80 overflow-y-auto pr-2">
                  {zones.map((zone) => {
                    const coords = getZoneCoord(zone);
                    const isActive = activeZone.id === zone.id;
                    return (
                      <div 
                        key={zone.id}
                        className={`p-3 rounded border transition-colors cursor-pointer ${
                          isActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => openZone(zone)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">
                            Zone {zone.id}: {zone.title}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <label className="text-xs text-muted-foreground w-6">X:</label>
                            <input
                              type="number"
                              step="0.5"
                              value={coords.x}
                              onChange={(e) => updateZoneCoord(zone.id, 'x', parseFloat(e.target.value) || 0)}
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 bg-background border border-border rounded px-2 py-1 text-sm w-full"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="text-xs text-muted-foreground w-6">Y:</label>
                            <input
                              type="number"
                              step="0.5"
                              value={coords.y}
                              onChange={(e) => updateZoneCoord(zone.id, 'y', parseFloat(e.target.value) || 0)}
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 bg-background border border-border rounded px-2 py-1 text-sm w-full"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          */}
        </div>
      </section>

      {/* 5. Vendor Marquee - Moved Up for Impact */}
      <VendorMarquee />

      {/* 6. Philosophy / Features - Dark Mode for Contrast */}
      <section id="philosophy" className="py-24 md:py-32 bg-zinc-950 text-zinc-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold">Features</span>
              <h2 className="font-serif text-4xl md:text-5xl mt-6 mb-8 leading-tight">
                Everything you need to<br/>
                feel at home at work.
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
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
                    <div className="h-px w-8 bg-zinc-800 group-hover:bg-white transition-colors" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-zinc-950">
              <div className="bg-white p-8 aspect-square flex flex-col justify-between hover:bg-zinc-200 transition-colors cursor-default">
                <Wifi className="w-8 h-8" />
                <span className="font-serif text-xl">Fiber<br/>Wifi</span>
              </div>
              <div className="bg-white p-8 aspect-square flex flex-col justify-between hover:bg-zinc-200 transition-colors cursor-default translate-y-8">
                <Monitor className="w-8 h-8" />
                <span className="font-serif text-xl">Plug &<br/>Play</span>
              </div>
              <div className="bg-white p-8 aspect-square flex flex-col justify-between hover:bg-zinc-200 transition-colors cursor-default">
                <Armchair className="w-8 h-8" />
                <span className="font-serif text-xl">Premium<br/>Design</span>
              </div>
              <div className="bg-white p-8 aspect-square flex flex-col justify-between hover:bg-zinc-200 transition-colors cursor-default translate-y-8">
                <Coffee className="w-8 h-8" />
                <span className="font-serif text-xl">Café &<br/>Lounge</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Construction Progress - Moved Down (Reality Check) */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
           <div className="grid md:grid-cols-2 gap-12 items-center">
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="order-2 md:order-1 relative aspect-video bg-muted overflow-hidden shadow-2xl"
             >
                <img 
                  src={constructionImage} 
                  alt="Construction Progress - Flooring Prep" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 text-xs uppercase tracking-widest">
                  Live Update
                </div>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="order-1 md:order-2"
             >
               <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">In Progress</span>
               <h2 className="font-serif text-4xl mt-6 mb-6">Building in Public</h2>
               <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                 We are stripping back the layers to reveal the essential structure. 
                 The walls are primed. The subfloor is prepped. We're getting ready for you.
               </p>
               <div className="flex items-center gap-4">
                 <div className="bg-muted px-4 py-2 rounded-full text-sm font-medium border border-border">
                    Current Status: <span className="text-foreground">Flooring Installation</span>
                 </div>
               </div>
             </motion.div>
           </div>
        </div>
      </section>

      {/* 8. Solutions Overview */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Workspace Solutions</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">Find Your Perfect Space</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From dedicated private offices to flexible memberships, we offer workspace solutions designed for how you work today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card p-8 border border-border hover:border-primary/50 transition-colors group"
              data-testid="card-solution-custom"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-3">Custom Offices</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Ground-up design-build on the parcel. A bespoke workspace tailored entirely to your organization.
              </p>
              <Link 
                href="/solutions/custom-offices" 
                className="inline-flex items-center gap-2 text-primary text-sm uppercase tracking-widest font-medium group-hover:gap-3 transition-all"
                onClick={() => window.scrollTo(0, 0)}
                data-testid="link-solution-custom"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card p-8 border border-border hover:border-primary/50 transition-colors group"
              data-testid="card-solution-private"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-3">Private Offices</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Move-in ready private spaces with Vitra Tyde 2 configurations for teams of 1-15 people.
              </p>
              <Link 
                href="/solutions/private-offices" 
                className="inline-flex items-center gap-2 text-primary text-sm uppercase tracking-widest font-medium group-hover:gap-3 transition-all"
                onClick={() => window.scrollTo(0, 0)}
                data-testid="link-solution-private"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card p-8 border border-border hover:border-primary/50 transition-colors group"
              data-testid="card-solution-hybrid"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-3">Hybrid Memberships</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Flexible access to shared workspaces, private offices, and all-inclusive amenities.
              </p>
              <Link 
                href="/solutions/hybrid" 
                className="inline-flex items-center gap-2 text-primary text-sm uppercase tracking-widest font-medium group-hover:gap-3 transition-all"
                onClick={() => window.scrollTo(0, 0)}
                data-testid="link-solution-hybrid"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/solutions" 
              className="inline-flex items-center gap-2 border border-border px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-muted transition-colors"
              onClick={() => window.scrollTo(0, 0)}
              data-testid="link-view-all-solutions"
            >
              View All Solutions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Call to Action */}
      <section id="waitlist" className="py-32 bg-background text-foreground text-center px-6 border-t border-border">
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="max-w-2xl mx-auto"
         >
           <h2 className="font-serif text-4xl md:text-6xl mb-8">Ready to move in?</h2>
           <p className="text-xl text-muted-foreground mb-12">
             Become a free member to get updates, priority access, and personalized workspace recommendations. Opus 355 opens February 2026.
           </p>
           <div className="flex flex-col items-center gap-6">
             <button 
               onClick={() => setMembershipOpen(true)}
               className="bg-primary text-primary-foreground px-10 py-5 text-lg font-medium hover:bg-primary/90 transition-colors"
               data-testid="button-become-member"
             >
               Join Waitlist
             </button>
             
             <a 
               href={listingBrochure} 
               download="Opus_355_Listing_Brochure.pdf"
               className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest font-semibold border-b border-transparent hover:border-foreground pb-1"
               data-testid="link-download-brochure"
             >
               <Download className="w-4 h-4" />
               Download Brochure
             </a>
           </div>
         </motion.div>
      </section>

      <JoinWaitlistDialog open={membershipOpen} onOpenChange={setMembershipOpen} />
    </Layout>
  );
}
