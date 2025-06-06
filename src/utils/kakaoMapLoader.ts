// src/utils/kakaoMapLoader.ts

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapLoaderOptions {
  libraries?: string[];
  timeout?: number;
}

const DEFAULT_LIBRARIES = ['services', 'clusterer', 'drawing'];
const DEFAULT_TIMEOUT = 10000;

export const loadKakaoMapScript = (
  apiKey: string, 
  options: KakaoMapLoaderOptions = {}
): Promise<void> => {
  const { 
    libraries = DEFAULT_LIBRARIES, 
    timeout = DEFAULT_TIMEOUT 
  } = options;

  return new Promise((resolve, reject) => {
    // 이미 로드되어 있는지 확인
    if (window.kakao?.maps) {
      console.log('Kakao Maps already loaded');
      resolve();
      return;
    }

    // 기존 스크립트 태그 확인
    const existingScript = document.querySelector(
      'script[src*="dapi.kakao.com"]'
    ) as HTMLScriptElement;

    if (existingScript) {
      handleExistingScript(existingScript, timeout, resolve, reject);
      return;
    }

    // 새 스크립트 생성
    createAndLoadScript(apiKey, libraries, timeout, resolve, reject);
  });
};

// 기존 스크립트 처리
function handleExistingScript(
  script: HTMLScriptElement,
  timeout: number,
  resolve: () => void,
  reject: (error: Error) => void
): void {
  // 이미 로드 완료된 경우
  if (window.kakao?.maps) {
    resolve();
    return;
  }

  // 타임아웃 설정
  const timeoutId = setTimeout(() => {
    reject(new Error('스크립트 로드 타임아웃'));
  }, timeout);

  // 로드 완료 이벤트
  const handleLoad = () => {
    clearTimeout(timeoutId);
    initializeKakaoMaps(resolve, reject);
  };

  // 에러 이벤트
  const handleError = () => {
    clearTimeout(timeoutId);
    handleScriptError(script.src, reject);
  };

  // 이벤트 리스너 추가
  script.addEventListener('load', handleLoad, { once: true });
  script.addEventListener('error', handleError, { once: true });
}

// 새 스크립트 생성 및 로드
function createAndLoadScript(
  apiKey: string,
  libraries: string[],
  timeout: number,
  resolve: () => void,
  reject: (error: Error) => void
): void {
  const script = document.createElement('script');
  const libraryParam = libraries.length > 0 ? `&libraries=${libraries.join(',')}` : '';
  
  // autoload=false로 document.write 경고 최소화
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}${libraryParam}&autoload=false`;
  script.async = true;
  script.defer = true; // defer 추가로 파싱 차단 최소화

  // 타임아웃 설정
  const timeoutId = setTimeout(() => {
    script.remove();
    reject(new Error('스크립트 로드 타임아웃'));
  }, timeout);

  // 로드 완료
  script.onload = () => {
    clearTimeout(timeoutId);
    initializeKakaoMaps(resolve, reject);
  };

  // 로드 에러
  script.onerror = () => {
    clearTimeout(timeoutId);
    script.remove();
    handleScriptError(script.src, reject);
  };

  document.head.appendChild(script);
}

// Kakao Maps 초기화
function initializeKakaoMaps(
  resolve: () => void,
  reject: (error: Error) => void
): void {
  if (!window.kakao?.maps) {
    reject(new Error('Kakao Maps 객체를 찾을 수 없습니다'));
    return;
  }

  try {
    window.kakao.maps.load(() => {
      console.log('Kakao Maps initialized successfully');
      resolve();
    });
  } catch (error) {
    reject(new Error('Kakao Maps 초기화 실패'));
  }
}

// 스크립트 에러 처리
async function handleScriptError(
  scriptUrl: string,
  reject: (error: Error) => void
): Promise<void> {
  try {
    const response = await fetch(scriptUrl);
    const text = await response.text();
    
    if (text.includes('NotAuthorizedError') || text.includes('App disabled')) {
      reject(new Error(
        'Kakao Maps 서비스가 비활성화되어 있습니다. ' +
        'Kakao Developers에서 활성화해주세요.'
      ));
    } else if (text.includes('InvalidKeyError')) {
      reject(new Error('잘못된 API 키입니다.'));
    } else {
      reject(new Error('Kakao Maps 스크립트 로드 실패'));
    }
  } catch {
    reject(new Error('Kakao Maps 스크립트 로드 실패'));
  }
}

// 로드 상태 확인 헬퍼
export const isKakaoMapLoaded = (): boolean => {
  return !!(window.kakao?.maps);
};

// 언로드 함수 (필요시 사용)
export const unloadKakaoMap = (): void => {
  const script = document.querySelector('script[src*="dapi.kakao.com"]');
  if (script) {
    script.remove();
  }
  
  if (window.kakao) {
    delete window.kakao;
  }
};