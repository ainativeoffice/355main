import { useEffect } from "react";

const GTM_ID = "GT-TNSNWWM7";

export function GoogleTagManager() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    (window as any).gtag = gtag;

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`;
    script.async = true;
    
    script.onload = () => {
      gtag("js", new Date());
      gtag("config", GTM_ID);
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
