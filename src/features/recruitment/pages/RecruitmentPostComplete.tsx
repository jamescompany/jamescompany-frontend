// src/features/recruitment/pages/RecruitmentPostComplete.tsx

import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Mail, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const RecruitmentPostComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { jobId, email, managementToken } = location.state || {};
  const [copied, setCopied] = useState(false);

  const managementUrl = managementToken 
    ? `${window.location.origin}/company/dashboard/${managementToken}`
    : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(managementUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!jobId) {
    navigate('/services/recruitment');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              채용공고가 접수되었습니다!
            </h1>
            
            <p className="text-gray-600">
              검토 후 승인 여부를 이메일로 안내드리겠습니다.
            </p>
          </div>

          <div className="space-y-6">
            {/* 이메일 안내 */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    확인 이메일이 발송되었습니다
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {email}로 채용공고 접수 확인 메일을 발송했습니다.
                    <br />
                    메일함에서 확인해주세요.
                  </p>
                </div>
              </div>
            </div>

            {/* 관리 링크 */}
            {managementToken && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  채용 관리 대시보드 링크
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  아래 링크를 통해 채용공고 현황을 확인하실 수 있습니다.
                </p>
                
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={managementUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {copied ? (
                      <span className="text-green-600 text-sm">복사됨!</span>
                    ) : (
                      <Copy className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* 다음 단계 안내 */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                다음 단계
              </h3>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-semibold">1.</span>
                  <span>제임스컴퍼니 팀이 채용공고를 검토합니다 (1-2일 소요)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-semibold">2.</span>
                  <span>승인 시 채용공고가 게시되며, 관리 링크가 포함된 이메일을 받으실 수 있습니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-semibold">3.</span>
                  <span>지원자가 발생하면 실시간으로 알림을 받으실 수 있습니다</span>
                </li>
              </ol>
            </div>

            {/* 액션 버튼 */}
            <div className="flex gap-3 pt-6">
              <button
                onClick={() => navigate('/services/recruitment')}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                채용공고 목록으로
              </button>
              <button
                onClick={() => navigate('/services/recruitment/post')}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                추가 공고 등록하기
              </button>
            </div>
          </div>
        </div>

        {/* 도움말 */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            문의사항이 있으신가요?{' '}
            <a href="mailto:recruit@jamescompany.kr" className="text-blue-600 hover:underline">
              recruit@jamescompany.kr
            </a>
            로 연락주세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentPostComplete;