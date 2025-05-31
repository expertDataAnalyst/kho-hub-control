
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  CheckCircle,
  XCircle,
  Clock,
  Search,
  FileText,
  Eye,
  AlertCircle,
  User
} from "lucide-react";

export default function Confirmations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const confirmations = [
    {
      id: "XN-2024-001",
      orderId: "DH-2024-001",
      type: "Xuất kho",
      warehouse: "Kho Đông Anh",
      destination: "Công trình ABC",
      requester: "Nguyễn Văn A",
      approver: "Trần Thị B",
      status: "pending",
      priority: "high",
      items: 5,
      totalValue: "125,000,000",
      requestDate: "2024-12-31 08:30",
      dueDate: "2024-12-31 18:00",
      notes: "Cần phê duyệt gấp cho công trình"
    },
    {
      id: "XN-2024-002",
      orderId: "DH-2024-002", 
      type: "Nhập kho",
      warehouse: "Kho Bình Chánh",
      destination: "Nhà cung cấp XYZ",
      requester: "Lê Văn C",
      approver: "Phạm Văn D",
      status: "approved",
      priority: "medium",
      items: 8,
      totalValue: "87,500,000",
      requestDate: "2024-12-30 14:20",
      dueDate: "2024-12-31 12:00",
      notes: ""
    },
    {
      id: "XN-2024-003",
      orderId: "DH-2024-003",
      type: "Xuất kho",
      warehouse: "Kho Đà Nẵng",
      destination: "Công trình DEF", 
      requester: "Hoàng Văn E",
      approver: "Nguyễn Thị F",
      status: "rejected",
      priority: "low",
      items: 12,
      totalValue: "235,000,000",
      requestDate: "2024-12-30 09:15",
      dueDate: "2024-12-31 09:00",
      notes: "Không đủ vật tư trong kho"
    },
    {
      id: "XN-2024-004",
      orderId: "DH-2024-004",
      type: "Xuất kho",
      warehouse: "Kho Hà Nội",
      destination: "Công trình GHI",
      requester: "Võ Văn G",
      approver: "Đỗ Thị H",
      status: "pending",
      priority: "medium",
      items: 3,
      totalValue: "45,000,000",
      requestDate: "2024-12-31 06:45",
      dueDate: "2024-12-31 16:00",
      notes: ""
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Đã duyệt";
      case "rejected":
        return "Từ chối";
      case "pending":
        return "Chờ duyệt";
      default:
        return "Không xác định";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Cao";
      case "medium":
        return "Trung bình";
      case "low":
        return "Thấp";
      default:
        return "Không xác định";
    }
  };

  const filteredConfirmations = confirmations.filter(confirmation => {
    const matchesSearch = confirmation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         confirmation.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         confirmation.requester.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || confirmation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      title: "Chờ duyệt",
      value: confirmations.filter(c => c.status === "pending").length.toString(),
      icon: Clock,
      color: "bg-yellow-500"
    },
    {
      title: "Đã duyệt",
      value: confirmations.filter(c => c.status === "approved").length.toString(),
      icon: CheckCircle,
      color: "bg-green-500"
    },
    {
      title: "Từ chối",
      value: confirmations.filter(c => c.status === "rejected").length.toString(),
      icon: XCircle,
      color: "bg-red-500"
    },
    {
      title: "Tổng cộng",
      value: confirmations.length.toString(),
      icon: FileText,
      color: "bg-blue-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Xác nhận đơn hàng</h1>
          <p className="text-slate-600">Quản lý và phê duyệt các yêu cầu xuất nhập kho</p>
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
                  placeholder="Tìm kiếm theo mã xác nhận, mã đơn, người yêu cầu..."
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
                <SelectItem value="pending">Chờ duyệt</SelectItem>
                <SelectItem value="approved">Đã duyệt</SelectItem>
                <SelectItem value="rejected">Từ chối</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Confirmations List */}
      <div className="grid gap-4">
        {filteredConfirmations.map((confirmation) => (
          <Card key={confirmation.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-bold text-lg text-slate-900">{confirmation.id}</span>
                    <Badge variant="outline">{confirmation.orderId}</Badge>
                    <Badge variant="outline">{confirmation.type}</Badge>
                    <Badge className={getStatusColor(confirmation.status)}>
                      {getStatusIcon(confirmation.status)}
                      <span className="ml-1">{getStatusText(confirmation.status)}</span>
                    </Badge>
                    <Badge className={getPriorityColor(confirmation.priority)}>
                      Ưu tiên {getPriorityText(confirmation.priority)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-slate-500">Từ/Đến</p>
                      <p className="font-medium text-slate-900">{confirmation.warehouse}</p>
                      <p className="text-slate-600">→ {confirmation.destination}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Người yêu cầu</p>
                      <p className="font-medium text-slate-900">{confirmation.requester}</p>
                      <p className="text-slate-600">Phê duyệt: {confirmation.approver}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Thông tin</p>
                      <p className="font-medium text-slate-900">{confirmation.items} mặt hàng</p>
                      <p className="text-slate-600">{confirmation.totalValue} VNĐ</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>Yêu cầu: {confirmation.requestDate}</span>
                    <span>•</span>
                    <span>Hạn: {confirmation.dueDate}</span>
                    {confirmation.notes && (
                      <>
                        <span>•</span>
                        <span className="italic">"{confirmation.notes}"</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Xem
                  </Button>
                  {confirmation.status === "pending" && (
                    <>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <XCircle className="w-4 h-4 mr-2" />
                        Từ chối
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Phê duyệt
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredConfirmations.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Không tìm thấy yêu cầu xác nhận</h3>
            <p className="text-slate-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
