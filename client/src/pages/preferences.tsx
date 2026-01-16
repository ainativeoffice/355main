import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/use-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Coffee, 
  Thermometer,
  Lightbulb,
  MapPin,
  Bell,
  Calendar,
  MapPinned,
  Cake,
  UtensilsCrossed,
  ArrowLeft,
  Loader2,
  Save,
  Sparkles
} from "lucide-react";

const MORNING_BEVERAGES = [
  "Espresso",
  "Americano", 
  "Latte",
  "Oat Milk Latte",
  "Cappuccino",
  "Flat White",
  "Pour-Over Coffee",
  "Cold Brew",
  "Matcha Latte",
  "Chai Latte",
  "English Breakfast Tea",
  "Green Tea",
  "Herbal Tea",
  "Hot Chocolate",
  "None"
];

const AFTERNOON_BEVERAGES = [
  "Sparkling Water",
  "Still Water with Lemon",
  "Iced Coffee",
  "Iced Tea",
  "Fresh Juice",
  "Kombucha",
  "Smoothie",
  "Espresso",
  "Decaf Coffee",
  "Herbal Tea",
  "None"
];

const ZONES = [
  "The Forum",
  "The Agora",
  "The Workshop",
  "The Studio",
  "The Library",
  "The Lounge",
  "Private Office A",
  "Private Office B"
];

const DIETARY_OPTIONS = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Nut-Free",
  "Kosher",
  "Halal",
  "Low-Sugar"
];

