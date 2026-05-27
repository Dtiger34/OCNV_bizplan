import { ShoppingBag, Users, Star, MessageSquare, TrendingUp, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContactStore } from '@/store/contactStore';

const RECENT_ORDERS = [
  { id: 'OCNV-2025-0041', customer: 'Nguyễn Thị Lan', product: 'Mô Hình Làng Gốm Bát Tràng', total: 1250000, status: 'shipping', date: '26/05/2025' },
  { id: 'OCNV-2025-0040', customer: 'Trần Minh Quân', product: 'Mô Hình Làng Lụa Vạn Phúc', total: 1450000, status: 'paid', date: '25/05/2025' },
  { id: 'OCNV-2025-0039', customer: 'Lê Thu Hà', product: 'Mô Hình Làng Hương Quảng Phú Cầu', total: 1350000, status: 'delivered', date: '24/05/2025' },
  { id: 'OCNV-2025-0038', customer: 'Phạm Văn Đức', product: 'Mô Hình Làng Nón Làng Chuông', total: 980000, status: 'pending', date: '24/05/2025' },
  { id: 'OCNV-2025-0037', customer: 'Hoàng Minh Tuấn', product: 'Mô Hình Làng Tre Phú Vinh', total: 1100000, status: 'delivered', date: '23/05/2025' },
];

const ORDER_STATUS: Record<string, { label: string; cls: string }> = {
  pending:   { label: 'Chờ xử lý',  cls: 'bg-yellow-100 text-yellow-700' },
  paid:      { label: 'Đã thanh toán', cls: 'bg-blue-100 text-blue-700' },
  shipping:  { label: 'Đang giao',   cls: 'bg-purple-100 text-purple-700' },
  delivered: { label: 'Đã giao',     cls: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Đã huỷ',      cls: 'bg-red-100 text-red-700' },
};

const MONTHLY_REVENUE = [420, 610, 530, 780, 920, 860, 1040, 970, 1200, 1150, 1380, 1260];
const MAX_REV = Math.max(...MONTHLY_REVENUE);
const MONTHS = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];

export default function DashboardPage() {
  const contacts = useContactStore((s) => s.contacts);
  const newContacts = contacts.filter((c) => c.status === 'new').length;

  const stats = [
    { label: 'Tổng đơn hàng', value: '1.247', change: '+12%', icon: <ShoppingBag size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Doanh thu tháng', value: '42.8M ₫', change: '+8.3%', icon: <TrendingUp size={20} />, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Người dùng', value: '3.891', change: '+5.1%', icon: <Users size={20} />, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Sản phẩm', value: '48', change: '+3', icon: <Package size={20} />, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Đánh giá mới', value: '24', change: 'tuần này', icon: <Star size={20} />, color: 'text-pink-600', bg: 'bg-pink-50' },
    { label: 'Liên hệ mới', value: String(newContacts), change: 'chưa đọc', icon: <MessageSquare size={20} />, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Tổng quan hoạt động hệ thống</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
            <div className={`w-9 h-9 rounded-lg ${s.bg} ${s.color} flex items-center justify-center`}>{s.icon}</div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
            <span className="text-[11px] font-semibold text-green-600">{s.change}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-800">Doanh thu theo tháng (triệu ₫)</h2>
            <span className="text-xs text-gray-400">2025</span>
          </div>
          <div className="flex items-end gap-2 h-40">
            {MONTHLY_REVENUE.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-sm bg-blue-500 hover:bg-blue-600 transition-colors"
                  style={{ height: `${(v / MAX_REV) * 100}%` }}
                  title={`${v}M ₫`}
                />
                <span className="text-[9px] text-gray-400">{MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent contacts */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-800">Liên hệ gần đây</h2>
            <Link to="/admin/contacts" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
              Xem tất cả <ArrowRight size={11} />
            </Link>
          </div>
          <div className="space-y-3">
            {contacts.slice(0, 4).map((c) => (
              <div key={c.id} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
                  {c.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-700 truncate">{c.name}</p>
                  <p className="text-xs text-gray-400 truncate">{c.subject}</p>
                </div>
                {c.status === 'new' && (
                  <span className="shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-800">Đơn hàng gần đây</h2>
          <Link to="/admin/orders" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
            Xem tất cả <ArrowRight size={11} />
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="text-left px-6 py-3">Mã đơn</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Khách hàng</th>
              <th className="text-left px-4 py-3 hidden lg:table-cell">Sản phẩm</th>
              <th className="text-right px-4 py-3">Tổng tiền</th>
              <th className="text-left px-4 py-3">Trạng thái</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Ngày</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {RECENT_ORDERS.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-mono text-xs text-gray-600">{o.id}</td>
                <td className="px-4 py-3 text-gray-700 hidden md:table-cell">{o.customer}</td>
                <td className="px-4 py-3 text-gray-500 hidden lg:table-cell truncate max-w-[200px]">{o.product}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-800">{o.total.toLocaleString('vi-VN')}₫</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${ORDER_STATUS[o.status].cls}`}>
                    {ORDER_STATUS[o.status].label}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
