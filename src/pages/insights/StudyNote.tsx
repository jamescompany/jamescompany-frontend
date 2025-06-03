// src/pages/insights/StudyNote.tsx

import { useState } from 'react';
import { FileText, Clock, Download, Eye, BookOpen, Code } from 'lucide-react';

interface StudyNote {
  id: string;
  title: string;
  description: string;
  category: 'testing-basics' | 'automation' | 'tools' | 'best-practices' | 'programming';
  level: 'beginner' | 'intermediate' | 'advanced';
  author: string;
  date: string;
  readTime: string;
  views: number;
  downloads: number;
  topics: string[];
  hasCode: boolean;
  isPremium: boolean;
}

const studyNotes: StudyNote[] = [
  {
    id: '1',
    title: 'Cypress E2E 테스트 자동화 완벽 가이드',
    description: 'Cypress를 활용한 End-to-End 테스트 자동화 구축 방법을 단계별로 설명합니다. 실제 프로젝트에 적용할 수 있는 예제 코드 포함.',
    category: 'automation',
    level: 'intermediate',
    author: 'JamesCompany',
    date: '2024-02-15',
    readTime: '15분',
    views: 342,
    downloads: 89,
    topics: ['Cypress', 'E2E테스트', '자동화', 'JavaScript'],
    hasCode: true,
    isPremium: false
  },
  {
    id: '2',
    title: '소프트웨어 테스팅의 기초: 테스트 케이스 작성법',
    description: '효과적인 테스트 케이스를 작성하는 방법과 테스트 설계 기법을 배웁니다. 초보자를 위한 실습 예제 포함.',
    category: 'testing-basics',
    level: 'beginner',
    author: 'JamesCompany',
    date: '2024-02-12',
    readTime: '10분',
    views: 567,
    downloads: 234,
    topics: ['테스트케이스', '테스트설계', '기초'],
    hasCode: false,
    isPremium: false
  },
  {
    id: '3',
    title: 'API 테스팅 마스터하기: Postman에서 코드까지',
    description: 'Postman을 활용한 API 테스팅부터 자동화 스크립트 작성까지, API 테스팅의 모든 것을 다룹니다.',
    category: 'tools',
    level: 'intermediate',
    author: 'JamesCompany',
    date: '2024-02-10',
    readTime: '20분',
    views: 423,
    downloads: 156,
    topics: ['API테스팅', 'Postman', 'RestAssured', '자동화'],
    hasCode: true,
    isPremium: true
  },
  {
    id: '4',
    title: 'Python으로 시작하는 테스트 자동화',
    description: 'Python과 Selenium을 활용한 웹 애플리케이션 테스트 자동화 입문 가이드. pytest 프레임워크 활용법 포함.',
    category: 'programming',
    level: 'beginner',
    author: 'JamesCompany',
    date: '2024-02-08',
    readTime: '25분',
    views: 892,
    downloads: 345,
    topics: ['Python', 'Selenium', 'pytest', '자동화'],
    hasCode: true,
    isPremium: false
  },
  {
    id: '5',
    title: '성능 테스팅 베스트 프랙티스',
    description: 'JMeter를 활용한 성능 테스팅 전략과 결과 분석 방법. 실제 사례를 통한 문제 해결 접근법.',
    category: 'best-practices',
    level: 'advanced',
    author: 'JamesCompany',
    date: '2024-02-05',
    readTime: '30분',
    views: 234,
    downloads: 78,
    topics: ['성능테스팅', 'JMeter', '부하테스트', '분석'],
    hasCode: true,
    isPremium: true
  }
];

const StudyNote = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const categories = [
    { id: 'all', label: '전체' },
    { id: 'testing-basics', label: '테스팅 기초' },
    { id: 'automation', label: '자동화' },
    { id: 'tools', label: '도구' },
    { id: 'best-practices', label: '베스트 프랙티스' },
    { id: 'programming', label: '프로그래밍' }
  ];

  const levels = [
    { id: 'all', label: '전체' },
    { id: 'beginner', label: '초급' },
    { id: 'intermediate', label: '중급' },
    { id: 'advanced', label: '고급' }
  ];

  const filteredNotes = studyNotes.filter(note => {
    const categoryMatch = selectedCategory === 'all' || note.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || note.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <FileText className="w-8 h-8 mr-3 text-green-600" />
            학습 자료
          </h1>
          <p className="text-gray-600">QA 역량 향상을 위한 체계적인 학습 콘텐츠</p>
        </div>

        {/* 필터 */}
        <div className="mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">난이도</label>
            <div className="flex flex-wrap gap-2">
              {levels.map(level => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedLevel === level.id
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 학습 자료 목록 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredNotes.map(note => (
            <div key={note.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelBadge(note.level)}`}>
                      {getLevelText(note.level)}
                    </span>
                    {note.hasCode && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        <Code className="w-3 h-3 mr-1" />
                        코드 포함
                      </span>
                    )}
                    {note.isPremium && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Premium
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {note.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {note.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {note.topics.map(topic => (
                    <span key={topic} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {note.readTime}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {note.views}
                    </span>
                    <span className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {note.downloads}
                    </span>
                  </div>
                  <time>{new Date(note.date).toLocaleDateString('ko-KR')}</time>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">by {note.author}</span>
                  <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    note.isPremium
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}>
                    {note.isPremium ? 'Premium 구독' : '학습 시작'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">해당 조건의 학습 자료가 없습니다.</p>
          </div>
        )}

        {/* 추가 정보 */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">더 많은 학습 자료를 원하시나요?</h3>
            <p className="text-gray-600 mb-6">
              Premium 멤버십으로 모든 학습 자료에 무제한 접근하고, 실습 환경과 1:1 피드백을 받아보세요.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="px-6 py-3 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                멤버십 알아보기
              </button>
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                무료 체험 시작
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyNote;