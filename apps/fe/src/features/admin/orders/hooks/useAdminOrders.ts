import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../../lib/api-client';
import { OrderSummary, OrderDetail, PaginatedResponse } from '../../../../types/api';

interface AdminOrdersQuery {
  page?: number; limit?: number; status?: string; search?: string;
}

export function useAdminOrders(query: AdminOrdersQuery = {}) {
  return useQuery<PaginatedResponse<OrderSummary>>({
    queryKey: ['admin', 'orders', query],
    queryFn: async () => {
      const res = await apiClient.get('/admin/orders', { params: query });
      return res.data.data;
    },
  });
}

export function useAdminOrder(id: string) {
  return useQuery<OrderDetail>({
    queryKey: ['admin', 'orders', id],
    queryFn: async () => {
      const res = await apiClient.get(`/admin/orders/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status, note }: { id: string; status: string; note?: string }) => {
      const res = await apiClient.patch(`/admin/orders/${id}/status`, { status, note });
      return res.data.data;
    },
    onSuccess: (_d, { id }) => {
      qc.invalidateQueries({ queryKey: ['admin', 'orders'] });
      qc.invalidateQueries({ queryKey: ['admin', 'orders', id] });
    },
  });
}
