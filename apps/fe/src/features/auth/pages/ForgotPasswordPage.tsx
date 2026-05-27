import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, HelpCircle, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="container mx-auto px-6 md:px-8 py-16 max-w-md">
      <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[8px] p-8 space-y-6 shadow-subtle">
        
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#7A5A1A] uppercase block">
            KHÔI PHỤC MẬT KHẨU
          </span>
          <h2 className="text-3xl font-normal text-[#2C1A0E]">
            Quên Mật Khẩu
          </h2>
          <div className="h-[1px] w-12 bg-[#C9973A]/60 mx-auto pt-1" />
        </div>

        {submitted ? (
          <div className="p-4 bg-[rgba(201,151,58,0.12)] border border-[#C9973A] rounded-md text-center text-sm text-[#7A5A1A] space-y-3">
            <div>Yêu cầu khôi phục mật khẩu đã được gửi.</div>
            <p className="text-xs text-[#9C8670]">
              Nếu tài khoản với email <strong>{email}</strong> tồn tại trên hệ thống, bạn sẽ nhận được liên kết thiết lập lại mật khẩu.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-1 text-[#7B1C2E] hover:underline font-bold mt-2"
            >
              <ArrowLeft size={14} /> Quay lại đăng nhập
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-[#9C8670] leading-relaxed">
              Nhập địa chỉ email đăng ký tài khoản của bạn để nhận liên kết khôi phục mật khẩu.
            </p>

            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase block">
                ĐỊA CHỈ THƯ ĐIỆN TỬ
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
                />
                <Mail size={16} className="absolute left-3.5 top-3.5 text-[#9C8670]" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-[#5C3D1E] hover:bg-[#7A5230] text-[#F5EDD6] text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-subtle"
            >
              <HelpCircle size={16} />
              GỬI THƯ KHÔI PHỤC
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-[#D4B896]/20">
          <Link
            to="/login"
            className="text-[11px] font-bold tracking-wider text-[#7B1C2E] hover:underline uppercase transition-all"
          >
            Quay lại Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
