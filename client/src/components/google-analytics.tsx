import { useEffect, useState } from "react";

interface AnalyticsConfig {
  gaTrackingId: string | null;
  gtmContainerId: string | null;
}

export function GoogleAnalytics() {
  const [config, setConfig] = useState<AnalyticsConfig>({ gaTrackingId: null, gtmContainerId: null });

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        setConfig({
          gaTrackingId: data.gaTrackingId || null,
          gtmContainerId: data.gtmContainerId || null,
        });
      })
      .catch(() => {});
  }, []);

  // Load Google Tag Manager (GT-TNSNWWM7)
  useEffect(() => {
    if (!config.gtmContainerId) return;

    const gtmScript = document.createElement("script");
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${config.gtmContainerId}');
    `;
    document.head.appendChild(gtmScript);

    return () => {
      document.head.removeChild(gtmScript);
    };
  }, [config.gtmContainerId]);

  // Load Google Analytics 4 (G-2VR7386HM6)
  useEffect(() => {
    if (!config.gaTrackingId) return;

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.gaTrackingId}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", config.gaTrackingId);

    (window as any).gtag = gtag;

    return () => {
      document.head.removeChild(script);
    };
  }, [config.gaTrackingId]);

  return null;
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
