import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Warehouse,
  Truck,
  FileText,
  Users,
  Settings,
  Building2,
  Wrench,
  CreditCard,
  BarChart3,
  ChevronDown,
  ChevronRight
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const menuItems = [
  {
    title: "Tổng quan",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Quản lý kho",
    icon: Warehouse,
    subItems: [
      { title: "Danh sách kho", url: "/warehouses", icon: Warehouse },
      { title: "Vật tư", url: "/materials", icon: Package },
      { title: "Tồn kho", url: "/inventory", icon: BarChart3 },
    ]
  },
  {
    title: "Xuất nhập kho",
    icon: FileText,
    subItems: [
      { title: "Phiếu xuất/nhập", url: "/delivery-orders", icon: FileText },
      { title: "Xác nhận đơn", url: "/confirmations", icon: FileText },
    ]
  },
  {
    title: "Quản lý",
    icon: Users,
    subItems: [
      { title: "Người dùng", url: "/users", icon: Users },
      { title: "Tài xế", url: "/drivers", icon: Truck },
      { title: "Công trình", url: "/sites", icon: Building2 },
      { title: "Thiết bị", url: "/machines", icon: Wrench },
    ]
  },
  {
    title: "Báo cáo",
    url: "/reports",
    icon: BarChart3,
  },
  {
    title: "Thanh toán",
    url: "/payments",
    icon: CreditCard,
  },
  {
    title: "Cài đặt",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const [openGroups, setOpenGroups] = useState<string[]>(["Quản lý kho", "Xuất nhập kho"]);

  const isActive = (path: string) => currentPath === path;

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) 
        ? prev.filter(g => g !== title)
        : [...prev, title]
    );
  };

  return (
    <Sidebar className={`${isCollapsed ? "w-14" : "w-64"} bg-slate-800 border-r border-slate-700`}>
      <div className="p-4 border-b border-slate-700">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Warehouse className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-white">QuanLyKho</h2>
              <p className="text-xs text-slate-400">v1.0.0</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <SidebarTrigger className="w-full text-slate-300 hover:bg-slate-700 hover:text-white" />
        )}
      </div>

      <SidebarContent className="p-2 bg-slate-800">
        <SidebarMenu className="space-y-1">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.subItems ? (
                <Collapsible
                  open={openGroups.includes(item.title)}
                  onOpenChange={() => toggleGroup(item.title)}
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full justify-between text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        {!isCollapsed && <span className="font-medium">{item.title}</span>}
                      </div>
                      {!isCollapsed && (
                        openGroups.includes(item.title) ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  
                  {!isCollapsed && (
                    <CollapsibleContent className="ml-4 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <SidebarMenuButton key={subItem.url} asChild>
                          <NavLink
                            to={subItem.url}
                            className={({ isActive }) => 
                              isActive 
                                ? "bg-red-600 text-white font-medium shadow-sm flex items-center gap-3 px-3 py-2 rounded-lg border border-red-500" 
                                : "text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:border hover:border-slate-600"
                            }
                          >
                            <subItem.icon className="h-4 w-4" />
                            <span>{subItem.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      ))}
                    </CollapsibleContent>
                  )}
                </Collapsible>
              ) : (
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.url!}
                    end
                    className={({ isActive }) => 
                      isActive 
                        ? "bg-red-600 text-white font-medium shadow-sm flex items-center gap-3 px-3 py-2 rounded-lg border border-red-500" 
                        : "text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:border hover:border-slate-600"
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && <span className="font-medium">{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
