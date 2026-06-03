import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderCode = searchParams.get('orderCode') || 'DH-102938';

  return (
    <div className="container mx-auto px-6 md:px-8 py-16 max-w-md text-center">
      <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[8px] p-8 space-y-6 shadow-subtle">
        <CheckCircle className="w-16 h-16 text-[#3A6B4A] mx-auto" />

        <div className="space-y-2">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#7A5A1A] uppercase block">
            ĐẶT HÀNG THÀNH CÔNG
          </span>
          <h1 className="text-3xl font-normal text-[#2C1A0E]">
            Đơn Hàng Ghi Nhận
          </h1>
          <p className="text-xs text-[#9C8670]">
            Đơn đặt hàng của bạn đã chuyển tới xưởng chế tác diorama.
          </p>
        </div>

        <div className="p-4 bg-[#F5EDD6] border border-[#D4B896] rounded-md text-sm text-[#2C1A0E] font-bold">
          MÃ ĐƠN HÀNG: {orderCode}
        </div>

        <p className="text-xs text-[#2C1A0E] leading-relaxed">
          Chúng tôi sẽ sớm liên hệ qua số điện thoại để xác nhận đơn hàng và cập nhật tiến độ giao nhận cho bạn.
        </p>

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
      </div>
    </div>
  );
}
