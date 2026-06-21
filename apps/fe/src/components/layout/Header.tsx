import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Header() {
  const { user, setUser } = useAuthStore();
  const { setIsCartOpen, cartItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Sản phẩm', path: '/shop' },
    { name: 'Câu Chuyện', path: '/villages' },
    { name: 'Chính sách', path: '/quy-dinh' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#3A1A0A]/90 backdrop-blur-xl border-b border-[#C9973A]/20 shadow-lg">
      <div className="max-w-[1400px] mx-auto px-8 flex items-center h-20">

        {/* Logo — bên trái */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src="/assets/Logo.png"
            alt="Logo"
            className="h-12 w-auto object-contain drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
          />
          <span className="text-white font-semibold text-sm tracking-widest uppercase whitespace-nowrap">
            NGHỀ XƯA NÉT MỚI
          </span>
        </Link>

        {/* Nav — giữa (desktop) */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-full text-[15px] transition-colors ${
                location.pathname === link.path
                  ? 'text-white bg-white/10'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions — bên phải (desktop) */}
        <div className="hidden md:flex items-center gap-3 shrink-0 ml-auto">
          <div className="w-px h-5 bg-white/20" />
          {user ? (
            <>
              <Link to="/profile" className="text-white/60 hover:text-white text-[14px] transition-colors">
                {user.fullName}
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-white/60 hover:text-white text-[14px] transition-colors">
                  Admin
                </Link>
              )}
              <button onClick={() => setUser(null)} className="text-white/40 hover:text-white text-[14px] transition-colors cursor-pointer">
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white/60 hover:text-white text-[14px] transition-colors">
                Đăng nhập
              </Link>
              <Link to="/register" className="px-4 py-1.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-white/90 transition-colors">
                Đăng ký
              </Link>
            </>
          )}
          <div className="w-px h-5 bg-white/20" />
          <button onClick={() => setIsCartOpen(true)} className="relative text-white/70 hover:text-white transition-colors cursor-pointer">
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 flex items-center justify-center rounded-full bg-white text-black text-[9px] font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="md:hidden flex items-center gap-3 ml-auto">
          <button onClick={() => setIsCartOpen(true)} className="relative text-white/70 hover:text-white transition-colors cursor-pointer">
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 flex items-center justify-center rounded-full bg-white text-black text-[9px] font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen((v) => !v)} className="text-white/70 hover:text-white cursor-pointer">
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-white/10"
          >
            <div className="px-8 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                  className="text-white/75 hover:text-white text-base">
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-white/10 pt-3 flex gap-3 items-center">
                {user ? (
                  <button onClick={() => setUser(null)} className="text-white/50 text-sm cursor-pointer">Đăng xuất</button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="text-white/60 text-sm">Đăng nhập</Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="px-3 py-1 bg-white text-black rounded-full text-sm font-semibold">Đăng ký</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
