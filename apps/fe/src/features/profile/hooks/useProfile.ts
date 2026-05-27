import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../lib/api-client';
import { User } from '../../../types/api';

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Pick<User, 'fullName' | 'phone'>>) => {
      const res = await apiClient.patch('/users/me', data);
      return res.data.data as User;
    },
    onSuccess: (user) => { qc.setQueryData(['me'], user); },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (data: { currentPassword: string; newPassword: string }) => {
      const res = await apiClient.patch('/users/me/password', data);
      return res.data.data;
    },
  });
}

export function useUpdateAvatar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);
      const res = await apiClient.patch('/users/me/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data.data as User;
    },
    onSuccess: (user) => { qc.setQueryData(['me'], user); },
  });
}
