import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useLogin } from '../hooks/useAuth';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const login = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password }, {
      onSuccess: (user) => {
        setUser({ _id: user._id, fullName: user.fullName, email: user.email, role: user.role as 'customer' | 'admin', avatarUrl: user.avatarUrl ?? undefined });
        navigate('/');
      },
      onError: () => {
        alert('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
      },
    });
  };

  return (
    <div className="container mx-auto px-6 md:px-8 py-16 max-w-md">
      <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[8px] p-8 space-y-6 shadow-subtle">

        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#7A5A1A] uppercase block">
            ĐĂNG NHẬP HỆ THỐNG
          </span>
          <h2 className="text-3xl font-normal text-[#2C1A0E]">
            Đăng Nhập
          </h2>
          <div className="h-[1px] w-12 bg-[#C9973A]/60 mx-auto pt-1" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase block">
              THƯ ĐIỆN TỬ (EMAIL)
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="tuan.nguyen@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
              />
              <Mail size={16} className="absolute left-3.5 top-3.5 text-[#9C8670]" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">
                MẬT KHẨU
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-[#9C8670] hover:text-[#7B1C2E] underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
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

          <button
            type="submit"
            disabled={login.isPending}
            className="w-full h-12 bg-[#5C3D1E] hover:bg-[#7A5230] text-[#F5EDD6] text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-subtle disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <LogIn size={16} />
            {login.isPending ? 'ĐANG ĐĂNG NHẬP...' : 'ĐĂNG NHẬP NGAY'}
          </button>
        </form>

        <div className="text-center text-xs text-[#9C8670] pt-2 border-t border-[#D4B896]/20">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-[#7B1C2E] hover:underline font-bold">
            Đăng ký tài khoản mới
          </Link>
        </div>
      </div>
    </div>
  );
}
