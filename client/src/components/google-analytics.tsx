import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-JH8GZN03PJ";

export function GoogleAnalytics() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    (window as any).gtag = gtag;

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    
    script.onload = () => {
      gtag("js", new Date());
      gtag("config", GA_MEASUREMENT_ID);
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
