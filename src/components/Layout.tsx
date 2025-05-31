
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { NotificationDropdown } from "@/components/NotificationDropdown";

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
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />
              <div className="hidden lg:block">
                <h1 className="text-xl font-semibold text-gray-900">
                  Hệ thống quản lý kho
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <NotificationDropdown />
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <User className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto bg-gray-50">
            <div className="page-transition">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
