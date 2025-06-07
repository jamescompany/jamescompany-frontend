// src/features/ai-services/components/QAMentorChatbot.tsx

import { useState, useEffect, useRef } from 'react'
import { getChatResponse, saveChatHistory } from '../services/qaMentorApi'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

interface Category {
  id: string
  label: string
  description: string
  icon: string
}

const categories: Category[] = [
  {
    id: 'test-strategy',
    label: '테스트 전략 상담',
    description: '효과적인 테스트 전략 수립과 계획',
    icon: '🎯'
  },
  {
    id: 'automation',
    label: '자동화 테스트 상담',
    description: '자동화 도구 선택과 구현 방법',
    icon: '🤖'
  },
  {
    id: 'collaboration',
    label: '협업 및 커뮤니케이션 상담',
    description: '개발팀과의 효과적인 협업 방법',
    icon: '🤝'
  },
  {
    id: 'career',
    label: 'QA 커리어 및 이직 상담',
    description: '경력 개발과 이직 준비',
    icon: '🚀'
  },
  {
    id: 'tools',
    label: '테스트 도구 및 환경 설정 상담',
    description: '도구 선택과 환경 구축',
    icon: '🛠️'
  },
  {
    id: 'metrics',
    label: 'QA 지표 및 리포트 작성 상담',
    description: '효과적인 지표 관리와 보고서 작성',
    icon: '📊'
  },
  {
    id: 'bug-management',
    label: '버그 관리 및 이슈 추적 상담',
    description: '체계적인 버그 관리 프로세스',
    icon: '🐛'
  },
  {
    id: 'test-case',
    label: '테스트 케이스 작성 및 리뷰 상담',
    description: '효과적인 테스트 케이스 설계',
    icon: '📝'
  },
  {
    id: 'beginner',
    label: '신입/초보 QA 입문 상담',
    description: 'QA 기초와 성장 방향',
    icon: '🌱'
  },
  {
    id: 'other',
    label: '기타 (직접 작성)',
    description: '위 카테고리에 없는 고민',
    icon: '💬'
  }
]

export default function QAMentorChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [customQuestion, setCustomQuestion] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 자동 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 초기 인사말
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        role: 'assistant',
        content: `안녕하세요! 👋 저는 시니어 QA 엔지니어 제이입니다.

요즘 트렌드와 현업 경험을 바탕으로 여러분의 QA 고민을 함께 해결해드리고 싶어요.

어떤 주제로 대화를 나누고 싶으신가요? 아래 카테고리를 선택해주세요.`,
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen])

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    
    const category = categories.find(c => c.id === categoryId)
    if (!category) return

    if (categoryId === 'other') {
      // 기타 선택 시 입력 필드 표시
      return
    }

    // 카테고리 선택 메시지
    const userMessage: Message = {
      role: 'user',
      content: `${category.icon} ${category.label}에 대해 상담받고 싶습니다.`,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    
    // AI 응답 시뮬레이션
    simulateResponse(categoryId)
  }

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customQuestion.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: customQuestion,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setCustomQuestion('')
    
    // AI 응답 시뮬레이션
    simulateResponse('custom', customQuestion)
  }

  const simulateResponse = async (type: string, customText?: string) => {
    setIsTyping(true)
    
    try {
      // API 호출
      const { response } = await getChatResponse(
        type === 'custom' ? 'other' : type,
        customText || '',
        messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }))
      )

      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }
      
      setMessages(prev => {
        const newMessages = [...prev, assistantMessage]
        // 대화 내역 저장
        saveChatHistory(newMessages.map(m => ({ 
          role: m.role as 'user' | 'assistant', 
          content: m.content 
        })))
        return newMessages
      })
    } catch (error) {
      console.error('Error getting response:', error)
      
      const errorMessage: Message = {
        role: 'assistant',
        content: '죄송해요, 잠시 연결에 문제가 있는 것 같네요. 다시 시도해주세요! 😅',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
      setSelectedCategory(null)
    }
  }

  return (
    <>
      {/* 플로팅 버튼 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 z-40 group"
          aria-label="QA 멘토 챗봇 열기"
        >
          <div className="relative">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </div>
          <span className="absolute -top-12 right-0 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            QA 고민이 있으신가요?
          </span>
        </button>
      )}

      {/* 챗봇 윈도우 */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl transition-all duration-300 z-50 ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        }`}>
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl">🧑‍💼</span>
              </div>
              <div>
                <h3 className="font-semibold">시니어 QA 엔지니어 제이</h3>
                <p className="text-xs text-blue-100">15년차 QA 엔지니어</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMinimized ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* 메시지 영역 */}
              <div className="h-[400px] overflow-y-auto p-4 space-y-3">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-xl ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        {msg.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-xl">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* 카테고리 선택 또는 입력 영역 */}
              <div className="border-t p-4">
                {!selectedCategory && messages.length > 0 && (
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className="w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 group"
                      >
                        <span className="text-lg">{category.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600">
                            {category.label}
                          </p>
                          <p className="text-xs text-gray-500">
                            {category.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {selectedCategory === 'other' && (
                  <form onSubmit={handleCustomSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={customQuestion}
                      onChange={(e) => setCustomQuestion(e.target.value)}
                      placeholder="어떤 고민이 있으신가요?"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={!customQuestion.trim()}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      전송
                    </button>
                  </form>
                )}

                {messages.length === 0 && (
                  <p className="text-xs text-gray-500 text-center">
                    💡 QA 관련 고민을 편하게 상담해보세요
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}