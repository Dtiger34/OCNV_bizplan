import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

export interface Hotspot {
  _id: string;
  slotName: string;
  position: { x: number; y: number; z: number };
  normal: { x: number; y: number; z: number };
  title: { vi: string; en: string };
  content: { vi: string; en: string };
  imageUrl?: string;
}

export function useProductHotspots(productId: string) {
  return useQuery<Hotspot[]>({
    queryKey: ['hotspots', productId],
    queryFn: async () => {
      const res = await apiClient.get(`/products/${productId}/hotspots`);
      return res.data.data;
    },
    enabled: !!productId,
  });
}
