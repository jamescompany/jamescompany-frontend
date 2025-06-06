// src/pages/services/recruitment/RecruitmentPost.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload,
  Check,
  Info,
  Sparkles,
  Plus,
  X,
  Users,
  Monitor,
  Server,
  Briefcase,
  Shield,
  Code,
  Cloud,
  Bug,
  UserCheck
} from 'lucide-react';
import { sendCompanyEmail } from '../../../services/companyEmailService';
import { recruitmentAPI } from '../../../api/recruitment';

interface TeamMember {
  role: string;
  count: number;
  icon: React.ReactNode;
}

interface FormData {
  // 기본 정보
  companyName: string;
  contactName: string;
  contactEmail: string;
  companyIntro: string;
  
  // 채용 정보 (구조화된 데이터)
  position: string;
  mainTasks: string[];
  preferredQualifications: string[];
  tools: string[];
  teamMembers: TeamMember[];
  
  // 급여 및 복지 (구조화된 데이터)
  salaryMin: string;
  salaryMax: string;
  benefits: string[];
  
  // 근무 정보
  workType: 'onsite' | 'remote' | 'hybrid';
  location: string;
  
  // 지원 방법
  applicationUrl: string;
  applicationEmail: string;
  
  // 게시 옵션
  packageType: 'basic' | 'standard' | 'premium';
  postingDuration: string;
  includeCelebrationBonus: boolean;
  
  // 기타
  uploadMethod: 'form' | 'word' | 'googledocs';
  uploadUrl: string;
  memo: string;
}

const packages = [
  {
    type: 'basic' as const,
    name: '기본형',
    price: '₩50,000',
    features: [
      'QA 전문 포맷 적용',
      '슬랙/뉴스레터 노출',
      '기본 통계 제공'
    ]
  },
  {
    type: 'standard' as const,
    name: '스탠다드형',
    price: '₩100,000',
    features: [
      '기본형 혜택 모두 포함',
      '뉴스레터 상단 노출',
      '성과형 축하금 적용 가능',
      '상세 통계 리포트'
    ],
    popular: true
  },
  {
    type: 'premium' as const,
    name: '프리미엄형',
    price: '₩350,000',
    features: [
      '스탠다드형 혜택 모두 포함',
      '메인 페이지 상단 고정',
      '추천 공고 섹션 포함',
      '합격 축하금 기본 포함',
      '전담 매니저 지원'
    ]
  }
];

const teamRoles = [
  { role: 'QA', icon: <Bug className="w-5 h-5" /> },
  { role: '프론트엔드', icon: <Monitor className="w-5 h-5" /> },
  { role: '백엔드', icon: <Server className="w-5 h-5" /> },
  { role: 'PO', icon: <UserCheck className="w-5 h-5" /> },
  { role: 'PM', icon: <Briefcase className="w-5 h-5" /> },
  { role: 'DevOps', icon: <Cloud className="w-5 h-5" /> },
  { role: '보안', icon: <Shield className="w-5 h-5" /> },
  { role: '개발', icon: <Code className="w-5 h-5" /> },
  { role: '기타', icon: <Users className="w-5 h-5" /> }
];

