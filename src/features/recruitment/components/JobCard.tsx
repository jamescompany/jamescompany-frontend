// src/features/recruitment/components/JobCard.tsx

import { MapPin, DollarSign, Eye, Award, Navigation, Zap, Clock } from 'lucide-react';
import { useState } from 'react';

// Mock types and functions for demo
interface JobPosting {
  id: string;
  companyName: string;
  position: string;
  summary: string;
  mainTasks: string[];
  tools: string[];
  teamStructure: string;
  preferredQualifications?: string[];
  salaryRange: { min: number; max: number };
  benefits: string[];
  location: string;
  coordinates?: { lat: number; lng: number };
  workType: 'onsite' | 'remote' | 'hybrid';
  applicationMethod: { type: 'url' | 'email'; value: string };
  jamesNote?: string;
  isCertified: boolean;
  postingDate: string;
  expiryDate: string;
  packageType: 'basic' | 'standard' | 'premium';
  viewCount: number;
  isPinned: boolean;
}

const useLocationStore = () => ({
  userLocation: {
    coordinates: { lat: 37.5012767, lng: 127.0396002 },
    city: '서울',
    district: '강남구'
  }
});

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lng2 - lng1, 2)) * 111;
};

const formatDistance = (distance: number) => `${distance.toFixed(1)}km`;

interface JobCardProps {
  job: JobPosting;
  onClick: () => void;
}

const JobCard = ({ job, onClick }: JobCardProps) => {
  const { userLocation } = useLocationStore();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const formatSalary = (min: number, max: number) => {
    return `${(min / 10000).toFixed(0)}-${(max / 10000).toFixed(0)}만원`;
  };

  const getWorkTypeIcon = (type: string) => {
    const icons = {
      onsite: '🏢',
      remote: '🏠',
      hybrid: '🔄'
    };
    return icons[type as keyof typeof icons] || '💼';
  };

  // 회사별 테마 색상
  const getCompanyTheme = () => {
    const themes = [
      { primary: 'from-blue-600 to-purple-600', secondary: 'from-blue-100 to-purple-100', glow: 'rgba(99, 102, 241, 0.3)' },
      { primary: 'from-purple-600 to-pink-600', secondary: 'from-purple-100 to-pink-100', glow: 'rgba(168, 85, 247, 0.3)' },
      { primary: 'from-orange-600 to-red-600', secondary: 'from-orange-100 to-red-100', glow: 'rgba(251, 146, 60, 0.3)' },
      { primary: 'from-green-600 to-teal-600', secondary: 'from-green-100 to-teal-100', glow: 'rgba(34, 197, 94, 0.3)' },
    ];
    return themes[job.id.charCodeAt(0) % themes.length];
  };

  const theme = getCompanyTheme();
  const daysRemaining = Math.ceil((new Date(job.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  // 거리 계산
  let distance: number | null = null;
  if (userLocation?.coordinates && job.coordinates) {
    distance = calculateDistance(
      userLocation.coordinates.lat,
      userLocation.coordinates.lng,
      job.coordinates.lat,
      job.coordinates.lng
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative group cursor-pointer transition-all duration-500 ${
        isHovered ? 'scale-[1.02]' : ''
      }`}
      style={{
        transform: isHovered ? `perspective(1000px) rotateX(${(mousePosition.y - 150) * 0.01}deg) rotateY(${(mousePosition.x - 200) * 0.01}deg)` : '',
      }}
    >
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${theme.glow}, transparent 60%)`,
        }}
      />
      
      {/* Card Container */}
      <div className={`relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
        job.isPinned ? 'ring-2 ring-purple-500' : ''
      }`}>
        {/* Premium Badge */}
        {job.isPinned && (
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.primary}`} />
        )}
        
        {/* Main Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  {job.position}
                </h3>
                {job.isCertified && (
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${theme.primary} blur opacity-60`} />
                    <div className="relative bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Award className="w-3 h-3 text-blue-600" />
                      <span className="text-gray-900 dark:text-white">QA 인증</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Company Info */}
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-xs">
                    🏢
                  </div>
                  <span>{job.companyName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location.split(' ').slice(0, 2).join(' ')}</span>
                </div>
              </div>
            </div>
            
            {/* Work Type Badge */}
            <div className="text-3xl opacity-80 group-hover:scale-110 transition-transform duration-300">
              {getWorkTypeIcon(job.workType)}
            </div>
          </div>

          {/* Summary */}
          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2 text-sm leading-relaxed">
            {job.summary}
          </p>

          {/* Tech Stack Preview */}
          <div className="flex flex-wrap gap-2 mb-4">
            {job.tools.slice(0, 4).map((tool, index) => (
              <div
                key={index}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r ${theme.secondary} text-gray-700 dark:text-gray-300 opacity-0 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tool}
              </div>
            ))}
            {job.tools.length > 4 && (
              <div className="px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                +{job.tools.length - 4}
              </div>
            )}
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-4">
              {/* Salary */}
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-r ${theme.secondary} flex items-center justify-center`}>
                  <DollarSign className="w-4 h-4 text-gray-700" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">연봉</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatSalary(job.salaryRange.min, job.salaryRange.max)}
                  </div>
                </div>
              </div>
              
              {/* Distance */}
              {distance !== null && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 flex items-center justify-center">
                    <Navigation className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">거리</div>
                    <div className="text-sm font-semibold text-green-600">
                      {formatDistance(distance)}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Meta Info */}
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{job.viewCount}</span>
              </div>
              <div className={`flex items-center gap-1 ${daysRemaining <= 7 ? 'text-red-500' : ''}`}>
                <Clock className="w-3.5 h-3.5" />
                <span>D-{daysRemaining}</span>
              </div>
            </div>
          </div>

          {/* James Note Preview */}
          {job.jamesNote && (
            <div className={`mt-4 p-3 rounded-2xl bg-gradient-to-r ${theme.secondary} border border-blue-200 dark:border-blue-800 group-hover:scale-[1.02] transition-transform duration-300`}>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">제임스 인사이트:</span> {job.jamesNote.slice(0, 60)}...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Hover Action Bar */}
        <div className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-r ${theme.primary} flex items-center justify-center text-white font-medium transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <span className="text-sm">자세히 보기 →</span>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from { 
            opacity: 0; 
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default JobCard;