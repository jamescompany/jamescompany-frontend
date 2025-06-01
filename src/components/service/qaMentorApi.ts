// src/components/service/qaMentorApi.ts
import api from '../../services/api'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatResponse {
  response: string
  category?: string
  suggestCoffeeChat?: boolean
}

// QA 멘토 응답 받기
export async function getChatResponse(
  category: string,
  message: string,
  previousMessages: ChatMessage[] = []
): Promise<ChatResponse> {
  try {
    const response = await api.post<ChatResponse>('/api/qa-mentor/chat', {
      category,
      message,
      previousMessages,
    })
    
    return response.data
  } catch (error: any) {
    console.error('QA Mentor API error:', error)
    
    // 오프라인 폴백 응답
    return {
      response: '죄송해요, 지금은 연결이 원활하지 않네요. 😔 잠시 후 다시 시도해주세요.',
      category: 'error',
      suggestCoffeeChat: false
    }
  }
}

// 대화 내역 저장
export async function saveChatHistory(messages: ChatMessage[]): Promise<void> {
  try {
    await api.post('/api/qa-mentor/history', {
      messages,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    // 저장 실패해도 사용자 경험에 영향 없도록 에러를 무시
    console.error('Failed to save chat history:', error)
  }
}

// 사용자 피드백 수집
export async function collectFeedback(
  messageId: string,
  helpful: boolean,
  category?: string
): Promise<void> {
  try {
    await api.post('/api/qa-mentor/feedback', {
      messageId,
      helpful,
      category,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Failed to collect feedback:', error)
  }
}

// 인기 질문 카테고리 가져오기
export async function getPopularCategories(): Promise<string[]> {
  try {
    const response = await api.get<string[]>('/api/qa-mentor/popular-categories')
    return response.data
  } catch (error) {
    console.error('Failed to fetch popular categories:', error)
    // 폴백 데이터
    return ['automation', 'career', 'test-strategy']
  }
}

// 대화 통계 가져오기
export async function getChatStatistics(): Promise<{
  totalChats: number
  satisfaction: number
  avgResponseTime: string
}> {
  try {
    const response = await api.get('/api/qa-mentor/statistics')
    return response.data
  } catch (error) {
    console.error('Failed to fetch statistics:', error)
    // 폴백 데이터
    return {
      totalChats: 1500,
      satisfaction: 4.9,
      avgResponseTime: '30초'
    }
  }
}