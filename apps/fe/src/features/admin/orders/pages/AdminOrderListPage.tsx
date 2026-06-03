import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAdminOrders } from '../hooks/useAdminOrders';

const STATUS_META: Record<string, { label: string; cls: string }> = {
  pending:   { label: 'Chờ xử lý',     cls: 'bg-yellow-100 text-yellow-700' },
  packing:   { label: 'Đóng gói',       cls: 'bg-orange-100 text-orange-700' },
  shipping:  { label: 'Đang giao',      cls: 'bg-purple-100 text-purple-700' },
  delivered: { label: 'Đã giao',        cls: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Đã huỷ',         cls: 'bg-red-100 text-red-700' },
};

const STATUSES = ['all', 'pending', 'packing', 'shipping', 'delivered', 'cancelled'] as const;
type StatusFilter = typeof STATUSES[number];

const PAGE_SIZE = 10;

export default function AdminOrderListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<StatusFilter>('all');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useAdminOrders({
    page,
    limit: PAGE_SIZE,
    status: filterStatus === 'all' ? undefined : filterStatus,
    search: search || undefined,
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handleStatusChange = (s: StatusFilter) => { setFilterStatus(s); setPage(1); };
  const handleSearch = (v: string) => { setSearch(v); setPage(1); };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Đơn hàng</h1>
        <p className="text-sm text-gray-500 mt-0.5">{total} đơn hàng trong hệ thống</p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => handleStatusChange(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${filterStatus === s ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {s === 'all' ? 'Tất cả' : STATUS_META[s]?.label ?? s}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Tìm mã đơn, khách hàng..." value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-9 pr-4 h-9 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3">Mã đơn</th>
              <th className="text-right px-4 py-3">Tổng tiền</th>
              <th className="text-left px-4 py-3">Trạng thái</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Ngày đặt</th>
              <th className="px-4 py-3 w-12" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading && (
              <tr><td colSpan={5} className="px-5 py-12 text-center text-gray-400 text-sm">Đang tải...</td></tr>
            )}
            {!isLoading && items.length === 0 && (
              <tr><td colSpan={5} className="py-12 text-center text-gray-400 text-sm">Không có đơn hàng nào.</td></tr>
            )}
            {items.map((o) => {
              const meta = STATUS_META[o.status] ?? { label: o.status, cls: 'bg-gray-100 text-gray-600' };
              return (
                <tr key={o._id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/admin/orders/${o._id}`)}>
                  <td className="px-5 py-3 font-mono text-xs font-semibold text-gray-600">{o.orderCode}</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800">{o.total.toLocaleString('vi-VN')}₫</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${meta.cls}`}>{meta.label}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell">
                    {new Date(o.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-4 py-3"><Eye size={15} className="text-gray-400 mx-auto" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            {total > 0 ? `Hiển thị ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, total)} / ${total}` : '0 kết quả'}
          </span>
          <div className="flex gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 cursor-pointer">
              <ChevronLeft size={15} />
            </button>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 cursor-pointer">
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
