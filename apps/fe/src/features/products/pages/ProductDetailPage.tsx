import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Sparkles, Star, ChevronRight, Minus, Plus, Store, Shield, Truck, RotateCcw, MessageSquare } from 'lucide-react';
import { useProduct, useProductReviews, useRelatedProducts, useCreateReview } from '../hooks/useProducts';
import { toast } from 'sonner';

const PLACEHOLDER = 'https://placehold.co/800x800?text=OCNV';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const lang = 'vi' as const;

  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [newReview, setNewReview] = useState({ rating: 5, content: '' });

  const { data: product, isLoading, isError } = useProduct(id!);
  const { data: reviewsData } = useProductReviews(id!);
  const { data: relatedData } = useRelatedProducts(id!, 6);
  const createReview = useCreateReview(id!);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#C9973A] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#9C8670]">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg text-[#2C1A0E]">Không tìm thấy sản phẩm.</p>
        <Link to="/shop" className="text-[#C9973A] underline text-sm">← Quay lại gian hàng</Link>
      </div>
    );
  }

  const images = product.images?.length
    ? product.images.map((img: any) => img.url)
    : [product.mainImageUrl ?? PLACEHOLDER];
  const reviews = reviewsData?.items ?? [];
  const related = relatedData?.items ?? [];
  const inStock = product.stock > 0;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: product._id,
        name: product.name.vi,
        price: product.price,
        image: product.mainImageUrl ?? PLACEHOLDER,
        material: '',
        origin: product.village?.name?.vi ?? '',
      });
    }
    toast.success(`Đã thêm ${qty} sản phẩm vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.content.trim()) return;
    createReview.mutate(newReview, {
      onSuccess: () => {
        setNewReview({ rating: 5, content: '' });
        toast.success('Cảm ơn bạn đã đánh giá!');
      },
      onError: () => toast.error('Không thể gửi đánh giá. Vui lòng thử lại.'),
    });
  };

  const avgRating = product.averageRating ?? 0;

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8 py-2.5 flex items-center gap-1 text-xs text-gray-500">
          <Link to="/" className="hover:text-[#C9973A]">Trang chủ</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-[#C9973A]">Cửa hàng</Link>
          <ChevronRight size={12} />
          <span className="text-[#2C1A0E] truncate max-w-[200px]">{product.name[lang]}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-4 space-y-3">

        {/* ── Main product card ─────────────────────────────────────── */}
        <div className="bg-white rounded-sm shadow-sm p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10">

            {/* Images */}
            <div className="md:col-span-5 space-y-3">
              <div className="aspect-square bg-[#F9F5EE] rounded-sm overflow-hidden border border-gray-100 relative">
                <img
                  src={images[activeImg] ?? PLACEHOLDER}
                  alt={product.name[lang]}
                  className="w-full h-full object-cover"
                />
                <Link
                  to={`/ar/${product._id}`}
                  className="absolute bottom-3 right-3 bg-[#C9973A] text-white px-3 py-1.5 rounded-sm text-[11px] font-bold tracking-wide flex items-center gap-1 shadow-md hover:bg-[#b8852e] transition-colors"
                >
                  <Sparkles size={13} />
                  XEM AR 3D
                </Link>
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((url: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-all ${activeImg === i ? 'border-[#C9973A]' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="md:col-span-7 flex flex-col gap-4">
              {/* Title */}
              <div>
                {product.village?.name?.[lang] && (
                  <span className="text-xs text-[#C9973A] font-medium">{product.village.name[lang]}</span>
                )}
                <h1 className="text-lg md:text-xl font-medium text-[#2C1A0E] mt-1 leading-snug">
                  {product.name[lang]}
                </h1>
              </div>

              {/* Rating + sold */}
              <div className="flex items-center gap-3 text-sm border-b border-dashed border-gray-100 pb-4">
                <span className="text-[#C9973A] font-semibold underline">{avgRating.toFixed(1)}</span>
                <div className="flex text-[#C9973A]">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={13} fill={s <= Math.round(avgRating) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">{product.reviewCount ?? 0} Đánh Giá</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">Đã Bán {product.soldCount ?? 0}</span>
              </div>

              {/* Price */}
              <div className="bg-[#FAFAF5] rounded-sm p-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-[#C9973A]">
                    {product.price.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex gap-2">
                  <span className="text-gray-400 w-28 shrink-0">Làng nghề</span>
                  <span className="text-[#2C1A0E]">{product.village?.name?.[lang] ?? '—'}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-400 w-28 shrink-0">Tình trạng</span>
                  <span className={inStock ? 'text-[#3A6B4A] font-medium' : 'text-[#7B1C2E] font-medium'}>
                    {inStock ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}
                  </span>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-400">Số lượng</span>
                <div className="flex items-center border border-gray-300 rounded-sm">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{qty}</span>
                  <button
                    onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                    disabled={!inStock}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-40"
                  >
                    <Plus size={13} />
                  </button>
                </div>
                <span className="text-gray-400 text-xs">{product.stock} sản phẩm có sẵn</span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className="flex-1 h-12 border-2 border-[#C9973A] text-[#C9973A] bg-[#FFF8EC] hover:bg-[#FFF0D0] font-semibold text-sm rounded-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ShoppingCart size={18} />
                  Thêm Vào Giỏ Hàng
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!inStock}
                  className="flex-1 h-12 bg-[#C9973A] hover:bg-[#b8852e] text-white font-semibold text-sm rounded-sm flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Mua Ngay
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-dashed border-gray-100">
                {[
                  { icon: <Truck size={14} />, text: 'Miễn phí vận chuyển' },
                  { icon: <Shield size={14} />, text: 'Hàng chính hãng 100%' },
                  { icon: <RotateCcw size={14} />, text: 'Đổi trả trong 7 ngày' },
                  { icon: <Store size={14} />, text: 'Nghề Xưa Nét Mới' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="text-[#C9973A]">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Description ─────────────────────────────────────────── */}
        <div className="bg-white rounded-sm shadow-sm p-4 md:p-6">
          <h2 className="text-sm font-bold text-[#2C1A0E] uppercase tracking-wider pb-3 border-b border-gray-100 mb-4">
            Mô Tả Sản Phẩm
          </h2>
          <div className="text-sm text-gray-700 leading-relaxed space-y-3">
            <p>{product.description[lang]}</p>
            {product.processVideoUrl && (
              <div className="aspect-video max-w-2xl bg-black rounded-sm overflow-hidden mt-4">
                <iframe title="Video chế tác" className="w-full h-full" src={product.processVideoUrl} allowFullScreen />
              </div>
            )}
          </div>
        </div>

        {/* ── Reviews ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-sm shadow-sm p-4 md:p-6">
          <h2 className="text-sm font-bold text-[#2C1A0E] uppercase tracking-wider pb-3 border-b border-gray-100 mb-4 flex items-center gap-2">
            <MessageSquare size={15} className="text-[#C9973A]" />
            Đánh Giá Sản Phẩm
          </h2>

          {/* Rating summary */}
          <div className="flex items-center gap-6 p-4 bg-[#FFFBF2] border border-[#F0E0B0] rounded-sm mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#C9973A]">{avgRating.toFixed(1)}</div>
              <div className="flex justify-center text-[#C9973A] mt-1">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={12} fill={s <= Math.round(avgRating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">trên 5</div>
            </div>
            <div className="text-sm text-gray-500">
              {product.reviewCount ?? 0} đánh giá từ khách hàng
            </div>
          </div>

          {/* Review list */}
          <div className="space-y-4 mb-8">
            {reviews.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
            ) : (
              reviews.map((r: any) => (
                <div key={r._id} className="flex gap-3 py-4 border-b border-gray-50 last:border-0">
                  <div className="w-9 h-9 rounded-full bg-[#EDE3CE] flex items-center justify-center text-sm font-bold text-[#5C3D1E] shrink-0">
                    {r.user.fullName?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#2C1A0E]">{r.user.fullName}</span>
                      <span className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex text-[#C9973A]">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={12} fill={s <= r.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{r.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Write review */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-semibold text-[#2C1A0E] mb-4">Viết đánh giá của bạn</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Đánh giá:</span>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewReview(r => ({ ...r, rating: s }))}
                      className="text-[#C9973A] hover:scale-110 transition-transform"
                    >
                      <Star size={22} fill={s <= newReview.rating ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                rows={4}
                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                value={newReview.content}
                onChange={e => setNewReview(r => ({ ...r, content: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-sm text-sm text-[#2C1A0E] focus:outline-none focus:border-[#C9973A] resize-none"
                required
              />
              <button
                type="submit"
                disabled={createReview.isPending}
                className="px-6 py-2.5 bg-[#C9973A] hover:bg-[#b8852e] text-white text-sm font-semibold rounded-sm transition-colors disabled:opacity-60 cursor-pointer"
              >
                {createReview.isPending ? 'Đang gửi...' : 'Gửi Đánh Giá'}
              </button>
            </form>
          </div>
        </div>

        {/* ── Related products ─────────────────────────────────────── */}
        {related.length > 0 && (
          <div className="bg-white rounded-sm shadow-sm p-4 md:p-6">
            <h2 className="text-sm font-bold text-[#2C1A0E] uppercase tracking-wider pb-3 border-b border-gray-100 mb-4">
              Sản Phẩm Liên Quan
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {related.map((p: any) => (
                <Link
                  key={p._id}
                  to={`/products/${p._id}`}
                  className="group block border border-gray-100 rounded-sm overflow-hidden hover:shadow-md hover:border-[#C9973A]/30 transition-all"
                >
                  <div className="aspect-square bg-[#F9F5EE] overflow-hidden">
                    <img
                      src={p.mainImageUrl ?? PLACEHOLDER}
                      alt={p.name?.vi}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2 space-y-1">
                    <p className="text-xs text-[#2C1A0E] line-clamp-2 leading-tight">{p.name?.vi}</p>
                    <p className="text-sm font-bold text-[#C9973A]">{p.price?.toLocaleString('vi-VN')}₫</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
