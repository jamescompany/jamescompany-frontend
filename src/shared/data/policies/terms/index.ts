// src/data/policies/terms/index.ts

import { termsV100 } from './v1.0.0';
import { termsV200 } from './v2.0.0';
import { termsV201 } from './v2.0.1';

export const termsVersions = {
  'v1.0.0': termsV100,
  'v2.0.0': termsV200,
  'v2.0.1': termsV201
} as const;

export const currentTerms = termsV201;

export const getLatestTerms = () => termsV201;

export const getTermsByVersion = (version: string) => {
  return termsVersions[version as keyof typeof termsVersions] || null;
};

export const getTermsHistory = () => {
  return Object.entries(termsVersions).map(([version, data]) => ({
    version,
    date: data.date,
    changes: data.changes
  }));
};