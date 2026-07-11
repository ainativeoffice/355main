import { ArrowRight } from "lucide-react";
import { leasingEmail } from "@/lib/links";
import { suites } from "@/lib/suites";
import { TrackedLink } from "@/components/tracked-link";

export function SuiteInventory() {
  return (
    <div className="suite-grid">
      {suites.map((suite, index) => (
        <article className={`suite-card suite-${suite.status}`} key={suite.id}>
          <div className="suite-index">0{index + 1}</div>
          <div className="suite-status"><span aria-hidden="true" />{suite.statusLabel}</div>
          <div>
            <h3>{suite.name}</h3>
            <p className="suite-area">{suite.area}</p>
          </div>
          <p>{suite.description}</p>
          {suite.canInquire ? (
            <TrackedLink
              className="suite-link"
              href={leasingEmail(suite.name)}
              eventName="leasing_click"
              eventData={{ placement: `suite-${suite.id}`, suite: suite.name }}
            >
              Inquire about this suite <ArrowRight aria-hidden="true" />
            </TrackedLink>
          ) : (
            <p className="suite-unavailable">Not current availability</p>
          )}
        </article>
      ))}
    </div>
  );
}
