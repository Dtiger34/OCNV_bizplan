import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../lib/api-client';
import { ProductCard, ProductDetail, PaginatedResponse, Review } from '../../../types/api';

interface ProductsQuery {
  page?: number; limit?: number; search?: string;
  villageId?: string; minPrice?: number; maxPrice?: number;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'popular';
}

export function useProducts(query: ProductsQuery = {}) {
  return useQuery<PaginatedResponse<ProductCard>>({
    queryKey: ['products', query],
    queryFn: async () => {
      const res = await apiClient.get('/products', { params: query });
      return res.data.data;
    },
  });
}

export function useFeaturedProducts() {
  return useQuery<ProductCard[]>({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const res = await apiClient.get('/products/featured');
      return res.data.data;
    },
  });
}

export function useProduct(id: string) {
  return useQuery<ProductDetail>({
    queryKey: ['products', id],
    queryFn: async () => {
      const res = await apiClient.get(`/products/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
}

export function useRelatedProducts(id: string, limit = 6) {
  return useQuery<ProductCard[]>({
    queryKey: ['products', id, 'related'],
    queryFn: async () => {
      const res = await apiClient.get(`/products/${id}/related`, { params: { limit } });
      return res.data.data;
    },
    enabled: !!id,
  });
}

export function useProductReviews(id: string, page = 1, limit = 10) {
  return useQuery<PaginatedResponse<Review> & { averageRating: number }>({
    queryKey: ['products', id, 'reviews', page],
    queryFn: async () => {
      const res = await apiClient.get(`/products/${id}/reviews`, { params: { page, limit } });
      return res.data.data;
    },
    enabled: !!id,
  });
}
