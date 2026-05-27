import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../lib/api-client';
import { Address } from '../../../types/api';

export function useAddresses() {
  return useQuery<Address[]>({
    queryKey: ['addresses'],
    queryFn: async () => {
      const res = await apiClient.get('/addresses');
      return res.data.data;
    },
  });
}

export function useCreateAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Address, '_id' | 'isDefault' | 'createdAt'>) => {
      const res = await apiClient.post('/addresses', data);
      return res.data.data as Address;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['addresses'] }); },
  });
}

export function useUpdateAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Omit<Address, '_id' | 'isDefault' | 'createdAt'>> }) => {
      const res = await apiClient.patch(`/addresses/${id}`, data);
      return res.data.data as Address;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['addresses'] }); },
  });
}

export function useDeleteAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/addresses/${id}`);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['addresses'] }); },
  });
}

export function useSetDefaultAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient.patch(`/addresses/${id}/default`);
      return res.data.data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['addresses'] }); },
  });
}
