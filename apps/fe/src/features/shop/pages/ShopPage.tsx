import { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../products/hooks/useProducts';
import { useCart } from '@/context/CartContext';
import { ProductCard as ApiProduct } from '@/types/api';

const PLACEHOLDER = 'https://placehold.co/400x400?text=OCNV';

function getStockStatus(stock: number): 'in_stock' | 'low_stock' | 'out_of_stock' {
  if (stock === 0) return 'out_of_stock';
  if (stock <= 3) return 'low_stock';
  return 'in_stock';
}

export default function ShopPage() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const { data, isLoading } = useProducts({ search: search || undefined, minPrice, maxPrice, limit: 50 });
  const products = data?.items ?? [];
  const handleSearch = () => setSearch(searchInput);

  const handleAddToCart = useCallback((p: ApiProduct) => {
    addToCart({ id: p._id, name: p.name.vi, price: p.price, image: p.mainImageUrl ?? PLACEHOLDER, material: '', origin: p.village?.name?.vi ?? 'OCNV' });
    toast.success('Đã thêm vào giỏ hàng!');
  }, [addToCart]);

  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2C1A0E]">Khám Phá Sản Phẩm</h1>
          <p className="text-sm text-[#9C8670] mt-1">{products.length} sản phẩm</p>
        </div>

        {/* Search & filter — bên phải */}
        <div className="flex flex-wrap gap-2 items-center justify-end">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C8670]" />
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-8 pr-3 h-9 w-48 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
            />
          </div>
          <input type="number" placeholder="Giá từ" value={minPrice ?? ''}
            onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
            className="w-24 h-9 px-2 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
          <input type="number" placeholder="Đến" value={maxPrice ?? ''}
            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
            className="w-24 h-9 px-2 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
          <button onClick={handleSearch}
            className="h-9 px-4 bg-[#5C3D1E] text-[#F5EDD6] text-xs font-bold uppercase rounded-sm hover:bg-[#7A5230] transition-colors cursor-pointer">
            Tìm
          </button>
        </div>
      </div>

      {/* Grid */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-[#F5EDD6] rounded-sm animate-pulse" />
          ))}
        </div>
      )}

      {!isLoading && products.length === 0 && (
        <div className="h-64 flex flex-col items-center justify-center text-center space-y-2">
          <p className="text-[#9C8670]">Không tìm thấy sản phẩm phù hợp</p>
          <p className="text-xs text-[#9C8670]">Thử từ khóa khác hoặc bỏ bộ lọc.</p>
        </div>
      )}

      {!isLoading && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products.map((product) => {
            const stockStatus = getStockStatus(product.stock);
            return (
              <div
                key={product._id}
                className="bg-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-md hover:border-[#C9973A]/40 transition-all group cursor-pointer"
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.mainImageUrl ?? PLACEHOLDER}
                    alt={product.name.vi}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                  />
                  {stockStatus === 'out_of_stock' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold uppercase">Hết hàng</span>
                    </div>
                  )}
                  {stockStatus === 'low_stock' && (
                    <span className="absolute top-1.5 right-1.5 bg-[#C9973A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">Sắp hết</span>
                  )}
                </div>
                <div className="p-2.5 space-y-1">
                  <p className="text-[9px] font-bold text-[#7A5A1A] uppercase truncate">{product.village?.name?.vi ?? '—'}</p>
                  <h3 className="text-xs font-semibold text-[#2C1A0E] line-clamp-2 leading-snug">{product.name.vi}</h3>
                  <p className="text-sm font-bold text-[#C9973A]">{product.price.toLocaleString('vi-VN')}₫</p>
                  <button
                    disabled={stockStatus === 'out_of_stock'}
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                    className="w-full h-7 bg-[#5C3D1E] text-[#F5EDD6] text-[9px] font-bold uppercase rounded-sm hover:bg-[#7A5230] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {stockStatus === 'out_of_stock' ? 'Hết hàng' : 'Thêm vào giỏ'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
