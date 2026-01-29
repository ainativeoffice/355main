import { motion } from "framer-motion";
import { ArrowDown, Wifi, Monitor, Armchair, Coffee, Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Building2, Users, Zap, ArrowRight, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { useState, useRef, useCallback, FormEvent } from "react";
import { Link } from "wouter";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AnimatePresence } from "framer-motion";
import { getNextZoneIndex, getPrevZoneIndex, getZoneIndex } from "@shared/zones";
import { JoinWaitlistDialog } from "@/components/join-waitlist-dialog";
import { LocationSection } from "@/components/location-section";
import { trackEvent, trackWaitlistSubmit } from "@/lib/analytics";

import heroImage from "@assets/Hero_1767222668713-BGcfxWPp_1768257795221.jpg";

import constructionBefore from "@assets/construction_update.jpg";
import constructionAfter from "@assets/IMG_1298_1768259068545.jpeg";
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
import ffeAlcove from "@assets/vitra_alcove_lowback.jpg";
import ffeStoolTool from "@assets/vitra_stool_tool.jpeg";
import ffeDancingWall from "@assets/stock_images/vitra_dancing_wall_m_2c963453.jpg";
import ffeDancingWallWhiteboard from "@assets/Screenshot_2026-01-24_at_12.51.24_PM_1769277092185.png";
import ffeSoftWorkTable from "@assets/stock_images/vitra_soft_work_tabl_33f184fc.jpg";
import ffeMedaMorph from "@assets/stock_images/vitra_medamorph_conf_c497432e.jpg";
import ffeHal from "@assets/vitra_hal_chair.jpg";
import ffeMynt from "@assets/stock_images/vitra_mynt_office_ch_f0f49d65.jpg";
import ffeFauteuilDirection from "@assets/stock_images/vitra_fauteuil_direc_ad92c663.jpg";
import ffeTyde2 from "@assets/82655552_1769278417914.jpg";
import ffeJoyn2 from "@assets/77433396_1769277628600.jpg";
import ffeSuperFold from "@assets/49934396_1769278778313.jpg";
import ffeBelleville from "@assets/stock_images/vitra_belleville_tab_58774a45.jpg";
import ffe03 from "@assets/43138289_1769277874546.jpg";
import ffe04 from "@assets/Screenshot_2026-01-24_at_12.58.02_PM_1769278390647.png";
import ffeSoftWorkSeating from "@assets/82707787_1769278810327.jpg";
import ffe05 from "@assets/60153800-2_1769277576966.jpg";
import ffeFollowMe from "@assets/38291476_1769278114246.jpg";
import ffeMyntNew from "@assets/stock_images/vitra_mynt_office_ch_a355dc34.jpg";
import ffeMikado from "@assets/Screenshot_2026-01-24_at_1.10.50_PM_1769278292098.png";
import ffeSohoPendant from "@assets/soho_pendant_outdoor_white_112-1-1_1769278982123.jpg";
import ffeSamsungFridge from "@assets/latin-en-built-in-look-design-and-modern-design-rf18a5101sr-a_1769282148726.avif";
import ffeGEDishwasher from "@assets/730b7262198b87de4fabf133104fe8662b0ed0d3__74335_1769282266140.jpg";
import ffeCoronetCDL3 from "@assets/CLD3_SQ_FIXED_TRIM_WHT-768x563_1769282420971.png";
import ffeCaesarstone from "@assets/Screenshot_2026-01-24_at_2.23.53_PM_1769282649174.png";
import ffeIkeaNickebo from "@assets/PH192017.jpg_1769282944080.avif";
import ffeSmokestone from "@assets/Screenshot_2026-01-24_at_2.32.14_PM_1769283192193.png";
import ffeRicohPrinter from "@assets/ricohimages_Equipment_Printers-and-Copiers_EQP-IM-C3010-20_1769283443463.webp";
import ffeYeegoCooler from "@assets/YG-BS24-23-2.jpg_1769288232790.webp";
// New FF&E Assets
import ffeHangItAll from "@assets/stock_images/vitra_hang_it_all.jpg";
import ffeDropBox from "@assets/72885220_1769277727148.jpg";
import ffeToolbox from "@assets/33075963_1769277790067.jpg";
import ffeHappyBin from "@assets/78181543_1769277961646.jpg";
import ffeRocketStool from "@assets/stock_images/artek_rocket_stool.jpg";
import ffeKaariHook from "@assets/Kaari-Wall-Hook-clear-protective-varnish_WEB-1975932_1769285460467.webp";
import ffeRayonnageMural from "@assets/91108489_1769278521261.jpg";
import ffeChap from "@assets/stock_images/vitra_chap.jpg";
import ffeCorkFamily from "@assets/45565076_1769279202599.jpg";
import ffeTyde2Workstation from "@assets/vitra_tyde2_workstation.jpg";
import ffeDancingWallNew from "@assets/vitra_dancing_wall.jpg";
import ffeMedaMorphNew from "@assets/vitra_medamorph_folding.jpg";
import listingBrochure from "@assets/355_Main_Street_-_Listing_Brochure_Brokers_1766972457245.pdf";

