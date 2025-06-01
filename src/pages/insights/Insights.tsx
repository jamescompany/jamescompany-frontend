import { useState } from 'react'
import Card from '../../components/ui/Card'
import { Calendar, User, Tag } from 'lucide-react'

interface Post {
  id: string
  title: string
  excerpt: string
  category: 'notice' | 'story'
  author: string
  date: string
  tags: string[]
}

export default function Insights() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'notice' | 'story'>('all')

  // Mock data
  const posts: Post[] = [
    {
      id: '1',
      title: '새로운 Bug Bounty Arena 서비스 출시',
      excerpt: 'James Company에서 새롭게 선보이는 Bug Bounty Arena 서비스를 소개합니다. 앱 출시 전 실제 사용자들의 피드백을 받아보세요.',
      category: 'notice',
      author: 'James Company',
      date: '2024-01-20',
      tags: ['서비스', '출시', 'Bug Bounty']
    },
    {
      id: '2',
      title: 'QA 자동화의 ROI를 높이는 5가지 방법',
      excerpt: '많은 기업들이 QA 자동화를 도입하지만 기대한 만큼의 효과를 보지 못합니다. 실제 사례를 통해 ROI를 높이는 방법을 알아봅시다.',
      category: 'story',
      author: 'James Kang',
      date: '2024-01-18',
      tags: ['QA', '자동화', 'ROI']
    },
    {
      id: '3',
      title: '2024년 1분기 교육 일정 안내',
      excerpt: '2024년 1분기 QA/SDET 교육 과정 일정이 확정되었습니다. 조기 등록 시 20% 할인 혜택을 받으실 수 있습니다.',
      category: 'notice',
      author: 'James Company',
      date: '2024-01-15',
      tags: ['교육', '일정', '할인']
    },
    {
      id: '4',
      title: '스타트업에서 QA 문화 만들기',
      excerpt: '리소스가 부족한 스타트업에서 어떻게 효과적인 QA 문화를 만들 수 있을까요? 실제 경험을 바탕으로 한 인사이트를 공유합니다.',
      category: 'story',
      author: 'James Kang',
      date: '2024-01-12',
      tags: ['스타트업', 'QA', '문화']
    }
  ]

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  const getCategoryBadgeColor = (category: string) => {
    return category === 'notice' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
  }

  const getCategoryText = (category: string) => {
    return category === 'notice' ? '공지사항' : '스토리'
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">인사이트</h1>
          <p className="text-xl text-gray-600">
            James Company의 소식과 QA 관련 인사이트를 만나보세요
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setSelectedCategory('notice')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'notice'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            공지사항
          </button>
          <button
            onClick={() => setSelectedCategory('story')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'story'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            스토리
          </button>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} hoverable>
              <article>
                <div className="flex items-center space-x-4 mb-3">
                  <span className={`text-sm px-3 py-1 rounded-full ${getCategoryBadgeColor(post.category)}`}>
                    {getCategoryText(post.category)}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                </div>

                <h2 className="text-2xl font-semibold mb-3 hover:text-primary cursor-pointer">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <div className="flex space-x-2">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="text-sm text-gray-500">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="text-primary hover:underline">
                    자세히 읽기 →
                  </button>
                </div>
              </article>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 space-x-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            이전
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg">
            1
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            2
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            3
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            다음
          </button>
        </div>
      </div>
    </div>
  )
}