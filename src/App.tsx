
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
            {/* Placeholder routes for other pages */}
            <Route path="/users" element={<div className="p-8 text-center text-slate-600">Trang Người dùng đang phát triển</div>} />
            <Route path="/drivers" element={<div className="p-8 text-center text-slate-600">Trang Tài xế đang phát triển</div>} />
            <Route path="/sites" element={<div className="p-8 text-center text-slate-600">Trang Công trình đang phát triển</div>} />
            <Route path="/machines" element={<div className="p-8 text-center text-slate-600">Trang Thiết bị đang phát triển</div>} />
            <Route path="/reports" element={<div className="p-8 text-center text-slate-600">Trang Báo cáo đang phát triển</div>} />
            <Route path="/payments" element={<div className="p-8 text-center text-slate-600">Trang Thanh toán đang phát triển</div>} />
            <Route path="/settings" element={<div className="p-8 text-center text-slate-600">Trang Cài đặt đang phát triển</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
