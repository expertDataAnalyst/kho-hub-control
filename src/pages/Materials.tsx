
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plus,
  Search,
  Package,
  Edit,
  Eye,
  AlertTriangle,
  TrendingUp,
  TrendingDown
} from "lucide-react";

export default function Materials() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const materials = [
    {
      id: "VT-001",
      name: "Xi măng PCB 30",
      category: "Xi măng",
      unit: "Bao",
      currentStock: 150,
      minStock: 100,
      maxStock: 500,
      price: "165,000",
      status: "in_stock",
      statusText: "Còn hàng",
      trend: "up",
      description: "Xi măng Portland hỗn hợp PCB 30 - bao 50kg",
      supplier: "Công ty TNHH Xi măng Hoàng Thạch"
    },
    {
      id: "VT-002", 
      name: "Thép phi 12",
      category: "Thép",
      unit: "Tấn",
      currentStock: 2.5,
      minStock: 5,
      maxStock: 20,
      price: "18,500,000",
      status: "low_stock",
      statusText: "Sắp hết",
      trend: "down",
      description: "Thép tròn trơn phi 12mm - thanh 12m",
      supplier: "Thép Pomina"
    },
    {
      id: "VT-003",
      name: "Gạch ống 4 lỗ",
      category: "Gạch",
      unit: "Viên", 
      currentStock: 25000,
      minStock: 10000,
      maxStock: 50000,
      price: "3,200",
      status: "in_stock",
      statusText: "Còn hàng",
      trend: "stable",
      description: "Gạch ống đất sét nung 4 lỗ 6x6x22cm",
      supplier: "Gạch Đất Việt"
    },
    {
      id: "VT-004",
      name: "Cát vàng",
      category: "Cát đá",
      unit: "m³",
      currentStock: 0,
      minStock: 50,
      maxStock: 200,
      price: "450,000",
      status: "out_of_stock", 
      statusText: "Hết hàng",
      trend: "down",
      description: "Cát vàng xây dựng loại 1",
      supplier: "Cát đá Hòa Bình"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_stock":
        return "bg-green-100 text-green-800";
      case "low_stock":
        return "bg-yellow-100 text-yellow-800";
      case "out_of_stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4" />; // empty space
    }
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || material.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(materials.map(m => m.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý vật tư</h1>
          <p className="text-slate-600">Theo dõi và quản lý danh mục vật tư xây dựng</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Thêm vật tư
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="stat-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tổng vật tư</p>
                <p className="text-2xl font-bold text-slate-900">{materials.length}</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Còn hàng</p>
                <p className="text-2xl font-bold text-green-600">
                  {materials.filter(m => m.status === "in_stock").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Sắp hết</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {materials.filter(m => m.status === "low_stock").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Hết hàng</p>
                <p className="text-2xl font-bold text-red-600">
                  {materials.filter(m => m.status === "out_of_stock").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm vật tư theo tên, mã, danh mục..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <Card key={material.id} className="card-hover">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{material.name}</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">{material.id}</p>
                </div>
                {getTrendIcon(material.trend)}
              </div>
              <Badge className={getStatusColor(material.status)} variant="secondary">
                {material.statusText}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Danh mục:</span>
                  <span className="font-medium">{material.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Đơn vị:</span>
                  <span className="font-medium">{material.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tồn kho:</span>
                  <span className={`font-bold ${
                    material.currentStock <= material.minStock 
                      ? "text-red-600" 
                      : "text-green-600"
                  }`}>
                    {material.currentStock} {material.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Giá:</span>
                  <span className="font-medium">{material.price} VNĐ</span>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-slate-500 mb-2">Mô tả:</p>
                <p className="text-sm text-slate-700">{material.description}</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-slate-500 mb-1">Nhà cung cấp:</p>
                <p className="text-sm font-medium text-slate-700">{material.supplier}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Xem
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Sửa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Không tìm thấy vật tư</h3>
            <p className="text-slate-600">Thử thay đổi bộ lọc hoặc thêm vật tư mới</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
