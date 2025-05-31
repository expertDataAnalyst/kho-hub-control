
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plus,
  Search,
  Truck,
  Eye,
  Edit,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export default function Drivers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const drivers = [
    {
      id: "DRV-001",
      name: "Nguyễn Văn Tài",
      phone: "0123456789",
      licenseNumber: "B2-123456789",
      vehicleType: "Xe tải 5 tấn",
      vehiclePlate: "30A-12345",
      status: "available",
      statusText: "Sẵn sàng",
      currentLocation: "Kho Đông Anh",
      totalTrips: 156,
      completedTrips: 148,
      rating: 4.8,
      experience: "5 năm",
      lastTrip: "2024-12-30",
      nextTrip: "2024-12-31 14:00"
    },
    {
      id: "DRV-002",
      name: "Trần Văn Bình",
      phone: "0987654321", 
      licenseNumber: "C-987654321",
      vehicleType: "Xe tải 10 tấn",
      vehiclePlate: "51B-67890",
      status: "on_trip",
      statusText: "Đang vận chuyển",
      currentLocation: "Đang đi TP.HCM",
      totalTrips: 203,
      completedTrips: 195,
      rating: 4.9,
      experience: "8 năm",
      lastTrip: "2024-12-31",
      nextTrip: "Đang thực hiện"
    },
    {
      id: "DRV-003",
      name: "Lê Văn Cường",
      phone: "0369852147",
      licenseNumber: "B2-456789123",
      vehicleType: "Xe tải 3 tấn",
      vehiclePlate: "43C-11111",
      status: "maintenance",
      statusText: "Bảo trì",
      currentLocation: "Garage ABC",
      totalTrips: 89,
      completedTrips: 85,
      rating: 4.6,
      experience: "3 năm",
      lastTrip: "2024-12-28",
      nextTrip: "2025-01-02"
    },
    {
      id: "DRV-004",
      name: "Phạm Văn Dũng",
      phone: "0741852963",
      licenseNumber: "B2-789123456",
      vehicleType: "Xe tải 7 tấn",
      vehiclePlate: "29A-55555",
      status: "off_duty",
      statusText: "Nghỉ phép",
      currentLocation: "Nghỉ phép",
      totalTrips: 124,
      completedTrips: 120,
      rating: 4.7,
      experience: "4 năm",
      lastTrip: "2024-12-29",
      nextTrip: "2025-01-03"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "on_trip":
        return "bg-blue-100 text-blue-800";
      case "maintenance":
        return "bg-orange-100 text-orange-800";
      case "off_duty":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="w-4 h-4" />;
      case "on_trip":
        return <Truck className="w-4 h-4" />;
      case "maintenance":
        return <AlertTriangle className="w-4 h-4" />;
      case "off_duty":
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      title: "Tổng tài xế",
      value: drivers.length.toString(),
      icon: Truck,
      color: "bg-blue-500"
    },
    {
      title: "Sẵn sàng",
      value: drivers.filter(d => d.status === "available").length.toString(),
      icon: CheckCircle,
      color: "bg-green-500"
    },
    {
      title: "Đang vận chuyển",
      value: drivers.filter(d => d.status === "on_trip").length.toString(),
      icon: Truck,
      color: "bg-purple-500"
    },
    {
      title: "Bảo trì/Nghỉ",
      value: drivers.filter(d => d.status === "maintenance" || d.status === "off_duty").length.toString(),
      icon: AlertTriangle,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý tài xế</h1>
          <p className="text-slate-600">Theo dõi và quản lý đội ngũ tài xế vận chuyển</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Thêm tài xế
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
                  placeholder="Tìm kiếm theo tên, biển số, điện thoại..."
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
                <SelectItem value="available">Sẵn sàng</SelectItem>
                <SelectItem value="on_trip">Đang vận chuyển</SelectItem>
                <SelectItem value="maintenance">Bảo trì</SelectItem>
                <SelectItem value="off_duty">Nghỉ phép</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Drivers List */}
      <div className="grid gap-4">
        {filteredDrivers.map((driver) => (
          <Card key={driver.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-bold text-lg text-slate-900">{driver.name}</span>
                    <Badge variant="outline">{driver.id}</Badge>
                    <Badge className={getStatusColor(driver.status)}>
                      {getStatusIcon(driver.status)}
                      <span className="ml-1">{driver.statusText}</span>
                    </Badge>
                    <Badge variant="outline">⭐ {driver.rating}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-slate-500">Phương tiện</p>
                      <p className="font-medium text-slate-900">{driver.vehicleType}</p>
                      <p className="text-slate-600">Biển số: {driver.vehiclePlate}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Bằng lái</p>
                      <p className="font-medium text-slate-900">{driver.licenseNumber}</p>
                      <p className="text-slate-600">Kinh nghiệm: {driver.experience}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Vị trí hiện tại</p>
                      <p className="font-medium text-slate-900">{driver.currentLocation}</p>
                      <p className="text-slate-600">
                        <Phone className="w-3 h-3 inline mr-1" />
                        {driver.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">Thống kê</p>
                      <p className="font-medium text-slate-900">{driver.completedTrips}/{driver.totalTrips} chuyến</p>
                      <p className="text-slate-600">Tỷ lệ: {((driver.completedTrips/driver.totalTrips)*100).toFixed(1)}%</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>Chuyến cuối: {driver.lastTrip}</span>
                    <span>•</span>
                    <span>Chuyến tiếp theo: {driver.nextTrip}</span>
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
                    Vị trí
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
