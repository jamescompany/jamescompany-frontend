// src/components/recruitment/PricingCard.tsx

import { Check, Star } from 'lucide-react';
import type { PricingPlan } from '../../types/recruitment';

interface PricingCardProps {
  plan: PricingPlan;
  onSelect?: () => void;
}

const PricingCard = ({ plan }: PricingCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <div className={`relative bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg ${
      plan.isPopular ? 'ring-2 ring-blue-500' : ''
    }`}>
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3" />
            <span>인기</span>
          </div>
        </div>
      )}

      <div className="text-center mb-4">
        <h4 className="text-lg font-bold text-gray-900">{plan.name}</h4>
        <div className="mt-2">
          <span className="text-3xl font-bold text-gray-900">₩{formatPrice(plan.price)}</span>
          <span className="text-gray-500 text-sm">/{plan.duration}</span>
        </div>
      </div>

      <ul className="space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      {plan.bonusIncluded && (
        <div className="mt-4 p-3 bg-purple-50 rounded-lg text-center">
          <span className="text-sm font-medium text-purple-800">
            🎉 합격 축하금 5만원 포함
          </span>
        </div>
      )}
    </div>
  );
};

export default PricingCard;