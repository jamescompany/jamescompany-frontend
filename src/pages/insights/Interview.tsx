// src/pages/insights/Interview.tsx

import { useState } from 'react';
import { Users, Target, Code, FileText, Briefcase, TrendingUp, ChevronDown, ChevronUp, Star } from 'lucide-react';

interface InterviewContent {
  id: string;
  title: string;
  description: string;
  category: 'questions' | 'case-study' | 'coding' | 'portfolio' | 'tips';
  difficulty: 'junior' | 'mid' | 'senior';
  topics: string[];
  estimatedTime?: string;
  views: number;
  rating: number;
  isPremium: boolean;
  questions?: string[];
}

const interviewContents: InterviewContent[] = [
  {
    id: '1',
    title: 'QA 엔지니어 면접 질문 TOP 50',
    description: '실제 면접에서 자주 나오는 QA 관련 질문과 모범 답변을 정리했습니다.',
    category: 'questions',
    difficulty: 'junior',
    topics: ['기본개념', '테스트설계', '버그리포팅'],
    views: 2341,
    rating: 4.8,
    isPremium: false,
    questions: [
      '테스트와 디버깅의 차이점은 무엇인가요?',
      '블랙박스 테스팅과 화이트박스 테스팅의 차이점을 설명해주세요.',
      '좋은 테스트 케이스의 조건은 무엇인가요?',
      '버그의 라이프사이클을 설명해주세요.'
    ]
  },
  {
    id: '2',
    title: '테스트 케이스 작성 실습 과제',
    description: '실제 면접에서 주어지는 테스트 케이스 작성 과제와 해결 방법을 다룹니다.',
    category: 'case-study',
    difficulty: 'mid',
    topics: ['테스트케이스', '시나리오설계', '엣지케이스'],
    estimatedTime: '30분',
    views: 1567,
    rating: 4.9,
    isPremium: false
  },
  {
    id: '3',
    title: 'QA 자동화 코딩 테스트 대비',
    description: 'Selenium, Cypress를 활용한 자동화 코딩 테스트 문제와 해설',
    category: 'coding',
    difficulty: 'mid',
    topics: ['Selenium', 'Python', 'JavaScript', '자동화'],
    estimatedTime: '60분',
    views: 1234,
    rating: 4.7,
    isPremium: true
  },
  {
    id: '4',
    title: '포트폴리오로 어필하는 QA 역량',
    description: 'QA 포트폴리오 구성 방법과 GitHub 프로젝트 관리 팁',
    category: 'portfolio',
    difficulty: 'junior',
    topics: ['포트폴리오', 'GitHub', '프로젝트'],
    views: 987,
    rating: 4.6,
    isPremium: false
  },
  {
    id: '5',
    title: '시니어 QA 면접 전략',
    description: '리더십, 프로세스 개선, 전략 수립 관련 심화 질문 대비',
    category: 'tips',
    difficulty: 'senior',
    topics: ['리더십', '전략', '프로세스'],
    views: 654,
    rating: 4.9,
    isPremium: true
  },
  {
    id: '6',
    title: 'API 테스팅 기술 면접 가이드',
    description: 'REST API, GraphQL 테스팅 관련 기술 면접 준비',
    category: 'questions',
    difficulty: 'mid',
    topics: ['API', 'Postman', 'HTTP', 'REST'],
    views: 876,
    rating: 4.7,
    isPremium: false
  }
];

const Interview = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: '전체', icon: null },
    { id: 'questions', label: '면접 질문', icon: Target },
    { id: 'case-study', label: '케이스 스터디', icon: FileText },
    { id: 'coding', label: '코딩 테스트', icon: Code },
    { id: 'portfolio', label: '포트폴리오', icon: Briefcase },
    { id: 'tips', label: '면접 팁', icon: TrendingUp }
  ];

  const difficulties = [
    { id: 'all', label: '전체' },
    { id: 'junior', label: '주니어' },
    { id: 'mid', label: '미들' },
    { id: 'senior', label: '시니어' }
  ];

  const filteredContents = interviewContents.filter(content => {
    const categoryMatch = selectedCategory === 'all' || content.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || content.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'junior':
        return 'bg-green-100 text-green-800';
      case 'mid':
        return 'bg-blue-100 text-blue-800';
      case 'senior':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Users className="w-8 h-8 mr-3 text-purple-600" />
            인터뷰 준비
          </h1>
          <p className="text-gray-600">QA 취업과 이직을 위한 면접 준비 가이드</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">200+</p>
            <p className="text-sm text-gray-600">면접 질문</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">50+</p>
            <p className="text-sm text-gray-600">케이스 스터디</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <Code className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">30+</p>
            <p className="text-sm text-gray-600">코딩 문제</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">4.8</p>
            <p className="text-sm text-gray-600">평균 평점</p>
          </div>
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.icon && <category.icon className="w-4 h-4" />}
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">난이도</label>
            <div className="flex flex-wrap gap-2">
              {difficulties.map(difficulty => (
                <button
                  key={difficulty.id}
                  onClick={() => setSelectedDifficulty(difficulty.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedDifficulty === difficulty.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {difficulty.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 콘텐츠 목록 */}
        <div className="space-y-4">
          {filteredContents.map(content => {
            const isExpanded = expandedContent === content.id;
            const CategoryIcon = categories.find(cat => cat.id === content.category)?.icon || Target;

            return (
              <div key={content.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleContent(content.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <CategoryIcon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyBadge(content.difficulty)}`}>
                            {difficulties.find(d => d.id === content.difficulty)?.label}
                          </span>
                          {content.isPremium && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Premium
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {content.title}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {content.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {content.views} 조회
                          </span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-500" />
                            {content.rating}
                          </span>
                          {content.estimatedTime && (
                            <span>예상 시간: {content.estimatedTime}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {isExpanded && content.questions && (
                    <div className="mt-4 pl-16">
                      <h4 className="font-medium text-gray-900 mb-3">샘플 질문:</h4>
                      <ul className="space-y-2">
                        {content.questions.map((question, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            <span className="text-gray-600">{question}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-4 pl-16">
                    {content.topics.map(topic => (
                      <span key={topic} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t">
                  <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    content.isPremium
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}>
                    {content.isPremium ? 'Premium 구독하기' : '학습 시작하기'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredContents.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">해당 조건의 콘텐츠가 없습니다.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">1:1 모의 면접으로 실전 대비하세요</h3>
            <p className="mb-6">
              현직 QA 전문가와 함께하는 모의 면접으로 실제 면접에 대비하세요.
              피드백과 개선점을 제공합니다.
            </p>
            <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              모의 면접 신청하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;