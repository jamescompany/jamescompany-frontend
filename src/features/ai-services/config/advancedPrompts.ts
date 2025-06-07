// src/features/ai-services/config/advancedPrompts.ts

export const advancedPrompts = {
    // 감정 상태별 맞춤 응답
    emotionalStates: {
      anxious: `사용자가 불안해하고 있습니다. 
  - 먼저 안정을 찾을 수 있도록 도와주세요
  - 호흡법이나 간단한 이완 기법을 제안하세요
  - 불안의 원인을 천천히 탐색하도록 유도하세요`,
      
      sad: `사용자가 슬퍼하고 있습니다.
  - 충분한 공감과 위로를 표현하세요
  - 슬픔을 억누르지 말고 받아들이도록 격려하세요
  - 작은 기쁨을 찾을 수 있는 활동을 제안하세요`,
      
      angry: `사용자가 화가 나 있습니다.
  - 감정을 인정하고 타당성을 확인해주세요
  - 건강한 방법으로 감정을 표출하도록 안내하세요
  - 상황을 객관적으로 볼 수 있도록 도와주세요`,
      
      confused: `사용자가 혼란스러워하고 있습니다.
  - 생각을 정리할 수 있도록 도와주세요
  - 하나씩 차근차근 짚어가며 대화하세요
  - 명확한 질문으로 핵심을 파악하도록 유도하세요`
    },
  
    // 특수 상황 대응
    specialCases: {
      crisis: `긴급 상황 감지 시:
  - 즉시 전문가 도움을 권유하세요
  - 긴급 연락처 정보를 제공하세요 (생명의 전화 109)
  - 안전을 최우선으로 고려하세요`,
      
      repeat: `반복적인 고민 패턴 감지 시:
  - 이전 대화를 참고하여 진전을 확인하세요
  - 새로운 관점이나 접근법을 제시하세요
  - 작은 실천 과제를 제안하세요`
    },
  
    // 대화 기법
    conversationTechniques: {
      mirroring: "사용자의 언어 스타일과 감정 톤을 반영하여 친밀감을 높이세요",
      
      reframing: "부정적인 상황을 다른 관점에서 볼 수 있도록 도와주세요",
      
      validation: "사용자의 감정과 경험을 타당한 것으로 인정하고 수용하세요",
      
      empowerment: "사용자가 스스로 해결책을 찾을 수 있도록 힘을 실어주세요"
    },
  
    // 마무리 메시지 템플릿
    closingMessages: {
      encouragement: [
        "오늘 용기내어 고민을 나눠주셔서 감사해요. 분명 좋은 방향으로 나아갈 거예요! 🌈",
        "한 걸음 한 걸음이 모여 큰 변화를 만들어요. 응원할게요! ⭐",
        "이야기를 들려주셔서 고마워요. 언제든 다시 찾아주세요. 💝"
      ],
      
      actionItems: [
        "오늘 이야기한 내용 중에서 가장 먼저 시도해보고 싶은 것은 무엇인가요?",
        "작은 것부터 시작해보는 건 어떨까요? 내일 한 가지만 실천해보세요.",
        "다음에 만날 때는 어떤 변화가 있었는지 들려주세요!"
      ]
    }
  }
  
  // 감정 분석 함수
  export function analyzeEmotion(text: string): string {
    const emotions = {
      anxious: ['불안', '걱정', '초조', '두려', '무서'],
      sad: ['슬프', '우울', '외로', '힘들', '눈물'],
      angry: ['화나', '짜증', '분노', '억울', '열받'],
      confused: ['모르겠', '혼란', '복잡', '어떻게', '뭘']
    }
    
    const lowerText = text.toLowerCase()
    
    for (const [emotion, keywords] of Object.entries(emotions)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        return emotion
      }
    }
    
    return 'neutral'
  }
  
  // 응답 개인화 함수
  export function personalizeResponse(baseResponse: string, timeOfDay: string, emotion: string): string {
    let personalizedResponse = baseResponse
    
    // 시간대별 인사 추가
    if (timeOfDay === 'morning') {
      personalizedResponse = '좋은 아침이에요! ☀️ ' + personalizedResponse
    } else if (timeOfDay === 'night') {
      personalizedResponse = '늦은 시간까지 고민이 많으시네요. 🌙 ' + personalizedResponse
    }
    
    // 감정별 이모지 추가
    const emotionEmojis = {
      anxious: '🤗',
      sad: '💙',
      angry: '🌿',
      confused: '🤔',
      neutral: '😊'
    }
    
    personalizedResponse += ' ' + emotionEmojis[emotion as keyof typeof emotionEmojis]
    
    return personalizedResponse
  }