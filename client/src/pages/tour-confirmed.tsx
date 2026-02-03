import { useEffect, useState, FormEvent } from "react";
import { Link, useSearch } from "wouter";
import { SEO } from "@/components/seo";
import { CheckCircle, Loader2 } from "lucide-react";
import { trackEvent, trackConversion } from "@/lib/analytics";
import { getRecaptchaToken } from "@/lib/recaptcha";

const teamSizeOptions = [
  { value: "just_me", label: "Just me" },
  { value: "2_5", label: "2-5" },
  { value: "6_10", label: "6-10" },
  { value: "11_25", label: "11-25" },
  { value: "26_50", label: "26-50" },
  { value: "50_plus", label: "50+" }
];

const workspacePreferences = [
  { id: "private_office", label: "Private Office" },
  { id: "custom_suite", label: "Custom Suite" },
  { id: "flex_membership", label: "Flex Membership" },
  { id: "meeting_rooms", label: "Meeting Rooms" },
  { id: "event_space", label: "Event Space" }
];

export default function TourConfirmed() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  
  const [firstName, setFirstName] = useState(params.get("firstName") || params.get("name")?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(params.get("lastName") || params.get("name")?.split(" ").slice(1).join(" ") || "");
  const [email, setEmail] = useState(params.get("email") || "");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    trackEvent('tour_booked', 'conversion', 'tour_confirmation');
    trackConversion('tour_booking');
  }, []);

  const togglePreference = (id: string) => {
    setPreferences(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    
    setStatus("loading");
    trackEvent('interest_form_submit', 'engagement', 'tour_confirmed');
    
    try {
      const recaptchaToken = await getRecaptchaToken("members");
      const response = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          member: {
            firstName,
            lastName,
            email,
            company,
            jobRole: jobTitle,
            teamSize,
            brandSource: "355main_tour",
          },
          preferences: {
            amenities: preferences,
          },
          recaptchaToken
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus("success");
        setMessage("Your information has been saved. We'll reach out soon!");
        trackEvent('interest_form_success', 'conversion', 'tour_confirmed');
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-foreground flex flex-col">
      <SEO 
        title="Tour Confirmed | 355 Main"
        description="Your tour at 355 Main has been confirmed. We look forward to showing you around."
        canonical="/tour-confirmed"
      />
      
      <header className="py-6 border-b border-border">
        <div className="container mx-auto px-6 text-center">
          <Link href="/" className="font-serif text-2xl tracking-tight hover:opacity-80 transition-opacity" data-testid="link-logo-confirmed">
            355 Main
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-6 max-w-2xl py-16 md:py-24">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl mb-4">Tour Confirmed</h1>
            
            <p className="text-muted-foreground">
              You'll receive a calendar invitation shortly. We look forward to showing you around.
            </p>
          </div>
          
          {status !== "success" && (
            <div className="bg-muted/30 border border-border p-8 md:p-10">
              <h2 className="font-serif text-2xl mb-2 text-center">Tell us more</h2>
              <p className="text-muted-foreground text-center mb-8 text-sm">
                Help us personalize your tour experience.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="First name"
                      data-testid="input-first-name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Last name"
                      data-testid="input-last-name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="you@company.com"
                    required
                    data-testid="input-email"
                  />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-3 border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Company name"
                      data-testid="input-company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Role</label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full px-4 py-3 border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Your role"
                      data-testid="input-job-title"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Team Size</label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full px-4 py-3 border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    data-testid="select-team-size"
                  >
                    <option value="">Select team size</option>
                    {teamSizeOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-3">Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {workspacePreferences.map(pref => (
                      <button
                        key={pref.id}
                        type="button"
                        onClick={() => togglePreference(pref.id)}
                        className={`px-4 py-2 text-sm border transition-colors ${
                          preferences.includes(pref.id)
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-white border-border hover:border-primary/50"
                        }`}
                        data-testid={`button-pref-${pref.id}`}
                      >
                        {pref.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {status === "error" && (
                  <p className="text-red-600 text-sm">{message}</p>
                )}
                
                <button
                  type="submit"
                  disabled={status === "loading" || !email}
                  className="w-full bg-primary text-primary-foreground py-4 font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  data-testid="button-submit-interest"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save My Preferences"
                  )}
                </button>
              </form>
            </div>
          )}
          
          {status === "success" && (
            <div className="bg-green-50 border border-green-200 p-8 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <p className="text-green-800 font-medium">{message}</p>
            </div>
          )}
          
          <div className="mt-8 text-center">
            <Link 
              href="/"
              className="text-primary hover:text-primary/80 transition-colors text-sm uppercase tracking-widest font-medium"
              data-testid="link-explore-site"
            >
              ← Explore 355 Main
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-border bg-muted/20">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p className="mb-2">355 Main Street, Armonk, NY</p>
          <p className="text-xs">© 2025 355 Main. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
