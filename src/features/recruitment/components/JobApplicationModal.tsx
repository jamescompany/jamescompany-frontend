// src/features/recruitment/components/JobApplicationModal.tsx

import { useState } from 'react';
import { X, Upload, FileText, Send, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../auth/stores/authStore';
import type { JobPosting } from '../types/recruitment';

import api from '../../../shared/services/api';

interface JobApplicationModalProps {
  job: JobPosting;
  isOpen: boolean;
  onClose: () => void;
}

interface ApplicationData {
  resumeType: 'upload' | 'existing' | 'profile';
  resumeFile?: File;
  existingResumeId?: string;
  coverLetter: string;
  expectedSalary: string;
  availableDate: string;
  phoneNumber: string;
  portfolioUrl?: string;
  agreedToTracking: boolean;
}

const JobApplicationModal = ({ job, isOpen, onClose }: JobApplicationModalProps) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    resumeType: 'upload',
    coverLetter: '',
    expectedSalary: '',
    availableDate: '',
    phoneNumber: '',
    portfolioUrl: '',
    agreedToTracking: false
  });

  // 기존 이력서 목록 (실제로는 API에서 가져옴)
  const existingResumes = [
    { id: '1', name: '이력서_2025_QA엔지니어.pdf', updatedAt: '2025-01-15' },
    { id: '2', name: '이력서_자동화전문.pdf', updatedAt: '2025-01-10' }
  ];

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
  
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      
      // 이력서 파일 처리
      if (applicationData.resumeType === 'upload' && applicationData.resumeFile) {
        formData.append('resume_file', applicationData.resumeFile);
      }
      
      // 나머지 데이터를 JSON으로
      const applicationPayload = {
        resume_type: applicationData.resumeType,
        existing_resume_id: applicationData.existingResumeId || null,
        cover_letter: applicationData.coverLetter,
        expected_salary: applicationData.expectedSalary,
        available_date: applicationData.availableDate,
        phone_number: applicationData.phoneNumber,
        portfolio_url: applicationData.portfolioUrl || null,
        agreed_to_tracking: applicationData.agreedToTracking,
      };
      
      // 파일이 있으면 FormData로, 없으면 JSON으로 전송
      let response;
      if (applicationData.resumeType === 'upload' && applicationData.resumeFile) {
        // 파일과 함께 전송
        formData.append('data', JSON.stringify(applicationPayload));
        response = await api.post(`/api/v1/recruitments/jobs/${job.id}/apply`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // JSON으로만 전송
        response = await api.post(`/api/v1/recruitments/jobs/${job.id}/apply`, applicationPayload);
      }
      
      // 성공 시
      const { id } = response.data;
      setApplicationId(id);
      setStep(3); // 완료 단계로 이동
      
    } catch (error: any) {
      console.error('Application submission failed:', error);
      alert(error.response?.data?.detail || '지원 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: // 이력서 선택
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">지원서 작성</h3>
              <p className="text-gray-600">
                {job.companyName}의 {job.position} 포지션에 지원합니다
              </p>
            </div>

            {/* 이력서 선택 옵션 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                이력서 선택 <span className="text-red-500">*</span>
              </label>
              
              <div className="space-y-3">
                {/* 새 이력서 업로드 */}
                <label className={`
                  relative block p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${applicationData.resumeType === 'upload' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'}
                `}>
                  <input
                    type="radio"
                    name="resumeType"
                    value="upload"
                    checked={applicationData.resumeType === 'upload'}
                    onChange={(e) => setApplicationData({...applicationData, resumeType: 'upload' as const})}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <Upload className="w-6 h-6 text-gray-600" />
                    <div>
                      <p className="font-medium">새 이력서 업로드</p>
                      <p className="text-sm text-gray-500">PDF, DOC, DOCX (최대 10MB)</p>
                    </div>
                  </div>
                  {applicationData.resumeType === 'upload' && (
                    <div className="mt-4">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setApplicationData({
                          ...applicationData, 
                          resumeFile: e.target.files?.[0]
                        })}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  )}
                </label>

                {/* 기존 이력서 선택 */}
                <label className={`
                  relative block p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${applicationData.resumeType === 'existing' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'}
                `}>
                  <input
                    type="radio"
                    name="resumeType"
                    value="existing"
                    checked={applicationData.resumeType === 'existing'}
                    onChange={(e) => setApplicationData({...applicationData, resumeType: 'existing' as const})}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <FileText className="w-6 h-6 text-gray-600" />
                    <div>
                      <p className="font-medium">기존 이력서 사용</p>
                      <p className="text-sm text-gray-500">이전에 업로드한 이력서 중 선택</p>
                    </div>
                  </div>
                  {applicationData.resumeType === 'existing' && existingResumes.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {existingResumes.map(resume => (
                        <label
                          key={resume.id}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg border hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="existingResumeId"
                            value={resume.id}
                            onChange={(e) => setApplicationData({
                              ...applicationData,
                              existingResumeId: e.target.value
                            })}
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{resume.name}</p>
                            <p className="text-xs text-gray-500">업데이트: {resume.updatedAt}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </label>

                {/* 프로필로 지원 */}
                <label className={`
                  relative block p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${applicationData.resumeType === 'profile' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'}
                `}>
                  <input
                    type="radio"
                    name="resumeType"
                    value="profile"
                    checked={applicationData.resumeType === 'profile'}
                    onChange={(e) => setApplicationData({...applicationData, resumeType: 'profile' as const})}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {user?.name?.[0] || 'J'}
                    </div>
                    <div>
                      <p className="font-medium">제임스 프로필로 지원</p>
                      <p className="text-sm text-gray-500">작성한 프로필 정보로 간편 지원</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* 추가 정보 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={applicationData.phoneNumber}
                  onChange={(e) => setApplicationData({...applicationData, phoneNumber: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="010-1234-5678"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  희망 연봉 (만원)
                </label>
                <input
                  type="text"
                  value={applicationData.expectedSalary}
                  onChange={(e) => setApplicationData({...applicationData, expectedSalary: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="면접 시 협의"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  입사 가능일
                </label>
                <input
                  type="text"
                  value={applicationData.availableDate}
                  onChange={(e) => setApplicationData({...applicationData, availableDate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="즉시 가능 또는 협의 가능"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  포트폴리오 URL (선택)
                </label>
                <input
                  type="url"
                  value={applicationData.portfolioUrl}
                  onChange={(e) => setApplicationData({...applicationData, portfolioUrl: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>

            {/* 지원 추적 동의 */}
            <div className="bg-blue-50 rounded-lg p-6">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={applicationData.agreedToTracking}
                  onChange={(e) => setApplicationData({...applicationData, agreedToTracking: e.target.checked})}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium text-gray-900">제임스컴퍼니 지원 관리 서비스 이용 동의</p>
                  <p className="text-sm text-gray-600 mt-1">
                    지원 현황 추적, 합격/불합격 알림, 면접 일정 관리 등의 서비스를 제공받습니다.
                    제임스컴퍼니를 통한 지원임이 기업에 표시됩니다.
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      실시간 지원 현황 확인
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-blue-500" />
                      면접 일정 알림
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-purple-500" />
                      합격률 통계 제공
                    </span>
                  </div>
                </div>
              </label>
            </div>
          </div>
        );

      case 2: // 자기소개서 작성
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">지원 동기 작성</h3>
              <p className="text-gray-600">
                간단한 지원 동기나 자기소개를 작성해주세요
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                지원 동기 및 자기소개
              </label>
              <textarea
                value={applicationData.coverLetter}
                onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={`안녕하세요, ${job.position} 포지션에 지원하는 [이름]입니다.

저는 [경력/경험]을 통해 [핵심 역량]을 쌓아왔습니다.

특히 귀사의 [관심 포인트]에 매력을 느껴 지원하게 되었습니다.

[추가 어필 포인트]

감사합니다.`}
              />
              <p className="text-sm text-gray-500 mt-1">
                {applicationData.coverLetter.length} / 1000자
              </p>
            </div>

            {/* 지원 정보 요약 */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <h4 className="font-semibold text-gray-900 mb-3">지원 정보 요약</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">회사/포지션</span>
                  <span className="font-medium">{job.companyName} / {job.position}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">이력서</span>
                  <span className="font-medium">
                    {applicationData.resumeType === 'upload' && applicationData.resumeFile?.name}
                    {applicationData.resumeType === 'existing' && '기존 이력서 사용'}
                    {applicationData.resumeType === 'profile' && '제임스 프로필 사용'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">희망 연봉</span>
                  <span className="font-medium">{applicationData.expectedSalary || '협의'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">입사 가능일</span>
                  <span className="font-medium">{applicationData.availableDate || '협의'}</span>
                </div>
              </div>
            </div>

            {/* 제임스컴퍼니 마크 안내 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">제임스컴퍼니 인증 지원</h4>
                  <p className="text-sm text-gray-600">
                    귀하의 지원서는 <span className="font-semibold text-blue-600">제임스컴퍼니 인증 마크</span>와 함께 
                    기업에 전달됩니다. 이는 검증된 QA 전문 플랫폼을 통한 지원임을 나타내며, 
                    기업에게 신뢰도 높은 지원자임을 보여줍니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // 완료
        return (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">지원이 완료되었습니다!</h3>
            <p className="text-gray-600 mb-8">
              지원번호: <span className="font-mono font-semibold">{applicationId}</span>
            </p>

            <div className="bg-gray-50 rounded-lg p-6 text-left max-w-md mx-auto mb-8">
              <h4 className="font-semibold text-gray-900 mb-3">다음 단계</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">1.</span>
                  <span>기업에서 지원서를 검토합니다 (평균 3-5일 소요)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">2.</span>
                  <span>서류 합격 시 이메일 및 SMS로 알림을 받습니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">3.</span>
                  <span>마이페이지에서 실시간 지원 현황을 확인할 수 있습니다</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/mypage/applications')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                지원 현황 보기
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
              >
                닫기
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="fixed inset-x-4 top-[50%] transform -translate-y-[50%] md:inset-x-auto md:left-[50%] md:-translate-x-[50%] max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <Send className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold">지원하기</h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress */}
          {step < 3 && (
            <div className="px-6 py-3 bg-gray-50 border-b">
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-white'
                  }`}>1</div>
                  <span className="text-sm font-medium">이력서 선택</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-300">
                  <div className={`h-full bg-blue-600 transition-all duration-300 ${
                    step >= 2 ? 'w-full' : 'w-0'
                  }`} />
                </div>
                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-white'
                  }`}>2</div>
                  <span className="text-sm font-medium">지원 동기</span>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="p-6">
              {renderStep()}
            </div>
          </div>

          {/* Footer */}
          {step < 3 && (
            <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-between">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
                >
                  이전
                </button>
              )}
              
              <button
                onClick={() => {
                  if (step === 1) {
                    setStep(2);
                  } else if (step === 2) {
                    handleSubmit();
                  }
                }}
                disabled={isSubmitting || !applicationData.agreedToTracking}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  isSubmitting || !applicationData.agreedToTracking
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                } ${step === 1 ? 'ml-auto' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    지원 중...
                  </span>
                ) : step === 1 ? '다음' : '지원하기'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationModal;