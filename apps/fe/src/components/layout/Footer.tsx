import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <footer className="bg-[#3A1A0A] text-[#F5EDD6] border-t border-[#C9973A]/20 pt-16 pb-8 transition-colors">
      {/* 3-Column Minimal Layout */}
      <div className="container mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 pb-12">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <h4 className="text-2xl font-bold tracking-wider text-[#C9973A] uppercase">
            NGHỀ XƯA NÉT MỚI
          </h4>
          <div className="space-y-2 pt-2 text-[#C9B99A] text-sm">
            <div className="flex items-center gap-2.5">
              <MapPin size={15} className="text-[#C9973A]" />
              <span>Phân xưởng Nghề Xưa Nét Mới, Tràng Tiền, Hoàn Kiếm, Hà Nội</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={15} className="text-[#C9973A]" />
              <span>+84 1900 8888</span>
            </div>
          </div>
        </div>

        {/* Column 2: Navigation Links (Grouped lists side-by-side) */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#C9973A] uppercase">
              TIỂU CẢNH LÀNG NGHỀ
            </h4>
            <ul className="text-xs text-[#C9B99A] space-y-3">
              <li>
                <a href="/villages/bat-trang" className="hover:text-[#C9973A] transition-colors block">
                  Làng gốm Bát Tràng
                </a>
              </li>
              <li>
                <a href="/villages/van-phuc" className="hover:text-[#C9973A] transition-colors block">
                  Làng lụa Vạn Phúc
                </a>
              </li>
              <li>
                <a href="/villages/non-chuong" className="hover:text-[#C9973A] transition-colors block">
                  Làng nón Chuông
                </a>
              </li>
              <li>
                <a href="/villages/quang-phu-cau" className="hover:text-[#C9973A] transition-colors block">
                  Làng hương Quảng Phú Cầu
                </a>
              </li>
              <li>
                <a href="/villages/phu-vinh" className="hover:text-[#C9973A] transition-colors block">
                  Làng tre Phú Vinh
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#C9973A] uppercase">
              QUY ĐỊNH & THƯỞNG LÃM
            </h4>
            <ul className="text-xs text-[#C9B99A] space-y-3">
              <li>
                <a href="/pages/shipping-policy" className="hover:text-[#C9973A] transition-colors block">
                  Vận Chuyển Toàn Quốc
                </a>
              </li>
              <li>
                <a href="/pages/return-policy" className="hover:text-[#C9973A] transition-colors block">
                  Bảo Hành Mô Hình (1 Năm)
                </a>
              </li>
              <li>
                <a href="/pages/che-tac" className="hover:text-[#C9973A] transition-colors block">
                  Đặt Làm Theo Yêu Cầu
                </a>
              </li>
              <li>
                <a href="/pages/faq" className="hover:text-[#C9973A] transition-colors block">
                  Hỏi Đáp Điển Lệ
                </a>
              </li>
              <li>
                <Link to="/lien-he" className="hover:text-[#C9973A] transition-colors block">
                  Liên Hệ & Phản Hồi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 3: Newsletter */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#C9973A] uppercase">
            TIN TỨC DI SẢN
          </h4>
          <p className="text-sm text-[#C9B99A] leading-relaxed">
            Đăng ký nhận thông tin về các hộp mô hình tiểu cảnh mới nhất và ưu đãi đặc quyền.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
            <div className="flex gap-2 items-end border-b border-[#D4B896]/60 focus-within:border-[#C9973A] transition-colors pb-1">
              <input
                type="email"
                placeholder="Nghệ nhân @email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-9 bg-transparent text-[#F5EDD6] placeholder-[#9C8670]/80 text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="h-9 px-2 bg-transparent text-[#C9973A] hover:text-[#F5EDD6] transition-colors cursor-pointer flex items-center justify-center"
              >
                <Mail size={16} strokeWidth={1.5} />
              </button>
            </div>
            {submitted && (
              <div className="flex items-center gap-1 text-[#7A9E8E] text-[11px] pt-1">
                <CheckCircle2 size={12} />
                <span>Đăng ký nhận thư điện tử thành công!</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Thin divider line above copyright strip */}
      <div className="container mx-auto px-6 md:px-8 border-t border-[#D4B896]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-[#C9B99A]/50 text-center md:text-left">
          © {new Date().getFullYear()} Nghề Xưa Nét Mới. Bản quyền được bảo hộ.
        </p>

        {/* Social Icons (Thin line symbols) */}
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full border border-[#D4B896]/10 flex items-center justify-center text-[#C9973A]/80 hover:text-[#F5EDD6] hover:border-[#C9973A]/40 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full border border-[#D4B896]/10 flex items-center justify-center text-[#C9973A]/80 hover:text-[#F5EDD6] hover:border-[#C9973A]/40 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
