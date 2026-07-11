import { ArrowUpRight } from "lucide-react";
import { ecosystemUrl, leasingEmail } from "@/lib/links";
import { TrackedLink } from "@/components/tracked-link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="355 Main home">
        <span>355</span> Main
      </a>
      <nav aria-label="Primary navigation">
        <a href="#suites">Suites</a>
        <a href="#standard">The standard</a>
        <TrackedLink
          href={ecosystemUrl("apc", "header-campus")}
          target="_blank"
          rel="noreferrer"
          eventName="ecosystem_click"
          eventData={{ destination: "apc", placement: "header-campus" }}
        >
          Campus <ArrowUpRight aria-hidden="true" />
        </TrackedLink>
      </nav>
      <TrackedLink className="button button-dark header-cta" href={leasingEmail()} eventName="leasing_click" eventData={{ placement: "header" }}>
        Leasing inquiry
      </TrackedLink>
    </header>
  );
}
