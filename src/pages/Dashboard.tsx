// src/pages/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

interface StatCard {
  title: string;
  value: number;
  icon: string;
  description?: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const stats: StatCard[] = [
    { title: '예약된 커피챗', value: 2, icon: '☕' },
    { title: '수강 중인 강의', value: 1, icon: '📚' },
    { title: '참여 중인 베타 테스트', value: 3, icon: '🐛' },
    { title: '다가오는 일정', value: 5, icon: '📅' }
  ];

  const recentActivities = [
    {
      title: '커피챗 예약 완료',
      date: '2024년 1월 25일 오후 2:00',
      description: 'QA 자동화 입문 강의 수강 시작'
    },
    {
      title: 'QA 자동화 입문 강의 수강 시작',
      date: '2024년 1월 20일',
      description: '진도율 30% 완료'
    },
    {
      title: '쇼핑 앱 v2.0 베타 테스트 참여',
      date: '2024년 1월 18일',
      description: '7개의 버그 리포트 제출'
    }
  ];

  return (
    <div className="py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">대시보드</h2>
        <p className="text-gray-600 mt-2">안녕하세요, {user?.name || 'Admin'}님!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <span className="text-2xl font-bold text-blue-600">{stat.value}</span>
            </div>
            <h3 className="text-gray-700 text-sm font-medium">{stat.title}</h3>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">최근 활동</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{activity.date}</p>
                    <p className="text-sm text-gray-600 mt-2">{activity.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div>
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">프로필 정보</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">이메일</p>
                  <p className="font-medium">{user?.email || 'admin@jamescompany.kr'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">가입일</p>
                  <p className="font-medium">2024년 1월 15일</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">회원 등급</p>
                  <p className="font-medium">{(user as any)?.membership_tier || 'Pro'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Quick Access */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">빠른 서비스 접근</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/services/coffee-chat')}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-left"
          >
            <div className="text-2xl mb-2">☕</div>
            <h4 className="font-medium text-gray-900">커피챗</h4>
            <p className="text-sm text-gray-600">멘토와의 1:1 대화</p>
          </button>
          
          <button
            onClick={() => window.open('https://casemaker.jamescompany.kr', '_blank')}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-left"
          >
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-900">CaseMaker</h4>
            <p className="text-sm text-gray-600">테스트 케이스 생성</p>
          </button>
          
          <button
            onClick={() => window.open('https://qauto.jamescompany.kr', '_blank')}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-left"
          >
            <div className="text-2xl mb-2">🤖</div>
            <h4 className="font-medium text-gray-900">QAuto</h4>
            <p className="text-sm text-gray-600">자동화 테스트 도구</p>
          </button>
          
          <button
            onClick={() => navigate('/services/education')}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-left"
          >
            <div className="text-2xl mb-2">🎓</div>
            <h4 className="font-medium text-gray-900">교육 서비스</h4>
            <p className="text-sm text-gray-600">QA 전문 교육</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;