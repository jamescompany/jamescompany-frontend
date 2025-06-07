// src/features/profile/pages/MyApplications.tsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../shared/services/api';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar,
  Building,
  MapPin,
  TrendingUp,
  Eye,
  MessageSquare,
  AlertCircle,
  Filter,
  Search
} from 'lucide-react';

interface Application {
  id: string;
  jobId: string;
  companyName: string;
  position: string;
  location: string;
  appliedDate: string;
  status: 'submitted' | 'under_review' | 'interview_scheduled' | 'interview_completed' | 'offer_sent' | 'accepted' | 'rejected' | 'withdrawn';
  nextStep?: string;
  interviewDate?: string;
  viewedByCompany: boolean;
  hasNewMessage: boolean;
  applicationNumber: string;
  salaryRange: {
    min: number;
    max: number;
  };
}

const MyApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/v1/recruitments/applications/my');
      
      // API 응답을 프론트엔드 형식으로 변환
      const formattedApplications = response.data.map((app: any) => ({
        id: app.id,
        jobId: app.job_posting_id,
        companyName: app.job_posting.company.name,
        position: app.job_posting.position,
        location: app.job_posting.location,
        appliedDate: app.applied_at,
        status: mapApplicationStatus(app.status),
        nextStep: getNextStep(app.status),
        interviewDate: app.interview_date,
        viewedByCompany: app.viewed_at !== null,
        hasNewMessage: app.has_new_message || false,
        applicationNumber: `APP-${app.id.slice(0, 13).toUpperCase()}`,
        salaryRange: {
          min: app.job_posting.salary_min,
          max: app.job_posting.salary_max
        }
      }));
      
      setApplications(formattedApplications);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  // 백엔드 상태를 프론트엔드 상태로 매핑
  const mapApplicationStatus = (backendStatus: string) => {
    const statusMap: { [key: string]: Application['status'] } = {
      'submitted': 'submitted',
      'under_review': 'under_review',
      'interview_scheduled': 'interview_scheduled',
      'interview_completed': 'interview_completed',
      'offer_sent': 'offer_sent',
      'accepted': 'accepted',
      'rejected': 'rejected',
      'withdrawn': 'withdrawn'
    };
    return statusMap[backendStatus] || 'submitted';
  };

  // 다음 단계 정보 생성
  const getNextStep = (status: string) => {
    const nextStepMap: { [key: string]: string } = {
      'submitted': '서류 검토 대기',
      'under_review': '서류 검토 중',
      'interview_scheduled': '면접 예정',
      'interview_completed': '최종 결과 대기',
      'offer_sent': '오퍼 검토',
    };
    return nextStepMap[status];
  };

  const statusConfig = {
    submitted: {
      label: '접수됨',
      color: 'bg-gray-100 text-gray-700',
      icon: <Clock className="w-4 h-4" />,
      description: '기업에서 지원서를 확인하기 전입니다'
    },
    under_review: {
      label: '검토중',
      color: 'bg-blue-100 text-blue-700',
      icon: <Eye className="w-4 h-4" />,
      description: '기업에서 지원서를 검토하고 있습니다'
    },
    interview_scheduled: {
      label: '면접 예정',
      color: 'bg-purple-100 text-purple-700',
      icon: <Calendar className="w-4 h-4" />,
      description: '면접이 예정되어 있습니다'
    },
    interview_completed: {
      label: '면접 완료',
      color: 'bg-indigo-100 text-indigo-700',
      icon: <CheckCircle className="w-4 h-4" />,
      description: '면접이 완료되었습니다'
    },
    offer_sent: {
      label: '오퍼 발송',
      color: 'bg-yellow-100 text-yellow-700',
      icon: <MessageSquare className="w-4 h-4" />,
      description: '채용 제안을 받았습니다'
    },
    accepted: {
      label: '합격',
      color: 'bg-green-100 text-green-700',
      icon: <CheckCircle className="w-4 h-4" />,
      description: '축하합니다! 합격하셨습니다'
    },
    rejected: {
      label: '불합격',
      color: 'bg-red-100 text-red-700',
      icon: <XCircle className="w-4 h-4" />,
      description: '아쉽게도 이번에는 함께하지 못하게 되었습니다'
    },
    withdrawn: {
      label: '지원 취소',
      color: 'bg-gray-100 text-gray-700',
      icon: <XCircle className="w-4 h-4" />,
      description: '지원이 취소되었습니다'
    }
  };

  const stats = {
    total: applications.length,
    reviewing: applications.filter(a => a.status === 'under_review').length,
    interview: applications.filter(a => a.status === 'interview_scheduled' || a.status === 'interview_completed').length,
    accepted: applications.filter(a => a.status === 'accepted').length
  };

  const filteredApplications = applications
    .filter(app => filterStatus === 'all' || app.status === filterStatus)
    .filter(app => 
      app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-600">지원 현황을 불러오는 중...</span>
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
              <h1 className="text-2xl font-bold text-gray-900">내 지원 현황</h1>
              <p className="text-gray-600 mt-1">제임스컴퍼니를 통해 지원한 포지션을 관리하세요</p>
            </div>
            <button
              onClick={() => navigate('/services/recruitment')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              새로운 포지션 찾기
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">전체 지원</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">검토중</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{stats.reviewing}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">면접 진행</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">{stats.interview}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">합격</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.accepted}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="회사명 또는 포지션으로 검색"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">전체 상태</option>
                <option value="submitted">접수됨</option>
                <option value="under_review">검토중</option>
                <option value="interview_scheduled">면접 예정</option>
                <option value="interview_completed">면접 완료</option>
                <option value="offer_sent">오퍼 발송</option>
                <option value="accepted">합격</option>
                <option value="rejected">불합격</option>
                <option value="withdrawn">지원 취소</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((application) => {
            const statusInfo = statusConfig[application.status] || statusConfig.submitted;
            
            return (
              <div
                key={application.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/mypage/applications/${application.id}`)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                          {application.companyName[0]}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {application.position}
                            </h3>
                            {application.hasNewMessage && (
                              <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                <MessageSquare className="w-3 h-3" />
                                새 메시지
                              </span>
                            )}
                            {application.viewedByCompany && (
                              <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                <Eye className="w-3 h-3" />
                                열람됨
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              {application.companyName}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {application.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {application.salaryRange.min / 10000}-{application.salaryRange.max / 10000}천만
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                              {statusInfo.icon}
                              {statusInfo.label}
                            </span>
                            
                            {application.status === 'interview_scheduled' && application.interviewDate && (
                              <span className="flex items-center gap-1 text-sm text-purple-600 font-medium">
                                <Calendar className="w-4 h-4" />
                                면접: {new Date(application.interviewDate).toLocaleDateString('ko-KR')} {new Date(application.interviewDate).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            )}
                            
                            <span className="text-sm text-gray-500">
                              지원일: {new Date(application.appliedDate).toLocaleDateString('ko-KR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">지원번호</p>
                        <p className="text-sm font-mono text-gray-700">{application.applicationNumber}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Description */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {statusInfo.description}
                      {application.nextStep && (
                        <span className="ml-2 font-medium">다음 단계: {application.nextStep}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredApplications.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">지원 내역이 없습니다</h3>
            <p className="text-gray-600">
              {filterStatus !== 'all' ? '해당 상태의 지원 내역이 없습니다.' : '아직 지원한 포지션이 없습니다.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;