const zones = [
  {
    id: 1,
    title: "Flexible Office",
    desc: "A hybrid engine for high-stakes work. We configured this room to break the mold of the static boardroom. By pairing lightweight touchdown tables with the ergonomic flexibility of the .04 chair, we created a space that pivots instantly. Use it as a polished conference room for client presentations in the morning, or claim it as a dedicated 'war room' for your team to sprint on a project for the rest of the week.",
    x: 39, y: 10.5,
    images: [zone1],
    products: [
      {
        name: "Joyn 2 Touchdown",
        brand: "Vitra",
        image: ffeJoyn2,
        url: "https://www.vitra.com/en-us/product/details/joyn-2-touchdown/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/joyn2.pdf",
        desc: "Workstation system designed by Ronan & Erwan Bouroullec."
      },
      {
        name: "Chair .04",
        brand: "Vitra",
        image: ffe04,
        url: "https://www.vitra.com/en-lp/product/04/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/04_chair.pdf",
        desc: "Designed by Maarten Van Severen with unobtrusive ergonomic comfort."
      },

      {
        name: "Dancing Wall: Magnetic Whiteboard",
        brand: "Vitra",
        image: ffeDancingWallWhiteboard,
        url: "https://www.vitra.com/en-us/product/dancing-wall/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/dancing_wall.pdf",
        desc: "Magnetic whiteboard partition by Stephan Hürlemann."
      },
      {
        name: "Drop Box",
        brand: "Vitra",
        image: ffeDropBox,
        url: "https://www.vitra.com/en-lp/product/drop-box/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        desc: "Storage solution designed by Konstantin Grcic."
      },
      {
        name: "Toolbox",
        brand: "Vitra",
        image: ffeToolbox,
        url: "https://www.vitra.com/en-us/product/toolbox/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        desc: "Portable organizer designed by Arik Levy."
      },
      {
        name: "Happy Bin Large",
        brand: "Vitra",
        image: ffeHappyBin,
        url: "https://www.vitra.com/en-us/product/happy-bin/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        desc: "Waste basket designed by Michel Charlot."
      }
    ]
  },
  {
    id: 4,
    title: "Customizable Office",
    desc: "A flexible canvas, waiting for your signature. We labeled this a conference room, but it is engineered as a customizable office. Anchored by a touchdown table and connected to an adjoining space via French doors, this zone is ready to evolve into a private huddle room or an executive lounge based on your specifications. With independent HVAC control and soaring vaulted ceilings, the infrastructure is already in place for a bespoke workspace tailored to you.",
    x: 10.5, y: 41.5,
    images: [zone4],
    products: [
      {
        name: "Joyn 2 Touchdown",
        brand: "Vitra",
        image: ffeJoyn2,
        url: "https://www.vitra.com/en-us/product/details/joyn-2-touchdown/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/joyn2.pdf",
        desc: "Workstation system designed by Ronan & Erwan Bouroullec."
      },
      {
        name: "Chair .04",
        brand: "Vitra",
        image: ffe04,
        url: "https://www.vitra.com/en-lp/product/04/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/04_chair.pdf",
        desc: "Designed by Maarten Van Severen with unobtrusive ergonomic comfort."
      },

      {
        name: "Dancing Wall: Magnetic Whiteboard",
        brand: "Vitra",
        image: ffeDancingWallWhiteboard,
        url: "https://www.vitra.com/en-us/product/dancing-wall/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/dancing_wall.pdf",
        desc: "Magnetic whiteboard partition by Stephan Hürlemann."
      },
      {
        name: "Drop Box",
        brand: "Vitra",
        image: ffeDropBox,
        url: "https://www.vitra.com/en-lp/product/drop-box/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        desc: "Storage solution designed by Konstantin Grcic."
      },
      {
        name: "Toolbox",
        brand: "Vitra",
        image: ffeToolbox,
        url: "https://www.vitra.com/en-us/product/toolbox/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        desc: "Portable organizer designed by Arik Levy."
      },
      {
        name: "Happy Bin Large",
        brand: "Vitra",
        image: ffeHappyBin,
        url: "https://www.vitra.com/en-us/product/happy-bin/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        desc: "Waste basket designed by Michel Charlot."
      }
    ]
  },
  {
    id: 5,
    title: "Private Office",
    desc: "Engineered against static fatigue. We believe that to keep your mind moving, your body needs to move too. That is the logic behind our selection of the Mynt and Mikado chairs. Whether it's the Mynt's weight-activated infinite posture or the Mikado's subtle rocking mechanism, these seats intuitively encourage micro-movements to keep you energized. Paired with electrified tabletops and ready-to-mount monitor arms, this workstation is a complete performance system designed to sustain focus for the long haul.",
    x: 26.5, y: 49,
    images: [zone5a, zone5b],
    products: [
      {
        name: "Tyde 2",
        brand: "Vitra",
        image: ffeTyde2,
        url: "https://www.vitra.com/en-us/product/tyde-2/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/tyde2.pdf",
        desc: "Sit-stand table designed by Ronan & Erwan Bouroullec."
      },
      {
        name: "Mikado Side Chair",
        brand: "Vitra",
        image: ffeMikado,
        url: "https://www.vitra.com/en-us/product/details/mikado-side-chair/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/mikado.pdf",
        desc: "Elegant side chair by Edward Barber & Jay Osgerby."
      },
      {
        name: "Follow Me 1",
        brand: "Vitra",
        image: ffeFollowMe,
        url: "https://www.vitra.com/en-lp/product/details/follow-me-1/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/follow_me.pdf",
        desc: "Mobile pedestal designed by Antonio Citterio."
      },
      {
        name: "Happy Bin Small",
        brand: "Vitra",
        image: ffeHappyBin,
        url: "https://www.vitra.com/en-us/product/happy-bin/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        desc: "Waste basket designed by Michel Charlot."
      }
    ]
  },
  {
    id: 6,
    title: "Team Offices",
    desc: "A command center for synchronized leadership. We designed this room for managers who need to co-pilot projects. By utilizing the Tyde 2 system, we created a self-contained suite: two sit-stand workstations for deep individual focus, and a third dedicated table for collaboration. Anchored by Mikado side chairs, this internal meeting zone allows you to pivot instantly from 'heads-down' production to 'heads-up' strategy sessions without ever leaving your office.",
    x: 31, y: 54.5,
    images: [zone6],
    products: [
      {
        name: "Tyde 2 Workstation",
        brand: "Vitra",
        image: ffeTyde2Workstation,
        url: "https://www.vitra.com/en-us/product/details/tyde-2-workstations?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/tyde2.pdf",
        desc: "Sit-stand workstation designed by Ronan & Erwan Bouroullec."
      },
      {
        name: "Mikado Side Chair",
        brand: "Vitra",
        image: ffeMikado,
        url: "https://www.vitra.com/en-us/product/details/mikado-side-chair/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/mikado.pdf",
        desc: "Elegant side chair by Edward Barber & Jay Osgerby."
      },
      {
        name: "Rayonnage Mural",
        brand: "Vitra",
        image: ffeRayonnageMural,
        url: "https://www.vitra.com/en-lp/product/rayonnage-mural/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/rayonnage_mural.pdf",
        desc: "Wall shelving system designed by Jean Prouvé."
      },
      {
        name: "Kaari Wall Hook",
        brand: "Artek",
        image: ffeKaariHook,
        url: "https://www.artek.fi/en/products/kaari-wall-hook/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/kaari_collection.pdf",
        desc: "Minimalist wall hook by Ronan & Erwan Bouroullec."
      }
    ]
  },
  {
    id: 7,
    title: "Resource Room",
    desc: "Utility, elevated to the same standard. We believe the back-of-house should feel as premium as the front-of-house. We carried the matte black IKEA cabinetry and durable Black Caesarstone through to this room to maintain visual continuity with the café. It's a durable, high-contrast environment designed to handle the wear of daily production while looking sharp enough to leave the door open.",
    x: 42, y: 50.5,
    images: [zone7],
    products: [
      {
        name: "Nickebo Kitchen",
        brand: "IKEA",
        image: ffeIkeaNickebo,
        url: "https://www.ikea.com/us/en/rooms/kitchen/nickebo-anthracite-kitchen-guide-pub84fbdfb0/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        desc: "Matte black finish and hardware throughout."
      },
      {
        name: "Smokestone Quartz Countertop",
        brand: "Caesarstone",
        image: ffeSmokestone,
        url: "https://www.caesarstone.com/color-catalog/511-smokestone/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        desc: "Premium black quartz countertop with subtle veining."
      },
      {
        name: "IM C3010 Multifunction Printer",
        brand: "RICOH",
        image: ffeRicohPrinter,
        url: "https://www.ricoh-usa.com/en/products/pd/equipment/printers-and-copiers/multifunction-printers-copiers/im-c3010-color-laser-multifunction-printer/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        desc: "Color laser multifunction printer for professional output."
      }
    ]
  },
  {
    id: 8,
    title: "Dynamic Space",
    desc: "Because business moves fast, and your space should too. We designed this zone for ultimate fluidity—eliminating the friction between tasks. Seamlessly transition from intimate Stand-Ups and Focus Areas to full-scale Town Halls or Symposiums in minutes, empowering your team to work exactly how they need to, the moment they need to.",
    x: 57.5, y: 55,
    images: [zone8a, zone8b, zone8c, zone8d],
    products: [
      {
        name: "Dancing Wall",
        brand: "Vitra",
        image: ffeDancingWallNew,
        url: "https://www.vitra.com/en-us/product/dancing-wall/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/dancing_wall.pdf",
        desc: "Mobile partition by Stephan Hürlemann."
      },
      {
        name: "Stool-Tool",
        brand: "Vitra",
        image: ffeStoolTool,
        url: "https://www.vitra.com/en-us/product/stool-tool/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/stool_tool.pdf",
        desc: "Stackable sculpture by Konstantin Grcic."
      },
      {
        name: "MedaMorph Folding Table",
        brand: "Vitra",
        image: ffeMedaMorphNew,
        url: "https://www.vitra.com/en-us/product/details/medamorph-folding-table/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/medamorph.pdf",
        desc: "Folding conference table designed by Alberto Meda."
      },
      {
        name: "Alcove Work Lowback",
        brand: "Vitra",
        image: ffeAlcove,
        url: "https://www.vitra.com/en-us/product/alcove/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/alcove.pdf",
        desc: "Privacy seating by Ronan & Erwan Bouroullec."
      },
      {
        name: "HAL RE Tube",
        brand: "Vitra",
        image: ffeHal,
        url: "https://www.vitra.com/en-us/product/details/hal-re-tube-stackable/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/hal_chair.pdf",
        desc: "Sustainable chair designed by Jasper Morrison."
      }
    ]
  },
  {
    id: 9,
    title: "Break Room",
    desc: "The functional engine, behind the scenes. We separated this 'Back-of-House' break room to keep your client-facing areas pristine. While the café is for connection, this zone is for utility—a fully equipped, private kitchen where teams can prepare meals and unwind 'off-stage.' It ensures that lunch prep and lively downtime happen here, so the rest of the office remains polished and distraction-free.",
    x: 85.5, y: 58.5,
    images: [zone9a, zone9b],
    products: [
      {
        name: "Samsung French Door Smart Refrigerator",
        brand: "Samsung",
        image: ffeSamsungFridge,
        url: "https://www.samsung.com/latin_en/refrigerators/french-door/rf5000a-17-5-cu-ft-silver-rf18a5101sr-aa/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        desc: "17.5 cu. ft. Smart Refrigerator in Stainless Steel."
      },
      {
        name: "GE Stainless Steel Dishwasher",
        brand: "GE Profile",
        image: ffeGEDishwasher,
        url: "https://www.geappliances.com/appliance/GE-Profile-ENERGY-STAR-18-ADA-Compliant-Stainless-Steel-Interior-Dishwasher-with-Sanitize-Cycle-PDT145SSLSS/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        desc: "ENERGY STAR 18\" ADA Compliant Dishwasher with Sanitize Cycle."
      },
      {
        name: "CDL3 Square Downlight",
        brand: "Coronet",
        image: ffeCoronetCDL3,
        url: "https://coronetled.com/cdl3-square-fixed/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        desc: "Architectural square fixed downlight for ambient illumination."
      },
      {
        name: "Calacatta Nuvo Quartz",
        brand: "Caesarstone",
        image: ffeCaesarstone,
        url: "https://www.caesarstone.com/color-catalog/5131-calacatta-nuvo/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        desc: "Premium quartz countertop with elegant marble-inspired veining."
      },
      {
        name: "Nickebo Kitchen",
        brand: "IKEA",
        image: ffeIkeaNickebo,
        url: "https://www.ikea.com/us/en/rooms/kitchen/nickebo-anthracite-kitchen-guide-pub84fbdfb0/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        desc: "Matte black finish and hardware throughout."
      }
    ]
  },
  {
    id: 10,
    title: "Shared Café",
    desc: "Front-of-house polish, back-of-house comfort. We selected this setting to bridge the gap between a client lounge and a kitchen. The matte black cabinetry and white quartz countertops set a refined tone, while the tech-enabled banquettes provide the modern utility of a workstation. It's a deliberate design choice: a space casual enough for an espresso break, but sophisticated enough to host an impromptu meeting.",
    x: 48, y: 36.5,
    images: [zone10a, zone10b, zone10c],
    products: [
      {
        name: "Soft Work Sofa",
        brand: "Vitra",
        image: ffeSoftWorkSeating,
        url: "https://www.vitra.com/en-us/product/soft-work/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/soft_work_seating.pdf",
        desc: "Lounge seating by Edward Barber & Jay Osgerby."
      },
      {
        name: "HAL RE Tube",
        brand: "Vitra",
        image: ffeHal,
        url: "https://www.vitra.com/en-us/product/details/hal-re-tube-stackable/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/hal_chair.pdf",
        desc: "Sustainable chair designed by Jasper Morrison."
      },
      {
        name: "Super Fold Table",
        brand: "Vitra",
        image: ffeSuperFold,
        url: "https://www.vitra.com/en-ie/product/super-fold-table/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/super_fold_table.pdf",
        desc: "Foldable table by Jasper Morrison."
      },
      {
        name: "Calacatta Nuvo Quartz",
        brand: "Caesarstone",
        image: ffeCaesarstone,
        url: "https://www.caesarstone.com/color-catalog/5131-calacatta-nuvo/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        desc: "Premium quartz countertop with elegant marble-inspired veining."
      },
      {
        name: "Nickebo Kitchen",
        brand: "IKEA",
        image: ffeIkeaNickebo,
        url: "https://www.ikea.com/us/en/rooms/kitchen/nickebo-anthracite-kitchen-guide-pub84fbdfb0/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        desc: "Matte black finish and hardware throughout."
      },
      {
        name: "24\" Beverage Cooler",
        brand: "Yeego",
        image: ffeYeegoCooler,
        url: "https://yeegolife.com/products/yeg-bs24/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        desc: "Built-in beverage refrigerator with adjustable shelving."
      }
    ]
  },
  {
    id: 11,
    title: "Semi-Private Conference",
    desc: "Preserving the curve, redefining the function. We honored the suite's history by keeping Vatche Simonian's signature curved architecture intact. To modernize it, we selected curved, electrified Soft Work sofas that mirror the room's geometry. The open-beam ceiling creates a 'semi-private' acoustic environment—perfect for 'quiet company,' where you can focus individually or hold casual meetings that don't require the secrecy of a closed door.",
    x: 36.5, y: 34,
    images: [zone11a, zone11b],
    products: [
      {
        name: "Soft Work Sofa",
        brand: "Vitra",
        image: ffeSoftWorkSeating,
        url: "https://www.vitra.com/en-us/product/soft-work/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/soft_work_seating.pdf",
        desc: "Lounge seating by Edward Barber & Jay Osgerby."
      },
      {
        name: "Soft Work Table",
        brand: "Vitra",
        image: ffeSoftWorkTable,
        url: "https://www.vitra.com/en-us/product/details/soft-work-table/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/soft_work_table.pdf",
        desc: "Companion table by Edward Barber & Jay Osgerby."
      },
      {
        name: "Cork Family",
        brand: "Vitra",
        image: ffeCorkFamily,
        url: "https://www.vitra.com/en-lp/product/cork-family/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/cork_family.pdf",
        desc: "Side table/stool designed by Jasper Morrison."
      },
      {
        name: "Dancing Wall",
        brand: "Vitra",
        image: ffeDancingWallNew,
        url: "https://www.vitra.com/en-us/product/dancing-wall/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/dancing_wall.pdf",
        desc: "Magnetic whiteboard partition by Stephan Hürlemann."
      },
      {
        name: "Soho Pendant",
        brand: "Marset",
        image: ffeSohoPendant,
        url: "https://www.marset.com/usa/outdoor-lighting/pendant-light-fixtures/soho-pendant/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
        pdf: "/documents/soho_pendant.pdf",
        desc: "Industrial pendant light designed by Joan Gaspar, 2010."
      }
    ]
  }
];

