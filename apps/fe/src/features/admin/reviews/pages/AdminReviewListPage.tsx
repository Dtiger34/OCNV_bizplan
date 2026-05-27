import { useState } from 'react';
import { Search, CheckCircle2, XCircle, Trash2, Star, ChevronDown } from 'lucide-react';

type ReviewStatus = 'pending' | 'approved' | 'rejected';

interface Review {
  id: string; user: string; product: string; rating: number;
  content: string; status: ReviewStatus; date: string;
}

const MOCK_REVIEWS: Review[] = [
  { id: 'r1', user: 'Nguyễn Thị Lan',  product: 'Mô Hình Làng Gốm Bát Tràng',       rating: 5, content: 'Hộp tiểu cảnh Bát Tràng chi tiết đến kinh ngạc. Tôi dùng làm đồ dùng dạy học cho học sinh về văn hóa truyền thống.', status: 'approved', date: '25/05/2025' },
  { id: 'r2', user: 'Trần Minh Quân',  product: 'Mô Hình Làng Lụa Vạn Phúc',        rating: 4, content: 'Mua làm quà tặng đối tác nước ngoài. Ai cũng trầm trồ vì sự tỉ mỉ và câu chuyện văn hóa đằng sau mỗi sản phẩm.', status: 'approved', date: '23/05/2025' },
  { id: 'r3', user: 'Lê Văn Đức',      product: 'Mô Hình Làng Hương Quảng Phú Cầu', rating: 3, content: 'Sản phẩm đẹp nhưng giao hàng hơi chậm so với kỳ vọng.', status: 'pending', date: '26/05/2025' },
  { id: 'r4', user: 'Phạm Thu Hương',  product: 'Mô Hình Làng Nón Làng Chuông',     rating: 5, content: 'Trải nghiệm AR khi quét mã thực sự ấn tượng. Hộp quà nhỏ nhưng mang cả một câu chuyện làng nghề sống động.', status: 'pending', date: '27/05/2025' },
  { id: 'r5', user: 'Hoàng Văn Hùng',  product: 'Mô Hình Làng Gốm Bát Tràng',       rating: 1, content: 'Hàng nhận bị vỡ góc. Rất thất vọng.', status: 'rejected', date: '20/05/2025' },
];

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
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<ReviewStatus | 'all'>('all');

  const filtered = reviews.filter((r) => {
    const matchStatus = filterStatus === 'all' || r.status === filterStatus;
    const q = search.toLowerCase();
    return matchStatus && (!q || r.user.toLowerCase().includes(q) || r.product.toLowerCase().includes(q) || r.content.toLowerCase().includes(q));
  });

  const setStatus = (id: string, s: ReviewStatus) =>
    setReviews((p) => p.map((r) => r.id === id ? { ...r, status: s } : r));
  const remove = (id: string) => setReviews((p) => p.filter((r) => r.id !== id));

  const counts = {
    all: reviews.length,
    pending: reviews.filter((r) => r.status === 'pending').length,
    approved: reviews.filter((r) => r.status === 'approved').length,
    rejected: reviews.filter((r) => r.status === 'rejected').length,
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

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Tìm theo tên, sản phẩm, nội dung..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 h-9 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
        </div>
      </div>

      {/* Table */}
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
            {filtered.map((r) => (
              <tr key={r.id} className={`hover:bg-gray-50 ${r.status === 'pending' ? 'bg-yellow-50/30' : ''}`}>
                <td className="px-5 py-3">
                  <p className="font-semibold text-gray-800">{r.user}</p>
                  <StarRow n={r.rating} />
                  <p className="text-xs text-gray-400 mt-0.5">{r.date}</p>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs">{r.product}</td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <p className="text-gray-600 text-xs line-clamp-2 max-w-xs">{r.content}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${STATUS_META[r.status].cls}`}>{STATUS_META[r.status].label}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    {r.status !== 'approved' && (
                      <button onClick={() => setStatus(r.id, 'approved')} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer" title="Duyệt">
                        <CheckCircle2 size={15} />
                      </button>
                    )}
                    {r.status !== 'rejected' && (
                      <button onClick={() => setStatus(r.id, 'rejected')} className="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors cursor-pointer" title="Từ chối">
                        <XCircle size={15} />
                      </button>
                    )}
                    <button onClick={() => remove(r.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Xóa">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="py-12 text-center text-gray-400 text-sm">Không có đánh giá nào.</div>}
      </div>
    </div>
  );
}
