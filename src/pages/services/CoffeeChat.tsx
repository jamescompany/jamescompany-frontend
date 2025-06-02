// src/pages/services/CoffeeChat.tsx
import React, { useEffect, useState } from 'react';
import { useServiceStore } from '../../stores/serviceStore';

const CoffeeChat: React.FC = () => {
  const { coffeeSlots, fetchCoffeeSlots, loading, error } = useServiceStore();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    // API 호출을 try-catch로 감싸고 에러 처리
    const loadSlots = async () => {
      try {
        if (mounted) {
          await fetchCoffeeSlots();
        }
      } catch (err) {
        if (mounted) {
          console.log('Coffee chat API not available yet');
          setShowError(true);
        }
      }
    };
    
    loadSlots();
    
    return () => {
      mounted = false;
    };
  }, []); // fetchCoffeeSlots 의존성 제거

  // 임시 데이터
  const mockSlots = [
    {
      id: 1,
      mentorName: '김철수',
      title: 'QA 자동화 전문가',
      date: '2024-02-01',
      time: '14:00-15:00',
      available: true
    },
    {
      id: 2,
      mentorName: '이영희',
      title: '시니어 QA 엔지니어',
      date: '2024-02-02',
      time: '15:00-16:00',
      available: true
    },
    {
      id: 3,
      mentorName: '박민수',
      title: '테스트 아키텍트',
      date: '2024-02-03',
      time: '10:00-11:00',
      available: false
    }
  ];

  const displaySlots = coffeeSlots?.length > 0 ? coffeeSlots : mockSlots;

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">커피챗</h1>
          <p className="text-xl text-gray-600">QA 전문가와 1:1 대화를 나눠보세요</p>
        </div>

        {error && showError && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              서비스가 준비 중입니다. 곧 실제 멘토 정보를 확인하실 수 있습니다.
            </p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">로딩 중...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displaySlots.map((slot: any) => (
              <div key={slot.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {slot.mentorName}
                </h3>
                <p className="text-gray-600 mb-4">{slot.title}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>📅 {slot.date}</p>
                  <p>⏰ {slot.time}</p>
                </div>
                <button
                  className={`mt-4 w-full py-2 px-4 rounded-lg font-medium ${
                    slot.available
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!slot.available}
                >
                  {slot.available ? '예약하기' : '예약 마감'}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">커피챗 안내</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>QA 분야 전문가와 1:1로 대화할 수 있습니다</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>커리어 상담, 기술 질문, 업계 동향 등 다양한 주제로 대화 가능</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Google Calendar와 연동하여 편리하게 일정 관리</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoffeeChat;