// src/features/profile/pages/Profile.tsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../auth/stores/authStore';
import api from '../../../shared/services/api';
import { Calendar, Coffee, CreditCard, User, MapPin } from 'lucide-react';

// 컴포넌트 import
import ProfileInfo from '../components/ProfileInfo';
import LocationSettings from '../components/LocationSettings';
import BookingHistory from '../components/BookingHistory';
import MembershipInfo from '../components/MembershipInfo';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  created_at: string;
  membership_tier: string;
  is_admin: boolean;
  is_active: boolean;
}

interface Booking {
  id: string;
  mentorName: string;
  scheduledDate: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [bookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // authStore의 user 정보 사용
    if (user) {
      setProfile({
        id: user.id || '1',
        email: user.email,
        name: user.name || user.email.split('@')[0], // 이름이 없으면 이메일의 @ 앞부분 사용
        created_at: new Date().toISOString(),
        membership_tier: 'Free',
        is_admin: false,
        is_active: true
      });
      setLoading(false);
    } else {
      fetchUserData();
    }
  }, [isAuthenticated, navigate, user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // API 경로 수정 - baseURL 확인 필요
      const response = await api.get('/users/me');
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      
      // API 실패 시 authStore의 user 정보 사용
      if (user) {
        setProfile({
          id: user.id || '1',
          email: user.email,
          name: user.name || user.email.split('@')[0],
          created_at: new Date().toISOString(),
          membership_tier: 'Free',
          is_admin: false,
          is_active: true
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg">
        {/* 프로필 헤더 */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">마이페이지</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              프로필 정보
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'location'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <MapPin className="w-4 h-4 inline mr-2" />
              위치 설정
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'bookings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              예약 내역
            </button>
            <button
              onClick={() => setActiveTab('membership')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'membership'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <CreditCard className="w-4 h-4 inline mr-2" />
              멤버십
            </button>
          </nav>
        </div>

        {/* 탭 내용 */}
        <div className="p-6">
          {activeTab === 'profile' && <ProfileInfo profile={profile} />}
          {activeTab === 'location' && <LocationSettings />}
          {activeTab === 'bookings' && <BookingHistory profile={profile} />}
          {activeTab === 'membership' && <MembershipInfo profile={profile} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;