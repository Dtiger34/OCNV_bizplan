import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../lib/api-client';
import { CartData } from '../../../types/api';

export function useServerCart() {
  return useQuery<CartData>({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await apiClient.get('/cart');
      return res.data.data;
    },
  });
}

export function useAddToCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { productId: string; quantity: number }) => {
      const res = await apiClient.post('/cart/items', data);
      return res.data.data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['cart'] }); },
  });
}

export function useUpdateCartItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const res = await apiClient.patch(`/cart/items/${productId}`, { quantity });
      return res.data.data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['cart'] }); },
  });
}

export function useRemoveCartItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (productId: string) => {
      await apiClient.delete(`/cart/items/${productId}`);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['cart'] }); },
  });
}

export function useClearCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await apiClient.delete('/cart');
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['cart'] }); },
  });
}

export function useMergeCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (items: Array<{ productId: string; quantity: number }>) => {
      const res = await apiClient.post('/cart/merge', { items });
      return res.data.data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['cart'] }); },
  });
}
