// src/pages/services/recruitment/components/ViewAction.tsx

import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Building2, Mail } from 'lucide-react';

interface ViewActionProps {
  onViewJobs?: () => void;
  onPostJob?: () => void;
}

const ViewAction = ({ onViewJobs, onPostJob }: ViewActionProps) => {
  return (
    <div className="relative w-full px-4 py-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-black mb-8">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              지금 시작하세요
            </span>
          </h2>
          <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            QA 커리어의 새로운 가능성을 발견하거나,
            <br />
            최고의 QA 인재를 만나보세요
          </p>
        </motion.div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* For Job Seekers */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group"
          >
            <div className="relative bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold mb-4">QA 엔지니어라면</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  엄선된 QA 포지션과 제임스의 인사이트로 
                  당신의 커리어를 한 단계 업그레이드하세요
                </p>
                
                <button
                  onClick={onViewJobs}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300"
                >
                  채용공고 보러가기
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* For Companies */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group"
          >
            <div className="relative bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold mb-4">기업이라면</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  QA 전문 큐레이션 서비스로 검증된 
                  QA 인재를 효율적으로 채용하세요
                </p>
                
                <button
                  onClick={onPostJob}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300"
                >
                  채용공고 등록하기
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-4">궁금한 점이 있으신가요?</p>
          <a
            href="mailto:recruit@jamescompany.kr"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            <Mail className="w-5 h-5" />
            recruit@jamescompany.kr
          </a>
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 flex justify-center gap-2"
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ViewAction;