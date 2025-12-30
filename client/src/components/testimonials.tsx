import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Quote } from "lucide-react";
import type { Testimonial } from "@shared/schema";

interface TestimonialsProps {
  solutionType?: string;
  featured?: boolean;
  title?: string;
  subtitle?: string;
}

export function Testimonials({ 
  solutionType, 
  featured = false,
  title = "What Our Members Say",
  subtitle = "Testimonials"
}: TestimonialsProps) {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["testimonials", solutionType, featured],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (solutionType) params.append("solutionType", solutionType);
      if (featured) params.append("featured", "true");
      
      const response = await fetch(`/api/testimonials?${params}`);
      if (!response.ok) throw new Error("Failed to fetch testimonials");
      return response.json();
    }
  });

  if (isLoading || !testimonials?.length) return null;

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
            {subtitle}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl">{title}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card p-8 border border-border"
              data-testid={`card-testimonial-${testimonial.id}`}
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-medium" data-testid={`text-testimonial-name-${testimonial.id}`}>
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.title}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
