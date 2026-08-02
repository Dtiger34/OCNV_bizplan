import { useState, useCallback } from 'react';
import { Search, SlidersHorizontal, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../products/hooks/useProducts';
import { useCart } from '@/context/CartContext';
import { ProductCard as ApiProduct } from '@/types/api';

const PLACEHOLDER = 'https://placehold.co/400x400?text=OCNV';

const PRICE_RANGES = [
  { label: 'Tất cả', min: undefined as number | undefined, max: undefined as number | undefined },
  { label: 'Dưới 100.000₫', min: undefined, max: 100000 },
  { label: '100.000 – 300.000₫', min: 100000, max: 300000 },
  { label: '300.000 – 500.000₫', min: 300000, max: 500000 },
  { label: 'Trên 500.000₫', min: 500000, max: undefined },
];

const CATEGORIES = ['Tất cả', 'Mô hình', 'Tranh ghép', 'Thẻ nam châm'];

function getStockStatus(stock: number): 'in_stock' | 'low_stock' | 'out_of_stock' {
  if (stock === 0) return 'out_of_stock';
  if (stock <= 3) return 'low_stock';
  return 'in_stock';
}

interface SidebarProps {
  searchInput: string;
  onSearchInputChange: (v: string) => void;
  onSearch: () => void;
  minInput: string;
  maxInput: string;
  onMinInputChange: (v: string) => void;
  onMaxInputChange: (v: string) => void;
  onPriceFilter: () => void;
  onReset: () => void;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  onPriceRangeSelect: (min: number | undefined, max: number | undefined) => void;
  activeCategory: string;
  onCategorySelect: (cat: string) => void;
}

function ShopSidebar({
  searchInput, onSearchInputChange, onSearch,
  minInput, maxInput, onMinInputChange, onMaxInputChange,
  onPriceFilter, onReset,
  minPrice, maxPrice, onPriceRangeSelect,
  activeCategory, onCategorySelect,
}: SidebarProps) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="text-xs font-bold text-[#ab2124] uppercase tracking-wider mb-3">Tìm kiếm</h3>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ab2124]" />
          <input
            type="text"
            placeholder="Tên sản phẩm..."
            value={searchInput}
            onChange={(e) => onSearchInputChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            className="w-full pl-8 pr-3 h-9 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
          />
        </div>
        <button onClick={onSearch}
          className="mt-2 w-full h-9 bg-[#ab2124] text-[#fff8e7] text-xs font-bold uppercase rounded-sm hover:bg-[#ab2124] transition-colors cursor-pointer">
          Tìm kiếm
        </button>
      </div>

      <div className="h-[1px] bg-[#D4B896]/40" />

      {/* Category */}
      <div>
        <h3 className="text-xs font-bold text-[#ab2124] uppercase tracking-wider mb-3">Danh mục</h3>
        <div className="space-y-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategorySelect(cat)}
              className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors ${
                activeCategory === cat
                  ? 'bg-[#ab2124] text-[#fff8e7] font-semibold'
                  : 'text-[#ab2124] hover:bg-[#EDE3CE]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-[#D4B896]/40" />

      {/* Price ranges */}
      <div>
        <h3 className="text-xs font-bold text-[#ab2124] uppercase tracking-wider mb-3">Khoảng giá</h3>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((range) => {
            const active = minPrice === range.min && maxPrice === range.max;
            return (
              <button
                key={range.label}
                onClick={() => onPriceRangeSelect(range.min, range.max)}
                className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors ${
                  active ? 'bg-[#ab2124] text-[#fff8e7] font-semibold' : 'text-[#ab2124] hover:bg-[#EDE3CE]'
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-[1px] bg-[#D4B896]/40" />

      {/* Custom price */}
      <div>
        <h3 className="text-xs font-bold text-[#ab2124] uppercase tracking-wider mb-3">Nhập khoảng giá</h3>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Từ"
            value={minInput}
            onChange={(e) => onMinInputChange(e.target.value.replace(/\D/g, ''))}
            className="w-full h-9 px-2 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
          />
          <span className="text-[#ab2124] shrink-0">–</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Đến"
            value={maxInput}
            onChange={(e) => onMaxInputChange(e.target.value.replace(/\D/g, ''))}
            className="w-full h-9 px-2 border border-[#D4B896] bg-[#fff8e7] rounded-sm text-sm focus:outline-none focus:border-[#C9973A]"
          />
        </div>
        <button onClick={onPriceFilter}
          className="mt-2 w-full h-9 border border-[#ab2124] text-[#ab2124] text-xs font-bold uppercase rounded-sm hover:bg-[#ab2124] hover:text-[#fff8e7] transition-colors cursor-pointer">
          Áp dụng
        </button>
      </div>

      <div className="h-[1px] bg-[#D4B896]/40" />

      <button onClick={onReset}
        className="w-full h-9 text-xs text-[#ab2124] hover:text-[#7B1C2E] transition-colors cursor-pointer">
        Xoá bộ lọc
      </button>
    </div>
  );
}

export default function ShopPage() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [minInput, setMinInput] = useState('');
  const [maxInput, setMaxInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  const { data, isLoading } = useProducts({ search: search || undefined, minPrice, maxPrice, limit: 50 });
  const allProducts = data?.items ?? [];

  const products = activeCategory === 'Tất cả'
    ? allProducts
    : allProducts.filter((p) => {
        const name = p.name?.vi?.toLowerCase() ?? '';
        const cat = activeCategory.toLowerCase();
        return name.includes(cat);
      });

  const handleSearch = () => setSearch(searchInput);

  const handlePriceFilter = () => {
    setMinPrice(minInput ? Number(minInput) : undefined);
    setMaxPrice(maxInput ? Number(maxInput) : undefined);
  };

  const handlePriceRangeSelect = (min: number | undefined, max: number | undefined) => {
    setMinPrice(min);
    setMaxPrice(max);
    setMinInput(min?.toString() ?? '');
    setMaxInput(max?.toString() ?? '');
  };

  const handleReset = () => {
    setSearchInput(''); setSearch('');
    setMinInput(''); setMaxInput('');
    setMinPrice(undefined); setMaxPrice(undefined);
    setActiveCategory('Tất cả');
  };

  const handleAddToCart = useCallback((p: ApiProduct) => {
    addToCart({ id: p._id, name: p.name.vi, price: p.price, image: p.mainImageUrl ?? PLACEHOLDER, material: '', origin: p.village?.name?.vi ?? 'OCNV' });
    toast.success('Đã thêm vào giỏ hàng!');
  }, [addToCart]);

  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      {/* Mobile filter toggle */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <h1 className="text-xl font-bold text-[#ab2124] text-title-gradient">Sản Phẩm</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 px-3 h-9 border border-[#D4B896] rounded-sm text-sm text-[#ab2124]">
          <SlidersHorizontal size={14} /> Lọc
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-56 shrink-0`}>
          <div className="bg-[#fff8e7] border border-[#D4B896] rounded-sm p-4 sticky top-24">
            <h2 className="hidden md:block text-sm font-bold text-[#ab2124] mb-4 pb-2 border-b border-[#D4B896]/40 text-title-gradient">
              Tìm kiếm & Lọc
            </h2>
            <ShopSidebar
              searchInput={searchInput}
              onSearchInputChange={setSearchInput}
              onSearch={handleSearch}
              minInput={minInput}
              maxInput={maxInput}
              onMinInputChange={setMinInput}
              onMaxInputChange={setMaxInput}
              onPriceFilter={handlePriceFilter}
              onReset={handleReset}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onPriceRangeSelect={handlePriceRangeSelect}
              activeCategory={activeCategory}
              onCategorySelect={setActiveCategory}
            />
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          <div className="hidden md:flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-[#ab2124] text-title-gradient">Tất Cả Sản Phẩm</h1>
            <span className="text-sm text-[#ab2124]">{products.length} sản phẩm</span>
          </div>

          {isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-[#fff8e7] rounded-sm animate-pulse" />
              ))}
            </div>
          )}

          {!isLoading && products.length === 0 && (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-2 border border-[#D4B896] rounded-sm bg-[#fff8e7]">
              <p className="text-[#ab2124]">Không tìm thấy sản phẩm phù hợp</p>
              <p className="text-xs text-[#ab2124]">Thử từ khóa khác hoặc bỏ bộ lọc.</p>
            </div>
          )}

          {!isLoading && products.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
                      {product.village?.name?.vi && <p className="text-[9px] font-bold text-[#ab2124] uppercase truncate">{product.village.name.vi}</p>}
                      <h3 className="text-xs font-semibold text-[#ab2124] line-clamp-2 leading-snug">{product.name.vi}</h3>
                      <div className="flex text-[#C9973A]">
                        {[1,2,3,4,5].map(s => <Star key={s} size={10} fill="currentColor" />)}
                      </div>
                      <p className="text-sm font-bold text-[#C9973A]">{product.price.toLocaleString('vi-VN')}₫</p>
                      <button
                        disabled={stockStatus === 'out_of_stock'}
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                        className="w-full h-7 bg-[#ab2124] text-[#fff8e7] text-[9px] font-bold uppercase rounded-sm hover:bg-[#ab2124] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
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
      </div>
    </div>
  );
}
