import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../../lib/api-client';
import { DashboardStats } from '../../../../types/api';

export type DashboardPeriod = 'today' | 'week' | 'month' | 'year';

export function useAdminStats(period: DashboardPeriod = 'month') {
  return useQuery<DashboardStats>({
    queryKey: ['admin', 'dashboard', 'stats', period],
    queryFn: async () => {
      const res = await apiClient.get('/admin/dashboard/stats', { params: { period } });
      return res.data.data;
    },
  });
}
