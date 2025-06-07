// src/features/external-services/components/ServiceTransitionModal.tsx

import React, { useState } from 'react';
import { X, AlertCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceTransitionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServiceTransitionModal: React.FC<ServiceTransitionModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleClose = () => {
    if (dontShowAgain) {
      // Note: Since we can't use localStorage in this environment,
      // the modal will reappear on page refresh
      onClose();
    } else {
      onClose();
    }
  };

  const handleSignupClick = () => {
    navigate('/auth/signup');
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">중요 공지사항</h2>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">
              JamesCompany 서비스가 새롭게 시작됩니다!
            </h3>
            
            <div className="space-y-2 text-gray-600">
              <p className="leading-relaxed">
                안녕하세요, JamesCompany를 이용해 주시는 고객님들께 감사드립니다.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                <p className="font-medium text-blue-900">
                  📌 imweb 서비스 계약 종료 예정 안내
                </p>
                <p className="text-sm text-blue-800">
                  imweb과의 서비스 계약 종료를 앞두고, 안정적인 서비스 전환을 위해 
                  사전에 모든 imweb 계정 정보를 안전하게 삭제하고 
                  JamesCompany 자체 계정 시스템으로 전환하게 되었습니다.
                </p>
              </div>

              <p className="leading-relaxed">
                더 나은 서비스 제공을 위해 JamesCompany 자체 계정 시스템으로 
                전환하게 되었습니다. 새로운 계정을 생성하여 다양한 서비스를 
                이용해 보세요!
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p className="font-medium text-gray-900">✨ 새로운 계정으로 이용 가능한 서비스</p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>QA Career Hub - 큐레이션된 채용 정보</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>커피챗 - 구글 캘린더 연동 멘토링</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>CaseMaker - 테스트 케이스 작성 도구</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>QAuto - 자동화 테스트 플랫폼</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>교육 서비스 & Bug Bounty Arena</span>
              </li>
            </ul>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleSignupClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg 
                     flex items-center justify-center space-x-2 transition-colors duration-200"
          >
            <span>새 계정 만들기</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Don't show again checkbox */}
          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="dontShowAgain"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label 
              htmlFor="dontShowAgain" 
              className="text-sm text-gray-600 cursor-pointer select-none"
            >
              일주일간 다시 보지 않기 (현재 세션에서만 유효)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTransitionModal;