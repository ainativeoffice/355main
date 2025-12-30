export interface WaitlistEntry {
  email: string;
  name?: string;
  company?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateWaitlistEntry(entry: WaitlistEntry): ValidationResult {
  const errors: string[] = [];
  
  if (!entry.email) {
    errors.push('Email is required');
  } else if (!validateEmail(entry.email)) {
    errors.push('Invalid email format');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
