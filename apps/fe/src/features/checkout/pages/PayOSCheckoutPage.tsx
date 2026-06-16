import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, QrCode, Copy, Check } from 'lucide-react';
import { useCreatePayOSCheckout } from '@/features/orders/hooks/usePaymentPayOS';
import type { OrderResponse } from '@/features/orders/hooks/useCreateOrder';

export default function PayOSCheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as OrderResponse | undefined;

  const [isCopied, setIsCopied] = useState(false);
  const { mutate: createCheckout, isPending, data: checkoutData, error } = useCreatePayOSCheckout();

  // Redirect if no order in state
  useEffect(() => {
    if (!order) {
      navigate('/checkout');
    }
  }, [order, navigate]);

  // Create PayOS checkout on mount
  useEffect(() => {
    if (order) {
      createCheckout({
        orderCode: order.orderCode,
        buyerName: order.shippingAddress.fullName,
        buyerEmail: '', // Will get from auth context
        buyerPhone: order.shippingAddress.phone,
        buyerAddress: `${order.shippingAddress.street}, ${order.shippingAddress.ward}, ${order.shippingAddress.district}, ${order.shippingAddress.province}`,
      });
    }
  }, [order]);

  if (!order) {
    return null;
  }

  const handleCopyLink = () => {
    if (checkoutData?.checkoutUrl) {
      navigator.clipboard.writeText(checkoutData.checkoutUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-16 h-16 animate-spin text-[#C9973A] mx-auto" />
          <h2 className="text-2xl font-bold text-[#2C1A0E]">Đang tạo mã QR thanh toán...</h2>
          <p className="text-[#9C8670]">Vui lòng chờ một chút</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-10 max-w-md">
        <div className="bg-[#FDF6E3] border-2 border-[#7B1C2E] rounded-[8px] p-8 text-center space-y-4">
          <div className="text-4xl">❌</div>
          <h2 className="text-2xl font-bold text-[#7B1C2E]">Tạo Checkout Thất Bại</h2>
          <p className="text-[#9C8670]">Không thể tạo mã QR thanh toán. Vui lòng thử lại.</p>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full h-11 bg-[#7B1C2E] hover:bg-[#9B2438] text-[#F5EDD6] font-bold rounded-sm"
          >
            Quay Lại
          </button>
        </div>
      </div>
    );
  }

  if (!checkoutData) {
    return null;
  }

  return (
    <div className="container mx-auto px-6 md:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-[#D4B896] pb-4">
        <h1 className="text-3xl md:text-4xl font-normal text-[#2C1A0E]">THANH TOÁN VỚI PAYOS</h1>
        <p className="text-xs text-[#9C8670] mt-1">Mã đơn hàng: {order.orderCode}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* QR Code Section */}
          <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-8 space-y-6">
            <h3 className="text-xl font-bold text-[#2C1A0E] text-center">Quét Mã QR Để Thanh Toán</h3>

            {/* QR Code */}
            <div className="flex justify-center">
              <div className="p-4 bg-white border-2 border-[#D4B896] rounded-lg">
                {checkoutData.qrCode ? (
                  <img
                    src={checkoutData.qrCode}
                    alt="PayOS QR Code"
                    className="w-64 h-64 object-contain"
                  />
                ) : (
                  <div className="w-64 h-64 bg-gray-100 flex items-center justify-center text-sm text-[#9C8670]">
                    QR Code Loading...
                  </div>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-3 text-sm bg-[#F5EDD6] border border-[#D4B896] rounded-md p-4">
              <p className="font-bold text-[#2C1A0E]">📱 Cách thanh toán:</p>
              <ol className="list-decimal list-inside space-y-2 text-[#2C1A0E]">
                <li>Mở ứng dụng ngân hàng (VPBank, Vietcombank, Techcombank, v.v.)</li>
                <li>Chọn "Quét mã QR" hoặc "Chuyển khoản"</li>
                <li>Quét mã QR ở trên</li>
                <li>Xác nhận thông tin và thanh toán</li>
                <li>Bạn sẽ được chuyển hướng về trang thành công</li>
              </ol>
            </div>
          </div>

          {/* Link Section */}
          <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#2C1A0E]">Link Thanh Toán</h3>
            <p className="text-xs text-[#9C8670]">Hoặc sử dụng link dưới đây nếu không thể quét QR:</p>

            <div className="flex gap-2">
              <input
                type="text"
                value={checkoutData.checkoutUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-white border border-[#D4B896] rounded-sm text-xs text-[#9C8670] truncate"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-3 bg-[#C9973A] hover:bg-[#B08730] text-white rounded-sm flex items-center gap-2 font-bold text-xs"
              >
                {isCopied ? (
                  <>
                    <Check size={16} />
                    Đã copy
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy
                  </>
                )}
              </button>
            </div>

            <a
              href={checkoutData.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-11 bg-[#7B1C2E] hover:bg-[#9B2438] text-[#F5EDD6] font-bold rounded-sm flex items-center justify-center text-sm"
            >
              Mở Trang Thanh Toán PayOS
            </a>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6 space-y-6 h-fit">
          <h3 className="text-lg font-bold text-[#2C1A0E] border-b border-[#D4B896]/30 pb-3">
            Tóm Tắt Đơn Hàng
          </h3>

          <div className="space-y-3 text-xs max-h-[200px] overflow-y-auto pr-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between gap-2">
                <div className="flex-1">
                  <div className="font-bold text-[#2C1A0E]">{item.productName}</div>
                  <div className="text-[#9C8670]">x{item.quantity}</div>
                </div>
                <div className="font-bold text-[#7B1C2E] text-right shrink-0">
                  {(item.unitPrice * item.quantity).toLocaleString('vi-VN')} ₫
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#D4B896]/30 pt-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Tạm tính:</span>
              <span className="font-bold">{order.subtotal.toLocaleString('vi-VN')} ₫</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển:</span>
              <span className="font-bold">{order.shippingFee.toLocaleString('vi-VN')} ₫</span>
            </div>
            <div className="border-t border-[#D4B896]/30 pt-2 flex justify-between">
              <span className="font-bold text-[#5C3D1E]">TỔNG:</span>
              <span className="text-lg font-bold text-[#7B1C2E]">
                {order.total.toLocaleString('vi-VN')} ₫
              </span>
            </div>
          </div>

          <div className="bg-[#F5EDD6] border border-[#D4B896] rounded-md p-3 text-[10px] text-[#5C3D1E] space-y-1">
            <p><strong>Địa chỉ giao:</strong></p>
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.street}, {order.shippingAddress.ward}</p>
            <p>{order.shippingAddress.district}, {order.shippingAddress.province}</p>
          </div>
        </div>
      </div>

      {/* Auto-redirect message */}
      <div className="bg-[#F5EDD6] border border-[#D4B896] rounded-md p-4 text-center text-sm text-[#5C3D1E]">
        <QrCode className="w-4 h-4 inline mr-2" />
        Sau khi thanh toán thành công, bạn sẽ được chuyển hướng tự động. Nếu không chuyển hướng, hãy nhấp vào nút bên trên.
      </div>
    </div>
  );
}
