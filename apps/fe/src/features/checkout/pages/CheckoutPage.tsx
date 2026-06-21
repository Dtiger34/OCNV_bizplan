import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Landmark, Loader2 } from 'lucide-react';
import { useCreateOrder } from '@/features/orders/hooks/useCreateOrder';
import { useLocalCartStore } from '@/features/cart/store/cartStore';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const cartStore = useLocalCartStore();
  const navigate = useNavigate();

  // Form States
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [street, setStreet] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer' | 'payos'>('cod');
  const [error, setError] = useState('');

  const { mutate: createOrder, isPending } = useCreateOrder();

  const cartItems = cartStore.items;
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!fullName.trim()) {
      setError('Vui lòng nhập họ tên');
      return;
    }
    if (!phone.trim()) {
      setError('Vui lòng nhập số điện thoại');
      return;
    }
    if (!province.trim()) {
      setError('Vui lòng nhập tỉnh/thành phố');
      return;
    }
    if (!street.trim()) {
      setError('Vui lòng nhập địa chỉ chi tiết');
      return;
    }
    if (cartItems.length === 0) {
      setError('Giỏ hàng đang trống');
      return;
    }

    // Create order
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
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        paymentMethod,
        customerNote: note.trim(),
      },
      {
        onSuccess: (order) => {
          cartStore.clearCart();
          toast.success('Đặt hàng thành công!');

          // Route based on payment method
          if (paymentMethod === 'payos') {
            // Navigate to PayOS checkout page with order data
            navigate('/checkout/payos', { state: { order } });
          } else if (paymentMethod === 'bank_transfer') {
            // Navigate to bank transfer page
            navigate('/checkout/bank-transfer', { state: { order } });
          } else {
            // COD - direct to success
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
      {/* Title */}
      <div className="border-b border-[#D4B896] pb-4 reveal">
        <h1 className="text-3xl md:text-4xl font-normal text-[#2C1A0E]">
          TIẾN HÀNH THANH TOÁN
        </h1>
        <p className="text-xs text-[#9C8670] mt-1">
          Vui lòng nhập thông tin giao nhận và lựa chọn phương thức thanh toán
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Error Message */}
        {error && (
          <div className="lg:col-span-8 p-4 bg-[#FDF6E3] border-2 border-[#7B1C2E] rounded-[6px] text-[#7B1C2E] text-sm">
            ❌ {error}
          </div>
        )}

        {/* Shipping Form Left */}
        <div className="lg:col-span-8 space-y-6 reveal-left">
          <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6 space-y-4">
            <h3 className="text-xl font-bold text-[#2C1A0E] border-b border-[#D4B896]/30 pb-2">
              1. Địa Chỉ Giao Nhận Hàng
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Họ Tên Người Nhận *</label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Số Điện Thoại Liên Hệ *</label>
                <input
                  type="tel"
                  required
                  placeholder="0901234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Tỉnh / Thành Phố *</label>
                <input
                  type="text"
                  required
                  placeholder="Hà Nội"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full h-11 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Quận / Huyện</label>
                <input
                  type="text"
                  placeholder="Ba Đình"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full h-11 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Phường / Xã</label>
                <input
                  type="text"
                  placeholder="Quán Thánh"
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full h-11 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Địa Chỉ Chi Tiết (Số nhà, Đường) *</label>
              <input
                type="text"
                required
                placeholder="Số 10 Hùng Vương"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full h-11 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Ghi chú đơn hàng</label>
              <textarea
                rows={3}
                placeholder="Ghi chú cho đơn vị vận chuyển..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
              />
            </div>
          </div>

          {/* Payment method */}
          <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6 space-y-4">
            <h3 className="text-xl font-bold text-[#2C1A0E] border-b border-[#D4B896]/30 pb-2">
              2. Phương Thức Thanh Toán
            </h3>

            <div className="space-y-3 text-sm">
              <label className="flex items-center gap-3 p-3 border border-[#D4B896] rounded-[4px] cursor-pointer hover:bg-[#F5EDD6]/50">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="w-4 h-4 accent-[#5C3D1E]"
                  disabled={isPending}
                />
                <ShieldCheck size={18} className="text-[#3A6B4A]" />
                <div>
                  <div className="font-bold text-[#2C1A0E]">COD — Thanh toán khi nhận hàng</div>
                  <div className="text-xs text-[#9C8670]">Bạn thanh toán trực tiếp cho nhân viên giao hàng khi nhận được sản phẩm</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-[#D4B896] rounded-[4px] cursor-pointer hover:bg-[#F5EDD6]/50">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={() => setPaymentMethod('bank_transfer')}
                  className="w-4 h-4 accent-[#5C3D1E]"
                  disabled={isPending}
                />
                <Landmark size={18} className="text-[#C9973A]" />
                <div>
                  <div className="font-bold text-[#2C1A0E]">Chuyển Khoản Ngân Hàng</div>
                  <div className="text-xs text-[#9C8670]">Chuyển khoản trực tiếp qua ngân hàng hoặc ví điện tử</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-[#D4B896] rounded-[4px] cursor-pointer hover:bg-[#F5EDD6]/50">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'payos'}
                  onChange={() => setPaymentMethod('payos')}
                  className="w-4 h-4 accent-[#5C3D1E]"
                  disabled={isPending}
                />
                <CreditCard size={18} className="text-[#7B1C2E]" />
                <div>
                  <div className="font-bold text-[#2C1A0E]">PayOS — Thanh toán QR Code</div>
                  <div className="text-xs text-[#9C8670]">Quét mã QR an toàn - hỗ trợ tất cả ngân hàng</div>
                </div>
              </label>
            </div>

            {/* Bank details preview */}
            {paymentMethod === 'bank_transfer' && (
              <div className="mt-4 p-4 bg-[#F5EDD6] border border-[#D4B896] rounded-md space-y-4">
                <div className="text-xs text-[#2C1A0E] space-y-1">
                  <div><strong>Chủ tài khoản:</strong> BAN DO MY NGHE DAI VIET</div>
                  <div><strong>Ngân hàng điện tử:</strong> Vietcombank — Chi nhánh Hà Nội</div>
                  <div><strong>Mã số tài khoản:</strong> 1018889999</div>
                  <div><strong>Cú pháp chuyển khoản:</strong> NGHEXUA [HỌ TÊN BẠN]</div>
                </div>

                {/* Simulated Bank QR Code */}
                <div className="w-36 h-36 bg-white border border-[#D4B896] mx-auto flex items-center justify-center text-[10px] font-bold uppercase text-gray-700">
                  MÃ QR THANH TOÁN
                </div>
              </div>
            )}

            {/* PayOS Info */}
            {paymentMethod === 'payos' && (
              <div className="mt-4 p-4 bg-[#F5EDD6] border border-[#D4B896] rounded-md">
                <p className="text-xs text-[#2C1A0E]">
                  💳 Bạn sẽ được chuyển đến trang thanh toán PayOS. Quét mã QR để thanh toán từ bất kỳ ứng dụng ngân hàng nào.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Right */}
        <div className="lg:col-span-4 bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6 space-y-6 reveal-right">
          <h3 className="text-xl font-bold text-[#2C1A0E] border-b border-[#D4B896]/30 pb-3">
            TÓM TẮT ĐƠN ĐẶT HÀNG
          </h3>

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
            className="w-full h-12 bg-[#7B1C2E] hover:bg-[#9B2438] disabled:bg-[#9C8670] disabled:cursor-not-allowed text-[#F5EDD6] text-xs font-bold tracking-wider uppercase rounded-[4px] flex items-center justify-center gap-2 active:scale-[0.97] transition-all cursor-pointer shadow-subtle"
          >
            {isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                ĐANG TẠO ĐƠN HÀNG...
              </>
            ) : (
              'ĐẶT HÀNG NGAY LẬP TỨC'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
