import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Landmark, Truck, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

export default function OrderDetailPage() {
  const { id } = useParams();

  // Mock Order Details matching history
  const order = {
    orderCode: id || 'DH-483921',
    date: '25/05/2026',
    status: 'shipping', // pending | packing | shipping | delivered
    statusText: 'Đang Giao Hàng',
    paymentStatus: 'Đã thanh toán qua VNPay',
    shippingAddress: {
    fullName: 'Nguyễn Minh Tuấn',
      phone: '0901234567',
      street: 'Số 10 Hùng Vương, Phường Quán Thánh, Quận Ba Đình, Hà Nội'
    },
    items: [
      {
        id: 'tieu-canh-bat-trang',
        name: 'Mô Hình Làng Gốm Bát Tràng',
        price: 1250000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=400&q=80',
        material: 'Mica acrylic, Gỗ MDF, Đất sét',
        origin: 'Phân xưởng Nghề Xưa Nét Mới'
      }
    ],
    subtotal: 1250000,
    shippingFee: 30000,
    total: 1280000,
    customerNote: 'Xin giao hàng giờ hành chính, gọi điện trước khi giao.'
  };

  const steps = [
    { label: 'Đang Xử Lý', desc: 'Đã nhận đơn hàng', active: true },
    { label: 'Đóng Gói', desc: 'Đóng gói sản phẩm', active: true },
    { label: 'Đang Giao', desc: 'Đang vận chuyển giao hàng', active: true },
    { label: 'Đã Nhận', desc: 'Đã nhận hàng thành công', active: false }
  ];

  return (
    <div className="container mx-auto px-6 md:px-8 py-10 space-y-8">
      {/* Back link */}
      <Link
        to="/profile/orders"
        className="inline-flex items-center gap-2 text-[11px] font-bold tracking-wider text-[#5C3D1E] hover:text-[#7B1C2E] uppercase transition-colors"
      >
        <ArrowLeft size={14} /> Quay lại lịch sử
      </Link>

      <div className="border-b border-[#D4B896] pb-4 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-normal text-[#2C1A0E]">
            CHI TIẾT ĐƠN HÀNG {order.orderCode}
          </h1>
          <p className="text-xs text-[#9C8670] mt-1">
            Khởi tạo ngày {order.date}
          </p>
        </div>

        <span className="text-xs font-bold tracking-wider text-[#7A5A1A] bg-[rgba(201,151,58,0.12)] border border-[#C9973A] rounded-[4px] px-3 py-1.5 self-start md:self-center">
          {order.statusText}
        </span>
      </div>

      {/* Progress Timeline */}
      <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6">
        <h3 className="text-lg font-bold text-[#2C1A0E] mb-6">Tiến Độ Vận Chuyển Đơn Hàng</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div key={step.label} className="flex gap-4 items-start relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 text-xs font-bold transition-all ${
                  step.active
                    ? 'bg-[#5C3D1E] border-[#5C3D1E] text-[#F5EDD6]'
                    : 'bg-transparent border-[#C9B99A] text-[#9C8670]'
                }`}
              >
                {idx + 1}
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-wider text-[#2C1A0E]">
                  {step.label}
                </h4>
                <p className="text-[11px] text-[#9C8670] mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two columns Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col - Address and items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6 space-y-3">
            <h3 className="text-lg font-bold text-[#2C1A0E] border-b border-[#D4B896]/30 pb-2">
              Thông Tin Địa Chỉ Giao Hàng
            </h3>
            <div className="text-sm text-[#2C1A0E] space-y-1">
              <div><strong>Người nhận hàng:</strong> {order.shippingAddress.fullName}</div>
              <div><strong>Số điện thoại:</strong> {order.shippingAddress.phone}</div>
              <div><strong>Địa chỉ giao nhận:</strong> {order.shippingAddress.street}</div>
              {order.customerNote && (
                <div className="pt-2 italic text-[#9C8670]">
                  <strong>Ghi chú giao nhận:</strong> "{order.customerNote}"
                </div>
              )}
            </div>
          </div>

          {/* Item lists */}
          <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#2C1A0E] border-b border-[#D4B896]/30 pb-2">
              Danh Sách Sản Phẩm
            </h3>
            
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover border border-[#D4B896] rounded-sm"
                  />
                  <div className="flex-1 flex justify-between items-center text-sm">
                    <div>
                      <h4 className="text-base font-bold text-[#2C1A0E]">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#9C8670]">{item.material} — {item.origin}</p>
                      <span className="text-xs text-[#5C3D1E]">Số lượng: {item.quantity}</span>
                    </div>

                    <span className="font-bold text-[#7B1C2E]">
                      {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col - Receipt summary */}
        <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6 space-y-6 self-start">
          <h3 className="text-lg font-bold text-[#2C1A0E] border-b border-[#D4B896]/30 pb-3">
            HÓA ĐƠN THANH TOÁN
          </h3>

          <div className="space-y-3 text-xs text-[#2C1A0E]">
            <div className="flex justify-between">
              <span>Giá tạm tính:</span>
              <span>{order.subtotal.toLocaleString('vi-VN')} ₫</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển:</span>
              <span className="text-[#3A6B4A]">Miễn phí</span>
            </div>
            <div className="h-[1px] bg-[#D4B896]/30" />
            <div className="flex justify-between items-baseline">
              <span className="text-[11px] font-bold text-[#5C3D1E] uppercase">Tổng thanh toán:</span>
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
              LIÊN HỆ TRỢ GIÚP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
