import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Loader2, 
  Building2, 
  Users, 
  Monitor, 
  Wifi, 
  Coffee, 
  Zap, 
  Briefcase, 
  AlertCircle,
  X,
  Sparkles,
  Heart,
  MessageSquare,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

interface JoinWaitlistDialogProps {
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
  privateOfficeDesks?: number;
  hybridMemberships?: number;
  collaborationModes?: string[];
  amenities?: string[];
  techStack?: string[];
  integrations?: string[];
  supportPriorities?: string[];
  decisionStage?: string;
  additionalThoughts?: string;
  workstyleDescription?: string;
  idealDayDescription?: string;
}

const TEAM_SIZES = [
  { id: "1", label: "Just me", emoji: "👤" },
  { id: "2-5", label: "2-5 people", emoji: "👥" },
  { id: "6-15", label: "6-15 people", emoji: "🏢" },
  { id: "16-30", label: "16-30 people", emoji: "🏛️" },
  { id: "30+", label: "30+ people", emoji: "🌆" },
];

const MOVE_IN_TIMING = [
  { id: "immediately", label: "As soon as possible" },
  { id: "1-3months", label: "1-3 months" },
  { id: "3-6months", label: "3-6 months" },
  { id: "6-12months", label: "6-12 months" },
  { id: "exploring", label: "Just exploring options" },
];

const WORK_STYLES = [
  { id: "focused", label: "Deep focus work", desc: "Quiet spaces for concentration" },
  { id: "collaborative", label: "Team collaboration", desc: "Open spaces for working together" },
  { id: "mixed", label: "Mix of both", desc: "Flexibility to switch between modes" },
  { id: "client-facing", label: "Client meetings", desc: "Professional spaces for hosting guests" },
];

const TECH_NEEDS = [
  { id: "video-conferencing", label: "Video Conferencing", icon: Monitor },
  { id: "high-speed-wifi", label: "Enterprise WiFi", icon: Wifi },
  { id: "av-systems", label: "AV & Displays", icon: Zap },
  { id: "phone-systems", label: "Phone Systems", icon: Coffee },
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
  { id: "childcare", label: "Childcare Nearby" },
  { id: "fitness", label: "Fitness Access" },
];

const TOTAL_STEPS = 6;

