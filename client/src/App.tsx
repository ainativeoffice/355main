import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleAnalytics } from "@/components/google-analytics";
import { ErrorBoundary } from "@/components/error-boundary";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

const Brokers = lazy(() => import("@/pages/brokers"));
const Enterprise = lazy(() => import("@/pages/enterprise"));
const Landlords = lazy(() => import("@/pages/landlords"));
const Solutions = lazy(() => import("@/pages/solutions"));
const CustomOffices = lazy(() => import("@/pages/solutions/custom-offices"));
const PrivateOffices = lazy(() => import("@/pages/solutions/private-offices"));
const HybridMemberships = lazy(() => import("@/pages/solutions/hybrid"));
const AdminLogin = lazy(() => import("@/pages/admin/login"));
const AdminDashboard = lazy(() => import("@/pages/admin/index"));
const MemberDashboard = lazy(() => import("@/pages/dashboard"));
const MemberPreferences = lazy(() => import("@/pages/preferences"));
const HospitalityDashboard = lazy(() => import("@/pages/hospitality"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/brokers" component={Brokers} />
        <Route path="/enterprise" component={Enterprise} />
        <Route path="/landlords" component={Landlords} />
        <Route path="/solutions" component={Solutions} />
        <Route path="/solutions/custom-offices" component={CustomOffices} />
        <Route path="/solutions/private-offices" component={PrivateOffices} />
        <Route path="/solutions/hybrid" component={HybridMemberships} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/dashboard" component={MemberDashboard} />
        <Route path="/preferences" component={MemberPreferences} />
        <Route path="/hospitality" component={HospitalityDashboard} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <GoogleAnalytics />
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
