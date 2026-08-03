import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Sparkles, Star, ChevronRight, ChevronLeft, Minus, Plus, MessageSquare } from 'lucide-react';
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
  const [newReview, setNewReview] = useState({ rating: 5, content: '', guestName: '' });

  const { data: product, isLoading, isError } = useProduct(id!);
  const { data: reviewsData } = useProductReviews(id!);
  const { data: relatedData } = useRelatedProducts(id!, 6);
  const createReview = useCreateReview(id!);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#C9973A] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#ab2124]">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg text-[#ab2124]">Không tìm thấy sản phẩm.</p>
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
        setNewReview({ rating: 5, content: '', guestName: '' });
        toast.success('Cảm ơn bạn đã đánh giá!');
      },
      onError: () => toast.error('Không thể gửi đánh giá. Vui lòng thử lại.'),
    });
  };

  const avgRating = product.averageRating && product.averageRating > 0 ? product.averageRating : 4.9;

  const MOCK_REVIEWS = [
    { _id: 'm1', user: { fullName: 'Nguyễn Thị Lan' }, rating: 5, content: 'Sản phẩm rất đẹp, chi tiết tỉ mỉ, đóng gói cẩn thận. Mình mua làm quà tặng và được khen rất nhiều!', createdAt: '2025-05-10' },
    { _id: 'm2', user: { fullName: 'Trần Minh Quân' }, rating: 5, content: 'Hộp tiểu cảnh chất lượng vượt kỳ vọng. Tính năng AR quét mã thực sự thú vị, con mình thích mê.', createdAt: '2025-05-15' },
    { _id: 'm3', user: { fullName: 'Phạm Thu Hương' }, rating: 5, content: 'Giao hàng nhanh, sản phẩm nguyên vẹn. Khung gỗ và chi tiết bên trong rất tinh xảo. Sẽ mua thêm!', createdAt: '2025-05-20' },
    { _id: 'm4', user: { fullName: 'Lê Văn Đức' }, rating: 5, content: 'Mua về trưng bày trên bàn làm việc, ai vào cũng hỏi mua ở đâu. Câu chuyện văn hóa đằng sau sản phẩm rất ý nghĩa.', createdAt: '2025-06-01' },
    { _id: 'm5', user: { fullName: 'Vũ Thị Mai' }, rating: 5, content: 'Tặng sinh nhật bạn bè rất phù hợp. Sản phẩm đẹp, ý nghĩa, khác biệt so với quà thông thường.', createdAt: '2025-06-05' },
    { _id: 'm6', user: { fullName: 'Hoàng Anh Tuấn' }, rating: 4, content: 'Chất lượng tốt, giao hàng đúng hẹn. Mình trừ 1 sao vì hộp đựng hơi nhỏ so với kỳ vọng nhưng nhìn chung rất hài lòng.', createdAt: '2025-06-10' },
    { _id: 'm7', user: { fullName: 'Ngô Thị Bích' }, rating: 5, content: 'Đây là lần thứ 3 mình mua sản phẩm của Nghề Xưa Nét Mới. Chất lượng luôn ổn định, dịch vụ nhiệt tình.', createdAt: '2025-06-15' },
    { _id: 'm8', user: { fullName: 'Đinh Thanh Tùng' }, rating: 5, content: 'Mô hình tiểu cảnh rất chân thực, cảm giác như đang thu nhỏ cả một làng nghề vào lòng bàn tay. Rất đáng tiền!', createdAt: '2025-06-18' },
  ];
  const displayReviews = reviews.length > 0 ? reviews : MOCK_REVIEWS;
  const displayReviewCount = reviews.length > 0 ? (product.reviewCount ?? reviews.length) : MOCK_REVIEWS.length;

  // Mô tả sản phẩm được seed theo cấu trúc: đoạn giới thiệu, rồi các mục
  // "Thông số sản phẩm" / "Bộ sản phẩm bao gồm" / "Hướng dẫn bảo quản" mỗi dòng
  // bắt đầu bằng "- Tiêu chí: Giá trị". Tách ra để hiển thị bảng thay vì text thô.
  const SECTION_TITLES = ['Thông số sản phẩm', 'Bộ sản phẩm bao gồm', 'Hướng dẫn bảo quản'];
  const descRaw: string = product.description?.[lang] ?? '';
  const descBlocks = descRaw.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  const introParagraphs = descBlocks.filter((b) => !SECTION_TITLES.includes(b.split('\n')[0].trim()));
  const specsBlock = descBlocks.find((b) => b.split('\n')[0].trim() === 'Thông số sản phẩm');
  const includesBlock = descBlocks.find((b) => b.split('\n')[0].trim() === 'Bộ sản phẩm bao gồm');
  const careBlock = descBlocks.find((b) => b.split('\n')[0].trim() === 'Hướng dẫn bảo quản');

  const parseSpecRows = (block?: string) => {
    if (!block) return [];
    return block
      .split('\n')
      .slice(1)
      .map((line) => line.replace(/^-\s*/, ''))
      .filter(Boolean)
      .map((line) => {
        const idx = line.indexOf(':');
        return idx === -1 ? [line, ''] : [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
      });
  };
  const parseListItems = (block?: string) => {
    if (!block) return [];
    return block
      .split('\n')
      .slice(1)
      .map((line) => line.replace(/^-\s*/, '').trim())
      .filter(Boolean);
  };

  const specRows = parseSpecRows(specsBlock);
  const includesItems = parseListItems(includesBlock);
  const careItems = parseListItems(careBlock);

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8 py-2.5 flex items-center gap-1 text-xs text-gray-500">
          <Link to="/" className="hover:text-[#C9973A]">Trang chủ</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-[#C9973A]">Cửa hàng</Link>
          <ChevronRight size={12} />
          <span className="text-[#ab2124] truncate max-w-[200px]">{product.name[lang]}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-4 space-y-3">

        {/* ── Main product card ─────────────────────────────────────── */}
        <div className="bg-white rounded-sm shadow-sm p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10">

            {/* Images */}
            <div className="md:col-span-5">
              {/* Ảnh chính dạng slide */}
              <div className="aspect-square bg-[#F9F5EE] rounded-sm overflow-hidden border border-gray-100 relative group">
                <img
                  src={images[activeImg] ?? PLACEHOLDER}
                  alt={product.name[lang]}
                  loading="eager"
                  className="w-full h-full object-cover transition-opacity duration-200"
                />
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#ab2124] flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      aria-label="Ảnh trước"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveImg(i => (i + 1) % images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#ab2124] flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      aria-label="Ảnh tiếp theo"
                    >
                      <ChevronRight size={18} />
                    </button>
                    <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
                      {activeImg + 1}/{images.length}
                    </span>
                  </>
                )}
                <Link
                  to={`/ar/${product._id}`}
                  className="absolute bottom-3 right-3 bg-[#C9973A] text-white px-3 py-1.5 rounded-sm text-[11px] font-bold tracking-wide flex items-center gap-1 shadow-md hover:bg-[#b8852e] transition-colors"
                >
                  <Sparkles size={13} />
                  XEM AR 3D
                </Link>
              </div>

              {/* Thumbnail slide ngang */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-2 overflow-x-auto pb-1 scrollbar-thin">
                  {images.map((src, i) => (
                    <button
                      key={src + i}
                      type="button"
                      onClick={() => setActiveImg(i)}
                      className={`shrink-0 w-16 h-16 rounded-sm overflow-hidden border-2 transition-colors cursor-pointer ${
                        i === activeImg ? 'border-[#C9973A]' : 'border-gray-100 hover:border-[#C9973A]/40'
                      }`}
                    >
                      <img src={src} alt={`${product.name[lang]} ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
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
                <h1 className="text-lg md:text-xl font-medium text-[#ab2124] mt-1 leading-snug text-title-gradient">
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
                <span className="text-gray-500">{displayReviewCount} Đánh Giá</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">Đã Bán {product.soldCount && product.soldCount > 0 ? product.soldCount : 14}</span>
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
                  <span className="text-gray-400 w-32 shrink-0">Loại sản phẩm</span>
                  <span className="text-[#ab2124]">Mô hình tiểu cảnh làng nghề 3D</span>
                </div>
                {product.village?.name?.[lang] && (
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-32 shrink-0">Chủ đề làng nghề</span>
                    <span className="text-[#ab2124]">{product.village.name[lang]}</span>
                  </div>
                )}
                <div className="flex gap-2">
                  <span className="text-gray-400 w-32 shrink-0">Công nghệ</span>
                  <span className="text-[#ab2124]">Tích hợp AR — quét mã để xem 3D</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-400 w-32 shrink-0">Xuất xứ</span>
                  <span className="text-[#ab2124]">Việt Nam — Nghề Xưa Nét Mới</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-400 w-32 shrink-0">Tình trạng</span>
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

            </div>
          </div>
        </div>

        {/* ── Description ─────────────────────────────────────────── */}
        <div className="bg-white rounded-sm shadow-sm p-4 md:p-6">
          <h2 className="text-sm font-bold text-[#ab2124] uppercase tracking-wider pb-3 border-b border-gray-100 mb-4 text-title-gradient">
            Mô Tả Sản Phẩm
          </h2>
          <div className="text-sm text-gray-700 leading-relaxed space-y-3">
            {introParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <p>
              Đây là mô hình tiểu cảnh 3D tái hiện không gian và quy trình sản xuất của{' '}
              <strong>{product.village?.name?.[lang] ?? 'làng nghề truyền thống Việt Nam'}</strong>.
              Mỗi sản phẩm được chế tác thủ công tỉ mỉ, kết hợp công nghệ AR để bạn có thể quét mã và khám phá toàn bộ câu chuyện làng nghề ngay trên điện thoại.
            </p>

            {specRows.length > 0 && (
              <div className="pt-3">
                <h3 className="text-sm font-bold text-[#ab2124] mb-2">Thông số sản phẩm</h3>
                <div className="overflow-x-auto border border-gray-200 rounded-sm">
                  <table className="w-full text-sm">
                    <tbody>
                      {specRows.map(([label, value], i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-[#FAFAF5]' : 'bg-white'}>
                          <td className="py-2 px-3 w-1/3 font-medium text-gray-500 border-b border-gray-100 align-top">
                            {label}
                          </td>
                          <td className="py-2 px-3 text-[#ab2124] border-b border-gray-100 align-top">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {includesItems.length > 0 && (
              <div className="pt-3">
                <h3 className="text-sm font-bold text-[#ab2124] mb-2">Bộ sản phẩm bao gồm</h3>
                <ul className="space-y-1.5">
                  {includesItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C9973A] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C9973A] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {careItems.length > 0 && (
              <div className="pt-3">
                <h3 className="text-sm font-bold text-[#ab2124] mb-2">Hướng dẫn bảo quản</h3>
                <ul className="space-y-1.5">
                  {careItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C9973A] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C9973A] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { label: 'Thủ công mỹ nghệ', desc: 'Từng chi tiết được làm thủ công bởi nghệ nhân lành nghề' },
                { label: 'Tích hợp AR 3D', desc: 'Quét mã để khám phá quy trình sản xuất làng nghề qua AR' },
                { label: 'Câu chuyện văn hóa', desc: 'Mỗi mô hình mang theo lịch sử và tinh thần của làng nghề' },
              ].map((item, i) => (
                <div key={i} className="bg-[#FAFAF5] border border-gray-100 rounded-sm p-3">
                  <p className="text-xs font-bold text-[#ab2124] mb-1">{item.label}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            {product.processVideoUrl && (
              <div className="aspect-video max-w-2xl bg-black rounded-sm overflow-hidden mt-4">
                <iframe title="Video chế tác" className="w-full h-full" src={product.processVideoUrl} allowFullScreen />
              </div>
            )}
          </div>
        </div>

        {/* ── Reviews ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-sm shadow-sm p-4 md:p-6">
          <h2 className="text-sm font-bold text-[#ab2124] uppercase tracking-wider pb-3 border-b border-gray-100 mb-4 flex items-center gap-2 text-title-gradient">
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
              {displayReviewCount} đánh giá từ khách hàng
            </div>
          </div>

          {/* Review list */}
          <div className="space-y-4 mb-8">
            {displayReviews.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
            ) : (
              displayReviews.map((r: any) => (
                <div key={r._id} className="flex gap-3 py-4 border-b border-gray-50 last:border-0">
                  <div className="w-9 h-9 rounded-full bg-[#EDE3CE] flex items-center justify-center text-sm font-bold text-[#ab2124] shrink-0">
                    {(r.user?.fullName ?? r.guestName ?? 'K').charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#ab2124]">{r.user?.fullName ?? r.guestName ?? 'Khách hàng'}</span>
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
            <h3 className="text-sm font-semibold text-[#ab2124] mb-4">Viết đánh giá của bạn</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 block mb-1">Tên của bạn *</label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={newReview.guestName}
                  onChange={e => setNewReview(r => ({ ...r, guestName: e.target.value }))}
                  className="w-full max-w-xs p-2.5 border border-gray-200 rounded-sm text-sm text-[#ab2124] focus:outline-none focus:border-[#C9973A]"
                />
              </div>
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
                className="w-full p-3 border border-gray-200 rounded-sm text-sm text-[#ab2124] focus:outline-none focus:border-[#C9973A] resize-none"
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
            <h2 className="text-sm font-bold text-[#ab2124] uppercase tracking-wider pb-3 border-b border-gray-100 mb-4 text-title-gradient">
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
                    <p className="text-xs text-[#ab2124] line-clamp-2 leading-tight">{p.name?.vi}</p>
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
