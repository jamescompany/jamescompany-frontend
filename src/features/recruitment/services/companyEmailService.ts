// src/features/recruitment/services/companyEmailService.ts

interface EmailData {
  companyName: string;
  contactEmail: string;
  position: string;
  managementToken: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const companyEmailTemplates = {
  // 채용공고 접수 확인 이메일
  applicationReceived: (data: EmailData) => ({
    subject: `[제임스컴퍼니] ${data.companyName}님의 채용공고가 접수되었습니다`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #3B82F6, #8B5CF6); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: linear-gradient(to right, #3B82F6, #8B5CF6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
          .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb; }
          .footer { text-align: center; margin-top: 40px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>채용공고 접수 확인</h1>
          </div>
          <div class="content">
            <p>안녕하세요, ${data.companyName}님</p>
            
            <p><strong>"${data.position}"</strong> 포지션의 채용공고가 성공적으로 접수되었습니다.</p>
            
            <div class="info-box">
              <h3>다음 단계</h3>
              <ol>
                <li>제임스컴퍼니 팀이 24시간 이내에 채용공고를 검토합니다</li>
                <li>승인되면 즉시 게시되며, 관리 링크를 보내드립니다</li>
                <li>검토 중 추가 정보가 필요한 경우 연락드리겠습니다</li>
              </ol>
            </div>
            
            <p>채용공고 검토에는 보통 1-2 영업일이 소요됩니다.</p>
            
            <div class="info-box" style="background: #EFF6FF; border-color: #3B82F6;">
              <p><strong>💡 알고 계셨나요?</strong></p>
              <p>제임스컴퍼니를 통한 채용 시 평균 지원율이 일반 채용 플랫폼 대비 3배 높습니다.</p>
            </div>
            
            <p>문의사항이 있으시면 언제든 연락주세요.</p>
            
            <p>감사합니다.<br>
            제임스컴퍼니 팀 드림</p>
          </div>
          <div class="footer">
            <p>이 이메일은 ${data.contactEmail}로 발송되었습니다.</p>
            <p>© 2025 JamesCompany. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // 채용공고 승인 및 관리 링크 이메일
  applicationApproved: (data: EmailData) => ({
    subject: `[제임스컴퍼니] 축하합니다! ${data.position} 채용공고가 게시되었습니다`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #10B981, #3B82F6); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: linear-gradient(to right, #3B82F6, #8B5CF6); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
          .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb; }
          .feature { display: flex; align-items: center; margin: 10px 0; }
          .feature-icon { width: 24px; height: 24px; margin-right: 10px; }
          .warning-box { background: #FEF3C7; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #F59E0B; }
          .footer { text-align: center; margin-top: 40px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 채용공고가 게시되었습니다!</h1>
          </div>
          <div class="content">
            <p>안녕하세요, ${data.companyName}님</p>
            
            <p><strong>"${data.position}"</strong> 포지션이 제임스컴퍼니에 성공적으로 게시되었습니다.</p>
            
            <center>
              <a href="https://jamescompany.kr/company/dashboard/${data.managementToken}" class="button">
                채용 관리 대시보드 바로가기
              </a>
            </center>
            
            <div class="info-box">
              <h3>관리 대시보드에서 할 수 있는 일</h3>
              <div class="feature">
                <span class="feature-icon">📊</span>
                <span>실시간 조회수 및 지원 현황 확인</span>
              </div>
              <div class="feature">
                <span class="feature-icon">👥</span>
                <span>지원자 이력서 열람 및 관리</span>
              </div>
              <div class="feature">
                <span class="feature-icon">💬</span>
                <span>지원자와 직접 소통</span>
              </div>
              <div class="feature">
                <span class="feature-icon">📈</span>
                <span>채용 성과 분석 리포트</span>
              </div>
              <div class="feature">
                <span class="feature-icon">✏️</span>
                <span>채용공고 수정 및 관리</span>
              </div>
            </div>
            
            <div class="warning-box">
              <strong>⚠️ 중요:</strong> 이 링크는 보안을 위해 고유하게 생성되었습니다. 
              안전한 곳에 보관하시고, 타인과 공유하지 마세요.
            </div>
            
            <div class="info-box" style="background: #F0FDF4; border-color: #10B981;">
              <h3>💡 채용 성공 팁</h3>
              <ul>
                <li>지원자가 들어오면 빠르게 검토하세요 (24시간 이내 권장)</li>
                <li>제임스 스코어를 참고하여 우수 지원자를 놓치지 마세요</li>
                <li>정기적으로 대시보드를 확인하여 새로운 지원자를 확인하세요</li>
              </ul>
            </div>
            
            <p>더 많은 기능을 원하시나요? <a href="https://jamescompany.kr/company/signup">기업 회원으로 가입</a>하시면 더 강력한 채용 도구를 사용하실 수 있습니다.</p>
            
            <p>성공적인 채용을 기원합니다!<br>
            제임스컴퍼니 팀 드림</p>
          </div>
          <div class="footer">
            <p>관리 링크: <code style="background: #e5e7eb; padding: 2px 6px; border-radius: 4px;">https://jamescompany.kr/company/dashboard/${data.managementToken}</code></p>
            <p>이 이메일은 ${data.contactEmail}로 발송되었습니다.</p>
            <p>© 2025 JamesCompany. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // 새로운 지원자 알림 이메일
  newApplication: (data: EmailData & { applicantCount: number }) => ({
    subject: `[제임스컴퍼니] ${data.position} 포지션에 새로운 지원자가 있습니다`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #8B5CF6, #EC4899); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: linear-gradient(to right, #8B5CF6, #EC4899); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
          .stat-box { background: white; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #e5e7eb; }
          .footer { text-align: center; margin-top: 40px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 새로운 지원자 알림</h1>
          </div>
          <div class="content">
            <p>안녕하세요, ${data.companyName}님</p>
            
            <div class="stat-box">
              <h2 style="color: #8B5CF6; margin: 0;">${data.applicantCount}명</h2>
              <p style="margin: 5px 0;">새로운 지원자</p>
            </div>
            
            <p><strong>"${data.position}"</strong> 포지션에 새로운 지원자가 있습니다.</p>
            
            <center>
              <a href="https://jamescompany.kr/company/dashboard/${data.managementToken}" class="button">
                지원자 확인하기
              </a>
            </center>
            
            <p style="background: #EDE9FE; padding: 15px; border-radius: 8px; border-left: 4px solid #8B5CF6;">
              💡 <strong>빠른 응답이 중요합니다!</strong><br>
              24시간 이내에 지원자를 검토하면 우수 인재 채용 확률이 3배 높아집니다.
            </p>
            
            <p>좋은 인재와의 만남을 응원합니다!</p>
          </div>
          <div class="footer">
            <p>알림 설정은 대시보드에서 변경할 수 있습니다.</p>
            <p>© 2025 JamesCompany. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // 주간 리포트 이메일
  weeklyReport: (data: EmailData & { stats: any }) => ({
    subject: `[제임스컴퍼니] ${data.companyName}님의 주간 채용 리포트`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #6366F1, #8B5CF6); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
          .stat-card { background: white; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #e5e7eb; }
          .stat-number { font-size: 28px; font-weight: bold; color: #6366F1; }
          .stat-label { color: #6b7280; font-size: 14px; }
          .button { display: inline-block; background: linear-gradient(to right, #6366F1, #8B5CF6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
          .footer { text-align: center; margin-top: 40px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📊 주간 채용 리포트</h1>
            <p style="margin: 0; opacity: 0.9;">지난 7일간의 채용 성과</p>
          </div>
          <div class="content">
            <p>안녕하세요, ${data.companyName}님</p>
            
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-number">${data.stats.weeklyViews}</div>
                <div class="stat-label">조회수</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">${data.stats.weeklyApplications}</div>
                <div class="stat-label">새 지원자</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">${data.stats.conversionRate}%</div>
                <div class="stat-label">지원 전환율</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">${data.stats.avgJamesScore}</div>
                <div class="stat-label">평균 제임스 스코어</div>
              </div>
            </div>
            
            <center>
              <a href="https://jamescompany.kr/company/dashboard/${data.managementToken}" class="button">
                상세 리포트 보기
              </a>
            </center>
            
            <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">이번 주 하이라이트</h3>
              <ul>
                <li>가장 많은 조회를 받은 날: ${data.stats.bestDay}</li>
                <li>최고 제임스 스코어 지원자: ${data.stats.topApplicant} (${data.stats.topScore}점)</li>
                <li>평균 지원서 검토 시간: ${data.stats.avgReviewTime}</li>
              </ul>
            </div>
            
            <p>더 나은 채용을 위해 제임스컴퍼니가 항상 함께하겠습니다.</p>
          </div>
          <div class="footer">
            <p>주간 리포트 수신을 원하지 않으시면 <a href="#">여기</a>를 클릭하세요.</p>
            <p>© 2025 JamesCompany. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  })
};

// 이메일 발송 서비스 (실제 구현시 백엔드에서 처리)
export const sendCompanyEmail = async (
  type: keyof typeof companyEmailTemplates,
  data: any
) => {
  const template = companyEmailTemplates[type](data);
  
  // 실제로는 백엔드 API 호출
  const response = await fetch('/api/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: data.contactEmail,
      subject: template.subject,
      html: template.html,
    }),
  });
  
  return response.json();
};

// 토큰 생성 유틸리티 (브라우저 환경용)
export const generateManagementToken = (companyEmail: string): string => {
  // 브라우저 환경에서 사용 가능한 방법
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const tokenString = `${companyEmail}-${timestamp}-${random}`;
  
  // Base64 인코딩 (브라우저 호환)
  return btoa(tokenString);
};