import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../../lib/api-client';
import { Review, PaginatedResponse } from '../../../../types/api';

interface AdminReviewsQuery {
  page?: number; limit?: number; status?: string; productId?: string;
}

export function useAdminReviews(query: AdminReviewsQuery = {}) {
  return useQuery<PaginatedResponse<Review>>({
    queryKey: ['admin', 'reviews', query],
    queryFn: async () => {
      const res = await apiClient.get('/admin/reviews', { params: query });
      return res.data.data;
    },
  });
}

export function useUpdateReviewStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiClient.patch(`/admin/reviews/${id}/status`, { status });
      return res.data.data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'reviews'] }); },
  });
}

export function useDeleteReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/admin/reviews/${id}`);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'reviews'] }); },
  });
}
