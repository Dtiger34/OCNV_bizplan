import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../../../lib/api-client';

interface CreateCheckoutPayload {
  orderCode: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerAddress: string;
}

// BE trả về trực tiếp (không wrap data): { success, checkoutUrl, qrCode, paymentLinkId }
interface CheckoutData {
  checkoutUrl: string;
  qrCode: string;
  paymentLinkId?: string;
}

// BE trả về: { success, data: { success, orderCode, paymentStatus, ... } }
interface PaymentStatusResponse {
  success: boolean;
  orderCode: string;
  paymentStatus?: string;
  amount?: number;
  error?: string;
}

export function useCreatePayOSCheckout() {
  return useMutation({
    mutationFn: async (payload: CreateCheckoutPayload): Promise<CheckoutData> => {
      const res = await apiClient.post<CheckoutData>('/payments/payos/create-checkout', payload);
      // BE PaymentsService trả về object trực tiếp, không có wrapper data
      return res.data;
    },
  });
}

export function usePayOSPaymentStatus(orderCode: string | null) {
  return useQuery<PaymentStatusResponse>({
    queryKey: ['payos-status', orderCode],
    queryFn: async () => {
      const res = await apiClient.get<{ data: PaymentStatusResponse }>(`/payments/payos/${orderCode}`);
      return res.data.data;
    },
    enabled: !!orderCode,
    refetchInterval: (query) => {
      if (query.state.data?.paymentStatus === 'PAID') return false;
      return 3000;
    },
  });
}
