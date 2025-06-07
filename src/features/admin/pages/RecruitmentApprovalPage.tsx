// src/features/admin/pages/RecruitmentApprovalPage.tsx

import { useState, useEffect } from 'react';
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  Briefcase,
  DollarSign,
  Building,
  MapPin,
  TrendingUp,
  Users
} from 'lucide-react';
import { recruitmentAPI } from '../../../features/recruitment/services/recruitmentApi';  // adminRecruitmentAPI → recruitmentAPI
import { formatDate } from '../../../shared/utils/dateUtils';

interface PendingJob {
  id: string;
  companyName: string;
  companyEmail: string;
  contactName: string;
  contactEmail: string;
  position: string;
  summary: string;
  mainTasks: string[];
  tools: string[];
  teamStructure: string;
  preferredQualifications?: string[];
  salaryMin: number;
  salaryMax: number;
  benefits: string[];
  location: string;
  workType: 'onsite' | 'remote' | 'hybrid';
  packageType: 'basic' | 'standard' | 'premium';
  postingDate: string;
  expiryDate: string;
  isActive: boolean;
  createdAt: string;
  createdByEmail?: string;
  memo?: string;
}

interface AdminStats {
  totalJobs: number;
  activeJobs: number;
  pendingJobs: number;
  totalCompanies: number;
  verifiedCompanies: number;
  totalApplications: number;
  packageStats: {
    basic: number;
    standard: number;
    premium: number;
  };
  recentJobs: number;
  recentApplications: number;
}

