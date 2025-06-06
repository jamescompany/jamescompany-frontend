// src/pages/services/recruitment/components/ViewRewards.tsx

import { motion } from 'framer-motion';
import { Gift, DollarSign, Trophy, Sparkles } from 'lucide-react';

const ViewRewards = () => {
  const plans = [
    {
      name: "기본형",
      price: "₩50,000",
      duration: "1개월",
      features: [
        "QA 전문 포맷 적용",
        "슬랙/뉴스레터 노출",
        "기본 통계 제공"
      ],
      gradient: "from-gray-600 to-gray-700"
    },
    {
      name: "스탠다드형",
      price: "₩100,000",
      duration: "1개월",
      features: [
        "기본형 혜택 모두 포함",
        "뉴스레터 상단 노출",
        "성과형 축하금 적용 가능",
        "상세 통계 리포트"
      ],
      popular: true,
      gradient: "from-blue-600 to-purple-600"
    },
    {
      name: "프리미엄형",
      price: "₩350,000",
      duration: "1개월",
      features: [
        "스탠다드형 혜택 모두 포함",
        "메인 페이지 상단 고정",
        "추천 공고 섹션 포함",
        "합격 축하금 기본 포함",
        "전담 매니저 지원"
      ],
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  const benefits = [
    {
      icon: <Gift className="w-8 h-8" />,
      title: "합격 축하금",
      description: "채용 성공 시 ₩30,000~₩50,000 지급"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "QA 인증 뱃지",
      description: "검증된 QA 문화 기업 인증"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "제임스의 한마디",
      description: "QA 전문가의 인사이트 제공"
    }
  ];

  return (
    <div className="relative w-full px-4 py-20">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            합리적인 가격, 확실한 효과
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            QA 전문 채용 플랫폼만의 특별한 혜택을 경험하세요
          </p>
        </motion.div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1 rounded-full text-sm font-semibold">
                  가장 인기
                </div>
              )}
              
              <div className={`relative bg-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border ${
                plan.popular ? 'border-purple-500' : 'border-gray-800'
              } hover:border-gray-600 transition-all duration-300 h-full flex flex-col`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className={`text-4xl font-black bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                    {plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">/ {plan.duration}</span>
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex-shrink-0 flex items-center justify-center mt-0.5`}>
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-full font-semibold bg-gradient-to-r ${plan.gradient} hover:scale-105 transition-transform duration-300`}>
                  선택하기
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm rounded-3xl p-12 border border-white/10"
        >
          <h3 className="text-3xl font-bold text-center mb-12">추가 혜택</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2">{benefit.title}</h4>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">이미 50개 이상의 기업이 함께하고 있습니다</p>
          <div className="flex items-center justify-center gap-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">평균 채용 비용 70% 절감</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewRewards;