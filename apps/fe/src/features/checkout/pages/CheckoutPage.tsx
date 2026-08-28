import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, X, Copy, Check, QrCode, Truck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useCreateOrder } from '@/features/orders/hooks/useCreateOrder';
import { useCreatePayOSCheckout, usePayOSPaymentStatus } from '@/features/orders/hooks/usePaymentPayOS';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

// ── PayOS QR Modal ──────────────────────────────────────────────────────────
function PayOSModal({
  orderCode,
  qrData,
  checkoutUrl,
  total,
  onClose,
  onPaymentSuccess,
}: {
  orderCode: string;
  qrData: string;
  checkoutUrl: string;
  total: number;
  onClose: () => void;
  onPaymentSuccess: () => void;
}) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();
  const { data: statusData } = usePayOSPaymentStatus(orderCode);

  useEffect(() => {
    if (statusData?.paymentStatus === 'PAID') {
      onPaymentSuccess();
      toast.success(t('checkout.success_msg'));
      navigate(`/checkout/success?orderCode=${orderCode}`);
    }
  }, [statusData?.paymentStatus, navigate, orderCode, onPaymentSuccess]);

  const handleCopy = () => {
    navigator.clipboard.writeText(checkoutUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[8px] w-full max-w-sm shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#D4B896]/50">
          <div>
            <p className="text-[10px] tracking-widest text-[#ab2124] uppercase">PayOS</p>
            <h2 className="text-base font-semibold text-[#ab2124] text-title-gradient">{t('checkout.qr_title')}</h2>
          </div>
          <button onClick={onClose} className="text-[#ab2124] hover:text-[#ab2124] transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* QR Code */}
          <div className="flex justify-center">
            <div className="p-3 bg-white border border-[#D4B896] rounded-[6px] inline-block">
              {qrData.startsWith('http') ? (
                <img src={qrData} alt="QR thanh toán" width={200} height={200} />
              ) : (
                <QRCodeSVG
                  value={qrData}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#1a0a00"
                  level="M"
                />
              )}
            </div>
          </div>

          {/* Amount */}
          <div className="text-center">
            <p className="text-xs text-[#ab2124]">{t('checkout.qr_amount')}</p>
            <p className="text-2xl font-bold text-[#7B1C2E]">
              {total.toLocaleString('vi-VN')}
              <span className="text-sm font-normal ml-1">₫</span>
            </p>
          </div>

          {/* Hướng dẫn */}
          <div className="bg-[#EDE3CE] rounded-[6px] p-3 space-y-1.5 text-xs text-[#ab2124]">
            <p className="font-semibold text-[#ab2124]">{t('checkout.qr_guide_title')}</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>{t('checkout.qr_step_1')}</li>
              <li>{t('checkout.qr_step_2')}</li>
              <li>{t('checkout.qr_step_3')}</li>
            </ol>
          </div>

          {/* Polling status */}
          <div className="flex items-center justify-center gap-2 text-xs text-[#ab2124]">
            <Loader2 size={12} className="animate-spin" />
            {t('checkout.qr_waiting')}
          </div>

          {/* Copy link fallback */}
          <div className="flex gap-2">
            <input
              readOnly
              value={checkoutUrl}
              className="flex-1 min-w-0 px-3 py-2 border border-[#D4B896] bg-white rounded-sm text-[10px] text-[#ab2124] truncate"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-2 border border-[#D4B896] rounded-sm text-xs text-[#ab2124] hover:bg-[#EDE3CE] transition-colors flex items-center gap-1"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? t('checkout.copied_btn') : t('checkout.copy_btn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CheckoutPage ─────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'en' ? 'en' : 'vi') as 'vi' | 'en';

  const getLocalizedValue = (val: string | { vi: string; en: string } | undefined, lang: 'vi' | 'en') => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[lang] || val.vi || '';
  };

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [street, setStreet] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'payos'>('cod');
  const [error, setError] = useState('');

  // PayOS modal state
  const [payosModal, setPayosModal] = useState<{
    orderCode: string;
    qrData: string;
    checkoutUrl: string;
    total: number;
  } | null>(null);

  const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder();
  const { mutate: createPayOSCheckout, isPending: isCreatingQR } = useCreatePayOSCheckout();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isPending = isCreatingOrder || isCreatingQR;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) { setError(t('checkout.err_name')); return; }
    if (!phone.trim()) { setError(t('checkout.err_phone')); return; }
    if (!province.trim()) { setError(t('checkout.err_province')); return; }
    if (!street.trim()) { setError(t('checkout.err_street')); return; }
    if (cartItems.length === 0) { setError(t('checkout.err_empty')); return; }

    createOrder(
      {
        shippingAddress: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          province: province.trim(),
          district: district.trim(),
          ward: ward.trim(),
          street: street.trim(),
        },
        // CartContext lưu item.id = productId
        items: cartItems.map((item) => ({ productId: item.id, quantity: item.quantity })),
        paymentMethod,
        customerNote: note.trim(),
      },
      {
        onSuccess: (order) => {
          if (paymentMethod === 'cod') {
            clearCart();
            navigate(`/checkout/success?orderCode=${order.orderCode}`);
            return;
          }
          createPayOSCheckout(
            {
              orderCode: order.orderCode,
              buyerName: order.shippingAddress.fullName,
              buyerEmail: '',
              buyerPhone: order.shippingAddress.phone,
              buyerAddress: [
                order.shippingAddress.street,
                order.shippingAddress.ward,
                order.shippingAddress.district,
                order.shippingAddress.province,
              ].filter(Boolean).join(', '),
            },
            {
              onSuccess: (data) => {
                setPayosModal({
                  orderCode: order.orderCode,
                  qrData: data!.qrCode,
                  checkoutUrl: data!.checkoutUrl,
                  total: order.total,
                });
              },
              onError: (err: any) => {
                const msg = err?.response?.data?.message || t('checkout.err_qr_failed');
                setError(msg);
                toast.error(msg);
              },
            }
          );
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || err?.message || t('checkout.err_order_failed');
          setError(msg);
          toast.error(msg);
        },
      }
    );
  };

  return (
    <div className="container mx-auto px-6 md:px-8 py-10 space-y-8">
      {/* PayOS Modal */}
      {payosModal && (
        <PayOSModal
          orderCode={payosModal.orderCode}
          qrData={payosModal.qrData}
          checkoutUrl={payosModal.checkoutUrl}
          total={payosModal.total}
          onClose={() => setPayosModal(null)}
          onPaymentSuccess={clearCart}
        />
      )}

      {/* Title */}
      <div className="border-b border-[#D4B896] pb-4">
        <h1 className="text-3xl md:text-4xl font-normal text-[#ab2124] text-title-gradient">{t('checkout.title')}</h1>
        <p className="text-xs text-[#ab2124] mt-1">
          {t('checkout.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {error && (
          <div className="lg:col-span-12 p-4 bg-[#fff8e7] border-2 border-[#7B1C2E] rounded-[6px] text-[#7B1C2E] text-sm">
            ❌ {error}
          </div>
        )}

        {/* Left — shipping + payment */}
        <div className="lg:col-span-8 space-y-6">
          {/* Shipping */}
          <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[6px] p-6 space-y-4">
            <h3 className="text-xl font-bold text-[#ab2124] border-b border-[#D4B896]/30 pb-2">
              {t('checkout.section_address')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">{t('checkout.name_label')}</label>
                <input type="text" required placeholder="Nguyễn Văn A" value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11 px-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">{t('checkout.phone_label')}</label>
                <input type="tel" required placeholder="0901234567" value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">{t('checkout.province_label')}</label>
                <input type="text" required placeholder="Hà Nội" value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full h-11 px-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">{t('checkout.district_label')}</label>
                <input type="text" required placeholder="Ba Đình" value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full h-11 px-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">{t('checkout.ward_label')}</label>
                <input type="text" required placeholder="Quán Thánh" value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full h-11 px-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">{t('checkout.street_label')}</label>
              <input type="text" required placeholder="Số 10 Hùng Vương" value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full h-11 px-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">{t('checkout.note_label')}</label>
              <textarea rows={2} placeholder={t('checkout.note_placeholder')} value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
            </div>
          </div>

          {/* Payment method */}
          <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[6px] p-6 space-y-3">
            <h3 className="text-xl font-bold text-[#ab2124] border-b border-[#D4B896]/30 pb-2">
              {t('checkout.section_payment')}
            </h3>

            {/* COD */}
            <button
              type="button"
              onClick={() => setPaymentMethod('cod')}
              className={`w-full flex items-center gap-3 p-4 border rounded-[4px] transition-all text-left ${
                paymentMethod === 'cod'
                  ? 'border-[#3A6B4A] bg-[rgba(58,107,74,0.06)]'
                  : 'border-[#D4B896] bg-transparent hover:border-[#ab2124]'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-[#3A6B4A]' : 'border-[#D4B896]'}`}>
                {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-[#3A6B4A]" />}
              </div>
              <Truck size={20} className={paymentMethod === 'cod' ? 'text-[#3A6B4A]' : 'text-[#ab2124]'} />
              <div>
                <p className="font-bold text-sm text-[#ab2124]">{t('checkout.cod_title')}</p>
                <p className="text-xs text-[#ab2124] mt-0.5">{t('checkout.cod_desc')}</p>
              </div>
            </button>

            {/* Internet Banking / VietQR */}
            <button
              type="button"
              onClick={() => setPaymentMethod('payos')}
              className={`w-full flex items-center gap-3 p-4 border rounded-[4px] transition-all text-left ${
                paymentMethod === 'payos'
                  ? 'border-[#C9973A] bg-[#fff8e7]'
                  : 'border-[#D4B896] bg-transparent hover:border-[#ab2124]'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${paymentMethod === 'payos' ? 'border-[#C9973A]' : 'border-[#D4B896]'}`}>
                {paymentMethod === 'payos' && <div className="w-2 h-2 rounded-full bg-[#C9973A]" />}
              </div>
              <QrCode size={20} className={paymentMethod === 'payos' ? 'text-[#C9973A]' : 'text-[#ab2124]'} />
              <div>
                <p className="font-bold text-sm text-[#ab2124]">{t('checkout.qr_pay_title')}</p>
                <p className="text-xs text-[#ab2124] mt-0.5">{t('checkout.qr_pay_desc')}</p>
              </div>
            </button>

            {paymentMethod === 'payos' && (
              <p className="text-xs text-[#ab2124] pl-1">
                {t('checkout.qr_pay_hint')}
              </p>
            )}
          </div>
        </div>

        {/* Right — order summary */}
        <div className="lg:col-span-4 bg-[#fff8e7] border border-[#D4B896] rounded-[6px] p-6 space-y-6 sticky top-24">
          <h3 className="text-xl font-bold text-[#ab2124] border-b border-[#D4B896]/30 pb-3">
            {t('checkout.summary_title')}
          </h3>

          {cartItems.length === 0 ? (
            <p className="text-sm text-[#ab2124] text-center py-4">{t('checkout.empty_cart')}</p>
          ) : (
            <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 justify-between items-start text-xs">
                  <div className="flex-1">
                    <span className="font-semibold text-[#ab2124]">{getLocalizedValue(item.name, lang)}</span>
                    <span className="text-[#ab2124] ml-1">x {item.quantity}</span>
                  </div>
                  <span className="text-[#7B1C2E] font-medium shrink-0">
                    {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="h-[1px] bg-[#D4B896]/30" />

          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span>{t('cart.subtotal')}</span>
              <span>{total.toLocaleString('vi-VN')} ₫</span>
            </div>
            <div className="flex justify-between">
              <span>{t('cart.shipping')}</span>
              <span className="text-[#3A6B4A]">{t('cart.free_shipping')}</span>
            </div>
            <div className="h-[1px] bg-[#D4B896]/30" />
            <div className="flex justify-between items-baseline">
              <span className="text-[11px] font-bold text-[#ab2124] uppercase">{t('checkout.total_summary')}</span>
              <span className="text-2xl font-bold text-[#7B1C2E]">
                {total.toLocaleString('vi-VN')}
                <span className="text-[11px] font-semibold align-super ml-0.5">₫</span>
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending || cartItems.length === 0}
            className="w-full h-12 bg-[#7B1C2E] hover:bg-[#9B2438] disabled:bg-[#ab2124] disabled:cursor-not-allowed text-[#fff8e7] text-xs font-bold tracking-wider uppercase rounded-[4px] flex items-center justify-center gap-2 active:scale-[0.97] transition-all cursor-pointer"
          >
            {isCreatingOrder ? (
              <><Loader2 size={16} className="animate-spin" />{t('checkout.creating_order')}</>
            ) : isCreatingQR ? (
              <><Loader2 size={16} className="animate-spin" />{t('checkout.creating_qr')}</>
            ) : paymentMethod === 'cod' ? (
              t('checkout.btn_cod')
            ) : (
              t('checkout.btn_qr')
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
