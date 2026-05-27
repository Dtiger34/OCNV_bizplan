import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Eye, EyeOff, Star, Pencil, Trash2, Sparkles, ChevronDown } from 'lucide-react';

interface Product {
  id: string; name: string; category: string; price: number;
  stock: number; visible: boolean; featured: boolean; image: string; village: string;
}

const INIT_PRODUCTS: Product[] = [
  { id: 'tieu-canh-bat-trang',     name: 'Mô Hình Làng Gốm Bát Tràng',       category: 'Hộp Làng Gốm',     price: 1250000, stock: 12, visible: true,  featured: false, image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=80&q=60', village: 'Bát Tràng' },
  { id: 'tieu-canh-van-phuc',      name: 'Mô Hình Làng Lụa Vạn Phúc',        category: 'Hộp Làng Lụa',     price: 1450000, stock: 3,  visible: true,  featured: true,  image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=80&q=60', village: 'Vạn Phúc' },
  { id: 'tieu-canh-quang-phu-cau', name: 'Mô Hình Làng Hương Quảng Phú Cầu', category: 'Hộp Làng Hương',   price: 1350000, stock: 8,  visible: true,  featured: true,  image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=80&q=60', village: 'Quảng Phú Cầu' },
  { id: 'tieu-canh-non-chuong',    name: 'Mô Hình Làng Nón Làng Chuông',     category: 'Hộp Làng Nón',     price: 980000,  stock: 15, visible: true,  featured: false, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=80&q=60', village: 'Làng Chuông' },
  { id: 'tieu-canh-phu-vinh',      name: 'Mô Hình Làng Tre Phú Vinh',        category: 'Hộp Làng Tre Đan', price: 1100000, stock: 0,  visible: false, featured: false, image: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&w=80&q=60', village: 'Phú Vinh' },
];

export default function AdminProductListPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(INIT_PRODUCTS);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');

  const categories = ['all', ...Array.from(new Set(INIT_PRODUCTS.map((p) => p.category)))];
  const filtered = products.filter((p) => {
    const matchCat = filterCat === 'all' || p.category === filterCat;
    const q = search.toLowerCase();
    return matchCat && (!q || p.name.toLowerCase().includes(q) || p.village.toLowerCase().includes(q));
  });

  const toggle = (id: string, field: 'visible' | 'featured') =>
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, [field]: !p[field] } : p));
  const remove = (id: string) => setProducts((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sản phẩm</h1>
          <p className="text-sm text-gray-500 mt-0.5">{products.length} sản phẩm trong hệ thống</p>
        </div>
        <Link to="/admin/products/new" className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-colors">
          <Plus size={16} /> Thêm sản phẩm
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Tìm tên sản phẩm, làng nghề..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 h-9 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div className="relative">
          <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}
            className="h-9 pl-3 pr-8 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none appearance-none cursor-pointer">
            {categories.map((c) => <option key={c} value={c}>{c === 'all' ? 'Tất cả danh mục' : c}</option>)}
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3">Sản phẩm</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Danh mục</th>
              <th className="text-right px-4 py-3">Giá</th>
              <th className="text-center px-4 py-3 hidden lg:table-cell">Tồn kho</th>
              <th className="text-center px-4 py-3">Hiển thị</th>
              <th className="text-center px-4 py-3 hidden lg:table-cell">Nổi bật</th>
              <th className="px-4 py-3 w-28" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-gray-100" />
                    <div>
                      <p className="font-semibold text-gray-800">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.village}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{p.category}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-800">{p.price.toLocaleString('vi-VN')}₫</td>
                <td className="px-4 py-3 text-center hidden lg:table-cell">
                  <span className={`text-xs font-semibold ${p.stock === 0 ? 'text-red-500' : p.stock <= 3 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {p.stock === 0 ? 'Hết hàng' : p.stock}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => toggle(p.id, 'visible')} className="cursor-pointer" title={p.visible ? 'Ẩn' : 'Hiện'}>
                    {p.visible ? <Eye size={16} className="text-green-500 mx-auto" /> : <EyeOff size={16} className="text-gray-300 mx-auto" />}
                  </button>
                </td>
                <td className="px-4 py-3 text-center hidden lg:table-cell">
                  <button onClick={() => toggle(p.id, 'featured')} className="cursor-pointer" title={p.featured ? 'Bỏ nổi bật' : 'Đặt nổi bật'}>
                    <Star size={16} className={`mx-auto ${p.featured ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <button onClick={() => navigate(`/admin/products/${p.id}/hotspots`)}
                      className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer" title="Hotspot AR">
                      <Sparkles size={15} />
                    </button>
                    <Link to={`/admin/products/${p.id}/edit`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Sửa">
                      <Pencil size={15} />
                    </Link>
                    <button onClick={() => remove(p.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Xóa">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="py-16 text-center text-gray-400 text-sm">Không tìm thấy sản phẩm nào.</div>}
      </div>
    </div>
  );
}
