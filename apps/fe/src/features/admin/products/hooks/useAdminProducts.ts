import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../../lib/api-client';
import { ProductCard, ProductDetail, PaginatedResponse } from '../../../../types/api';

interface AdminProductsQuery {
  page?: number; limit?: number; search?: string; villageId?: string; isVisible?: boolean;
}

export function useAdminProducts(query: AdminProductsQuery = {}) {
  return useQuery<PaginatedResponse<ProductCard>>({
    queryKey: ['admin', 'products', query],
    queryFn: async () => {
      const res = await apiClient.get('/admin/products', { params: query });
      return res.data.data;
    },
  });
}

export function useAdminProduct(id: string) {
  return useQuery<ProductDetail>({
    queryKey: ['admin', 'products', id],
    queryFn: async () => {
      const res = await apiClient.get(`/admin/products/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post('/admin/products', data);
      return res.data.data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'products'] }); },
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch(`/admin/products/${id}`, data);
      return res.data.data;
    },
    onSuccess: (_d, { id }) => {
      qc.invalidateQueries({ queryKey: ['admin', 'products'] });
      qc.invalidateQueries({ queryKey: ['admin', 'products', id] });
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/admin/products/${id}`);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'products'] }); },
  });
}

export function useToggleVisibility() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isVisible }: { id: string; isVisible: boolean }) => {
      const res = await apiClient.patch(`/admin/products/${id}/visibility`, { isVisible });
      return res.data.data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'products'] }); },
  });
}

export function useToggleFeatured() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isFeatured }: { id: string; isFeatured: boolean }) => {
      const res = await apiClient.patch(`/admin/products/${id}/featured`, { isFeatured });
      return res.data.data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'products'] }); },
  });
}