const RecruitmentPost = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    contactEmail: '',
    companyIntro: '',
    position: '',
    mainTasks: [''],
    preferredQualifications: [''],
    tools: [''],
    teamMembers: [],
    salaryMin: '',
    salaryMax: '',
    benefits: [''],
    workType: 'onsite',
    location: '',
    applicationUrl: '',
    applicationEmail: '',
    packageType: 'standard',
    postingDuration: '30',
    includeCelebrationBonus: false,
    uploadMethod: 'form',
    uploadUrl: '',
    memo: ''
  });

  const totalSteps = 5;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // 배열 항목 추가
  const addArrayItem = (field: 'mainTasks' | 'preferredQualifications' | 'tools' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  // 배열 항목 제거
  const removeArrayItem = (field: 'mainTasks' | 'preferredQualifications' | 'tools' | 'benefits', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // 배열 항목 업데이트
  const updateArrayItem = (field: 'mainTasks' | 'preferredQualifications' | 'tools' | 'benefits', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  // 팀 멤버 추가/제거
  const toggleTeamMember = (role: string, icon: React.ReactNode) => {
    setFormData(prev => {
      const existing = prev.teamMembers.find(tm => tm.role === role);
      if (existing) {
        return {
          ...prev,
          teamMembers: prev.teamMembers.filter(tm => tm.role !== role)
        };
      } else {
        return {
          ...prev,
          teamMembers: [...prev.teamMembers, { role, count: 1, icon }]
        };
      }
    });
  };

  // 팀 멤버 수 업데이트
  const updateTeamMemberCount = (role: string, count: number) => {
    if (count < 1) return;
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map(tm => 
        tm.role === role ? { ...tm, count } : tm
      )
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. 채용공고 데이터 저장
      const response = await recruitmentAPI.postJob({
        ...formData,
        status: 'pending', // 검토 대기 상태
      });
      
      const { jobId, managementToken } = response;
      
      // 2. 접수 확인 이메일 발송 (백엔드에서 처리)
      await sendCompanyEmail('applicationReceived', {
        companyName: formData.companyName,
        contactEmail: formData.contactEmail,
        position: formData.position,
        managementToken,
        status: 'pending'
      });
      
      // 3. 완료 페이지로 이동
      navigate('/services/recruitment/post/complete', {
        state: { jobId, email: formData.contactEmail }
      });
      
    } catch (error) {
      console.error('채용공고 등록 실패:', error);
      alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">기본 정보</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                회사명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="예: 테크스타트업 A"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  담당자명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="홍길동"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  담당자 이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="hr@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                회사 소개 (100자 이내)
              </label>
              <textarea
                name="companyIntro"
                value={formData.companyIntro}
                onChange={handleInputChange}
                rows={3}
                maxLength={100}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="우리 회사를 간단히 소개해주세요"
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.companyIntro.length}/100
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">채용 정보</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                채용 포지션명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="예: QA 자동화 엔지니어"
                required
              />
            </div>

            {/* 주요 업무 - 개별 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                주요 업무 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {formData.mainTasks.map((task, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={task}
                      onChange={(e) => updateArrayItem('mainTasks', index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="예: 테스트 시나리오 작성 및 테스트 케이스 운영"
                    />
                    {formData.mainTasks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('mainTasks', index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('mainTasks')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-5 h-5" />
                  <span>업무 추가</span>
                </button>
              </div>
            </div>

            {/* 사용 도구/기술 스택 - 개별 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사용 도구/기술 스택 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {formData.tools.map((tool, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={tool}
                      onChange={(e) => updateArrayItem('tools', index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="예: Playwright"
                    />
                    {formData.tools.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('tools', index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('tools')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-5 h-5" />
                  <span>도구 추가</span>
                </button>
              </div>
            </div>

            {/* 조직 구조 - 버튼식 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                조직 구조 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {teamRoles.map(({ role, icon }) => {
                  const isSelected = formData.teamMembers.some(tm => tm.role === role);
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => toggleTeamMember(role, icon)}
                      className={`
                        flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all
                        ${isSelected
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                        }
                      `}
                    >
                      {icon}
                      <span>{role}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* 선택된 팀의 인원수 설정 */}
              {formData.teamMembers.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">각 팀 인원수 설정</h4>
                  {formData.teamMembers.map(({ role, count, icon }) => (
                    <div key={role} className="flex items-center gap-3">
                      <div className="flex items-center gap-2 flex-1">
                        {icon}
                        <span className="font-medium">{role}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateTeamMemberCount(role, count - 1)}
                          className="w-8 h-8 rounded-lg bg-white border hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-medium">{count}명</span>
                        <button
                          type="button"
                          onClick={() => updateTeamMemberCount(role, count + 1)}
                          className="w-8 h-8 rounded-lg bg-white border hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 우대사항 - 개별 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                우대사항
              </label>
              <div className="space-y-3">
                {formData.preferredQualifications.map((qual, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={qual}
                      onChange={(e) => updateArrayItem('preferredQualifications', index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="예: API 테스트 자동화 경험"
                    />
                    {formData.preferredQualifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('preferredQualifications', index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('preferredQualifications')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-5 h-5" />
                  <span>우대사항 추가</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">급여 및 근무 조건</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                연봉 범위 (만원) <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="최소 (예: 4800)"
                  required
                />
                <input
                  type="number"
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="최대 (예: 6000)"
                  required
                />
              </div>
            </div>

            {/* 복지 및 혜택 - 개별 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                복지 및 혜택
              </label>
              <div className="space-y-3">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => updateArrayItem('benefits', index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="예: 리모트 근무"
                    />
                    {formData.benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('benefits', index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('benefits')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-5 h-5" />
                  <span>혜택 추가</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                근무 형태 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'onsite', label: '사무실 근무' },
                  { value: 'remote', label: '재택 근무' },
                  { value: 'hybrid', label: '하이브리드' }
                ].map(option => (
                  <label
                    key={option.value}
                    className={`
                      flex items-center justify-center px-4 py-3 rounded-lg border-2 cursor-pointer transition-all
                      ${formData.workType === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="workType"
                      value={option.value}
                      checked={formData.workType === option.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                근무지 위치 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="예: 서울 강남구 테헤란로 142"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                지원 방법
              </label>
              <div className="space-y-3">
                <input
                  type="url"
                  name="applicationUrl"
                  value={formData.applicationUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="지원 URL (선택)"
                />
                <input
                  type="email"
                  name="applicationEmail"
                  value={formData.applicationEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="지원 이메일 (선택)"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">게시 옵션 선택</h2>
            
            <div className="space-y-4">
              {packages.map(pkg => (
                <label
                  key={pkg.type}
                  className={`
                    relative block p-6 rounded-lg border-2 cursor-pointer transition-all
                    ${formData.packageType === pkg.type
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="packageType"
                    value={pkg.type}
                    checked={formData.packageType === pkg.type}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  
                  {pkg.popular && (
                    <span className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      인기
                    </span>
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{pkg.price}</p>
                      <ul className="mt-4 space-y-2">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                게시 기간
              </label>
              <select
                name="postingDuration"
                value={formData.postingDuration}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="30">30일</option>
                <option value="60">60일</option>
                <option value="90">90일</option>
              </select>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="includeCelebrationBonus"
                  checked={formData.includeCelebrationBonus}
                  onChange={handleInputChange}
                  className="mt-1"
                />
                <div>
                  <span className="font-medium text-gray-900">합격 축하금 포함</span>
                  <p className="text-sm text-gray-600 mt-1">
                    채용 성공 시 ₩30,000~₩50,000의 축하금을 지급합니다 (프리미엄형은 기본 포함)
                  </p>
                </div>
              </label>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">추가 정보</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                JD 업로드 방식
              </label>
              <div className="space-y-3">
                {[
                  { value: 'form', label: '폼 입력 (위에서 입력한 내용 사용)' },
                  { value: 'word', label: 'Word 파일 업로드' },
                  { value: 'googledocs', label: 'Google Docs 링크' }
                ].map(option => (
                  <label
                    key={option.value}
                    className={`
                      flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all
                      ${formData.uploadMethod === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="uploadMethod"
                      value={option.value}
                      checked={formData.uploadMethod === option.value}
                      onChange={handleInputChange}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            {formData.uploadMethod !== 'form' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.uploadMethod === 'word' ? 'Word 파일 업로드' : 'Google Docs 링크'}
                </label>
                {formData.uploadMethod === 'word' ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">클릭하여 파일 업로드</p>
                    <p className="text-sm text-gray-500 mt-1">DOC, DOCX 파일만 가능</p>
                  </div>
                ) : (
                  <input
                    type="url"
                    name="uploadUrl"
                    value={formData.uploadUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://docs.google.com/document/..."
                  />
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                메모 (선택)
              </label>
              <textarea
                name="memo"
                value={formData.memo}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="추가로 전달하고 싶은 내용이 있다면 입력해주세요"
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-amber-800">
                    모든 공고는 내부 기준에 따라 게시 여부가 결정됩니다. 
                    선정된 공고는 제임스컴퍼니 QA 포맷으로 정제되어 소개됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>뒤로가기</span>
            </button>
            
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span className="font-semibold">채용공고 등록</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {currentStep}단계 / {totalSteps}단계
            </span>
            <span className="text-sm text-gray-600">
              {Math.round((currentStep / totalSteps) * 100)}% 완료
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-8 border-t">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all
                ${currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              이전
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                다음
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                }`}
              >
                {isSubmitting ? '제출 중...' : '제출하기'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecruitmentPost;