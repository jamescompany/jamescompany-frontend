// src/pages/insights/Notice.tsx

import { useState } from 'react';
import { Bell, Calendar, Pin, ChevronRight } from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'service' | 'update' | 'event' | 'maintenance';
  date: string;
  isPinned: boolean;
  isImportant: boolean;
}

const notices: Notice[] = [
  {
    id: '1',
    title: 'JamesCompany 커피챗 서비스 정식 오픈',
    content: '안녕하세요, JamesCompany입니다. 많은 분들이 기다려주신 커피챗 서비스가 정식으로 오픈했습니다. QA 전문가들과 1:1 멘토링을 통해 성장의 기회를 만들어보세요.',
    category: 'service',
    date: '2024-02-20',
    isPinned: true,
    isImportant: true
  },
  {
    id: '2',
    title: '시스템 정기 점검 안내 (2/25)',
    content: '더 나은 서비스 제공을 위해 시스템 점검을 진행합니다. 점검 시간: 2024년 2월 25일 02:00 ~ 06:00 (4시간)',
    category: 'maintenance',
    date: '2024-02-18',
    isPinned: true,
    isImportant: false
  },
  {
    id: '3',
    title: 'Bug Bounty Arena 베타 테스트 참여자 모집',
    content: 'Bug Bounty Arena 서비스의 베타 테스트에 참여하실 분들을 모집합니다. 선착순 100명에게 특별 혜택을 제공합니다.',
    category: 'event',
    date: '2024-02-15',
    isPinned: false,
    isImportant: false
  },
  {
    id: '4',
    title: 'QAuto 서비스 업데이트 v2.0',
    content: 'QAuto 서비스가 v2.0으로 업데이트되었습니다. 새로운 기능: API 테스트 자동화, 리포트 템플릿 추가, 성능 개선',
    category: 'update',
    date: '2024-02-10',
    isPinned: false,
    isImportant: false
  },
  {
    id: '5',
    title: '개인정보처리방침 변경 안내',
    content: '개인정보처리방침이 일부 변경되었습니다. 변경 사항은 2024년 3월 1일부터 적용됩니다.',
    category: 'service',
    date: '2024-02-05',
    isPinned: false,
    isImportant: true
  }
];

const Notice = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedNotice, setExpandedNotice] = useState<string | null>(null);

  const filteredNotices = selectedCategory === 'all'
    ? notices
    : notices.filter(notice => notice.category === selectedCategory);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'service':
        return { bg: 'bg-blue-100', text: 'text-blue-800', label: '서비스' };
      case 'update':
        return { bg: 'bg-green-100', text: 'text-green-800', label: '업데이트' };
      case 'event':
        return { bg: 'bg-purple-100', text: 'text-purple-800', label: '이벤트' };
      case 'maintenance':
        return { bg: 'bg-orange-100', text: 'text-orange-800', label: '점검' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', label: category };
    }
  };

  const toggleNotice = (noticeId: string) => {
    setExpandedNotice(expandedNotice === noticeId ? null : noticeId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Bell className="w-8 h-8 mr-3 text-blue-600" />
            공지사항
          </h1>
          <p className="text-gray-600">JamesCompany의 새로운 소식과 업데이트를 확인하세요</p>
        </div>

        {/* 필터 */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              전체
            </button>
            {['service', 'update', 'event', 'maintenance'].map((category) => {
              const badge = getCategoryBadge(category);
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {badge.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 공지사항 목록 */}
        <div className="space-y-4">
          {filteredNotices.map((notice) => {
            const badge = getCategoryBadge(notice.category);
            const isExpanded = expandedNotice === notice.id;

            return (
              <div
                key={notice.id}
                className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                  notice.isPinned ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleNotice(notice.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center flex-wrap gap-2">
                      {notice.isPinned && (
                        <Pin className="w-4 h-4 text-blue-600" />
                      )}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>
                      {notice.isImportant && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          중요
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(notice.date).toLocaleDateString('ko-KR')}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-between">
                    {notice.title}
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </h3>

                  {isExpanded && (
                    <div className="mt-4 text-gray-600 whitespace-pre-line">
                      {notice.content}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredNotices.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">해당 카테고리의 공지사항이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notice;