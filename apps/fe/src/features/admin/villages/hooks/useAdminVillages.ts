import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../../lib/api-client';
import { VillageSummary, VillageDetail } from '../../../../types/api';

export function useAdminVillages() {
  return useQuery<VillageSummary[]>({
    queryKey: ['admin', 'villages'],
    queryFn: async () => {
      const res = await apiClient.get('/admin/villages');
      return res.data.data;
    },
  });
}

export function useAdminVillage(id: string) {
  return useQuery<VillageDetail>({
    queryKey: ['admin', 'villages', id],
    queryFn: async () => {
      const res = await apiClient.get(`/admin/villages/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
}

export function useUpdateVillage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch(`/admin/villages/${id}`, data);
      return res.data.data;
    },
    onSuccess: (_d, { id }) => {
      qc.invalidateQueries({ queryKey: ['admin', 'villages'] });
      qc.invalidateQueries({ queryKey: ['admin', 'villages', id] });
    },
  });
}

export function useCreateStage(villageId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post(`/admin/villages/${villageId}/stages`, data);
      return res.data.data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'villages', villageId] }); },
  });
}

export function useUpdateStage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch(`/admin/stages/${id}`, data);
      return res.data.data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'villages'] }); },
  });
}

export function useDeleteStage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/admin/stages/${id}`);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'villages'] }); },
  });
}