const RecruitmentApprovalPage = () => {

    const [pendingJobs, setPendingJobs] = useState<PendingJob[]>([]);
    const [selectedJob, setSelectedJob] = useState<PendingJob | null>(null);
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterPackage, setFilterPackage] = useState<string>('all');
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [approvalData, setApprovalData] = useState({
      isApproved: true,
      jamesNote: '',
      rejectionReason: ''
    });
  
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
        try {
          setLoading(true);
          const [jobsData, statsData] = await Promise.all([
            recruitmentAPI.admin.getPendingJobs(),    // adminRecruitmentAPI → recruitmentAPI.admin
            recruitmentAPI.admin.getAdminStats()      // adminRecruitmentAPI → recruitmentAPI.admin
          ]);
          setPendingJobs(jobsData);
          setStats(statsData);
        } catch (error) {
          console.error('Failed to fetch data:', error);
        } finally {
          setLoading(false);
        }
      };

      const handleApproval = async (jobId: string) => {
        try {
          await recruitmentAPI.admin.approveJob(jobId, approvalData);  // adminRecruitmentAPI → recruitmentAPI.admin
          await fetchData();
          setShowApprovalModal(false);
          setSelectedJob(null);
          alert(approvalData.isApproved ? '승인되었습니다.' : '거절되었습니다.');
        } catch (error) {
          console.error('Failed to approve job:', error);
          alert('처리 중 오류가 발생했습니다.');
        }
      };

  const packageColors = {
    basic: 'bg-gray-100 text-gray-700',
    standard: 'bg-blue-100 text-blue-700',
    premium: 'bg-purple-100 text-purple-700'
  };

  const packagePrices = {
    basic: '₩50,000',
    standard: '₩100,000',
    premium: '₩350,000'
  };

  const filteredJobs = pendingJobs.filter(job => {
    const matchesSearch = searchQuery === '' || 
      job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPackage = filterPackage === 'all' || job.packageType === filterPackage;
    
    return matchesSearch && matchesPackage;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">채용공고 관리</h1>
              <p className="text-sm text-gray-600 mt-1">QA 채용공고 검토 및 승인</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                대기중: {stats?.pendingJobs || 0}건
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">전체 공고</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalJobs}</p>
                </div>
                <Briefcase className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">활성 공고</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeJobs}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">기업 수</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCompanies}</p>
                </div>
                <Building className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">총 지원</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">주간 신규</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.recentJobs}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="회사명 또는 포지션으로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              
              <select
                value={filterPackage}
                onChange={(e) => setFilterPackage(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">모든 패키지</option>
                <option value="basic">기본형</option>
                <option value="standard">스탠다드형</option>
                <option value="premium">프리미엄형</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-600">
              총 {filteredJobs.length}건
            </div>
          </div>
        </div>
      </div>

      {/* Job List */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedJob(job)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {job.position}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${packageColors[job.packageType]}`}>
                        {job.packageType.toUpperCase()} ({packagePrices[job.packageType]})
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {job.companyName}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salaryMin / 10000}-{job.salaryMax / 10000}만원
                      </span>
                    </div>
                    
                    <p className="text-gray-600 line-clamp-2">{job.summary}</p>
                    
                    <div className="flex items-center gap-4 mt-4 text-sm">
                      <span className="text-gray-500">
                        신청일: {formatDate(job.createdAt)}
                      </span>
                      <span className="text-gray-500">
                        담당자: {job.contactName} ({job.contactEmail})
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(job);
                        setApprovalData({ ...approvalData, isApproved: true });
                        setShowApprovalModal(true);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      승인
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(job);
                        setApprovalData({ ...approvalData, isApproved: false });
                        setShowApprovalModal(true);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      거절
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && !showApprovalModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-50" onClick={() => setSelectedJob(null)} />
            
            <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">채용공고 상세</h2>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* 기업 정보 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">기업 정보</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">회사명:</span>
                      <span className="ml-2 font-medium">{selectedJob.companyName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">담당자:</span>
                      <span className="ml-2 font-medium">{selectedJob.contactName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">이메일:</span>
                      <span className="ml-2 font-medium">{selectedJob.contactEmail}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">패키지:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${packageColors[selectedJob.packageType]}`}>
                        {selectedJob.packageType.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* 채용 정보 */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">채용 정보</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">포지션</h4>
                      <p className="text-gray-900">{selectedJob.position}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">주요 업무</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedJob.mainTasks.map((task, index) => (
                          <li key={index} className="text-gray-700">{task}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">사용 도구</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.tools.map((tool, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">팀 구조</h4>
                      <p className="text-gray-700">{selectedJob.teamStructure}</p>
                    </div>
                    
                    {selectedJob.preferredQualifications && selectedJob.preferredQualifications.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">우대사항</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {selectedJob.preferredQualifications.map((qual, index) => (
                            <li key={index} className="text-gray-700">{qual}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">급여</h4>
                        <p className="text-gray-900">
                          ₩{selectedJob.salaryMin / 10000}-{selectedJob.salaryMax / 10000}만원
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">근무 형태</h4>
                        <p className="text-gray-900">
                          {selectedJob.workType === 'onsite' ? '사무실' :
                           selectedJob.workType === 'remote' ? '재택' : '하이브리드'}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">복지</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedJob.benefits.map((benefit, index) => (
                          <li key={index} className="text-gray-700">{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* 메모 */}
                {selectedJob.memo && (
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">메모</h4>
                    <p className="text-gray-700">{selectedJob.memo}</p>
                  </div>
                )}
                
                {/* 액션 버튼 */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => {
                      setApprovalData({ ...approvalData, isApproved: true });
                      setShowApprovalModal(true);
                    }}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    승인하기
                  </button>
                  <button
                    onClick={() => {
                      setApprovalData({ ...approvalData, isApproved: false });
                      setShowApprovalModal(true);
                    }}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    거절하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approval Modal */}
      {showApprovalModal && selectedJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-50" />
            
            <div className="relative bg-white rounded-lg max-w-lg w-full">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">
                  {approvalData.isApproved ? '채용공고 승인' : '채용공고 거절'}
                </h3>
              </div>
              
              <div className="p-6">
                {approvalData.isApproved ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      제임스의 한마디 (선택사항)
                    </label>
                    <textarea
                      value={approvalData.jamesNote}
                      onChange={(e) => setApprovalData({ ...approvalData, jamesNote: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="이 포지션의 특별한 점이나 지원자에게 전하고 싶은 메시지를 작성해주세요."
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      거절 사유 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={approvalData.rejectionReason}
                      onChange={(e) => setApprovalData({ ...approvalData, rejectionReason: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="거절 사유를 입력해주세요."
                      required
                    />
                  </div>
                )}
              </div>
              
              <div className="px-6 py-4 border-t flex justify-end gap-3">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={() => handleApproval(selectedJob.id)}
                  disabled={!approvalData.isApproved && !approvalData.rejectionReason}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    approvalData.isApproved
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  } ${!approvalData.isApproved && !approvalData.rejectionReason ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {approvalData.isApproved ? '승인' : '거절'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruitmentApprovalPage;