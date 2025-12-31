import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/use-auth";
import { Button } from "@/components/ui/button";
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
  UserPlus
} from "lucide-react";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading, member, preferences, organization, teamMembers, isAdmin, logout } = useAuth();

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
    return null;
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
                Your Opus 355 membership dashboard
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
                <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                  Waitlist
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Opening February 2026
                </p>
                <Button variant="link" className="p-0 h-auto mt-4" data-testid="button-view-plans">
                  View Plans
                </Button>
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
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" data-testid="button-floor-plan">
                    <MapPin className="h-5 w-5" />
                    <span className="text-xs">Floor Plan</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" data-testid="button-team">
                    <Users className="h-5 w-5" />
                    <span className="text-xs">Team</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" data-testid="button-billing">
                    <CreditCard className="h-5 w-5" />
                    <span className="text-xs">Billing</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" data-testid="button-settings">
                    <Settings className="h-5 w-5" />
                    <span className="text-xs">Settings</span>
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
                                {teamMember.firstName?.[0] || teamMember.email[0].toUpperCase()}
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
