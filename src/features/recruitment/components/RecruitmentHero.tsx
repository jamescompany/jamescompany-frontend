// src/features/recruitment/components/RecruitmentHero.tsx

import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';
import { sampleJobs } from '../data/sampleJobs';

interface RecruitmentHeroProps {
  onViewJobs?: () => void;
  onPostJob?: () => void;
}

const RecruitmentHero = ({ onViewJobs }: RecruitmentHeroProps) => {
  const stats = [
    { value: `${sampleJobs.length}+`, label: '엄선된 포지션' },
    { value: '98%', label: '채용 성공률' },
    { value: '₩5.8M', label: '평균 연봉' }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      {/* Particle Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          >
            <div className="w-1 h-1 bg-white/30 rounded-full" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full"
        >
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-medium">제임스컴퍼니가 큐레이션하는 특별한 기회</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-7xl md:text-9xl font-black mb-6 tracking-tighter"
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            QA CAREERS
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          단순한 채용공고가 아닌, 당신의 커리어 스토리가 시작되는 곳
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center gap-6"
        >
          <button
            onClick={onViewJobs}
            className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300"
          >
            채용공고 보러가기
          </button>
          
          <div className="animate-bounce bg-white/10 backdrop-blur-sm p-4 rounded-full">
            <ArrowDown className="w-6 h-6" />
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default RecruitmentHero;