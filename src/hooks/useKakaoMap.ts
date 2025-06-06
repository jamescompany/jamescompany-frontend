// src/hooks/useKakaoMap.ts

import { useEffect, useState } from 'react';
import { loadKakaoMapScript } from '../utils/kakaoMapLoader';

export const useKakaoMap = (apiKey: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadKakaoMapScript(apiKey)
      .then(() => {
        setIsLoaded(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [apiKey]);

  return { isLoaded, isLoading, error };
};