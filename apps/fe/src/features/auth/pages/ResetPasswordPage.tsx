import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password !== confirmPassword) {
      toast.error('Mật khẩu nhập lại chưa trùng khớp.');
      return;
    }
    
    setSuccess(true);
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <div className="container mx-auto px-6 md:px-8 py-16 max-w-md">
      <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[8px] p-8 space-y-6 shadow-subtle">
        
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#ab2124] uppercase block">
            ĐẶT LẠI MẬT KHẨU
          </span>
          <h2 className="text-3xl font-normal text-[#ab2124] text-title-gradient">
            Đặt Lại Mật Khẩu
          </h2>
          <div className="h-[1px] w-12 bg-[#C9973A]/60 mx-auto pt-1" />
        </div>

        {success ? (
          <div className="p-4 bg-[rgba(58,107,74,0.1)] border border-[#3A6B4A] rounded-md text-center text-sm text-[#3A6B4A] space-y-2">
            <div>Cập nhật mật khẩu thành công!</div>
            <div className="text-xs text-[#ab2124]">Đang chuyển hướng sang trang Đăng nhập...</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase block">
                MẬT KHẨU MỚI
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-[#ab2124]" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#ab2124] uppercase block">
                XÁC NHẬN MẬT KHẨU MỚI
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-[#ab2124]" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-[#ab2124] hover:bg-[#ab2124] text-[#fff8e7] text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-subtle"
            >
              <Check size={16} />
              CẬP NHẬT MẬT KHẨU
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
