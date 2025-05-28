// src/data/policies/privacy/index.ts

import { marketingV100 } from './v1.0.0'
import { marketingV200 } from './v2.0.0'

export interface MarketingVersion {
  version: string
  date: string
  changes: string[]
  content: string
}

// 모든 버전을 배열로 관리
export const marketingVersions: MarketingVersion[] = [
  marketingV100,
  marketingV200,
]

// 최신 버전 가져오기
export const getLatestMarketing = (): MarketingVersion => {
  return marketingVersions.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0]
}

// 특정 버전 가져오기
export const getMarketingByVersion = (version: string): MarketingVersion | undefined => {
  return marketingVersions.find(marketing => marketing.version === version)
}

// 버전 히스토리 가져오기
export const getMarketingHistory = () => {
  return marketingVersions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(marketing => ({
      version: marketing.version,
      date: marketing.date,
      changes: marketing.changes
    }))
}

// 마케팅 비교 (이전 버전과 현재 버전 비교)
export const compareMarketingVersions = (oldVersion: string, newVersion: string) => {
  const oldMarketing = getMarketingByVersion(oldVersion)
  const newMarketing = getMarketingByVersion(newVersion)
  
  if (!oldMarketing || !newMarketing) {
    return null
  }
  
  return {
    old: {
      version: oldMarketing.version,
      date: oldMarketing.date
    },
    new: {
      version: newMarketing.version,
      date: newMarketing.date,
      changes: newMarketing.changes
    }
  }
}