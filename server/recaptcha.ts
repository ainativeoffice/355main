const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const SCORE_THRESHOLD = 0.5;

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
    console.error("[reCAPTCHA] Secret key not configured — blocking submission (fail closed)");
    return { valid: false, error: "reCAPTCHA not configured" };
  }

  if (!token || token === "") {
    console.error("[reCAPTCHA] No token provided — blocking submission (fail closed)");
    return { valid: false, error: "reCAPTCHA token missing" };
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
    console.error("[reCAPTCHA] Error verifying token — blocking submission (fail closed):", error.message);
    return { valid: false, error: "reCAPTCHA verification error" };
  }
}
