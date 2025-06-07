// src/features/auth/components/RememberMeModal.tsx

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from '../../../shared/component/ui/Button';

interface RememberMeModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const RememberMeModal: React.FC<RememberMeModalProps> = ({ 
  isOpen, 
  onConfirm, 
  onCancel 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <div className="flex items-center mb-4">
          <div className="bg-yellow-100 rounded-full p-2 mr-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold">로그인 상태 유지 주의사항</h3>
        </div>
        
        <div className="space-y-3 mb-6">
          <p className="text-gray-700">
            브라우저를 닫더라도 로그인이 계속 유지될 수 있습니다.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 font-medium mb-2">
              다음과 같은 경우에는 사용을 권장하지 않습니다:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>공공장소의 컴퓨터 (PC방, 도서관, 학교 등)</li>
              <li>타인과 함께 사용하는 기기</li>
              <li>회사나 공용 컴퓨터</li>
            </ul>
          </div>
          <p className="text-sm text-gray-500">
            개인정보 보호를 위해 공용 컴퓨터에서는 사용이 끝나면 반드시 로그아웃해 주세요.
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1"
          >
            취소
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1"
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RememberMeModal;