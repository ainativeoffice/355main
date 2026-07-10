import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import ffeTyde2 from "@assets/82655552_1769278417914.jpg";
import ffeTyde2Workstation from "@assets/vitra_tyde2_workstation.jpg";
import ffeJoyn2 from "@assets/77433396_1769277628600.jpg";
import ffe04 from "@assets/Screenshot_2026-01-24_at_12.58.02_PM_1769278390647.png";
import ffeMikado from "@assets/Screenshot_2026-01-24_at_1.10.50_PM_1769278292098.png";
import ffeHal from "@assets/vitra_hal_chair.jpg";
import ffeStoolTool from "@assets/vitra_stool_tool.jpeg";
import ffeCorkFamily from "@assets/45565076_1769279202599.jpg";
import ffeSoftWorkSofa from "@assets/82707787_1769278810327.jpg";
import ffeSoftWorkTable from "@assets/stock_images/vitra_soft_work_tabl_33f184fc.jpg";
import ffeAlcove from "@assets/vitra_alcove_lowback.jpg";
import ffeMedaMorph from "@assets/vitra_medamorph_folding.jpg";
import ffeSuperFold from "@assets/49934396_1769278778313.jpg";
import ffeDancingWall from "@assets/vitra_dancing_wall.jpg";
import ffeDancingWallWhiteboard from "@assets/Screenshot_2026-01-24_at_12.51.24_PM_1769277092185.png";
import ffeRayonnageMural from "@assets/91108489_1769278521261.jpg";
import ffeFollowMe from "@assets/38291476_1769278114246.jpg";
import ffeDropBox from "@assets/72885220_1769277727148.jpg";
import ffeToolbox from "@assets/33075963_1769277790067.jpg";
import ffeHappyBin from "@assets/78181543_1769277961646.jpg";
import ffeKaariHook from "@assets/Kaari-Wall-Hook-clear-protective-varnish_WEB-1975932_1769285460467.webp";
import ffeSohoPendant from "@assets/soho_pendant_outdoor_white_112-1-1_1769278982123.jpg";
import ffeCoronetCDL3 from "@assets/CLD3_SQ_FIXED_TRIM_WHT-768x563_1769282420971.png";
import ffeCalacatta from "@assets/Screenshot_2026-01-24_at_2.23.53_PM_1769282649174.png";
import ffeSmokestone from "@assets/Screenshot_2026-01-24_at_2.32.14_PM_1769283192193.png";
import ffeIkeaNickebo from "@assets/PH192017.jpg_1769282944080.avif";
import ffeSamsungFridge from "@assets/latin-en-built-in-look-design-and-modern-design-rf18a5101sr-a_1769282148726.avif";
import ffeGEDishwasher from "@assets/730b7262198b87de4fabf133104fe8662b0ed0d3__74335_1769282266140.jpg";
import ffeRicohPrinter from "@assets/ricohimages_Equipment_Printers-and-Copiers_EQP-IM-C3010-20_1769283443463.webp";
import ffeYeegoCooler from "@assets/YG-BS24-23-2.jpg_1769288232790.webp";

interface FFEItem {
  name: string;
  brand: string;
  image: string;
  url: string;
  desc: string;
}

