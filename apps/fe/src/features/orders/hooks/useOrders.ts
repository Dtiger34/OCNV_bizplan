import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../lib/api-client';
import { OrderSummary, OrderDetail, PaginatedResponse } from '../../../types/api';

interface OrdersQuery {
  page?: number; limit?: number; status?: string;
}

export function useOrders(query: OrdersQuery = {}) {
  return useQuery<PaginatedResponse<OrderSummary>>({
    queryKey: ['orders', query],
    queryFn: async () => {
      const res = await apiClient.get('/orders', { params: query });
      return res.data.data;
    },
  });
}

export function useOrder(id: string) {
  return useQuery<OrderDetail>({
    queryKey: ['orders', id],
    queryFn: async () => {
      const res = await apiClient.get(`/orders/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
}

export function useOrderByCode(orderCode: string) {
  return useQuery<OrderDetail>({
    queryKey: ['orders-by-code', orderCode],
    queryFn: async () => {
      const res = await apiClient.get(`/orders/by-code/${orderCode}`);
      return res.data.data;
    },
    enabled: !!orderCode,
  });
}

export function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      shippingAddressId: string;
      paymentMethod: string;
      customerNote?: string;
    }) => {
      const res = await apiClient.post('/orders', data);
      return res.data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cart'] });
      qc.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
