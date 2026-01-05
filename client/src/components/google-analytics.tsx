import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-X4FDSGSRTB";

export function GoogleAnalytics() {
  useEffect(() => {
    // Initialize dataLayer first
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    (window as any).gtag = gtag;

    // Load GA4 script first
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    
    // Call config AFTER script loads
    script.onload = () => {
      gtag("js", new Date());
      gtag("config", GA_MEASUREMENT_ID, {
        send_page_view: true,
      });
    };
    
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
