import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Mật khẩu chưa trùng khớp.');
      return;
    }
    
    setRegistered(true);
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <div className="container mx-auto px-6 md:px-8 py-12 max-w-md">
      <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[8px] p-8 space-y-6 shadow-subtle">
        
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#7A5A1A] uppercase block">
            ĐĂNG KÝ THÀNH VIÊN
          </span>
          <h2 className="text-3xl font-normal text-[#2C1A0E]">
            Đăng Ký Tài Khoản
          </h2>
          <div className="h-[1px] w-12 bg-[#C9973A]/60 mx-auto pt-1" />
        </div>

        {registered ? (
          <div className="p-4 bg-[rgba(58,107,74,0.1)] border border-[#3A6B4A] rounded-md text-center text-sm text-[#3A6B4A] space-y-2">
            <div>Đăng ký thành công! Link xác thực đã được gửi tới email của bạn.</div>
            <div className="text-xs text-[#9C8670]">Đang chuyển hướng sang trang Đăng nhập...</div>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase block">
                HỌ VÀ TÊN KHÁCH HÀNG
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="••••••••"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
                />
                <User size={16} className="absolute left-3.5 top-3.5 text-[#9C8670]" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase block">
                THƯ ĐIỆN TỬ (EMAIL)
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="••••••••"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
                />
                <Mail size={16} className="absolute left-3.5 top-3.5 text-[#9C8670]" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase block">
                MẬT KHẨU (TỐI THIỂU 8 KÝ TỰ)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-[#9C8670]" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase block">
                XÁC NHẬN MẬT KHẨU
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-[#9C8670]" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-[#5C3D1E] hover:bg-[#7A5230] text-[#F5EDD6] text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-subtle"
            >
              <UserPlus size={16} />
              ĐĂNG KÝ NGAY
            </button>
          </form>
        )}

        <div className="text-center text-xs text-[#9C8670] pt-2 border-t border-[#D4B896]/20">
          Đã có tài khoản từ trước?{' '}
          <Link to="/login" className="text-[#7B1C2E] hover:underline font-bold">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
