// src/components/profile/MembershipInfo.tsx

import React from 'react';
import { Check, Star, Zap } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  created_at: string;
  membership_tier: string;
  is_admin: boolean;
  is_active: boolean;
}

interface MembershipInfoProps {
  profile: UserProfile | null;
}

const MembershipInfo: React.FC<MembershipInfoProps> = ({ profile }) => {
  const membershipTiers = [
    {
      name: 'Free',
      price: '₩0',
      period: '/월',
      icon: <Check className="w-8 h-8 text-gray-400" />,
      features: [
        '기본 서비스 이용',
        '커피챗 월 1회',
        '기본 콘텐츠 열람',
        '커뮤니티 참여'
      ],
      notIncluded: [
        '우선 예약 권한',
        '프리미엄 콘텐츠',
        '1:1 멘토링'
      ]
    },
    {
      name: 'Basic',
      price: '₩9,900',
      period: '/월',
      icon: <Star className="w-8 h-8 text-blue-500" />,
      features: [
        '기본 서비스 이용',
        '커피챗 월 3회',
        '우선 예약 권한',
        '프리미엄 콘텐츠 50% 할인',
        '커뮤니티 우선 답변'
      ],
      notIncluded: [
        '무제한 커피챗',
        '1:1 전담 멘토링'
      ],
      recommended: true
    },
    {
      name: 'Pro',
      price: '₩29,900',
      period: '/월',
      icon: <Zap className="w-8 h-8 text-purple-500" />,
      features: [
        '모든 서비스 무제한 이용',
        '무제한 커피챗',
        '최우선 예약 권한',
        '모든 프리미엄 콘텐츠 무료',
        '1:1 전담 멘토링 월 1회',
        '커리어 상담 우선권',
        '전용 슬랙 채널 초대'
      ],
      notIncluded: []
    }
  ];

  const currentTier = membershipTiers.find(tier => 
    tier.name === profile?.membership_tier || 
    (!profile?.membership_tier && tier.name === 'Free')
  );

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">멤버십 정보</h3>
      
      {profile && currentTier && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-800">
                <span className="font-semibold">현재 멤버십:</span> {currentTier.name} 플랜
              </p>
              <p className="text-xs text-blue-600 mt-1">
                {currentTier.name === 'Free' 
                  ? '업그레이드하여 더 많은 혜택을 받아보세요!' 
                  : `매월 ${currentTier.price}이 결제됩니다.`}
              </p>
            </div>
            {currentTier.icon}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {membershipTiers.map((tier) => {
          const isCurrentPlan = profile?.membership_tier === tier.name || 
                               (!profile?.membership_tier && tier.name === 'Free');
          
          return (
            <div
              key={tier.name}
              className={`relative border rounded-lg p-6 ${
                isCurrentPlan 
                  ? 'border-blue-500 bg-blue-50' 
                  : tier.recommended 
                    ? 'border-blue-300 shadow-lg' 
                    : 'border-gray-200'
              }`}
            >
              {tier.recommended && !isCurrentPlan && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    추천
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                {tier.icon}
                <h4 className="text-xl font-bold mt-4 mb-2">{tier.name}</h4>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-gray-500 ml-1">{tier.period}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
                {tier.notIncluded.map((feature, index) => (
                  <div key={`not-${index}`} className="flex items-start opacity-50">
                    <span className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-gray-400">✕</span>
                    <span className="text-sm text-gray-500 line-through">{feature}</span>
                  </div>
                ))}
              </div>

              {isCurrentPlan ? (
                <button 
                  disabled 
                  className="w-full py-3 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
                >
                  현재 플랜
                </button>
              ) : (
                <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  tier.recommended 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                }`}>
                  {profile?.membership_tier === 'Free' ? '업그레이드' : '플랜 변경'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center text-sm text-gray-600">
        <p>모든 플랜은 언제든지 변경하거나 취소할 수 있습니다.</p>
        <p className="mt-1">문의사항은 support@jamescompany.kr로 연락주세요.</p>
      </div>
    </div>
  );
};

export default MembershipInfo;