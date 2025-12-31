import { useEffect, useState } from "react";

export function GoogleAnalytics() {
  const [gaId, setGaId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((config) => {
        if (config.gaTrackingId) {
          setGaId(config.gaTrackingId);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!gaId) return;

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", gaId);

    (window as any).gtag = gtag;

    return () => {
      document.head.removeChild(script);
    };
  }, [gaId]);

  return null;
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
