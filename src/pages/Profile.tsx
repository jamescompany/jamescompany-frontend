// src/pages/Profile.tsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';
import { Calendar, Coffee, CreditCard, User } from 'lucide-react';

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
  const { isAuthenticated, logout } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [bookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchUserData();
  }, [isAuthenticated, navigate]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/users/me');
      setProfile(response.data);
      
      // TODO: 예약 내역 API 구현 후 연동
      // const bookingsResponse = await api.get('/api/bookings/my');
      // setBookings(bookingsResponse.data);
      
    } catch (error) {
      console.error('Failed to fetch user data:', error);
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
          {activeTab === 'profile' && profile && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">기본 정보</h3>
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">이름</dt>
                    <dd className="mt-1 text-sm text-gray-900">{profile.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">이메일</dt>
                    <dd className="mt-1 text-sm text-gray-900">{profile.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">가입일</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(profile.created_at).toLocaleDateString('ko-KR')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">멤버십</dt>
                    <dd className="mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        profile.membership_tier === 'Pro' ? 'bg-purple-100 text-purple-800' :
                        profile.membership_tier === 'Basic' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {profile.membership_tier}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">계정 유형</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {profile.is_admin ? '관리자' : '일반 사용자'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">계정 상태</dt>
                    <dd className="mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        profile.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {profile.is_active ? '활성' : '비활성'}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">예약 내역</h3>
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{booking.mentorName}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(booking.scheduledDate).toLocaleString('ko-KR')}
                          </p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status === 'confirmed' ? '확정' :
                           booking.status === 'completed' ? '완료' :
                           booking.status === 'cancelled' ? '취소' : '대기'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Coffee className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">아직 예약 내역이 없습니다</p>
                  <button
                    onClick={() => navigate('/services/coffee-chat')}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    커피챗 예약하기
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'membership' && profile && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">멤버십 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Free', 'Basic', 'Pro'].map((tier) => (
                  <div
                    key={tier}
                    className={`border rounded-lg p-6 ${
                      profile.membership_tier === tier ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <h4 className="text-lg font-semibold mb-2">{tier}</h4>
                    <p className="text-3xl font-bold mb-4">
                      {tier === 'Free' ? '₩0' : tier === 'Basic' ? '₩9,900' : '₩29,900'}
                      <span className="text-sm font-normal text-gray-500">/월</span>
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>✓ 기본 서비스 이용</li>
                      {tier !== 'Free' && <li>✓ 우선 예약 권한</li>}
                      {tier === 'Pro' && <li>✓ 무제한 커피챗</li>}
                    </ul>
                    {profile.membership_tier === tier ? (
                      <button disabled className="mt-4 w-full py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">
                        현재 플랜
                      </button>
                    ) : (
                      <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        업그레이드
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;