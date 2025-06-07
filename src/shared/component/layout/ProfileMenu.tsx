// src/components/layout/ProfileMenu.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, CreditCard, LogOut, HelpCircle } from 'lucide-react';
import { useAuthStore } from '../../../features/auth/stores/authStore';
import Popover from '../ui/Popover';

const ProfileMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    {
      icon: User,
      label: '내 정보',
      onClick: () => navigate('/profile')
    },
    {
      icon: Settings,
      label: '계정 설정',
      onClick: () => navigate('/settings')
    },
    {
      icon: CreditCard,
      label: '결제 관리',
      onClick: () => navigate('/billing')
    },
    {
      icon: HelpCircle,
      label: '도움말',
      onClick: () => navigate('/help')
    }
  ];

  return (
    <Popover
      placement="bottom-end"
      trigger={
        <button className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <span className="hidden sm:inline">{user?.name}</span>
        </button>
      }
    >
      <div className="py-2">
        {/* User Info */}
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
          <p className="text-xs text-blue-600 mt-1">
            {(user as any)?.membership_tier || 'Free'} Plan
          </p>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
              >
                <Icon className="w-4 h-4 text-gray-500" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <div className="border-t border-gray-100 py-2">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
          >
            <LogOut className="w-4 h-4 text-gray-500" />
            <span>로그아웃</span>
          </button>
        </div>
      </div>
    </Popover>
  );
};

export default ProfileMenu;