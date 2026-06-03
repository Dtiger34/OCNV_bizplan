import { useState } from 'react';
import { Search, CheckCircle2, XCircle, Trash2 } from 'lucide-react';
import { useAdminReviews, useUpdateReviewStatus, useDeleteReview } from '../hooks/useAdminReviews';
import { AdminReview } from '../../../../types/api';

type ReviewStatus = 'pending' | 'approved' | 'rejected';

const STATUS_META: Record<ReviewStatus, { label: string; cls: string }> = {
  pending:  { label: 'Chờ duyệt', cls: 'bg-yellow-100 text-yellow-700' },
  approved: { label: 'Đã duyệt',  cls: 'bg-green-100 text-green-700' },
  rejected: { label: 'Từ chối',   cls: 'bg-red-100 text-red-700' },
};

function StarRow({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} viewBox="0 0 24 24" className={`w-3 h-3 ${s <= n ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function AdminReviewListPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<ReviewStatus | 'all'>('all');

  const { data, isLoading } = useAdminReviews({
    status: filterStatus === 'all' ? undefined : filterStatus,
    limit: 50,
  });
  const updateStatus = useUpdateReviewStatus();
  const deleteReview = useDeleteReview();

  const items = (data?.items ?? []) as AdminReview[];

  const filtered = items.filter((r) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      r.user?.fullName?.toLowerCase().includes(q) ||
      r.product?.name?.vi?.toLowerCase().includes(q) ||
      r.content?.toLowerCase().includes(q)
    );
  });

  const counts = {
    all: data?.total ?? 0,
    pending: items.filter((r) => r.status === 'pending').length,
    approved: items.filter((r) => r.status === 'approved').length,
    rejected: items.filter((r) => r.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Đánh giá sản phẩm</h1>
          <p className="text-sm text-gray-500 mt-0.5">{counts.pending} đánh giá chờ duyệt</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {([['all','Tất cả','bg-gray-50 border-gray-200 text-gray-700'],['pending','Chờ duyệt','bg-yellow-50 border-yellow-200 text-yellow-700'],['approved','Đã duyệt','bg-green-50 border-green-200 text-green-700'],['rejected','Từ chối','bg-red-50 border-red-200 text-red-700']] as const).map(([k,l,cls]) => (
          <button key={k} onClick={() => setFilterStatus(k)}
            className={`p-4 rounded-xl border cursor-pointer text-left transition-all ${cls} ${filterStatus === k ? 'ring-2 ring-offset-1 ring-current' : 'hover:opacity-80'}`}>
            <p className="text-2xl font-bold">{counts[k]}</p>
            <p className="text-xs font-semibold uppercase tracking-wide mt-0.5">{l}</p>
          </button>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Tìm theo tên, sản phẩm, nội dung..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 h-9 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3">Người dùng</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Sản phẩm</th>
              <th className="text-left px-4 py-3 hidden lg:table-cell">Nội dung</th>
              <th className="text-left px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 w-28" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading && <tr><td colSpan={5} className="py-12 text-center text-gray-400 text-sm">Đang tải...</td></tr>}
            {!isLoading && filtered.length === 0 && <tr><td colSpan={5} className="py-12 text-center text-gray-400 text-sm">Không có đánh giá nào.</td></tr>}
            {filtered.map((r) => (
              <tr key={r._id} className={`hover:bg-gray-50 ${r.status === 'pending' ? 'bg-yellow-50/30' : ''}`}>
                <td className="px-5 py-3">
                  <p className="font-semibold text-gray-800">{r.user?.fullName ?? 'Ẩn danh'}</p>
                  <StarRow n={r.rating} />
                  <p className="text-xs text-gray-400 mt-0.5">{new Date(r.createdAt).toLocaleDateString('vi-VN')}</p>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs">{r.product?.name?.vi ?? '—'}</td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <p className="text-gray-600 text-xs line-clamp-2 max-w-xs">{r.content}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${STATUS_META[r.status].cls}`}>{STATUS_META[r.status].label}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    {r.status !== 'approved' && (
                      <button onClick={() => updateStatus.mutate({ id: r._id, status: 'approved' })}
                        className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer" title="Duyệt">
                        <CheckCircle2 size={15} />
                      </button>
                    )}
                    {r.status !== 'rejected' && (
                      <button onClick={() => updateStatus.mutate({ id: r._id, status: 'rejected' })}
                        className="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors cursor-pointer" title="Từ chối">
                        <XCircle size={15} />
                      </button>
                    )}
                    <button onClick={() => deleteReview.mutate(r._id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Xóa">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
