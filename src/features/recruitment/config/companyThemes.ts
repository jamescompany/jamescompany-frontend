// src/features/recruitment/config/companyThemes.ts

export interface CompanyTheme {
    gradient: string;
    bgGradient: string;
    accent: string;
    icon: string;
    bgPattern: string;
  }
  
  export const companyThemes: Record<string, CompanyTheme> = {
    '테크스타트업 A': {
      gradient: 'from-purple-600 via-pink-600 to-red-600',
      bgGradient: 'from-purple-900/20 via-pink-900/20 to-red-900/20',
      accent: 'purple',
      icon: '🚀',
      bgPattern: 'radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
    },
    '핀테크 기업 B': {
      gradient: 'from-blue-600 via-cyan-600 to-teal-600',
      bgGradient: 'from-blue-900/20 via-cyan-900/20 to-teal-900/20',
      accent: 'blue',
      icon: '💳',
      bgPattern: 'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
    },
    'e커머스 플랫폼 C': {
      gradient: 'from-orange-600 via-amber-600 to-yellow-600',
      bgGradient: 'from-orange-900/20 via-amber-900/20 to-yellow-900/20',
      accent: 'orange',
      icon: '🛒',
      bgPattern: 'radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)',
    },
  };
  
  // 기본 테마 반환 함수
  export const getTheme = (companyName: string): CompanyTheme => {
    return companyThemes[companyName] || companyThemes['테크스타트업 A'];
  };