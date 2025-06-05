// src/data/policies/privacy/index.ts

import { privacyV100 } from './v1.0.0';
import { privacyV200 } from './v2.0.0';
import { privacyV201 } from './v2.0.1';

export const privacyVersions = {
  'v1.0.0': privacyV100,
  'v2.0.0': privacyV200,
  'v2.0.1': privacyV201
} as const;

export const currentPrivacy = privacyV201;

export const getLatestPrivacy = () => privacyV201;

export const getPrivacyByVersion = (version: string) => {
  return privacyVersions[version as keyof typeof privacyVersions] || null;
};

export const getPrivacyHistory = () => {
  return Object.entries(privacyVersions).map(([version, data]) => ({
    version,
    date: data.date,
    changes: data.changes
  }));
};