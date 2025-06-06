// src/pages/services/recruitment/components/JobDetailModal.tsx

import { useState } from 'react';
import { X, Users, Monitor, Server, Briefcase, Shield, Code, Cloud, Bug, UserCheck } from 'lucide-react';
import type { JobPosting } from '../../../../types/recruitment';
import { calculateDDay } from '../../../../utils/recruitmentHelpers';
import JobApplicationModal from './JobApplicationModal';


interface JobDetailModalProps {
  job: JobPosting;
  isOpen: boolean;
  onClose: () => void;
}

interface TeamInfo {
  name: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const JobDetailModal = ({ job, isOpen, onClose }: JobDetailModalProps) => {
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!isOpen) return null;
  
  const tabs = [
    { id: 'overview', label: '개요', icon: '🎯' },
    { id: 'tasks', label: '업무', icon: '💼' },
    { id: 'tech', label: '기술', icon: '⚡' },
    { id: 'benefits', label: '혜택', icon: '🎁' },
  ];
  
  // 조직 구조 파싱 함수
  const parseTeamStructure = (structure: string): TeamInfo[] => {
    const teams: TeamInfo[] = [];
    const parts = structure.split('/').map(part => part.trim());
    
    const teamIcons: { [key: string]: { icon: React.ReactNode; color: string; bgColor: string } } = {
      'QA': { 
        icon: <Bug className="w-6 h-6" />, 
        color: 'from-green-400 to-emerald-500',
        bgColor: 'from-green-600/20 to-emerald-600/10'
      },
      '프론트엔드': { 
        icon: <Monitor className="w-6 h-6" />, 
        color: 'from-blue-400 to-cyan-500',
        bgColor: 'from-blue-600/20 to-cyan-600/10'
      },
      '백엔드': { 
        icon: <Server className="w-6 h-6" />, 
        color: 'from-purple-400 to-violet-500',
        bgColor: 'from-purple-600/20 to-violet-600/10'
      },
      'PO': { 
        icon: <UserCheck className="w-6 h-6" />, 
        color: 'from-orange-400 to-amber-500',
        bgColor: 'from-orange-600/20 to-amber-600/10'
      },
      'PM': { 
        icon: <Briefcase className="w-6 h-6" />, 
        color: 'from-orange-400 to-amber-500',
        bgColor: 'from-orange-600/20 to-amber-600/10'
      },
      'DevOps': { 
        icon: <Cloud className="w-6 h-6" />, 
        color: 'from-pink-400 to-rose-500',
        bgColor: 'from-pink-600/20 to-rose-600/10'
      },
      '보안': { 
        icon: <Shield className="w-6 h-6" />, 
        color: 'from-red-400 to-rose-500',
        bgColor: 'from-red-600/20 to-rose-600/10'
      },
      '개발': { 
        icon: <Code className="w-6 h-6" />, 
        color: 'from-indigo-400 to-blue-500',
        bgColor: 'from-indigo-600/20 to-blue-600/10'
      }
    };
    
    parts.forEach(part => {
      // 숫자 추출 (예: "QA 2인" -> 2)
      const match = part.match(/(\d+)인?/);
      if (match) {
        const count = parseInt(match[1]);
        let teamName = part.replace(/\s*\d+인.*/, '').replace(/팀/, '').trim();
        
        // 팀 이름에서 키워드 찾기
        let teamConfig = null;
        for (const [key, config] of Object.entries(teamIcons)) {
          if (teamName.includes(key)) {
            teamConfig = config;
            break;
          }
        }
        
        // 기본값
        if (!teamConfig) {
          teamConfig = { 
            icon: <Users className="w-6 h-6" />, 
            color: 'from-gray-400 to-gray-500',
            bgColor: 'from-gray-600/20 to-gray-600/10'
          };
        }
        
        teams.push({
          name: teamName,
          count: count,
          icon: teamConfig.icon,
          color: teamConfig.color,
          bgColor: teamConfig.bgColor
        });
      }
    });
    
    return teams;
  };
  
