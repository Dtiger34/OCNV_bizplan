import { useQuery } from '@tanstack/react-query';
import apiClient from '../lib/api-client';
import { StaticContent } from '../types/api';

export function useStaticContent(key: string) {
  return useQuery<StaticContent>({
    queryKey: ['static-content', key],
    queryFn: async () => {
      const res = await apiClient.get(`/static-content/${key}`);
      return res.data.data;
    },
    enabled: !!key,
  });
}
