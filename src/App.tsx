import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WorkflowProvider } from "@/contexts/WorkflowContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Sell from "./pages/Sell";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Manage from "./pages/Manage";
import MapView from "./pages/MapView";
import PropertyOwnerPortal from "./pages/PropertyOwnerPortal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WorkflowProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/admin" element={<PropertyOwnerPortal />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WorkflowProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
