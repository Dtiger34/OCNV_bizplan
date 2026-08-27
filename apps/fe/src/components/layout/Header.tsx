import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { user, setUser } = useAuthStore();
  const { setIsCartOpen, cartItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: t('header.nav.home'), path: '/' },
    { name: t('header.nav.products'), path: '/shop' },
    { name: t('header.nav.stories'), path: '/villages' },
    { name: t('header.nav.about'), path: '/gioi-thieu' },
    { name: t('header.nav.policies'), path: '/quy-dinh' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ab2124]/90 backdrop-blur-xl border-b border-[#C9973A]/20 shadow-lg">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center h-16 md:h-20">

        {/* Logo — bên trái */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/assets/logo.jpg"
            alt="Logo"
            className="h-9 md:h-12 w-auto object-contain drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
          />
          <span className="font-display hidden sm:block text-white text-sm tracking-widest uppercase whitespace-nowrap">
            {t('header.brand')}
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
                  {t('header.actions.admin')}
                </Link>
              )}
              <button onClick={() => setUser(null)} className="text-white/40 hover:text-white text-[14px] transition-colors cursor-pointer">
                {t('header.actions.logout')}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white/60 hover:text-white text-[14px] transition-colors">
                {t('header.actions.login')}
              </Link>
              <Link to="/register" className="px-4 py-1.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-white/90 transition-colors">
                {t('header.actions.register')}
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
          
          {/* Language Switcher */}
          <button onClick={toggleLanguage} className="text-white/70 hover:text-white transition-colors cursor-pointer flex items-center gap-1">
            <Globe size={18} strokeWidth={1.5} />
            <span className="text-[12px] font-medium">{i18n.language.toUpperCase()}</span>
          </button>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="md:hidden flex items-center gap-3 ml-auto">
          {/* Language Switcher Mobile */}
          <button onClick={toggleLanguage} className="text-white/70 hover:text-white transition-colors cursor-pointer flex items-center gap-1">
            <Globe size={18} strokeWidth={1.5} />
          </button>
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
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                  className="text-white/75 hover:text-white text-base">
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-white/10 pt-3 flex gap-3 items-center">
                {user ? (
                  <button onClick={() => setUser(null)} className="text-white/50 text-sm cursor-pointer">{t('header.actions.logout')}</button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="text-white/60 text-sm">{t('header.actions.login')}</Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="px-3 py-1 bg-white text-black rounded-full text-sm font-semibold">{t('header.actions.register')}</Link>
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
