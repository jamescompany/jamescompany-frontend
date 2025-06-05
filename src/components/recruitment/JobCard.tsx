// src/components/recruitment/JobCard.tsx

import { MapPin, Building, DollarSign, Calendar, Eye, Award, Pin, Navigation } from 'lucide-react';
import type { JobPosting } from '../../types/recruitment';
import { useLocationStore } from '../../stores/locationStore';
import { calculateDistance, formatDistance, getDistanceColor, getDistanceBgColor } from '../../utils/distanceCalculator';

interface JobCardProps {
  job: JobPosting;
  onClick: () => void;
}

const JobCard = ({ job, onClick }: JobCardProps) => {
  const { userLocation } = useLocationStore();
  
  const formatSalary = (min: number, max: number) => {
    return `${(min / 10000).toFixed(0)}억 ${(min % 10000).toFixed(0).padStart(4, '0')}만원 ~ ${(max / 10000).toFixed(0)}억 ${(max % 10000).toFixed(0).padStart(4, '0')}만원`;
  };

  const getWorkTypeLabel = (type: string) => {
    const labels = {
      onsite: '사무실 근무',
      remote: '재택근무',
      hybrid: '하이브리드'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getWorkTypeBadgeColor = (type: string) => {
    const colors = {
      onsite: 'bg-gray-100 text-gray-700',
      remote: 'bg-green-100 text-green-700',
      hybrid: 'bg-blue-100 text-blue-700'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

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

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
        job.isPinned ? 'ring-2 ring-purple-500' : ''
      }`}
    >
      {job.isPinned && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-sm font-medium">
          <div className="flex items-center gap-2">
            <Pin className="w-4 h-4" />
            <span>추천 포지션</span>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900">{job.position}</h3>
              {job.isCertified && (
                <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  <span>QA 인증</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                <span className="font-medium">{job.companyName}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{job.location}</span>
              </div>
              {distance !== null && (
                <div className={`flex items-center gap-1 ${getDistanceColor(distance)}`}>
                  <Navigation className="w-4 h-4" />
                  <span className="text-sm font-medium">{formatDistance(distance)}</span>
                </div>
              )}
            </div>
            <p className="text-gray-700 mb-4 line-clamp-2">{job.summary}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getWorkTypeBadgeColor(job.workType)}`}>
            {getWorkTypeLabel(job.workType)}
          </span>
          {distance !== null && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDistanceBgColor(distance)} ${getDistanceColor(distance)}`}>
              내 위치에서 {formatDistance(distance)}
            </span>
          )}
          {job.tools.slice(0, 3).map((tool, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {tool}
            </span>
          ))}
          {job.tools.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              +{job.tools.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-medium">{formatSalary(job.salaryRange.min, job.salaryRange.max)}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{job.viewCount}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {daysRemaining > 0 ? `D-${daysRemaining}` : '마감'}
            </span>
          </div>
        </div>

        {job.jamesNote && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">💡 제임스의 한마디:</span> {job.jamesNote.slice(0, 60)}...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;