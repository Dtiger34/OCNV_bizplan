import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Landmark, Loader2, X, Copy, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useCreateOrder } from '@/features/orders/hooks/useCreateOrder';
import { useCreatePayOSCheckout, usePayOSPaymentStatus } from '@/features/orders/hooks/usePaymentPayOS';
import { toast } from 'sonner';

// ── PayOS QR Modal ──────────────────────────────────────────────────────────
function PayOSModal({
  orderCode,
  qrData,
  checkoutUrl,
  total,
  onClose,
}: {
  orderCode: string;
  qrData: string;
  checkoutUrl: string;
  total: number;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const { data: statusData } = usePayOSPaymentStatus(orderCode);

  // Redirect khi thanh toán thành công
  useEffect(() => {
    if (statusData?.paymentStatus === 'PAID') {
      toast.success('Thanh toán thành công!');
      navigate(`/checkout/success?orderCode=${orderCode}`);
    }
  }, [statusData?.paymentStatus, navigate, orderCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(checkoutUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[8px] w-full max-w-sm shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#D4B896]/50">
          <div>
            <p className="text-[10px] tracking-widest text-[#9C8670] uppercase">PayOS</p>
            <h2 className="text-base font-semibold text-[#2C1A0E]">Quét Mã QR Thanh Toán</h2>
          </div>
          <button onClick={onClose} className="text-[#9C8670] hover:text-[#2C1A0E] transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* QR Code */}
          <div className="flex justify-center">
            <div className="p-3 bg-white border border-[#D4B896] rounded-[6px] inline-block">
              <QRCodeSVG
                value={qrData}
                size={200}
                bgColor="#ffffff"
                fgColor="#1a0a00"
                level="M"
              />
            </div>
          </div>

          {/* Amount */}
          <div className="text-center">
            <p className="text-xs text-[#9C8670]">Số tiền cần thanh toán</p>
            <p className="text-2xl font-bold text-[#7B1C2E]">
              {total.toLocaleString('vi-VN')}
              <span className="text-sm font-normal ml-1">₫</span>
            </p>
          </div>

          {/* Hướng dẫn */}
          <div className="bg-[#EDE3CE] rounded-[6px] p-3 space-y-1.5 text-xs text-[#5C3D1E]">
            <p className="font-semibold text-[#2C1A0E]">Cách thanh toán:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Mở app ngân hàng (VPBank, Vietcombank, Techcombank…)</li>
              <li>Chọn "Quét mã QR" hoặc "Chuyển khoản"</li>
              <li>Quét mã bên trên và xác nhận</li>
            </ol>
          </div>

          {/* Polling status */}
          <div className="flex items-center justify-center gap-2 text-xs text-[#9C8670]">
            <Loader2 size={12} className="animate-spin" />
            Đang chờ xác nhận thanh toán...
          </div>

          {/* Copy link fallback */}
          <div className="flex gap-2">
            <input
              readOnly
              value={checkoutUrl}
              className="flex-1 min-w-0 px-3 py-2 border border-[#D4B896] bg-white rounded-sm text-[10px] text-[#9C8670] truncate"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-2 border border-[#D4B896] rounded-sm text-xs text-[#5C3D1E] hover:bg-[#EDE3CE] transition-colors flex items-center gap-1"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Đã copy' : 'Copy'}
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

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [street, setStreet] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer' | 'payos'>('cod');
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

    if (!fullName.trim()) { setError('Vui lòng nhập họ tên'); return; }
    if (!phone.trim()) { setError('Vui lòng nhập số điện thoại'); return; }
    if (!province.trim()) { setError('Vui lòng nhập tỉnh/thành phố'); return; }
    if (!street.trim()) { setError('Vui lòng nhập địa chỉ chi tiết'); return; }
    if (cartItems.length === 0) { setError('Giỏ hàng đang trống'); return; }

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
          if (paymentMethod === 'payos') {
            // Tạo QR ngay trên trang, không navigate đi đâu
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
                  clearCart();
                  setPayosModal({
                    orderCode: order.orderCode,
                    qrData: data!.qrCode,
                    checkoutUrl: data!.checkoutUrl,
                    total: order.total,
                  });
                },
                onError: (err: any) => {
                  const msg = err?.response?.data?.message || 'Không thể tạo QR thanh toán. Vui lòng thử lại.';
                  setError(msg);
                  toast.error(msg);
                },
              }
            );
          } else if (paymentMethod === 'bank_transfer') {
            clearCart();
            toast.success('Đặt hàng thành công!');
            navigate('/checkout/bank-transfer', { state: { order } });
          } else {
            clearCart();
            toast.success('Đặt hàng thành công!');
            navigate(`/checkout/success?orderCode=${order.orderCode}`);
          }
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || err?.message || 'Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.';
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
        />
      )}

      {/* Title */}
      <div className="border-b border-[#D4B896] pb-4">
        <h1 className="text-3xl md:text-4xl font-normal text-[#2C1A0E]">TIẾN HÀNH THANH TOÁN</h1>
        <p className="text-xs text-[#9C8670] mt-1">
          Vui lòng nhập thông tin giao nhận và lựa chọn phương thức thanh toán
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {error && (
          <div className="lg:col-span-12 p-4 bg-[#FDF6E3] border-2 border-[#7B1C2E] rounded-[6px] text-[#7B1C2E] text-sm">
            ❌ {error}
          </div>
        )}

        {/* Left — shipping + payment */}
        <div className="lg:col-span-8 space-y-6">
          {/* Shipping */}
          <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6 space-y-4">
            <h3 className="text-xl font-bold text-[#2C1A0E] border-b border-[#D4B896]/30 pb-2">
              1. Địa Chỉ Giao Nhận Hàng
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Họ Tên Người Nhận *</label>
                <input type="text" required placeholder="Nguyễn Văn A" value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Số Điện Thoại *</label>
                <input type="tel" required placeholder="0901234567" value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Tỉnh / Thành Phố *</label>
                <input type="text" required placeholder="Hà Nội" value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full h-11 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Quận / Huyện</label>
                <input type="text" placeholder="Ba Đình" value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full h-11 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Phường / Xã</label>
                <input type="text" placeholder="Quán Thánh" value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full h-11 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Địa Chỉ Chi Tiết (Số nhà, Đường) *</label>
              <input type="text" required placeholder="Số 10 Hùng Vương" value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full h-11 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Ghi chú đơn hàng</label>
              <textarea rows={2} placeholder="Ghi chú cho đơn vị vận chuyển..." value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
            </div>
          </div>

          {/* Payment method */}
          <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6 space-y-4">
            <h3 className="text-xl font-bold text-[#2C1A0E] border-b border-[#D4B896]/30 pb-2">
              2. Phương Thức Thanh Toán
            </h3>

            <div className="space-y-3 text-sm">
              {[
                {
                  value: 'cod' as const,
                  icon: <ShieldCheck size={18} className="text-[#3A6B4A]" />,
                  title: 'COD — Thanh toán khi nhận hàng',
                  desc: 'Bạn thanh toán trực tiếp cho nhân viên giao hàng khi nhận được sản phẩm',
                },
                {
                  value: 'bank_transfer' as const,
                  icon: <Landmark size={18} className="text-[#C9973A]" />,
                  title: 'Chuyển Khoản Ngân Hàng',
                  desc: 'Chuyển khoản trực tiếp qua ngân hàng hoặc ví điện tử',
                },
                {
                  value: 'payos' as const,
                  icon: <CreditCard size={18} className="text-[#7B1C2E]" />,
                  title: 'PayOS — Thanh toán QR Code',
                  desc: 'Quét mã QR trực tiếp trên trang — hỗ trợ tất cả ngân hàng',
                },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-3 border rounded-[4px] cursor-pointer transition-colors ${
                    paymentMethod === opt.value
                      ? 'border-[#C9973A] bg-[#F5EDD6]'
                      : 'border-[#D4B896] hover:bg-[#F5EDD6]/50'
                  }`}
                >
                  <input type="radio" name="payment" checked={paymentMethod === opt.value}
                    onChange={() => setPaymentMethod(opt.value)}
                    className="w-4 h-4 accent-[#5C3D1E]" disabled={isPending} />
                  {opt.icon}
                  <div>
                    <div className="font-bold text-[#2C1A0E]">{opt.title}</div>
                    <div className="text-xs text-[#9C8670]">{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            {/* Bank transfer info */}
            {paymentMethod === 'bank_transfer' && (
              <div className="mt-2 p-4 bg-[#F5EDD6] border border-[#D4B896] rounded-md text-xs text-[#2C1A0E] space-y-1">
                <div><strong>Chủ tài khoản:</strong> BAN DO MY NGHE DAI VIET</div>
                <div><strong>Ngân hàng:</strong> Vietcombank — Chi nhánh Hà Nội</div>
                <div><strong>Số tài khoản:</strong> 1018889999</div>
                <div><strong>Nội dung CK:</strong> NGHEXUA [HỌ TÊN BẠN]</div>
              </div>
            )}

            {/* PayOS note */}
            {paymentMethod === 'payos' && (
              <div className="mt-2 p-3 bg-[#F5EDD6] border border-[#D4B896] rounded-md text-xs text-[#5C3D1E]">
                💳 Mã QR sẽ hiện ngay trên trang sau khi đặt hàng — không cần rời khỏi trang web.
              </div>
            )}
          </div>
        </div>

        {/* Right — order summary */}
        <div className="lg:col-span-4 bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6 space-y-6 sticky top-24">
          <h3 className="text-xl font-bold text-[#2C1A0E] border-b border-[#D4B896]/30 pb-3">
            TÓM TẮT ĐƠN HÀNG
          </h3>

          {cartItems.length === 0 ? (
            <p className="text-sm text-[#9C8670] text-center py-4">Giỏ hàng trống</p>
          ) : (
            <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 justify-between items-start text-xs">
                  <div className="flex-1">
                    <span className="font-semibold text-[#2C1A0E]">{item.name}</span>
                    <span className="text-[#9C8670] ml-1">x {item.quantity}</span>
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
              <span>Tạm tính:</span>
              <span>{total.toLocaleString('vi-VN')} ₫</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển:</span>
              <span className="text-[#3A6B4A]">Miễn phí</span>
            </div>
            <div className="h-[1px] bg-[#D4B896]/30" />
            <div className="flex justify-between items-baseline">
              <span className="text-[11px] font-bold text-[#5C3D1E] uppercase">Tổng cộng:</span>
              <span className="text-2xl font-bold text-[#7B1C2E]">
                {total.toLocaleString('vi-VN')}
                <span className="text-[11px] font-semibold align-super ml-0.5">₫</span>
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending || cartItems.length === 0}
            className="w-full h-12 bg-[#7B1C2E] hover:bg-[#9B2438] disabled:bg-[#9C8670] disabled:cursor-not-allowed text-[#F5EDD6] text-xs font-bold tracking-wider uppercase rounded-[4px] flex items-center justify-center gap-2 active:scale-[0.97] transition-all cursor-pointer"
          >
            {isCreatingOrder ? (
              <><Loader2 size={16} className="animate-spin" />ĐANG TẠO ĐƠN HÀNG...</>
            ) : isCreatingQR ? (
              <><Loader2 size={16} className="animate-spin" />ĐANG TẠO MÃ QR...</>
            ) : (
              'ĐẶT HÀNG NGAY LẬP TỨC'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
