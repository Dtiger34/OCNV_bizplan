import { useState } from 'react';
import { ProfileLayout } from './ProfilePage';
import { Link } from 'react-router-dom';
import { Eye, Truck, CheckCircle2, Clock } from 'lucide-react';
import { useOrders } from '../../orders/hooks/useOrders';

type StatusTab = 'all' | 'pending' | 'shipping' | 'delivered';

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'shipping': return <Truck size={16} className="text-[#C9973A]" />;
    case 'delivered': return <CheckCircle2 size={16} className="text-[#3A6B4A]" />;
    default: return <Clock size={16} className="text-[#ab2124]" />;
  }
};

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    pending: 'Chờ Xử Lý', packing: 'Đóng Gói',
    shipping: 'Đang Giao Hàng', delivered: 'Đã Nhận Hàng', cancelled: 'Đã Huỷ',
  };
  return map[status] ?? status;
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'delivered': return 'border-[#3A6B4A] bg-[rgba(58,107,74,0.1)] text-[#3A6B4A]';
    case 'shipping':  return 'border-[#C9973A] bg-[rgba(201,151,58,0.12)] text-[#ab2124]';
    case 'cancelled': return 'border-[#7B1C2E] bg-[rgba(123,28,46,0.1)] text-[#7B1C2E]';
    default:          return 'border-[#ab2124] bg-[#ab2124]/5 text-[#ab2124]';
  }
};

export default function OrderHistoryPage() {
  const [activeTab, setActiveTab] = useState<StatusTab>('all');
  const { data, isLoading } = useOrders({
    status: activeTab === 'all' ? undefined : activeTab,
  });

  const orders = data?.items ?? [];

  return (
    <ProfileLayout>
      <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[6px] p-6 space-y-6">
        <h3 className="text-2xl font-bold text-[#ab2124] border-b border-[#D4B896]/30 pb-3">
          LỊCH SỬ ĐƠN ĐẶT HÀNG
        </h3>

        <div className="flex border-b border-[#D4B896]/20 gap-4 overflow-x-auto pb-1">
          {([
            { id: 'all', name: 'TẤT CẢ' },
            { id: 'pending', name: 'ĐANG XỬ LÝ' },
            { id: 'shipping', name: 'ĐANG GIAO' },
            { id: 'delivered', name: 'ĐÃ NHẬN' }
          ] as const).map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`text-[11px] font-bold tracking-wider uppercase pb-2 transition-all relative shrink-0 ${activeTab === tab.id ? 'text-[#7B1C2E]' : 'text-[#ab2124] hover:text-[#ab2124]'}`}>
              {tab.name}
              {activeTab === tab.id && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7B1C2E]" />}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {isLoading && <p className="text-sm text-[#ab2124] italic text-center py-8">Đang tải...</p>}
          {!isLoading && orders.length === 0 && (
            <p className="text-sm text-[#ab2124] italic text-center py-8">Chưa có đơn đặt hàng nào trong danh mục này.</p>
          )}
          {orders.map((order) => (
            <div key={order._id}
              className="p-4 border border-[#D4B896] rounded-md bg-[#fff8e7] hover:border-[#C9973A] transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[#ab2124]">{order.orderCode}</span>
                  <span className="text-xs text-[#ab2124]">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#ab2124]">
                  <span className="flex items-center gap-1.5 font-semibold text-[#7B1C2E]">
                    Tổng tiền: {order.total.toLocaleString('vi-VN')} ₫
                  </span>
                  <span className="text-[#ab2124]">|</span>
                  <span>
                    {order.paymentMethod === 'cod' ? 'COD' : 'Internet Banking / VietQR'}
                    {' — '}
                    {order.paymentStatus === 'paid' ? 'Đã thanh toán' : order.paymentMethod === 'cod' ? 'Thanh toán khi nhận' : 'Chờ thanh toán'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className={`flex items-center gap-1 text-[9px] font-semibold tracking-wider uppercase px-2.5 py-0.5 border rounded-sm ${getStatusBadgeClass(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {getStatusText(order.status)}
                </span>
                <Link to={`/orders/${order._id}`} className="p-2 border border-[#D4B896] text-[#ab2124] hover:bg-[#ab2124]/5 rounded-sm">
                  <Eye size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProfileLayout>
  );
}
