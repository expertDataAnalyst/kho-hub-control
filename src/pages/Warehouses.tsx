
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  Warehouse,
  MapPin,
  Users,
  Package,
  TrendingUp,
  Eye,
  Edit
} from "lucide-react";

export default function Warehouses() {
  const warehouses = [
    {
      id: "KHO-001",
      name: "Kho Đông Anh",
      address: "Số 123, Đường ABC, Đông Anh, Hà Nội",
      manager: "Nguyễn Văn Quản",
      phone: "0123-456-789",
      status: "active",
      statusText: "Hoạt động",
      capacity: 1000,
      currentStock: 750,
      materialTypes: 45,
      recentActivity: "2 giờ trước",
      coordinates: "21.1355°N, 105.8224°E"
    },
    {
      id: "KHO-002",
      name: "Kho Bình Chánh", 
      address: "Số 456, Đường XYZ, Bình Chánh, TP.HCM",
      manager: "Trần Thị Lan",
      phone: "0987-654-321",
      status: "active",
      statusText: "Hoạt động",
      capacity: 800,
      currentStock: 620,
      materialTypes: 38,
      recentActivity: "1 giờ trước",
      coordinates: "10.7321°N, 106.6524°E"
    },
    {
      id: "KHO-003",
      name: "Kho Đà Nẵng",
      address: "Số 789, Đường DEF, Hải Châu, Đà Nẵng", 
      manager: "Lê Văn Hải",
      phone: "0369-258-147",
      status: "maintenance",
      statusText: "Bảo trì",
      capacity: 600,
      currentStock: 150,
      materialTypes: 22,
      recentActivity: "1 ngày trước",
      coordinates: "16.0471°N, 108.2068°E"
    },
    {
      id: "KHO-004",
      name: "Kho Cần Thơ",
      address: "Số 321, Đường GHI, Ninh Kiều, Cần Thơ",
      manager: "Phạm Văn Nam",
      phone: "0258-741-963",
      status: "active", 
      statusText: "Hoạt động",
      capacity: 500,
      currentStock: 480,
      materialTypes: 31,
      recentActivity: "30 phút trước",
      coordinates: "10.0452°N, 105.7469°E"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCapacityColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý kho</h1>
          <p className="text-slate-600">Theo dõi và quản lý hệ thống kho hàng</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Thêm kho mới
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="stat-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tổng số kho</p>
                <p className="text-2xl font-bold text-slate-900">{warehouses.length}</p>
              </div>
              <Warehouse className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Đang hoạt động</p>
                <p className="text-2xl font-bold text-green-600">
                  {warehouses.filter(w => w.status === "active").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Warehouse className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tổng sức chứa</p>
                <p className="text-2xl font-bold text-slate-900">
                  {warehouses.reduce((sum, w) => sum + w.capacity, 0).toLocaleString()}
                </p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Đã sử dụng</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(
                    (warehouses.reduce((sum, w) => sum + w.currentStock, 0) / 
                     warehouses.reduce((sum, w) => sum + w.capacity, 0)) * 100
                  )}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warehouses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {warehouses.map((warehouse) => {
          const capacityPercentage = Math.round((warehouse.currentStock / warehouse.capacity) * 100);
          
          return (
            <Card key={warehouse.id} className="card-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{warehouse.name}</CardTitle>
                    <p className="text-sm text-slate-600 mt-1">{warehouse.id}</p>
                  </div>
                  <Badge className={getStatusColor(warehouse.status)} variant="secondary">
                    {warehouse.statusText}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Address & Manager */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-slate-700">{warehouse.address}</p>
                      <p className="text-xs text-slate-500">{warehouse.coordinates}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-500" />
                    <div className="flex-1">
                      <p className="text-sm text-slate-700">{warehouse.manager}</p>
                      <p className="text-xs text-slate-500">{warehouse.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Capacity */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Sức chứa</span>
                    <span className="font-medium">
                      {warehouse.currentStock.toLocaleString()} / {warehouse.capacity.toLocaleString()} m³
                    </span>
                  </div>
                  <Progress 
                    value={capacityPercentage} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{capacityPercentage}% đã sử dụng</span>
                    <span className={`font-medium ${
                      capacityPercentage >= 90 ? "text-red-600" :
                      capacityPercentage >= 75 ? "text-yellow-600" : "text-green-600"
                    }`}>
                      {capacityPercentage >= 90 ? "Gần đầy" :
                       capacityPercentage >= 75 ? "Khá đầy" : "Bình thường"}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{warehouse.materialTypes}</p>
                    <p className="text-xs text-slate-600">Loại vật tư</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-900">Hoạt động</p>
                    <p className="text-xs text-slate-600">{warehouse.recentActivity}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Xem chi tiết
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
