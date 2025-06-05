// src/components/recruitment/JobDetailModal.tsx

import { X, Building, MapPin, Calendar, DollarSign, Users, Wrench, Award, ExternalLink, Mail, Clock } from 'lucide-react';
import type { JobPosting } from '../../types/recruitment';

interface JobDetailModalProps {
  job: JobPosting;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailModal = ({ job, isOpen, onClose }: JobDetailModalProps) => {
  if (!isOpen) return null;

  const formatSalary = (min: number, max: number) => {
    return `${(min / 10000).toFixed(0)}억 ${(min % 10000).toFixed(0).padStart(4, '0')}만원 ~ ${(max / 10000).toFixed(0)}억 ${(max % 10000).toFixed(0).padStart(4, '0')}만원`;
  };

  const getWorkTypeLabel = (type: string) => {
    const labels = {
      onsite: '사무실 근무',
      remote: '재택근무',
      hybrid: '하이브리드'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const daysRemaining = Math.ceil((new Date(job.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <div className="relative inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-bold text-gray-900">{job.position}</h2>
                {job.isCertified && (
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span>QA 인증</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  <span className="font-medium">{job.companyName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{getWorkTypeLabel(job.workType)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {daysRemaining > 0 ? `D-${daysRemaining}` : '마감'}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">포지션 소개</h3>
              <p className="text-gray-700">{job.summary}</p>
            </div>

            {/* James Note */}
            {job.jamesNote && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  💡 제임스의 한마디
                </h4>
                <p className="text-blue-800">{job.jamesNote}</p>
              </div>
            )}

            {/* Main Tasks */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">주요 업무</h3>
              <ul className="space-y-2">
                {job.mainTasks.map((task, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-700">{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools & Tech Stack */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                사용 도구 및 기술 스택
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.tools.map((tool, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Team Structure */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Users className="w-5 h-5" />
                조직 구조
              </h3>
              <p className="text-gray-700">{job.teamStructure}</p>
            </div>

            {/* Preferred Qualifications */}
            {job.preferredQualifications && job.preferredQualifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">우대사항</h3>
                <ul className="space-y-2">
                  {job.preferredQualifications.map((qual, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Salary & Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  연봉
                </h3>
                <p className="text-xl font-bold text-gray-900">
                  {formatSalary(job.salaryRange.min, job.salaryRange.max)}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">복지 및 혜택</h3>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((benefit, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Application */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">지원 방법</h3>
              {job.applicationMethod.type === 'url' ? (
                <a
                  href={job.applicationMethod.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  지원하기
                </a>
              ) : (
                <a
                  href={`mailto:${job.applicationMethod.value}`}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  이메일로 지원하기
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;