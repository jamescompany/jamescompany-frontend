// src/services/qaMentorApi.ts

import { qaMentorPrompts } from '../../config/qaMentorPrompts'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatResponse {
  response: string
  category?: string
  suggestCoffeeChat?: boolean
}

// 임시 응답 생성 (백엔드 구현 전까지 사용)
export async function getChatResponse(
  category: string,
  message: string,
  previousMessages: ChatMessage[] = []
): Promise<ChatResponse> {
  // 실제로는 백엔드 API 호출
  // const response = await fetch('/api/qa-mentor', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ category, message, previousMessages })
  // })
  // return response.json()

  // 임시 시뮬레이션
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        response: generateMockResponse(category, message),
        category,
        suggestCoffeeChat: Math.random() > 0.7 // 30% 확률로 커피챗 제안
      })
    }, 1500)
  })
}

// 목업 응답 생성
function generateMockResponse(category: string, message: string): string {
  const responses: Record<string, string[]> = {
    'test-strategy': [
      `테스트 전략, 정말 중요한 주제죠! 😊

많은 팀들이 "완벽한 테스트"를 추구하다가 오히려 비효율에 빠지는 경우를 봤어요. 

제 경험상 효과적인 전략은:
1. 비즈니스 리스크가 높은 기능부터 우선순위 설정
2. 테스트 피라미드 원칙 적용 (Unit > Integration > E2E)
3. 자동화와 수동 테스트의 균형점 찾기

특히 스타트업이나 애자일 환경에서는 "충분히 좋은" 수준의 커버리지를 목표로 하는 것이 현실적이에요.

구체적인 상황을 더 알려주시면 맞춤형 전략을 제안드릴 수 있을 것 같아요! 

깊이 있는 전략 수립이 필요하시다면 제임스와의 커피챗도 추천드려요. 💪`,
    ],
    'automation': [
      `자동화 도입을 고민하고 계시는군요! 🤖

"자동화는 언제 시작해야 할까?"라는 질문을 정말 많이 받아요. 

핵심은 ROI입니다:
- 자주 반복되는 테스트인가?
- 수동으로 하면 시간이 오래 걸리는가?
- 휴먼 에러가 발생하기 쉬운가?

이 중 2개 이상 해당되면 자동화를 고려해볼 만해요.

도구 선택은 팀의 기술 스택에 따라 달라지는데:
- 웹: Cypress, Playwright (요즘 대세)
- 모바일: Appium, Detox
- API: Postman, REST Assured

작게 시작해서 점진적으로 확대하는 것이 성공의 열쇠예요!

실제 자동화 도입 사례가 궁금하시다면, 제임스와 커피챗으로 더 자세히 논의해보세요! 🚀`,
    ],
    'career': [
      `QA 커리어 성장, 저도 늘 고민하는 주제예요! 🌟

15년 전과 비교하면 QA의 역할이 정말 많이 변했어요. 이제는 단순 테스터가 아닌 "품질 엔지니어"로서의 역량이 필요하죠.

커리어 성장을 위한 제안:
1. 개발 스킬 향상 (최소한 코드 리뷰는 가능해야)
2. 도메인 전문성 구축 (금융, 이커머스, 게임 등)
3. 소프트 스킬 개발 (커뮤니케이션, 리더십)
4. 커뮤니티 활동 (블로그, 발표, 오픈소스 기여)

시니어로 가는 길:
- 3-5년차: 기술적 전문성 확보
- 5-8년차: 리더십과 전략적 사고
- 8년차+: 조직 전체의 품질 문화 리드

이직을 준비 중이시라면 포트폴리오가 정말 중요해요!

1:1 커리어 상담이 필요하시다면 제임스와의 커피챗을 추천드립니다! 💼`,
    ],
    'beginner': [
      `QA 세계에 오신 것을 환영합니다! 🌱 

처음엔 모든 게 낯설고 어려울 수 있어요. 저도 신입 때는 "버그를 못 찾으면 어쩌지?"라는 걱정을 많이 했었죠.

신입 QA가 꼭 알아야 할 것들:
1. 사용자 관점에서 생각하기
2. 개발자와 좋은 관계 만들기 (적이 아닌 동료!)
3. 명확한 버그 리포트 작성법
4. 기본 개발 지식 (최소한 용어는 이해)

첫 3개월 목표:
- 제품 도메인 완벽 이해
- 팀의 개발 프로세스 파악
- 기본적인 테스트 케이스 작성

성장 팁:
매일 하나씩 새로운 것을 배우려고 노력하세요. 작은 개선이 모여 큰 성장이 됩니다!

더 구체적인 학습 로드맵이 필요하시다면, 제임스와의 커피챗에서 맞춤형 가이드를 받아보세요! 🎯`,
    ]
  }

  // 카테고리별 응답 선택
  const categoryResponses = responses[category] || responses['beginner']
  return categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
}

// 대화 내역 저장 (로컬 스토리지)
export function saveChatHistory(messages: ChatMessage[]): void {
  try {
    const history = {
      messages,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }
    
    // 최근 10개 대화만 저장
    const existingHistory = getChatHistory()
    existingHistory.unshift(history)
    
    localStorage.setItem(
      'qa-mentor-history', 
      JSON.stringify(existingHistory.slice(0, 10))
    )
  } catch (error) {
    console.error('Failed to save chat history:', error)
  }
}

// 대화 내역 불러오기
export function getChatHistory(): any[] {
  try {
    const saved = localStorage.getItem('qa-mentor-history')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

// 사용자 피드백 수집
export async function collectFeedback(
  messageId: string,
  helpful: boolean,
  category?: string
): Promise<void> {
  // 백엔드 구현 시 활성화
  // await fetch('/api/qa-mentor/feedback', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ messageId, helpful, category })
  // })
  
  console.log('Feedback collected:', { messageId, helpful, category })
}

// 인기 질문 카테고리 가져오기
export async function getPopularCategories(): Promise<string[]> {
  // 백엔드 구현 시 활성화
  // const response = await fetch('/api/qa-mentor/popular-categories')
  // return response.json()
  
  // 임시 데이터
  return ['automation', 'career', 'test-strategy']
}