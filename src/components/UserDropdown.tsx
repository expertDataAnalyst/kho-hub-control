
import { useState } from 'react';
import { User, Settings, LogOut, UserCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function UserDropdown() {
  const [user] = useState({
    name: 'Nguyễn Văn A',
    email: 'admin@quanlykho.com',
    role: 'Quản trị viên',
    avatar: ''
  });

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Đăng xuất');
  };

  const handleProfile = () => {
    // Handle profile navigation
    console.log('Xem hồ sơ');
  };

  const handleSettings = () => {
    // Handle settings navigation
    console.log('Cài đặt');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-100">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-red-600 text-white font-semibold">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-64 bg-white border shadow-lg" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            <div className="flex items-center mt-2">
              <Shield className="w-3 h-3 mr-1 text-red-600" />
              <span className="text-xs text-red-600 font-medium">{user.role}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleProfile} className="cursor-pointer hover:bg-gray-50">
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Hồ sơ cá nhân</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={handleSettings} className="cursor-pointer hover:bg-gray-50">
            <Settings className="mr-2 h-4 w-4" />
            <span>Cài đặt</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer hover:bg-red-50 text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
