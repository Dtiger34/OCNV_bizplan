import { useState, useCallback } from 'react';
import { X, Search } from 'lucide-react';
import { toast } from 'sonner';
import { useProducts } from '../../products/hooks/useProducts';
import { useCart } from '@/context/CartContext';
import { ProductCard as ApiProduct } from '@/types/api';

const PLACEHOLDER = 'https://placehold.co/800x800?text=OCNV';

function getStockStatus(stock: number): 'in_stock' | 'low_stock' | 'out_of_stock' {
  if (stock === 0) return 'out_of_stock';
  if (stock <= 3) return 'low_stock';
  return 'in_stock';
}

function ProductModal({ product, onClose, onAddToCart }: {
  product: ApiProduct;
  onClose: () => void;
  onAddToCart: (p: ApiProduct) => void;
}) {
  const stockStatus = getStockStatus(product.stock);
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#2C1A0E]/60" onClick={onClose} />
      <div className="relative bg-[#FDF6E3] border-[2px] border-[#C9973A] rounded-[8px] max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 shadow-xl flex flex-col md:flex-row p-6 gap-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#5C3D1E] hover:text-[#7B1C2E] p-1">
          <X size={22} />
        </button>
        <div className="w-full md:w-1/2 space-y-4">
          <img src={product.mainImageUrl ?? PLACEHOLDER} alt={product.name.vi}
            className="w-full aspect-[4/3] object-cover border border-[#D4B896] rounded-[6px]" />
          <div className="bg-[#F5EDD6] border border-[#D4B896] p-4 rounded-[6px] text-xs">
            <span className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase block mb-1">ĐẶC TÍNH</span>
            <div><strong>Làng nghề:</strong> {product.village?.name?.vi ?? '—'}</div>
            <div><strong>Tình trạng:</strong> {stockStatus === 'out_of_stock' ? 'Hết hàng' : stockStatus === 'low_stock' ? 'Sắp hết' : 'Còn hàng'}</div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-[10px] font-bold tracking-[0.14em] text-[#7A5A1A] uppercase block">{product.village?.name?.vi ?? '—'}</span>
            <h3 className="text-2xl font-semibold text-[#2C1A0E]">{product.name.vi}</h3>
            <div className="text-xl font-bold text-[#7B1C2E]">{product.price.toLocaleString('vi-VN')} ₫</div>
          </div>
          <button disabled={stockStatus === 'out_of_stock'}
            onClick={() => { onAddToCart(product); onClose(); }}
            className="w-full h-10 bg-[#5C3D1E] text-[#F5EDD6] text-[11px] font-bold tracking-wider uppercase rounded-[4px] hover:bg-[#7A5230] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {stockStatus === 'out_of_stock' ? 'HẾT HÀNG' : 'THÊM VÀO GIỎ HÀNG'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const { addToCart } = useCart();
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [selectedProduct, setSelectedProduct] = useState<ApiProduct | null>(null);

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
                  onClick={() => setSelectedProduct(product)}>
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

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
