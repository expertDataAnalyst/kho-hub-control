
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plus,
  Search,
  CreditCard,
  Eye,
  Edit,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign
} from "lucide-react";

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const payments = [
    {
      id: "PAY-001",
      invoiceNumber: "INV-2024-001",
      supplier: "Công ty TNHH Vật tư XD ABC",
      amount: "125,000,000",
      currency: "VNĐ",
      status: "paid",
      statusText: "Đã thanh toán",
      method: "bank_transfer",
      methodText: "Chuyển khoản",
      dueDate: "2024-12-25",
      paidDate: "2024-12-24",
      description: "Thanh toán vật tư tháng 12",
      category: "materials",
      categoryText: "Vật tư",
      approvedBy: "Nguyễn Văn An",
      reference: "TT20241224001"
    },
    {
      id: "PAY-002",
      invoiceNumber: "INV-2024-002",
      supplier: "Công ty Vận tải DEF",
      amount: "45,500,000",
      currency: "VNĐ",
      status: "pending",
      statusText: "Chờ thanh toán",
      method: "bank_transfer",
      methodText: "Chuyển khoản",
      dueDate: "2025-01-05",
      paidDate: null,
      description: "Chi phí vận chuyển tháng 12",
      category: "transport",
      categoryText: "Vận chuyển",
      approvedBy: "Trần Thị Bình",
      reference: null
    },
    {
      id: "PAY-003",
      invoiceNumber: "INV-2024-003",
      supplier: "Nhà thầu xây dựng GHI",
      amount: "850,000,000",
      currency: "VNĐ",
      status: "overdue",
      statusText: "Quá hạn",
      method: "bank_transfer",
      methodText: "Chuyển khoản",
      dueDate: "2024-12-20",
      paidDate: null,
      description: "Thanh toán tiến độ công trình tháng 11",
      category: "construction",
      categoryText: "Xây dựng",
      approvedBy: "Lê Văn Cường",
      reference: null
    },
    {
      id: "PAY-004",
      invoiceNumber: "INV-2024-004",
      supplier: "Công ty Bảo trì JKL",
      amount: "25,000,000",
      currency: "VNĐ",
      status: "approved",
      statusText: "Đã duyệt",
      method: "cash",
      methodText: "Tiền mặt",
      dueDate: "2025-01-02",
      paidDate: null,
      description: "Bảo trì thiết bị định kỳ",
      category: "maintenance",
      categoryText: "Bảo trì",
      approvedBy: "Phạm Văn Dũng",
      reference: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "approved":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "rejected":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "overdue":
        return <AlertTriangle className="w-4 h-4" />;
      case "rejected":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "materials":
        return "bg-blue-100 text-blue-800";
      case "transport":
        return "bg-green-100 text-green-800";
      case "construction":
        return "bg-purple-100 text-purple-800";
      case "maintenance":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      title: "Tổng thanh toán",
      value: payments.length.toString(),
      icon: CreditCard,
      color: "bg-blue-500"
    },
    {
      title: "Đã thanh toán",
      value: payments.filter(p => p.status === "paid").length.toString(),
      icon: CheckCircle,
      color: "bg-green-500"
    },
    {
      title: "Chờ thanh toán",
      value: payments.filter(p => p.status === "pending" || p.status === "approved").length.toString(),
      icon: Clock,
      color: "bg-yellow-500"
    },
    {
      title: "Quá hạn",
      value: payments.filter(p => p.status === "overdue").length.toString(),
      icon: AlertTriangle,
      color: "bg-red-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý thanh toán</h1>
          <p className="text-slate-600">Theo dõi và xử lý các khoản thanh toán</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Tạo thanh toán mới
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

      {/* Summary Card */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-slate-600">Tổng số tiền chờ thanh toán</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {(payments.filter(p => p.status === "pending" || p.status === "approved")
                         .reduce((sum, p) => sum + parseFloat(p.amount.replace(/,/g, "")), 0) / 1000000).toFixed(0)}M VNĐ
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-600">Đã thanh toán tháng này</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {(payments.filter(p => p.status === "paid")
                         .reduce((sum, p) => sum + parseFloat(p.amount.replace(/,/g, "")), 0) / 1000000).toFixed(0)}M VNĐ
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-600">Quá hạn thanh toán</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {(payments.filter(p => p.status === "overdue")
                         .reduce((sum, p) => sum + parseFloat(p.amount.replace(/,/g, "")), 0) / 1000000).toFixed(0)}M VNĐ
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm theo số hóa đơn, nhà cung cấp, mô tả..."
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
                <SelectItem value="pending">Chờ thanh toán</SelectItem>
                <SelectItem value="approved">Đã duyệt</SelectItem>
                <SelectItem value="paid">Đã thanh toán</SelectItem>
                <SelectItem value="overdue">Quá hạn</SelectItem>
                <SelectItem value="rejected">Từ chối</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <div className="grid gap-4">
        {filteredPayments.map((payment) => (
          <Card key={payment.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-bold text-lg text-slate-900">{payment.invoiceNumber}</span>
                    <Badge variant="outline">{payment.id}</Badge>
                    <Badge className={getStatusColor(payment.status)}>
                      {getStatusIcon(payment.status)}
                      <span className="ml-1">{payment.statusText}</span>
                    </Badge>
                    <Badge className={getCategoryColor(payment.category)}>{payment.categoryText}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-slate-500">Nhà cung cấp</p>
                      <p className="font-medium text-slate-900">{payment.supplier}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Số tiền</p>
                      <p className="font-medium text-slate-900 text-lg">{payment.amount} {payment.currency}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Phương thức</p>
                      <p className="font-medium text-slate-900">{payment.methodText}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Hạn thanh toán</p>
                      <p className="font-medium text-slate-900">{payment.dueDate}</p>
                      {payment.paidDate && (
                        <p className="text-green-600">Đã thanh toán: {payment.paidDate}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-600 mb-2">{payment.description}</p>

                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>Người duyệt: {payment.approvedBy}</span>
                    {payment.reference && (
                      <>
                        <span>•</span>
                        <span>Mã tham chiếu: {payment.reference}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Xem
                  </Button>
                  {payment.status === "pending" || payment.status === "approved" ? (
                    <Button size="sm">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Thanh toán
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Sửa
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
