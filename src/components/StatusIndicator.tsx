
import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  status: 'active' | 'inactive' | 'pending' | 'error' | 'success' | 'warning';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function StatusIndicator({ status, label, size = 'md', showIcon = true }: StatusIndicatorProps) {
  const statusConfig = {
    active: {
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      label: label || 'Hoạt động'
    },
    inactive: {
      color: 'bg-gray-500',
      textColor: 'text-gray-700',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      label: label || 'Không hoạt động'
    },
    pending: {
      color: 'bg-yellow-500',
      textColor: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      label: label || 'Đang chờ'
    },
    error: {
      color: 'bg-red-500',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      label: label || 'Lỗi'
    },
    success: {
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      label: label || 'Thành công'
    },
    warning: {
      color: 'bg-orange-500',
      textColor: 'text-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      label: label || 'Cảnh báo'
    }
  };

  const sizeConfig = {
    sm: {
      dot: 'w-2 h-2',
      text: 'text-xs',
      padding: 'px-2 py-1'
    },
    md: {
      dot: 'w-3 h-3',
      text: 'text-sm',
      padding: 'px-3 py-1'
    },
    lg: {
      dot: 'w-4 h-4',
      text: 'text-base',
      padding: 'px-4 py-2'
    }
  };

  const config = statusConfig[status];
  const sizeClass = sizeConfig[size];

  return (
    <div className={cn(
      'inline-flex items-center gap-2 rounded-full font-medium border',
      config.bgColor,
      config.borderColor,
      config.textColor,
      sizeClass.padding
    )}>
      {showIcon && (
        <div className={cn(
          'rounded-full',
          config.color,
          sizeClass.dot,
          status === 'pending' && 'animate-pulse'
        )} />
      )}
      <span className={sizeClass.text}>
        {config.label}
      </span>
    </div>
  );
}
