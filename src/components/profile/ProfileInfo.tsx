// src/components/profile/ProfileInfo.tsx

import React from 'react';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  created_at: string;
  membership_tier: string;
  is_admin: boolean;
  is_active: boolean;
}

interface ProfileInfoProps {
  profile: UserProfile | null;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">기본 정보</h3>
        {profile ? (
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">이름</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">이메일</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">가입일</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(profile.created_at).toLocaleDateString('ko-KR')}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">멤버십</dt>
              <dd className="mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  profile.membership_tier === 'Pro' ? 'bg-purple-100 text-purple-800' :
                  profile.membership_tier === 'Basic' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {profile.membership_tier || 'Free'}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">계정 유형</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {profile.is_admin ? '관리자' : '일반 사용자'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">계정 상태</dt>
              <dd className="mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  profile.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {profile.is_active ? '활성' : '비활성'}
                </span>
              </dd>
            </div>
          </dl>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">프로필 정보를 불러오는 중...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;