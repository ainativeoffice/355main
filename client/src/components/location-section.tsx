import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, UtensilsCrossed, Building2, Landmark, MapPin, Navigation } from "lucide-react";

interface Destination {
  name: string;
  distance: string;
  walkTime: string;
}

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  destinations: Destination[];
}

const categories: Category[] = [
  {
    id: "coffee",
    label: "Coffee & Cafés",
    icon: <Coffee className="w-4 h-4" />,
    destinations: [
      { name: "Tazza Café", distance: "0.2 mi", walkTime: "4 min" },
      { name: "Bluestone Lane", distance: "0.4 mi", walkTime: "8 min" },
    ],
  },
  {
    id: "dining",
    label: "Dining",
    icon: <UtensilsCrossed className="w-4 h-4" />,
    destinations: [
      { name: "Meraki Taverna", distance: "0.3 mi", walkTime: "6 min" },
      { name: "Casa Tequila", distance: "0.3 mi", walkTime: "6 min" },
      { name: "The Beehive", distance: "0.4 mi", walkTime: "8 min" },
      { name: "Moderne Barn", distance: "0.7 mi", walkTime: "14 min" },
    ],
  },
  {
    id: "services",
    label: "Services",
    icon: <Building2 className="w-4 h-4" />,
    destinations: [
      { name: "Armonk Post Office", distance: "0.2 mi", walkTime: "4 min" },
      { name: "CVS Pharmacy", distance: "0.3 mi", walkTime: "6 min" },
    ],
  },
  {
    id: "banking",
    label: "Banking",
    icon: <Landmark className="w-4 h-4" />,
    destinations: [
      { name: "Chase Bank", distance: "0.2 mi", walkTime: "4 min" },
      { name: "Bank of America", distance: "0.2 mi", walkTime: "4 min" },
      { name: "Citibank", distance: "0.3 mi", walkTime: "6 min" },
      { name: "Wells Fargo", distance: "0.4 mi", walkTime: "8 min" },
    ],
  },
];

export function LocationSection() {
  const [activeCategory, setActiveCategory] = useState("coffee");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentCategory = categories.find((c) => c.id === activeCategory);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    
    if (e.key === "ArrowRight") {
      e.preventDefault();
      newIndex = (index + 1) % categories.length;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      newIndex = (index - 1 + categories.length) % categories.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      newIndex = categories.length - 1;
    } else {
      return;
    }

    setActiveCategory(categories[newIndex]?.id ?? "coffee");
    tabRefs.current[newIndex]?.focus();
  }, []);

  return (
    <section className="py-24 bg-muted/30" id="location">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
            The Hamlet of Armonk
          </span>
          <h2 className="font-serif text-3xl md:text-5xl mb-6">
            Central, Connected, Convenient
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Set just off Main Street in the heart of Armonk, 355 Main Street
            offers a boutique office experience surrounded by cafés, shops, and
            everyday amenities—all within a short stroll.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square lg:aspect-[4/3] bg-card border border-border overflow-hidden"
            data-testid="map-container"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.7!2d-73.7142!3d41.1267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2a6e3a5b3c3d5%3A0x1234567890abcdef!2s355%20Main%20St%2C%20Armonk%2C%20NY%2010504!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="355 Main Street, Armonk Location Map"
              className="absolute inset-0"
            />
            <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm px-4 py-2 border border-border">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">355 Main Street</span>
              </div>
              <p className="text-xs text-muted-foreground">Armonk, NY 10504</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="flex flex-wrap gap-2 mb-8" 
              role="tablist"
              aria-label="Nearby destination categories"
              data-testid="category-tabs"
            >
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  ref={(el) => { tabRefs.current[index] = el; }}
                  role="tab"
                  aria-selected={activeCategory === category.id}
                  aria-controls={`tabpanel-${category.id}`}
                  id={`tab-${category.id}`}
                  tabIndex={activeCategory === category.id ? 0 : -1}
                  onClick={() => setActiveCategory(category.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm transition-all ${
                    activeCategory === category.id
                      ? "bg-foreground text-background"
                      : "bg-card border border-border hover:border-primary/50"
                  }`}
                  data-testid={`tab-${category.id}`}
                >
                  {category.icon}
                  {category.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                role="tabpanel"
                id={`tabpanel-${activeCategory}`}
                aria-labelledby={`tab-${activeCategory}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
                data-testid="destinations-list"
              >
                {currentCategory?.destinations.map((destination, index) => (
                  <motion.div
                    key={destination.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-card border border-border hover:border-primary/30 transition-colors"
                    data-testid={`destination-${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium">{destination.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        {destination.distance}
                      </span>
                      <div className="flex items-center gap-1 text-primary">
                        <Navigation className="w-3 h-3" />
                        <span className="font-medium">{destination.walkTime}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 p-6 bg-card border border-border">
              <h4 className="font-serif text-lg mb-3">Getting Here</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Direct access via I-684 and regional parkways
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Ample on-site parking for members and guests
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Steps to Main Street dining and everyday errands
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
