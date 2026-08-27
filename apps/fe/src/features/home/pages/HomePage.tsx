import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { articles } from '@/features/news/data/articles';
import HeroBanner from '../components/HeroBanner';
import CategoryTiles from '../components/CategoryTiles';
import ProductCard, { Product } from '../components/ProductCard';
import { useCart } from '@/context/CartContext';
import { X, Calendar, MapPin, Award, ArrowRight, Star, ShieldCheck, Truck } from 'lucide-react';
import { useFeaturedProducts } from '../../products/hooks/useProducts';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
        className="relative bg-[#ab2124]/5 py-12 md:py-24 overflow-hidden border-t border-b border-[#D4B896]/20"
      >
        {/* Calligraphic Watermark */}
        <div className="absolute inset-0 flex items-center justify-center text-[60px] md:text-[110px] lg:text-[180px] font-bold text-[#C9973A]/5 select-none pointer-events-none uppercase tracking-[0.15em] leading-none overflow-hidden">
          DI SẢN
        </div>

        {/* Logo seal */}
        <div className="hidden md:flex absolute right-8 md:right-16 top-10 md:top-12 w-24 h-24 rounded-full overflow-hidden border border-[#7B1C2E]/25 rotate-12 pointer-events-none select-none">
          <img src="/image/logo_new.jpg" alt="Logo Nghề Xưa Nét Mới" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-8 max-w-5xl space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="reveal text-[13px] font-bold tracking-[0.2em] text-[#ab2124] uppercase block">
              {t('home.story.subtitle')}
            </span>
            <h2 className="reveal delay-150 text-2xl md:text-3xl lg:text-[40px] font-bold text-[#ab2124] leading-tight text-title-gradient">
              {t('home.story.title')}
            </h2>
            <div className="reveal delay-225 w-12 h-[1px] bg-[#C9973A]/60 mx-auto" />
            <p className="reveal delay-300 text-base md:text-lg text-[#ab2124] leading-relaxed max-w-4xl mx-auto text-justify text-pretty">
              {t('home.story.desc')}
            </p>
          </div>

          {/* 3 pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal delay-300">
            {[
              {
                icon: <Award size={28} className="text-[#C9973A]" />,
                title: t('home.story.pillar1_title'),
                desc: t('home.story.pillar1_desc'),
              },
              {
                icon: <MapPin size={28} className="text-[#C9973A]" />,
                title: t('home.story.pillar2_title'),
                desc: t('home.story.pillar2_desc'),
              },
              {
                icon: <Star size={28} className="text-[#C9973A]" />,
                title: t('home.story.pillar3_title'),
                desc: t('home.story.pillar3_desc'),
              },
            ].map((item, i) => (
              <div key={i} className="bg-[#fff8e7] border border-[#D4B896] rounded-[6px] p-6 space-y-3 hover:border-[#C9973A] transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#EDE3CE] flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#ab2124] text-base">{item.title}</h3>
                <p className="text-sm text-[#ab2124] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center reveal delay-400">
            <Link
              to="/villages"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#7B1C2E] text-[#fff8e7] text-sm font-bold tracking-wider uppercase rounded-sm hover:bg-[#9B2438] transition-colors"
            >
              {t('home.story.cta')}
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>


      {/* 4. Trust & Credibility Section */}
      <section className="container mx-auto px-6 md:px-8 space-y-12">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 reveal">
          {[
            { value: '5+', label: t('home.stats.villages'), icon: <MapPin size={20} className="text-[#C9973A]" /> },
            { value: '1 năm', label: t('home.stats.warranty'), icon: <ShieldCheck size={20} className="text-[#C9973A]" /> },
            { value: '98%', label: t('home.stats.satisfaction'), icon: <Star size={20} className="text-[#C9973A]" /> },
            { value: '2-5 ngày', label: t('home.stats.shipping'), icon: <Truck size={20} className="text-[#C9973A]" /> },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-2 p-6 border border-[#D4B896]/40 rounded-[4px] bg-[#fff8e7]/60 hover:border-[#C9973A]/60 transition-colors">
              {stat.icon}
              <span className="text-3xl font-bold text-[#ab2124]">{stat.value}</span>
              <span className="text-[11px] text-[#ab2124] leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>

      </section>

      {/* Logo Divider */}
      <div className="container mx-auto px-6 md:px-8 py-4 flex items-center justify-center gap-4 reveal">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C9973A]/40" />
        <img src="/image/logo_new.jpg" alt="Nghề Xưa Nét Mới" className="w-10 h-10 rounded-full object-cover border border-[#C9973A]/40" />
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C9973A]/40" />
      </div>

      {/* 5. News / Blog Section */}
      <section className="container mx-auto px-6 md:px-8 space-y-8">
        <div className="text-center space-y-3 reveal">
          <span className="text-[13px] font-bold tracking-[0.18em] text-[#7B1C2E] uppercase block">{t('home.news.subtitle')}</span>
          <h2 className="text-3xl md:text-[36px] font-bold text-[#ab2124] tracking-wide text-title-gradient">{t('home.news.title')}</h2>
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
                <div className="p-5 space-y-3 bg-[#fff8e7]">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-bold tracking-wider text-[#7B1C2E] uppercase bg-[#7B1C2E]/10 px-2 py-0.5 rounded-full">
                      {article.tag}
                    </span>
                    <span className="text-[10px] text-[#ab2124] flex items-center gap-1">
                      <Calendar size={10} /> {article.date}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#ab2124] leading-snug group-hover:text-[#7B1C2E] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[12px] text-[#ab2124]/80 leading-relaxed line-clamp-2">{article.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C9973A] tracking-wide group-hover:gap-2 transition-all">
                    {t('home.news.read_more')} <ArrowRight size={11} />
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
          <span className="text-[13px] font-bold tracking-[0.18em] text-[#7B1C2E] uppercase block">{t('home.testimonials.subtitle')}</span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#ab2124] text-title-gradient">{t('home.testimonials.title')}</h2>
          <div className="w-12 h-[1px] bg-[#C9973A] mx-auto mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t('home.testimonials.items', { returnObjects: true }).map((t: any, idx: number) => (
            <div key={t.name} className={`reveal ${idx === 1 ? 'delay-150' : idx === 2 ? 'delay-300' : ''} bg-[#fff8e7] border border-[#D4B896]/50 rounded-[6px] p-5 space-y-3 hover:border-[#C9973A]/50 transition-colors`}>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className="text-[#C9973A] fill-[#C9973A]" />
                ))}
              </div>
              <p className="text-sm text-[#ab2124]/80 leading-relaxed italic">"{t.text}"</p>
              <div className="pt-1 border-t border-[#D4B896]/30">
                <span className="text-[12px] font-bold text-[#ab2124] block">{t.name}</span>
                <span className="text-[10px] text-[#ab2124]">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* View Details Modal with Seller Story Card inside */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#ab2124]/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedProduct(null)}
          />

          <div className="relative bg-[#fff8e7] border-[2px] border-[#C9973A] rounded-[8px] max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 shadow-overlay flex flex-col md:flex-row p-6 gap-6">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-[#ab2124] hover:text-[#7B1C2E] transition-colors p-1"
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
              <div className="bg-[#fff8e7] border border-[#D4B896] p-4 rounded-[6px] space-y-2">
                <span className="text-[13px] font-bold tracking-wider text-[#ab2124] uppercase block">
                  {t('home.product_modal.details_title')}
                </span>
                <ul className="text-[13px] text-[#ab2124] space-y-1">
                  <li><strong>{t('home.product_modal.origin')}</strong> {selectedProduct.origin}</li>
                  <li><strong>{t('home.product_modal.material')}</strong> {selectedProduct.material}</li>
                  <li><strong>{t('home.product_modal.status')}</strong> {selectedProduct.stockStatus === 'in_stock' ? t('home.product_modal.in_stock') : t('home.product_modal.made_to_order')}</li>
                </ul>
              </div>
            </div>

            {/* Product Details Content & Seller Story Card */}
            <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[13px] font-bold tracking-[0.14em] text-[#ab2124] uppercase block">
                  {selectedProduct.category}
                </span>

                <h3 className="text-[28px] font-bold text-[#ab2124] leading-tight">
                  {selectedProduct.name}
                </h3>

                <div className="text-2xl font-bold text-[#7B1C2E]">
                  {selectedProduct.price.toLocaleString('vi-VN')}
                  <span className="text-[13px] font-semibold align-super ml-0.5">₫</span>
                </div>

                <p className="text-sm text-[#ab2124] leading-relaxed">
                  {t('home.product_modal.desc')}
                </p>
              </div>

              {/* Seller Story Card */}
              {selectedProduct.makerName && (
                <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[8px] p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ab2124] flex items-center justify-center text-[#fff8e7] text-lg font-bold">
                      {selectedProduct.makerName[0]}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#ab2124] leading-tight">
                        {selectedProduct.makerName}
                      </h4>
                      <span className="text-[9px] font-semibold tracking-wider uppercase text-[#ab2124]">
                        {t('home.product_modal.maker_province')} {selectedProduct.makerProvince}
                      </span>
                    </div>
                  </div>
                  <p className="text-[12px] text-[#ab2124]/80 leading-relaxed italic">
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
                className="w-full h-11 bg-[#ab2124] text-[#fff8e7] text-[12px] font-bold tracking-wider uppercase rounded-full hover:bg-[#ab2124] active:scale-[0.97] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 border border-[#C9973A]/20 shadow-md"
              >
                {selectedProduct.stockStatus === 'out_of_stock' ? t('home.product_modal.out_of_stock') : t('home.product_modal.add_to_cart')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
