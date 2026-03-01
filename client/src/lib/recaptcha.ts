const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

let recaptchaLoaded = false;
let loadPromise: Promise<void> | null = null;

export function loadRecaptcha(): Promise<void> {
  if (recaptchaLoaded && window.grecaptcha) return Promise.resolve();
  if (loadPromise) return loadPromise;
  
  loadPromise = new Promise((resolve, reject) => {
    if (window.grecaptcha) {
      recaptchaLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      recaptchaLoaded = true;
      resolve();
    };
    script.onerror = () => {
      loadPromise = null;
      reject(new Error("Failed to load reCAPTCHA"));
    };
    document.head.appendChild(script);
  });
  
  return loadPromise;
}

export async function getRecaptchaToken(action: string): Promise<string> {
  try {
    await loadRecaptcha();
    
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("reCAPTCHA timeout"));
      }, 10000);
      
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
          clearTimeout(timeout);
          resolve(token);
        } catch (error) {
          clearTimeout(timeout);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error("[reCAPTCHA] Failed to get token:", error);
    return "";
  }
}
