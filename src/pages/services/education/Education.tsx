// src/pages/services/education/Education.tsx
import { useState } from 'react';
import { BookOpen, Clock, Users, Award, PlayCircle, Lock } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  students: number;
  price: number;
  modules: number;
  isLocked: boolean;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'QA 기초 과정',
    description: '소프트웨어 테스팅의 기본 개념과 원칙을 배우는 입문 과정',
    level: 'beginner',
    duration: '4주',
    students: 1234,
    price: 0,
    modules: 8,
    isLocked: false
  },
  {
    id: '2',
    title: '웹 애플리케이션 테스팅',
    description: '웹 애플리케이션 테스팅 전략과 실전 기법을 익히는 과정',
    level: 'intermediate',
    duration: '6주',
    students: 856,
    price: 99000,
    modules: 12,
    isLocked: false
  },
  {
    id: '3',
    title: '테스트 자동화 마스터',
    description: 'Selenium, Cypress 등을 활용한 E2E 자동화 테스트 구축',
    level: 'advanced',
    duration: '8주',
    students: 423,
    price: 199000,
    modules: 16,
    isLocked: true
  },
  {
    id: '4',
    title: 'API 테스팅 완벽 가이드',
    description: 'Postman, REST Assured를 활용한 API 테스팅 전문 과정',
    level: 'intermediate',
    duration: '5주',
    students: 567,
    price: 149000,
    modules: 10,
    isLocked: true
  },
  {
    id: '5',
    title: '성능 테스팅과 최적화',
    description: 'JMeter, LoadRunner를 활용한 성능 테스팅 실무',
    level: 'advanced',
    duration: '6주',
    students: 234,
    price: 179000,
    modules: 14,
    isLocked: true
  },
  {
    id: '6',
    title: 'SDET 실무 과정',
    description: '개발과 테스팅을 아우르는 SDET 역량 강화 프로그램',
    level: 'advanced',
    duration: '10주',
    students: 189,
    price: 299000,
    modules: 20,
    isLocked: true
  }
];

const Education = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const filteredCourses = selectedLevel === 'all' 
    ? courses 
    : courses.filter(course => course.level === selectedLevel);

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner':
        return '초급';
      case 'intermediate':
        return '중급';
      case 'advanced':
        return '고급';
      default:
        return level;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            QA 교육 프로그램
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            체계적인 커리큘럼으로 QA 전문가로 성장하세요
          </p>
        </div>

        {/* 필터 */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedLevel === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setSelectedLevel('beginner')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedLevel === 'beginner'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              초급
            </button>
            <button
              onClick={() => setSelectedLevel('intermediate')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedLevel === 'intermediate'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              중급
            </button>
            <button
              onClick={() => setSelectedLevel('advanced')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedLevel === 'advanced'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              고급
            </button>
          </div>
        </div>

        {/* 코스 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow ${
                course.isLocked ? 'opacity-75' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getLevelBadge(course.level)}`}>
                    {getLevelText(course.level)}
                  </span>
                  {course.isLocked && (
                    <Lock className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>{course.modules}개 모듈</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{course.students.toLocaleString()}명 수강</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      {course.price === 0 ? (
                        <span className="text-2xl font-bold text-green-600">무료</span>
                      ) : (
                        <span className="text-2xl font-bold text-gray-900">
                          ₩{course.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <button
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        course.isLocked
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                      disabled={course.isLocked}
                    >
                      {course.isLocked ? '준비 중' : '수강하기'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 추가 정보 */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">수료증 발급</h3>
              <p className="text-gray-600 text-sm">
                과정 완료 시 공식 수료증을 발급해드립니다
              </p>
            </div>
            <div>
              <PlayCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">실습 중심 교육</h3>
              <p className="text-gray-600 text-sm">
                이론과 실습을 병행하는 실무 중심 커리큘럼
              </p>
            </div>
            <div>
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">멘토링 지원</h3>
              <p className="text-gray-600 text-sm">
                현직 QA 전문가의 1:1 멘토링 제공
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;