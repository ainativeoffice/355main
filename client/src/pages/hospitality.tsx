import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/use-auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Coffee, 
  MapPin,
  Users,
  Clock,
  Check,
  ArrowLeft,
  Loader2,
  RefreshCw,
  Sparkles,
  User,
  AlertCircle
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ArrivalWithMember {
  id: number;
  memberId: number;
  estimatedArrival: string | null;
  actualArrival: string | null;
  status: string | null;
  guestCount: number | null;
  guestNames: string | null;
  beverageReady: boolean | null;
  notes: string | null;
  createdAt: string | null;
  member: {
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
    company: string | null;
  };
  preferences?: {
    morningBeverage?: string | null;
    afternoonBeverage?: string | null;
    beverageNotes?: string | null;
    preferredZone?: string | null;
    specialNotes?: string | null;
  };
}

export default function Hospitality() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading, member } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: arrivals = [], isLoading: arrivalsLoading, refetch } = useQuery<ArrivalWithMember[]>({
    queryKey: ["/api/hospitality/arrivals"],
    refetchInterval: 30000
  });

  const markReadyMutation = useMutation({
    mutationFn: async (arrivalId: number) => {
      const res = await fetch(`/api/hospitality/arrivals/${arrivalId}/ready`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to mark ready");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/hospitality/arrivals"] });
      toast({ title: "Marked as ready", description: "Beverage is prepared" });
    }
  });

  const markArrivedMutation = useMutation({
    mutationFn: async (arrivalId: number) => {
      const res = await fetch(`/api/hospitality/arrivals/${arrivalId}/arrived`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to mark arrived");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/hospitality/arrivals"] });
      toast({ title: "Member arrived", description: "Arrival confirmed" });
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

  const pendingArrivals = arrivals.filter(a => a.status === "pending");
  const arrivedToday = arrivals.filter(a => a.status === "arrived");

  const getMemberName = (arrival: ArrivalWithMember) => {
    if (arrival.member.firstName && arrival.member.lastName) {
      return `${arrival.member.firstName} ${arrival.member.lastName}`;
    }
    return arrival.member.email;
  };

  const getInitials = (arrival: ArrivalWithMember) => {
    if (arrival.member.firstName && arrival.member.lastName) {
      return `${arrival.member.firstName[0]}${arrival.member.lastName[0]}`;
    }
    return arrival.member.email[0]?.toUpperCase() ?? '?';
  };

  const getBeverageForTime = (prefs?: ArrivalWithMember["preferences"]) => {
    if (!prefs) return null;
    const hour = new Date().getHours();
    return hour < 12 ? prefs.morningBeverage : prefs.afternoonBeverage;
  };

  const getETA = (arrival: ArrivalWithMember) => {
    if (!arrival.estimatedArrival) return "Soon";
    try {
      return formatDistanceToNow(new Date(arrival.estimatedArrival), { addSuffix: true });
    } catch {
      return "Soon";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
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
                  Hospitality Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  Member arrivals and preferences
                </p>
              </div>
            </div>
            <Button 
              variant="outline"
              onClick={() => refetch()}
              disabled={arrivalsLoading}
              data-testid="button-refresh"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${arrivalsLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mb-8">
            <Card data-testid="card-pending-count">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Arriving Soon</p>
                    <p className="text-3xl font-bold">{pendingArrivals.length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-amber-500 opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card data-testid="card-arrived-count">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Arrived Today</p>
                    <p className="text-3xl font-bold">{arrivedToday.length}</p>
                  </div>
                  <Check className="h-8 w-8 text-emerald-500 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6" data-testid="card-arriving-soon">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Arriving Soon
              </CardTitle>
              <CardDescription>
                Members on their way with their preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingArrivals.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <User className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>No pending arrivals</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingArrivals.map(arrival => (
                    <div 
                      key={arrival.id}
                      className="flex items-start justify-between p-4 rounded-lg border bg-card"
                      data-testid={`arrival-card-${arrival.id}`}
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="text-sm font-medium">
                            {getInitials(arrival)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{getMemberName(arrival)}</h3>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {getETA(arrival)}
                            </Badge>
                          </div>
                          
                          {getBeverageForTime(arrival.preferences) && (
                            <div className="flex items-center gap-2 text-sm">
                              <Coffee className="h-4 w-4 text-amber-600" />
                              <span className="font-medium">{getBeverageForTime(arrival.preferences)}</span>
                              {arrival.preferences?.beverageNotes && (
                                <span className="text-muted-foreground">
                                  - {arrival.preferences.beverageNotes}
                                </span>
                              )}
                            </div>
                          )}
                          
                          {arrival.preferences?.preferredZone && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              Heading to {arrival.preferences.preferredZone}
                            </div>
                          )}
                          
                          {arrival.guestCount && arrival.guestCount > 0 && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              Expecting {arrival.guestCount} guest{arrival.guestCount > 1 ? 's' : ''}
                              {arrival.guestNames && `: ${arrival.guestNames}`}
                            </div>
                          )}
                          
                          {arrival.preferences?.specialNotes && (
                            <div className="flex items-center gap-2 text-sm text-amber-600">
                              <AlertCircle className="h-4 w-4" />
                              {arrival.preferences.specialNotes}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {!arrival.beverageReady && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markReadyMutation.mutate(arrival.id)}
                            disabled={markReadyMutation.isPending}
                            data-testid={`button-mark-ready-${arrival.id}`}
                          >
                            <Coffee className="h-4 w-4 mr-1" />
                            Ready
                          </Button>
                        )}
                        {arrival.beverageReady && (
                          <Badge variant="secondary" className="justify-center">
                            <Check className="h-3 w-3 mr-1" />
                            Prepared
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          onClick={() => markArrivedMutation.mutate(arrival.id)}
                          disabled={markArrivedMutation.isPending}
                          data-testid={`button-mark-arrived-${arrival.id}`}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Arrived
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card data-testid="card-arrived-today">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                Arrived Today
              </CardTitle>
              <CardDescription>
                Members who have checked in today
              </CardDescription>
            </CardHeader>
            <CardContent>
              {arrivedToday.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <User className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>No arrivals yet today</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {arrivedToday.map(arrival => (
                    <div 
                      key={arrival.id}
                      className="flex items-center justify-between p-3 rounded-lg border"
                      data-testid={`arrived-card-${arrival.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="text-xs">
                            {getInitials(arrival)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{getMemberName(arrival)}</p>
                          {arrival.actualArrival && (
                            <p className="text-xs text-muted-foreground">
                              Arrived {formatDistanceToNow(new Date(arrival.actualArrival), { addSuffix: true })}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                        <Check className="h-3 w-3 mr-1" />
                        Checked In
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
