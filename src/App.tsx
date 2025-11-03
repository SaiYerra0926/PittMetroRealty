import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { WorkflowProvider } from "@/contexts/WorkflowContext";
import { lazy } from "react";
import { LazyLoad } from "./components/LazyLoad";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Sell = lazy(() => import("./pages/Sell"));
const Buy = lazy(() => import("./pages/Buy"));
const Rent = lazy(() => import("./pages/Rent"));
const Manage = lazy(() => import("./pages/Manage"));
const MapView = lazy(() => import("./pages/MapView"));
const PropertyOwnerPortal = lazy(() => import("./pages/PropertyOwnerPortal"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WorkflowProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<LazyLoad><Index /></LazyLoad>} />
            <Route path="/sell" element={<LazyLoad><Sell /></LazyLoad>} />
            <Route path="/buy" element={<LazyLoad><Buy /></LazyLoad>} />
            <Route path="/rent" element={<LazyLoad><Rent /></LazyLoad>} />
            <Route path="/manage" element={<LazyLoad><Manage /></LazyLoad>} />
            <Route path="/map" element={<LazyLoad><MapView /></LazyLoad>} />
            <Route path="/admin" element={<LazyLoad><PropertyOwnerPortal /></LazyLoad>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<LazyLoad><NotFound /></LazyLoad>} />
          </Routes>
        </HashRouter>
      </WorkflowProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
