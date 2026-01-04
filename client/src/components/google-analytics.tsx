import { useEffect } from "react";

const GA_ID = "G-2VR7386HM6";
const GTM_IDS = ["GT-TNSNWWM7", "GTM-PTRP86SV"];

export function GoogleAnalytics() {
  useEffect(() => {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    // Load all Google Tag Manager containers
    GTM_IDS.forEach((gtmId) => {
      const gtmScript = document.createElement("script");
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      document.head.appendChild(gtmScript);
    });

    // Load Google Analytics 4
    const gaScript = document.createElement("script");
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    gaScript.async = true;
    document.head.appendChild(gaScript);

    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", GA_ID);
    (window as any).gtag = gtag;
  }, []);

  return null;
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
