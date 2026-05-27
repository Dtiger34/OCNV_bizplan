import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../../lib/api-client';
import { User, PaginatedResponse } from '../../../../types/api';

interface AdminUsersQuery {
  page?: number; limit?: number; search?: string; status?: string;
}

export function useAdminUsers(query: AdminUsersQuery = {}) {
  return useQuery<PaginatedResponse<User>>({
    queryKey: ['admin', 'users', query],
    queryFn: async () => {
      const res = await apiClient.get('/admin/users', { params: query });
      return res.data.data;
    },
  });
}

export function useAdminUser(id: string) {
  return useQuery<User>({
    queryKey: ['admin', 'users', id],
    queryFn: async () => {
      const res = await apiClient.get(`/admin/users/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
}

export function useUpdateUserStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiClient.patch(`/admin/users/${id}/status`, { status });
      return res.data.data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'users'] }); },
  });
}
