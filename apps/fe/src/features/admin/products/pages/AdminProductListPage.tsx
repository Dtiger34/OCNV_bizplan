import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Eye, EyeOff, Star, Pencil, Trash2, Sparkles } from 'lucide-react';
import {
  useAdminProducts,
  useToggleVisibility,
  useToggleFeatured,
  useDeleteProduct,
} from '../hooks/useAdminProducts';

export default function AdminProductListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const { data, isLoading } = useAdminProducts({ search: search || undefined, limit: 50 });
  const toggleVisibility = useToggleVisibility();
  const toggleFeatured = useToggleFeatured();
  const deleteProduct = useDeleteProduct();

  const items = data?.items ?? [];

  const handleSearch = () => setSearch(searchInput);
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleSearch(); };

  const handleDelete = async (id: string) => {
    if (!confirm('Xác nhận xoá sản phẩm này?')) return;
    await deleteProduct.mutateAsync(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sản phẩm</h1>
          <p className="text-sm text-gray-500 mt-0.5">{data?.total ?? 0} sản phẩm trong hệ thống</p>
        </div>
        <Link to="/admin/products/new" className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-colors">
          <Plus size={16} /> Thêm sản phẩm
        </Link>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Tìm tên sản phẩm..." value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} onKeyDown={handleKeyDown}
            className="w-full pl-9 pr-4 h-9 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <button onClick={handleSearch} className="px-4 h-9 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 cursor-pointer">Tìm</button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3">Sản phẩm</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Làng nghề</th>
              <th className="text-right px-4 py-3">Giá</th>
              <th className="text-center px-4 py-3 hidden lg:table-cell">Tồn kho</th>
              <th className="text-center px-4 py-3">Hiển thị</th>
              <th className="text-center px-4 py-3 hidden lg:table-cell">Nổi bật</th>
              <th className="px-4 py-3 w-28" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading && (
              <tr><td colSpan={7} className="px-5 py-12 text-center text-gray-400 text-sm">Đang tải...</td></tr>
            )}
            {!isLoading && items.length === 0 && (
              <tr><td colSpan={7} className="py-16 text-center text-gray-400 text-sm">Không tìm thấy sản phẩm nào.</td></tr>
            )}
            {items.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    {p.mainImageUrl ? (
                      <img src={p.mainImageUrl} alt={p.name.vi} className="w-10 h-10 rounded-lg object-cover border border-gray-100" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-100" />
                    )}
                    <p className="font-semibold text-gray-800">{p.name.vi}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{p.village?.name?.vi ?? '—'}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-800">{p.price.toLocaleString('vi-VN')}₫</td>
                <td className="px-4 py-3 text-center hidden lg:table-cell">
                  <span className={`text-xs font-semibold ${p.stock === 0 ? 'text-red-500' : p.stock <= 3 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {p.stock === 0 ? 'Hết hàng' : p.stock}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => toggleVisibility.mutate({ id: p._id, isVisible: !p.isVisible })}
                    className="cursor-pointer" title={p.isVisible ? 'Ẩn' : 'Hiện'}>
                    {p.isVisible
                      ? <Eye size={16} className="text-green-500 mx-auto" />
                      : <EyeOff size={16} className="text-gray-300 mx-auto" />}
                  </button>
                </td>
                <td className="px-4 py-3 text-center hidden lg:table-cell">
                  <button onClick={() => toggleFeatured.mutate({ id: p._id, isFeatured: !(p as any).isFeatured })}
                    className="cursor-pointer">
                    <Star size={16} className={`mx-auto ${(p as any).isFeatured ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <button onClick={() => navigate(`/admin/products/${p._id}/hotspots`)}
                      className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer" title="Hotspot AR">
                      <Sparkles size={15} />
                    </button>
                    <Link to={`/admin/products/${p._id}/edit`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Sửa">
                      <Pencil size={15} />
                    </Link>
                    <button onClick={() => handleDelete(p._id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Xóa">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
