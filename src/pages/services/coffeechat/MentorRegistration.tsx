// src/pages/services/coffeechat/MentorRegistration.tsx

import React, { useState } from 'react';
import { Upload, LinkedinIcon, CreditCard, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

interface MentorRegistrationData {
  name: string;
  email: string;
  phone: string;
  qaExperience: string;
  expertise: string[];
  sessionPrice: number;
  bio: string;
  verificationMethod: 'businessCard' | 'linkedin';
  linkedinUrl?: string;
  businessCardFile?: File;
}

const MentorRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof MentorRegistrationData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<MentorRegistrationData>({
    name: '',
    email: '',
    phone: '',
    qaExperience: '',
    expertise: [],
    sessionPrice: 30000,
    bio: '',
    verificationMethod: 'businessCard',
    linkedinUrl: ''
  });

  const qaExpertiseOptions = [
    '웹 테스팅',
    '모바일 테스팅',
    '자동화 테스팅',
    'API 테스팅',
    '성능 테스팅',
    '보안 테스팅',
    'SDET',
    'QA 리더십',
    '테스트 전략',
    'CI/CD'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof MentorRegistrationData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleExpertiseChange = (expertise: string) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.includes(expertise)
        ? prev.expertise.filter(e => e !== expertise)
        : [...prev.expertise, expertise]
    }));
    if (errors.expertise) {
      setErrors(prev => ({ ...prev, expertise: '' }));
    }
  };

  const handleVerificationMethodChange = (method: 'businessCard' | 'linkedin') => {
    setFormData(prev => ({ ...prev, verificationMethod: method }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof MentorRegistrationData, string>> = {};
    
    if (!formData.name.trim()) newErrors.name = '이름을 입력해주세요';
    if (!formData.email.trim()) newErrors.email = '이메일을 입력해주세요';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = '올바른 이메일 형식이 아닙니다';
    if (!formData.phone.trim()) newErrors.phone = '연락처를 입력해주세요';
    if (!formData.qaExperience.trim()) newErrors.qaExperience = 'QA 경력을 입력해주세요';
    if (formData.expertise.length === 0) newErrors.expertise = '최소 하나 이상 선택해주세요';
    if (formData.sessionPrice < 10000) newErrors.sessionPrice = '최소 10,000원 이상으로 설정해주세요';
    
    if (formData.verificationMethod === 'linkedin' && !formData.linkedinUrl?.trim()) {
      newErrors.linkedinUrl = 'LinkedIn URL을 입력해주세요';
    }
    
    if (formData.verificationMethod === 'businessCard' && !uploadedFile) {
      newErrors.businessCardFile = '명함 이미지를 업로드해주세요';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'expertise') {
        submitData.append(key, JSON.stringify(value));
      } else if (key !== 'businessCardFile' && value) {
        submitData.append(key, value.toString());
      }
    });
    
    if (uploadedFile) {
      submitData.append('businessCardFile', uploadedFile);
    }

    try {
      const response = await api.post('/api/mentors/register', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      if (response.status === 200) {
        alert('멘토 등록 신청이 완료되었습니다. 승인 결과는 이메일로 안내드립니다.');
        navigate('/services/coffee-chat');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">QA 멘토 등록 신청</h2>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg flex items-start">
          <Info className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">등록 조건</p>
            <ul className="list-disc list-inside space-y-1">
              <li>QA/테스팅 분야 실무 경력 2년 이상</li>
              <li>명함 또는 LinkedIn 프로필을 통한 신원 확인 필수</li>
              <li>제출된 정보는 승인 목적으로만 사용되며 외부에 공개되지 않습니다</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">기본 정보</h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">이름 *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">이메일 *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">연락처 *</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="010-0000-0000"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* 전문 분야 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">전문 분야</h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">QA 경력 *</label>
              <textarea
                name="qaExperience"
                value={formData.qaExperience}
                onChange={handleInputChange}
                rows={3}
                placeholder="주요 경력사항과 프로젝트 경험을 간단히 작성해주세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.qaExperience && <p className="text-red-500 text-sm mt-1">{errors.qaExperience}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">전문 분야 선택 * (복수 선택 가능)</label>
              <div className="grid grid-cols-2 gap-3">
                {qaExpertiseOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.expertise.includes(option)}
                      onChange={() => handleExpertiseChange(option)}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
              {errors.expertise && <p className="text-red-500 text-sm mt-1">{errors.expertise}</p>}
            </div>
          </div>

          {/* 신원 확인 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">신원 확인</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">확인 방법 선택 *</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={formData.verificationMethod === 'businessCard'}
                    onChange={() => handleVerificationMethodChange('businessCard')}
                  />
                  <CreditCard className="w-4 h-4" />
                  <span>명함 업로드</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={formData.verificationMethod === 'linkedin'}
                    onChange={() => handleVerificationMethodChange('linkedin')}
                  />
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn 프로필</span>
                </label>
              </div>
            </div>

            {formData.verificationMethod === 'businessCard' && (
              <div>
                <label className="block text-sm font-medium mb-1">명함 이미지 업로드 *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setUploadedFile(e.target.files?.[0] || null);
                      if (errors.businessCardFile) {
                        setErrors(prev => ({ ...prev, businessCardFile: '' }));
                      }
                    }}
                    className="hidden"
                    id="businessCard"
                  />
                  <label htmlFor="businessCard" className="cursor-pointer text-blue-600 hover:text-blue-800">
                    클릭하여 명함 이미지 선택
                  </label>
                  {uploadedFile && <p className="mt-2 text-sm text-gray-600">{uploadedFile.name}</p>}
                </div>
                {errors.businessCardFile && <p className="text-red-500 text-sm mt-1">{errors.businessCardFile}</p>}
              </div>
            )}

            {formData.verificationMethod === 'linkedin' && (
              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn 프로필 URL *</label>
                <input
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  placeholder="https://www.linkedin.com/in/your-profile"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.linkedinUrl && <p className="text-red-500 text-sm mt-1">{errors.linkedinUrl}</p>}
              </div>
            )}
          </div>

          {/* 커피챗 정보 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">커피챗 정보</h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">세션당 가격 (원) *</label>
              <input
                type="number"
                name="sessionPrice"
                value={formData.sessionPrice}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  setFormData(prev => ({ ...prev, sessionPrice: value }));
                  if (errors.sessionPrice && value >= 10000) {
                    setErrors(prev => ({ ...prev, sessionPrice: '' }));
                  }
                }}
                placeholder="30000"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.sessionPrice && <p className="text-red-500 text-sm mt-1">{errors.sessionPrice}</p>}
              <p className="text-sm text-gray-600 mt-1">* 플랫폼 수수료 20%가 차감됩니다</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">자기소개</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                placeholder="멘티들에게 보여질 자기소개를 작성해주세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '처리 중...' : '멘토 등록 신청하기'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MentorRegistration;