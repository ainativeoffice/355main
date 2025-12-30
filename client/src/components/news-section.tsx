import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Calendar } from "lucide-react";
import { format } from "date-fns";
import type { News } from "@shared/schema";

interface NewsSectionProps {
  category?: string;
  limit?: number;
  featured?: boolean;
  title?: string;
  subtitle?: string;
}

export function NewsSection({ 
  category, 
  limit = 3,
  featured = false,
  title = "Latest Updates",
  subtitle = "News & Insights"
}: NewsSectionProps) {
  const { data: newsItems, isLoading } = useQuery<News[]>({
    queryKey: ["news", category, featured, limit],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (featured) params.append("featured", "true");
      if (limit) params.append("limit", String(limit));
      
      const response = await fetch(`/api/news?${params}`);
      if (!response.ok) throw new Error("Failed to fetch news");
      return response.json();
    }
  });

  if (isLoading || !newsItems?.length) return null;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
            {subtitle}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl">{title}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-border overflow-hidden group"
              data-testid={`card-news-${item.id}`}
            >
              {item.imageUrl && (
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  {item.publishedAt && format(new Date(item.publishedAt), "MMM d, yyyy")}
                  <span className="text-primary">•</span>
                  <span className="uppercase tracking-wider text-xs">{item.category}</span>
                </div>
                <h3 className="font-serif text-xl mb-3" data-testid={`text-news-title-${item.id}`}>
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {item.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-primary text-sm uppercase tracking-widest font-medium group-hover:gap-3 transition-all cursor-pointer">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
