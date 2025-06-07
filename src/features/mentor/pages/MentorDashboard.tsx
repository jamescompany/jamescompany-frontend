// src/features/mentor/pages/MentorDashboard.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../auth/stores/authStore';
import { Calendar, DollarSign, Users, TrendingUp } from 'lucide-react';
import api from '../../../shared/services/api';

interface DashboardStats {
  totalSessions: number;
  totalRevenue: number;
  upcomingSessions: number;
  thisMonthRevenue: number;
}

const MentorDashboard: React.FC = () => {
  const user = useAuthStore(state => state.user);
  const [stats, setStats] = useState<DashboardStats>({
    totalSessions: 0,
    totalRevenue: 0,
    upcomingSessions: 0,
    thisMonthRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/api/mentors/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // 임시 데이터
      setStats({
        totalSessions: 15,
        totalRevenue: 750000,
        upcomingSessions: 3,
        thisMonthRevenue: 150000
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">멘토 대시보드</h1>
          <p className="text-gray-600 mt-2">안녕하세요, {user?.name}님!</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 세션</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}회</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 수익</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₩{stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">예정된 세션</p>
                <p className="text-2xl font-bold text-gray-900">{stats.upcomingSessions}개</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">이번달 수익</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₩{stats.thisMonthRevenue.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* 빠른 링크 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">빠른 메뉴</h2>
            <div className="space-y-3">
              <Link
                to="/mentor/revenue"
                className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">수익 상세 내역</span>
                  <span className="text-gray-400">→</span>
                </div>
              </Link>
              <Link
                to="/mentor/schedule"
                className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">일정 관리</span>
                  <span className="text-gray-400">→</span>
                </div>
              </Link>
              <Link
                to="/mentor/profile"
                className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">프로필 수정</span>
                  <span className="text-gray-400">→</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">최근 활동</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">김민수님과 세션 완료</span>
                <span className="text-gray-500">2시간 전</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">새로운 예약 - 이영희님</span>
                <span className="text-gray-500">5시간 전</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">2월 정산금 입금 완료</span>
                <span className="text-gray-500">2일 전</span>
              </div>
            </div>
          </div>
        </div>

        {/* 멘토 상태 확인 */}
        {user?.mentorStatus === 'pending' && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              멘토 신청이 검토 중입니다. 승인 후 모든 기능을 이용하실 수 있습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorDashboard;