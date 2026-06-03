import { useState } from 'react';
import { Search, ShieldCheck, ShieldOff } from 'lucide-react';
import { useAdminUsers, useUpdateUserStatus } from '../hooks/useAdminUsers';

export default function AdminUserListPage() {
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'locked'>('all');

  const { data, isLoading } = useAdminUsers({
    search: search || undefined,
    status: filterStatus === 'all' ? undefined : filterStatus,
    limit: 50,
  });
  const updateStatus = useUpdateUserStatus();

  const items = data?.items ?? [];

  const handleSearch = () => setSearch(searchInput);
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleSearch(); };

  const handleToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'locked' : 'active';
    await updateStatus.mutateAsync({ id, status: newStatus });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Người dùng</h1>
        <p className="text-sm text-gray-500 mt-0.5">{data?.total ?? 0} tài khoản trong hệ thống</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Tìm tên, email..." value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} onKeyDown={handleKeyDown}
            className="w-full pl-9 pr-4 h-9 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <button onClick={handleSearch} className="px-4 h-9 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 cursor-pointer">Tìm</button>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}
          className="h-9 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none cursor-pointer">
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Đang hoạt động</option>
          <option value="locked">Đã khoá</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3">Người dùng</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Email</th>
              <th className="text-left px-4 py-3">Vai trò</th>
              <th className="text-left px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 w-16" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading && <tr><td colSpan={5} className="py-12 text-center text-gray-400 text-sm">Đang tải...</td></tr>}
            {!isLoading && items.length === 0 && <tr><td colSpan={5} className="py-12 text-center text-gray-400 text-sm">Không tìm thấy người dùng nào.</td></tr>}
            {items.map((u) => {
              const status = (u as any).status ?? 'active';
              return (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {u.avatarUrl ? (
                        <img src={u.avatarUrl} alt={u.fullName} className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {u.fullName[0]}
                        </div>
                      )}
                      <p className="font-semibold text-gray-800">{u.fullName}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-gray-600 text-xs">{u.email}</p>
                    {u.phone && <p className="text-gray-400 text-xs">{u.phone}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                      {u.role === 'admin' ? 'Quản trị' : 'Khách hàng'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {status === 'active' ? 'Hoạt động' : 'Đã khoá'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleToggle(u._id, status)}
                      title={status === 'active' ? 'Khoá tài khoản' : 'Kích hoạt'}
                      className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer mx-auto block">
                      {status === 'active' ? <ShieldOff size={15} /> : <ShieldCheck size={15} />}
                    </button>
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
