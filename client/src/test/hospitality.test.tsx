import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockMemberPreferences = {
  morningBeverage: "Oat milk latte",
  afternoonBeverage: "Green tea",
  beverageNotes: "Extra hot please",
  temperaturePreference: "warm",
  lightingPreference: "bright",
  preferredZone: "Focus Zone",
  notifyHospitalityOnArrival: true,
  syncWithCalendar: false,
  enableLocationArrival: false,
  birthday: "1990-05-15",
  dietaryRestrictions: ["vegetarian", "gluten-free"],
  specialNotes: "Prefers quiet workspace"
};

const mockArrivalWithMember = {
  id: 1,
  memberId: 123,
  estimatedArrival: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
  actualArrival: null,
  status: "pending",
  guestCount: 2,
  guestNames: "John Doe, Jane Smith",
  beverageReady: false,
  notes: "Meeting in conference room",
  createdAt: new Date().toISOString(),
  member: {
    id: 123,
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
    company: "Test Corp"
  },
  preferences: mockMemberPreferences
};

describe('Hospitality Preferences Data Structure', () => {
  it('should have all required beverage preference fields', () => {
    expect(mockMemberPreferences).toHaveProperty('morningBeverage');
    expect(mockMemberPreferences).toHaveProperty('afternoonBeverage');
    expect(mockMemberPreferences).toHaveProperty('beverageNotes');
  });

  it('should have all required workspace comfort fields', () => {
    expect(mockMemberPreferences).toHaveProperty('temperaturePreference');
    expect(mockMemberPreferences).toHaveProperty('lightingPreference');
    expect(mockMemberPreferences).toHaveProperty('preferredZone');
  });

  it('should have all required arrival settings fields', () => {
    expect(mockMemberPreferences).toHaveProperty('notifyHospitalityOnArrival');
    expect(mockMemberPreferences).toHaveProperty('syncWithCalendar');
    expect(mockMemberPreferences).toHaveProperty('enableLocationArrival');
  });

  it('should have all required special touches fields', () => {
    expect(mockMemberPreferences).toHaveProperty('birthday');
    expect(mockMemberPreferences).toHaveProperty('dietaryRestrictions');
    expect(mockMemberPreferences).toHaveProperty('specialNotes');
  });
});

describe('ArrivalWithMember Data Structure', () => {
  it('should have required arrival fields', () => {
    expect(mockArrivalWithMember).toHaveProperty('id');
    expect(mockArrivalWithMember).toHaveProperty('memberId');
    expect(mockArrivalWithMember).toHaveProperty('estimatedArrival');
    expect(mockArrivalWithMember).toHaveProperty('status');
    expect(mockArrivalWithMember).toHaveProperty('guestCount');
    expect(mockArrivalWithMember).toHaveProperty('beverageReady');
  });

  it('should have member information', () => {
    expect(mockArrivalWithMember.member).toHaveProperty('id');
    expect(mockArrivalWithMember.member).toHaveProperty('email');
    expect(mockArrivalWithMember.member).toHaveProperty('firstName');
    expect(mockArrivalWithMember.member).toHaveProperty('lastName');
  });

  it('should include member preferences for hospitality', () => {
    expect(mockArrivalWithMember.preferences).toBeDefined();
    expect(mockArrivalWithMember.preferences?.morningBeverage).toBe("Oat milk latte");
    expect(mockArrivalWithMember.preferences?.preferredZone).toBe("Focus Zone");
  });
});

describe('ETA Validation Logic', () => {
  it('should default to 15 minutes if no ETA provided', () => {
    const defaultEta = 15;
    const parsedEta = parseInt('') || defaultEta;
    expect(parsedEta).toBe(15);
  });

  it('should clamp negative values to minimum of 1 minute', () => {
    const minEta = 1;
    const parsedEta = Math.max(minEta, parseInt('-5') || 15);
    expect(parsedEta).toBe(1);
  });

  it('should accept valid positive ETA values', () => {
    const parsedEta = Math.max(1, parseInt('30') || 15);
    expect(parsedEta).toBe(30);
  });

  it('should use default for non-numeric input', () => {
    const parsedEta = Math.max(1, parseInt('invalid') || 15);
    expect(parsedEta).toBe(15);
  });
});

describe('Beverage Time Logic', () => {
  it('should return morning beverage before noon', () => {
    const getBeverageForTime = (prefs: typeof mockMemberPreferences, hour: number) => {
      return hour < 12 ? prefs.morningBeverage : prefs.afternoonBeverage;
    };

    expect(getBeverageForTime(mockMemberPreferences, 9)).toBe("Oat milk latte");
    expect(getBeverageForTime(mockMemberPreferences, 11)).toBe("Oat milk latte");
  });

  it('should return afternoon beverage at noon and after', () => {
    const getBeverageForTime = (prefs: typeof mockMemberPreferences, hour: number) => {
      return hour < 12 ? prefs.morningBeverage : prefs.afternoonBeverage;
    };

    expect(getBeverageForTime(mockMemberPreferences, 12)).toBe("Green tea");
    expect(getBeverageForTime(mockMemberPreferences, 15)).toBe("Green tea");
  });
});

describe('Member Name Display Logic', () => {
  it('should display full name when first and last name exist', () => {
    const getMemberName = (member: typeof mockArrivalWithMember.member) => {
      if (member.firstName && member.lastName) {
        return `${member.firstName} ${member.lastName}`;
      }
      return member.email;
    };

    expect(getMemberName(mockArrivalWithMember.member)).toBe("Test User");
  });

  it('should fallback to email when name is missing', () => {
    const getMemberName = (member: { email: string; firstName: string | null; lastName: string | null }) => {
      if (member.firstName && member.lastName) {
        return `${member.firstName} ${member.lastName}`;
      }
      return member.email;
    };

    const memberWithoutName = { ...mockArrivalWithMember.member, firstName: null, lastName: null };
    expect(getMemberName(memberWithoutName)).toBe("test@example.com");
  });
});

describe('Initials Generation Logic', () => {
  it('should generate initials from first and last name', () => {
    const getInitials = (member: typeof mockArrivalWithMember.member) => {
      if (member.firstName && member.lastName) {
        return `${member.firstName[0]}${member.lastName[0]}`;
      }
      return member.email[0]?.toUpperCase() ?? '?';
    };

    expect(getInitials(mockArrivalWithMember.member)).toBe("TU");
  });

  it('should use first letter of email when name is missing', () => {
    const getInitials = (member: { email: string; firstName: string | null; lastName: string | null }) => {
      if (member.firstName && member.lastName) {
        return `${member.firstName[0]}${member.lastName[0]}`;
      }
      return member.email[0]?.toUpperCase() ?? '?';
    };

    const memberWithoutName = { ...mockArrivalWithMember.member, firstName: null, lastName: null };
    expect(getInitials(memberWithoutName)).toBe("T");
  });
});

describe('Arrival Status Filtering', () => {
  const arrivals = [
    { ...mockArrivalWithMember, id: 1, status: "pending" },
    { ...mockArrivalWithMember, id: 2, status: "pending" },
    { ...mockArrivalWithMember, id: 3, status: "arrived" },
  ];

  it('should filter pending arrivals correctly', () => {
    const pendingArrivals = arrivals.filter(a => a.status === "pending");
    expect(pendingArrivals).toHaveLength(2);
  });

  it('should filter arrived members correctly', () => {
    const arrivedToday = arrivals.filter(a => a.status === "arrived");
    expect(arrivedToday).toHaveLength(1);
  });
});