const ffeItems: FFEItem[] = [
  {
    name: "Tyde 2",
    brand: "Vitra",
    image: ffeTyde2,
    url: "https://www.vitra.com/en-us/product/tyde-2/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Sit-stand table designed by Ronan & Erwan Bouroullec.",
  },
  {
    name: "Tyde 2 Workstation",
    brand: "Vitra",
    image: ffeTyde2Workstation,
    url: "https://www.vitra.com/en-us/product/details/tyde-2-workstations?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Sit-stand workstation designed by Ronan & Erwan Bouroullec.",
  },
  {
    name: "Joyn 2 Touchdown",
    brand: "Vitra",
    image: ffeJoyn2,
    url: "https://www.vitra.com/en-us/product/details/joyn-2-touchdown/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Workstation system designed by Ronan & Erwan Bouroullec.",
  },
  {
    name: "Chair .04",
    brand: "Vitra",
    image: ffe04,
    url: "https://www.vitra.com/en-lp/product/04/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Designed by Maarten Van Severen with unobtrusive ergonomic comfort.",
  },
  {
    name: "Mikado Side Chair",
    brand: "Vitra",
    image: ffeMikado,
    url: "https://www.vitra.com/en-us/product/details/mikado-side-chair/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Elegant side chair by Edward Barber & Jay Osgerby.",
  },
  {
    name: "HAL RE Tube",
    brand: "Vitra",
    image: ffeHal,
    url: "https://www.vitra.com/en-us/product/details/hal-re-tube-stackable/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Sustainable chair designed by Jasper Morrison.",
  },
  {
    name: "Stool-Tool",
    brand: "Vitra",
    image: ffeStoolTool,
    url: "https://www.vitra.com/en-us/product/stool-tool/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Stackable sculpture by Konstantin Grcic.",
  },
  {
    name: "Cork Family",
    brand: "Vitra",
    image: ffeCorkFamily,
    url: "https://www.vitra.com/en-lp/product/cork-family/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Side table/stool designed by Jasper Morrison.",
  },
  {
    name: "Soft Work Sofa",
    brand: "Vitra",
    image: ffeSoftWorkSofa,
    url: "https://www.vitra.com/en-us/product/soft-work/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Lounge seating by Edward Barber & Jay Osgerby.",
  },
  {
    name: "Soft Work Table",
    brand: "Vitra",
    image: ffeSoftWorkTable,
    url: "https://www.vitra.com/en-us/product/details/soft-work-table/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Companion table by Edward Barber & Jay Osgerby.",
  },
  {
    name: "Alcove Work Lowback",
    brand: "Vitra",
    image: ffeAlcove,
    url: "https://www.vitra.com/en-us/product/alcove/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Privacy seating by Ronan & Erwan Bouroullec.",
  },
  {
    name: "MedaMorph Folding Table",
    brand: "Vitra",
    image: ffeMedaMorph,
    url: "https://www.vitra.com/en-us/product/details/medamorph-folding-table/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Folding conference table designed by Alberto Meda.",
  },
  {
    name: "Super Fold Table",
    brand: "Vitra",
    image: ffeSuperFold,
    url: "https://www.vitra.com/en-ie/product/super-fold-table/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Foldable table by Jasper Morrison.",
  },
  {
    name: "Dancing Wall",
    brand: "Vitra",
    image: ffeDancingWall,
    url: "https://www.vitra.com/en-us/product/dancing-wall/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Mobile partition by Stephan Hürlemann.",
  },
  {
    name: "Dancing Wall: Magnetic Whiteboard",
    brand: "Vitra",
    image: ffeDancingWallWhiteboard,
    url: "https://www.vitra.com/en-us/product/dancing-wall/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Magnetic whiteboard partition by Stephan Hürlemann.",
  },
  {
    name: "Rayonnage Mural",
    brand: "Vitra",
    image: ffeRayonnageMural,
    url: "https://www.vitra.com/en-lp/product/rayonnage-mural/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Wall shelving system designed by Jean Prouvé.",
  },
  {
    name: "Follow Me 1",
    brand: "Vitra",
    image: ffeFollowMe,
    url: "https://www.vitra.com/en-lp/product/details/follow-me-1/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Mobile pedestal designed by Antonio Citterio.",
  },
  {
    name: "Drop Box",
    brand: "Vitra",
    image: ffeDropBox,
    url: "https://www.vitra.com/en-lp/product/drop-box/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Storage solution designed by Konstantin Grcic.",
  },
  {
    name: "Toolbox",
    brand: "Vitra",
    image: ffeToolbox,
    url: "https://www.vitra.com/en-us/product/toolbox/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Portable organizer designed by Arik Levy.",
  },
  {
    name: "Happy Bin",
    brand: "Vitra",
    image: ffeHappyBin,
    url: "https://www.vitra.com/en-us/product/happy-bin/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Waste basket designed by Michel Charlot.",
  },
  {
    name: "Kaari Wall Hook",
    brand: "Artek",
    image: ffeKaariHook,
    url: "https://www.artek.fi/en/products/kaari-wall-hook/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Minimalist wall hook by Ronan & Erwan Bouroullec.",
  },
  {
    name: "Soho Pendant",
    brand: "Marset",
    image: ffeSohoPendant,
    url: "https://www.marset.com/usa/outdoor-lighting/pendant-light-fixtures/soho-pendant/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Industrial pendant light designed by Joan Gaspar, 2010.",
  },
  {
    name: "CDL3 Square Downlight",
    brand: "Coronet",
    image: ffeCoronetCDL3,
    url: "https://coronetled.com/cdl3-square-fixed/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Architectural square fixed downlight for ambient illumination.",
  },
  {
    name: "Calacatta Nuvo Quartz",
    brand: "Caesarstone",
    image: ffeCalacatta,
    url: "https://www.caesarstone.com/color-catalog/5131-calacatta-nuvo/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Premium quartz countertop with elegant marble-inspired veining.",
  },
  {
    name: "Smokestone Quartz Countertop",
    brand: "Caesarstone",
    image: ffeSmokestone,
    url: "https://www.caesarstone.com/color-catalog/511-smokestone/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Premium black quartz countertop with subtle veining.",
  },
  {
    name: "Nickebo Kitchen",
    brand: "IKEA",
    image: ffeIkeaNickebo,
    url: "https://www.ikea.com/us/en/rooms/kitchen/nickebo-anthracite-kitchen-guide-pub84fbdfb0/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Matte black finish and hardware throughout.",
  },
  {
    name: "French Door Smart Refrigerator",
    brand: "Samsung",
    image: ffeSamsungFridge,
    url: "https://www.samsung.com/latin_en/refrigerators/french-door/rf5000a-17-5-cu-ft-silver-rf18a5101sr-aa/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "17.5 cu. ft. Smart Refrigerator in Stainless Steel.",
  },
  {
    name: "Stainless Steel Dishwasher",
    brand: "GE Profile",
    image: ffeGEDishwasher,
    url: "https://www.geappliances.com/appliance/GE-Profile-ENERGY-STAR-18-ADA-Compliant-Stainless-Steel-Interior-Dishwasher-with-Sanitize-Cycle-PDT145SSLSS/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: 'ENERGY STAR 18" ADA Compliant Dishwasher with Sanitize Cycle.',
  },
  {
    name: '24" Beverage Cooler',
    brand: "Yeego",
    image: ffeYeegoCooler,
    url: "https://yeegolife.com/products/yeg-bs24/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Built-in beverage refrigerator with adjustable shelving.",
  },
  {
    name: "IM C3010 Multifunction Printer",
    brand: "RICOH",
    image: ffeRicohPrinter,
    url: "https://www.ricoh-usa.com/en/products/pd/equipment/printers-and-copiers/multifunction-printers-copiers/im-c3010-color-laser-multifunction-printer/?utm_source=partner_website&utm_medium=referral&utm_campaign=355main",
    desc: "Color laser multifunction printer for professional output.",
  },
];

export function FFEIndex() {
  const slug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
      {ffeItems.map((item, index) => (
        <motion.figure
          key={item.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
          data-testid={`figure-ffe-${slug(item.name)}`}
        >
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
            data-testid={`link-ffe-${slug(item.name)}`}
          >
            <div className="overflow-hidden bg-card border border-border">
              <img
                src={item.image}
                alt={`${item.brand} ${item.name}`}
                className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-annotation">
                  {String(index + 1).padStart(2, "0")} · {item.brand.toUpperCase()}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <p className="text-body-sm font-medium text-foreground mt-1">{item.name}</p>
              <p className="text-body-sm text-muted-foreground mt-0.5">{item.desc}</p>
            </figcaption>
          </a>
        </motion.figure>
      ))}
    </div>
  );
}
