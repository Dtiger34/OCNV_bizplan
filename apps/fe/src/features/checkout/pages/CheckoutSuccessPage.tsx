import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home, Loader2 } from 'lucide-react';
import { useOrderByCode } from '@/features/orders/hooks/useOrders';
import { useTranslation } from 'react-i18next';

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderCode = searchParams.get('orderCode');
  const { t } = useTranslation();

  const { data: order, isLoading, error } = useOrderByCode(orderCode || '');

  if (!orderCode) {
    return (
      <div className="container mx-auto px-6 md:px-8 py-16 max-w-md text-center">
        <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[8px] p-8 space-y-4">
          <h2 className="text-2xl font-bold text-[#7B1C2E]">{t('checkout_success.not_found')}</h2>
          <Link to="/shop" className="text-[#C9973A] hover:underline">
            {t('checkout_success.back_to_shop')}
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 md:px-8 py-16 max-w-md text-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#C9973A]" />
          <p className="text-[#ab2124]">{t('checkout_success.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-6 md:px-8 py-16 max-w-md text-center">
        <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[8px] p-8 space-y-4">
          <h2 className="text-2xl font-bold text-[#7B1C2E]">{t('checkout_success.not_found')}</h2>
          <p className="text-sm text-[#ab2124]">{error ? t('checkout_success.error_occurred') : t('checkout_success.not_exist')}</p>
          <Link to="/profile/orders" className="text-[#C9973A] hover:underline">
            {t('checkout_success.view_history')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 md:px-8 py-16 max-w-2xl">
      <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[8px] p-8 space-y-6">
        <div className="text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-[#3A6B4A] mx-auto" />

          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#ab2124] uppercase block">
              {t('checkout_success.success_title')}
            </span>
            <h1 className="text-3xl font-normal text-[#ab2124] text-title-gradient">{t('checkout_success.success_heading')}</h1>
            <p className="text-xs text-[#ab2124]">
              {t('checkout_success.success_desc')}
            </p>
          </div>

          <div className="p-4 bg-[#fff8e7] border border-[#D4B896] rounded-md text-sm text-[#ab2124] font-bold">
            {t('checkout_success.order_code', { code: order.orderCode })}
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Shipping Info */}
          <div className="space-y-2 p-3 bg-white border border-[#D4B896] rounded-md">
            <h4 className="font-bold text-[#ab2124]">{t('checkout_success.shipping_address')}</h4>
            <p className="text-[#ab2124]">
              {order.shippingAddress.fullName}<br />
              {order.shippingAddress.phone}<br />
              {order.shippingAddress.street}, {order.shippingAddress.ward}<br />
              {order.shippingAddress.district}, {order.shippingAddress.province}
            </p>
          </div>

          {/* Payment Info */}
          <div className="space-y-2 p-3 bg-white border border-[#D4B896] rounded-md">
            <h4 className="font-bold text-[#ab2124]">{t('checkout_success.payment_info')}</h4>
            <p className="text-[#ab2124]">
              <strong>{t('checkout_success.method')}</strong> {
                order.payment.method === 'cod' ? t('checkout_success.method_cod') :
                order.payment.method === 'bank_transfer' ? t('checkout_success.method_bank') :
                t('checkout_success.method_qr')
              }
              <br />
              <strong>{t('checkout_success.status')}</strong> {
                order.payment.status === 'pending' ? t('checkout_success.status_pending') :
                order.payment.status === 'paid' ? t('checkout_success.status_paid') :
                t('checkout_success.status_failed')
              }
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="space-y-2 p-3 bg-white border border-[#D4B896] rounded-md">
          <h4 className="font-bold text-[#ab2124] mb-2">{t('checkout_success.order_items')}</h4>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs text-[#ab2124]">
                <div>
                  {item.productName} <span className="text-[#ab2124]">x{item.quantity}</span>
                </div>
                <div className="font-bold">{(item.unitPrice * item.quantity).toLocaleString('vi-VN')} ₫</div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#D4B896] mt-3 pt-3 space-y-1 text-xs">
            <div className="flex justify-between">
              <span>{t('checkout_success.subtotal')}</span>
              <span className="font-bold">{order.subtotal.toLocaleString('vi-VN')} ₫</span>
            </div>
            <div className="flex justify-between">
              <span>{t('checkout_success.shipping_fee')}</span>
              <span className="font-bold">{order.shippingFee.toLocaleString('vi-VN')} ₫</span>
            </div>
            <div className="flex justify-between font-bold text-[#7B1C2E]">
              <span>{t('checkout_success.total')}</span>
              <span>{order.total.toLocaleString('vi-VN')} ₫</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-2">
          <Link
            to="/profile/orders"
            className="w-full h-11 bg-[#ab2124] hover:bg-[#ab2124] text-[#fff8e7] text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2"
          >
            {t('checkout_success.track_order')}
            <ArrowRight size={14} />
          </Link>

          <Link
            to="/shop"
            className="w-full h-11 border border-[#D4B896] text-[#ab2124] hover:bg-[#ab2124]/5 text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2"
          >
            <Home size={14} />
            {t('checkout_success.continue_shopping')}
          </Link>
        </div>

        {/* Help */}
        <div className="text-center text-[10px] text-[#ab2124] space-y-1">
          <p>{t('checkout_success.need_help')}</p>
          <a href="mailto:hotro@nghexuanetmoi.vn" className="text-[#C9973A] hover:underline">
            hotro@nghexuanetmoi.vn
          </a>
        </div>
      </div>
    </div>
  );
}
