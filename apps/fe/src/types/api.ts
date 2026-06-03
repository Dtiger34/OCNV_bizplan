export interface BilingualText { vi: string; en: string; }

export interface ProductCard {
  _id: string;
  name: BilingualText;
  price: number;
  stock: number;
  village: { _id: string; slug: string; name: BilingualText };
  mainImageUrl: string | null;
  isVisible: boolean;
}

export interface ProductDetail extends ProductCard {
  description: BilingualText;
  images: Array<{ url: string; isMain: boolean; order: number }>;
  glbUrl: string | null;
  usdzUrl: string | null;
  arTargetImageUrl: string | null;
  arTrackingFsetUrl: string | null;
  arTrackingFset3Url: string | null;
  arTrackingIsetUrl: string | null;
  processVideoUrl: string | null;
  processVideoDescription: string | null;
  hotspots: Array<{
    _id: string; slotName: string;
    position: { x: number; y: number; z: number };
    normal: { x: number; y: number; z: number };
    title: BilingualText; content: BilingualText; imageUrl: string | null;
  }>;
  averageRating: number;
  reviewCount: number;
  isFeatured: boolean;
}

export interface VillageSummary {
  _id: string; slug: string; name: BilingualText; tagline: BilingualText;
  shortDescription: BilingualText; coverImageUrl: string | null;
}

export interface VillageDetail extends VillageSummary {
  fullHistory: BilingualText; introVideoUrl: string | null;
  artisanImageUrl: string | null; artisanStory: BilingualText; artisanQuote: BilingualText;
  stages: Array<{ _id: string; order: number; title: BilingualText; description: BilingualText; imageUrls: string[]; videoUrl: string | null }>;
}

export interface CartItem {
  product: { _id: string; name: BilingualText; price: number; stock: number; mainImageUrl: string | null };
  quantity: number;
}

export interface CartData { items: CartItem[]; subtotal: number; shippingFee: number; total: number; }

export interface OrderSummary {
  _id: string; orderCode: string; status: string; total: number;
  paymentMethod: string; paymentStatus: string; itemCount: number; createdAt: string;
}

export interface OrderDetail {
  _id: string; orderCode: string; status: string;
  statusHistory: Array<{ status: string; updatedAt: string; note: string | null }>;
  shippingAddress: { fullName: string; phone: string; province: string; district: string; ward: string; street: string };
  items: Array<{ productId: string; productName: string; productImageUrl: string | null; quantity: number; unitPrice: number; isReviewed: boolean }>;
  subtotal: number; shippingFee: number; total: number;
  payment: { method: string; status: string; paidAt: string | null };
  trackingCode: string | null; customerNote: string | null; createdAt: string;
}

export interface Review {
  _id: string;
  user: { fullName: string; avatarUrl: string | null };
  rating: number; content: string; imageUrls: string[];
  videoUrl: string | null; createdAt: string;
}

export interface PaginatedResponse<T> { items: T[]; total: number; page: number; limit: number; }

export interface User { _id: string; fullName: string; email: string; role: string; avatarUrl: string | null; phone: string | null; }

export interface Address { _id: string; fullName: string; phone: string; province: string; district: string; ward: string; street: string; isDefault: boolean; createdAt: string; }

export interface StaticContent { key: string; content: BilingualText; updatedAt: string; }

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  recentOrders: Array<{
    _id: string; orderCode: string; status: string; total: number;
    items: Array<{ productName: string; quantity: number }>;
    createdAt: string;
  }>;
  revenueByPeriod: Array<{ _id: string; revenue: number; orders: number }>;
}

export interface AdminReview {
  _id: string;
  user: { _id: string; fullName: string; avatarUrl: string | null } | null;
  product: { _id: string; name: BilingualText } | null;
  rating: number; content: string; imageUrls: string[];
  videoUrl: string | null; createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}
