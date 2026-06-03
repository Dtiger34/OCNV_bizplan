import { useState } from 'react';
import { ShoppingBag, Users, TrendingUp, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminStats, DashboardPeriod } from '../hooks/useAdminDashboard';

const STATUS_META: Record<string, { label: string; cls: string }> = {
  pending:   { label: 'Chờ xử lý',     cls: 'bg-yellow-100 text-yellow-700' },
  packing:   { label: 'Đóng gói',       cls: 'bg-orange-100 text-orange-700' },
  shipping:  { label: 'Đang giao',      cls: 'bg-purple-100 text-purple-700' },
  delivered: { label: 'Đã giao',        cls: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Đã huỷ',         cls: 'bg-red-100 text-red-700' },
};

const PERIODS: { value: DashboardPeriod; label: string }[] = [
  { value: 'today', label: 'Hôm nay' },
  { value: 'week',  label: '7 ngày' },
  { value: 'month', label: '30 ngày' },
  { value: 'year',  label: 'Năm nay' },
];

export default function DashboardPage() {
  const [period, setPeriod] = useState<DashboardPeriod>('month');
  const { data, isLoading } = useAdminStats(period);

  const maxRev = data?.revenueByPeriod?.length
    ? Math.max(...data.revenueByPeriod.map((r) => r.revenue), 1)
    : 1;

  const stats = [
    { label: 'Tổng đơn hàng',    value: data?.totalOrders ?? 0,  icon: <ShoppingBag size={20} />, color: 'text-blue-600',  bg: 'bg-blue-50' },
    { label: 'Doanh thu',         value: data ? `${(data.totalRevenue / 1_000_000).toFixed(1)}M ₫` : '—', icon: <TrendingUp size={20} />, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Người dùng mới',   value: data?.totalUsers ?? 0,    icon: <Users size={20} />,        color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Tổng sản phẩm',    value: data?.totalProducts ?? 0, icon: <Package size={20} />,      color: 'text-amber-600',  bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Tổng quan hoạt động hệ thống</p>
        </div>
        <div className="flex gap-1">
          {PERIODS.map((p) => (
            <button key={p.value} onClick={() => setPeriod(p.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-colors ${period === p.value ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
            <div className={`w-9 h-9 rounded-lg ${s.bg} ${s.color} flex items-center justify-center`}>{s.icon}</div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{isLoading ? '…' : String(s.value)}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-bold text-gray-800">Doanh thu theo kỳ</h2>
          {isLoading ? (
            <div className="h-40 bg-gray-50 rounded-lg animate-pulse" />
          ) : data?.revenueByPeriod?.length ? (
            <div className="flex items-end gap-1 h-40">
              {data.revenueByPeriod.map((r) => (
                <div key={r._id} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-sm bg-blue-500 hover:bg-blue-600 transition-colors min-h-[2px]"
                    style={{ height: `${(r.revenue / maxRev) * 100}%` }}
                    title={`${(r.revenue / 1000).toFixed(0)}K ₫`}
                  />
                  <span className="text-[9px] text-gray-400 truncate w-full text-center">{r._id}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center text-gray-400 text-sm">Chưa có dữ liệu doanh thu.</div>
          )}
        </div>

        {/* Stats summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-bold text-gray-800">Tóm tắt</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Tổng đơn hàng</span><span className="font-semibold">{isLoading ? '…' : data?.totalOrders ?? 0}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Doanh thu</span><span className="font-semibold text-green-600">{isLoading ? '…' : `${((data?.totalRevenue ?? 0) / 1_000_000).toFixed(1)}M ₫`}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Người dùng mới</span><span className="font-semibold">{isLoading ? '…' : data?.totalUsers ?? 0}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Tổng sản phẩm</span><span className="font-semibold">{isLoading ? '…' : data?.totalProducts ?? 0}</span></div>
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
              <th className="text-left px-4 py-3 hidden lg:table-cell">Sản phẩm</th>
              <th className="text-right px-4 py-3">Tổng tiền</th>
              <th className="text-left px-4 py-3">Trạng thái</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Ngày</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400 text-sm">Đang tải...</td></tr>
            )}
            {!isLoading && !data?.recentOrders?.length && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400 text-sm">Chưa có đơn hàng.</td></tr>
            )}
            {data?.recentOrders?.map((o) => {
              const meta = STATUS_META[o.status] ?? { label: o.status, cls: 'bg-gray-100 text-gray-600' };
              return (
                <tr key={o._id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-mono text-xs text-gray-600">{o.orderCode}</td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell truncate max-w-[200px]">
                    {o.items?.[0]?.productName ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800">{o.total.toLocaleString('vi-VN')}₫</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${meta.cls}`}>{meta.label}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell">
                    {new Date(o.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