import { VendorMarquee } from "@/components/vendor-marquee";

export default function Home() {
  const dynamicSpaceZone = zones.find(z => z.id === 8) || zones[0]!;
  const [activeZone, setActiveZone] = useState(dynamicSpaceZone);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [membershipOpen, setMembershipOpen] = useState(false);
  
  // Inline email capture state
  const [heroEmail, setHeroEmail] = useState("");
  const [heroEmailStatus, setHeroEmailStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [heroEmailMessage, setHeroEmailMessage] = useState("");

  const handleHeroEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!heroEmail || heroEmailStatus === "loading") return;
    
    // Track form submission attempt
    trackEvent('waitlist_form_submit', 'engagement', 'hero_email_form');
    
    setHeroEmailStatus("loading");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: heroEmail, brandSource: "355main" }),
      });
      const data = await response.json();
      
      if (data.success) {
        setHeroEmailStatus("success");
        setHeroEmailMessage("We'll be in touch soon.");
        setHeroEmail("");
        // Track successful submission
        trackWaitlistSubmit(true);
      } else {
        setHeroEmailStatus("error");
        setHeroEmailMessage(data.message || "Please try again.");
        trackWaitlistSubmit(false);
      }
    } catch {
      setHeroEmailStatus("error");
      setHeroEmailMessage("Something went wrong. Please try again.");
      trackWaitlistSubmit(false);
    }
  };
  
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
      <SEO 
        title="355 Main | The Destination Workplace"
        description="The office people want to go to. Workspace solutions that adapt to how you work—private offices, flex memberships, and custom suites in Armonk, NY."
        canonical="/" 
      />
      {/* 1. Hero Section - Refined & Timeless */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="355 Main Lantern" 
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
            The Destination<br />Workplace
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Your Manhattan office, five minutes from home.<br className="hidden sm:inline" /> Limited founding memberships available.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10"
          >
            {heroEmailStatus === "success" ? (
              <div className="text-white/90 text-lg">
                <span className="font-medium">Thank you.</span> {heroEmailMessage}
              </div>
            ) : (
              <>
                <form onSubmit={handleHeroEmailSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-lg mx-auto">
                  <input
                    type="email"
                    value={heroEmail}
                    onChange={(e) => setHeroEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={heroEmailStatus === "loading"}
                    className="w-full sm:flex-1 px-6 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all text-base"
                    data-testid="input-hero-email"
                  />
                  <button
                    type="submit"
                    disabled={heroEmailStatus === "loading"}
                    className="w-full sm:w-auto px-10 py-4 bg-white text-foreground font-semibold tracking-wide hover:bg-white/95 transition-all disabled:opacity-50 text-base"
                    data-testid="button-hero-submit"
                  >
                    {heroEmailStatus === "loading" ? "..." : "Request Access"}
                  </button>
                </form>
                <p className="mt-4 text-white/50 text-sm tracking-wide">Curated for privacy and productivity.</p>
              </>
            )}
            {heroEmailStatus === "error" && (
              <p className="mt-3 text-red-300 text-sm">{heroEmailMessage}</p>
            )}
          </motion.div>
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
              355 Main is designed for professionals who want more than four walls and a door. 
              Here, you get a beautifully curated, move-in ready space in a boutique campus setting.
            </p>
            <p>
              It feels less like a traditional office, and more like a private club for getting your 
              best work, relationships, and ideas off the ground.
            </p>
          </motion.div>
        </div>
      </section>
      {/* 3. Construction Progress */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
           <div className="grid md:grid-cols-2 gap-12 items-center">
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="order-2 md:order-1 relative bg-muted overflow-hidden shadow-2xl"
             >
                <img 
                  src={constructionAfter} 
                  alt="355 Main construction progress - January 2025" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
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
                 Luxury vinyl flooring is now installed, track lighting operational, and wood doors in place. We're getting ready for you.
               </p>
               <div className="flex items-center gap-4">
                 <div className="bg-muted px-4 py-2 rounded-full text-sm font-medium border border-border">
                    Current Status: <span className="text-foreground">Flooring Complete</span>
                 </div>
               </div>
             </motion.div>
           </div>
        </div>
      </section>
      {/* 4. Solutions Overview */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Workspace Solutions</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">Find Your Perfect Space</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From dedicated private offices to flexible memberships, we offer workspace solutions that adapt to how you work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card p-8 border border-border hover:border-primary/50 transition-colors group flex flex-col h-full"
              data-testid="card-solution-private"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-3">Private Offices</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                Move-in ready private spaces featuring Vitra Tyde 2 configurations for teams of 1-8 people.
              </p>
              <Link 
                href="/solutions/private-offices" 
                className="inline-flex items-center gap-2 text-primary text-sm uppercase tracking-widest font-medium group-hover:gap-3 transition-all mt-auto"
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
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card p-8 border border-border hover:border-primary/50 transition-colors group flex flex-col h-full"
              data-testid="card-solution-flex"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-3">Flex Membership</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                Flexible access to shared workspaces, private offices, and all-inclusive amenities for hybrid workers and distributed teams.
              </p>
              <Link 
                href="/solutions/hybrid" 
                className="inline-flex items-center gap-2 text-primary text-sm uppercase tracking-widest font-medium group-hover:gap-3 transition-all mt-auto"
                onClick={() => window.scrollTo(0, 0)}
                data-testid="link-solution-flex"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card p-8 border border-border hover:border-primary/50 transition-colors group flex flex-col h-full"
              data-testid="card-solution-custom"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-3">Custom Suites</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                Bespoke workspace tailored to your organization—available through 355 Main, 357 Main, or new leases.
              </p>
              <Link 
                href="/solutions/custom-offices" 
                className="inline-flex items-center gap-2 text-primary text-sm uppercase tracking-widest font-medium group-hover:gap-3 transition-all mt-auto"
                onClick={() => window.scrollTo(0, 0)}
                data-testid="link-solution-custom"
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

      {/* 5. The Blueprint - Interactive Map & Overlay */}
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
                    <div className="mb-6">
                       <div className="flex items-center justify-between mb-3">
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
                       <h3 className="font-serif text-2xl md:text-3xl mb-3">{activeZone.title}</h3>
                       <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{activeZone.desc}</p>
                    </div>

                    <div className="mt-auto">
                      <h4 className="text-sm uppercase tracking-widest font-semibold mb-4 text-primary">Key Components</h4>
                      {activeZone.products.length > 0 ? (
                        <div className="space-y-2 md:space-y-3">
                          {activeZone.products.map((product, idx) => (
                             <a 
                               key={idx} 
                               href={product.url} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="group flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-lg hover:bg-muted/50 transition-colors"
                               data-testid={`link-product-${idx}`}
                             >
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded border border-border overflow-hidden shrink-0">
                                   <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" loading="lazy" />
                                </div>
                                <div className="flex-1 min-w-0">
                                   <div className="flex items-center gap-2 mb-0.5 md:mb-1">
                                     <span className="font-medium text-sm md:text-base truncate">{product.name}</span>
                                     <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                                   </div>
                                   <p className="text-xs text-muted-foreground line-clamp-1">{product.desc}</p>
                                </div>
                                <span className="text-xs text-muted-foreground whitespace-nowrap hidden md:block">{product.brand}</span>
                                {product.pdf && (
                                  <button 
                                    type="button"
                                    aria-label={`Download ${product.name} spec sheet`}
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(product.pdf, '_blank'); }}
                                    className="hidden md:flex opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100 transition-opacity p-2 hover:text-primary focus:text-primary focus:outline-none rounded" 
                                    data-testid={`link-product-download-${idx}`}
                                  >
                                    <Download className="w-4 h-4" />
                                  </button>
                                )}
                             </a>
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
                        className="absolute inset-0 w-full h-full origin-center flex items-center justify-center p-4"
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

      {/* 6. Vendor Marquee */}
      <VendorMarquee />

      {/* 7. Features */}
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


      {/* 8. Location */}
      <LocationSection />

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
             Become a free member to get updates, priority access, and personalized workspace recommendations. 355 Main opens February 2026.
           </p>
           <div className="flex flex-col items-center gap-6">
             <button 
               onClick={() => {
                 trackEvent('join_waitlist_click', 'engagement', 'cta_section');
                 setMembershipOpen(true);
               }}
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
