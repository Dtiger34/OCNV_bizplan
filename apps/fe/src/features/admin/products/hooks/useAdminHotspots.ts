import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../../lib/api-client';

interface HotspotPayload {
  slotName: string;
  position: { x: number; y: number; z: number };
  normal: { x: number; y: number; z: number };
  title: { vi: string; en: string };
  content: { vi: string; en: string };
  imageUrl?: string | null;
}

export function useHotspots(productId: string) {
  return useQuery({
    queryKey: ['admin', 'hotspots', productId],
    queryFn: async () => {
      const res = await apiClient.get(`/admin/products/${productId}/hotspots`);
      return res.data.data;
    },
    enabled: !!productId,
  });
}

export function useCreateHotspot(productId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: HotspotPayload) => {
      const res = await apiClient.post(`/admin/products/${productId}/hotspots`, data);
      return res.data.data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'hotspots', productId] }); },
  });
}

export function useUpdateHotspot() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<HotspotPayload> }) => {
      const res = await apiClient.patch(`/admin/hotspots/${id}`, data);
      return res.data.data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'hotspots'] }); },
  });
}

export function useDeleteHotspot() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/admin/hotspots/${id}`);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'hotspots'] }); },
  });
}
