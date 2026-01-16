import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Building2, 
  CalendarDays, 
  CreditCard, 
  Settings, 
  LogOut,
  Loader2,
  MapPin,
  Users,
  Zap,
  Crown,
  Mail,
  UserPlus,
  Sparkles,
  Coffee,
  Bell
} from "lucide-react";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading, member, preferences, organization, teamMembers, isAdmin, logout } = useAuth();
  const { toast } = useToast();
  const [arrivalDialogOpen, setArrivalDialogOpen] = useState(false);
  const [arrivalEta, setArrivalEta] = useState("15");
  const [guestCount, setGuestCount] = useState("0");
  const [guestNames, setGuestNames] = useState("");
  const [submittingArrival, setSubmittingArrival] = useState(false);

  const handleArrivalSubmit = async () => {
    setSubmittingArrival(true);
    try {
      const etaMinutes = Math.max(1, parseInt(arrivalEta) || 15);
      const guests = parseInt(guestCount) || 0;
      
      const res = await fetch("/api/member/arriving", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estimatedArrival: new Date(Date.now() + etaMinutes * 60 * 1000).toISOString(),
          guestCount: guests,
          guestNames: guests > 0 ? (guestNames || null) : null
        })
      });
      const data = await res.json();
      if (data.success) {
        toast({ 
          title: data.arrival ? "Arrival announced" : "Note", 
          description: data.message || "Hospitality team has been notified!" 
        });
        setArrivalDialogOpen(false);
        setArrivalEta("15");
        setGuestCount("0");
        setGuestNames("");
      }
    } catch (e) {
      console.error("Arrival error:", e);
      toast({ title: "Error", description: "Failed to announce arrival", variant: "destructive" });
    } finally {
      setSubmittingArrival(false);
    }
  };

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

  const memberName = member.firstName 
    ? `${member.firstName}${member.lastName ? ` ${member.lastName}` : ""}`
    : member.email;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight" data-testid="text-member-name">
                Welcome, {memberName}
              </h1>
              <p className="text-muted-foreground mt-1">
                Your 355 Main membership dashboard
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={logout}
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card data-testid="card-profile">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profile</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                  {member.company && (
                    <p className="text-sm">
                      <span className="text-muted-foreground">Organization:</span>{" "}
                      {member.company}
                    </p>
                  )}
                  {member.jobRole && (
                    <p className="text-sm">
                      <span className="text-muted-foreground">Role:</span>{" "}
                      {member.jobRole}
                    </p>
                  )}
                </div>
                <Button variant="link" className="p-0 h-auto mt-4" data-testid="button-edit-profile">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card data-testid="card-workspace">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Your Workspace</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {preferences?.privateOfficeDesks || preferences?.hybridMemberships ? (
                  <div className="space-y-2">
                    {preferences.privateOfficeDesks && preferences.privateOfficeDesks > 0 && (
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {preferences.privateOfficeDesks} Private Office Desk{preferences.privateOfficeDesks > 1 ? 's' : ''}
                        </Badge>
                      </div>
                    )}
                    {preferences.hybridMemberships && preferences.hybridMemberships > 0 && (
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {preferences.hybridMemberships} Hybrid Membership{preferences.hybridMemberships > 1 ? 's' : ''}
                        </Badge>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No workspace configured yet</p>
                )}
                <Button variant="link" className="p-0 h-auto mt-4" data-testid="button-configure-workspace">
                  Configure Workspace
                </Button>
              </CardContent>
            </Card>

            <Card data-testid="card-membership">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Membership</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {member?.subscriptionTier && member.subscriptionTier !== "free" ? (
                  <>
                    <Badge className={
                      member.subscriptionStatus === "active" 
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                    }>
                      {member.subscriptionTier === "hybrid" ? "Hybrid" : "Private Office"}
                      {member.subscriptionStatus === "active" ? " - Active" : ` - ${member.subscriptionStatus}`}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">
                      {member.subscriptionTier === "hybrid" ? "$299/month" : "$599/month"}
                    </p>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto mt-4" 
                      data-testid="button-manage-subscription"
                      onClick={async () => {
                        try {
                          const res = await fetch("/api/stripe/create-portal-session", { method: "POST" });
                          const data = await res.json();
                          if (data.url) window.location.href = data.url;
                        } catch (e) {
                          console.error("Portal session error:", e);
                        }
                      }}
                    >
                      Manage Subscription
                    </Button>
                  </>
                ) : (
                  <>
                    <Badge className="bg-slate-500/10 text-slate-600 border-slate-500/20">
                      Explorer (Free)
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">
                      Day pass access • Opening February 2026
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        data-testid="button-upgrade-hybrid"
                        onClick={async () => {
                          try {
                            const res = await fetch("/api/stripe/create-checkout-session", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ tier: "hybrid" }),
                            });
                            const data = await res.json();
                            if (data.url) window.location.href = data.url;
                          } catch (e) {
                            console.error("Checkout error:", e);
                          }
                        }}
                      >
                        Upgrade to Hybrid
                      </Button>
                      <Button 
                        size="sm"
                        data-testid="button-upgrade-private"
                        onClick={async () => {
                          try {
                            const res = await fetch("/api/stripe/create-checkout-session", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ tier: "private" }),
                            });
                            const data = await res.json();
                            if (data.url) window.location.href = data.url;
                          } catch (e) {
                            console.error("Checkout error:", e);
                          }
                        }}
                      >
                        Upgrade to Private
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          <div className="grid gap-6 md:grid-cols-2">
            <Card data-testid="card-upcoming">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Upcoming
                </CardTitle>
                <CardDescription>Your reservations and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>No upcoming reservations</p>
                  <Button variant="outline" className="mt-4" data-testid="button-book-space">
                    Book a Space
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-quick-actions">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex flex-col items-center gap-2" 
                    data-testid="button-preferences"
                    onClick={() => setLocation("/preferences")}
                  >
                    <Sparkles className="h-5 w-5" />
                    <span className="text-xs">My Preferences</span>
                  </Button>
                  <Dialog open={arrivalDialogOpen} onOpenChange={setArrivalDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 flex flex-col items-center gap-2" 
                        data-testid="button-arriving"
                      >
                        <Bell className="h-5 w-5" />
                        <span className="text-xs">I'm Arriving</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Announce Your Arrival</DialogTitle>
                        <DialogDescription>
                          Let our hospitality team know you're on your way so your drink is ready.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="eta">Arriving in (minutes)</Label>
                          <Input
                            id="eta"
                            type="number"
                            min="1"
                            max="120"
                            value={arrivalEta}
                            onChange={(e) => setArrivalEta(e.target.value)}
                            data-testid="input-arrival-eta"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="guests">Number of Guests</Label>
                          <Input
                            id="guests"
                            type="number"
                            min="0"
                            max="20"
                            value={guestCount}
                            onChange={(e) => setGuestCount(e.target.value)}
                            data-testid="input-guest-count"
                          />
                        </div>
                        {parseInt(guestCount) > 0 && (
                          <div className="space-y-2">
                            <Label htmlFor="guest-names">Guest Names</Label>
                            <Input
                              id="guest-names"
                              placeholder="e.g., John Smith, Jane Doe"
                              value={guestNames}
                              onChange={(e) => setGuestNames(e.target.value)}
                              data-testid="input-guest-names"
                            />
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setArrivalDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleArrivalSubmit} disabled={submittingArrival} data-testid="button-confirm-arrival">
                          {submittingArrival ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Bell className="h-4 w-4 mr-2" />}
                          Notify Team
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" data-testid="button-floor-plan">
                    <MapPin className="h-5 w-5" />
                    <span className="text-xs">Floor Plan</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex flex-col items-center gap-2" 
                    data-testid="button-hospitality"
                    onClick={() => setLocation("/hospitality")}
                  >
                    <Coffee className="h-5 w-5" />
                    <span className="text-xs">Hospitality</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          <Card data-testid="card-amenities">
            <CardHeader>
              <CardTitle>Amenity Preferences</CardTitle>
              <CardDescription>Your selected amenities and workspace features</CardDescription>
            </CardHeader>
            <CardContent>
              {preferences?.amenities && preferences.amenities.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {preferences.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" data-testid={`badge-amenity-${index}`}>
                      {amenity}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No amenities selected yet</p>
              )}
            </CardContent>
          </Card>

          {/* Organization Admin Section */}
          {isAdmin && organization && (
            <>
              <Separator className="my-8" />
              
              <Card data-testid="card-organization">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        {organization.name}
                        <Badge variant="outline" className="ml-2">
                          <Crown className="h-3 w-3 mr-1" />
                          Admin
                        </Badge>
                      </CardTitle>
                      <CardDescription>Organization management</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" data-testid="button-invite-member">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Invite Member
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="text-sm font-medium mb-4">Team Members ({teamMembers.length})</h4>
                  {teamMembers.length > 0 ? (
                    <div className="space-y-3">
                      {teamMembers.map((teamMember) => (
                        <div 
                          key={teamMember.id} 
                          className="flex items-center justify-between p-3 rounded-lg border"
                          data-testid={`team-member-${teamMember.id}`}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="text-xs">
                                {teamMember.firstName?.[0] || teamMember.email[0]?.toUpperCase() || '?'}
                                {teamMember.lastName?.[0] || ''}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {teamMember.firstName && teamMember.lastName 
                                  ? `${teamMember.firstName} ${teamMember.lastName}`
                                  : teamMember.email}
                              </p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {teamMember.email}
                              </p>
                            </div>
                          </div>
                          <Badge variant={teamMember.role === "admin" ? "default" : "secondary"}>
                            {teamMember.role === "admin" ? (
                              <>
                                <Crown className="h-3 w-3 mr-1" />
                                Admin
                              </>
                            ) : "Member"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No team members yet. Invite your team to get started.</p>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {/* Create Organization Prompt for Non-Org Members */}
          {!organization && (
            <>
              <Separator className="my-8" />
              
              <Card data-testid="card-create-organization">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Organization
                  </CardTitle>
                  <CardDescription>Create or join an organization to manage your team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                    <p className="text-muted-foreground mb-4">You're not part of an organization yet</p>
                    <div className="flex gap-3 justify-center">
                      <Button variant="outline" data-testid="button-join-organization">
                        Join Organization
                      </Button>
                      <Button data-testid="button-create-organization">
                        <Building2 className="h-4 w-4 mr-2" />
                        Create Organization
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
