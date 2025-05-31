
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />
              <div className="hidden lg:block">
                <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Hệ thống quản lý kho
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative hover:bg-blue-50">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-red-500 to-rose-600 rounded-full text-xs"></span>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                <User className="h-5 w-5 text-slate-600" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto bg-gradient-to-br from-slate-50 to-blue-50/30">
            <div className="page-transition">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
