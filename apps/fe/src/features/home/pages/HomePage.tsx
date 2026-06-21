import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { articles } from '@/features/news/data/articles';
import HeroBanner from '../components/HeroBanner';
import CategoryTiles from '../components/CategoryTiles';
import ProductCard, { Product } from '../components/ProductCard';
import { useCart } from '@/context/CartContext';
import { X, Calendar, MapPin, Award, ArrowRight, Star, ShieldCheck, Truck, Clock } from 'lucide-react';
import { useFeaturedProducts } from '../../products/hooks/useProducts';

const PLACEHOLDER = 'https://placehold.co/800x800?text=OCNV';

function apiToProduct(p: any): Product {
  const stock: number = p.stock ?? 0;
  const stockStatus = stock === 0 ? 'out_of_stock' : stock <= 3 ? 'low_stock' : 'in_stock';
  return {
    id: p._id,
    name: p.name?.vi ?? '',
    price: p.price,
    image: p.mainImageUrl ?? PLACEHOLDER,
    category: p.village?.name?.vi ?? '',
    material: '',
    origin: p.village?.name?.vi ?? 'OCNV',
    stockStatus,
    badgeText: stockStatus === 'out_of_stock' ? 'Hết Hàng' : stockStatus === 'low_stock' ? 'Sắp Hết' : 'Còn Hàng',
    makerName: '',
    makerProvince: '',
    makerStory: '',
  };
}

