// src/pages/mypage/MyPageLayout.tsx

import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  FileText, 
  CreditCard, 
  Settings,
  ChevronRight
} from 'lucide-react';

const MyPageLayout = () => {
  const location = useLocation();
  
  const sidebarItems = [
    { name: '프로필', path: '/mypage/profile', icon: User },
    { name: '내 예약', path: '/mypage/bookings', icon: Calendar },
    { name: '지원 현황', path: '/mypage/applications', icon: FileText },
    { name: '결제 내역', path: '/mypage/payments', icon: CreditCard },
    { name: '설정', path: '/mypage/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">마이페이지</h2>
              <nav className="space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageLayout;