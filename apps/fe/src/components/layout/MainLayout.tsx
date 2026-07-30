import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function setupReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
  );
  document
    .querySelectorAll('.reveal:not(.in-view), .reveal-left:not(.in-view), .reveal-right:not(.in-view), .reveal-scale:not(.in-view)')
    .forEach((el) => io.observe(el));
  return io;
}

function RevealObserver() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Run immediately after layout paint
    let io = setupReveal();
    // Re-run after a short delay to catch lazy-loaded page elements
    const t = setTimeout(() => {
      io.disconnect();
      io = setupReveal();
    }, 300);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);
  return null;
}

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fff8e7]">
      <ScrollToTop />
      <RevealObserver />
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
