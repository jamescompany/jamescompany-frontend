// src/features/ai-services/components/WorrySolver.tsx

import { useState, useEffect } from 'react'
import { solveWorry, collectWorry, generateOfflineResponse } from '../services/worrySolverApi'
import { getGreeting } from '../config/worryPrompts'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function WorrySolver() {
  const [worry, setWorry] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // 외부에서 모달 열기 이벤트 수신
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true)
    window.addEventListener('openWorrySolver', handleOpenEvent)
    
    return () => {
      window.removeEventListener('openWorrySolver', handleOpenEvent)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!worry.trim()) return

    // 사용자 메시지 추가
    const userMessage: Message = {
      role: 'user',
      content: worry,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    
    setIsLoading(true)
    setWorry('')

    try {
      // 고민 수집 (비동기로 처리)
      collectWorry(worry)
      
      // GPT API 호출
      const { response } = await solveWorry({
        worry,
        previousMessages: messages
      })
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      
      // 오프라인 폴백 응답
      const fallbackMessage: Message = {
        role: 'assistant',
        content: generateOfflineResponse(worry),
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 z-40"
        aria-label="고민 상담 열기"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
        </svg>
      </button>

      {/* 고민 상담 모달 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-2">🌟 잠깐, 쉬어가세요</h2>
                  <p className="text-purple-100">작은 고민이라도 함께 나누면 가벼워져요</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-purple-100 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 메시지 영역 */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-16">
                  <p className="text-lg mb-2">어떤 고민이든 괜찮아요 💭</p>
                  <p className="text-sm mb-4">일상의 작은 고민부터 큰 걱정까지, 편하게 이야기해주세요</p>
                  <p className="text-xs text-purple-500">{getGreeting()}</p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      <p className={`text-xs mt-2 ${
                        msg.role === 'user' ? 'text-purple-200' : 'text-gray-500'
                      }`}>
                        {msg.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-4 rounded-2xl">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 입력 영역 */}
            <form onSubmit={handleSubmit} className="border-t p-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={worry}
                  onChange={(e) => setWorry(e.target.value)}
                  placeholder="무엇이든 편하게 이야기해주세요..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !worry.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  전송
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                💡 AI가 도움을 드리지만, 전문적인 상담이 필요하시면 전문가를 찾아주세요
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  )
}