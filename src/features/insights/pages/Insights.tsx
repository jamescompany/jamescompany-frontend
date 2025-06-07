// src/features/insights/pages/Insights.tsx

import { Link } from 'react-router-dom';
import { Bell, BookOpen, FileText, Users, ArrowRight } from 'lucide-react';

interface InsightItem {
  id: string;
  category: 'notice' | 'story' | 'studynote' | 'interview';
  title: string;
  excerpt: string;
  date: string;
  readTime?: string;
  author?: string;
  isPinned?: boolean;
}

const recentInsights: InsightItem[] = [
  {
    id: '1',
    category: 'notice',
    title: 'JamesCompany 서비스 업데이트 안내',
    excerpt: '새로운 기능이 추가되었습니다. 커피챗 서비스가 정식 오픈했습니다.',
    date: '2024-02-20',
    isPinned: true
  },
  {
    id: '2',
    category: 'story',
    title: '1인 QA로 살아남기: 스타트업에서의 QA 역할',
    excerpt: '작은 팀에서 QA 엔지니어로 일하며 겪은 경험과 노하우를 공유합니다.',
    date: '2024-02-18',
    readTime: '5분',
    author: '김철수'
  },
  {
    id: '3',
    category: 'studynote',
    title: 'Cypress E2E 테스트 자동화 완벽 가이드',
    excerpt: 'Cypress를 활용한 End-to-End 테스트 자동화 구축 방법을 단계별로 설명합니다.',
    date: '2024-02-15',
    readTime: '15분'
  },
  {
    id: '4',
    category: 'interview',
    title: '테스트 케이스 작성 과제 해결 전략',
    excerpt: 'QA 엔지니어 면접에서 자주 나오는 테스트 케이스 작성 과제를 효과적으로 해결하는 방법',
    date: '2024-02-12',
    readTime: '10분'
  }
];

const categories = [
  {
    id: 'notice',
    title: '공지사항',
    description: '서비스 업데이트 및 중요 공지사항',
    icon: Bell,
    link: '/insights/notice',
    color: 'bg-red-500'
  },
  {
    id: 'story',
    title: '스토리',
    description: 'QA 전문가들의 경험과 인사이트',
    icon: BookOpen,
    link: '/insights/story',
    color: 'bg-blue-500'
  },
  {
    id: 'studynote',
    title: '학습 자료',
    description: 'QA 역량 향상을 위한 학습 콘텐츠',
    icon: FileText,
    link: '/insights/study-note',
    color: 'bg-green-500'
  },
  {
    id: 'interview',
    title: '인터뷰 준비',
    description: 'QA 취업 및 이직을 위한 면접 가이드',
    icon: Users,
    link: '/insights/interview',
    color: 'bg-purple-500'
  }
];

const Insights = () => {
  const getCategoryInfo = (category: string) => {
    return categories.find(cat => cat.id === category);
  };

  const getCategoryBadge = (category: string) => {
    const info = getCategoryInfo(category);
    if (!info) return 'bg-gray-100 text-gray-800';
    
    switch (category) {
      case 'notice':
        return 'bg-red-100 text-red-800';
      case 'story':
        return 'bg-blue-100 text-blue-800';
      case 'studynote':
        return 'bg-green-100 text-green-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            인사이트
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            QA 전문가들의 지식과 경험을 공유하고 함께 성장하세요
          </p>
        </div>

        {/* 카테고리 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={category.link}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 group"
              >
                <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  <span>바로가기</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* 최근 게시물 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">최근 게시물</h2>
          <div className="divide-y divide-gray-200">
            {recentInsights.map((insight) => {
              const categoryInfo = getCategoryInfo(insight.category);
              return (
                <div key={insight.id} className="py-4 hover:bg-gray-50 -mx-6 px-6 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {insight.isPinned && (
                          <span className="text-red-500 mr-2" title="고정됨">📌</span>
                        )}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryBadge(insight.category)}`}>
                          {categoryInfo?.title}
                        </span>
                        <span className="mx-2 text-gray-400">•</span>
                        <time className="text-sm text-gray-500">
                          {new Date(insight.date).toLocaleDateString('ko-KR')}
                        </time>
                        {insight.readTime && (
                          <>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{insight.readTime}</span>
                          </>
                        )}
                      </div>
                      <Link 
                        to={`${categoryInfo?.link}/${insight.id}`}
                        className="group"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                          {insight.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-2">
                          {insight.excerpt}
                        </p>
                      </Link>
                      {insight.author && (
                        <p className="text-sm text-gray-500 mt-2">
                          작성자: {insight.author}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 text-center">
            <Link
              to="/insights/all"
              className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
            >
              전체 게시물 보기
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* 인기 태그 */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">인기 태그</h3>
          <div className="flex flex-wrap gap-2">
            {['자동화테스트', 'Selenium', 'API테스팅', '성능테스트', 'SDET', '애자일', 'CI/CD', 'Python', 'JavaScript', '모바일테스팅'].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;