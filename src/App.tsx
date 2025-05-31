
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import DeliveryOrders from "./pages/DeliveryOrders";
import Materials from "./pages/Materials";
import Warehouses from "./pages/Warehouses";
import Inventory from "./pages/Inventory";
import Confirmations from "./pages/Confirmations";
import Users from "./pages/Users";
import Drivers from "./pages/Drivers";
import Sites from "./pages/Sites";
import Machines from "./pages/Machines";
import Reports from "./pages/Reports";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/delivery-orders" element={<DeliveryOrders />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/confirmations" element={<Confirmations />} />
            <Route path="/users" element={<Users />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/sites" element={<Sites />} />
            <Route path="/machines" element={<Machines />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
