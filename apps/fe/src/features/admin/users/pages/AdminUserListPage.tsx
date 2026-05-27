import { useState } from 'react';
import { Search, ShieldCheck, ShieldOff, MoreVertical } from 'lucide-react';

type UserRole = 'customer' | 'admin';
type UserStatus = 'active' | 'inactive';

interface User {
  id: string; name: string; email: string; phone: string;
  role: UserRole; status: UserStatus; orders: number; joined: string;
}

const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Nguyễn Thị Lan',   email: 'lan@gmail.com',   phone: '0912 345 678', role: 'customer', status: 'active',   orders: 4,  joined: '10/01/2025' },
  { id: 'u2', name: 'Trần Minh Quân',   email: 'quan@company.vn', phone: '0987 654 321', role: 'customer', status: 'active',   orders: 2,  joined: '15/02/2025' },
  { id: 'u3', name: 'Lê Thu Hà',        email: 'ha@yahoo.com',    phone: '0909 111 222', role: 'customer', status: 'active',   orders: 7,  joined: '05/01/2025' },
  { id: 'u4', name: 'Phạm Văn Đức',     email: 'duc@gmail.com',   phone: '0903 222 333', role: 'customer', status: 'inactive', orders: 1,  joined: '20/03/2025' },
  { id: 'u5', name: 'Hoàng Minh Tuấn',  email: 'tuan@gmail.com',  phone: '0918 444 555', role: 'customer', status: 'active',   orders: 3,  joined: '12/02/2025' },
  { id: 'u6', name: 'Admin OCNV',        email: 'admin@ocnv.vn',   phone: '0901 000 000', role: 'admin',    status: 'active',   orders: 0,  joined: '01/01/2025' },
];

export default function AdminUserListPage() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<UserStatus | 'all'>('all');

  const filtered = users.filter((u) => {
    const matchRole = filterRole === 'all' || u.role === filterRole;
    const matchStatus = filterStatus === 'all' || u.status === filterStatus;
    const q = search.toLowerCase();
    return matchRole && matchStatus && (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  });

  const toggleStatus = (id: string) =>
    setUsers((p) => p.map((u) => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Người dùng</h1>
        <p className="text-sm text-gray-500 mt-0.5">{users.length} tài khoản trong hệ thống</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Tìm tên, email..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 h-9 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value as UserRole | 'all')}
          className="h-9 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none cursor-pointer">
          <option value="all">Tất cả vai trò</option>
          <option value="customer">Khách hàng</option>
          <option value="admin">Quản trị viên</option>
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as UserStatus | 'all')}
          className="h-9 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none cursor-pointer">
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Đang hoạt động</option>
          <option value="inactive">Đã vô hiệu hoá</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3">Người dùng</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Liên hệ</th>
              <th className="text-center px-4 py-3 hidden lg:table-cell">Đơn hàng</th>
              <th className="text-left px-4 py-3 hidden lg:table-cell">Ngày đăng ký</th>
              <th className="text-left px-4 py-3">Vai trò</th>
              <th className="text-left px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 w-16" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {u.name[0]}
                    </div>
                    <p className="font-semibold text-gray-800">{u.name}</p>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <p className="text-gray-600 text-xs">{u.email}</p>
                  <p className="text-gray-400 text-xs">{u.phone}</p>
                </td>
                <td className="px-4 py-3 text-center text-gray-700 font-semibold hidden lg:table-cell">{u.orders}</td>
                <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">{u.joined}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                    {u.role === 'admin' ? 'Quản trị' : 'Khách hàng'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {u.status === 'active' ? 'Hoạt động' : 'Vô hiệu'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleStatus(u.id)} title={u.status === 'active' ? 'Vô hiệu hoá' : 'Kích hoạt'}
                    className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer mx-auto block">
                    {u.status === 'active' ? <ShieldOff size={15} /> : <ShieldCheck size={15} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="py-12 text-center text-gray-400 text-sm">Không tìm thấy người dùng nào.</div>}
      </div>
    </div>
  );
}
