// src/data/policies.ts

import { currentTerms, termsVersions } from './policies/terms';
import { currentPrivacy, privacyVersions } from './policies/privacy';
import { currentMarketing, marketingVersions } from './policies/marketing';

export const policies = {
  terms: {
    current: currentTerms,
    versions: termsVersions,
    title: '이용약관'
  },
  privacy: {
    current: currentPrivacy,
    versions: privacyVersions,
    title: '개인정보처리방침'
  },
  marketing: {
    current: currentMarketing,
    versions: marketingVersions,
    title: '마케팅 정보 수신 동의'
  }
};

export const getPolicyByTypeAndVersion = (type: keyof typeof policies, version: string) => {
  const policy = policies[type];
  if (!policy || !policy.versions[version as keyof typeof policy.versions]) {
    return null;
  }
  return policy.versions[version as keyof typeof policy.versions];
};

export const getCurrentPolicyByType = (type: keyof typeof policies) => {
  const policy = policies[type];
  if (!policy) {
    return null;
  }
  return policy.current;
};