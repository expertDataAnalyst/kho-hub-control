
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plus,
  Search,
  Users as UsersIcon,
  Eye,
  Edit,
  Shield,
  Mail,
  Phone,
  MapPin,
  Calendar
} from "lucide-react";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const users = [
    {
      id: "USR-001",
      name: "Nguyễn Văn An",
      email: "an.nguyen@company.com",
      phone: "0123456789",
      role: "admin",
      roleText: "Quản trị viên",
      department: "IT",
      location: "Hà Nội",
      status: "active",
      statusText: "Hoạt động",
      lastLogin: "2024-12-31 08:30",
      joinDate: "2023-01-15",
      permissions: ["full_access", "user_management", "system_config"]
    },
    {
      id: "USR-002", 
      name: "Trần Thị Bình",
      email: "binh.tran@company.com",
      phone: "0987654321",
      role: "manager",
      roleText: "Quản lý",
      department: "Kho vận",
      location: "TP.HCM",
      status: "active",
      statusText: "Hoạt động",
      lastLogin: "2024-12-31 07:15",
      joinDate: "2023-03-20",
      permissions: ["warehouse_management", "inventory_control", "reports"]
    },
    {
      id: "USR-003",
      name: "Lê Văn Cường",
      email: "cuong.le@company.com",
      phone: "0369852147",
      role: "staff",
      roleText: "Nhân viên",
      department: "Kho vận",
      location: "Đà Nẵng",
      status: "active",
      statusText: "Hoạt động",
      lastLogin: "2024-12-30 16:45",
      joinDate: "2023-07-10",
      permissions: ["inventory_view", "order_create"]
    },
    {
      id: "USR-004",
      name: "Phạm Thị Dung",
      email: "dung.pham@company.com",
      phone: "0741852963",
      role: "staff",
      roleText: "Nhân viên",
      department: "Kế toán",
      location: "Hà Nội",
      status: "inactive",
      statusText: "Ngưng hoạt động",
      lastLogin: "2024-12-25 14:20",
      joinDate: "2023-05-01",
      permissions: ["financial_reports", "payment_tracking"]
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "manager":
        return "bg-blue-100 text-blue-800";
      case "staff":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = [
    {
      title: "Tổng người dùng",
      value: users.length.toString(),
      icon: UsersIcon,
      color: "bg-blue-500"
    },
    {
      title: "Đang hoạt động",
      value: users.filter(u => u.status === "active").length.toString(),
      icon: Shield,
      color: "bg-green-500"
    },
    {
      title: "Quản trị viên",
      value: users.filter(u => u.role === "admin").length.toString(),
      icon: Shield,
      color: "bg-red-500"
    },
    {
      title: "Quản lý",
      value: users.filter(u => u.role === "manager").length.toString(),
      icon: Shield,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý người dùng</h1>
          <p className="text-slate-600">Quản lý tài khoản và phân quyền người dùng</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Thêm người dùng
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
                  placeholder="Tìm kiếm theo tên, email, phòng ban..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vai trò</SelectItem>
                <SelectItem value="admin">Quản trị viên</SelectItem>
                <SelectItem value="manager">Quản lý</SelectItem>
                <SelectItem value="staff">Nhân viên</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-bold text-lg text-slate-900">{user.name}</span>
                    <Badge variant="outline">{user.id}</Badge>
                    <Badge className={getRoleColor(user.role)}>{user.roleText}</Badge>
                    <Badge className={getStatusColor(user.status)}>{user.statusText}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-slate-500">Email</p>
                        <p className="font-medium text-slate-900">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-slate-500">Điện thoại</p>
                        <p className="font-medium text-slate-900">{user.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-slate-500">Vị trí</p>
                        <p className="font-medium text-slate-900">{user.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>Phòng ban: {user.department}</span>
                    <span>•</span>
                    <span>Gia nhập: {user.joinDate}</span>
                    <span>•</span>
                    <span>Đăng nhập cuối: {user.lastLogin}</span>
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
                    <Shield className="w-4 h-4 mr-2" />
                    Phân quyền
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
