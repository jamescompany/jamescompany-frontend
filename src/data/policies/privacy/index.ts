// src/data/policies/privacy/index.ts

import { privacyV100 } from './v1.0.0'
import { privacyV200 } from './v2.0.0'

export interface PrivacyVersion {
  version: string
  date: string
  changes: string[]
  content: string
}

// 모든 버전을 배열로 관리
export const privacyVersions: PrivacyVersion[] = [
  privacyV100,
  privacyV200,
]

// 최신 버전 가져오기
export const getLatestPrivacy = (): PrivacyVersion => {
  return privacyVersions.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0]
}

// 특정 버전 가져오기
export const getPrivacyByVersion = (version: string): PrivacyVersion | undefined => {
  return privacyVersions.find(privacy => privacy.version === version)
}

// 버전 히스토리 가져오기
export const getPrivacyHistory = () => {
  return privacyVersions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(privacy => ({
      version: privacy.version,
      date: privacy.date,
      changes: privacy.changes
    }))
}

// 개인정보처리방침 비교 (이전 버전과 현재 버전 비교)
export const comparePrivacyVersions = (oldVersion: string, newVersion: string) => {
  const oldPrivacy = getPrivacyByVersion(oldVersion)
  const newPrivacy = getPrivacyByVersion(newVersion)
  
  if (!oldPrivacy || !newPrivacy) {
    return null
  }
  
  return {
    old: {
      version: oldPrivacy.version,
      date: oldPrivacy.date
    },
    new: {
      version: newPrivacy.version,
      date: newPrivacy.date,
      changes: newPrivacy.changes
    }
  }
}