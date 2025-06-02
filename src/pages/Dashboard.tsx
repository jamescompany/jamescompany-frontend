// src/pages/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { 
  Coffee, 
  BookOpen, 
  Bug, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface StatCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor: string;
  iconBg: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const stats: StatCard[] = [
    { 
      title: '예약된 커피챗', 
      value: 2, 
      icon: <Coffee className="w-6 h-6 text-purple-600" />,
      trend: { value: 15, isPositive: true },
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100'
    },
    { 
      title: '수강 중인 강의', 
      value: 1, 
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    { 
      title: '참여 중인 베타 테스트', 
      value: 3, 
      icon: <Bug className="w-6 h-6 text-green-600" />,
      trend: { value: 20, isPositive: true },
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100'
    },
    { 
      title: '다가오는 일정', 
      value: 5, 
      icon: <Calendar className="w-6 h-6 text-orange-600" />,
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-100'
    }
  ];

  const recentActivities = [
    {
      title: '커피챗 예약 완료',
      date: '2024년 1월 25일 오후 2:00',
      description: '김철수 멘토님과의 1:1 상담',
      type: 'coffee',
      status: 'completed'
    },
    {
      title: 'QA 자동화 입문 강의 수강 시작',
      date: '2024년 1월 20일',
      description: '진도율 30% 완료',
      type: 'course',
      status: 'in-progress'
    },
    {
      title: '쇼핑 앱 v2.0 베타 테스트 참여',
      date: '2024년 1월 18일',
      description: '7개의 버그 리포트 제출',
      type: 'beta',
      status: 'completed'
    }
  ];

  const upcomingSchedule = [
    {
      title: '커피챗 - 이영희 멘토',
      time: '오늘 오후 3:00',
      type: 'coffee'
    },
    {
      title: 'API 테스팅 기초 강의',
      time: '내일 오전 10:00',
      type: 'course'
    },
    {
      title: '베타 테스트 피드백 제출',
      time: '1월 28일',
      type: 'beta'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'coffee': return <Coffee className="w-4 h-4" />;
      case 'course': return <BookOpen className="w-4 h-4" />;
      case 'beta': return <Bug className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'coffee': return 'text-purple-600 bg-purple-100';
      case 'course': return 'text-blue-600 bg-blue-100';
      case 'beta': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          안녕하세요, {user?.name || 'Admin'}님! 👋
        </h1>
        <p className="text-gray-600 mt-2">오늘도 성장하는 하루 되세요.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-xl p-6 relative overflow-hidden`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                {stat.trend && (
                  <div className="flex items-center mt-2">
                    <TrendingUp className={`w-4 h-4 ${stat.trend.isPositive ? 'text-green-500' : 'text-red-500'}`} />
                    <span className={`text-sm ml-1 ${stat.trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend.isPositive ? '+' : '-'}{stat.trend.value}%
                    </span>
                  </div>
                )}
              </div>
              <div className={`${stat.iconBg} p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">최근 활동</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  모두 보기
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">{activity.date}</p>
                          <p className="text-sm text-gray-600 mt-2">{activity.description}</p>
                        </div>
                        {activity.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Schedule */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">다가오는 일정</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {upcomingSchedule.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded ${getActivityColor(schedule.type)}`}>
                        {getActivityIcon(schedule.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{schedule.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{schedule.time}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">프로필 정보</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm opacity-80">이메일</p>
                <p className="font-medium">{user?.email || 'admin@jamescompany.kr'}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">회원 등급</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="font-medium">{(user as any)?.membership_tier || 'Pro'}</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Premium</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-white/20 hover:bg-white/30 transition-colors py-2 rounded-lg text-sm font-medium">
                프로필 편집
              </button>
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
            className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Coffee className="w-6 h-6 text-purple-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <h4 className="font-semibold text-gray-900">커피챗</h4>
            <p className="text-sm text-gray-600 mt-1">멘토와의 1:1 대화</p>
          </button>
          
          <button
            onClick={() => window.open('https://casemaker.jamescompany.kr', '_blank')}
            className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <ExternalLink className="w-6 h-6 text-blue-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <h4 className="font-semibold text-gray-900">CaseMaker</h4>
            <p className="text-sm text-gray-600 mt-1">테스트 케이스 생성</p>
          </button>
          
          <button
            onClick={() => window.open('https://qauto.jamescompany.kr', '_blank')}
            className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <ExternalLink className="w-6 h-6 text-green-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
            </div>
            <h4 className="font-semibold text-gray-900">QAuto</h4>
            <p className="text-sm text-gray-600 mt-1">자동화 테스트 도구</p>
          </button>
          
          <button
            onClick={() => navigate('/services/education')}
            className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
            </div>
            <h4 className="font-semibold text-gray-900">교육 서비스</h4>
            <p className="text-sm text-gray-600 mt-1">QA 전문 교육</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;