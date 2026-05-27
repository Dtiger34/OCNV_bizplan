import { useState } from 'react';
import { Search, Trash2, Eye, MessageSquare, Star, ChevronDown, X, Check } from 'lucide-react';
import { useContactStore, ContactStatus, ContactSubmission } from '@/store/contactStore';

const STATUS_LABEL: Record<ContactStatus, string> = {
  new: 'Mới',
  read: 'Đã đọc',
  replied: 'Đã trả lời',
};

const STATUS_COLOR: Record<ContactStatus, string> = {
  new: 'bg-blue-100 text-blue-700',
  read: 'bg-yellow-100 text-yellow-700',
  replied: 'bg-green-100 text-green-700',
};

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} viewBox="0 0 24 24" className={`w-3.5 h-3.5 ${s <= rating ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function DetailPanel({ contact, onClose }: { contact: ContactSubmission; onClose: () => void }) {
  const { updateStatus, updateNote } = useContactStore();
  const [note, setNote] = useState(contact.note);
  const [saved, setSaved] = useState(false);

  const handleSaveNote = () => {
    updateNote(contact.id, note);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-bold text-gray-800">Chi tiết liên hệ</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Sender info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Họ tên</p>
              <p className="font-semibold text-gray-800">{contact.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Email</p>
              <p className="text-gray-700 break-all">{contact.email}</p>
            </div>
            {contact.phone && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Điện thoại</p>
                <p className="text-gray-700">{contact.phone}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Chủ đề</p>
              <p className="text-gray-700">{contact.subject}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Đánh giá</p>
              <StarRow rating={contact.rating} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Thời gian</p>
              <p className="text-gray-700">{new Date(contact.createdAt).toLocaleString('vi-VN')}</p>
            </div>
          </div>

          {/* Message */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1.5">Nội dung</p>
            <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 leading-relaxed">{contact.message}</p>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1.5">Trạng thái</p>
            <div className="flex gap-2">
              {(['new', 'read', 'replied'] as ContactStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(contact.id, s)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer transition-colors ${
                    contact.status === s
                      ? 'bg-gray-800 text-white border-gray-800'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {STATUS_LABEL[s]}
                </button>
              ))}
            </div>
          </div>

          {/* Internal note */}
          <div className="space-y-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Ghi chú nội bộ</p>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Thêm ghi chú xử lý..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 resize-none"
            />
            <button
              onClick={handleSaveNote}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-gray-800 text-white text-xs font-semibold rounded-lg hover:bg-gray-700 cursor-pointer transition-colors"
            >
              {saved ? <><Check size={12} /> Đã lưu</> : 'Lưu ghi chú'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminContactListPage() {
  const { contacts, updateStatus, deleteContact } = useContactStore();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<ContactStatus | 'all'>('all');
  const [selected, setSelected] = useState<ContactSubmission | null>(null);

  const filtered = contacts.filter((c) => {
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.subject.toLowerCase().includes(q) ||
      c.message.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const counts = {
    all: contacts.length,
    new: contacts.filter((c) => c.status === 'new').length,
    read: contacts.filter((c) => c.status === 'read').length,
    replied: contacts.filter((c) => c.status === 'replied').length,
  };

  const handleOpen = (c: ContactSubmission) => {
    if (c.status === 'new') updateStatus(c.id, 'read');
    setSelected(c);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Liên hệ</h1>
          <p className="text-sm text-gray-500 mt-0.5">Phản hồi và góp ý từ khách hàng</p>
        </div>
        {counts.new > 0 && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
            <MessageSquare size={12} />
            {counts.new} tin nhắn mới
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {([['all', 'Tất cả', 'bg-gray-50 border-gray-200 text-gray-700'], ['new', 'Mới', 'bg-blue-50 border-blue-200 text-blue-700'], ['read', 'Đã đọc', 'bg-yellow-50 border-yellow-200 text-yellow-700'], ['replied', 'Đã trả lời', 'bg-green-50 border-green-200 text-green-700']] as const).map(([key, label, cls]) => (
          <button
            key={key}
            onClick={() => setFilterStatus(key)}
            className={`p-4 rounded-xl border cursor-pointer text-left transition-all ${cls} ${filterStatus === key ? 'ring-2 ring-offset-1 ring-current' : 'hover:opacity-80'}`}
          >
            <p className="text-2xl font-bold">{counts[key]}</p>
            <p className="text-xs font-semibold mt-0.5 uppercase tracking-wide">{label}</p>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email, nội dung..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 h-9 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as ContactStatus | 'all')}
            className="h-9 pl-3 pr-8 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 appearance-none cursor-pointer bg-white"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="new">Mới</option>
            <option value="read">Đã đọc</option>
            <option value="replied">Đã trả lời</option>
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">Không có liên hệ nào.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Người gửi</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Chủ đề</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Đánh giá</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Trạng thái</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Thời gian</th>
                <th className="px-4 py-3 w-20" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  className={`hover:bg-gray-50 transition-colors ${c.status === 'new' ? 'bg-blue-50/40' : ''}`}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
                        {c.name[0].toUpperCase()}
                      </div>
                      <div>
                        <p className={`font-semibold text-gray-800 ${c.status === 'new' ? 'font-bold' : ''}`}>{c.name}</p>
                        <p className="text-xs text-gray-400">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-gray-600 hidden md:table-cell">
                    <p className="truncate max-w-[180px]">{c.subject}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[180px]">{c.message}</p>
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <StarRow rating={c.rating} />
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${STATUS_COLOR[c.status]}`}>
                      {STATUS_LABEL[c.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-400 text-xs hidden lg:table-cell whitespace-nowrap">
                    {new Date(c.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => handleOpen(c)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Xem chi tiết"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => deleteContact(c.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Xóa"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <DetailPanel
          contact={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
