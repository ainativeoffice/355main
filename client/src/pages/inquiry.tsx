import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { useToast } from "@/hooks/use-toast";
import { getRecaptchaToken } from "@/lib/recaptcha";
import { validateEmail } from "@shared/validation";
import { trackEvent, trackFormSubmit } from "@/lib/analytics";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const shellOptions = [
  { value: "Shell A (814 USF / 1,065 RSF)", label: "Shell A · 814 USF / 1,065 RSF" },
  { value: "Shell B (888 USF / 1,162 RSF)", label: "Shell B · 888 USF / 1,162 RSF" },
  { value: "Undecided", label: "Undecided" },
];

const timelineOptions = ["Immediate", "This quarter", "Within 6 months", "Exploratory"];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  interest: string;
  timeline: string;
  brief: string;
}

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  role: "",
  interest: "",
  timeline: "",
  brief: "",
};

export default function Inquiry() {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [completed, setCompleted] = useState(false);

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const mutation = useMutation({
    mutationFn: async (data: FormState) => {
      const recaptchaToken = await getRecaptchaToken("members");
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          member: {
            email: data.email,
            firstName: data.firstName || undefined,
            lastName: data.lastName || undefined,
            company: data.company || undefined,
            jobRole: data.role || undefined,
            moveInTiming: data.timeline || undefined,
            brandSource: "355main-rfc",
          },
          preferences: {
            workspaceArchetype: data.interest || undefined,
            notes: data.brief || undefined,
          },
          recaptchaToken,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to submit inquiry");
      return result;
    },
    onSuccess: () => {
      setCompleted(true);
      trackFormSubmit("inquiry", true);
      trackEvent("inquiry_complete", "conversion", "rfc_form");
      window.scrollTo(0, 0);
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again, or email leasing@355main.com.",
        variant: "destructive",
      });
      trackFormSubmit("inquiry", false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) next.firstName = "Required";
    if (!form.email.trim()) next.email = "Required";
    else if (!validateEmail(form.email)) next.email = "Enter a valid email";
    if (!form.company.trim()) next.company = "Required";
    if (!form.brief.trim()) next.brief = "Tell us what you're looking for";
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    trackEvent("inquiry_submit_attempt", "conversion", "rfc_form");
    mutation.mutate(form);
  };

  const fieldClass =
    "w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none transition-colors";
  const labelClass = "text-label block mb-2";

  return (
    <Layout>
      <SEO
        title="Inquiry – Request for Comment | 355 Main"
        description="Begin a private inquiry for a Sovereign Shell at 355 Main, Armonk. Inquiries are reviewed personally by North Castle Ventures."
        canonical="/inquiry"
      />

      <section className="container-page pt-16 pb-24 sm:pt-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left rail */}
          <motion.div {...reveal} className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <span className="marker-dot" />
              <span className="text-label-wide">Inquiry · RFC</span>
            </div>
            <h1 className="heading-display" data-testid="text-inquiry-headline">
              Request for<br />comment.
            </h1>
            <p className="text-body-lg mt-8 max-w-md">
              We hold three shells, one institution at a time. Tell us who you are and what
              you need. Every inquiry is read personally.
            </p>

            <dl className="mt-12 max-w-sm">
              <div className="spec-row">
                <dt>Response</dt>
                <dd>1–2 business days</dd>
              </div>
              <div className="spec-row">
                <dt>Review</dt>
                <dd>By a principal</dd>
              </div>
              <div className="spec-row">
                <dt>Location</dt>
                <dd>355 &amp; 357 Main, Armonk</dd>
              </div>
              <div className="spec-row">
                <dt>Direct</dt>
                <dd>
                  <a href="mailto:leasing@355main.com" className="hover:text-ember transition-colors" data-testid="link-email">
                    leasing@355main.com
                  </a>
                </dd>
              </div>
            </dl>
          </motion.div>

          {/* Form */}
          <motion.div {...reveal} className="lg:col-span-7">
            {completed ? (
              <div className="border border-border bg-card p-10 sm:p-14" data-testid="panel-inquiry-success">
                <div className="w-12 h-12 border border-foreground/30 flex items-center justify-center mb-8">
                  <Check className="w-5 h-5" />
                </div>
                <div className="text-label mb-4">Inquiry logged</div>
                <h2 className="heading-subsection">Received. Thank you.</h2>
                <p className="text-body mt-6 max-w-md">
                  Your brief is under review. A principal will respond within 1–2 business
                  days. A confirmation is on its way to your inbox.
                </p>
                <div className="flex flex-wrap gap-4 mt-10">
                  <Link href="/shells" className="btn-secondary" data-testid="link-back-shells" onClick={() => window.scrollTo(0, 0)}>
                    Review the Shells
                  </Link>
                  <Link href="/" className="btn-ghost" data-testid="link-home" onClick={() => window.scrollTo(0, 0)}>
                    Return home <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10" noValidate data-testid="form-inquiry">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass} htmlFor="firstName">First name *</label>
                    <input
                      id="firstName"
                      className={fieldClass}
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      placeholder="Jane"
                      data-testid="input-firstName"
                    />
                    {errors.firstName && <p className="text-annotation text-destructive mt-2">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="lastName">Last name</label>
                    <input
                      id="lastName"
                      className={fieldClass}
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      placeholder="Doe"
                      data-testid="input-lastName"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass} htmlFor="email">Email *</label>
                    <input
                      id="email"
                      type="email"
                      className={fieldClass}
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="jane@institution.com"
                      data-testid="input-email"
                    />
                    {errors.email && <p className="text-annotation text-destructive mt-2">{errors.email}</p>}
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="role">Role / title</label>
                    <input
                      id="role"
                      className={fieldClass}
                      value={form.role}
                      onChange={(e) => set("role", e.target.value)}
                      placeholder="Managing Partner"
                      data-testid="input-role"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="company">Institution *</label>
                  <input
                    id="company"
                    className={fieldClass}
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    placeholder="Firm or organization"
                    data-testid="input-company"
                  />
                  {errors.company && <p className="text-annotation text-destructive mt-2">{errors.company}</p>}
                </div>

                <div>
                  <label className={labelClass}>Shell of interest</label>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {shellOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => set("interest", opt.value)}
                        className={`border px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-left transition-colors ${
                          form.interest === opt.value
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground/50"
                        }`}
                        data-testid={`button-shell-${opt.value.split(" ")[0]!.toLowerCase()}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Timeline</label>
                  <div className="flex flex-wrap gap-3 mt-3">
                    {timelineOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => set("timeline", opt)}
                        className={`border px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                          form.timeline === opt
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground/50"
                        }`}
                        data-testid={`button-timeline-${opt.split(" ")[0]!.toLowerCase()}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="brief">The brief *</label>
                  <textarea
                    id="brief"
                    rows={5}
                    className={`${fieldClass} resize-none`}
                    value={form.brief}
                    onChange={(e) => set("brief", e.target.value)}
                    placeholder="What are you looking for? Headcount, requirements, questions."
                    data-testid="input-brief"
                  />
                  {errors.brief && <p className="text-annotation text-destructive mt-2">{errors.brief}</p>}
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="button-submit"
                  >
                    {mutation.isPending ? "Submitting…" : "Submit inquiry"}
                    {!mutation.isPending && <ArrowRight className="w-4 h-4" />}
                  </button>
                  <p className="text-annotation max-w-[16rem] leading-relaxed">
                    Protected by reCAPTCHA. Held in confidence.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
