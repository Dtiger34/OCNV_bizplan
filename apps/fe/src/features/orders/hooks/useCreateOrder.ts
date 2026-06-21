import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../lib/api-client';

export interface CreateOrderPayload {
  shippingAddress: {
    fullName: string;
    phone: string;
    province: string;
    district: string;
    ward: string;
    street: string;
  };
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  paymentMethod: 'payos';
  customerNote?: string;
}

export interface OrderResponse {
  _id: string;
  orderCode: string;
  userId?: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    province: string;
    district: string;
    ward: string;
    street: string;
  };
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    isReviewed: boolean;
  }>;
  subtotal: number;
  shippingFee: number;
  total: number;
  payment: {
    method: string;
    status: string;
    transactionId?: string;
    paidAt?: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Hook để tạo đơn hàng
 */
export function useCreateOrder() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      const res = await apiClient.post<{ data: OrderResponse }>('/orders', {
        shippingAddress: payload.shippingAddress,
        items: payload.items,
        paymentMethod: payload.paymentMethod,
        customerNote: payload.customerNote,
      });
      return res.data.data;
    },
    onSuccess: () => {
      // Invalidate order-related queries
      qc.invalidateQueries({ queryKey: ['orders'] });
      qc.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
