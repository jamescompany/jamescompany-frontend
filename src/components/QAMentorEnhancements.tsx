// src/components/QAMentorEnhancements.tsx

import { useState } from 'react'

// 빠른 응답 버튼 컴포넌트
export function QuickResponses({ 
  onSelect 
}: { 
  onSelect: (response: string) => void 
}) {
  const quickResponses = [
    "더 자세히 설명해주세요",
    "예시를 들어주실 수 있나요?",
    "다른 방법도 있을까요?",
    "감사합니다! 도움이 되었어요",
  ]

  return (
    <div className="flex flex-wrap gap-2 p-2 border-t">
      {quickResponses.map((response, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(response)}
          className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          {response}
        </button>
      ))}
    </div>
  )
}

// 타이핑 인디케이터 컴포넌트
export function TypingIndicator({ name = "시니어 QA 멘토" }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 px-3">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <span>{name}가 답변을 작성 중입니다...</span>
    </div>
  )
}

// 대화 평가 컴포넌트
export function ChatRating({ 
  onRate 
}: { 
  onRate: (rating: number) => void 
}) {
  const [rated, setRated] = useState(false)
  const [rating, setRating] = useState(0)

  const handleRate = (value: number) => {
    setRating(value)
    setRated(true)
    onRate(value)
  }

  if (rated) {
    return (
      <div className="text-center p-3 bg-green-50 rounded-lg">
        <p className="text-sm text-green-700">
          피드백 감사합니다! {rating >= 4 ? '😊' : '📝'}
        </p>
      </div>
    )
  }

  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <p className="text-sm text-gray-600 mb-2">이 답변이 도움이 되었나요?</p>
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            className="text-2xl hover:scale-110 transition-transform"
          >
            {star <= rating ? '⭐' : '☆'}
          </button>
        ))}
      </div>
    </div>
  )
}

// 인기 질문 표시 컴포넌트
export function PopularQuestions({ 
  onSelect 
}: { 
  onSelect: (category: string, question: string) => void 
}) {
  const popularQuestions = [
    {
      category: 'automation',
      question: 'Cypress vs Playwright, 어떤 걸 선택해야 할까요?',
      icon: '🤖'
    },
    {
      category: 'career',
      question: '5년차 QA 엔지니어의 연봉 수준이 궁금해요',
      icon: '💰'
    },
    {
      category: 'test-strategy',
      question: '스타트업에서 QA 프로세스를 처음 구축하려면?',
      icon: '🚀'
    }
  ]

  return (
    <div className="p-4 bg-purple-50 rounded-lg">
      <h4 className="text-sm font-semibold text-purple-800 mb-3">
        🔥 이번 주 인기 질문
      </h4>
      <div className="space-y-2">
        {popularQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(q.category, q.question)}
            className="w-full text-left p-2 bg-white rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start gap-2">
              <span className="text-lg">{q.icon}</span>
              <p className="text-sm text-gray-700">{q.question}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// 세션 통계 컴포넌트
export function SessionStats({ 
  messageCount,
  startTime 
}: { 
  messageCount: number
  startTime: Date 
}) {
  const duration = Math.floor((Date.now() - startTime.getTime()) / 1000 / 60)
  
  return (
    <div className="flex justify-between text-xs text-gray-500 px-4 py-2 bg-gray-50">
      <span>대화 {messageCount}개</span>
      <span>{duration}분 경과</span>
    </div>
  )
}

// 커피챗 CTA 배너
export function CoffeeChatBanner() {
  return (
    <div className="m-4 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-gray-800 mb-1">
            더 깊은 상담이 필요하신가요?
          </h4>
          <p className="text-sm text-gray-600">
            제임스와 1:1 커피챗으로 맞춤 상담을 받아보세요
          </p>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm whitespace-nowrap">
          커피챗 신청 →
        </button>
      </div>
    </div>
  )
}