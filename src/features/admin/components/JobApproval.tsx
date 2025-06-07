// src/features/admin/components/JobApproval.tsx

import { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Calendar,
  MapPin,
  Building,  // 추가
  DollarSign
} from 'lucide-react';
import { sendCompanyEmail } from '../../recruitment/services/companyEmailService';

interface PendingJob {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  position: string;
  mainTasks: string[];
  tools: string[];
  teamStructure: string;
  salaryRange: { min: number; max: number };
  location: string;
  workType: 'onsite' | 'remote' | 'hybrid';
  packageType: 'basic' | 'standard' | 'premium';
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  managementToken?: string;
}

const JobApproval = () => {
  const [pendingJobs, setPendingJobs] = useState<PendingJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<PendingJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  useEffect(() => {
    fetchPendingJobs();
  }, []);

  const fetchPendingJobs = async () => {
    try {
      const response = await fetch('/api/admin/jobs/pending', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      setPendingJobs(data);
    } catch (error) {
      console.error('Failed to fetch pending jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveJob = async (job: PendingJob) => {
    try {
      // 1. 채용공고 승인
      const response = await fetch(`/api/admin/jobs/${job.id}/approve`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      
      const updatedJob = await response.json();
      
      // 2. 승인 이메일 발송 (관리 링크 포함)
      await sendCompanyEmail('applicationApproved', {
        companyName: job.companyName,
        contactEmail: job.contactEmail,
        position: job.position,
        managementToken: updatedJob.managementToken,
        status: 'approved'
      });
      
      // 3. UI 업데이트
      setPendingJobs(prev => prev.filter(j => j.id !== job.id));
      setSelectedJob(null);
      
      alert('채용공고가 승인되었습니다.');
    } catch (error) {
      console.error('승인 실패:', error);
      alert('승인 처리 중 오류가 발생했습니다.');
    }
  };

  const handleRejectJob = async (job: PendingJob) => {
    if (!rejectionReason.trim()) {
      alert('거절 사유를 입력해주세요.');
      return;
    }

    try {
      // 1. 채용공고 거절
      await fetch(`/api/admin/jobs/${job.id}/reject`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ reason: rejectionReason }),
      });
      
      // 2. 거절 이메일 발송
      await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: job.contactEmail,
          subject: `[제임스컴퍼니] ${job.position} 채용공고 검토 결과`,
          html: `
            <p>안녕하세요, ${job.companyName}님</p>
            <p>제출해주신 "${job.position}" 채용공고를 검토한 결과, 아쉽게도 게시 기준에 부합하지 않아 승인이 어렵습니다.</p>
            <p><strong>사유:</strong> ${rejectionReason}</p>
            <p>수정 후 다시 제출해주시면 재검토하겠습니다.</p>
            <p>감사합니다.</p>
          `
        })
      });
      
      // 3. UI 업데이트
      setPendingJobs(prev => prev.filter(j => j.id !== job.id));
      setSelectedJob(null);
      setShowRejectionModal(false);
      setRejectionReason('');
      
      alert('채용공고가 거절되었습니다.');
    } catch (error) {
      console.error('거절 실패:', error);
      alert('거절 처리 중 오류가 발생했습니다.');
    }
  };

  const packageInfo = {
    basic: { name: '기본형', color: 'bg-gray-100 text-gray-700' },
    standard: { name: '스탠다드형', color: 'bg-blue-100 text-blue-700' },
    premium: { name: '프리미엄형', color: 'bg-purple-100 text-purple-700' }
  };

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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">채용공고 승인 관리</h1>
          <p className="text-gray-600 mt-2">검토 대기 중인 채용공고를 확인하고 승인/거절하세요.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">대기 중</p>
                <p className="text-3xl font-bold text-gray-900">{pendingJobs.length}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">오늘 승인</p>
                <p className="text-3xl font-bold text-green-600">12</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">오늘 거절</p>
                <p className="text-3xl font-bold text-red-600">3</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">검토 대기 목록</h2>
          </div>
          
          {pendingJobs.length === 0 ? (
            <div className="p-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-gray-600">모든 채용공고를 검토했습니다!</p>
            </div>
          ) : (
            <div className="divide-y">
              {pendingJobs.map((job) => (
                <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{job.position}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          packageInfo[job.packageType].color
                        }`}>
                          {packageInfo[job.packageType].name}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
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
                          {job.salaryRange.min / 10000}-{job.salaryRange.max / 10000}천만
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(job.submittedAt).toLocaleDateString('ko-KR')}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setSelectedJob(job)}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                        >
                          <Eye className="w-4 h-4" />
                          상세 보기
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleApproveJob(job)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        승인
                      </button>
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setShowRejectionModal(true);
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        거절
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedJob && !showRejectionModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => setSelectedJob(null)} />
            
            <div className="relative bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <h3 className="text-2xl font-bold text-gray-900">{selectedJob.position}</h3>
                <p className="text-gray-600 mt-1">{selectedJob.companyName}</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">주요 업무</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {selectedJob.mainTasks.map((task, idx) => (
                      <li key={idx}>{task}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">기술 스택</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.tools.map((tool, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">조직 구조</h4>
                  <p className="text-gray-600">{selectedJob.teamStructure}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">급여</h4>
                    <p className="text-gray-600">
                      {selectedJob.salaryRange.min / 10000}-{selectedJob.salaryRange.max / 10000}천만원
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">근무 형태</h4>
                    <p className="text-gray-600 capitalize">{selectedJob.workType}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">담당자 정보</h4>
                  <p className="text-gray-600">{selectedJob.contactName} ({selectedJob.contactEmail})</p>
                </div>
              </div>
              
              <div className="p-6 border-t flex justify-end gap-3">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  닫기
                </button>
                <button
                  onClick={() => handleApproveJob(selectedJob)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  승인하기
                </button>
                <button
                  onClick={() => setShowRejectionModal(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  거절하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectionModal && selectedJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => {
              setShowRejectionModal(false);
              setRejectionReason('');
            }} />
            
            <div className="relative bg-white rounded-lg max-w-md w-full">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">채용공고 거절</h3>
                <p className="text-gray-600 mt-1">{selectedJob.position} - {selectedJob.companyName}</p>
              </div>
              
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  거절 사유 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="거절 사유를 구체적으로 입력해주세요."
                />
              </div>
              
              <div className="p-6 border-t flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowRejectionModal(false);
                    setRejectionReason('');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  취소
                </button>
                <button
                  onClick={() => handleRejectJob(selectedJob)}
                  disabled={!rejectionReason.trim()}
                  className={`px-4 py-2 rounded-lg ${
                    rejectionReason.trim()
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  거절 확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApproval;