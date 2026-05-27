import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../lib/api-client';
import { VillageSummary, VillageDetail } from '../../../types/api';

export function useVillages() {
  return useQuery<VillageSummary[]>({
    queryKey: ['villages'],
    queryFn: async () => {
      const res = await apiClient.get('/villages');
      return res.data.data;
    },
  });
}

export function useVillage(slug: string) {
  return useQuery<VillageDetail>({
    queryKey: ['villages', slug],
    queryFn: async () => {
      const res = await apiClient.get(`/villages/${slug}`);
      return res.data.data;
    },
    enabled: !!slug,
  });
}
