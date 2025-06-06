// src/pages/company/CompanyRecruitmentDashboard.tsx

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Building, 
  Eye, 
  Users, 
  Calendar,
  Edit,
  Trash2,
  BarChart,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Mail,
  Shield
} from 'lucide-react';

interface ApplicationSummary {
  id: string;
  applicantName: string;
  appliedDate: string;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected';
  resumeUrl?: string;
  jamesScore?: number;
}

interface Job {
  id: string;
  position: string;
  status: 'pending' | 'active' | 'paused' | 'expired';
  postedDate: string;
  expiryDate: string;
  viewCount: number;
  applicationCount: number;
  packageType: 'basic' | 'standard' | 'premium';
  applications: ApplicationSummary[];
}

const CompanyRecruitmentDashboard = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  
  // 샘플 데이터 (실제로는 API에서 가져옴)
  const companyData = {
    name: '테크스타트업 A',
    email: 'hr@techstartup.com',
    jobs: [
      {
        id: '1',
        position: 'QA 자동화 엔지니어',
        status: 'active' as const,
        postedDate: '2025-01-10',
        expiryDate: '2025-02-10',
        viewCount: 342,
        applicationCount: 28,
        packageType: 'premium' as const,
        applications: [
          {
            id: 'app1',
            applicantName: '김철수',
            appliedDate: '2025-01-15',
            status: 'new' as const,
            jamesScore: 85
          },
          {
            id: 'app2',
            applicantName: '이영희',
            appliedDate: '2025-01-16',
            status: 'reviewed' as const,
            jamesScore: 92
          }
        ]
      }
    ] as Job[]
  };

  const stats = {
    totalViews: companyData.jobs.reduce((sum, job) => sum + job.viewCount, 0),
    totalApplications: companyData.jobs.reduce((sum, job) => sum + job.applicationCount, 0),
    activeJobs: companyData.jobs.filter(job => job.status === 'active').length,
    avgApplicationsPerJob: Math.round(
      companyData.jobs.reduce((sum, job) => sum + job.applicationCount, 0) / companyData.jobs.length
    )
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">접근 권한이 없습니다</h2>
          <p className="text-gray-600">이메일로 받은 링크를 통해 접속해주세요.</p>
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
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{companyData.name}</h1>
                <p className="text-sm text-gray-600">채용 관리 대시보드</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium flex items-center gap-2">
                <Shield className="w-4 h-4" />
                제임스 인증 기업
              </span>
              <button
                onClick={() => navigate('/services/recruitment/post')}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                새 채용공고 등록
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 조회수</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalViews}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 지원자</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalApplications}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">진행중 공고</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeJobs}</p>
              </div>
              <FileText className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">평균 지원율</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.avgApplicationsPerJob}</p>
              </div>
              <BarChart className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                채용공고 관리
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === 'applications'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                지원자 관리
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === 'analytics'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                분석 리포트
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {companyData.jobs.map(job => (
                  <div key={job.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{job.position}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            job.status === 'active' 
                              ? 'bg-green-100 text-green-700'
                              : job.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {job.status === 'active' ? '게시중' : job.status === 'pending' ? '검토중' : '종료'}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            job.packageType === 'premium'
                              ? 'bg-purple-100 text-purple-700'
                              : job.packageType === 'standard'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {job.packageType === 'premium' ? '프리미엄' : job.packageType === 'standard' ? '스탠다드' : '기본'}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            게시일: {new Date(job.postedDate).toLocaleDateString('ko-KR')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            마감일: {new Date(job.expiryDate).toLocaleDateString('ko-KR')}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-6 mt-4">
                          <div className="flex items-center gap-2">
                            <Eye className="w-5 h-5 text-gray-400" />
                            <span className="font-medium">{job.viewCount}</span>
                            <span className="text-gray-600">조회</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-gray-400" />
                            <span className="font-medium">{job.applicationCount}</span>
                            <span className="text-gray-600">지원</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart className="w-5 h-5 text-gray-400" />
                            <span className="font-medium">
                              {job.viewCount > 0 ? Math.round((job.applicationCount / job.viewCount) * 100) : 0}%
                            </span>
                            <span className="text-gray-600">지원율</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'applications' && (
              <div>
                {/* Job Selector */}
                <div className="mb-6">
                  <select
                    value={selectedJob || ''}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">전체 포지션</option>
                    {companyData.jobs.map(job => (
                      <option key={job.id} value={job.id}>{job.position}</option>
                    ))}
                  </select>
                </div>

                {/* Applications List */}
                <div className="space-y-4">
                  {companyData.jobs
                    .filter(job => !selectedJob || job.id === selectedJob)
                    .flatMap(job => 
                      job.applications.map(app => (
                        <div key={app.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-semibold">
                                {app.applicantName[0]}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{app.applicantName}</h4>
                                <p className="text-sm text-gray-600">
                                  {job.position} · 지원일: {new Date(app.appliedDate).toLocaleDateString('ko-KR')}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              {app.jamesScore && (
                                <div className="text-center">
                                  <div className={`text-2xl font-bold ${
                                    app.jamesScore >= 80 ? 'text-green-600' : 
                                    app.jamesScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                                  }`}>
                                    {app.jamesScore}
                                  </div>
                                  <p className="text-xs text-gray-600">제임스 스코어</p>
                                </div>
                              )}
                              
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                app.status === 'new' 
                                  ? 'bg-blue-100 text-blue-700'
                                  : app.status === 'reviewed'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : app.status === 'shortlisted'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {app.status === 'new' ? '신규' : 
                                 app.status === 'reviewed' ? '검토됨' :
                                 app.status === 'shortlisted' ? '서류합격' : '불합격'}
                              </span>
                              
                              <div className="flex items-center gap-2">
                                <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                                  이력서 보기
                                </button>
                                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                  <Mail className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">채용 성과</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">평균 조회수</span>
                        <span className="font-semibold">{Math.round(stats.totalViews / companyData.jobs.length)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">평균 지원율</span>
                        <span className="font-semibold">{Math.round((stats.totalApplications / stats.totalViews) * 100)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">제임스 스코어 평균</span>
                        <span className="font-semibold">88.5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">프리미엄 혜택</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">메인 페이지 상단 노출</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">AI 지원자 매칭 서비스</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">상세 분석 리포트 제공</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download Report */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">월간 채용 리포트</h3>
                      <p className="text-gray-600 mt-1">상세한 채용 성과와 지원자 분석 리포트를 다운로드하세요</p>
                    </div>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      리포트 다운로드
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Email Link Notice */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800">
                이 페이지는 이메일로 전송된 고유 링크를 통해서만 접근 가능합니다. 
                링크를 안전하게 보관해주세요. 추가 기능이 필요하시면 기업 회원으로 가입하실 수 있습니다.
              </p>
              <button className="mt-2 text-sm text-amber-900 font-medium hover:underline">
                기업 회원 가입하기 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRecruitmentDashboard;