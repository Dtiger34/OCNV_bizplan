import { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../products/hooks/useProducts';
import { useCart } from '@/context/CartContext';
import { ProductCard as ApiProduct } from '@/types/api';

const PLACEHOLDER = 'https://placehold.co/800x800?text=OCNV';

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

  const { data, isLoading } = useProducts({
    search: search || undefined,
    minPrice,
    maxPrice,
    limit: 50,
  });

  const products = data?.items ?? [];

  const handleSearch = () => setSearch(searchInput);

  const handleAddToCart = useCallback((p: ApiProduct) => {
    addToCart({
      id: p._id,
      name: p.name.vi,
      price: p.price,
      image: p.mainImageUrl ?? PLACEHOLDER,
      material: '',
      origin: p.village?.name?.vi ?? 'OCNV',
    });
    toast.success('Đã thêm vào giỏ hàng!');
  }, [addToCart]);

  return (
    <div className="container mx-auto px-6 md:px-8 py-10 space-y-10">
      <div className="text-center space-y-2 reveal">
        <h1 className="text-2xl md:text-4xl lg:text-[44px] font-normal text-[#2C1A0E]">Khám Phá Sản Phẩm</h1>
        <div className="flex items-center justify-center gap-3 pt-1">
          <div className="h-[1px] w-12 bg-[#C9973A]/55" />
          <div className="w-1.5 h-1.5 rotate-45 border border-[#C9973A] bg-[#FDF6E3]" />
          <div className="h-[1px] w-12 bg-[#C9973A]/55" />
        </div>
      </div>

      {/* Tìm kiếm & lọc giá */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C8670]" />
          <input type="text" placeholder="Tìm theo tên sản phẩm..." value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-9 pr-4 h-10 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
        </div>
        <button onClick={handleSearch}
          className="px-5 h-10 bg-[#5C3D1E] text-[#F5EDD6] text-[11px] font-bold uppercase rounded-sm hover:bg-[#7A5230] transition-colors cursor-pointer shrink-0">
          Tìm kiếm
        </button>
        <div className="flex gap-2 items-center">
          <span className="text-[10px] font-bold uppercase text-[#5C3D1E] shrink-0">Giá:</span>
          <input type="number" placeholder="Từ" value={minPrice ?? ''} onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
            className="w-20 md:w-28 h-10 px-2 md:px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
          <span className="text-[#5C3D1E]">—</span>
          <input type="number" placeholder="Đến" value={maxPrice ?? ''} onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
            className="w-20 md:w-28 h-10 px-2 md:px-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="space-y-6">
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-[#F5EDD6] border border-[#D4B896] rounded-[6px] animate-pulse" />
            ))}
          </div>
        )}
        {!isLoading && products.length === 0 && (
          <div className="h-[350px] border border-[#D4B896] rounded-[6px] bg-[#FDF6E3] flex flex-col items-center justify-center text-center p-8 space-y-4">
            <span className="text-xl text-[#9C8670] italic">Không tìm thấy sản phẩm phù hợp</span>
            <p className="text-xs text-[#9C8670]">Vui lòng thử từ khóa khác hoặc bỏ bộ lọc.</p>
          </div>
        )}
        {!isLoading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              return (
                <div key={product._id}
                  className="border border-[#D4B896] rounded-[6px] bg-[#FDF6E3] overflow-hidden hover:border-[#C9973A] transition-all group cursor-pointer"
                  onClick={() => navigate(`/products/${product._id}`)}>
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={product.mainImageUrl ?? PLACEHOLDER} alt={product.name.vi}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {stockStatus === 'out_of_stock' && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white text-xs font-bold uppercase tracking-wider">Hết hàng</span>
                      </div>
                    )}
                    {stockStatus === 'low_stock' && (
                      <span className="absolute top-2 right-2 bg-[#C9973A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Sắp hết</span>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-[10px] font-bold text-[#7A5A1A] uppercase">{product.village?.name?.vi ?? '—'}</p>
                    <h3 className="font-bold text-[#2C1A0E] line-clamp-2 leading-snug">{product.name.vi}</h3>
                    <p className="text-[#7B1C2E] font-bold">{product.price.toLocaleString('vi-VN')} ₫</p>
                    <button
                      disabled={stockStatus === 'out_of_stock'}
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                      className="w-full h-9 bg-[#5C3D1E] text-[#F5EDD6] text-[10px] font-bold uppercase rounded-sm hover:bg-[#7A5230] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
                      {stockStatus === 'out_of_stock' ? 'Hết hàng' : 'Thêm vào giỏ'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
