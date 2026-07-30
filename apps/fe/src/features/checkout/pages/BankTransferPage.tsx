import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Copy, Check, Home, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import type { OrderResponse } from '@/features/orders/hooks/useCreateOrder';

export default function BankTransferPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as OrderResponse | undefined;

  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Redirect if no order
  if (!order) {
    return (
      <div className="container mx-auto px-6 py-10 max-w-md text-center">
        <h2 className="text-2xl font-bold text-[#ab2124] mb-4 text-title-gradient">Không tìm thấy đơn hàng</h2>
        <Link to="/checkout" className="text-[#C9973A] hover:underline">
          ← Quay lại thanh toán
        </Link>
      </div>
    );
  }

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const accountOwner = 'BAN DO MY NGHE DAI VIET';
  const accountNumber = '1018889999';
  const bankName = 'Vietcombank';
  const bankBranch = 'Chi nhánh Hà Nội';
  const transferContent = `NGHEXUA ${order.shippingAddress.fullName}`;

  return (
    <div className="container mx-auto px-6 md:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-[#D4B896] pb-4">
        <h1 className="text-3xl md:text-4xl font-normal text-[#ab2124] text-title-gradient">CHUYỂN KHOẢN NGÂN HÀNG</h1>
        <p className="text-xs text-[#ab2124] mt-1">Mã đơn hàng: {order.orderCode}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bank Info */}
          <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[6px] p-8 space-y-6">
            <h3 className="text-xl font-bold text-[#ab2124] text-center">Thông Tin Chuyển Khoản</h3>

            <div className="space-y-4">
              {/* Account Owner */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">
                  Chủ Tài Khoản
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={accountOwner}
                    readOnly
                    className="flex-1 px-4 py-3 bg-white border border-[#D4B896] rounded-sm text-sm text-[#ab2124]"
                  />
                  <button
                    onClick={() => handleCopy(accountOwner, 'owner')}
                    className="px-4 py-3 bg-[#C9973A] hover:bg-[#B08730] text-white rounded-sm flex items-center gap-2 font-bold text-xs"
                  >
                    {copiedField === 'owner' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* Account Number */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">
                  Số Tài Khoản
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={accountNumber}
                    readOnly
                    className="flex-1 px-4 py-3 bg-white border border-[#D4B896] rounded-sm text-sm text-[#ab2124] font-bold"
                  />
                  <button
                    onClick={() => handleCopy(accountNumber, 'account')}
                    className="px-4 py-3 bg-[#C9973A] hover:bg-[#B08730] text-white rounded-sm flex items-center gap-2 font-bold text-xs"
                  >
                    {copiedField === 'account' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* Bank */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">
                    Ngân Hàng
                  </label>
                  <div className="px-4 py-3 bg-[#fff8e7] border border-[#D4B896] rounded-sm text-sm text-[#ab2124] font-bold">
                    {bankName}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">
                    Chi Nhánh
                  </label>
                  <div className="px-4 py-3 bg-[#fff8e7] border border-[#D4B896] rounded-sm text-sm text-[#ab2124]">
                    {bankBranch}
                  </div>
                </div>
              </div>

              {/* Transfer Content */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase">
                  Nội Dung Chuyển Khoản (Lưu Ý)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={transferContent}
                    readOnly
                    className="flex-1 px-4 py-3 bg-white border border-[#D4B896] rounded-sm text-sm text-[#ab2124]"
                  />
                  <button
                    onClick={() => handleCopy(transferContent, 'content')}
                    className="px-4 py-3 bg-[#C9973A] hover:bg-[#B08730] text-white rounded-sm flex items-center gap-2 font-bold text-xs"
                  >
                    {copiedField === 'content' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <p className="text-xs text-[#ab2124]">
                  ⚠️ Để tìm đơn hàng nhanh hơn, vui lòng ghi đúng nội dung chuyển khoản
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[6px] p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#ab2124] border-b border-[#D4B896]/30 pb-2">
              📋 Hướng Dẫn Thanh Toán
            </h3>

            <ol className="space-y-3 text-sm text-[#ab2124]">
              <li className="flex gap-3">
                <span className="font-bold text-[#C9973A] shrink-0">1.</span>
                <span>Mở ứng dụng hoặc website ngân hàng của bạn</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C9973A] shrink-0">2.</span>
                <span>Chọn "Chuyển khoản" hoặc "Transfer"</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C9973A] shrink-0">3.</span>
                <span>
                  Chọn loại chuyển khoản <strong>Chuyển khoản nội bộ/Cùng ngân hàng</strong>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C9973A] shrink-0">4.</span>
                <span>Nhập thông tin tài khoản người nhận từ trên</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C9973A] shrink-0">5.</span>
                <span>
                  Nhập số tiền: <strong className="text-[#7B1C2E]">{order.total.toLocaleString('vi-VN')} ₫</strong>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C9973A] shrink-0">6.</span>
                <span>
                  Ghi nội dung chuyển khoản: <strong>{transferContent}</strong>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C9973A] shrink-0">7.</span>
                <span>Xác nhận và hoàn tất giao dịch</span>
              </li>
            </ol>

            <div className="bg-[#fff8e7] border border-[#D4B896] rounded-md p-4 text-xs text-[#ab2124]">
              ✅ <strong>Lưu ý:</strong> Chúng tôi sẽ xác nhận thanh toán của bạn trong vòng 24 giờ sau khi nhận được tiền.
              Nếu chưa nhận được xác nhận, vui lòng liên hệ hotro@nghexuanetmoi.vn
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[6px] p-6 space-y-6 h-fit">
          <h3 className="text-lg font-bold text-[#ab2124] border-b border-[#D4B896]/30 pb-3">
            Tóm Tắt Đơn Hàng
          </h3>

          <div className="space-y-3 text-xs max-h-[200px] overflow-y-auto pr-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between gap-2">
                <div className="flex-1">
                  <div className="font-bold text-[#ab2124]">{item.productName}</div>
                  <div className="text-[#ab2124]">x{item.quantity}</div>
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
            <div className="border-t border-[#D4B896]/30 pt-2 flex justify-between items-baseline">
              <span className="font-bold text-[#ab2124]">TỔNG:</span>
              <div>
                <div className="text-lg font-bold text-[#7B1C2E]">
                  {order.total.toLocaleString('vi-VN')}
                </div>
                <span className="text-[10px] font-semibold">₫</span>
              </div>
            </div>
          </div>

          <div className="bg-[#fff8e7] border border-[#D4B896] rounded-md p-3 text-[10px] text-[#ab2124] space-y-1">
            <p><strong>Địa chỉ giao:</strong></p>
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.street}, {order.shippingAddress.ward}</p>
            <p>{order.shippingAddress.district}, {order.shippingAddress.province}</p>
          </div>

          <Link
            to="/profile/orders"
            className="block w-full h-11 bg-[#ab2124] hover:bg-[#ab2124] text-[#fff8e7] font-bold rounded-sm flex items-center justify-center gap-2 text-xs"
          >
            Xem Đơn Hàng
          </Link>
        </div>
      </div>
    </div>
  );
}
