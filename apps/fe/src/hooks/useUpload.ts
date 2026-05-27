import { useMutation } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useUpload() {
  return useMutation({
    mutationFn: async (file: File): Promise<{ url: string }> => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await apiClient.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data.data as { url: string };
    },
  });
}
