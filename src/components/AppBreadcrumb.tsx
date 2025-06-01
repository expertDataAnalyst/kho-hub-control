
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const routeLabels: Record<string, string> = {
  '/': 'Tổng quan',
  '/warehouses': 'Danh sách kho',
  '/materials': 'Vật tư',
  '/inventory': 'Tồn kho',
  '/delivery-orders': 'Phiếu xuất/nhập',
  '/confirmations': 'Xác nhận đơn',
  '/users': 'Người dùng',
  '/drivers': 'Tài xế',
  '/sites': 'Công trình',
  '/machines': 'Thiết bị',
  '/reports': 'Báo cáo',
  '/payments': 'Thanh toán',
  '/settings': 'Cài đặt',
};

export function AppBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/') {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-1">
              <Home className="w-4 h-4" />
              Tổng quan
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="flex items-center gap-1 hover:text-red-600 transition-colors">
              <Home className="w-4 h-4" />
              Trang chủ
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const label = routeLabels[routeTo] || pathname;

          return (
            <div key={routeTo} className="flex items-center">
              <BreadcrumbSeparator>
                <ChevronRight className="w-4 h-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="font-medium">{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={routeTo} className="hover:text-red-600 transition-colors">
                      {label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
