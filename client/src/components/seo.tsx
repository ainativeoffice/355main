import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

const BASE_URL = "https://355main.com";
const DEFAULT_TITLE = "355 Main | Sovereign Intelligence, Anchored in Armonk";
const DEFAULT_DESCRIPTION = "Three executive Sovereign Shells on the North Castle Ventures campus in Armonk, NY — Class A commercial real estate fused with on-premises AI, outfitted with Vitra.";
const DEFAULT_OG_IMAGE = "/opengraph.jpg";

export function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const updateMeta = (property: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (element) {
        element.content = content;
      }
    };

    const updateLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (element) {
        element.href = href;
      } else {
        element = document.createElement("link");
        element.rel = rel;
        element.href = href;
        document.head.appendChild(element);
      }
    };

    updateMeta("description", description);
    if (canonical) {
      const fullUrl = canonical.startsWith("http") ? canonical : `${BASE_URL}${canonical}`;
      updateMeta("og:url", fullUrl, true);
    }
    updateMeta("og:title", ogTitle || title, true);
    updateMeta("og:description", ogDescription || description, true);
    updateMeta("og:image", ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`, true);
    updateMeta("twitter:title", ogTitle || title);
    updateMeta("twitter:description", ogDescription || description);
    updateMeta("twitter:image", ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`);

    if (canonical) {
      const fullCanonical = canonical.startsWith("http") ? canonical : `${BASE_URL}${canonical}`;
      updateLink("canonical", fullCanonical);
    }
  }, [title, description, canonical, ogTitle, ogDescription, ogImage]);

  return null;
}
