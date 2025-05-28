// src/data/policies/terms/index.ts

import { termsV100 } from './v1.0.0'
import { termsV200 } from './v2.0.0'

export interface TermsVersion {
  version: string
  date: string
  changes: string[]
  content: string
}

// 모든 버전을 배열로 관리
export const termsVersions: TermsVersion[] = [
  termsV100,
  termsV200,
]

// 최신 버전 가져오기
export const getLatestTerms = (): TermsVersion => {
  return termsVersions.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0]
}

// 특정 버전 가져오기
export const getTermsByVersion = (version: string): TermsVersion | undefined => {
  return termsVersions.find(terms => terms.version === version)
}

// 버전 히스토리 가져오기
export const getTermsHistory = () => {
  return termsVersions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(terms => ({
      version: terms.version,
      date: terms.date,
      changes: terms.changes
    }))
}