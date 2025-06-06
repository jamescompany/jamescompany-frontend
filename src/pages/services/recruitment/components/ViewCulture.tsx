// src/pages/services/recruitment/components/ViewCulture.tsx

import { motion } from 'framer-motion';
import { Shield, Code2, Users, Zap } from 'lucide-react';

const ViewCulture = () => {
  const cultureValues = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "품질 우선 문화",
      description: "개발 초기부터 QA가 참여하는 Shift-Left 문화",
      color: "text-blue-400"
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "자동화 지향",
      description: "반복 작업은 자동화로, 창의적 테스팅에 집중",
      color: "text-purple-400"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "협업 중심",
      description: "개발자와 QA가 함께 성장하는 문화",
      color: "text-green-400"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "지속적 개선",
      description: "더 나은 품질을 위한 끊임없는 혁신",
      color: "text-orange-400"
    }
  ];

  return (
    <div className="relative w-full px-4 py-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            QA가 존중받는 문화
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            제임스컴퍼니는 QA의 가치를 이해하고 존중하는 기업만을 엄선합니다
          </p>
        </motion.div>

        {/* Culture Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cultureValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
                <div className={`${value.color} mb-4`}>{value.icon}</div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <blockquote className="text-2xl md:text-3xl font-light text-center leading-relaxed">
              "QA는 단순한 버그 찾기가 아닌,
              <br />
              <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                제품의 품질과 사용자 경험을 책임지는 핵심 역할
              </span>
              입니다"
            </blockquote>
            <p className="text-center mt-6 text-gray-400">- 제임스, QA 엔지니어</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewCulture;