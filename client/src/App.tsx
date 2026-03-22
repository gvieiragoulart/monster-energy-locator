import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/components/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "@/components/organisms/ErrorBoundary";
import { UserLocationProvider } from "./contexts/UserLocationContext";
import Home from "@/components/pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
          <UserLocationProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </UserLocationProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
