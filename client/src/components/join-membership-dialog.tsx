import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronRight, ChevronLeft, Loader2, Users, Monitor, Wifi, Coffee, Zap, Building2, Plus, Trash2, AlertCircle, Heart } from "lucide-react";
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

interface PrivateOffice {
  id: string;
  desks: number;
}

interface PreferencesData {
  workspaceArchetype?: string;
  privateOffices?: PrivateOffice[];
  hybridMemberships?: number;
  collaborationModes?: string[];
  amenities?: string[];
  techStack?: string[];
  integrations?: string[];
  supportPriorities?: string[];
  decisionStage?: string;
}

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
      const transformedPreferences = {
        ...data.preferences,
        privateOfficeDesks: data.preferences.privateOffices?.reduce((sum, o) => sum + o.desks, 0) || 0,
        privateOfficesConfig: data.preferences.privateOffices?.map(o => o.desks) || [],
      };
      
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ member: data.member, preferences: transformedPreferences }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to join waitlist");
      return result;
    },
    onSuccess: () => {
      setCompleted(true);
    },
    onError: (error: Error) => {
      toast({
        title: "Could not join waitlist",
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

  const addPrivateOffice = () => {
    const currentOffices = preferences.privateOffices || [];
    setPreferences({
      ...preferences,
      privateOffices: [...currentOffices, { id: crypto.randomUUID(), desks: 1 }],
    });
  };

  const removePrivateOffice = (id: string) => {
    const currentOffices = preferences.privateOffices || [];
    setPreferences({
      ...preferences,
      privateOffices: currentOffices.filter(o => o.id !== id),
    });
  };

  const updateOfficeDesks = (id: string, desks: number) => {
    const currentOffices = preferences.privateOffices || [];
    setPreferences({
      ...preferences,
      privateOffices: currentOffices.map(o => 
        o.id === id ? { ...o, desks: Math.max(1, desks) } : o
      ),
    });
  };

  const totalPrivateDesks = (preferences.privateOffices || []).reduce((sum, o) => sum + o.desks, 0);
  const totalSeats = totalPrivateDesks + (preferences.hybridMemberships || 0);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {completed ? (
          <div className="py-12 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-serif text-2xl mb-3">We've Heard You</h2>
            <p className="text-muted-foreground mb-2">
              Thank you for your interest in Opus 355.
            </p>
            <p className="text-muted-foreground mb-6">
              Our team is reviewing your workspace requirements and will be in touch shortly to discuss how we can create the perfect environment for your team.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mb-6 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">What happens next?</p>
              <p>An Opus team member will reach out within 1-2 business days to schedule a personalized tour and discuss your specific needs.</p>
            </div>
            <Button onClick={handleClose} data-testid="button-waitlist-done">
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
                {step === 1 && "Join the Waitlist"}
                {step === 2 && "Tell Us About Your Team"}
                {step === 3 && "Configure Your Workspace"}
                {step === 4 && "Select Your Tech & Amenities"}
              </DialogTitle>
              <p className="text-muted-foreground text-sm">
                {step === 1 && "Get priority access and updates about Opus 355."}
                {step === 2 && "Help us understand your workspace needs."}
                {step === 3 && "Design your ideal office configuration."}
                {step === 4 && "Pick the technology and amenities that matter to you."}
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
                      data-testid="input-waitlist-email"
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
                        data-testid="input-waitlist-firstname"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Last name"
                        value={memberData.lastName || ""}
                        onChange={(e) => setMemberData({ ...memberData, lastName: e.target.value })}
                        data-testid="input-waitlist-lastname"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="company">Organization</Label>
                    <Input
                      id="company"
                      placeholder="Your organization name"
                      value={memberData.company || ""}
                      onChange={(e) => setMemberData({ ...memberData, company: e.target.value })}
                      data-testid="input-waitlist-organization"
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
                      data-testid="input-waitlist-jobrole"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  {memberData.teamSize && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        For a team of <span className="font-medium text-foreground">{TEAM_SIZES.find(s => s.id === memberData.teamSize)?.label || memberData.teamSize}</span>, 
                        configure your ideal workspace mix below.
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-border bg-background">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Private Offices</div>
                          <div className="text-sm text-muted-foreground">
                            Add offices and specify how many desks you need in each
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {(preferences.privateOffices || []).map((office, index) => (
                          <div key={office.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                            <span className="text-sm font-medium text-muted-foreground w-20">
                              Office {index + 1}
                            </span>
                            <div className="flex items-center gap-2 flex-1">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateOfficeDesks(office.id, office.desks - 1)}
                                disabled={office.desks <= 1}
                                data-testid={`button-decrease-office-${index}-desks`}
                              >
                                -
                              </Button>
                              <span className="w-12 text-center font-medium" data-testid={`text-office-${index}-desks`}>
                                {office.desks}
                              </span>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateOfficeDesks(office.id, office.desks + 1)}
                                data-testid={`button-increase-office-${index}-desks`}
                              >
                                +
                              </Button>
                              <span className="text-sm text-muted-foreground">desks</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removePrivateOffice(office.id)}
                              data-testid={`button-remove-office-${index}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={addPrivateOffice}
                          data-testid="button-add-office"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Private Office
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-border bg-background">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Hybrid Memberships</div>
                          <div className="text-sm text-muted-foreground mb-3">
                            Flexible access for distributed or part-time team members
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setPreferences({ 
                                ...preferences, 
                                hybridMemberships: Math.max(0, (preferences.hybridMemberships || 0) - 1) 
                              })}
                              disabled={(preferences.hybridMemberships || 0) === 0}
                              data-testid="button-decrease-hybrid"
                            >
                              -
                            </Button>
                            <span className="w-12 text-center font-medium" data-testid="text-hybrid-count">
                              {preferences.hybridMemberships || 0}
                            </span>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setPreferences({ 
                                ...preferences, 
                                hybridMemberships: (preferences.hybridMemberships || 0) + 1 
                              })}
                              data-testid="button-increase-hybrid"
                            >
                              +
                            </Button>
                            <span className="text-sm text-muted-foreground">memberships</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {totalSeats > 0 && (
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Your workspace configuration</span>
                        <span className="text-sm text-muted-foreground">
                          {totalSeats} total seat{totalSeats !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {(preferences.privateOffices || []).length > 0 && (
                          <span>
                            {(preferences.privateOffices || []).length} office{(preferences.privateOffices || []).length !== 1 ? 's' : ''} ({totalPrivateDesks} desk{totalPrivateDesks !== 1 ? 's' : ''})
                          </span>
                        )}
                        {(preferences.privateOffices || []).length > 0 && (preferences.hybridMemberships || 0) > 0 && ' + '}
                        {(preferences.hybridMemberships || 0) > 0 && (
                          <span>
                            {preferences.hybridMemberships} hybrid membership{(preferences.hybridMemberships || 0) !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
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
                data-testid="button-waitlist-back"
              >
                {step === 1 ? "Cancel" : <><ChevronLeft className="w-4 h-4 mr-1" /> Back</>}
              </Button>
              <Button
                onClick={handleNext}
                disabled={step === 1 && !memberData.email || mutation.isPending}
                data-testid="button-waitlist-next"
              >
                {mutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : step === 4 ? (
                  "Join Waitlist"
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
