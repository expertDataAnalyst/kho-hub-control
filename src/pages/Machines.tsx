
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plus,
  Search,
  Wrench,
  Eye,
  Edit,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity
} from "lucide-react";

export default function Machines() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const machines = [
    {
      id: "MCH-001",
      name: "Máy đào Caterpillar 320D",
      model: "CAT 320D",
      serialNumber: "CAT320D2024001",
      category: "Máy đào",
      location: "Công trình Green Bay",
      operator: "Nguyễn Văn Tài",
      status: "operational",
      statusText: "Hoạt động",
      condition: "good",
      conditionText: "Tốt",
      lastMaintenance: "2024-12-15",
      nextMaintenance: "2025-01-15",
      workingHours: 1250,
      totalHours: 8500,
      fuelConsumption: "25 lít/giờ",
      purchaseDate: "2022-03-15",
      value: "1,200,000,000"
    },
    {
      id: "MCH-002",
      name: "Xe trộn bê tông Hino",
      model: "Hino 500 Series",
      serialNumber: "HINO5002024002",
      category: "Xe trộn",
      location: "Kho Đông Anh",
      operator: "Trần Văn Bình",
      status: "maintenance",
      statusText: "Bảo trì",
      condition: "fair",
      conditionText: "Khá",
      lastMaintenance: "2024-12-30",
      nextMaintenance: "2025-01-30",
      workingHours: 890,
      totalHours: 6200,
      fuelConsumption: "18 lít/giờ",
      purchaseDate: "2021-08-20",
      value: "850,000,000"
    },
    {
      id: "MCH-003",
      name: "Cần cẩu tháp Potain",
      model: "Potain MCT 85",
      serialNumber: "POT85MCT2024003",
      category: "Cần cẩu",
      location: "Công trình ABC",
      operator: "Lê Văn Cường",
      status: "operational",
      statusText: "Hoạt động",
      condition: "excellent",
      conditionText: "Xuất sắc",
      lastMaintenance: "2024-12-20",
      nextMaintenance: "2025-02-20",
      workingHours: 2100,
      totalHours: 12800,
      fuelConsumption: "35 lít/giờ",
      purchaseDate: "2020-11-10",
      value: "2,500,000,000"
    },
    {
      id: "MCH-004",
      name: "Máy lu đường Dynapac",
      model: "Dynapac CA2500D",
      serialNumber: "DYN2500D2024004",
      category: "Máy lu",
      location: "Cầu vượt Thanh Xuân",
      operator: "Phạm Văn Dũng",
      status: "idle",
      statusText: "Chờ việc",
      condition: "good",
      conditionText: "Tốt",
      lastMaintenance: "2024-12-25",
      nextMaintenance: "2025-01-25",
      workingHours: 560,
      totalHours: 4200,
      fuelConsumption: "20 lít/giờ",
      purchaseDate: "2023-01-15",
      value: "650,000,000"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-orange-100 text-orange-800";
      case "idle":
        return "bg-blue-100 text-blue-800";
      case "broken":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent":
        return "bg-green-100 text-green-800";
      case "good":
        return "bg-blue-100 text-blue-800";
      case "fair":
        return "bg-yellow-100 text-yellow-800";
      case "poor":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-4 h-4" />;
      case "maintenance":
        return <Wrench className="w-4 h-4" />;
      case "idle":
        return <Clock className="w-4 h-4" />;
      case "broken":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredMachines = machines.filter(machine => {
    const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         machine.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         machine.operator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || machine.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      title: "Tổng thiết bị",
      value: machines.length.toString(),
      icon: Wrench,
      color: "bg-blue-500"
    },
    {
      title: "Đang hoạt động",
      value: machines.filter(m => m.status === "operational").length.toString(),
      icon: CheckCircle,
      color: "bg-green-500"
    },
    {
      title: "Bảo trì",
      value: machines.filter(m => m.status === "maintenance").length.toString(),
      icon: Wrench,
      color: "bg-orange-500"
    },
    {
      title: "Tổng giá trị",
      value: (machines.reduce((sum, machine) => sum + parseFloat(machine.value.replace(/,/g, "")), 0) / 1000000000).toFixed(1) + "B",
      icon: Activity,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý thiết bị</h1>
          <p className="text-slate-600">Theo dõi và bảo trì máy móc thiết bị xây dựng</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Thêm thiết bị
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
                  placeholder="Tìm kiếm theo tên thiết bị, số seri, vận hành viên..."
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
                <SelectItem value="operational">Đang hoạt động</SelectItem>
                <SelectItem value="maintenance">Bảo trì</SelectItem>
                <SelectItem value="idle">Chờ việc</SelectItem>
                <SelectItem value="broken">Hỏng hóc</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Machines List */}
      <div className="grid gap-4">
        {filteredMachines.map((machine) => (
          <Card key={machine.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-bold text-lg text-slate-900">{machine.name}</span>
                    <Badge variant="outline">{machine.id}</Badge>
                    <Badge className={getStatusColor(machine.status)}>
                      {getStatusIcon(machine.status)}
                      <span className="ml-1">{machine.statusText}</span>
                    </Badge>
                    <Badge className={getConditionColor(machine.condition)}>{machine.conditionText}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-slate-500">Thông tin cơ bản</p>
                      <p className="font-medium text-slate-900">{machine.model}</p>
                      <p className="text-slate-600">{machine.category}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Vị trí & Vận hành</p>
                      <p className="font-medium text-slate-900">{machine.location}</p>
                      <p className="text-slate-600">VH: {machine.operator}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Giờ hoạt động</p>
                      <p className="font-medium text-slate-900">{machine.workingHours}h tháng này</p>
                      <p className="text-slate-600">Tổng: {machine.totalHours}h</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Bảo trì</p>
                      <p className="font-medium text-slate-900">Cuối: {machine.lastMaintenance}</p>
                      <p className="text-slate-600">Tiếp: {machine.nextMaintenance}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>Số seri: {machine.serialNumber}</span>
                    <span>•</span>
                    <span>Tiêu hao: {machine.fuelConsumption}</span>
                    <span>•</span>
                    <span>Giá trị: {machine.value} VNĐ</span>
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
                    <Calendar className="w-4 h-4 mr-2" />
                    Bảo trì
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
