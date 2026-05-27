import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface Order {
  id: string; customer: string; email: string; product: string;
  total: number; status: string; date: string; address: string;
}

type OrderStatus = 'pending' | 'paid' | 'shipping' | 'delivered' | 'cancelled';

const STATUS_META: Record<string, { label: string; cls: string }> = {
  pending:   { label: 'Chờ xử lý',     cls: 'bg-yellow-100 text-yellow-700' },
  paid:      { label: 'Đã thanh toán',  cls: 'bg-blue-100 text-blue-700' },
  shipping:  { label: 'Đang giao',      cls: 'bg-purple-100 text-purple-700' },
  delivered: { label: 'Đã giao',        cls: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Đã huỷ',         cls: 'bg-red-100 text-red-700' },
};

const MOCK_ORDERS: Order[] = [
  { id: 'OCNV-2025-0041', customer: 'Nguyễn Thị Lan',   email: 'lan@gmail.com',   product: 'Mô Hình Làng Gốm Bát Tràng',       total: 1250000, status: 'shipping',  date: '26/05/2025', address: 'Q. Hoàn Kiếm, Hà Nội' },
  { id: 'OCNV-2025-0040', customer: 'Trần Minh Quân',   email: 'quan@gmail.com',  product: 'Mô Hình Làng Lụa Vạn Phúc',        total: 1450000, status: 'paid',      date: '25/05/2025', address: 'Q.1, TP. HCM' },
  { id: 'OCNV-2025-0039', customer: 'Lê Thu Hà',        email: 'ha@yahoo.com',    product: 'Mô Hình Làng Hương Quảng Phú Cầu', total: 1350000, status: 'delivered', date: '24/05/2025', address: 'Q. Cầu Giấy, Hà Nội' },
  { id: 'OCNV-2025-0038', customer: 'Phạm Văn Đức',     email: 'duc@gmail.com',   product: 'Mô Hình Làng Nón Làng Chuông',     total: 980000,  status: 'pending',   date: '24/05/2025', address: 'TP. Đà Nẵng' },
  { id: 'OCNV-2025-0037', customer: 'Hoàng Minh Tuấn',  email: 'tuan@gmail.com',  product: 'Mô Hình Làng Tre Phú Vinh',        total: 1100000, status: 'delivered', date: '23/05/2025', address: 'Q. Ba Đình, Hà Nội' },
  { id: 'OCNV-2025-0036', customer: 'Vũ Thị Hoa',       email: 'hoa@gmail.com',   product: 'Mô Hình Làng Gốm Bát Tràng',       total: 1250000, status: 'cancelled', date: '22/05/2025', address: 'TP. Cần Thơ' },
  { id: 'OCNV-2025-0035', customer: 'Bùi Văn Nam',      email: 'nam@company.vn',  product: 'Mô Hình Làng Lụa Vạn Phúc',        total: 2900000, status: 'delivered', date: '21/05/2025', address: 'Q. Đống Đa, Hà Nội' },
  { id: 'OCNV-2025-0034', customer: 'Đỗ Thị Minh',      email: 'minh@gmail.com',  product: 'Mô Hình Làng Hương Quảng Phú Cầu', total: 1350000, status: 'shipping',  date: '20/05/2025', address: 'Q. Bình Thạnh, TP. HCM' },
];

const PAGE_SIZE = 5;

export default function AdminOrderListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  const [page, setPage] = useState(1);

  const filtered = MOCK_ORDERS.filter((o) => {
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    const q = search.toLowerCase();
    return matchStatus && (!q || o.customer.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.email.toLowerCase().includes(q));
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const counts = Object.fromEntries(
    (['all', 'pending', 'paid', 'shipping', 'delivered', 'cancelled'] as const).map((s) => [
      s, s === 'all' ? MOCK_ORDERS.length : MOCK_ORDERS.filter((o) => o.status === s).length
    ])
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Đơn hàng</h1>
        <p className="text-sm text-gray-500 mt-0.5">{MOCK_ORDERS.length} đơn hàng trong hệ thống</p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'paid', 'shipping', 'delivered', 'cancelled'] as const).map((s) => (
          <button key={s} onClick={() => { setFilterStatus(s); setPage(1); }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${filterStatus === s ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {s === 'all' ? 'Tất cả' : STATUS_META[s].label} ({counts[s]})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Tìm mã đơn, khách hàng..." value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full pl-9 pr-4 h-9 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3">Mã đơn</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Khách hàng</th>
              <th className="text-left px-4 py-3 hidden lg:table-cell">Sản phẩm</th>
              <th className="text-right px-4 py-3">Tổng tiền</th>
              <th className="text-left px-4 py-3">Trạng thái</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Ngày đặt</th>
              <th className="px-4 py-3 w-12" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paged.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/admin/orders/${o.id}`)}>
                <td className="px-5 py-3 font-mono text-xs font-semibold text-gray-600">{o.id}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <p className="font-semibold text-gray-800">{o.customer}</p>
                  <p className="text-xs text-gray-400">{o.email}</p>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden lg:table-cell truncate max-w-[180px]">{o.product}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-800">{o.total.toLocaleString('vi-VN')}₫</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${STATUS_META[o.status].cls}`}>{STATUS_META[o.status].label}</span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell">{o.date}</td>
                <td className="px-4 py-3">
                  <Eye size={15} className="text-gray-400 mx-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {paged.length === 0 && <div className="py-12 text-center text-gray-400 text-sm">Không có đơn hàng nào.</div>}

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">Hiển thị {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} / {filtered.length}</span>
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
