import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronRight, ChevronLeft, Loader2, Building2, Users, Monitor, Wifi, Coffee, Zap, Calendar, Briefcase, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

interface JoinMembershipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface MemberData {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  jobRole?: string;
  teamSize?: string;
  moveInTiming?: string;
}

interface PreferencesData {
  workspaceArchetype?: string;
  collaborationModes?: string[];
  amenities?: string[];
  techStack?: string[];
  integrations?: string[];
  supportPriorities?: string[];
  decisionStage?: string;
}

const WORKSPACE_ARCHETYPES = [
  { id: "custom", label: "Custom Office", desc: "Fully customized suite for your team", icon: Building2 },
  { id: "private", label: "Private Office", desc: "Move-in ready private workspace", icon: Briefcase },
  { id: "hybrid", label: "Hybrid Membership", desc: "Flexible access for distributed teams", icon: Users },
];

const TEAM_SIZES = [
  { id: "1", label: "Just me" },
  { id: "2-5", label: "2-5 people" },
  { id: "6-15", label: "6-15 people" },
  { id: "16-30", label: "16-30 people" },
  { id: "30+", label: "30+ people" },
];

const MOVE_IN_TIMING = [
  { id: "immediately", label: "As soon as possible" },
  { id: "1-3months", label: "1-3 months" },
  { id: "3-6months", label: "3-6 months" },
  { id: "6-12months", label: "6-12 months" },
  { id: "exploring", label: "Just exploring" },
];

const TECH_STACK = [
  { id: "video-conferencing", label: "Video Conferencing", desc: "Zoom, Teams, Meet ready", icon: Monitor },
  { id: "high-speed-wifi", label: "High-Speed WiFi", desc: "Dedicated business connectivity", icon: Wifi },
  { id: "av-systems", label: "AV Systems", desc: "Presentation & display tech", icon: Zap },
  { id: "phone-systems", label: "Phone Systems", desc: "VoIP & unified communications", icon: Coffee },
];

const AMENITIES = [
  { id: "meeting-rooms", label: "Meeting Rooms" },
  { id: "phone-booths", label: "Phone Booths" },
  { id: "event-space", label: "Event Space" },
  { id: "cafe-kitchen", label: "Café & Kitchen" },
  { id: "outdoor-terrace", label: "Outdoor Terrace" },
  { id: "wellness-room", label: "Wellness Room" },
  { id: "bike-storage", label: "Bike Storage" },
  { id: "parking", label: "On-site Parking" },
];

