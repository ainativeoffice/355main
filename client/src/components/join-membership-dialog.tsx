import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ChevronRight, ChevronLeft, Loader2, Users, Monitor, Wifi, Coffee, Zap, Building2, Plus, Trash2, X, Sparkles } from "lucide-react";
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

const STAGES = [
  { id: 1, title: "Welcome", subtitle: "Let's get started" },
  { id: 2, title: "About You", subtitle: "Tell us who you are" },
  { id: 3, title: "Your Team", subtitle: "Size & timing" },
  { id: 4, title: "Workspace", subtitle: "Design your space" },
  { id: 5, title: "Amenities", subtitle: "The finishing touches" },
];

const TEAM_SIZES = [
  { id: "1", label: "Just me", desc: "Solo professional" },
  { id: "2-5", label: "2-5 people", desc: "Small team" },
  { id: "6-15", label: "6-15 people", desc: "Growing team" },
  { id: "16-30", label: "16-30 people", desc: "Department" },
  { id: "30+", label: "30+ people", desc: "Enterprise" },
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
    if (step === 2) {
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
    if (step < 5) {
      setStep(step + 1);
    } else {
      mutation.mutate({ member: memberData, preferences });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleClose = () => {
    setStep(1);
    setMemberData({ email: "" });
    setPreferences({});
    setCompleted(false);
    setEmailError(null);
    onOpenChange(false);
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

  if (!open) return null;

  const pageVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
      
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-muted/50 hover:bg-muted transition-colors"
        data-testid="button-waitlist-close"
      >
        <X className="w-5 h-5" />
      </button>

      {completed ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative h-full flex items-center justify-center px-6"
        >
          <div className="max-w-2xl text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-10"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Sparkles className="w-12 h-12 text-primary" />
              </motion.div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-4xl md:text-6xl mb-6"
            >
              We've Heard You
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-4 leading-relaxed"
            >
              Thank you for your interest in Opus 355.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-lg mx-auto"
            >
              Our team is carefully reviewing your workspace requirements and will reach out personally to discuss your vision.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-muted/30 backdrop-blur rounded-2xl p-8 mb-12 text-left max-w-md mx-auto border border-border/50"
            >
              <h3 className="font-medium text-lg mb-3">What happens next?</h3>
              <p className="text-muted-foreground leading-relaxed">
                An Opus team member will reach out within <span className="text-foreground font-medium">1-2 business days</span> to schedule a personalized tour and explore how we can create the perfect environment for your team.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button 
                onClick={handleClose} 
                size="lg"
                className="px-12 py-6 text-lg rounded-full"
                data-testid="button-waitlist-done"
              >
                Done
              </Button>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <div className="relative h-full flex">
          <div className="hidden lg:flex w-80 bg-muted/30 border-r border-border/50 flex-col justify-center px-8">
            <div className="space-y-1">
              {STAGES.map((stage, index) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "py-4 px-4 rounded-xl transition-all duration-300",
                    step === stage.id ? "bg-background shadow-sm" : "",
                    step > stage.id ? "opacity-60" : ""
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                      step === stage.id ? "bg-primary text-primary-foreground" : "",
                      step > stage.id ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                    )}>
                      {step > stage.id ? <Check className="w-4 h-4" /> : stage.id}
                    </div>
                    <div>
                      <div className={cn(
                        "font-medium transition-colors",
                        step === stage.id ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {stage.title}
                      </div>
                      <div className="text-sm text-muted-foreground">{stage.subtitle}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="lg:hidden px-6 pt-6">
              <div className="flex gap-2 mb-2">
                {STAGES.map((stage) => (
                  <div
                    key={stage.id}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-all duration-300",
                      step >= stage.id ? "bg-primary" : "bg-muted"
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Step {step} of 5</p>
            </div>

            <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
              <div className="w-full max-w-xl">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="welcome"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="text-center"
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-10"
                      >
                        <Building2 className="w-10 h-10 text-primary" />
                      </motion.div>
                      
                      <h1 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
                        Welcome to<br />Opus 355
                      </h1>
                      
                      <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-md mx-auto">
                        A design-led workplace for the distributed age. Let's find your perfect space.
                      </p>
                      
                      <Button 
                        onClick={handleNext}
                        size="lg"
                        className="px-12 py-6 text-lg rounded-full group"
                        data-testid="button-waitlist-next"
                      >
                        Get Started
                        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="about"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <h1 className="font-serif text-3xl md:text-4xl mb-3">Tell us about yourself</h1>
                      <p className="text-lg text-muted-foreground mb-10">We'd love to know who we're working with.</p>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Email address *</label>
                          <Input
                            type="email"
                            placeholder="you@company.com"
                            value={memberData.email}
                            onChange={(e) => {
                              setMemberData({ ...memberData, email: e.target.value });
                              if (emailError) setEmailError(null);
                            }}
                            className={cn(
                              "h-14 text-lg rounded-xl transition-all",
                              emailError ? "border-destructive ring-destructive/20 ring-4" : "focus:ring-4 focus:ring-primary/20"
                            )}
                            data-testid="input-waitlist-email"
                          />
                          {emailError && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-destructive text-sm mt-2"
                            >
                              {emailError}
                            </motion.p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">First name</label>
                            <Input
                              placeholder="Jane"
                              value={memberData.firstName || ""}
                              onChange={(e) => setMemberData({ ...memberData, firstName: e.target.value })}
                              className="h-14 text-lg rounded-xl focus:ring-4 focus:ring-primary/20 transition-all"
                              data-testid="input-waitlist-firstname"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Last name</label>
                            <Input
                              placeholder="Smith"
                              value={memberData.lastName || ""}
                              onChange={(e) => setMemberData({ ...memberData, lastName: e.target.value })}
                              className="h-14 text-lg rounded-xl focus:ring-4 focus:ring-primary/20 transition-all"
                              data-testid="input-waitlist-lastname"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Organization</label>
                          <Input
                            placeholder="Your company name"
                            value={memberData.company || ""}
                            onChange={(e) => setMemberData({ ...memberData, company: e.target.value })}
                            className="h-14 text-lg rounded-xl focus:ring-4 focus:ring-primary/20 transition-all"
                            data-testid="input-waitlist-organization"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Your role</label>
                          <Input
                            placeholder="e.g. CEO, Office Manager, HR Director"
                            value={memberData.jobRole || ""}
                            onChange={(e) => setMemberData({ ...memberData, jobRole: e.target.value })}
                            className="h-14 text-lg rounded-xl focus:ring-4 focus:ring-primary/20 transition-all"
                            data-testid="input-waitlist-jobrole"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="team"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <h1 className="font-serif text-3xl md:text-4xl mb-3">About your team</h1>
                      <p className="text-lg text-muted-foreground mb-10">Help us understand your workspace needs.</p>
                      
                      <div className="space-y-10">
                        <div>
                          <label className="block text-sm font-medium mb-4">How many people are on your team?</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {TEAM_SIZES.map((size) => (
                              <motion.button
                                key={size.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setMemberData({ ...memberData, teamSize: size.id })}
                                className={cn(
                                  "p-4 rounded-xl border-2 text-left transition-all",
                                  memberData.teamSize === size.id
                                    ? "bg-primary/5 border-primary"
                                    : "bg-background border-border hover:border-primary/50"
                                )}
                                data-testid={`button-teamsize-${size.id}`}
                              >
                                <div className="font-medium">{size.label}</div>
                                <div className="text-sm text-muted-foreground">{size.desc}</div>
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-4">When are you looking to move in?</label>
                          <div className="flex flex-wrap gap-3">
                            {MOVE_IN_TIMING.map((timing) => (
                              <motion.button
                                key={timing.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setMemberData({ ...memberData, moveInTiming: timing.id })}
                                className={cn(
                                  "px-5 py-3 rounded-full border-2 text-sm font-medium transition-all",
                                  memberData.moveInTiming === timing.id
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-background border-border hover:border-primary/50"
                                )}
                                data-testid={`button-timing-${timing.id}`}
                              >
                                {timing.label}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="workspace"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <h1 className="font-serif text-3xl md:text-4xl mb-3">Design your workspace</h1>
                      <p className="text-lg text-muted-foreground mb-10">Configure your ideal office setup.</p>
                      
                      <div className="space-y-6">
                        <div className="p-6 rounded-2xl border-2 border-border bg-muted/20">
                          <div className="flex items-start gap-4 mb-6">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                              <Building2 className="w-7 h-7 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-lg">Private Offices</div>
                              <div className="text-muted-foreground">
                                Add offices and specify how many desks each needs
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {(preferences.privateOffices || []).map((office, index) => (
                              <motion.div 
                                key={office.id}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border"
                              >
                                <span className="text-sm font-medium text-muted-foreground w-20">
                                  Office {index + 1}
                                </span>
                                <div className="flex items-center gap-3 flex-1">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 rounded-full"
                                    onClick={() => updateOfficeDesks(office.id, office.desks - 1)}
                                    disabled={office.desks <= 1}
                                    data-testid={`button-decrease-office-${index}-desks`}
                                  >
                                    -
                                  </Button>
                                  <span className="w-12 text-center text-lg font-medium" data-testid={`text-office-${index}-desks`}>
                                    {office.desks}
                                  </span>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 rounded-full"
                                    onClick={() => updateOfficeDesks(office.id, office.desks + 1)}
                                    data-testid={`button-increase-office-${index}-desks`}
                                  >
                                    +
                                  </Button>
                                  <span className="text-muted-foreground">desks</span>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-10 w-10 text-muted-foreground hover:text-destructive rounded-full"
                                  onClick={() => removePrivateOffice(office.id)}
                                  data-testid={`button-remove-office-${index}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </motion.div>
                            ))}
                            
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full h-14 rounded-xl border-dashed border-2"
                              onClick={addPrivateOffice}
                              data-testid="button-add-office"
                            >
                              <Plus className="w-5 h-5 mr-2" />
                              Add Private Office
                            </Button>
                          </div>
                        </div>

                        <div className="p-6 rounded-2xl border-2 border-border bg-muted/20">
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
                                  className="h-12 w-12 rounded-full text-lg"
                                  onClick={() => setPreferences({ 
                                    ...preferences, 
                                    hybridMemberships: Math.max(0, (preferences.hybridMemberships || 0) - 1) 
                                  })}
                                  disabled={(preferences.hybridMemberships || 0) === 0}
                                  data-testid="button-decrease-hybrid"
                                >
                                  -
                                </Button>
                                <span className="w-16 text-center text-2xl font-medium" data-testid="text-hybrid-count">
                                  {preferences.hybridMemberships || 0}
                                </span>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-12 w-12 rounded-full text-lg"
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

                        {totalSeats > 0 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-primary/5 rounded-2xl p-6 border-2 border-primary/20"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-lg">Your configuration</span>
                              <span className="text-lg font-semibold text-primary">
                                {totalSeats} seat{totalSeats !== 1 ? 's' : ''}
                              </span>
                            </div>
                            <div className="text-muted-foreground mt-1">
                              {(preferences.privateOffices || []).length > 0 && (
                                <span>
                                  {(preferences.privateOffices || []).length} office{(preferences.privateOffices || []).length !== 1 ? 's' : ''} ({totalPrivateDesks} desk{totalPrivateDesks !== 1 ? 's' : ''})
                                </span>
                              )}
                              {(preferences.privateOffices || []).length > 0 && (preferences.hybridMemberships || 0) > 0 && ' + '}
                              {(preferences.hybridMemberships || 0) > 0 && (
                                <span>
                                  {preferences.hybridMemberships} hybrid
                                </span>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div
                      key="amenities"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <h1 className="font-serif text-3xl md:text-4xl mb-3">The finishing touches</h1>
                      <p className="text-lg text-muted-foreground mb-10">Select the technology and amenities that matter to you.</p>
                      
                      <div className="space-y-10">
                        <div>
                          <label className="block text-sm font-medium mb-4">Technology needs</label>
                          <div className="grid grid-cols-2 gap-3">
                            {TECH_STACK.map((tech) => {
                              const Icon = tech.icon;
                              const selected = isSelected("techStack", tech.id);
                              return (
                                <motion.button
                                  key={tech.id}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => toggleArrayItem("techStack", tech.id)}
                                  className={cn(
                                    "p-4 rounded-xl border-2 text-left transition-all",
                                    selected
                                      ? "bg-primary/5 border-primary"
                                      : "bg-background border-border hover:border-primary/50"
                                  )}
                                  data-testid={`button-tech-${tech.id}`}
                                >
                                  <div className="flex items-center gap-3 mb-2">
                                    <Icon className={cn("w-5 h-5", selected ? "text-primary" : "text-muted-foreground")} />
                                    <span className="font-medium">{tech.label}</span>
                                    {selected && <Check className="w-4 h-4 text-primary ml-auto" />}
                                  </div>
                                  <p className="text-sm text-muted-foreground">{tech.desc}</p>
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-4">Amenities</label>
                          <div className="flex flex-wrap gap-3">
                            {AMENITIES.map((amenity) => {
                              const selected = isSelected("amenities", amenity.id);
                              return (
                                <motion.button
                                  key={amenity.id}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => toggleArrayItem("amenities", amenity.id)}
                                  className={cn(
                                    "px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-all flex items-center gap-2",
                                    selected
                                      ? "bg-primary text-primary-foreground border-primary"
                                      : "bg-background border-border hover:border-primary/50"
                                  )}
                                  data-testid={`button-amenity-${amenity.id}`}
                                >
                                  {amenity.label}
                                  {selected && <Check className="w-3.5 h-3.5" />}
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {step > 1 && !completed && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 py-6 border-t border-border/50 bg-background/80 backdrop-blur"
              >
                <div className="max-w-xl mx-auto flex justify-between items-center">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="px-6 py-3 rounded-full"
                    data-testid="button-waitlist-back"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={mutation.isPending}
                    size="lg"
                    className="px-10 py-6 rounded-full group"
                    data-testid="button-waitlist-next"
                  >
                    {mutation.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : step === 5 ? (
                      "Join Waitlist"
                    ) : (
                      <>
                        Continue
                        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
