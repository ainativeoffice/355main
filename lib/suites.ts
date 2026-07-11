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
    id: "101",
    name: "Suite 101/A",
    area: "2,520 SF",
    status: "available",
    statusLabel: "Now leasing",
    description: "A Class A workplace within 355 Main, ready for a tenant-defined program.",
    canInquire: true,
  },
  {
    id: "102",
    name: "Suite 102/B",
    area: "2,534 SF",
    status: "available",
    statusLabel: "Now leasing",
    description: "A Class A workplace designed for focused teams and executive operations.",
    canInquire: true,
  },
  {
    id: "103",
    name: "Suite 103/C",
    area: "2,380 SF",
    status: "occupied",
    statusLabel: "Occupied",
    description: "Part of the active tenant community at 355 Main.",
    canInquire: false,
  },
  {
    id: "alpha",
    name: "2nd Level Full-Floor Flagship Suite",
    area: "Full floor",
    status: "leased-milestone",
    statusLabel: "Leased to Alpha School",
    description: "A tenant milestone for Alpha School, an AI-powered K–8 education platform. This space is not available.",
    canInquire: false,
  },
] as const;

export const availableSuites = suites.filter((suite) => suite.canInquire);
