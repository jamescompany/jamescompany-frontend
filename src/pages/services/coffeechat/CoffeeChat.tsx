// src/pages/services/CoffeeChat.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { UserPlus, Coffee, Calendar, Clock, ChevronRight } from 'lucide-react';
import api from '../../../services/api';

// 임시 멘토 데이터
const mockMentors = [
  {
    id: 1,
    name: '홍지현',
    title: '미들레벨 QA 엔지니어',
    expertise: ['웹 테스팅', '1인 QA'],
    session_price: 999990,
    bio: '6년차 QA 엔지니어로 1인 QA 팀 경험이 있습니다.',
    rating: 5.0,
    total_sessions: 999
  },
  {
    id: 2,
    name: '이영희',
    title: '시니어 QA 엔지니어',
    expertise: ['모바일 테스팅', 'API 테스팅', '성능 테스팅'],
    session_price: 60000,
    bio: '모바일 앱 테스팅 전문가로 대규모 서비스 QA 경험이 풍부합니다.',
    rating: 4.9,
    total_sessions: 32
  },
  {
    id: 3,
    name: '박민수',
    title: '테스트 아키텍트',
    expertise: ['테스트 전략', 'QA 리더십', 'SDET'],
    session_price: 80000,
    bio: '테스트 전략 수립과 QA 팀 빌딩 경험이 풍부한 리더입니다.',
    rating: 4.7,
    total_sessions: 28
  }
];

const CoffeeChat: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [showError, setShowError] = useState(false);
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const loadData = async () => {
      // 개발 환경에서는 임시 데이터 사용 (백엔드가 준비될 때까지)
      const isDevelopment = import.meta.env.DEV;
      
      if (isDevelopment) {
        // 개발 환경: 임시 데이터 사용
        setTimeout(() => {
          if (mounted) {
            setMentors(mockMentors);
            setShowError(false);
            setLoading(false);
          }
        }, 500); // 로딩 효과를 위한 딜레이
      } else {
        // 프로덕션 환경: 실제 API 호출
        try {
          const response = await api.get('/api/mentors');
          if (mounted) {
            setMentors(response.data);
            setShowError(false);
          }
        } catch (err: any) {
          if (mounted) {
            console.error('Failed to fetch mentors:', err);
            setMentors(mockMentors);
            setShowError(true);
          }
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      }
    };
    
    loadData();
    
    return () => {
      mounted = false;
    };
  }, []);

  const displayMentors = mentors.length > 0 ? mentors : [];

  const handleMentorRegistration = () => {
    if (!isAuthenticated) {
      alert('멘토 등록을 위해 먼저 로그인해주세요.');
      navigate('/login');
      return;
    }
    navigate('/services/coffee-chat/mentor-registration');
  };

  const handleBooking = (mentorId: number) => {
    if (!isAuthenticated) {
      alert('예약을 위해 먼저 로그인해주세요.');
      navigate('/login');
      return;
    }
    navigate(`/services/coffee-chat/booking/${mentorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Coffee className="w-10 h-10 mr-3 text-blue-600" />
              커피챗
            </h1>
            <p className="text-xl text-gray-600 mb-8">QA 전문가와 1:1 대화를 나눠보세요</p>
            
            {/* 멘토 등록 CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold mb-2">QA 전문가이신가요?</h3>
              <p className="text-gray-600 mb-4">
                당신의 경험과 지식을 공유하고 수익을 창출하세요
              </p>
              <button
                onClick={handleMentorRegistration}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                멘토로 등록하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 멘토 목록 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {showError && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              서비스가 준비 중입니다. 곧 실제 멘토 정보를 확인하실 수 있습니다.
            </p>
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-900 mb-8">멘토 찾기</h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">로딩 중...</p>
          </div>
        ) : displayMentors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayMentors.map((mentor) => (
              <div key={mentor.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {mentor.name}
                      </h3>
                      <p className="text-gray-600">{mentor.title}</p>
                    </div>
                    {mentor.rating && (
                      <div className="text-right">
                        <div className="flex items-center text-yellow-500">
                          <span className="text-sm font-medium mr-1">{mentor.rating}</span>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        {mentor.total_sessions && (
                          <p className="text-xs text-gray-500">{mentor.total_sessions}회 진행</p>
                        )}
                      </div>
                    )}
                  </div>

                  {mentor.bio && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                      {mentor.bio}
                    </p>
                  )}

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.slice(0, 3).map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {mentor.expertise.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{mentor.expertise.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-gray-900">
                        ₩{mentor.session_price?.toLocaleString() || '50,000'}
                      </span>
                      <span className="text-sm text-gray-500">/세션</span>
                    </div>
                    
                    <button
                      onClick={() => handleBooking(mentor.id)}
                      className="w-full flex items-center justify-center py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      예약하기
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">현재 등록된 멘토가 없습니다.</p>
            <p className="text-sm text-gray-500 mt-2">곧 멋진 멘토들을 만나보실 수 있습니다!</p>
          </div>
        )}

        {/* 서비스 안내 */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">1:1 맞춤 상담</h3>
            <p className="text-gray-600 text-sm">
              QA 분야 전문가와 1:1로 깊이 있는 대화를 나눌 수 있습니다
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">편리한 일정 관리</h3>
            <p className="text-gray-600 text-sm">
              Google Calendar와 연동하여 손쉽게 일정을 관리할 수 있습니다
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">유연한 시간 선택</h3>
            <p className="text-gray-600 text-sm">
              멘토의 가능한 시간대를 확인하고 원하는 시간을 선택하세요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeChat;