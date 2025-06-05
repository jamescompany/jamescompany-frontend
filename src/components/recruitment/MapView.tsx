// src/components/recruitment/MapView.tsx

import { useState } from 'react';
import { MapPin, Briefcase, Users, TrendingUp } from 'lucide-react';
import type { JobPosting } from '../../types/recruitment';

interface MapViewProps {
  jobs: JobPosting[];
  onJobSelect: (job: JobPosting) => void;
}

interface Region {
  id: string;
  name: string;
  path: string;
  center: { x: number; y: number };
}

const MapView = ({ jobs, onJobSelect }: MapViewProps) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredJob, setHoveredJob] = useState<JobPosting | null>(null);

  // 더 정교한 한국 지도 SVG 경로
  const regions: Region[] = [
    {
      id: 'seoul',
      name: '서울',
      path: 'M 165 125 Q 175 120 180 125 L 185 135 Q 180 140 170 140 L 160 135 Q 160 125 165 125 Z',
      center: { x: 172, y: 132 }
    },
    {
      id: 'gyeonggi',
      name: '경기',
      path: 'M 140 110 Q 190 105 200 115 L 205 150 Q 195 165 180 170 L 150 170 Q 135 165 130 150 L 125 120 Q 130 110 140 110 Z M 165 125 Q 175 120 180 125 L 185 135 Q 180 140 170 140 L 160 135 Q 160 125 165 125 Z',
      center: { x: 165, y: 140 }
    },
    {
      id: 'gangwon',
      name: '강원',
      path: 'M 200 90 Q 245 85 255 95 L 265 130 Q 260 140 245 145 L 225 145 Q 210 140 205 125 L 200 100 Q 195 90 200 90 Z',
      center: { x: 232, y: 115 }
    },
    {
      id: 'chungbuk',
      name: '충북',
      path: 'M 185 170 Q 215 165 225 175 L 230 195 Q 225 205 210 210 L 190 210 Q 180 205 175 195 L 175 180 Q 175 170 185 170 Z',
      center: { x: 202, y: 190 }
    },
    {
      id: 'chungnam',
      name: '충남',
      path: 'M 125 180 Q 165 175 175 185 L 180 210 Q 175 220 160 225 L 135 225 Q 120 220 115 205 L 115 190 Q 115 180 125 180 Z',
      center: { x: 147, y: 202 }
    },
    {
      id: 'jeonbuk',
      name: '전북',
      path: 'M 120 225 Q 160 220 170 230 L 175 250 Q 170 260 155 265 L 130 265 Q 115 260 110 245 L 110 235 Q 110 225 120 225 Z',
      center: { x: 142, y: 245 }
    },
    {
      id: 'jeonnam',
      name: '전남',
      path: 'M 85 265 Q 125 260 135 270 L 140 295 Q 135 305 120 310 L 95 310 Q 80 305 75 290 L 75 275 Q 75 265 85 265 Z',
      center: { x: 107, y: 287 }
    },
    {
      id: 'gyeongbuk',
      name: '경북',
      path: 'M 230 150 Q 265 145 275 155 L 280 205 Q 275 215 260 220 L 235 220 Q 225 215 220 200 L 220 160 Q 220 150 230 150 Z',
      center: { x: 250, y: 185 }
    },
    {
      id: 'gyeongnam',
      name: '경남',
      path: 'M 180 250 Q 230 245 240 255 L 245 285 Q 240 295 225 300 L 190 300 Q 175 295 170 280 L 170 260 Q 170 250 180 250 Z',
      center: { x: 207, y: 275 }
    },
    {
      id: 'busan',
      name: '부산',
      path: 'M 250 285 Q 265 282 270 290 L 270 300 Q 265 305 255 305 L 245 300 Q 245 290 250 285 Z',
      center: { x: 257, y: 295 }
    },
    {
      id: 'daegu',
      name: '대구',
      path: 'M 245 205 Q 255 202 260 207 L 260 215 Q 255 220 248 220 L 240 215 Q 240 207 245 205 Z',
      center: { x: 250, y: 212 }
    },
    {
      id: 'jeju',
      name: '제주',
      path: 'M 105 355 Q 135 352 145 360 L 145 370 Q 140 378 125 380 L 110 378 Q 95 375 90 365 L 95 358 Q 100 355 105 355 Z',
      center: { x: 117, y: 368 }
    }
  ];

  // 지역별 채용공고 수 계산
  const getJobCountByRegion = (regionName: string) => {
    return jobs.filter(job => {
      const location = job.location.toLowerCase();
      return location.includes(regionName) || 
             (regionName === '경기' && (location.includes('성남') || location.includes('경기'))) ||
             (regionName === '서울' && location.includes('서울')) ||
             (regionName === '부산' && location.includes('부산')) ||
             (regionName === '대구' && location.includes('대구')) ||
             (regionName === '제주' && location.includes('제주'));
    }).length;
  };

  // 지역별 채용공고 가져오기
  const getJobsByRegion = (regionName: string) => {
    return jobs.filter(job => {
      const location = job.location.toLowerCase();
      return location.includes(regionName) || 
             (regionName === '경기' && (location.includes('성남') || location.includes('경기'))) ||
             (regionName === '서울' && location.includes('서울')) ||
             (regionName === '부산' && location.includes('부산')) ||
             (regionName === '대구' && location.includes('대구')) ||
             (regionName === '제주' && location.includes('제주'));
    });
  };

  const handleRegionClick = (region: Region) => {
    setSelectedRegion(region.id);
    const regionJobs = getJobsByRegion(region.name);
    if (regionJobs.length === 1) {
      onJobSelect(regionJobs[0]);
    }
  };

  // 색상 결정 함수
  const getRegionColor = (jobCount: number, isHovered: boolean, isSelected: boolean) => {
    if (jobCount === 0) return isHovered ? '#d1d5db' : '#e5e7eb';
    
    const baseColors = {
      low: isSelected ? '#60a5fa' : '#dbeafe',
      medium: isSelected ? '#3b82f6' : '#93c5fd',
      high: isSelected ? '#2563eb' : '#3b82f6'
    };

    if (isHovered) {
      return jobCount <= 2 ? '#93c5fd' : jobCount <= 4 ? '#60a5fa' : '#3b82f6';
    }

    return jobCount <= 2 ? baseColors.low : jobCount <= 4 ? baseColors.medium : baseColors.high;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <MapPin className="w-7 h-7" />
          전국 QA 채용 현황
        </h3>
        <p className="text-blue-100">지역을 클릭하여 채용공고를 확인하세요</p>
        
        {/* 통계 */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              <span className="text-sm">총 채용공고</span>
            </div>
            <p className="text-2xl font-bold mt-1">{jobs.length}개</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">채용 기업</span>
            </div>
            <p className="text-2xl font-bold mt-1">{new Set(jobs.map(j => j.companyName)).size}개</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm">평균 연봉</span>
            </div>
            <p className="text-2xl font-bold mt-1">5.6천만</p>
          </div>
        </div>
      </div>

      {/* 지도 영역 */}
      <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="relative bg-white rounded-lg shadow-inner p-4">
          <svg
            viewBox="0 0 360 420"
            className="w-full h-[450px] max-w-2xl mx-auto"
          >
            {/* 배경 그라디언트 */}
            <defs>
              <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e0f2fe" />
              </linearGradient>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="2" dy="2" result="offsetblur"/>
                <feFlood floodColor="#000000" floodOpacity="0.1"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* 배경 */}
            <rect width="360" height="420" fill="url(#bgGradient)" />
            
            {/* 지역별 경로 */}
            {regions.map((region) => {
              const jobCount = getJobCountByRegion(region.name);
              const regionJobs = getJobsByRegion(region.name);
              const isHovered = hoveredRegion === region.id;
              const isSelected = selectedRegion === region.id;
              
              return (
                <g key={region.id}>
                  <path
                    d={region.path}
                    fill={getRegionColor(jobCount, isHovered, isSelected)}
                    stroke="#4b5563"
                    strokeWidth="1.5"
                    filter="url(#shadow)"
                    className="cursor-pointer transition-all duration-300"
                    style={{
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      transformOrigin: `${region.center.x}px ${region.center.y}px`
                    }}
                    onMouseEnter={() => {
                      setHoveredRegion(region.id);
                      if (regionJobs.length > 0) {
                        setHoveredJob(regionJobs[0]);
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredRegion(null);
                      setHoveredJob(null);
                    }}
                    onClick={() => handleRegionClick(region)}
                  />
                  
                  {/* 지역명 표시 */}
                  <text
                    x={region.center.x}
                    y={region.center.y}
                    textAnchor="middle"
                    className="text-sm font-semibold pointer-events-none"
                    fill={jobCount > 3 ? '#ffffff' : '#1f2937'}
                  >
                    {region.name}
                  </text>
                  
                  {/* 채용공고 수 배지 */}
                  {jobCount > 0 && (
                    <g className="pointer-events-none">
                      <circle
                        cx={region.center.x + 20}
                        cy={region.center.y - 15}
                        r="12"
                        fill="#ef4444"
                        filter="url(#shadow)"
                      />
                      <text
                        x={region.center.x + 20}
                        y={region.center.y - 10}
                        textAnchor="middle"
                        className="text-xs font-bold"
                        fill="#ffffff"
                      >
                        {jobCount}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* 범례 */}
          <div className="mt-6 flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded shadow-sm"></div>
              <span className="text-sm text-gray-600">채용 없음</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-200 rounded shadow-sm"></div>
              <span className="text-sm text-gray-600">1-2개</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-400 rounded shadow-sm"></div>
              <span className="text-sm text-gray-600">3-4개</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded shadow-sm"></div>
              <span className="text-sm text-gray-600">5개 이상</span>
            </div>
          </div>
        </div>

        {/* 호버시 툴팁 */}
        {hoveredJob && hoveredRegion && (
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl p-4 w-72 pointer-events-none">
            <h5 className="font-semibold text-gray-900 mb-1">{hoveredJob.companyName}</h5>
            <p className="text-sm text-gray-600 mb-2">{hoveredJob.position}</p>
            <p className="text-xs text-gray-500">{hoveredJob.location}</p>
          </div>
        )}

        {/* 선택된 지역의 채용공고 목록 */}
        {selectedRegion && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              {regions.find(r => r.id === selectedRegion)?.name} 지역 채용공고
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getJobsByRegion(regions.find(r => r.id === selectedRegion)?.name || '').map((job) => (
                <div
                  key={job.id}
                  className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => onJobSelect(job)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900">{job.position}</h5>
                      <p className="text-sm text-gray-600">{job.companyName}</p>
                    </div>
                    {job.isCertified && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">인증</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{job.location}</span>
                    <span className="font-medium text-blue-600">
                      {job.salaryRange.min / 10000}-{job.salaryRange.max / 10000}만원
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;