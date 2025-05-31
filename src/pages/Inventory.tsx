
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Package,
  Search,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Download,
  Filter
} from "lucide-react";

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("all");

  const inventoryItems = [
    {
      id: "VT-001",
      name: "Xi măng PCB30",
      warehouse: "Kho Đông Anh",
      currentStock: 120,
      minStock: 100,
      maxStock: 500,
      unit: "bao",
      value: "240,000,000",
      lastUpdated: "2024-12-31 10:30",
      status: "low_stock"
    },
    {
      id: "VT-002", 
      name: "Thép xây dựng D16",
      warehouse: "Kho Bình Chánh",
      currentStock: 850,
      minStock: 200,
      maxStock: 1000,
      unit: "thanh",
      value: "425,000,000",
      lastUpdated: "2024-12-31 08:15",
      status: "normal"
    },
    {
      id: "VT-003",
      name: "Gạch ống 4 lỗ",
      warehouse: "Kho Đà Nẵng", 
      currentStock: 15000,
      minStock: 5000,
      maxStock: 20000,
      unit: "viên",
      value: "150,000,000",
      lastUpdated: "2024-12-30 16:45",
      status: "normal"
    },
    {
      id: "VT-004",
      name: "Cát xây dựng",
      warehouse: "Kho Hà Nội",
      currentStock: 45,
      minStock: 50,
      maxStock: 200,
      unit: "m³",
      value: "67,500,000",
      lastUpdated: "2024-12-30 14:20",
      status: "critical"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "low_stock":
        return "bg-yellow-100 text-yellow-800";
      case "normal":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "critical":
        return "Hết hàng";
      case "low_stock":
        return "Sắp hết";
      case "normal":
        return "Bình thường";
      default:
        return "Không xác định";
    }
  };

  const getStockPercentage = (current: number, min: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWarehouse = warehouseFilter === "all" || item.warehouse === warehouseFilter;
    return matchesSearch && matchesWarehouse;
  });

  const stats = [
    {
      title: "Tổng vật tư",
      value: inventoryItems.length.toString(),
      icon: Package,
      color: "bg-blue-500"
    },
    {
      title: "Sắp hết hàng",
      value: inventoryItems.filter(item => item.status === "low_stock").length.toString(),
      icon: AlertTriangle,
      color: "bg-yellow-500"
    },
    {
      title: "Hết hàng",
      value: inventoryItems.filter(item => item.status === "critical").length.toString(),
      icon: TrendingDown,
      color: "bg-red-500"
    },
    {
      title: "Tổng giá trị",
      value: "882.5M",
      icon: TrendingUp,
      color: "bg-green-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý tồn kho</h1>
          <p className="text-slate-600">Theo dõi số lượng vật tư trong kho</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
          <Button size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Phân tích
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
                  <p className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm vật tư..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo kho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả kho</SelectItem>
                <SelectItem value="Kho Đông Anh">Kho Đông Anh</SelectItem>
                <SelectItem value="Kho Bình Chánh">Kho Bình Chánh</SelectItem>
                <SelectItem value="Kho Đà Nẵng">Kho Đà Nẵng</SelectItem>
                <SelectItem value="Kho Hà Nội">Kho Hà Nội</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory List */}
      <div className="grid gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-bold text-lg text-slate-900">{item.id}</span>
                    <h3 className="font-medium text-slate-900">{item.name}</h3>
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusText(item.status)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Kho</p>
                      <p className="font-medium text-slate-900">{item.warehouse}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Tồn kho</p>
                      <p className="font-medium text-slate-900">{item.currentStock.toLocaleString()} {item.unit}</p>
                      <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${
                            item.status === "critical" ? "bg-red-500" :
                            item.status === "low_stock" ? "bg-yellow-500" : "bg-green-500"
                          }`}
                          style={{ width: `${getStockPercentage(item.currentStock, item.minStock, item.maxStock)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-500">Tối thiểu</p>
                      <p className="font-medium text-slate-900">{item.minStock.toLocaleString()} {item.unit}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Giá trị</p>
                      <p className="font-medium text-slate-900">{item.value} VNĐ</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Cập nhật</p>
                      <p className="font-medium text-slate-900">{item.lastUpdated}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Nhập thêm
                  </Button>
                  <Button variant="outline" size="sm">
                    Chi tiết
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Không tìm thấy vật tư</h3>
            <p className="text-slate-600">Thử thay đổi bộ lọc tìm kiếm</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
