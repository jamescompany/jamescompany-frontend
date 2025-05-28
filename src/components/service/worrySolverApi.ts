// src/services/worrySolverApi.ts

import axios from 'axios'
import { worryPrompts, categorizeWorry } from '../../config/worryPrompts'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

interface SolveWorryParams {
  worry: string
  previousMessages?: Array<{
    role: 'user' | 'assistant'
    content: string
  }>
}

interface WorryResponse {
  response: string
  category?: string
}

// GPT 상담 요청
export async function solveWorry({
  worry,
  previousMessages = []
}: SolveWorryParams): Promise<WorryResponse> {
  try {
    const response = await axios.post<WorryResponse>(
      `${API_BASE_URL}/api/worry-solver`,
      {
        worry,
        systemPrompt: worryPrompts.system.base,
        previousMessages
      }
    )
    
    return response.data
  } catch (error) {
    console.error('Error solving worry:', error)
    
    // 폴백 응답
    return {
      response: '죄송해요, 지금은 연결이 원활하지 않네요. 😔 잠시 후 다시 시도해주세요.',
      category: 'error'
    }
  }
}

// 고민 수집
export async function collectWorry(worry: string): Promise<void> {
  try {
    await axios.post(`${API_BASE_URL}/api/collect-worry`, {
      worry,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    // 실패해도 사용자 경험에 영향 없도록 에러를 무시
    console.error('Failed to collect worry:', error)
  }
}

// 오프라인 모드용 간단한 응답 생성
export function generateOfflineResponse(worry: string): string {
  const category = categorizeWorry(worry)
  const responses = {
    work: '업무로 인한 스트레스가 크신가봐요. 잠시 휴식을 취하며 마음을 가다듬어보는 건 어떨까요? 🌿',
    relationship: '관계에서 오는 고민은 정말 마음이 무겁죠. 상대방의 입장도 한번 생각해보면서 천천히 해결해나가보세요. 💝',
    personal: '자신에 대한 고민이 있으시군요. 완벽하지 않아도 괜찮아요. 작은 성취부터 시작해보세요. 🌟',
    daily: '일상의 작은 고민도 쌓이면 크게 느껴지죠. 하나씩 차근차근 해결해나가보아요. 😊'
  }
  
  return responses[category as keyof typeof responses] || responses.daily
}

// 타이핑 효과를 위한 유틸리티
export async function typewriterEffect(
  text: string,
  onUpdate: (partial: string) => void,
  speed: number = 30
): Promise<void> {
  let partial = ''
  
  for (let i = 0; i < text.length; i++) {
    partial += text[i]
    onUpdate(partial)
    await new Promise(resolve => setTimeout(resolve, speed))
  }
}