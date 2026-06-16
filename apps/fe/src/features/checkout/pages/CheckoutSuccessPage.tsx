import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home, Loader2 } from 'lucide-react';
import { useOrder } from '@/features/orders/hooks/useOrders';

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderCode = searchParams.get('orderCode');

  const { data: order, isLoading, error } = useOrder(orderCode || '');

  if (!orderCode) {
    return (
      <div className="container mx-auto px-6 md:px-8 py-16 max-w-md text-center">
        <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[8px] p-8 space-y-4">
          <h2 className="text-2xl font-bold text-[#7B1C2E]">❌ Không tìm thấy đơn hàng</h2>
          <Link to="/shop" className="text-[#C9973A] hover:underline">
            ← Quay lại cửa hàng
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
          <p className="text-[#9C8670]">Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-6 md:px-8 py-16 max-w-md text-center">
        <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[8px] p-8 space-y-4">
          <h2 className="text-2xl font-bold text-[#7B1C2E]">❌ Không tìm thấy đơn hàng</h2>
          <p className="text-sm text-[#9C8670]">{error ? 'Có lỗi xảy ra' : 'Đơn hàng không tồn tại'}</p>
          <Link to="/profile/orders" className="text-[#C9973A] hover:underline">
            ← Xem lịch sử đơn hàng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 md:px-8 py-16 max-w-2xl">
      <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[8px] p-8 space-y-6">
        <div className="text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-[#3A6B4A] mx-auto" />

          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#7A5A1A] uppercase block">
              ĐẶT HÀNG THÀNH CÔNG
            </span>
            <h1 className="text-3xl font-normal text-[#2C1A0E]">Đơn Hàng Ghi Nhận</h1>
            <p className="text-xs text-[#9C8670]">
              Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ sớm liên hệ qua số điện thoại để xác nhận.
            </p>
          </div>

          <div className="p-4 bg-[#F5EDD6] border border-[#D4B896] rounded-md text-sm text-[#2C1A0E] font-bold">
            MÃ ĐƠN HÀNG: {order.orderCode}
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Shipping Info */}
          <div className="space-y-2 p-3 bg-white border border-[#D4B896] rounded-md">
            <h4 className="font-bold text-[#2C1A0E]">📍 Địa chỉ giao nhận</h4>
            <p className="text-[#2C1A0E]">
              {order.shippingAddress.fullName}<br />
              {order.shippingAddress.phone}<br />
              {order.shippingAddress.street}, {order.shippingAddress.ward}<br />
              {order.shippingAddress.district}, {order.shippingAddress.province}
            </p>
          </div>

          {/* Payment Info */}
          <div className="space-y-2 p-3 bg-white border border-[#D4B896] rounded-md">
            <h4 className="font-bold text-[#2C1A0E]">💳 Thông tin thanh toán</h4>
            <p className="text-[#2C1A0E]">
              <strong>Phương thức:</strong> {
                order.payment.method === 'cod' ? 'Thanh toán khi nhận hàng (COD)' :
                order.payment.method === 'bank_transfer' ? 'Chuyển khoản ngân hàng' :
                'PayOS QR Code'
              }
              <br />
              <strong>Trạng thái:</strong> {
                order.payment.status === 'pending' ? '⏳ Chờ thanh toán' :
                order.payment.status === 'paid' ? '✅ Đã thanh toán' :
                '❌ Thanh toán thất bại'
              }
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="space-y-2 p-3 bg-white border border-[#D4B896] rounded-md">
          <h4 className="font-bold text-[#2C1A0E] mb-2">📦 Sản phẩm đặt hàng</h4>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs text-[#2C1A0E]">
                <div>
                  {item.productName} <span className="text-[#9C8670]">x{item.quantity}</span>
                </div>
                <div className="font-bold">{(item.unitPrice * item.quantity).toLocaleString('vi-VN')} ₫</div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#D4B896] mt-3 pt-3 space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Tạm tính:</span>
              <span className="font-bold">{order.subtotal.toLocaleString('vi-VN')} ₫</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển:</span>
              <span className="font-bold">{order.shippingFee.toLocaleString('vi-VN')} ₫</span>
            </div>
            <div className="flex justify-between font-bold text-[#7B1C2E]">
              <span>TỔNG CỘNG:</span>
              <span>{order.total.toLocaleString('vi-VN')} ₫</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-2">
          <Link
            to="/profile/orders"
            className="w-full h-11 bg-[#5C3D1E] hover:bg-[#7A5230] text-[#F5EDD6] text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2"
          >
            Theo dõi Đơn hàng
            <ArrowRight size={14} />
          </Link>

          <Link
            to="/shop"
            className="w-full h-11 border border-[#D4B896] text-[#5C3D1E] hover:bg-[#5C3D1E]/5 text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2"
          >
            <Home size={14} />
            Tiếp tục mua sắm
          </Link>
        </div>

        {/* Help */}
        <div className="text-center text-[10px] text-[#9C8670] space-y-1">
          <p>❓ Cần giúp đỡ?</p>
          <a href="mailto:hotro@nghexuanetmoi.vn" className="text-[#C9973A] hover:underline">
            hotro@nghexuanetmoi.vn
          </a>
        </div>
      </div>
    </div>
  );
}
