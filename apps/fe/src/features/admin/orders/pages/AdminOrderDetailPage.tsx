import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle2, XCircle, Clock, Check } from 'lucide-react';
import { useAdminOrder, useUpdateOrderStatus } from '../hooks/useAdminOrders';

type OrderStatus = 'pending' | 'packing' | 'shipping' | 'delivered' | 'cancelled';

const STATUS_FLOW: OrderStatus[] = ['pending', 'packing', 'shipping', 'delivered'];
const STATUS_META: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
  pending:   { label: 'Chờ xử lý',    icon: <Clock size={16} />,        cls: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
  packing:   { label: 'Đóng gói',     icon: <Package size={16} />,      cls: 'text-orange-600 bg-orange-50 border-orange-200' },
  shipping:  { label: 'Đang giao',    icon: <Truck size={16} />,        cls: 'text-purple-600 bg-purple-50 border-purple-200' },
  delivered: { label: 'Đã giao',      icon: <CheckCircle2 size={16} />, cls: 'text-green-600 bg-green-50 border-green-200' },
  cancelled: { label: 'Đã huỷ',       icon: <XCircle size={16} />,      cls: 'text-red-600 bg-red-50 border-red-200' },
};

export default function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading } = useAdminOrder(id ?? '');
  const updateStatus = useUpdateOrderStatus();

  const [trackingInput, setTrackingInput] = useState('');
  const [noteInput, setNoteInput] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | ''>('');
  const [saved, setSaved] = useState(false);

  const currentStatus = (order?.status ?? 'pending') as OrderStatus;
  const currentIdx = STATUS_FLOW.indexOf(currentStatus);

  const handleSave = async () => {
    if (!id) return;
    const status = selectedStatus || currentStatus;
    await updateStatus.mutateAsync({ id, status, note: noteInput || undefined });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="h-8 w-48 bg-gray-100 animate-pulse rounded" />
        <div className="h-40 bg-gray-100 animate-pulse rounded-xl" />
      </div>
    );
  }

  if (!order) {
    return <div className="text-gray-400 text-sm">Không tìm thấy đơn hàng.</div>;
  }

  const addr = order.shippingAddress;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/admin/orders" className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Chi tiết đơn hàng</h1>
          <p className="text-sm text-gray-400 font-mono">{order.orderCode}</p>
        </div>
      </div>

      {/* Status progress */}
      {currentStatus !== 'cancelled' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2">
            {STATUS_FLOW.map((s, i) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div className={`flex flex-col items-center gap-1 flex-1 ${i <= currentIdx ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${i < currentIdx ? 'bg-green-500 border-green-500 text-white' : i === currentIdx ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                    {i < currentIdx ? <Check size={14} /> : STATUS_META[s].icon}
                  </div>
                  <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight">{STATUS_META[s].label}</span>
                </div>
                {i < STATUS_FLOW.length - 1 && (
                  <div className={`h-0.5 flex-1 mb-4 rounded ${i < currentIdx ? 'bg-green-400' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-5">
          {/* Items */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide flex items-center gap-2"><Package size={15} /> Sản phẩm đặt mua</h2>
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-t border-gray-100">
                {item.productImageUrl && (
                  <img src={item.productImageUrl} alt={item.productName} className="w-14 h-14 rounded-lg object-cover border border-gray-100" />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.productName}</p>
                  <p className="text-xs text-gray-400">SL: {item.quantity}</p>
                </div>
                <p className="font-bold text-gray-800">{(item.unitPrice * item.quantity).toLocaleString('vi-VN')}₫</p>
              </div>
            ))}
            <div className="border-t border-gray-100 pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-500"><span>Tạm tính</span><span>{order.subtotal.toLocaleString('vi-VN')}₫</span></div>
              <div className="flex justify-between text-gray-500"><span>Vận chuyển</span><span>{order.shippingFee === 0 ? 'Miễn phí' : `${order.shippingFee.toLocaleString('vi-VN')}₫`}</span></div>
              <div className="flex justify-between font-bold text-gray-800 text-base pt-1 border-t border-gray-100"><span>Tổng cộng</span><span>{order.total.toLocaleString('vi-VN')}₫</span></div>
            </div>
          </div>

          {/* Update controls */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Cập nhật đơn hàng</h2>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Trạng thái</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {(Object.keys(STATUS_META) as OrderStatus[]).map((s) => (
                  <button key={s} onClick={() => setSelectedStatus(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${(selectedStatus || currentStatus) === s ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}>
                    {STATUS_META[s].label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Mã vận đơn</label>
              <input value={trackingInput} onChange={(e) => setTrackingInput(e.target.value)}
                placeholder={order.trackingCode ?? 'Chưa có mã vận đơn'}
                className="mt-1 w-full h-9 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Ghi chú nội bộ</label>
              <textarea rows={2} value={noteInput} onChange={(e) => setNoteInput(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 resize-none" />
            </div>
            <button onClick={handleSave} disabled={updateStatus.isPending}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg text-white cursor-pointer transition-colors ${saved ? 'bg-green-600' : 'bg-gray-800 hover:bg-gray-700'}`}>
              {saved ? <><Check size={14} /> Đã lưu</> : updateStatus.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Địa chỉ giao hàng</h2>
            <div className="space-y-1 text-sm text-gray-600">
              <p className="font-semibold text-gray-800">{addr.fullName}</p>
              <p>{addr.phone}</p>
              <p>{addr.street}, {addr.ward}, {addr.district}, {addr.province}</p>
            </div>
          </div>
          {order.customerNote && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-2">
              <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Ghi chú khách hàng</h2>
              <p className="text-sm text-gray-600">{order.customerNote}</p>
            </div>
          )}
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-2">
            <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Thanh toán</h2>
            <p className="text-sm text-gray-600 capitalize">{order.payment.method}</p>
            <p className="text-xs text-gray-400">Đặt lúc {new Date(order.createdAt).toLocaleString('vi-VN')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
