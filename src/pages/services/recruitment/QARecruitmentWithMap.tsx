// src/pages/services/recruitment/QARecruitmentWithMap.tsx

import { useState } from 'react';
import { MapPin, List, Filter, Search } from 'lucide-react';
import type { JobPosting } from '../../../types/recruitment';
import { sampleJobs } from '../../../data/recriutment/sampleJobs';
import JobDetailModal from './components/JobDetailModal';
import KakaoMapView from '../../../components/recruitment/KakaoMapView';

const QARecruitmentWithMap = () => {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filterType, setFilterType] = useState<'all' | 'remote' | 'onsite' | 'hybrid'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // 필터링된 채용공고
  const filteredJobs = sampleJobs.filter(job => {
    const matchesType = filterType === 'all' || job.workType === filterType;
    const matchesSearch = searchQuery === '' || 
      job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">전체 QA 채용공고</h1>
              <p className="text-sm text-gray-600 mt-1">프리미엄부터 일반 채용공고까지 모두 확인하세요</p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>필터</span>
              </button>

              {/* View Mode */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    viewMode === 'list' 
                      ? 'bg-white shadow-sm text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-5 h-5" />
                  <span>목록</span>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    viewMode === 'map' 
                      ? 'bg-white shadow-sm text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  <span>지도</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">근무형태:</span>
                <div className="flex gap-2">
                  {(['all', 'onsite', 'hybrid', 'remote'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filterType === type
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {type === 'all' ? '전체' :
                       type === 'onsite' ? '사무실' :
                       type === 'hybrid' ? '하이브리드' : '재택근무'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            총 <span className="font-semibold text-gray-900">{filteredJobs.length}개</span>의 채용공고
          </p>
        </div>

        {/* List View */}
        {viewMode === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <div className="p-6">
                  {/* Company & Position */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {job.position}
                    </h3>
                    <p className="text-gray-600">{job.companyName}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {job.workType === 'onsite' ? '사무실' :
                       job.workType === 'hybrid' ? '하이브리드' : '재택근무'}
                    </span>
                    {job.isCertified && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        인증
                      </span>
                    )}
                  </div>

                  {/* Location & Salary */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">
                        ₩{job.salaryRange.min / 10000}-{job.salaryRange.max / 10000}만원
                      </span>
                    </div>
                  </div>

                  {/* James Note Preview */}
                  {job.jamesNote && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700 line-clamp-2">
                        💡 {job.jamesNote}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Map View */}
        {viewMode === 'map' && (
          <KakaoMapView 
            jobs={filteredJobs} 
            onJobSelect={setSelectedJob}
          />
        )}
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

export default QARecruitmentWithMap;