  const teamStructureData = parseTeamStructure(job.teamStructure);
  const totalMembers = teamStructureData.reduce((sum, team) => sum + team.count, 0);
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="fixed inset-4 md:inset-8 lg:inset-12 flex items-center justify-center">
        <div 
          className="relative w-full h-full max-w-6xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          style={{
            transform: 'perspective(1000px) rotateX(2deg)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(59, 130, 246, 0.3)',
          }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-pulse animation-delay-2000" />
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
          >
            <X className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" />
          </button>
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="p-8 pb-0">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-xl">
                  🚀
                </div>
                <div className="flex-1">
                  <h2 className="text-4xl font-black text-white mb-2">{job.position}</h2>
                  <div className="flex items-center gap-4 text-gray-300">
                    <span className="text-xl">{job.companyName}</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-sm">
                      {job.workType}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Tab Navigation */}
              <div className="flex gap-2 mt-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-white text-gray-900 shadow-lg shadow-white/20'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-8 pt-6">
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-fade-in">
                  {/* Summary Card */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-4">포지션 소개</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">{job.summary}</p>
                  </div>
                  
                  {/* James Note - Special Design */}
                  {job.jamesNote && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-50" />
                      <div className="relative bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-xl">
                            💡
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-white mb-2">제임스의 특별 인사이트</h4>
                            <p className="text-gray-200 leading-relaxed">{job.jamesNote}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Key Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-blue-600/20 to-blue-600/10 rounded-2xl p-6 border border-blue-500/20">
                      <div className="text-3xl mb-2">💰</div>
                      <div className="text-sm text-gray-400 mb-1">연봉</div>
                      <div className="text-xl font-bold text-white">
                        {job.salaryRange.min / 10000}-{job.salaryRange.max / 10000}만원
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/10 rounded-2xl p-6 border border-purple-500/20">
                      <div className="text-3xl mb-2">📍</div>
                      <div className="text-sm text-gray-400 mb-1">위치</div>
                      <div className="text-lg font-bold text-white">
                        {job.location.split(' ').slice(0, 2).join(' ')}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-600/20 to-green-600/10 rounded-2xl p-6 border border-green-500/20">
                      <div className="text-3xl mb-2">👥</div>
                      <div className="text-sm text-gray-400 mb-1">팀 규모</div>
                      <div className="text-lg font-bold text-white">
                        총 {totalMembers}명
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-600/20 to-orange-600/10 rounded-2xl p-6 border border-orange-500/20">
                      <div className="text-3xl mb-2">⏰</div>
                      <div className="text-sm text-gray-400 mb-1">마감일</div>
                      <div className="text-lg font-bold text-white">
                        D-{calculateDDay(job.expiryDate)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'tasks' && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-2xl font-bold text-white mb-6">주요 업무</h3>
                  {job.mainTasks.map((task: string, index: number) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                          {index + 1}
                        </div>
                        <p className="text-gray-300 flex-1">{task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'tech' && (
                <div className="animate-fade-in space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">기술 스택 & 도구</h3>
                    <div className="flex flex-wrap gap-3">
                      {job.tools.map((tool: string, index: number) => (
                        <div
                          key={index}
                          className="px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl border border-white/20 hover:scale-105 transition-all duration-300 cursor-default"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <span className="text-white font-medium">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Visual Team Structure */}
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-6">조직 구조</h4>
                    
                    {/* Team Overview Stats */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold text-white">팀 구성 현황</h5>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Users className="w-5 h-5" />
                          <span>총 {totalMembers}명</span>
                        </div>
                      </div>
                      
                      {/* Team Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {teamStructureData.map((team, index) => (
                          <div
                            key={index}
                            className={`relative bg-gradient-to-br ${team.bgColor} rounded-2xl p-6 border border-white/10 hover:scale-105 transition-all duration-300 cursor-default group overflow-hidden`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${team.color} rounded-full blur-2xl`} />
                            </div>
                            
                            {/* Content */}
                            <div className="relative z-10">
                              <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 bg-gradient-to-br ${team.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                  {team.icon}
                                </div>
                                <div className="text-right">
                                  <div className="text-3xl font-bold text-white">{team.count}</div>
                                  <div className="text-sm text-gray-400">명</div>
                                </div>
                              </div>
                              <h6 className="text-lg font-semibold text-white mb-2">{team.name}</h6>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full bg-gradient-to-r ${team.color} rounded-full transition-all duration-1000 ease-out`}
                                    style={{ 
                                      width: `${(team.count / totalMembers) * 100}%`,
                                      transitionDelay: `${index * 0.1}s`
                                    }}
                                  />
                                </div>
                                <span className="text-sm text-gray-400">
                                  {Math.round((team.count / totalMembers) * 100)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Collaboration Note */}
                      <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                          {job.teamStructure.includes('협업') ? '✨ 모든 팀이 긴밀하게 협업하는 구조입니다' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'benefits' && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-white mb-6">복지 & 혜택</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {job.benefits.map((benefit: string, index: number) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">✨</div>
                          <span className="text-white font-medium text-lg">{benefit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer CTA */}
            <div className="p-8 pt-0">
              <button
                onClick={() => setShowApplicationModal(true)}
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-white text-lg hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-purple-500/25"
              >
                지원하기 →
              </button>
              <JobApplicationModal
                job={job}
                isOpen={showApplicationModal}
                onClose={() => setShowApplicationModal(false)}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-fade-in > * {
          opacity: 0;
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default JobDetailModal;