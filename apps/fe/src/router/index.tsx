import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import PrivateRoute from '@/components/layout/PrivateRoute';

// Public pages
const HomePage = lazy(() => import('@/features/home/pages/HomePage'));
const ShopPage = lazy(() => import('@/features/shop/pages/ShopPage'));
const ProductDetailPage = lazy(() => import('@/features/products/pages/ProductDetailPage'));
const ArPage = lazy(() => import('@/features/ar/pages/ArPage'));
const VillagePage = lazy(() => import('@/features/villages/pages/VillagePage'));
const VillagesListPage = lazy(() => import('@/features/villages/pages/VillagesListPage'));
const StaticContentPage = lazy(() => import('@/features/pages/StaticContentPage'));
const RegulationsPage = lazy(() => import('@/features/pages/RegulationsPage'));
const NewsDetailPage = lazy(() => import('@/features/news/pages/NewsDetailPage'));
const ContactPage = lazy(() => import('@/features/contact/pages/ContactPage'));
const CartPage = lazy(() => import('@/features/cart/pages/CartPage'));

// Checkout pages
const CheckoutPage = lazy(() => import('@/features/checkout/pages/CheckoutPage'));
const PaymentReturnPage = lazy(() => import('@/features/checkout/pages/PaymentReturnPage'));
const CheckoutSuccessPage = lazy(() => import('@/features/checkout/pages/CheckoutSuccessPage'));

// Auth pages
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/features/auth/pages/ResetPasswordPage'));

// Profile / user pages
const ProfilePage = lazy(() => import('@/features/profile/pages/ProfilePage'));
const AddressesPage = lazy(() => import('@/features/profile/pages/AddressesPage'));
const OrderHistoryPage = lazy(() => import('@/features/profile/pages/OrderHistoryPage'));
const WishlistPage = lazy(() => import('@/features/profile/pages/WishlistPage'));
const OrderDetailPage = lazy(() => import('@/features/orders/pages/OrderDetailPage'));

// Admin pages
const AdminDashboardPage = lazy(() => import('@/features/admin/dashboard/pages/DashboardPage'));
const AdminProductListPage = lazy(() => import('@/features/admin/products/pages/AdminProductListPage'));
const AdminProductFormPage = lazy(() => import('@/features/admin/products/pages/AdminProductFormPage'));
const AdminHotspotPage = lazy(() => import('@/features/admin/products/pages/AdminHotspotPage'));
const AdminOrderListPage = lazy(() => import('@/features/admin/orders/pages/AdminOrderListPage'));
const AdminOrderDetailPage = lazy(() => import('@/features/admin/orders/pages/AdminOrderDetailPage'));
const AdminReviewListPage = lazy(() => import('@/features/admin/reviews/pages/AdminReviewListPage'));
const AdminUserListPage = lazy(() => import('@/features/admin/users/pages/AdminUserListPage'));
const AdminContactListPage = lazy(() => import('@/features/admin/contacts/pages/AdminContactListPage'));

const Fallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const S = (C: React.ComponentType) => (
  <Suspense fallback={<Fallback />}>
    <C />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: S(HomePage) },
      { path: '/shop', element: S(ShopPage) },
      { path: '/products/:id', element: S(ProductDetailPage) },
      { path: '/villages', element: S(VillagesListPage) },
      { path: '/villages/:slug', element: S(VillagePage) },
      { path: '/pages/:key', element: S(StaticContentPage) },
      { path: '/quy-dinh', element: S(RegulationsPage) },
      { path: '/news/:slug', element: S(NewsDetailPage) },
      { path: '/lien-he', element: S(ContactPage) },
      { path: '/cart', element: S(CartPage) },
      { path: '/login', element: S(LoginPage) },
      { path: '/register', element: S(RegisterPage) },
      { path: '/forgot-password', element: S(ForgotPasswordPage) },
      { path: '/reset-password', element: S(ResetPasswordPage) },
      { path: '/checkout/payment-return', element: S(PaymentReturnPage) },
      {
        element: <PrivateRoute />,
        children: [
          { path: '/checkout', element: S(CheckoutPage) },
          { path: '/checkout/success', element: S(CheckoutSuccessPage) },
          { path: '/orders/:id', element: S(OrderDetailPage) },
          { path: '/profile', element: S(ProfilePage) },
          { path: '/profile/addresses', element: S(AddressesPage) },
          { path: '/profile/orders', element: S(OrderHistoryPage) },
          { path: '/profile/wishlist', element: S(WishlistPage) },
        ],
      },
    ],
  },
  {
    path: '/ar/:id',
    element: S(ArPage),
  },
  {
    path: '/admin',
    element: 
    // <AdminRoute>
      <AdminLayout />,
      // {/* </AdminRoute>, */}
    children: [
      { index: true, element: S(AdminDashboardPage) },
      { path: 'products', element: S(AdminProductListPage) },
      { path: 'products/new', element: S(AdminProductFormPage) },
      { path: 'products/:id/edit', element: S(AdminProductFormPage) },
      { path: 'products/:id/hotspots', element: S(AdminHotspotPage) },
      { path: 'orders', element: S(AdminOrderListPage) },
      { path: 'orders/:id', element: S(AdminOrderDetailPage) },
      { path: 'reviews', element: S(AdminReviewListPage) },
      { path: 'users', element: S(AdminUserListPage) },
      { path: 'contacts', element: S(AdminContactListPage) },
    ],
  },
  {
    path: '*',
    element: <div className="flex min-h-screen items-center justify-center text-2xl">404 — Không tìm thấy trang</div>,
  },
]);
