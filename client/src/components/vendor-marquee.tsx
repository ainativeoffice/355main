import { motion } from "framer-motion";

const brands = [
  { name: "Louis Poulsen", type: "serif" },
  { name: "Coronet", type: "sans" },
  { name: "Casambi", type: "sans" },
  { name: "Baso", type: "sans" },
  { name: "Mohawk Group", type: "serif" },
  { name: "Dante", type: "sans" },
  { name: "Lightpath", type: "sans" },
  { name: "Vitra", type: "serif" },
  { name: "Artek", type: "serif" },
  { name: "Paul Smith", type: "serif" },
  { name: "Lightolier", type: "sans" },
  { name: "Marset", type: "serif" },
  { name: "Ubiquiti", type: "sans" },
  { name: "Daltile", type: "serif" },
  { name: "Caesarstone", type: "serif" },
  { name: "EnOcean", type: "sans" },
  { name: "Kohler", type: "serif" },
  { name: "GE", type: "sans" },
  { name: "Honeywell", type: "sans" }
];

export function VendorMarquee() {
  return (
    <section className="py-24 bg-background border-t border-border overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">Partners</span>
        <h2 className="font-serif text-3xl md:text-4xl mt-4">Curated Excellence</h2>
      </div>
      
      <div className="relative flex overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div
          className="flex gap-16 items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 60, repeat: Infinity }}
        >
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <span 
              key={i} 
              className={`text-2xl md:text-4xl text-muted-foreground/40 hover:text-foreground transition-colors cursor-default ${
                brand.type === "serif" ? "font-serif italic" : "font-sans font-bold tracking-tighter"
              }`}
            >
              {brand.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
