
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plus,
  Search,
  Filter,
  FileText,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  Truck
} from "lucide-react";

export default function DeliveryOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const orders = [
    {
      id: "DH-2024-001",
      type: "Xuất kho",
      warehouse: "Kho Đông Anh",
      destination: "Công trình ABC",
      status: "pending_approval",
      statusText: "Chờ phê duyệt",
      driver: "Nguyễn Văn A",
      items: 5,
      totalValue: "125,000,000",
      createdAt: "2024-12-31 08:30",
      approvalLevel: 2
    },
    {
      id: "DH-2024-002", 
      type: "Nhập kho",
      warehouse: "Kho Bình Chánh",
      destination: "Nhà cung cấp XYZ",
      status: "completed",
      statusText: "Hoàn thành",
      driver: "Trần Văn B",
      items: 8,
      totalValue: "87,500,000",
      createdAt: "2024-12-31 06:15",
      approvalLevel: 4
    },
    {
      id: "DH-2024-003",
      type: "Xuất kho", 
      warehouse: "Kho Đà Nẵng",
      destination: "Công trình DEF",
      status: "in_transit",
      statusText: "Đang vận chuyển",
      driver: "Lê Văn C",
      items: 12,
      totalValue: "235,000,000",
      createdAt: "2024-12-30 14:20",
      approvalLevel: 3
    },
    {
      id: "DH-2024-004",
      type: "Xuất kho",
      warehouse: "Kho Hà Nội",
      destination: "Công trình GHI",
      status: "draft",
      statusText: "Nháp",
      driver: "Phạm Văn D",
      items: 3,
      totalValue: "45,000,000",
      createdAt: "2024-12-30 09:45",
      approvalLevel: 1
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_transit":
        return "bg-blue-100 text-blue-800";
      case "pending_approval":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "in_transit":
        return <Truck className="w-4 h-4" />;
      case "pending_approval":
        return <Clock className="w-4 h-4" />;
      case "draft":
        return <Edit className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý xuất nhập kho</h1>
          <p className="text-slate-600">Theo dõi và quản lý các phiếu xuất nhập kho</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Tạo phiếu mới
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm theo mã đơn, địa điểm, tài xế..."
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
                <SelectItem value="draft">Nháp</SelectItem>
                <SelectItem value="pending_approval">Chờ phê duyệt</SelectItem>
                <SelectItem value="in_transit">Đang vận chuyển</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-bold text-lg text-slate-900">{order.id}</span>
                    <Badge variant="outline">{order.type}</Badge>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.statusText}</span>
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Từ/Đến</p>
                      <p className="font-medium text-slate-900">{order.warehouse}</p>
                      <p className="text-slate-600">→ {order.destination}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Tài xế</p>
                      <p className="font-medium text-slate-900">{order.driver}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Vật tư</p>
                      <p className="font-medium text-slate-900">{order.items} mặt hàng</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Giá trị</p>
                      <p className="font-medium text-slate-900">{order.totalValue} VNĐ</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                    <span>Tạo lúc: {order.createdAt}</span>
                    <span>•</span>
                    <span>Cấp duyệt: {order.approvalLevel}/4</span>
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
                  {order.status === "pending_approval" && (
                    <Button size="sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Duyệt
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Không tìm thấy đơn hàng</h3>
            <p className="text-slate-600">Thử thay đổi bộ lọc hoặc tạo đơn hàng mới</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
