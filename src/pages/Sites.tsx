
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plus,
  Search,
  Building2,
  Eye,
  Edit,
  MapPin,
  Calendar,
  Users,
  Truck,
  Package
} from "lucide-react";

export default function Sites() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const sites = [
    {
      id: "SITE-001",
      name: "Dự án Chung cư Green Bay",
      address: "123 Mễ Trì, Nam Từ Liêm, Hà Nội",
      manager: "Nguyễn Văn An",
      managerPhone: "0123456789",
      status: "active",
      statusText: "Đang thi công",
      type: "Chung cư",
      startDate: "2024-01-15",
      expectedEnd: "2025-12-30",
      progress: 35,
      totalDeliveries: 45,
      pendingDeliveries: 3,
      totalValue: "15,500,000,000",
      workers: 120,
      lastDelivery: "2024-12-30"
    },
    {
      id: "SITE-002",
      name: "Khu công nghiệp ABC",
      address: "Đường 1A, KCN Đình Vũ, Hải Phòng",
      manager: "Trần Thị Bình",
      managerPhone: "0987654321",
      status: "active",
      statusText: "Đang thi công",
      type: "Khu công nghiệp",
      startDate: "2023-06-01",
      expectedEnd: "2024-08-30",
      progress: 85,
      totalDeliveries: 128,
      pendingDeliveries: 1,
      totalValue: "45,200,000,000",
      workers: 250,
      lastDelivery: "2024-12-31"
    },
    {
      id: "SITE-003",
      name: "Cầu vượt Thanh Xuân",
      address: "Nguyễn Trãi, Thanh Xuân, Hà Nội",
      manager: "Lê Văn Cường",
      managerPhone: "0369852147",
      status: "completed",
      statusText: "Hoàn thành",
      type: "Cơ sở hạ tầng",
      startDate: "2023-01-10",
      expectedEnd: "2024-12-15",
      progress: 100,
      totalDeliveries: 89,
      pendingDeliveries: 0,
      totalValue: "28,700,000,000",
      workers: 80,
      lastDelivery: "2024-12-10"
    },
    {
      id: "SITE-004",
      name: "Trung tâm thương mại Times City",
      address: "458 Minh Khai, Hai Bà Trưng, Hà Nội",
      manager: "Phạm Văn Dũng",
      managerPhone: "0741852963",
      status: "planning",
      statusText: "Chuẩn bị",
      type: "Thương mại",
      startDate: "2025-02-01",
      expectedEnd: "2026-06-30",
      progress: 5,
      totalDeliveries: 2,
      pendingDeliveries: 0,
      totalValue: "32,100,000,000",
      workers: 15,
      lastDelivery: "2024-12-28"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "planning":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 20) return "bg-yellow-500";
    return "bg-red-500";
  };

  const filteredSites = sites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || site.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      title: "Tổng công trình",
      value: sites.length.toString(),
      icon: Building2,
      color: "bg-blue-500"
    },
    {
      title: "Đang thi công",
      value: sites.filter(s => s.status === "active").length.toString(),
      icon: Building2,
      color: "bg-green-500"
    },
    {
      title: "Hoàn thành",
      value: sites.filter(s => s.status === "completed").length.toString(),
      icon: Building2,
      color: "bg-purple-500"
    },
    {
      title: "Tổng giá trị",
      value: (sites.reduce((sum, site) => sum + parseFloat(site.totalValue.replace(/,/g, "")), 0) / 1000000000).toFixed(1) + "B",
      icon: Package,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý công trình</h1>
          <p className="text-slate-600">Theo dõi tiến độ và quản lý các công trình xây dựng</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Thêm công trình
        </Button>
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
                  placeholder="Tìm kiếm theo tên công trình, địa chỉ, quản lý..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="planning">Chuẩn bị</SelectItem>
                <SelectItem value="active">Đang thi công</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="suspended">Tạm dừng</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Sites List */}
      <div className="grid gap-4">
        {filteredSites.map((site) => (
          <Card key={site.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-bold text-lg text-slate-900">{site.name}</span>
                    <Badge variant="outline">{site.id}</Badge>
                    <Badge className={getStatusColor(site.status)}>{site.statusText}</Badge>
                    <Badge variant="outline">{site.type}</Badge>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-slate-600">Tiến độ: {site.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(site.progress)}`}
                        style={{ width: `${site.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-slate-500">Địa chỉ</p>
                        <p className="font-medium text-slate-900">{site.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-slate-500">Quản lý</p>
                        <p className="font-medium text-slate-900">{site.manager}</p>
                        <p className="text-slate-600">{site.managerPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Truck className="w-4 h-4 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-slate-500">Vận chuyển</p>
                        <p className="font-medium text-slate-900">{site.totalDeliveries} chuyến</p>
                        <p className="text-slate-600">Chờ: {site.pendingDeliveries}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>Bắt đầu: {site.startDate}</span>
                    <span>•</span>
                    <span>Dự kiến hoàn thành: {site.expectedEnd}</span>
                    <span>•</span>
                    <span>Giá trị: {site.totalValue} VNĐ</span>
                    <span>•</span>
                    <span>Công nhân: {site.workers}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Xem
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Sửa
                  </Button>
                  <Button variant="outline" size="sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    Bản đồ
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
