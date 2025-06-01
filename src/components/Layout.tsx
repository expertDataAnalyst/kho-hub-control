
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { UserDropdown } from "@/components/UserDropdown";
import { AppBreadcrumb } from "@/components/AppBreadcrumb";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shadow-sm sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden hover:bg-gray-100">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              <div className="hidden lg:block">
                <h1 className="text-xl font-semibold text-gray-900">
                  Hệ thống quản lý kho
                </h1>
              </div>
              <div className="lg:hidden">
                <h1 className="text-lg font-semibold text-gray-900">
                  QuanLyKho
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <NotificationDropdown />
              <UserDropdown />
            </div>
          </header>

          {/* Breadcrumb */}
          <div className="bg-white border-b border-gray-100 px-4 lg:px-6 py-3">
            <AppBreadcrumb />
          </div>

          {/* Main Content */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto bg-gray-50">
            <div className="page-transition max-w-7xl mx-auto">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 px-4 lg:px-6 py-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-600">
              <div>
                © 2024 QuanLyKho. Phiên bản 1.0.0
              </div>
              <div className="flex items-center gap-4">
                <span>Hỗ trợ kỹ thuật: support@quanlykho.com</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
