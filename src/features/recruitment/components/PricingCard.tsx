// src/features/recruitment/components/PricingCard.tsx

import { Check, Star, Zap, Sparkles } from 'lucide-react';
import { useState } from 'react';

// Mock types for demo
interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  isPopular?: boolean;
  bonusIncluded: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  onSelect?: () => void;
}

const PricingCard = ({ plan, onSelect }: PricingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // 플랜별 테마 설정
  const getTheme = () => {
    const themes = {
      basic: {
        gradient: 'from-gray-600 to-gray-800',
        bgGradient: 'from-gray-100 to-gray-200',
        icon: '🎯',
        glow: 'rgba(107, 114, 128, 0.3)',
        shadow: 'shadow-gray-500/20'
      },
      standard: {
        gradient: 'from-blue-600 to-indigo-600',
        bgGradient: 'from-blue-100 to-indigo-100',
        icon: '⚡',
        glow: 'rgba(59, 130, 246, 0.3)',
        shadow: 'shadow-blue-500/20'
      },
      premium: {
        gradient: 'from-purple-600 via-pink-600 to-red-600',
        bgGradient: 'from-purple-100 via-pink-100 to-red-100',
        icon: '👑',
        glow: 'rgba(168, 85, 247, 0.3)',
        shadow: 'shadow-purple-500/20'
      }
    };
    return themes[plan.id as keyof typeof themes] || themes.basic;
  };

  const theme = getTheme();

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Glow Effect */}
      <div 
        className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl ${theme.shadow}`}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${theme.glow}, transparent 50%)`,
        }}
      />
      
      {/* 3D Card Container */}
      <div
        className={`relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden transition-all duration-500 ${
          isHovered ? 'scale-[1.05]' : ''
        } ${plan.isPopular ? 'ring-2 ring-blue-500' : ''}`}
        style={{
          transform: isHovered 
            ? `perspective(1000px) rotateX(${(mousePosition.y - 150) * 0.02}deg) rotateY(${(mousePosition.x - 150) * 0.02}deg)` 
            : '',
          boxShadow: isHovered 
            ? '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 60px rgba(59, 130, 246, 0.1)' 
            : '0 10px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Popular Badge */}
        {plan.isPopular && (
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur animate-pulse" />
              <div className="relative bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Star className="w-3 h-3" />
                <span>BEST CHOICE</span>
              </div>
            </div>
          </div>
        )}

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl" />
        </div>

        <div className="relative p-8">
          {/* Icon & Name */}
          <div className="text-center mb-6">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-4xl shadow-2xl transform group-hover:rotate-12 transition-transform duration-300`}>
              <span className="filter drop-shadow-lg">{theme.icon}</span>
            </div>
            <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
              {plan.name}
            </h4>
          </div>

          {/* Price Display */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} blur-xl opacity-30 group-hover:opacity-50 transition-opacity`} />
              <div className="relative">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
                  ₩{formatPrice(plan.price)}
                </span>
              </div>
            </div>
            <span className="block text-sm text-gray-500 dark:text-gray-400 mt-2">
              {plan.duration}
            </span>
          </div>

          {/* Features List */}
          <ul className="space-y-4 mb-8">
            {plan.features.map((feature, index) => (
              <li 
                key={index} 
                className="flex items-start gap-3 opacity-0 animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${theme.bgGradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Check className="w-4 h-4 text-gray-700" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Bonus Badge */}
          {plan.bonusIncluded && (
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 blur-xl opacity-30 animate-pulse" />
                <div className="relative bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-4 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-bold text-yellow-800 dark:text-yellow-200">
                      합격 축하금 5만원 포함!
                    </span>
                    <Sparkles className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA Button */}
          <button
            onClick={onSelect}
            className={`w-full relative overflow-hidden rounded-2xl font-bold text-white transition-all duration-300 group/btn ${
              plan.isPopular 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' 
                : `bg-gradient-to-r ${theme.gradient}`
            }`}
          >
            {/* Button Shine Effect */}
            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
            </div>
            
            <div className="relative py-4 px-6 flex items-center justify-center gap-2">
              <span>선택하기</span>
              <Zap className="w-4 h-4" />
            </div>
          </button>

          {/* Plan Rank Indicator */}
          <div className="absolute top-4 right-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.bgGradient} flex items-center justify-center`}>
              {plan.id === 'basic' && <span className="text-lg">🥉</span>}
              {plan.id === 'standard' && <span className="text-lg">🥈</span>}
              {plan.id === 'premium' && <span className="text-lg">🥇</span>}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <style>{`
        @keyframes slide-in {
          from { 
            opacity: 0; 
            transform: translateX(-20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PricingCard;