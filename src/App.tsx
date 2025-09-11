import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Index from "./pages/Index";
import About from "./pages/About";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import GetInvolved from "./pages/GetInvolved";
import Resources from "./pages/Resources";
import Community from "./pages/Community";
import Disabilities from "./pages/themes/Disabilities";
import VAW from "./pages/themes/VAW";
import MentalHealth from "./pages/themes/MentalHealth";
import LGBTQ from "./pages/themes/LGBTQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/analytics" element={<Analytics />} /> */}
            {/* <Route path="/reports" element={<Reports />} /> */}
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/community" element={<Community />} />
            <Route path="/themes" element={<Index />} />
            {/* <Route path="/themes/disabilities" element={<Disabilities />} /> */}
            {/* <Route path="/themes/vaw" element={<VAW />} /> */}
            {/* <Route path="/themes/mental-health" element={<MentalHealth />} /> */}
            {/* <Route path="/themes/lgbtq" element={<LGBTQ />} /> */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
