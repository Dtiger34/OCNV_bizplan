import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useOrder } from '../hooks/useOrders';
import { useTranslation } from 'react-i18next';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useOrder(id!);
  const { t, i18n } = useTranslation();

  const STATUS_STEPS = [
    { key: 'pending', ...t('order_detail.status_steps.pending', { returnObjects: true }) },
    { key: 'packing', ...t('order_detail.status_steps.packing', { returnObjects: true }) },
    { key: 'shipping', ...t('order_detail.status_steps.shipping', { returnObjects: true }) },
    { key: 'delivered', ...t('order_detail.status_steps.delivered', { returnObjects: true }) },
  ] as { key: string; label: string; desc: string }[];

  const STATUS_LABEL = t('order_detail.status_label', { returnObjects: true }) as Record<string, string>;

  if (isLoading) {
    return <div className="flex min-h-[60vh] items-center justify-center text-[#ab2124]">{t('order_detail.loading')}</div>;
  }

  if (isError || !order) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg text-[#ab2124]">{t('order_detail.not_found')}</p>
        <Link to="/profile/orders" className="text-[#C9973A] underline text-sm">← {t('order_detail.back_history')}</Link>
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.findIndex((s) => s.key === order.status);
  const addr = order.shippingAddress;
  const fullAddress = `${addr.street}, ${addr.ward}, ${addr.district}, ${addr.province}`;

  return (
    <div className="container mx-auto px-6 md:px-8 py-10 space-y-8">
      <Link
        to="/profile/orders"
        className="inline-flex items-center gap-2 text-[11px] font-bold tracking-wider text-[#ab2124] hover:text-[#7B1C2E] uppercase transition-colors"
      >
        <ArrowLeft size={14} /> {t('order_detail.back_history')}
      </Link>

      <div className="border-b border-[#D4B896] pb-4 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-normal text-[#ab2124] text-title-gradient">
            {t('order_detail.title')} {order.orderCode}
          </h1>
          <p className="text-xs text-[#ab2124] mt-1">
            {t('order_detail.created_at')} {new Date(order.createdAt).toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'vi-VN')}
          </p>
        </div>
        <span className="text-xs font-bold tracking-wider text-[#ab2124] bg-[rgba(201,151,58,0.12)] border border-[#C9973A] rounded-[4px] px-3 py-1.5 self-start md:self-center">
          {STATUS_LABEL[order.status] ?? order.status}
        </span>
      </div>

      {/* Progress Timeline */}
      <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[6px] p-6">
        <h3 className="text-lg font-bold text-[#ab2124] mb-6">{t('order_detail.timeline_title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {STATUS_STEPS.map((step, idx) => (
            <div key={step.key} className="flex gap-4 items-start">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 text-xs font-bold transition-all ${
                idx <= currentStepIndex
                  ? 'bg-[#ab2124] border-[#ab2124] text-[#fff8e7]'
                  : 'bg-transparent border-[#C9B99A] text-[#ab2124]'
              }`}>
                {idx + 1}
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-wider text-[#ab2124]">{step.label}</h4>
                <p className="text-[11px] text-[#ab2124] mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[6px] p-6 space-y-3">
            <h3 className="text-lg font-bold text-[#ab2124] border-b border-[#D4B896]/30 pb-2">
              {t('order_detail.addr_title')}
            </h3>
            <div className="text-sm text-[#ab2124] space-y-1">
              <div><strong>{t('order_detail.addr_name')}</strong> {addr.fullName}</div>
              <div><strong>{t('order_detail.addr_phone')}</strong> {addr.phone}</div>
              <div><strong>{t('order_detail.addr_address')}</strong> {fullAddress}</div>
              {order.customerNote && (
                <div className="pt-2 italic text-[#ab2124]">
                  <strong>{t('order_detail.addr_note')}</strong> "{order.customerNote}"
                </div>
              )}
            </div>
          </div>

          {/* Items */}
          <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[6px] p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#ab2124] border-b border-[#D4B896]/30 pb-2">
              {t('order_detail.items_title')}
            </h3>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  {item.productImageUrl && (
                    <img
                      src={item.productImageUrl}
                      alt={item.productName}
                      className="w-16 h-16 object-cover border border-[#D4B896] rounded-sm"
                    />
                  )}
                  <div className="flex-1 flex justify-between items-center text-sm">
                    <div>
                      <h4 className="text-base font-bold text-[#ab2124]">{item.productName}</h4>
                      <span className="text-xs text-[#ab2124]">{t('order_detail.qty')} {item.quantity}</span>
                    </div>
                    <span className="font-bold text-[#7B1C2E]">
                      {(item.unitPrice * item.quantity).toLocaleString('vi-VN')} ₫
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Receipt */}
        <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[6px] p-6 space-y-6 self-start">
          <h3 className="text-lg font-bold text-[#ab2124] border-b border-[#D4B896]/30 pb-3">
            {t('order_detail.receipt_title')}
          </h3>
          <div className="space-y-3 text-xs text-[#ab2124]">
            <div className="flex justify-between">
              <span>{t('order_detail.subtotal')}</span>
              <span>{order.subtotal.toLocaleString('vi-VN')} ₫</span>
            </div>
            <div className="flex justify-between">
              <span>{t('order_detail.shipping')}</span>
              <span>{order.shippingFee > 0 ? `${order.shippingFee.toLocaleString('vi-VN')} ₫` : t('order_detail.free_ship')}</span>
            </div>
            <div className="h-[1px] bg-[#D4B896]/30" />
            <div className="flex justify-between items-baseline">
              <span className="text-[11px] font-bold text-[#ab2124] uppercase">{t('order_detail.total')}</span>
              <span className="text-xl font-bold text-[#7B1C2E]">
                {order.total.toLocaleString('vi-VN')} ₫
              </span>
            </div>
          </div>
          <div className="pt-4 border-t border-[#D4B896]/30 text-center">
            <a
              href="mailto:hotro@nghexuanetmoi.vn"
              className="w-full h-10 border border-[#7B1C2E] hover:bg-[#7B1C2E]/5 text-[#7B1C2E] text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 transition-all"
            >
              {t('order_detail.contact_support')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
