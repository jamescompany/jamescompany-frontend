// src/data/policies/marketing/index.ts

import { marketingV100 } from './v1.0.0';
import { marketingV200 } from './v2.0.0';
import { marketingV201 } from './v2.0.1';

export const marketingVersions = {
  'v1.0.0': marketingV100,
  'v2.0.0': marketingV200,
  'v2.0.1': marketingV201
} as const;

export const currentMarketing = marketingV201;

export const getLatestMarketing = () => marketingV201;

export const getMarketingByVersion = (version: string) => {
  return marketingVersions[version as keyof typeof marketingVersions] || null;
};

export const getMarketingHistory = () => {
  return Object.entries(marketingVersions).map(([version, data]) => ({
    version,
    date: data.date,
    changes: data.changes
  }));
};