export default function Preferences() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading, member, preferences } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    morningBeverage: preferences?.morningBeverage || "",
    afternoonBeverage: preferences?.afternoonBeverage || "",
    beverageNotes: preferences?.beverageNotes || "",
    temperaturePreference: preferences?.temperaturePreference || "neutral",
    lightingPreference: preferences?.lightingPreference || "neutral",
    preferredZone: preferences?.preferredZone || "",
    notifyHospitalityOnArrival: preferences?.notifyHospitalityOnArrival ?? true,
    syncWithCalendar: preferences?.syncWithCalendar ?? false,
    enableLocationArrival: preferences?.enableLocationArrival ?? false,
    birthday: preferences?.birthday || "",
    dietaryRestrictions: preferences?.dietaryRestrictions || [],
    specialNotes: preferences?.specialNotes || ""
  });

  useEffect(() => {
    if (preferences) {
      setFormData({
        morningBeverage: preferences.morningBeverage || "",
        afternoonBeverage: preferences.afternoonBeverage || "",
        beverageNotes: preferences.beverageNotes || "",
        temperaturePreference: preferences.temperaturePreference || "neutral",
        lightingPreference: preferences.lightingPreference || "neutral",
        preferredZone: preferences.preferredZone || "",
        notifyHospitalityOnArrival: preferences.notifyHospitalityOnArrival ?? true,
        syncWithCalendar: preferences.syncWithCalendar ?? false,
        enableLocationArrival: preferences.enableLocationArrival ?? false,
        birthday: preferences.birthday || "",
        dietaryRestrictions: preferences.dietaryRestrictions || [],
        specialNotes: preferences.specialNotes || ""
      });
    }
  }, [preferences]);

  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch("/api/member/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Failed to save preferences");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      toast({
        title: "Preferences saved",
        description: "Your hospitality preferences have been updated."
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive"
      });
    }
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/");
    }
  }, [isLoading, isAuthenticated, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || !member) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  const toggleDietary = (item: string) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(item)
        ? prev.dietaryRestrictions.filter((d: string) => d !== item)
        : [...prev.dietaryRestrictions, item]
    }));
  };

  const handleSave = () => {
    saveMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setLocation("/dashboard")}
                data-testid="button-back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2" data-testid="text-page-title">
                  <Sparkles className="h-7 w-7 text-primary" />
                  My Preferences
                </h1>
                <p className="text-muted-foreground mt-1">
                  Personalize your 355 Main experience
                </p>
              </div>
            </div>
            <Button 
              onClick={handleSave}
              disabled={saveMutation.isPending}
              data-testid="button-save-preferences"
            >
              {saveMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Preferences
            </Button>
          </div>

          <div className="space-y-6">
            <Card data-testid="card-beverages">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coffee className="h-5 w-5" />
                  Beverage Preferences
                </CardTitle>
                <CardDescription>
                  Let us know your preferred drinks so they're ready when you arrive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="morning-beverage">Morning Drink</Label>
                    <Select 
                      value={formData.morningBeverage} 
                      onValueChange={v => setFormData(prev => ({ ...prev, morningBeverage: v }))}
                    >
                      <SelectTrigger id="morning-beverage" data-testid="select-morning-beverage">
                        <SelectValue placeholder="Select your morning drink" />
                      </SelectTrigger>
                      <SelectContent>
                        {MORNING_BEVERAGES.map(bev => (
                          <SelectItem key={bev} value={bev}>{bev}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="afternoon-beverage">Afternoon Drink</Label>
                    <Select 
                      value={formData.afternoonBeverage} 
                      onValueChange={v => setFormData(prev => ({ ...prev, afternoonBeverage: v }))}
                    >
                      <SelectTrigger id="afternoon-beverage" data-testid="select-afternoon-beverage">
                        <SelectValue placeholder="Select your afternoon drink" />
                      </SelectTrigger>
                      <SelectContent>
                        {AFTERNOON_BEVERAGES.map(bev => (
                          <SelectItem key={bev} value={bev}>{bev}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beverage-notes">Special Instructions</Label>
                  <Textarea 
                    id="beverage-notes"
                    placeholder='e.g., "Extra hot, light foam" or "Oat milk only"'
                    value={formData.beverageNotes}
                    onChange={e => setFormData(prev => ({ ...prev, beverageNotes: e.target.value }))}
                    data-testid="input-beverage-notes"
                  />
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-workspace-comfort">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5" />
                  Workspace Comfort
                </CardTitle>
                <CardDescription>
                  Your ideal workspace environment settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4" />
                        Temperature
                      </Label>
                      <span className="text-sm text-muted-foreground capitalize">
                        {formData.temperaturePreference}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">Cool</span>
                      <Slider
                        value={[formData.temperaturePreference === "cool" ? 0 : formData.temperaturePreference === "warm" ? 100 : 50]}
                        onValueChange={(values) => {
                          const v = values[0] ?? 50;
                          const pref = v < 33 ? "cool" : v > 66 ? "warm" : "neutral";
                          setFormData(prev => ({ ...prev, temperaturePreference: pref }));
                        }}
                        max={100}
                        step={1}
                        className="flex-1"
                        data-testid="slider-temperature"
                      />
                      <span className="text-sm text-muted-foreground">Warm</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Lighting
                      </Label>
                      <span className="text-sm text-muted-foreground capitalize">
                        {formData.lightingPreference}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">Bright</span>
                      <Slider
                        value={[formData.lightingPreference === "bright" ? 0 : formData.lightingPreference === "dim" ? 100 : 50]}
                        onValueChange={(values) => {
                          const v = values[0] ?? 50;
                          const pref = v < 33 ? "bright" : v > 66 ? "dim" : "neutral";
                          setFormData(prev => ({ ...prev, lightingPreference: pref }));
                        }}
                        max={100}
                        step={1}
                        className="flex-1"
                        data-testid="slider-lighting"
                      />
                      <span className="text-sm text-muted-foreground">Dim</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="preferred-zone" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Preferred Zone
                  </Label>
                  <Select 
                    value={formData.preferredZone} 
                    onValueChange={v => setFormData(prev => ({ ...prev, preferredZone: v }))}
                  >
                    <SelectTrigger id="preferred-zone" data-testid="select-preferred-zone">
                      <SelectValue placeholder="Select your preferred workspace zone" />
                    </SelectTrigger>
                    <SelectContent>
                      {ZONES.map(zone => (
                        <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-arrival-settings">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Arrival Settings
                </CardTitle>
                <CardDescription>
                  How we notify the hospitality team when you arrive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      Notify hospitality when I arrive
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Hospitality team will prepare your preferred drink
                    </p>
                  </div>
                  <Switch
                    checked={formData.notifyHospitalityOnArrival}
                    onCheckedChange={v => setFormData(prev => ({ ...prev, notifyHospitalityOnArrival: v }))}
                    data-testid="switch-notify-hospitality"
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Sync with my calendar
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Detect arrival based on your first meeting of the day
                    </p>
                  </div>
                  <Switch
                    checked={formData.syncWithCalendar}
                    onCheckedChange={v => setFormData(prev => ({ ...prev, syncWithCalendar: v }))}
                    data-testid="switch-sync-calendar"
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <MapPinned className="h-4 w-4" />
                      Enable location-based arrival
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when you're 5 minutes away (requires app)
                    </p>
                  </div>
                  <Switch
                    checked={formData.enableLocationArrival}
                    onCheckedChange={v => setFormData(prev => ({ ...prev, enableLocationArrival: v }))}
                    data-testid="switch-location-arrival"
                  />
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-special-touches">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cake className="h-5 w-5" />
                  Special Touches
                </CardTitle>
                <CardDescription>
                  Help us make your experience exceptional
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="birthday" className="flex items-center gap-2">
                    <Cake className="h-4 w-4" />
                    Birthday
                  </Label>
                  <Input
                    id="birthday"
                    type="text"
                    placeholder="e.g., March 15"
                    value={formData.birthday}
                    onChange={e => setFormData(prev => ({ ...prev, birthday: e.target.value }))}
                    data-testid="input-birthday"
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll make sure to celebrate with you!
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <UtensilsCrossed className="h-4 w-4" />
                    Dietary Preferences
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {DIETARY_OPTIONS.map(diet => (
                      <Badge
                        key={diet}
                        variant={formData.dietaryRestrictions.includes(diet) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleDietary(diet)}
                        data-testid={`badge-dietary-${diet.toLowerCase().replace(/[^a-z]/g, '-')}`}
                      >
                        {diet}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="special-notes">Additional Notes</Label>
                  <Textarea
                    id="special-notes"
                    placeholder='e.g., "Prefers quiet corner", "Allergic to strong scents"'
                    value={formData.specialNotes}
                    onChange={e => setFormData(prev => ({ ...prev, specialNotes: e.target.value }))}
                    data-testid="input-special-notes"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex justify-end">
            <Button 
              size="lg"
              onClick={handleSave}
              disabled={saveMutation.isPending}
              data-testid="button-save-preferences-bottom"
            >
              {saveMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Preferences
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
