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
import BotWebsitePage from "@/pages/BotWebsitePage";
import BotHeader from "@/components/BotHeader";
import BotFooter from "@/components/BotFooter";
import { useEffect, useState } from "react";

function Router() {
  const [isBotWebsite, setIsBotWebsite] = useState(false);
  
  useEffect(() => {
    // Check if this is a bot website by looking for the bot-data cookie
    const getCookieValue = (name: string) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? decodeURIComponent(match[2]) : null;
    };
    
    const botDataCookie = getCookieValue('bot-data');
    setIsBotWebsite(!!botDataCookie);
    
    // Check URL path - if it's something other than the main routes, it might be a bot website
    const path = window.location.pathname;
    const mainRoutes = ['/', '/loading', '/setup', '/success'];
    if (!mainRoutes.includes(path) && path !== '/not-found') {
      // This might be a bot website URL, check if we need to fetch the data
      const botNameFromUrl = path.substring(1); // Remove leading slash
      if (botNameFromUrl && !botDataCookie) {
        // We'll need to fetch the bot data based on the URL
        console.log(`Possible bot website URL: ${botNameFromUrl}`);
      }
    }
  }, []);
  
  // If this is a bot website, render the BotWebsitePage without header/footer
  if (isBotWebsite) {
    return <BotWebsitePage />;
  }
  
  // Otherwise, render the standard app with header/footer
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
