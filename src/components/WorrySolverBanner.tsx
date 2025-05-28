// src/components/WorrySolverBanner.tsx

import { useState } from 'react'

export default function WorrySolverBanner() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            잠깐, 쉬어가세요 ☕
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            작은 고민이라도 나누면 마음이 가벼워져요
          </p>
          
          {/* 미리보기 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">💼</div>
              <h3 className="font-semibold mb-2">업무 고민</h3>
              <p className="text-sm text-gray-600">
                직장 스트레스, 커리어 고민을 털어놓아보세요
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">💝</div>
              <h3 className="font-semibold mb-2">관계 고민</h3>
              <p className="text-sm text-gray-600">
                가족, 친구, 연인과의 관계를 더 좋게 만들어요
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">🌱</div>
              <h3 className="font-semibold mb-2">일상 고민</h3>
              <p className="text-sm text-gray-600">
                소소한 일상의 고민도 함께 나눠요
              </p>
            </div>
          </div>
          
          {/* CTA 버튼 */}
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              // WorrySolver 모달 열기
              const event = new CustomEvent('openWorrySolver')
              window.dispatchEvent(event)
            }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <span>AI 상담사와 대화하기</span>
            <svg 
              className={`w-5 h-5 transform transition-transform ${isHovered ? 'translate-x-1' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* 안내 문구 */}
          <p className="text-xs text-gray-500 mt-4">
            💯 100% 익명 보장 | 🤖 AI 기반 맞춤 상담 | 🎯 24시간 이용 가능
          </p>
        </div>
        
        {/* 통계 또는 후기 (선택적) */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-purple-600">1,234명</span>이 
            오늘 마음의 짐을 덜었어요
          </p>
        </div>
      </div>
    </section>
  )
}