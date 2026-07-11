export type EcosystemKey = "apc" | "ncv" | "nativeAgentic" | "rfc" | "alpha" | "alphaPress";

const destinations: Record<EcosystemKey, string> = {
  apc: "https://armonkprofessionalcenter.com",
  ncv: "https://northcastleventures.com",
  nativeAgentic: "https://nativeagentic.com",
  rfc: "https://ainativeoffice.org",
  alpha: "https://alpha.school",
  alphaPress: "https://northcastleventures.com",
};

export function ecosystemUrl(key: EcosystemKey, placement: string) {
  const url = new URL(destinations[key]);
  url.searchParams.set("utm_source", "355main.com");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "ecosystem");
  url.searchParams.set("utm_content", placement);
  return url.toString();
}

export const leasingEmail = (suite?: string) => {
  const subject = suite ? `355 Main leasing inquiry — ${suite}` : "355 Main leasing inquiry";
  return `mailto:leasing@355main.com?subject=${encodeURIComponent(subject)}`;
};
