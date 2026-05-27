import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { User, MapPin, ClipboardList, Heart, Save } from 'lucide-react';

export function ProfileLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  const tabs = [
    { name: 'Thông Tin Tài Khoản', path: '/profile', icon: <User size={16} /> },
    { name: 'Địa Chỉ Nhận Hàng', path: '/profile/addresses', icon: <MapPin size={16} /> },
    { name: 'Lịch Sử Đơn Hàng', path: '/profile/orders', icon: <ClipboardList size={16} /> },
    { name: 'Wishlist Sản Phẩm', path: '/profile/wishlist', icon: <Heart size={16} /> }
  ];

  return (
    <div className="container mx-auto px-6 md:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile Sidebar */}
        <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6 space-y-6 reveal-left">
          <div className="flex items-center gap-3 pb-4 border-b border-[#D4B896]/30">
            <div className="w-12 h-12 rounded-full bg-[#5C3D1E] text-[#F5EDD6] text-2xl font-bold flex items-center justify-center border border-[#C9973A]">
              {user?.name?.[0] || 'V'}
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#2C1A0E]">{user?.name || 'Khách Hàng'}</h4>
              <span className="text-[9px] text-[#9C8670] uppercase">{user?.email || 'Chưa đăng nhập'}</span>
            </div>
          </div>

          <nav className="flex flex-col gap-2 text-sm">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path;
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`flex items-center gap-3 p-3 rounded-[4px] transition-all ${
                    isActive
                      ? 'bg-[#5C3D1E] text-[#F5EDD6] font-semibold'
                      : 'text-[#2C1A0E] hover:bg-[#5C3D1E]/5'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Content Right */}
        <div className="lg:col-span-3 reveal-right">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const [fullName, setFullName] = useState(user?.name || 'Nguyễn Minh Tuấn');
  const [phone, setPhone] = useState('0901234567');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setUser({ ...user, name: fullName });
      alert('Đã cập nhật thông tin tài khoản thành công.');
    }
  };

  return (
    <ProfileLayout>
      <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6 space-y-6">
        <h3 className="text-2xl font-bold text-[#2C1A0E] border-b border-[#D4B896]/30 pb-3">
          THÔNG TIN TÀI KHOẢN CHI TIẾT
        </h3>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Họ Tên Khách Hàng</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-11 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Điện Thoại Liên Kết</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Địa chỉ email (Không đổi)</label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className="w-full h-11 px-3 border border-[#D4B896]/40 bg-[#EDE3CE] rounded-sm text-sm text-gray-500 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#5C3D1E] hover:bg-[#7A5230] text-[#F5EDD6] text-xs font-bold tracking-wider uppercase rounded-sm flex items-center gap-2 active:scale-95 transition-all cursor-pointer shadow-subtle"
          >
            <Save size={16} />
            LƯU THAY ĐỔI
          </button>
        </form>

        {/* Change password section */}
        <div className="border-t border-[#D4B896]/30 pt-6 space-y-4">
          <h4 className="text-lg font-bold text-[#2C1A0E]">Đổi mật khẩu tài khoản</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Mật khẩu hiện tại</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full h-11 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">Mật khẩu mới</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-11 px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
              />
            </div>
          </div>
          
          <button
            onClick={() => {
              if (currentPassword && newPassword) {
                alert('Mật khẩu đã thay đổi thành công.');
                setCurrentPassword('');
                setNewPassword('');
              } else {
                alert('Vui lòng điền đủ mật khẩu hiện tại và mật khẩu mới.');
              }
            }}
            className="px-6 py-2.5 bg-[#7B1C2E] hover:bg-[#9B2438] text-[#F5EDD6] text-xs font-bold tracking-wider uppercase rounded-sm flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            ĐỔI MẬT KHẨU MỚI
          </button>
        </div>
      </div>
    </ProfileLayout>
  );
}
