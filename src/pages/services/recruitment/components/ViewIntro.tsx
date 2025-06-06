// src/pages/services/recruitment/components/ViewIntro.tsx

import { motion } from 'framer-motion';
import { CheckCircle, Users, Award, TrendingUp } from 'lucide-react';

interface ViewIntroProps {
  onViewJobs?: () => void;
  onPostJob?: () => void;
}

const ViewIntro = ({ onViewJobs }: ViewIntroProps) => {
  const features = [
    {
      icon: <CheckCircle className="w-12 h-12" />,
      title: "엄선된 QA 포지션",
      description: "QA 전문가가 직접 검증한 양질의 채용공고만을 소개합니다",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "큐레이션 서비스",
      description: "단순 게시가 아닌 QA 관점에서 분석한 인사이트를 제공합니다",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "QA 인증 뱃지",
      description: "QA 조직 문화가 검증된 기업에만 부여되는 특별한 인증",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "커리어 성장 지원",
      description: "연봉 정보부터 성장 가능성까지 투명하게 공개합니다",
      gradient: "from-green-500 to-teal-500"
    }
  ];

  return (
    <div className="relative w-full px-4 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            왜 제임스컴퍼니인가?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            기존 채용 플랫폼과는 차원이 다른 QA 전문 큐레이션 서비스를 경험하세요
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 text-white`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <button
            onClick={onViewJobs}
            className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300"
          >
            큐레이션된 채용공고 보기
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewIntro;