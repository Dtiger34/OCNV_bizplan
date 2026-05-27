import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../lib/api-client';
import { ProductCard } from '../../../types/api';

export function useWishlist() {
  return useQuery<ProductCard[]>({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const res = await apiClient.get('/wishlist');
      return res.data.data;
    },
  });
}

export function useAddToWishlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (productId: string) => {
      const res = await apiClient.post(`/wishlist/${productId}`);
      return res.data.data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['wishlist'] }); },
  });
}

export function useRemoveFromWishlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (productId: string) => {
      await apiClient.delete(`/wishlist/${productId}`);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['wishlist'] }); },
  });
}
