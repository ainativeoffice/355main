import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-9ZRNMHDNBZ";

export function GoogleAnalytics() {
  useEffect(() => {
    // Initialize dataLayer and gtag function first
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    (window as any).gtag = gtag;

    // Queue the initial commands before script loads
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: true,
    });

    // Load GA4 script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return null;
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
