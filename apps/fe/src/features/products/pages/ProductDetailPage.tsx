import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Heart, ShoppingCart, Sparkles, Star, ArrowLeft } from 'lucide-react';
import { useProduct, useProductReviews, useCreateReview } from '../hooks/useProducts';

const PLACEHOLDER = 'https://placehold.co/800x800?text=OCNV';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const lang = 'vi' as const;

  const [activeTab, setActiveTab] = useState<'info' | 'video' | 'reviews'>('info');
  const [inWishlist, setInWishlist] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, content: '' });

  const { data: product, isLoading, isError } = useProduct(id!);
  const { data: reviewsData } = useProductReviews(id!);
  const createReview = useCreateReview(id!);

  if (isLoading) {
    return <div className="flex min-h-[60vh] items-center justify-center text-[#9C8670]">Đang tải sản phẩm...</div>;
  }

  if (isError || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg text-[#2C1A0E]">Không tìm thấy sản phẩm.</p>
        <Link to="/shop" className="text-[#C9973A] underline text-sm">← Quay lại gian hàng</Link>
      </div>
    );
  }

  const stockBadge = product.stock === 0 ? 'Hết Hàng' : product.stock <= 3 ? 'Sắp Hết' : 'Còn Hàng';
  const reviews = reviewsData?.items ?? [];

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name.vi,
      price: product.price,
      image: product.mainImageUrl ?? PLACEHOLDER,
      material: '',
      origin: product.village?.name?.vi ?? '',
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.content.trim()) return;
    createReview.mutate(newReview, {
      onSuccess: () => setNewReview({ rating: 5, content: '' }),
      onError: () => alert('Không thể gửi đánh giá. Vui lòng thử lại.'),
    });
  };

  return (
    <div className="container mx-auto px-6 md:px-8 py-8 space-y-12">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider text-[#5C3D1E] hover:text-[#7B1C2E] uppercase transition-colors"
      >
        <ArrowLeft size={14} />
        Quay lại gian hàng
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Image */}
        <div className="lg:col-span-7 space-y-4 reveal-left">
          <div className="relative aspect-[4/3] bg-[#EDE3CE] border border-[#D4B896] rounded-[8px] overflow-hidden">
            <img
              src={product.mainImageUrl ?? PLACEHOLDER}
              alt={product.name[lang]}
              className="w-full h-full object-cover"
            />
            <Link
              to={`/ar/${product._id}`}
              className="absolute bottom-4 right-4 bg-[#C9973A] text-[#FDF6E3] hover:bg-[#3A1A0A] px-4 py-2 rounded-sm shadow-medium text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all"
            >
              <Sparkles size={16} />
              TRẢI NGHIỆM AR
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 reveal-right">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-[0.14em] text-[#7A5A1A] uppercase">
                {product.village?.name?.[lang] ?? ''}
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-[#3A6B4A] bg-[rgba(58,107,74,0.1)] text-[#3A6B4A] rounded-sm">
                {stockBadge}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-[#2C1A0E]">
              {product.name[lang]}
            </h1>

            <div className="flex items-center gap-1.5 text-[#C9973A]">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={15} fill={s <= Math.round(product.averageRating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="text-xs text-[#9C8670] mt-0.5">
                ({product.reviewCount} đánh giá từ khách hàng)
              </span>
            </div>

            <div className="text-3xl font-bold text-[#7B1C2E] py-2 border-y border-[#D4B896]/30">
              {product.price.toLocaleString('vi-VN')}
              <span className="text-sm font-semibold align-super ml-0.5">₫</span>
            </div>

            <ul className="text-sm text-[#2C1A0E] space-y-2">
              <li><strong>Làng nghề:</strong> {product.village?.name?.[lang] ?? '—'}</li>
              <li><strong>Hộp lót gấm:</strong> Tặng kèm hộp ngọc chạm chỉ vàng</li>
            </ul>
          </div>

          <div className="space-y-3 pt-6">
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 h-12 bg-[#5C3D1E] hover:bg-[#7A5230] text-[#F5EDD6] text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={18} />
                Thêm Vào Giỏ
              </button>

              <button
                onClick={() => setInWishlist(!inWishlist)}
                className={`w-12 h-12 border rounded-sm flex items-center justify-center transition-all cursor-pointer ${
                  inWishlist ? 'border-[#7B1C2E] text-[#7B1C2E] bg-[#7B1C2E]/5' : 'border-[#D4B896] text-[#5C3D1E] hover:bg-[#5C3D1E]/5'
                }`}
              >
                <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="w-full h-12 bg-[#7B1C2E] hover:bg-[#9B2438] text-[#F5EDD6] text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              MUA NGAY LẬP TỨC
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-[#D4B896] pt-8 reveal">
        <div className="flex border-b border-[#D4B896]/30 mb-6 gap-6 overflow-x-auto">
          {(['info', 'video', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-bold tracking-wider uppercase pb-3 transition-all relative ${
                activeTab === tab ? 'text-[#7B1C2E]' : 'text-[#9C8670] hover:text-[#5C3D1E]'
              }`}
            >
              {tab === 'info' ? 'Chi Tiết Mô Hình' : tab === 'video' ? 'Video Chế Tác' : 'Nhận Xét'}
              {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7B1C2E]" />}
            </button>
          ))}
        </div>

        <div className="text-sm text-[#2C1A0E] leading-relaxed">
          {activeTab === 'info' && (
            <div className="space-y-4 max-w-3xl">
              <p>{product.description[lang]}</p>
              <p>Mỗi tác phẩm diorama là độc bản, tốn nhiều giờ kỳ công lắp ghép, phủ màu bóng và tích hợp đèn LED từ các nghệ nhân lành nghề.</p>
            </div>
          )}

          {activeTab === 'video' && (
            product.processVideoUrl ? (
              <div className="aspect-video max-w-2xl bg-black rounded-md overflow-hidden border border-[#D4B896]">
                <iframe
                  title="Quy trình chế tác"
                  className="w-full h-full"
                  src={product.processVideoUrl}
                  allowFullScreen
                />
              </div>
            ) : (
              <p className="text-[#9C8670]">Chưa có video chế tác cho sản phẩm này.</p>
            )
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-3xl">
              <div className="space-y-4">
                {reviews.length === 0 && (
                  <p className="text-[#9C8670]">Chưa có đánh giá nào.</p>
                )}
                {reviews.map((r) => (
                  <div key={r._id} className="p-4 bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#5C3D1E]">
                      <span>{r.user.fullName}</span>
                      <span className="text-[#9C8670]">{new Date(r.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex text-[#C9973A] pb-1">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-sm text-[#2C1A0E]">{r.content}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddReview} className="border-t border-[#D4B896]/30 pt-6 space-y-4">
                <h4 className="text-lg font-bold text-[#2C1A0E]">Để Lại Bút Tích Đánh Giá</h4>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#5C3D1E]">Hài lòng:</span>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                    className="h-8 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-xs px-2"
                  >
                    <option value={5}>5 Sao (Thượng Đỉnh)</option>
                    <option value={4}>4 Sao (Hảo Hạng)</option>
                    <option value={3}>3 Sao (Thường Thôi)</option>
                  </select>
                </div>

                <textarea
                  rows={4}
                  placeholder="Bút tích bình phẩm tại đây..."
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  className="w-full p-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm text-[#2C1A0E] focus:outline-none focus:border-[#C9973A]"
                  required
                />

                <button
                  type="submit"
                  disabled={createReview.isPending}
                  className="px-6 py-2.5 bg-[#5C3D1E] hover:bg-[#7A5230] text-[#F5EDD6] text-[11px] font-bold tracking-wider uppercase rounded-sm cursor-pointer disabled:opacity-60"
                >
                  {createReview.isPending ? 'ĐANG GỬI...' : 'Gửi Đánh Giá'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
