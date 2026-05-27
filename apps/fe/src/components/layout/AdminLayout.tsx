import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const navItems = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/products', label: 'Sản phẩm' },
  { to: '/admin/orders', label: 'Đơn hàng' },
  { to: '/admin/reviews', label: 'Đánh giá' },
  { to: '/admin/users', label: 'Người dùng' },
  { to: '/admin/contacts', label: 'Liên hệ' },
];

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <ScrollToTop />
      <aside className="w-56 shrink-0 border-r bg-gray-900 text-white">
        <div className="p-4 text-lg font-bold">Quản Trị Hệ Thống</div>
        <nav className="flex flex-col gap-1 p-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
