import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../../lib/api-client';
import { DashboardStats } from '../../../../types/api';

export function useAdminStats(period: '7d' | '30d' | '90d' = '30d') {
  return useQuery<DashboardStats>({
    queryKey: ['admin', 'dashboard', 'stats', period],
    queryFn: async () => {
      const res = await apiClient.get('/admin/dashboard/stats', { params: { period } });
      return res.data.data;
    },
  });
}
