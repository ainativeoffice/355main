import { Switch, Route } from "wouter";
import { lazy, Suspense, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/error-boundary";
import { GoogleTagManager } from "@/components/google-tag-manager";
import { CrispChat } from "@/components/crisp-chat";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

const About = lazy(() => import("@/pages/about"));
const Brokers = lazy(() => import("@/pages/brokers"));
const Enterprise = lazy(() => import("@/pages/enterprise"));
const Landlords = lazy(() => import("@/pages/landlords"));
const Solutions = lazy(() => import("@/pages/solutions"));
const CustomOffices = lazy(() => import("@/pages/solutions/custom-offices"));
const PrivateOffices = lazy(() => import("@/pages/solutions/private-offices"));
const HybridMemberships = lazy(() => import("@/pages/solutions/hybrid"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/brokers" component={Brokers} />
        <Route path="/enterprise" component={Enterprise} />
        <Route path="/landlords" component={Landlords} />
        <Route path="/solutions" component={Solutions} />
        <Route path="/solutions/custom-offices" component={CustomOffices} />
        <Route path="/solutions/private-offices" component={PrivateOffices} />
        <Route path="/solutions/hybrid" component={HybridMemberships} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  // Initialize Google Analytics when app loads
  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing Google Analytics Measurement ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <GoogleTagManager />
          <CrispChat />
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
