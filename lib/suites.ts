export type SuiteStatus = "available" | "occupied" | "leased-milestone";

export type Suite = {
  id: string;
  name: string;
  area: string;
  status: SuiteStatus;
  statusLabel: string;
  description: string;
  canInquire: boolean;
};

export const suites: readonly Suite[] = [
  {
    id: "102",
    name: "Suite A/102",
    area: "1,065 RSF",
    status: "available",
    statusLabel: "Now leasing",
    description: "A Class A workplace within 355 Main, ready for a tenant-defined program.",
    canInquire: true,
  },
  {
    id: "104",
    name: "Suite B/104",
    area: "1,162 RSF",
    status: "available",
    statusLabel: "Now leasing",
    description: "A Class A workplace designed for focused teams and executive operations.",
    canInquire: true,
  },
  {
    id: "106",
    name: "Suite C/106 — Trucast",
    area: "1,060 RSF",
    status: "occupied",
    statusLabel: "Leased to Trucast",
    description: "An occupied first-floor suite leased to Trucast. This space is not available.",
    canInquire: false,
  },
  {
    id: "103",
    name: "Suite 103 — Northwell Health",
    area: "3,193 RSF",
    status: "occupied",
    statusLabel: "Leased",
    description: "An occupied first-floor suite. This space is not available.",
    canInquire: false,
  },
  {
    id: "alpha",
    name: "2nd Level Full-Floor Flagship Suite",
    area: "7,590 RSF",
    status: "leased-milestone",
    statusLabel: "Leased to Alpha School",
    description: "A tenant milestone for Alpha School, an AI-powered K–8 education platform. This space is not available.",
    canInquire: false,
  },
] as const;

export const availableSuites = suites.filter((suite) => suite.canInquire);
