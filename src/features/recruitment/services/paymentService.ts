// src/features/recruitment/services/paymentService.ts

import api from '../../../shared/services/api';

// 토스페이먼츠 타입 선언
declare global {
  interface Window {
    TossPayments: any;
  }
}

interface PaymentRequest {
  jobPostingId: string;
  packageType: 'basic' | 'standard' | 'premium';
  paymentMethod: 'card' | 'bank' | 'virtual';
}

interface PaymentResponse {
  transactionId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentUrl?: string;
}

class PaymentService {
  // Vite 환경변수 사용
  private static TOSS_CLIENT_KEY = import.meta.env.VITE_TOSS_CLIENT_KEY || '';
  private static SUCCESS_URL = `${window.location.origin}/services/recruitment/payment/success`;
  private static FAIL_URL = `${window.location.origin}/services/recruitment/payment/fail`;
  
  static async initializePayment(data: PaymentRequest): Promise<PaymentResponse> {
    // 백엔드에 결제 정보 생성 요청
    const response = await api.post('/payments/initialize', data);
    return response.data;
  }
  
  static async processPayment(
    transactionId: string,
    amount: number,
    jobTitle: string,
    userEmail: string,
    userName: string
  ): Promise<void> {
    // 토스페이먼츠 로드 확인
    if (!window.TossPayments) {
      throw new Error('토스페이먼츠가 로드되지 않았습니다.');
    }
    
    // 토스페이먼츠 초기화
    const tossPayments = window.TossPayments(this.TOSS_CLIENT_KEY);
    
    // 결제 요청
    await tossPayments.requestPayment('카드', {
      amount: amount,
      orderId: transactionId,
      orderName: `채용공고 등록 - ${jobTitle}`,
      customerName: userName,
      customerEmail: userEmail,
      successUrl: `${this.SUCCESS_URL}?orderId=${transactionId}`,
      failUrl: `${this.FAIL_URL}?orderId=${transactionId}`,
    });
  }
  
  static async confirmPayment(
    paymentKey: string,
    orderId: string,
    amount: number
  ): Promise<void> {
    // 백엔드에 결제 승인 요청
    await api.post('/payments/confirm', {
      paymentKey,
      orderId,
      amount
    });
  }
  
  static async requestRefund(
    transactionId: string,
    reason: string,
    amount?: number
  ): Promise<void> {
    await api.post('/payments/refund', {
      transactionId,
      reason,
      amount
    });
  }
  
  static async getCelebrationBonusStatus(jobPostingId: string): Promise<any> {
    const response = await api.get(`/payments/celebration-bonus/${jobPostingId}`);
    return response.data;
  }
}

export default PaymentService;