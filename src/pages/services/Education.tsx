// src/pages/services/Education.tsx
import React, { useEffect, useState } from 'react';
import { useServiceStore } from '../../stores/serviceStore';

const Education: React.FC = () => {
  const { courses, fetchCourses, loading, error } = useServiceStore();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    const loadCourses = async () => {
      try {
        if (mounted) {
          await fetchCourses();
        }
      } catch (err) {
        if (mounted) {
          console.log('Education API not available yet');
          setShowError(true);
        }
      }
    };
    
    loadCourses();
    
    return () => {
      mounted = false;
    };
  }, []); // fetchCourses 의존성 제거

  // 임시 데이터
  const mockCourses = [
    {
      id: 1,
      title: 'QA 자동화 입문',
      description: 'Selenium, Cypress 등 자동화 도구의 기초를 배웁니다',
      instructor: '김철수',
      duration: '8주',
      level: '초급',
      price: '299,000원',
      thumbnail: '🤖'
    },
    {
      id: 2,
      title: 'API 테스팅 마스터',
      description: 'Postman, REST Assured를 활용한 API 테스팅 완벽 가이드',
      instructor: '이영희',
      duration: '6주',
      level: '중급',
      price: '399,000원',
      thumbnail: '🔌'
    },
    {
      id: 3,
      title: '성능 테스팅 실전',
      description: 'JMeter, K6를 활용한 성능 테스팅 실무',
      instructor: '박민수',
      duration: '10주',
      level: '고급',
      price: '499,000원',
      thumbnail: '📊'
    },
    {
      id: 4,
      title: '모바일 앱 테스팅',
      description: 'Appium을 활용한 모바일 자동화 테스팅',
      instructor: '정수진',
      duration: '8주',
      level: '중급',
      price: '349,000원',
      thumbnail: '📱'
    }
  ];

  const displayCourses = courses?.length > 0 ? courses : mockCourses;

  const getLevelColor = (level: string) => {
    switch (level) {
      case '초급': return 'bg-green-100 text-green-800';
      case '중급': return 'bg-yellow-100 text-yellow-800';
      case '고급': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">교육 서비스</h1>
          <p className="text-xl text-gray-600">QA 전문가로 성장하기 위한 체계적인 교육 과정</p>
        </div>

        {error && showError && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">
              새로운 교육 과정을 준비 중입니다. 곧 더 많은 강의를 만나보실 수 있습니다.
            </p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">로딩 중...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {displayCourses.map((course: any) => (
                <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-6xl">{course.thumbnail}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {course.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <p>👨‍🏫 강사: {course.instructor}</p>
                      <p>⏱️ 기간: {course.duration}</p>
                      <p>💰 수강료: {course.price}</p>
                    </div>
                    <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                      수강 신청
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">교육 과정 특징</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🎯 실무 중심 커리큘럼</h3>
                  <p className="text-gray-600">현업에서 바로 활용 가능한 실무 위주의 교육</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📚 체계적인 학습 자료</h3>
                  <p className="text-gray-600">동영상 강의, 실습 자료, 퀴즈 등 다양한 학습 콘텐츠</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">💬 실시간 Q&A</h3>
                  <p className="text-gray-600">강사와 직접 소통하며 궁금증을 해결</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🏆 수료증 발급</h3>
                  <p className="text-gray-600">과정 수료 시 공식 수료증 발급</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Education;