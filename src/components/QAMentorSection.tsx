// src/components/QAMentorSection.tsx

import { useState } from 'react'

export default function QAMentorSection() {
  const [isHovered, setIsHovered] = useState(false)

  const handleOpenChat = () => {
    // 챗봇 열기 이벤트 발생
    const event = new CustomEvent('openQAMentor')
    window.dispatchEvent(event)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 좌측: 텍스트 콘텐츠 */}
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>🎯</span>
              <span>QA 고민 해결소</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              시니어 QA 엔지니어 제이와<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                실시간 상담
              </span>
              을 나눠보세요
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              테스트 전략부터 커리어 개발까지,<br />
              현업 시니어의 실전 노하우를 바로 얻을 수 있어요.
            </p>

            {/* 특징 리스트 */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">10가지 QA 고민 카테고리 맞춤 상담</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">실무 경험 기반 실질적인 조언</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">24시간 언제든 편하게 질문 가능</span>
              </li>
            </ul>

            {/* CTA 버튼 */}
            <button
              onClick={handleOpenChat}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <span>무료로 상담 시작하기</span>
              <svg 
                className={`w-5 h-5 transform transition-transform ${isHovered ? 'translate-x-1' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <p className="text-sm text-gray-500 mt-4">
              💬 평균 응답 시간 30초 · 🔒 대화 내용 보안 유지
            </p>
          </div>

          {/* 우측: 시각적 요소 */}
          <div className="relative">
            {/* 챗봇 미리보기 */}
            <div className="bg-white rounded-2xl shadow-xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🧑‍💼</span>
                </div>
                <div>
                  <h4 className="font-semibold">시니어 QA 멘토</h4>
                  <p className="text-sm text-gray-500">시니어 QA 엔지니어 제이</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-xl p-3 max-w-[80%]">
                  <p className="text-sm">안녕하세요! QA 관련 어떤 고민이든 편하게 물어보세요 😊</p>
                </div>
                <div className="bg-blue-600 text-white rounded-xl p-3 max-w-[80%] ml-auto">
                  <p className="text-sm">자동화 테스트 도입을 고민하고 있어요</p>
                </div>
                <div className="bg-gray-100 rounded-xl p-3 max-w-[80%]">
                  <p className="text-sm">자동화 도입, 좋은 선택이에요! ROI를 고려한 접근이 중요한데...</p>
                </div>
              </div>
            </div>

            {/* 데코레이션 요소들 */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-purple-200 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-200 rounded-full opacity-50 blur-xl"></div>
            
            {/* 플로팅 아이콘들 */}
            <div className="absolute top-0 right-0 animate-bounce">
              <span className="text-3xl">🎯</span>
            </div>
            <div className="absolute bottom-0 left-0 animate-pulse">
              <span className="text-3xl">💡</span>
            </div>
          </div>
        </div>

        {/* 하단 통계 */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">1,500+</div>
            <div className="text-sm text-gray-600 mt-1">상담 완료</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">4.9/5</div>
            <div className="text-sm text-gray-600 mt-1">만족도</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">30초</div>
            <div className="text-sm text-gray-600 mt-1">평균 응답</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">24/7</div>
            <div className="text-sm text-gray-600 mt-1">상시 운영</div>
          </div>
        </div>
      </div>
    </section>
  )
}