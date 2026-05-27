import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Heart, ShoppingCart, Video, Sparkles, MessageSquare, Star, ArrowLeft } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'video' | 'reviews'>('info');
  const [inWishlist, setInWishlist] = useState(false);
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Hoàng Minh Tuấn', rating: 5, content: 'Chất gỗ rất đằm, long phụng chạm khắc nổi mây cuốn nhìn rất uy nghiêm.', date: '25/05/2026' },
    { id: 2, user: 'Lê Thị Mai', rating: 4, content: 'Men rạn bóng loáng phảng phất vẻ cổ xưa rất trang nhã.', date: '20/05/2026' }
  ]);

  const [newReview, setNewReview] = useState({ rating: 5, content: '' });

  // Mock Products Database matching HomePage
  const products = useMemo(() => [
    {
      id: 'tieu-canh-bat-trang',
      name: 'Mô Hình Làng Gốm Bát Tràng',
      price: 1250000,
      image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
      category: 'Hộp Làng Gốm',
      material: 'Mica acrylic, Gỗ MDF, Đất sét',
      origin: 'Phân xưởng Nghề Xưa Nét Mới',
      stockStatus: 'in_stock',
      badgeText: 'Còn Hàng',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Mô hình tiểu cảnh diorama gỗ ghép nhiều lớp tái hiện nghệ nhân làm gốm vuốt đất sét trên bàn xoay thủ công bên lò nung gạch cổ kính.'
    },
    {
      id: 'tieu-canh-van-phuc',
      name: 'Mô Hình Làng Lụa Vạn Phúc',
      price: 1450000,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      category: 'Hộp Làng Lụa',
      material: 'Mica acrylic, Gỗ MDF, Tơ tằm',
      origin: 'Phân xưởng Nghề Xưa Nét Mới',
      stockStatus: 'low_stock',
      badgeText: 'Sắp Hết',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Mô hình tiểu cảnh diorama gỗ ghép nhiều lớp tái hiện sinh động khung dệt cửi tơ tằm cổ điển với các sấp lụa là óng ả.'
    },
    {
      id: 'tieu-canh-quang-phu-cau',
      name: 'Mô Hình Làng Hương Quảng Phú Cầu',
      price: 1350000,
      image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
      category: 'Hộp Làng Hương',
      material: 'Mica acrylic, Gỗ MDF, Nhang màu',
      origin: 'Phân xưởng Nghề Xưa Nét Mới',
      stockStatus: 'in_stock',
      badgeText: 'Nổi Bật',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Tái hiện sân phơi hương Quảng Phú Cầu đỏ rực xếp hình đóa hoa rực rỡ dưới nắng vàng vùng quê bắc bộ.'
    }
  ], []);

  const product = products.find((p) => p.id === id) || products[0];

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.content.trim()) {
      setReviews([
        ...reviews,
        {
          id: Date.now(),
          user: 'Nguyễn Minh Tuấn',
          rating: newReview.rating,
          content: newReview.content,
          date: 'Hôm nay'
        }
      ]);
      setNewReview({ rating: 5, content: '' });
    }
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      material: product.material,
      origin: product.origin
    });
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-6 md:px-8 py-8 space-y-12">
      {/* Back Link */}
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider text-[#5C3D1E] hover:text-[#7B1C2E] uppercase transition-colors"
      >
        <ArrowLeft size={14} />
        Quay lại gian hàng
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Gallery / 3D section */}
        <div className="lg:col-span-7 space-y-4 reveal-left">
          <div className="relative aspect-[4/3] bg-[#EDE3CE] border border-[#D4B896] rounded-[8px] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* View AR badge */}
            <Link
              to={`/ar/${product.id}`}
              className="absolute bottom-4 right-4 bg-[#C9973A] text-[#FDF6E3] hover:bg-[#3A1A0A] px-4 py-2 rounded-sm shadow-medium text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all"
            >
              <Sparkles size={16} />
              TRẢI NGHIỆM AR
            </Link>
          </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 reveal-right">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-[0.14em] text-[#7A5A1A] uppercase">
                {product.category}
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-[#3A6B4A] bg-[rgba(58,107,74,0.1)] text-[#3A6B4A] rounded-sm">
                {product.badgeText}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-normal text-[#2C1A0E]">
              {product.name}
            </h1>

            <div className="flex items-center gap-1.5 text-[#C9973A]">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={15} fill="currentColor" />
                ))}
              </div>
              <span className="text-xs text-[#9C8670] mt-0.5">
                ({reviews.length} đánh giá từ khách hàng)
              </span>
            </div>

            <div className="text-3xl font-bold text-[#7B1C2E] py-2 border-y border-[#D4B896]/30">
              {product.price.toLocaleString('vi-VN')}
              <span className="text-sm font-semibold align-super ml-0.5">₫</span>
            </div>

            <ul className="text-sm text-[#2C1A0E] space-y-2">
              <li><strong>Chất liệu cốt:</strong> {product.material}</li>
              <li><strong>Làng nghề:</strong> {product.origin}</li>
              <li><strong>Hộp lót gấm:</strong> Tặng kèm hộp ngọc chạm chỉ vàng</li>
            </ul>
          </div>

          <div className="space-y-3 pt-6">
            <div className="flex gap-4">
              <button
                onClick={() => addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  material: product.material,
                  origin: product.origin
                })}
                className="flex-1 h-12 bg-[#5C3D1E] hover:bg-[#7A5230] text-[#F5EDD6] text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
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
              className="w-full h-12 bg-[#7B1C2E] hover:bg-[#9B2438] text-[#F5EDD6] text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            >
              MUA NGAY LẬP TỨC
            </button>
          </div>
        </div>
      </div>

      {/* Tabs description */}
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

        {/* Tab contents */}
        <div className="text-sm text-[#2C1A0E] leading-relaxed">
          {activeTab === 'info' && (
            <div className="space-y-4 max-w-3xl">
              <p>{product.description}</p>
              <p>Mỗi tác phẩm diorama là độc bản, tốn nhiều giờ kỳ công lắp ghép, phủ màu bóng và tích hợp đèn LED từ các nghệ nhân lành nghề.</p>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="aspect-video max-w-2xl bg-black rounded-md overflow-hidden border border-[#D4B896]">
              <iframe
                title="Quy trình chế tác"
                className="w-full h-full"
                src={product.videoUrl}
                allowFullScreen
              />
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-3xl">
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="p-4 bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#5C3D1E]">
                      <span>{r.user}</span>
                      <span className="text-[#9C8670]">{r.date}</span>
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

              {/* Review Form */}
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

                <div className="space-y-2">
                  <textarea
                    rows={4}
                    placeholder="Bút tích bình phẩm tại đây..."
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    className="w-full p-3 border border-[#D4B896] bg-[#FDF6E3] rounded-sm text-sm text-[#2C1A0E] focus:outline-none focus:border-[#C9973A]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5C3D1E] hover:bg-[#7A5230] text-[#F5EDD6] text-[11px] font-bold tracking-wider uppercase rounded-sm cursor-pointer"
                >
                  Gửi Đánh Giá
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
