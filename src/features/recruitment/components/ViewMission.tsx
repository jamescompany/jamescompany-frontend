// src/features/recruitment/components/ViewMission.tsx

import { motion } from 'framer-motion';
import { Target, Rocket, Heart, Star } from 'lucide-react';

interface ViewMissionProps {
  onViewJobs?: () => void;
  onPostJob?: () => void;
}

const ViewMission = ({ onPostJob }: ViewMissionProps) => {
  const missions = [
    {
      icon: <Target className="w-16 h-16" />,
      number: "01",
      title: "QA 전문성",
      description: "QA의 시각으로 검증하고 큐레이션하는 유일한 채용 플랫폼"
    },
    {
      icon: <Rocket className="w-16 h-16" />,
      number: "02",
      title: "커리어 성장",
      description: "단순 이직이 아닌 QA 엔지니어의 장기적 성장을 지원"
    },
    {
      icon: <Heart className="w-16 h-16" />,
      number: "03",
      title: "신뢰의 연결",
      description: "기업과 인재를 투명하고 정직하게 연결하는 브릿지"
    }
  ];

  const stats = [
    { value: "98%", label: "채용 성공률" },
    { value: "500+", label: "활성 QA 커뮤니티" },
    { value: "50+", label: "파트너 기업" },
    { value: "4.8", label: "평균 만족도" }
  ];

  return (
    <div className="relative w-full px-4 py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            우리의 미션
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            QA 엔지니어와 기업이 함께 성장하는 생태계를 만듭니다
          </p>
        </motion.div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {missions.map((mission, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              {/* Number Background */}
              <div className="absolute -top-10 -left-10 text-8xl font-black text-gray-800/20">
                {mission.number}
              </div>
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-white">
                  {mission.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{mission.title}</h3>
                <p className="text-gray-400 leading-relaxed">{mission.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm rounded-3xl p-12 border border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA for Companies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">QA 인재를 찾고 계신가요?</p>
          <button
            onClick={onPostJob}
            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2 mx-auto"
          >
            <Star className="w-5 h-5" />
            채용공고 등록하기
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewMission;