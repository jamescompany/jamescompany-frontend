// src/features/admin/pages/MentorApprovalPage.tsx

import React, { useState, useEffect } from 'react';
import { Check, X, Download, ExternalLink } from 'lucide-react';
import api from '../../../shared/services/api';

interface MentorApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  qaExperience: string;
  expertise: string[];
  sessionPrice: number;
  bio: string;
  verificationMethod: 'businessCard' | 'linkedin';
  linkedinUrl?: string;
  businessCardUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  reviewedAt?: string;
}

const MentorApprovalPage: React.FC = () => {
  const [applications, setApplications] = useState<MentorApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<MentorApplication | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/admin/mentor-applications?status=${filter}`);
      setApplications(response.data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      // 임시 데이터
      setApplications([
        {
          id: '1',
          name: '김철수',
          email: 'kimcs@example.com',
          phone: '010-1234-5678',
          qaExperience: '삼성전자에서 5년간 QA 엔지니어로 근무했습니다.',
          expertise: ['웹 테스팅', '자동화 테스팅', 'CI/CD'],
          sessionPrice: 50000,
          bio: 'QA 자동화 전문가입니다.',
          verificationMethod: 'businessCard',
          businessCardUrl: '/sample-business-card.jpg',
          status: 'pending',
          appliedAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id: string, approved: boolean) => {
    try {
      const response = await api.post(`/api/admin/mentor-applications/${id}/review`, {
        approved
      });

      if (response.status === 200) {
        fetchApplications();
        setSelectedApplication(null);
      }
    } catch (error) {
      console.error('Failed to update application:', error);
      alert('처리 중 오류가 발생했습니다.');
    }
  };

  const filteredApplications = applications.filter(app => 
    filter === 'all' || app.status === filter
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 신청 목록 */}
      <div className="w-1/3 bg-white border-r overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold mb-4">멘토 승인 관리</h2>
          
          <div className="flex space-x-2">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  filter === status 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' && '전체'}
                {status === 'pending' && '대기중'}
                {status === 'approved' && '승인'}
                {status === 'rejected' && '거절'}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y">
          {filteredApplications.map((app) => (
            <div
              key={app.id}
              onClick={() => setSelectedApplication(app)}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${
                selectedApplication?.id === app.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{app.name}</h3>
                <span className={`px-2 py-1 text-xs rounded ${
                  app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  app.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {app.status === 'pending' && '대기중'}
                  {app.status === 'approved' && '승인됨'}
                  {app.status === 'rejected' && '거절됨'}
                </span>
              </div>
              <p className="text-sm text-gray-600">{app.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                신청일: {new Date(app.appliedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="flex-1 overflow-y-auto">
        {selectedApplication ? (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-2xl font-bold mb-6">{selectedApplication.name}</h3>
              
              {/* 기본 정보 */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">기본 정보</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">이메일</p>
                    <p className="font-medium">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">연락처</p>
                    <p className="font-medium">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">세션 가격</p>
                    <p className="font-medium">{selectedApplication.sessionPrice.toLocaleString()}원</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">플랫폼 수수료 (20%)</p>
                    <p className="font-medium">{(selectedApplication.sessionPrice * 0.2).toLocaleString()}원</p>
                  </div>
                </div>
              </div>

              {/* QA 경력 */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">QA 경력</h4>
                <p className="whitespace-pre-wrap bg-gray-50 p-4 rounded">
                  {selectedApplication.qaExperience}
                </p>
              </div>

              {/* 전문 분야 */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">전문 분야</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedApplication.expertise.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* 자기소개 */}
              {selectedApplication.bio && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">자기소개</h4>
                  <p className="whitespace-pre-wrap bg-gray-50 p-4 rounded">
                    {selectedApplication.bio}
                  </p>
                </div>
              )}

              {/* 신원 확인 */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">신원 확인</h4>
                <div className="bg-gray-50 p-4 rounded">
                  {selectedApplication.verificationMethod === 'businessCard' ? (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">명함 이미지</p>
                      {selectedApplication.businessCardUrl && (
                        <div className="space-y-2">
                          <img
                            src={selectedApplication.businessCardUrl}
                            alt="Business Card"
                            className="max-w-md rounded border"
                          />
                          <a
                            href={selectedApplication.businessCardUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            원본 다운로드
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">LinkedIn 프로필</p>
                      <a
                        href={selectedApplication.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        {selectedApplication.linkedinUrl}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* 승인/거절 버튼 */}
              {selectedApplication.status === 'pending' && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleApproval(selectedApplication.id, true)}
                    className="flex-1 flex items-center justify-center py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Check className="w-5 h-5 mr-2" />
                    승인
                  </button>
                  <button
                    onClick={() => handleApproval(selectedApplication.id, false)}
                    className="flex-1 flex items-center justify-center py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <X className="w-5 h-5 mr-2" />
                    거절
                  </button>
                </div>
              )}

              {/* 처리 정보 */}
              {selectedApplication.status !== 'pending' && selectedApplication.reviewedAt && (
                <div className="mt-6 p-4 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">
                    {selectedApplication.status === 'approved' ? '승인' : '거절'} 처리일: {' '}
                    {new Date(selectedApplication.reviewedAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            좌측에서 신청서를 선택해주세요
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorApprovalPage;