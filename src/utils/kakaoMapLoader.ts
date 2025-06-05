// src/utils/kakaoMapLoader.ts

export const loadKakaoMapScript = (apiKey: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      console.log('Loading Kakao Maps with API key:', apiKey.substring(0, 10) + '...');
      
      // 이미 로드되어 있는지 확인
      if (window.kakao && window.kakao.maps) {
        console.log('Kakao Maps already loaded');
        resolve();
        return;
      }
  
      // 스크립트가 이미 추가되었는지 확인
      const existingScript = document.querySelector('script[src*="dapi.kakao.com"]') as HTMLScriptElement;
      if (existingScript) {
        console.log('Script tag already exists:', existingScript.src);
        
        // 이미 로드 완료된 경우
        if (window.kakao && window.kakao.maps) {
          console.log('Kakao already loaded via existing script');
          resolve();
          return;
        }
        
        // 타임아웃 설정
        const timeout = setTimeout(() => {
          console.error('Script load timeout after 10 seconds');
          reject(new Error('스크립트 로드 타임아웃'));
        }, 10000);
        
        existingScript.addEventListener('load', () => {
          clearTimeout(timeout);
          console.log('Existing script loaded');
          if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(() => {
              console.log('Kakao Maps initialized via existing script');
              resolve();
            });
          } else {
            reject(new Error('Kakao object not found after load'));
          }
        });
        
        existingScript.addEventListener('error', (e) => {
          clearTimeout(timeout);
          console.error('Script load error:', e);
          // NotAuthorizedError 처리
          fetch(existingScript.src)
            .then(res => res.text())
            .then(text => {
              if (text.includes('NotAuthorizedError')) {
                reject(new Error('Kakao Maps 서비스가 비활성화되어 있습니다. Kakao Developers에서 활성화해주세요.'));
              } else {
                reject(new Error('Failed to load Kakao Maps'));
              }
            })
            .catch(() => reject(new Error('Failed to load Kakao Maps')));
        });
        return;
      }
  
      // 새 스크립트 태그 생성
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services,clusterer,drawing&autoload=false`;
      script.async = true;
      
      console.log('Creating script tag with URL:', script.src);
      
      script.onload = () => {
        console.log('Script tag loaded, initializing Kakao Maps...');
        // Kakao Maps SDK 초기화
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            console.log('Kakao Maps initialized successfully');
            resolve();
          });
        } else {
          console.error('window.kakao or window.kakao.maps is not available');
          reject(new Error('Kakao Maps object not found after script load'));
        }
      };
      
      script.onerror = (e) => {
        console.error('Failed to load script:', e);
        // NotAuthorizedError 처리
        fetch(script.src)
          .then(res => res.text())
          .then(text => {
            if (text.includes('NotAuthorizedError')) {
              reject(new Error('Kakao Maps 서비스가 비활성화되어 있습니다. Kakao Developers에서 활성화해주세요.'));
            } else if (text.includes('App disabled')) {
              reject(new Error('Kakao Maps 서비스가 비활성화되어 있습니다. Kakao Developers에서 활성화해주세요.'));
            } else {
              reject(new Error('Failed to load Kakao Maps script'));
            }
          })
          .catch(() => reject(new Error('Failed to load Kakao Maps script')));
      };
      
      document.head.appendChild(script);
    });
  };