export function JoinWaitlistDialog({ open, onOpenChange }: JoinWaitlistDialogProps) {
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
      if (!res.ok) throw new Error(result.message || "Failed to join waitlist");
      return result;
    },
    onSuccess: () => {
      setCompleted(true);
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again.",
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
    if (step < TOTAL_STEPS) {
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
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && handleClose()}>
      <DialogContent className="max-w-none w-screen h-screen p-0 border-0 rounded-none" data-testid="waitlist-dialog">
        <VisuallyHidden>
          <DialogTitle>Join the 355 Main Waitlist</DialogTitle>
          <DialogDescription>
            Share your workspace requirements and preferences to join our waitlist and receive priority updates.
          </DialogDescription>
        </VisuallyHidden>
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="rounded-full"
            data-testid="button-close-waitlist"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="h-full flex flex-col overflow-hidden">
        {!completed && (
          <div className="px-6 pt-6">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-1 mb-2" data-testid="waitlist-progress-bar">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-all duration-300",
                      i + 1 <= step ? "bg-primary" : "bg-muted"
                    )}
                    data-testid={`progress-step-${i + 1}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground" data-testid="waitlist-step-indicator">
                Step {step} of {TOTAL_STEPS}
              </p>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-6 py-8">
            <AnimatePresence mode="wait">
              {completed ? (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="min-h-[60vh] flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                    <Sparkles className="w-10 h-10 text-primary" />
                  </div>
                  <h1 className="font-serif text-4xl mb-4">You're on the list!</h1>
                  <p className="text-xl text-muted-foreground mb-4 max-w-md">
                    Thank you for sharing your vision with us. Your input is invaluable as we put the finishing touches on 355 Main.
                  </p>
                  <p className="text-muted-foreground mb-8 max-w-md">
                    We'll be in touch soon with updates, sneak peeks, and priority access when we open our doors.
                  </p>
                  <Button size="lg" onClick={handleClose} data-testid="button-waitlist-done">
                    Done
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {step === 1 && (
                    <div className="space-y-8">
                      <div className="text-center mb-12">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Heart className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="font-serif text-4xl mb-4">We Want to Hear From You</h1>
                        <p className="text-xl text-muted-foreground max-w-md mx-auto">
                          Your input will help us make final adjustments to 355 Main. Tell us about your ideal workspace.
                        </p>
                      </div>

                      <div className="space-y-6 max-w-md mx-auto">
                        <div>
                          <Label htmlFor="email" className="text-base">Your Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@company.com"
                            value={memberData.email}
                            onChange={(e) => {
                              setMemberData({ ...memberData, email: e.target.value });
                              if (emailError) setEmailError(null);
                            }}
                            className={cn("h-12 text-lg", emailError ? "border-destructive" : "")}
                            data-testid="input-waitlist-email"
                          />
                          {emailError && (
                            <p className="text-destructive text-sm mt-2 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {emailError}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName" className="text-base">First Name</Label>
                            <Input
                              id="firstName"
                              placeholder="First name"
                              value={memberData.firstName || ""}
                              onChange={(e) => setMemberData({ ...memberData, firstName: e.target.value })}
                              className="h-12"
                              data-testid="input-waitlist-firstname"
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName" className="text-base">Last Name</Label>
                            <Input
                              id="lastName"
                              placeholder="Last name"
                              value={memberData.lastName || ""}
                              onChange={(e) => setMemberData({ ...memberData, lastName: e.target.value })}
                              className="h-12"
                              data-testid="input-waitlist-lastname"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="company" className="text-base">Organization</Label>
                          <Input
                            id="company"
                            placeholder="Your company or organization"
                            value={memberData.company || ""}
                            onChange={(e) => setMemberData({ ...memberData, company: e.target.value })}
                            className="h-12"
                            data-testid="input-waitlist-company"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-8">
                      <div className="text-center mb-12">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Users className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="font-serif text-4xl mb-4">Tell Us About Your Team</h1>
                        <p className="text-xl text-muted-foreground max-w-md mx-auto">
                          Understanding your team helps us design spaces that truly work for you.
                        </p>
                      </div>

                      <div className="space-y-8 max-w-lg mx-auto">
                        <div>
                          <Label className="text-base mb-4 block">How big is your team?</Label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {TEAM_SIZES.map((size) => (
                              <button
                                key={size.id}
                                onClick={() => setMemberData({ ...memberData, teamSize: size.id })}
                                className={cn(
                                  "p-4 rounded-xl border-2 text-center transition-all",
                                  memberData.teamSize === size.id
                                    ? "bg-primary/5 border-primary"
                                    : "bg-background border-border hover:border-primary/50"
                                )}
                                data-testid={`button-teamsize-${size.id}`}
                              >
                                <span className="text-2xl block mb-1">{size.emoji}</span>
                                <span className="text-sm font-medium">{size.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label className="text-base mb-4 block">When are you looking to move in?</Label>
                          <div className="flex flex-wrap gap-2">
                            {MOVE_IN_TIMING.map((timing) => (
                              <button
                                key={timing.id}
                                onClick={() => setMemberData({ ...memberData, moveInTiming: timing.id })}
                                className={cn(
                                  "px-4 py-3 rounded-full border-2 text-sm transition-all",
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
                          <Label htmlFor="jobRole" className="text-base">What's your role?</Label>
                          <Input
                            id="jobRole"
                            placeholder="e.g. CEO, Office Manager, HR Director"
                            value={memberData.jobRole || ""}
                            onChange={(e) => setMemberData({ ...memberData, jobRole: e.target.value })}
                            className="h-12"
                            data-testid="input-waitlist-jobrole"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-8">
                      <div className="text-center mb-12">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Lightbulb className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="font-serif text-4xl mb-4">How Does Your Team Work?</h1>
                        <p className="text-xl text-muted-foreground max-w-md mx-auto">
                          Every team has its rhythm. Help us understand yours.
                        </p>
                      </div>

                      <div className="space-y-8 max-w-lg mx-auto">
                        <div>
                          <Label className="text-base mb-4 block">What's your primary work style?</Label>
                          <div className="grid gap-3">
                            {WORK_STYLES.map((style) => (
                              <button
                                key={style.id}
                                onClick={() => setPreferences({ ...preferences, workspaceArchetype: style.id })}
                                className={cn(
                                  "p-4 rounded-xl border-2 text-left transition-all",
                                  preferences.workspaceArchetype === style.id
                                    ? "bg-primary/5 border-primary"
                                    : "bg-background border-border hover:border-primary/50"
                                )}
                                data-testid={`button-workstyle-${style.id}`}
                              >
                                <div className="font-medium">{style.label}</div>
                                <div className="text-sm text-muted-foreground">{style.desc}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="workstyleDescription" className="text-base">
                            Tell us more about how your team works
                          </Label>
                          <p className="text-sm text-muted-foreground mb-3">
                            What does a typical day look like? Any special needs?
                          </p>
                          <Textarea
                            id="workstyleDescription"
                            placeholder="e.g. We have a lot of video calls in the morning, need quiet focus time in afternoons, and love collaborative brainstorming sessions..."
                            value={preferences.workstyleDescription || ""}
                            onChange={(e) => setPreferences({ ...preferences, workstyleDescription: e.target.value })}
                            className="min-h-[120px]"
                            data-testid="input-workstyle-description"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-8">
                      <div className="text-center mb-12">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Building2 className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="font-serif text-4xl mb-4">Configure Your Workspace</h1>
                        <p className="text-xl text-muted-foreground max-w-md mx-auto">
                          How would you like to structure your space at 355 Main?
                        </p>
                      </div>

                      <div className="space-y-6 max-w-lg mx-auto">
                        <div className="p-6 rounded-2xl border-2 border-border bg-background">
                          <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                              <Briefcase className="w-7 h-7 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-lg">Private Office Desks</div>
                              <div className="text-muted-foreground mb-4">
                                Dedicated desks in a private suite
                              </div>
                              <div className="flex items-center gap-4">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-10 w-10 rounded-full"
                                  onClick={() => setPreferences({ 
                                    ...preferences, 
                                    privateOfficeDesks: Math.max(0, (preferences.privateOfficeDesks || 0) - 1) 
                                  })}
                                  disabled={(preferences.privateOfficeDesks || 0) === 0}
                                  data-testid="button-decrease-private-desks"
                                >
                                  -
                                </Button>
                                <span className="w-16 text-center text-2xl font-semibold" data-testid="text-private-desks-count">
                                  {preferences.privateOfficeDesks || 0}
                                </span>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-10 w-10 rounded-full"
                                  onClick={() => setPreferences({ 
                                    ...preferences, 
                                    privateOfficeDesks: (preferences.privateOfficeDesks || 0) + 1 
                                  })}
                                  data-testid="button-increase-private-desks"
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 rounded-2xl border-2 border-border bg-background">
                          <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                              <Users className="w-7 h-7 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-lg">Hybrid Memberships</div>
                              <div className="text-muted-foreground mb-4">
                                Flexible access for distributed team members
                              </div>
                              <div className="flex items-center gap-4">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-10 w-10 rounded-full"
                                  onClick={() => setPreferences({ 
                                    ...preferences, 
                                    hybridMemberships: Math.max(0, (preferences.hybridMemberships || 0) - 1) 
                                  })}
                                  disabled={(preferences.hybridMemberships || 0) === 0}
                                  data-testid="button-decrease-hybrid"
                                >
                                  -
                                </Button>
                                <span className="w-16 text-center text-2xl font-semibold" data-testid="text-hybrid-count">
                                  {preferences.hybridMemberships || 0}
                                </span>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-10 w-10 rounded-full"
                                  onClick={() => setPreferences({ 
                                    ...preferences, 
                                    hybridMemberships: (preferences.hybridMemberships || 0) + 1 
                                  })}
                                  data-testid="button-increase-hybrid"
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {((preferences.privateOfficeDesks || 0) > 0 || (preferences.hybridMemberships || 0) > 0) && (
                          <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                            <div className="text-center">
                              <span className="text-2xl font-semibold">
                                {(preferences.privateOfficeDesks || 0) + (preferences.hybridMemberships || 0)}
                              </span>
                              <span className="text-muted-foreground ml-2">total seats configured</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="space-y-8">
                      <div className="text-center mb-12">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Zap className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="font-serif text-4xl mb-4">Tech & Amenities</h1>
                        <p className="text-xl text-muted-foreground max-w-md mx-auto">
                          What matters most to your team's day-to-day experience?
                        </p>
                      </div>

                      <div className="space-y-8 max-w-lg mx-auto">
                        <div>
                          <Label className="text-base mb-4 block">Technology needs</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {TECH_NEEDS.map((tech) => {
                              const Icon = tech.icon;
                              const selected = isSelected("techStack", tech.id);
                              return (
                                <button
                                  key={tech.id}
                                  onClick={() => toggleArrayItem("techStack", tech.id)}
                                  className={cn(
                                    "p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3",
                                    selected
                                      ? "bg-primary/5 border-primary"
                                      : "bg-background border-border hover:border-primary/50"
                                  )}
                                  data-testid={`button-tech-${tech.id}`}
                                >
                                  <Icon className={cn("w-5 h-5", selected ? "text-primary" : "text-muted-foreground")} />
                                  <span className="font-medium text-sm">{tech.label}</span>
                                  {selected && <Check className="w-4 h-4 text-primary ml-auto" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <Label className="text-base mb-4 block">Amenities that matter to your team</Label>
                          <div className="flex flex-wrap gap-2">
                            {AMENITIES.map((amenity) => {
                              const selected = isSelected("amenities", amenity.id);
                              return (
                                <button
                                  key={amenity.id}
                                  onClick={() => toggleArrayItem("amenities", amenity.id)}
                                  className={cn(
                                    "px-4 py-2 rounded-full border-2 text-sm transition-all flex items-center gap-2",
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
                    </div>
                  )}

                  {step === 6 && (
                    <div className="space-y-8">
                      <div className="text-center mb-12">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <MessageSquare className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="font-serif text-4xl mb-4">Anything Else?</h1>
                        <p className="text-xl text-muted-foreground max-w-md mx-auto">
                          This is your chance to share anything on your mind. We're listening.
                        </p>
                      </div>

                      <div className="space-y-6 max-w-lg mx-auto">
                        <div>
                          <Label htmlFor="idealDay" className="text-base">
                            Describe your ideal workday at 355 Main
                          </Label>
                          <p className="text-sm text-muted-foreground mb-3">
                            Paint us a picture. What would make this the perfect workspace for you?
                          </p>
                          <Textarea
                            id="idealDay"
                            placeholder="e.g. I arrive to a perfectly brewed coffee, have productive morning meetings in inspiring spaces, find quiet nooks for deep work, and end the day on the terrace networking with fellow innovators..."
                            value={preferences.idealDayDescription || ""}
                            onChange={(e) => setPreferences({ ...preferences, idealDayDescription: e.target.value })}
                            className="min-h-[140px]"
                            data-testid="input-ideal-day"
                          />
                        </div>

                        <div>
                          <Label htmlFor="additionalThoughts" className="text-base">
                            Any other thoughts, questions, or special requests?
                          </Label>
                          <p className="text-sm text-muted-foreground mb-3">
                            We genuinely want to hear from you. No request is too small.
                          </p>
                          <Textarea
                            id="additionalThoughts"
                            placeholder="Tell us anything else that's on your mind..."
                            value={preferences.additionalThoughts || ""}
                            onChange={(e) => setPreferences({ ...preferences, additionalThoughts: e.target.value })}
                            className="min-h-[120px]"
                            data-testid="input-additional-thoughts"
                          />
                        </div>

                        <div className="bg-muted/50 rounded-xl p-6 text-center">
                          <p className="text-muted-foreground">
                            Thank you for taking the time to share your vision. Every response helps us create something truly special.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {!completed && (
          <div className="border-t bg-background px-6 py-4">
            <div className="max-w-2xl mx-auto flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={step === 1 ? handleClose : handleBack}
                className="gap-2"
                data-testid="button-waitlist-back"
              >
                {step === 1 ? (
                  "Cancel"
                ) : (
                  <>
                    <ChevronLeft className="w-4 h-4" /> Back
                  </>
                )}
              </Button>
              
              <div className="flex items-center gap-4">
                {step < TOTAL_STEPS && (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="button-waitlist-skip"
                  >
                    Skip this step
                  </button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={(step === 1 && !memberData.email) || mutation.isPending}
                  size="lg"
                  className="gap-2 min-w-[140px]"
                  data-testid="button-waitlist-next"
                >
                  {mutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : step === TOTAL_STEPS ? (
                    <>
                      <Check className="w-4 h-4" /> Join Waitlist
                    </>
                  ) : (
                    <>
                      Continue <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
