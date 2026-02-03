// Google Analytics 4 integration for 355 Main
// Provides page view tracking and custom event tracking

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    return;
  }

  // Add Google Analytics script to the head
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag
  const script2 = document.createElement('script');
  script2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `;
  document.head.appendChild(script2);
};

// Track page views - useful for single-page applications
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return;
  
  window.gtag('config', measurementId, {
    page_path: url
  });
};

// Track custom events
export const trackEvent = (
  action: string, 
  category?: string, 
  label?: string, 
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Specific event helpers for 355 Main
export const trackWaitlistClick = () => {
  trackEvent('waitlist_click', 'engagement', 'hero_form');
};

export const trackWaitlistSubmit = (success: boolean) => {
  trackEvent('waitlist_submit', 'conversion', success ? 'success' : 'error');
};

export const trackFormSubmit = (formName: string, success: boolean) => {
  trackEvent('form_submit', 'conversion', `${formName}_${success ? 'success' : 'error'}`);
};

export const trackConversion = (conversionType: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'conversion', {
    send_to: 'AW-17910816102',
    event_category: 'conversion',
    event_label: conversionType,
  });
};