export default function HomePage() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { data: featuredRaw = [] } = useFeaturedProducts();
  const featuredProducts = featuredRaw.map(apiToProduct);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) setScrollProgress((window.scrollY / totalHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectCategoryFromTile = (categoryName: string) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="space-y-12 relative">
      {/* Pinned Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-[#C9973A] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* Gold Accent Divider between Hero and Categories */}
      <div className="container mx-auto px-6 md:px-8 reveal">
        <div className="h-[1px] bg-[#C9973A]/30 w-full" />
      </div>

      {/* 2. Category Tiles */}
      <div className="container mx-auto px-6 md:px-8 reveal">
        <CategoryTiles onSelectCategory={handleSelectCategoryFromTile} />
      </div>

      {/* 3. Brand Story Section */}
      <section
        id="story-section"
        className="relative bg-[#3A1A0A]/5 py-12 md:py-24 overflow-hidden border-t border-b border-[#D4B896]/20"
      >
        {/* Calligraphic Watermark */}
        <div className="absolute inset-0 flex items-center justify-center text-[60px] md:text-[110px] lg:text-[180px] font-bold text-[#C9973A]/5 select-none pointer-events-none uppercase tracking-[0.15em] leading-none overflow-hidden">
          DI SẢN
        </div>

        {/* Ink seal */}
        <div className="hidden md:flex absolute right-8 md:right-16 top-10 md:top-12 bg-[#7B1C2E]/5 rounded-full border border-[#7B1C2E]/25 w-24 h-24 flex-col items-center justify-center text-[8px] font-bold text-[#7B1C2E]/50 uppercase tracking-[0.18em] rotate-12 pointer-events-none select-none animate-spin-slow">
          <span>NGHỀ XƯA</span>
          <span>NÉT MỚI</span>
          <span className="text-[6px] border-t border-[#7B1C2E]/30 mt-0.5 pt-0.5">ẤN KÝ</span>
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-8 max-w-5xl space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="reveal text-[11px] font-bold tracking-[0.2em] text-[#7A5A1A] uppercase block">
              BẢN SẮC CỦA CHÚNG TÔI
            </span>
            <h2 className="reveal delay-150 text-2xl md:text-3xl lg:text-[40px] font-bold text-[#2C1A0E] leading-tight">
              Sức Sống Mới Cho Di Sản Việt
            </h2>
            <div className="reveal delay-225 w-12 h-[1px] bg-[#C9973A]/60 mx-auto" />
            <p className="reveal delay-300 text-base md:text-lg text-[#5C3D1E] leading-relaxed max-w-3xl mx-auto">
              Nghề Xưa Nét Mới là dự án kết hợp thủ công mỹ nghệ truyền thống và công nghệ hiện đại — mang câu chuyện của những làng nghề Việt Nam đến gần hơn với mọi người.
            </p>
          </div>

          {/* 3 pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal delay-300">
            {[
              {
                icon: <Award size={28} className="text-[#C9973A]" />,
                title: 'Sản phẩm mang câu chuyện',
                desc: 'Mỗi mô hình tiểu cảnh 3D không chỉ là vật trang trí — đó là cả một câu chuyện về làng nghề, về người nghệ nhân và tâm huyết truyền đời. Bạn sở hữu một tác phẩm, bạn giữ một ký ức văn hóa.',
              },
              {
                icon: <MapPin size={28} className="text-[#C9973A]" />,
                title: 'Quy trình làng nghề thật',
                desc: 'Từ bàn tay người thợ gốm Bát Tràng, khung cửi lụa Vạn Phúc đến lò hương Quảng Phú Cầu — chúng tôi ghi lại và tái hiện từng công đoạn thủ công qua mô hình và trải nghiệm AR sống động.',
              },
              {
                icon: <Star size={28} className="text-[#C9973A]" />,
                title: 'Khám phá văn hóa làng nghề',
                desc: 'Đi sâu vào lịch sử, con người và tinh thần của 5 làng nghề nổi tiếng Việt Nam. Mỗi trang làng nghề là một hành trình — từ nguồn gốc, quy trình đến nét đặc trưng chỉ nơi đó mới có.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6 space-y-3 hover:border-[#C9973A] transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#EDE3CE] flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#2C1A0E] text-base">{item.title}</h3>
                <p className="text-sm text-[#5C3D1E] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center reveal delay-400">
            <Link
              to="/villages"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#7B1C2E] text-[#F5EDD6] text-sm font-bold tracking-wider uppercase rounded-sm hover:bg-[#9B2438] transition-colors"
            >
              Khám phá các làng nghề
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Featured Products section */}
      <section className="container mx-auto px-6 md:px-8 space-y-8">
        <div className="text-center space-y-4 reveal">
          <span className="text-[11px] font-bold tracking-[0.18em] text-[#7B1C2E] uppercase block">
            DECOR TIỂU CẢNH
          </span>
          <h2 className="text-3xl md:text-[36px] font-bold text-[#2C1A0E] tracking-wide">
            Mô Hình Tiểu Cảnh Nổi Bật
          </h2>
          <Link
            to="/villages"
            className="group inline-flex items-center gap-2 px-5 py-2.5 border border-[#C9973A] rounded-full text-[11px] font-bold tracking-wider text-[#5C3D1E] uppercase hover:bg-[#C9973A] hover:text-[#F5EDD6] transition-all"
          >
            Câu chuyện làng nghề
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {featuredProducts.map((p, idx) => (
            <div key={p.id} className={`reveal ${idx === 0 ? 'reveal-left' : 'reveal-right'}`}>
              <ProductCard
                product={p}
                isFeatured={true}
                onViewDetails={setSelectedProduct}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Trust & Credibility Section */}
      <section className="container mx-auto px-6 md:px-8 space-y-12">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 reveal">
          {[
            { value: '5+', label: 'Làng nghề được tái hiện', icon: <MapPin size={20} className="text-[#C9973A]" /> },
            { value: '1.200+', label: 'Đơn hàng thành công', icon: <ShieldCheck size={20} className="text-[#C9973A]" /> },
            { value: '98%', label: 'Khách hàng hài lòng', icon: <Star size={20} className="text-[#C9973A]" /> },
            { value: '2-5 ngày', label: 'Giao hàng toàn quốc', icon: <Truck size={20} className="text-[#C9973A]" /> },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-2 p-6 border border-[#D4B896]/40 rounded-[4px] bg-[#FDF6E3]/60 hover:border-[#C9973A]/60 transition-colors">
              {stat.icon}
              <span className="text-3xl font-bold text-[#2C1A0E]">{stat.value}</span>
              <span className="text-[11px] text-[#5C3D1E] leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 py-6 border-t border-b border-[#D4B896]/30 reveal">
          {[
            { icon: <ShieldCheck size={18} className="text-[#C9973A]" />, text: 'Bảo hành 1 năm' },
            { icon: <Truck size={18} className="text-[#C9973A]" />, text: 'Miễn phí vận chuyển từ 800K' },
            { icon: <Clock size={18} className="text-[#C9973A]" />, text: 'Đặt làm theo yêu cầu 3-5 tuần' },
            { icon: <Award size={18} className="text-[#C9973A]" />, text: 'Nghệ nhân thủ công xác nhận' },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-2 text-[12px] font-semibold text-[#5C3D1E] tracking-wide">
              {b.icon}
              {b.text}
            </div>
          ))}
        </div>
      </section>

      {/* Ornamental Divider */}
      <div className="container mx-auto px-6 md:px-8 py-4 flex items-center justify-center gap-4 reveal">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C9973A]/40" />
        <svg className="w-8 h-8 text-[#C9973A]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C9.5 5 9.5 8 12 11c2.5-3 2.5-6 0-9z M6 7c-2 2-2 4.5 0 6.5 2-2 2-4.5 0-6.5z M18 7c2 2 2 4.5 0 6.5-2-2-2-4.5 0-6.5z M3 14c-1.5 1.5-1.5 3.5 0 5 1.5-1.5 1.5-3.5 0-5z M21 14c1.5 1.5 1.5 3.5 0 5-1.5-1.5-1.5-3.5 0-5z M12 13c-3.5 1-4.5 4-4.5 7h9c0-3-1-6-4.5-7z" />
        </svg>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C9973A]/40" />
      </div>

      {/* 5. News / Blog Section */}
      <section className="container mx-auto px-6 md:px-8 space-y-8">
        <div className="text-center space-y-3 reveal">
          <span className="text-[11px] font-bold tracking-[0.18em] text-[#7B1C2E] uppercase block">TIN TỨC & CẢM HỨNG</span>
          <h2 className="text-3xl md:text-[36px] font-bold text-[#2C1A0E] tracking-wide">Câu Chuyện Di Sản</h2>
          <div className="w-12 h-[1px] bg-[#C9973A] mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <Link
              key={article.slug}
              to={`/news/${article.slug}`}
              className={`group reveal ${idx === 1 ? 'delay-150' : idx === 2 ? 'delay-300' : ''}`}
            >
              <div className="overflow-hidden rounded-[4px] border border-[#D4B896]/40 hover:border-[#C9973A]/60 transition-colors h-full">
                <div className="overflow-hidden h-48">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-3 bg-[#FDF6E3]">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-bold tracking-wider text-[#7B1C2E] uppercase bg-[#7B1C2E]/10 px-2 py-0.5 rounded-full">
                      {article.tag}
                    </span>
                    <span className="text-[10px] text-[#9C8670] flex items-center gap-1">
                      <Calendar size={10} /> {article.date}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#2C1A0E] leading-snug group-hover:text-[#7B1C2E] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[12px] text-[#5C3D1E]/80 leading-relaxed line-clamp-2">{article.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C9973A] tracking-wide group-hover:gap-2 transition-all">
                    Đọc thêm <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 md:px-8 space-y-8 pb-16">
        <div className="text-center space-y-2 reveal">
          <span className="text-[11px] font-bold tracking-[0.18em] text-[#7B1C2E] uppercase block">KHÁCH HÀNG NÓI GÌ</span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#2C1A0E]">Cảm Nhận Thực Tế</h2>
          <div className="w-12 h-[1px] bg-[#C9973A] mx-auto mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Nguyễn Thị Lan',
              role: 'Giáo viên Mỹ thuật, Hà Nội',
              text: 'Hộp tiểu cảnh Bát Tràng chi tiết đến kinh ngạc. Tôi dùng làm đồ dùng dạy học cho học sinh về văn hóa truyền thống.',
              rating: 5,
            },
            {
              name: 'Trần Minh Quân',
              role: 'Kiến trúc sư, TP. HCM',
              text: 'Mua làm quà tặng đối tác nước ngoài. Ai cũng trầm trồ vì sự tỉ mỉ và câu chuyện văn hóa đằng sau mỗi sản phẩm.',
              rating: 5,
            },
            {
              name: 'Phạm Thu Hương',
              role: 'Blogger du lịch',
              text: 'Trải nghiệm AR khi quét mã thực sự ấn tượng. Hộp quà nhỏ nhưng mang cả một câu chuyện làng nghề sống động.',
              rating: 5,
            },
          ].map((t, idx) => (
            <div key={t.name} className={`reveal ${idx === 1 ? 'delay-150' : idx === 2 ? 'delay-300' : ''} bg-[#FDF6E3] border border-[#D4B896]/50 rounded-[6px] p-5 space-y-3 hover:border-[#C9973A]/50 transition-colors`}>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={12} className="text-[#C9973A] fill-[#C9973A]" />
                ))}
              </div>
              <p className="text-sm text-[#2C1A0E]/80 leading-relaxed italic">"{t.text}"</p>
              <div className="pt-1 border-t border-[#D4B896]/30">
                <span className="text-[12px] font-bold text-[#2C1A0E] block">{t.name}</span>
                <span className="text-[10px] text-[#9C8670]">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* View Details Modal with Seller Story Card inside */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#2C1A0E]/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedProduct(null)}
          />

          <div className="relative bg-[#FDF6E3] border-[2px] border-[#C9973A] rounded-[8px] max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 shadow-overlay flex flex-col md:flex-row p-6 gap-6">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-[#5C3D1E] hover:text-[#7B1C2E] transition-colors p-1"
            >
              <X size={22} strokeWidth={1.5} />
            </button>

            {/* Product Image */}
            <div className="w-full md:w-1/2 space-y-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full aspect-[4/3] object-cover border border-[#D4B896] rounded-[6px]"
              />

              {/* Product Info details inside modal */}
              <div className="bg-[#F5EDD6] border border-[#D4B896] p-4 rounded-[6px] space-y-2">
                <span className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase block">
                  THÔNG SỐ CHI TIẾT
                </span>
                <ul className="text-[13px] text-[#2C1A0E] space-y-1">
                  <li><strong>Xuất xứ:</strong> {selectedProduct.origin}</li>
                  <li><strong>Chất liệu:</strong> {selectedProduct.material}</li>
                  <li><strong>Tình trạng:</strong> {selectedProduct.stockStatus === 'in_stock' ? 'Còn hàng trong kho' : 'Đặt làm thủ công (3-5 tuần)'}</li>
                </ul>
              </div>
            </div>

            {/* Product Details Content & Seller Story Card */}
            <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[10px] font-bold tracking-[0.14em] text-[#7A5A1A] uppercase block">
                  {selectedProduct.category}
                </span>

                <h3 className="text-[28px] font-bold text-[#2C1A0E] leading-tight">
                  {selectedProduct.name}
                </h3>

                <div className="text-2xl font-bold text-[#7B1C2E]">
                  {selectedProduct.price.toLocaleString('vi-VN')}
                  <span className="text-[13px] font-semibold align-super ml-0.5">₫</span>
                </div>

                <p className="text-sm text-[#2C1A0E] leading-relaxed">
                  Mô hình tiểu cảnh diorama gỗ ghép nhiều lớp tinh xảo, tái hiện sống động quy trình làng nghề cổ truyền Việt Nam, đóng gói trong hộp mica bảo vệ 360 độ kèm hệ thống đèn LED ấm cúng.
                </p>
              </div>

              {/* Seller Story Card */}
              {selectedProduct.makerName && (
                <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[8px] p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#5C3D1E] flex items-center justify-center text-[#F5EDD6] text-lg font-bold">
                      {selectedProduct.makerName[0]}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#2C1A0E] leading-tight">
                        {selectedProduct.makerName}
                      </h4>
                      <span className="text-[9px] font-semibold tracking-wider uppercase text-[#9C8670]">
                        Nghệ nhân tỉnh {selectedProduct.makerProvince}
                      </span>
                    </div>
                  </div>
                  <p className="text-[12px] text-[#2C1A0E]/80 leading-relaxed italic">
                    "{selectedProduct.makerStory}"
                  </p>
                </div>
              )}

              {/* CTA Action inside modal */}
              <button
                disabled={selectedProduct.stockStatus === 'out_of_stock'}
                onClick={() => {
                  addToCart({
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    price: selectedProduct.price,
                    image: selectedProduct.image,
                    material: selectedProduct.material,
                    origin: selectedProduct.origin
                  });
                  setSelectedProduct(null);
                }}
                className="w-full h-11 bg-[#5C3D1E] text-[#F5EDD6] text-[12px] font-bold tracking-wider uppercase rounded-full hover:bg-[#7A5230] active:scale-[0.97] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 border border-[#C9973A]/20 shadow-md"
              >
                {selectedProduct.stockStatus === 'out_of_stock' ? 'HẾT HÀNG TRÊN HỆ THỐNG' : 'THÊM VÀO GIỎ HÀNG'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
