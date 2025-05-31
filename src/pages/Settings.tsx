
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Database,
  Mail,
  Smartphone,
  Globe,
  Download,
  Upload,
  Trash2
} from "lucide-react";

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const settingsSections = [
    {
      title: "Thông tin cá nhân",
      icon: User,
      items: [
        { label: "Tên đầy đủ", value: "Nguyễn Văn An", type: "input" },
        { label: "Email", value: "an.nguyen@company.com", type: "input" },
        { label: "Số điện thoại", value: "0123456789", type: "input" },
        { label: "Chức vụ", value: "Quản trị viên", type: "input" },
      ]
    },
    {
      title: "Thông báo",
      icon: Bell,
      items: [
        { label: "Thông báo email", value: emailNotifications, type: "switch", onChange: setEmailNotifications },
        { label: "Thông báo SMS", value: smsNotifications, type: "switch", onChange: setSmsNotifications },
        { label: "Thông báo trình duyệt", value: true, type: "switch" },
        { label: "Báo cáo hàng tuần", value: true, type: "switch" },
      ]
    },
    {
      title: "Bảo mật",
      icon: Shield,
      items: [
        { label: "Xác thực 2 bước", value: twoFactorAuth, type: "switch", onChange: setTwoFactorAuth },
        { label: "Đăng xuất tự động", value: "30 phút", type: "select" },
        { label: "Mật khẩu", value: "••••••••", type: "password" },
        { label: "Phiên đăng nhập", value: "Quản lý phiên", type: "button" },
      ]
    },
    {
      title: "Hệ thống",
      icon: Database,
      items: [
        { label: "Sao lưu tự động", value: autoBackup, type: "switch", onChange: setAutoBackup },
        { label: "Ngôn ngữ", value: "Tiếng Việt", type: "select" },
        { label: "Múi giờ", value: "GMT+7", type: "select" },
        { label: "Định dạng ngày", value: "DD/MM/YYYY", type: "select" },
      ]
    }
  ];

  const quickActions = [
    {
      title: "Xuất dữ liệu",
      description: "Tải về toàn bộ dữ liệu hệ thống",
      icon: Download,
      action: "export",
      color: "bg-blue-500"
    },
    {
      title: "Nhập dữ liệu",
      description: "Tải lên dữ liệu từ file Excel/CSV",
      icon: Upload,
      action: "import",
      color: "bg-green-500"
    },
    {
      title: "Sao lưu dữ liệu",
      description: "Tạo bản sao lưu thủ công",
      icon: Database,
      action: "backup",
      color: "bg-purple-500"
    },
    {
      title: "Xóa dữ liệu",
      description: "Xóa dữ liệu cũ và không cần thiết",
      icon: Trash2,
      action: "cleanup",
      color: "bg-red-500"
    }
  ];

  const systemInfo = [
    { label: "Phiên bản hệ thống", value: "v2.1.5" },
    { label: "Cơ sở dữ liệu", value: "PostgreSQL 14.2" },
    { label: "Máy chủ", value: "Ubuntu 22.04 LTS" },
    { label: "Dung lượng sử dụng", value: "2.4GB / 10GB" },
    { label: "Người dùng online", value: "12 / 50" },
    { label: "Lần cập nhật cuối", value: "2024-12-15 10:30" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Cài đặt hệ thống</h1>
          <p className="text-slate-600">Quản lý cấu hình và tùy chỉnh hệ thống</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <Card key={index} className="card-hover cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${action.color}`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{action.title}</h3>
                  <p className="text-sm text-slate-600">{action.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Sections */}
        <div className="lg:col-span-2 space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <Card key={sectionIndex}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <section.icon className="w-5 h-5" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <label className="text-sm font-medium text-slate-700">
                          {item.label}
                        </label>
                      </div>
                      <div className="flex-1 max-w-xs">
                        {item.type === "input" && (
                          <Input 
                            value={item.value as string} 
                            className="text-sm"
                            readOnly
                          />
                        )}
                        {item.type === "switch" && (
                          <Switch 
                            checked={item.value as boolean}
                            onCheckedChange={item.onChange}
                          />
                        )}
                        {item.type === "select" && (
                          <Input 
                            value={item.value as string} 
                            className="text-sm"
                            readOnly
                          />
                        )}
                        {item.type === "password" && (
                          <div className="flex gap-2">
                            <Input 
                              type="password"
                              value={item.value as string} 
                              className="text-sm"
                              readOnly
                            />
                            <Button variant="outline" size="sm">Đổi</Button>
                          </div>
                        )}
                        {item.type === "button" && (
                          <Button variant="outline" size="sm">
                            {item.value as string}
                          </Button>
                        )}
                      </div>
                    </div>
                    {itemIndex < section.items.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                Thông tin hệ thống
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemInfo.map((info, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">{info.label}</span>
                  <span className="text-sm font-medium text-slate-900">{info.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hoạt động gần đây</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium text-slate-900">Đăng nhập thành công</p>
                <p className="text-slate-600">2024-12-31 08:30</p>
              </div>
              <Separator />
              <div className="text-sm">
                <p className="font-medium text-slate-900">Cập nhật thông tin</p>
                <p className="text-slate-600">2024-12-30 15:45</p>
              </div>
              <Separator />
              <div className="text-sm">
                <p className="font-medium text-slate-900">Thay đổi mật khẩu</p>
                <p className="text-slate-600">2024-12-28 10:20</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button className="flex-1">
              Lưu thay đổi
            </Button>
            <Button variant="outline" className="flex-1">
              Hủy bỏ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
