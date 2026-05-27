import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../lib/api-client';
import { User } from '../../../types/api';

export function useMe() {
  return useQuery<User>({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await apiClient.get('/auth/me');
      return res.data.data;
    },
    retry: false,
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await apiClient.post('/auth/login', data);
      return res.data.data as User;
    },
    onSuccess: (user) => { qc.setQueryData(['me'], user); },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => { await apiClient.post('/auth/logout'); },
    onSuccess: () => { qc.clear(); },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (data: { fullName: string; email: string; password: string }) => {
      const res = await apiClient.post('/auth/register', data);
      return res.data.data;
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (data: { email: string }) => {
      const res = await apiClient.post('/auth/forgot-password', data);
      return res.data.data;
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async (data: { token: string; password: string }) => {
      const res = await apiClient.post('/auth/reset-password', data);
      return res.data.data;
    },
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: async (data: { token: string }) => {
      const res = await apiClient.post('/auth/verify-email', data);
      return res.data.data;
    },
  });
}
