import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../../../lib/api-client';

interface CreateCheckoutPayload {
  orderCode: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerAddress: string;
}

interface CheckoutResponse {
  success: boolean;
  data?: {
    checkoutUrl: string;
    qrCode: string;
  };
  message: string;
}

interface PaymentStatusResponse {
  success: boolean;
  orderCode: string;
  paymentStatus?: string;
  amount?: number;
  transactionDateTime?: string;
  error?: string;
}

/**
 * Hook để tạo PayOS checkout link
 */
export function useCreatePayOSCheckout() {
  return useMutation({
    mutationFn: async (payload: CreateCheckoutPayload) => {
      const res = await apiClient.post<CheckoutResponse>('/payments/payos/create-checkout', payload);
      return res.data.data;
    },
  });
}

/**
 * Hook để lấy trạng thái thanh toán PayOS
 */
export function usePayOSPaymentStatus(orderCode: string | null) {
  return useQuery<PaymentStatusResponse>({
    queryKey: ['payos-status', orderCode],
    queryFn: async () => {
      const res = await apiClient.get<{data: PaymentStatusResponse}>(`/payments/payos/${orderCode}`);
      return res.data.data;
    },
    enabled: !!orderCode,
    refetchInterval: (data) => {
      // Dừng polling nếu thanh toán đã hoàn tất
      if (data?.paymentStatus === 'PAID') {
        return false;
      }
      // Polling mỗi 3 giây
      return 3000;
    },
  });
}

/**
 * Hook để xử lý callback từ PayOS
 * Gọi khi user được chuyển hướng về từ PayOS (success hoặc cancel)
 */
export function useHandlePayOSCallback(orderCode: string) {
  return useQuery({
    queryKey: ['payos-callback', orderCode],
    queryFn: async () => {
      // Kiểm tra trạng thái thanh toán
      const res = await apiClient.get<PaymentStatusResponse>(`/payments/payos/${orderCode}`);
      return res.data.data;
    },
    enabled: !!orderCode,
    retry: 3,
  });
}
