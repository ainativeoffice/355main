import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Brokers from "@/pages/brokers";
import Enterprise from "@/pages/enterprise";
import Landlords from "@/pages/landlords";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/brokers" component={Brokers} />
      <Route path="/enterprise" component={Enterprise} />
      <Route path="/landlords" component={Landlords} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
