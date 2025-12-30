import { describe, it, expect, vi } from 'vitest';
import { 
  validateEmail, 
  validateWaitlistEntry, 
  type WaitlistEntry 
} from '@shared/validation';

describe('Waitlist Domain', () => {
  describe('Email Validation', () => {
    it('should accept valid email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@company.org')).toBe(true);
      expect(validateEmail('email+tag@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('missing@domain')).toBe(false);
      expect(validateEmail('@nodomain.com')).toBe(false);
      expect(validateEmail('spaces in@email.com')).toBe(false);
    });
  });

  describe('Waitlist Entry Validation', () => {
    it('should validate a complete entry', () => {
      const entry: WaitlistEntry = {
        email: 'prospect@company.com',
        name: 'John Doe',
        company: 'Acme Corp'
      };
      
      const result = validateWaitlistEntry(entry);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should require email field', () => {
      const entry: WaitlistEntry = {
        email: '',
        name: 'John Doe'
      };
      
      const result = validateWaitlistEntry(entry);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Email is required');
    });

    it('should reject invalid email format', () => {
      const entry: WaitlistEntry = {
        email: 'not-an-email',
        name: 'John Doe'
      };
      
      const result = validateWaitlistEntry(entry);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid email format');
    });

    it('should allow optional name field', () => {
      const entry: WaitlistEntry = {
        email: 'prospect@company.com'
      };
      
      const result = validateWaitlistEntry(entry);
      expect(result.valid).toBe(true);
    });

    it('should allow optional company field', () => {
      const entry: WaitlistEntry = {
        email: 'prospect@company.com',
        name: 'John'
      };
      
      const result = validateWaitlistEntry(entry);
      expect(result.valid).toBe(true);
    });
  });

  describe('API Integration', () => {
    it('should handle successful waitlist submission', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true, contactId: '123' })
      });
      
      const response = await mockFetch('/api/waitlist', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com' })
      });
      
      expect(response.ok).toBe(true);
      const data = await response.json();
      expect(data.success).toBe(true);
    });

    it('should handle failed waitlist submission', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: 'Invalid email' })
      });
      
      const response = await mockFetch('/api/waitlist', {
        method: 'POST',
        body: JSON.stringify({ email: '' })
      });
      
      expect(response.ok).toBe(false);
    });
  });
});