export function JoinMembershipDialog({ open, onOpenChange }: JoinMembershipDialogProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [memberData, setMemberData] = useState<MemberData>({ email: "" });
  const [preferences, setPreferences] = useState<PreferencesData>({});
  const [completed, setCompleted] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: { member: MemberData; preferences: PreferencesData }) => {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to sign up");
      return result;
    },
    onSuccess: () => {
      setCompleted(true);
    },
    onError: (error: Error) => {
      toast({
        title: "Sign-up failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNext = () => {
    if (step === 1) {
      if (!memberData.email) {
        setEmailError("Email is required");
        return;
      }
      if (!validateEmail(memberData.email)) {
        setEmailError("Please enter a valid email address");
        return;
      }
      setEmailError(null);
    }
    if (step < 4) {
      setStep(step + 1);
    } else {
      mutation.mutate({ member: memberData, preferences });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setMemberData({ email: "" });
      setPreferences({});
      setCompleted(false);
      setEmailError(null);
    }, 300);
  };

  const toggleArrayItem = (key: keyof PreferencesData, item: string) => {
    const current = (preferences[key] as string[]) || [];
    const updated = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];
    setPreferences({ ...preferences, [key]: updated });
  };

  const isSelected = (key: keyof PreferencesData, item: string) => {
    return ((preferences[key] as string[]) || []).includes(item);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {completed ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-serif text-2xl mb-3">Welcome to Opus 355</h2>
            <p className="text-muted-foreground mb-6">
              You're now a member. We'll keep you updated on news, events, and availability.
            </p>
            <Button onClick={handleClose} data-testid="button-membership-done">
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors",
                      s <= step ? "bg-primary" : "bg-muted"
                    )}
                  />
                ))}
              </div>
              <DialogTitle className="font-serif text-2xl">
                {step === 1 && "Join as a Member"}
                {step === 2 && "Tell Us About Your Team"}
                {step === 3 && "Choose Your Workspace"}
                {step === 4 && "Select Your Tech & Amenities"}
              </DialogTitle>
              <p className="text-muted-foreground text-sm">
                {step === 1 && "Get news, updates, and priority access to Opus 355."}
                {step === 2 && "Help us understand your workspace needs."}
                {step === 3 && "What type of workspace fits your team?"}
                {step === 4 && "Pick the gear that matters to you."}
              </p>
            </DialogHeader>

            <div className="py-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={memberData.email}
                      onChange={(e) => {
                        setMemberData({ ...memberData, email: e.target.value });
                        if (emailError) setEmailError(null);
                      }}
                      className={emailError ? "border-destructive" : ""}
                      data-testid="input-member-email"
                    />
                    {emailError && (
                      <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {emailError}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="First name"
                        value={memberData.firstName || ""}
                        onChange={(e) => setMemberData({ ...memberData, firstName: e.target.value })}
                        data-testid="input-member-firstname"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Last name"
                        value={memberData.lastName || ""}
                        onChange={(e) => setMemberData({ ...memberData, lastName: e.target.value })}
                        data-testid="input-member-lastname"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      placeholder="Your company name"
                      value={memberData.company || ""}
                      onChange={(e) => setMemberData({ ...memberData, company: e.target.value })}
                      data-testid="input-member-company"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 block">Team Size</Label>
                    <div className="flex flex-wrap gap-2">
                      {TEAM_SIZES.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => setMemberData({ ...memberData, teamSize: size.id })}
                          className={cn(
                            "px-4 py-2 rounded-full border text-sm transition-all",
                            memberData.teamSize === size.id
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border hover:border-primary/50"
                          )}
                          data-testid={`button-teamsize-${size.id}`}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">When are you looking to move in?</Label>
                    <div className="flex flex-wrap gap-2">
                      {MOVE_IN_TIMING.map((timing) => (
                        <button
                          key={timing.id}
                          onClick={() => setMemberData({ ...memberData, moveInTiming: timing.id })}
                          className={cn(
                            "px-4 py-2 rounded-full border text-sm transition-all",
                            memberData.moveInTiming === timing.id
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border hover:border-primary/50"
                          )}
                          data-testid={`button-timing-${timing.id}`}
                        >
                          {timing.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="jobRole">Your Role</Label>
                    <Input
                      id="jobRole"
                      placeholder="e.g. CEO, Office Manager, HR Director"
                      value={memberData.jobRole || ""}
                      onChange={(e) => setMemberData({ ...memberData, jobRole: e.target.value })}
                      data-testid="input-member-jobrole"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  {WORKSPACE_ARCHETYPES.map((archetype) => {
                    const Icon = archetype.icon;
                    return (
                      <button
                        key={archetype.id}
                        onClick={() => setPreferences({ ...preferences, workspaceArchetype: archetype.id })}
                        className={cn(
                          "w-full p-4 rounded-lg border text-left flex items-start gap-4 transition-all",
                          preferences.workspaceArchetype === archetype.id
                            ? "bg-primary/5 border-primary"
                            : "bg-background border-border hover:border-primary/50"
                        )}
                        data-testid={`button-archetype-${archetype.id}`}
                      >
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
                          preferences.workspaceArchetype === archetype.id ? "bg-primary/10" : "bg-muted"
                        )}>
                          <Icon className={cn(
                            "w-6 h-6",
                            preferences.workspaceArchetype === archetype.id ? "text-primary" : "text-muted-foreground"
                          )} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{archetype.label}</div>
                          <div className="text-sm text-muted-foreground">{archetype.desc}</div>
                        </div>
                        {preferences.workspaceArchetype === archetype.id && (
                          <Check className="w-5 h-5 text-primary shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 block">Technology Stack</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {TECH_STACK.map((tech) => {
                        const Icon = tech.icon;
                        const selected = isSelected("techStack", tech.id);
                        return (
                          <button
                            key={tech.id}
                            onClick={() => toggleArrayItem("techStack", tech.id)}
                            className={cn(
                              "p-3 rounded-lg border text-left transition-all",
                              selected
                                ? "bg-primary/5 border-primary"
                                : "bg-background border-border hover:border-primary/50"
                            )}
                            data-testid={`button-tech-${tech.id}`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className={cn("w-4 h-4", selected ? "text-primary" : "text-muted-foreground")} />
                              <span className="font-medium text-sm">{tech.label}</span>
                              {selected && <Check className="w-4 h-4 text-primary ml-auto" />}
                            </div>
                            <p className="text-xs text-muted-foreground">{tech.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">Amenities That Matter</Label>
                    <div className="flex flex-wrap gap-2">
                      {AMENITIES.map((amenity) => {
                        const selected = isSelected("amenities", amenity.id);
                        return (
                          <button
                            key={amenity.id}
                            onClick={() => toggleArrayItem("amenities", amenity.id)}
                            className={cn(
                              "px-3 py-1.5 rounded-full border text-sm transition-all flex items-center gap-1.5",
                              selected
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background border-border hover:border-primary/50"
                            )}
                            data-testid={`button-amenity-${amenity.id}`}
                          >
                            {amenity.label}
                            {selected && <Check className="w-3 h-3" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Button
                variant="ghost"
                onClick={step === 1 ? handleClose : handleBack}
                data-testid="button-membership-back"
              >
                {step === 1 ? "Cancel" : <><ChevronLeft className="w-4 h-4 mr-1" /> Back</>}
              </Button>
              <Button
                onClick={handleNext}
                disabled={step === 1 && !memberData.email || mutation.isPending}
                data-testid="button-membership-next"
              >
                {mutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : step === 4 ? (
                  "Complete Sign Up"
                ) : (
                  <>Continue <ChevronRight className="w-4 h-4 ml-1" /></>
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
