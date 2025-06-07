// src/features/insights/pages/Story.tsx

import { useState } from 'react';
import { BookOpen, Calendar, Clock, User, Heart, MessageCircle, Share2 } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  likes: number;
  comments: number;
  tags: string[];
  imageUrl?: string;
}

const stories: Story[] = [
  {
    id: '1',
    title: '1인 QA로 살아남기: 스타트업에서의 QA 역할',
    excerpt: '작은 팀에서 QA 엔지니어로 일하며 겪은 경험과 노하우를 공유합니다. 혼자서 모든 테스트를 담당하면서 배운 효율적인 업무 방법들.',
    content: '스타트업에서 1인 QA로 일한다는 것은...',
    author: '김철수',
    authorRole: 'QA Lead @ 스타트업A',
    date: '2024-02-18',
    readTime: '5분',
    likes: 42,
    comments: 8,
    tags: ['1인QA', '스타트업', '업무효율화']
  },
  {
    id: '2',
    title: '테스트 자동화 도입기: 0에서 CI/CD까지',
    excerpt: '수동 테스트만 하던 팀에 테스트 자동화를 도입하고 CI/CD 파이프라인을 구축한 경험을 공유합니다.',
    content: '우리 팀은 처음에는 모든 테스트를 수동으로...',
    author: '이영희',
    authorRole: 'SDET @ 테크기업B',
    date: '2024-02-15',
    readTime: '8분',
    likes: 67,
    comments: 12,
    tags: ['자동화', 'CI/CD', 'DevOps']
  },
  {
    id: '3',
    title: '개발자에서 QA로 전직한 이유',
    excerpt: '5년차 백엔드 개발자였던 제가 QA 엔지니어로 전직을 결심한 이유와 그 과정을 솔직하게 이야기합니다.',
    content: '개발자로 일하면서 항상 품질에 대한 관심이...',
    author: '박민수',
    authorRole: 'QA Engineer @ 금융사C',
    date: '2024-02-10',
    readTime: '6분',
    likes: 89,
    comments: 23,
    tags: ['커리어전환', 'QA입문', '경험공유']
  },
  {
    id: '4',
    title: '애자일 환경에서 QA의 역할 재정의',
    excerpt: '전통적인 워터폴에서 애자일로 전환하면서 QA의 역할이 어떻게 변화했는지, 그리고 어떻게 적응했는지 공유합니다.',
    content: '애자일 방법론이 도입되면서 QA의 역할은...',
    author: '정수진',
    authorRole: 'Agile QA Coach',
    date: '2024-02-05',
    readTime: '7분',
    likes: 55,
    comments: 15,
    tags: ['애자일', 'QA역할', '프로세스개선']
  }
];

const Story = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const allTags = Array.from(new Set(stories.flatMap(story => story.tags)));
  
  const filteredStories = selectedTag
    ? stories.filter(story => story.tags.includes(selectedTag))
    : stories;

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
  };

  const handleBackToList = () => {
    setSelectedStory(null);
  };

  if (selectedStory) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={handleBackToList}
            className="mb-6 text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            ← 목록으로 돌아가기
          </button>

          <article className="bg-white rounded-lg shadow-lg p-8">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedStory.title}</h1>
              
              <div className="flex items-center justify-between flex-wrap gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{selectedStory.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(selectedStory.date).toLocaleDateString('ko-KR')}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{selectedStory.readTime}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{selectedStory.authorRole}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedStory.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="prose max-w-none mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">{selectedStory.excerpt}</p>
              <p className="text-gray-600">{selectedStory.content}</p>
              <p className="text-gray-600 mt-4">[전체 내용은 준비 중입니다...]</p>
            </div>

            <footer className="border-t pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>{selectedStory.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>{selectedStory.comments}</span>
                  </button>
                </div>
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>공유</span>
                </button>
              </div>
            </footer>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
            스토리
          </h1>
          <p className="text-gray-600">QA 전문가들의 경험과 인사이트를 만나보세요</p>
        </div>

        {/* 태그 필터 */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedTag
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              전체
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* 스토리 목록 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStories.map(story => (
            <article
              key={story.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleStoryClick(story)}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  {story.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {story.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {story.author}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {story.readTime}
                    </span>
                  </div>
                  <time>{new Date(story.date).toLocaleDateString('ko-KR')}</time>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {story.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {story.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {story.comments}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">해당 태그의 스토리가 없습니다.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">당신의 이야기를 들려주세요</h3>
          <p className="text-gray-600 mb-4">QA 경험과 인사이트를 공유하고 싶으신가요?</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            스토리 작성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Story;