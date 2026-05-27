import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useLanguageStore } from '@/store/languageStore';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { user, setUser } = useAuthStore();
  const { language, setLanguage } = useLanguageStore();
  const { setIsCartOpen, cartItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 60) { setVisible(true); }
      else if (y > lastY.current) { setVisible(false); }
      else { setVisible(true); }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Sản phẩm', path: '/shop' },
    { name: 'Câu Chuyện', path: '/villages' },
    { name: 'Quy Định', path: '/quy-dinh' },
  ];

  return (
    <motion.div
      className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none"
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="pointer-events-auto bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full overflow-hidden">
        <div className="flex items-center gap-6 px-6 h-11">

          {/* Logo */}
          <Link
            to="/"
            className="text-white font-semibold text-sm tracking-widest uppercase whitespace-nowrap shrink-0"
          >
            NGHỀ XƯA NÉT MỚI
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 shrink-0">
            <div className="w-px h-4 bg-white/20 mr-5" />
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1 rounded-full text-[13px] transition-colors ${
                  location.pathname === link.path
                    ? 'text-white bg-white/10'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <div className="w-px h-4 bg-white/20" />
            {user ? (
              <>
                <Link to="/profile" className="text-white/60 hover:text-white text-[13px] transition-colors">
                  {user.name}
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-white/60 hover:text-white text-[13px] transition-colors">
                    Admin
                  </Link>
                )}
                <button onClick={() => setUser(null)} className="text-white/40 hover:text-white text-[13px] transition-colors cursor-pointer">
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white/60 hover:text-white text-[13px] transition-colors">
                  Đăng nhập
                </Link>
                <Link to="/register" className="px-4 py-1 bg-white text-black rounded-full text-xs font-semibold hover:bg-white/90 transition-colors">
                  Đăng ký
                </Link>
              </>
            )}
            <button
              onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
              className="text-white/40 hover:text-white text-xs uppercase tracking-widest transition-colors cursor-pointer"
            >
              {language === 'vi' ? 'EN' : 'VI'}
            </button>
          </div>

          {/* Cart */}
          <button onClick={() => setIsCartOpen(true)} className="relative text-white/70 hover:text-white transition-colors cursor-pointer shrink-0">
            <ShoppingBag size={16} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 flex items-center justify-center rounded-full bg-white text-black text-[8px] font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen((v) => !v)} className="md:hidden text-white/70 hover:text-white cursor-pointer shrink-0">
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
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
              <div className="px-6 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)} className="text-white/75 hover:text-white text-sm">
                    {link.name}
                  </Link>
                ))}
                <div className="border-t border-white/10 pt-3 flex gap-3 items-center">
                  {user ? (
                    <button onClick={() => setUser(null)} className="text-white/50 text-sm cursor-pointer">Đăng xuất</button>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setMobileOpen(false)} className="text-white/60 text-sm">Đăng nhập</Link>
                      <Link to="/register" onClick={() => setMobileOpen(false)} className="px-3 py-1 bg-white text-black rounded-full text-xs font-semibold">Đăng ký</Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
