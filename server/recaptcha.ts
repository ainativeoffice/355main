const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const SCORE_THRESHOLD = 0.5;

const SOFT_FAIL_ERRORS = [
  "browser-error",
  "timeout-or-duplicate",
];

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

export async function verifyRecaptcha(token: string, expectedAction: string): Promise<{ valid: boolean; score?: number; error?: string }> {
  if (!RECAPTCHA_SECRET_KEY) {
    console.log("[reCAPTCHA] Secret key not configured, skipping verification");
    return { valid: true };
  }

  if (!token || token === "") {
    console.log("[reCAPTCHA] No token provided, allowing submission (soft-fail mode)");
    return { valid: true };
  }

  try {
    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    });

    const data: RecaptchaResponse = await response.json();
    
    if (!data.success) {
      const errors = data["error-codes"] || [];
      const isSoftFailError = errors.some(err => SOFT_FAIL_ERRORS.includes(err));
      
      if (isSoftFailError) {
        console.log(`[reCAPTCHA] Soft-fail error (${errors.join(", ")}), allowing submission`);
        return { valid: true };
      }
      
      console.error("[reCAPTCHA] Verification failed:", errors);
      return { valid: false, error: "reCAPTCHA verification failed" };
    }

    if (data.action !== expectedAction) {
      console.error(`[reCAPTCHA] Action mismatch: expected ${expectedAction}, got ${data.action}`);
      return { valid: false, error: "reCAPTCHA action mismatch" };
    }

    if (data.score !== undefined && data.score < SCORE_THRESHOLD) {
      console.log(`[reCAPTCHA] Low score (${data.score}) for action ${expectedAction} - BLOCKED`);
      return { valid: false, score: data.score, error: "Suspicious activity detected" };
    }

    console.log(`[reCAPTCHA] Verified: action=${data.action}, score=${data.score}`);
    return { valid: true, score: data.score };
  } catch (error: any) {
    console.error("[reCAPTCHA] Error verifying token:", error.message);
    return { valid: true };
  }
}
