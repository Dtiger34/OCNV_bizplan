import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Home, ShoppingCart } from 'lucide-react';

export default function PaymentReturnPage() {
  const [searchParams] = useSearchParams();
  const result = searchParams.get('result') || 'success';
  const orderCode = searchParams.get('orderCode') || 'DH-999999';

  return (
    <div className="container mx-auto px-6 md:px-8 py-16 max-w-md text-center">
      {result === 'success' ? (
        <div className="bg-[#FDF6E3] border-[2px] border-[#C9973A] rounded-[8px] p-8 space-y-6 shadow-gold-glow">
          <CheckCircle2 className="w-16 h-16 text-[#3A6B4A] mx-auto animate-bounce" />
          
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#C9973A] uppercase block">
              GIAO DỊCH THÀNH CÔNG
            </span>
            <h1 className="text-3xl font-normal text-[#2C1A0E]">
              Thanh Toán Hoàn Tất
            </h1>
            <p className="text-xs text-[#9C8670] mt-1">
              Đơn hàng của bạn đã được ghi nhận thành công trên hệ thống.
            </p>
          </div>

          <div className="p-4 bg-[#F5EDD6] border border-[#D4B896] rounded-md text-sm text-[#2C1A0E]">
            MÃ ĐƠN HÀNG: {orderCode}
          </div>

          <p className="text-xs text-[#2C1A0E] leading-relaxed">
            Hóa đơn điện tử đã được gửi tới hòm thư đăng ký của bạn.
          </p>

          <div className="flex gap-4 pt-2">
            <Link
              to="/profile/orders"
              className="flex-1 h-10 bg-[#5C3D1E] hover:bg-[#7A5230] text-[#F5EDD6] text-[11px] font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 transition-all"
            >
              Xem Đơn Hàng
            </Link>
            <Link
              to="/"
              className="flex-1 h-10 border border-[#D4B896] text-[#5C3D1E] hover:bg-[#5C3D1E]/5 text-[11px] font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <Home size={14} />
              Trang Chủ
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-[#FDF6E3] border-[2px] border-[#7B1C2E] rounded-[8px] p-8 space-y-6 shadow-large">
          <XCircle className="w-16 h-16 text-[#7B1C2E] mx-auto animate-pulse" />

          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#7B1C2E] uppercase block">
              GIAO DỊCH THẤT BẠI
            </span>
            <h1 className="text-3xl font-normal text-[#2C1A0E]">
              Thanh Toán Bị Hủy
            </h1>
            <p className="text-xs text-[#9C8670] mt-1">
              Giao dịch thanh toán không thể hoàn tất hoặc bạn đã chủ động hủy.
            </p>
          </div>

          <div className="p-4 bg-[#F5EDD6] border border-[#D4B896] rounded-md text-sm text-[#2C1A0E]">
            MÃ ĐƠN HÀNG: {orderCode}
          </div>

          <div className="flex gap-4 pt-2">
            <Link
              to="/checkout"
              className="flex-1 h-10 bg-[#7B1C2E] hover:bg-[#9B2438] text-[#F5EDD6] text-[11px] font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 transition-all"
            >
              Thử Lại
            </Link>
            <Link
              to="/shop"
              className="flex-1 h-10 border border-[#D4B896] text-[#5C3D1E] hover:bg-[#5C3D1E]/5 text-[11px] font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <ShoppingCart size={14} />
              Cửa Hàng
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
