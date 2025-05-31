
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  FileText,
  PieChart,
  Activity,
  Package,
  Truck,
  Building2
} from "lucide-react";

export default function Reports() {
  const [dateRange, setDateRange] = useState("this_month");
  const [reportType, setReportType] = useState("all");

  const reports = [
    {
      id: "RPT-001",
      title: "Báo cáo xuất nhập kho tháng 12",
      type: "inventory",
      typeText: "Tồn kho",
      period: "Tháng 12/2024",
      status: "completed",
      statusText: "Hoàn thành",
      generatedBy: "Nguyễn Văn An",
      generatedAt: "2024-12-31 08:30",
      fileSize: "2.5 MB",
      downloads: 15,
      description: "Tổng hợp tình hình xuất nhập kho các loại vật tư trong tháng 12"
    },
    {
      id: "RPT-002",
      title: "Báo cáo vận chuyển quý 4",
      type: "delivery",
      typeText: "Vận chuyển",
      period: "Quý 4/2024",
      status: "processing",
      statusText: "Đang xử lý",
      generatedBy: "Trần Thị Bình",
      generatedAt: "2024-12-30 14:20",
      fileSize: "1.8 MB",
      downloads: 8,
      description: "Thống kê hiệu suất và chi phí vận chuyển quý 4"
    },
    {
      id: "RPT-003",
      title: "Báo cáo tài chính năm 2024",
      type: "financial",
      typeText: "Tài chính",
      period: "Năm 2024",
      status: "draft",
      statusText: "Nháp",
      generatedBy: "Lê Văn Cường",
      generatedAt: "2024-12-29 16:45",
      fileSize: "4.2 MB",
      downloads: 3,
      description: "Báo cáo tổng hợp tình hình tài chính và dòng tiền năm 2024"
    },
    {
      id: "RPT-004",
      title: "Báo cáo hiệu suất công trình",
      type: "performance",
      typeText: "Hiệu suất",
      period: "Tháng 12/2024",
      status: "completed",
      statusText: "Hoàn thành",
      generatedBy: "Phạm Văn Dũng",
      generatedAt: "2024-12-28 10:15",
      fileSize: "3.1 MB",
      downloads: 22,
      description: "Đánh giá tiến độ và hiệu suất các công trình đang triển khai"
    }
  ];

  const quickStats = [
    {
      title: "Tổng đơn hàng",
      value: "1,245",
      change: "+12.5%",
      trend: "up",
      icon: Package,
      color: "bg-blue-500"
    },
    {
      title: "Doanh thu",
      value: "125.6B",
      change: "+8.3%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-green-500"
    },
    {
      title: "Chuyến vận chuyển",
      value: "856",
      change: "+15.2%",
      trend: "up",
      icon: Truck,
      color: "bg-purple-500"
    },
    {
      title: "Công trình hoạt động",
      value: "24",
      change: "+2",
      trend: "up",
      icon: Building2,
      color: "bg-orange-500"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "inventory":
        return "bg-blue-100 text-blue-800";
      case "delivery":
        return "bg-green-100 text-green-800";
      case "financial":
        return "bg-purple-100 text-purple-800";
      case "performance":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesType = reportType === "all" || report.type === reportType;
    return matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Báo cáo & Thống kê</h1>
          <p className="text-slate-600">Xem và tạo các báo cáo phân tích dữ liệu</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Tạo báo cáo mới
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="stat-card card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} so với tháng trước
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Xu hướng xuất nhập kho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600">Biểu đồ xuất nhập kho theo thời gian</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Phân bố loại vật tư
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600">Biểu đồ phân bố các loại vật tư</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Chọn khoảng thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this_week">Tuần này</SelectItem>
                <SelectItem value="this_month">Tháng này</SelectItem>
                <SelectItem value="this_quarter">Quý này</SelectItem>
                <SelectItem value="this_year">Năm này</SelectItem>
                <SelectItem value="custom">Tùy chỉnh</SelectItem>
              </SelectContent>
            </Select>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Loại báo cáo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả báo cáo</SelectItem>
                <SelectItem value="inventory">Tồn kho</SelectItem>
                <SelectItem value="delivery">Vận chuyển</SelectItem>
                <SelectItem value="financial">Tài chính</SelectItem>
                <SelectItem value="performance">Hiệu suất</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="grid gap-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-bold text-lg text-slate-900">{report.title}</span>
                    <Badge variant="outline">{report.id}</Badge>
                    <Badge className={getTypeColor(report.type)}>{report.typeText}</Badge>
                    <Badge className={getStatusColor(report.status)}>{report.statusText}</Badge>
                  </div>
                  
                  <p className="text-slate-600 mb-3">{report.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-slate-500">Kỳ báo cáo</p>
                      <p className="font-medium text-slate-900">{report.period}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Người tạo</p>
                      <p className="font-medium text-slate-900">{report.generatedBy}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Kích thước</p>
                      <p className="font-medium text-slate-900">{report.fileSize}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>Tạo lúc: {report.generatedAt}</span>
                    <span>•</span>
                    <span>Đã tải: {report.downloads} lần</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Xem
                  </Button>
                  {report.status === "completed" && (
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Tải về
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
