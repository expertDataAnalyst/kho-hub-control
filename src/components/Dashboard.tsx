
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  Warehouse,
  Truck,
  FileText,
  TrendingUp,
  AlertTriangle,
  Users,
  Building2,
  Plus,
  Eye
} from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      title: "Tổng kho",
      value: "12",
      change: "+2",
      changeType: "positive" as const,
      icon: Warehouse,
      color: "bg-blue-500"
    },
    {
      title: "Vật tư",
      value: "1,247",
      change: "+23",
      changeType: "positive" as const,
      icon: Package,
      color: "bg-green-500"
    },
    {
      title: "Đơn hàng hôm nay",
      value: "18",
      change: "+5",
      changeType: "positive" as const,
      icon: FileText,
      color: "bg-orange-500"
    },
    {
      title: "Tài xế hoạt động",
      value: "24",
      change: "-2",
      changeType: "negative" as const,
      icon: Truck,
      color: "bg-purple-500"
    }
  ];

  const recentOrders = [
    {
      id: "DH-2024-001",
      type: "Xuất kho",
      warehouse: "Kho Đông Anh",
      destination: "Công trình ABC",
      status: "Chờ xác nhận",
      statusColor: "bg-yellow-100 text-yellow-800",
      driver: "Nguyễn Văn A",
      time: "2 giờ trước"
    },
    {
      id: "DH-2024-002",
      type: "Nhập kho",
      warehouse: "Kho Bình Chánh",
      destination: "Nhà cung cấp XYZ",
      status: "Hoàn thành",
      statusColor: "bg-green-100 text-green-800",
      driver: "Trần Văn B",
      time: "4 giờ trước"
    },
    {
      id: "DH-2024-003",
      type: "Xuất kho",
      warehouse: "Kho Đà Nẵng",
      destination: "Công trình DEF",
      status: "Đang vận chuyển",
      statusColor: "bg-blue-100 text-blue-800",
      driver: "Lê Văn C",
      time: "6 giờ trước"
    }
  ];

  const alerts = [
    {
      type: "Tồn kho thấp",
      message: "Xi măng PCB30 tại kho Đông Anh chỉ còn 20 bao",
      severity: "warning",
      time: "30 phút trước"
    },
    {
      type: "Đơn chờ duyệt",
      message: "5 đơn xuất kho đang chờ phê duyệt từ quản lý",
      severity: "info",
      time: "1 giờ trước"
    },
    {
      type: "Bảo trì thiết bị",
      message: "Xe tải BKS 29A-12345 cần bảo trì định kỳ",
      severity: "warning",
      time: "2 giờ trước"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tổng quan hệ thống</h1>
          <p className="text-slate-600">Theo dõi hoạt động kho và vận chuyển</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Xem báo cáo
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Tạo đơn mới
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="stat-card card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <Badge
                      variant="secondary"
                      className={
                        stat.changeType === "positive"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Đơn hàng gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-slate-900">{order.id}</span>
                      <Badge variant="outline">{order.type}</Badge>
                      <Badge className={order.statusColor}>{order.status}</Badge>
                    </div>
                    <div className="text-sm text-slate-600">
                      <p>{order.warehouse} → {order.destination}</p>
                      <p>Tài xế: {order.driver} • {order.time}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Cảnh báo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className="p-3 border border-slate-200 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-1 rounded-full ${
                      alert.severity === "warning" 
                        ? "bg-yellow-100" 
                        : "bg-blue-100"
                    }`}>
                      <AlertTriangle className={`w-3 h-3 ${
                        alert.severity === "warning"
                          ? "text-yellow-600"
                          : "text-blue-600"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        {alert.type}
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        {alert.message}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {alert.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
