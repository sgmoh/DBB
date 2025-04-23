import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/LandingPage";
import LoadingPage from "@/pages/LoadingPage";
import SetupPage from "@/pages/SetupPage";
import SuccessPage from "@/pages/SuccessPage";
import BotHeader from "@/components/BotHeader";
import BotFooter from "@/components/BotFooter";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <BotHeader />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/loading" component={LoadingPage} />
          <Route path="/setup" component={SetupPage} />
          <Route path="/success" component={SuccessPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <BotFooter />
    </div>
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
