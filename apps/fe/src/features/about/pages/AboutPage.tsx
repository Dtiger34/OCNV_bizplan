import { Link } from 'react-router-dom';
import { Landmark, Sparkles, GraduationCap, Users, Leaf, ArrowRight, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const getValues = (t: any) => [
  {
    icon: <Landmark size={26} className="text-[#C9973A]" />,
    title: t('about.values.authenticity.title'),
    subtitle: t('about.values.authenticity.subtitle'),
    desc: t('about.values.authenticity.desc'),
  },
  {
    icon: <Sparkles size={26} className="text-[#C9973A]" />,
    title: t('about.values.innovation.title'),
    subtitle: t('about.values.innovation.subtitle'),
    desc: t('about.values.innovation.desc'),
  },
  {
    icon: <GraduationCap size={26} className="text-[#C9973A]" />,
    title: t('about.values.learning.title'),
    subtitle: t('about.values.learning.subtitle'),
    desc: t('about.values.learning.desc'),
  },
  {
    icon: <Users size={26} className="text-[#C9973A]" />,
    title: t('about.values.community.title'),
    subtitle: t('about.values.community.subtitle'),
    desc: t('about.values.community.desc'),
  },
  {
    icon: <Leaf size={26} className="text-[#C9973A]" />,
    title: t('about.values.sustainability.title'),
    subtitle: t('about.values.sustainability.subtitle'),
    desc: t('about.values.sustainability.desc'),
  },
];

const getStats = (t: any) => [
  { value: '5+', label: t('about.stats.villages') },
  { value: '100+', label: t('about.stats.history') },
  { value: 'AR', label: t('about.stats.interaction') },
];

const VILLAGE_IMAGES = [
  { src: '/image/lang-gom.jpg', label: 'Gốm Bát Tràng' },
  { src: '/image/lang-lua.jpg', label: 'Lụa Vạn Phúc' },
  { src: '/image/lang-non.webp', label: 'Nón Chuông' },
  { src: '/image/lang-huong.webp', label: 'Hương Quảng Phú Cầu' },
  { src: '/image/lang-quat.jpg', label: 'Quạt giấy' },
];

export default function AboutPage() {
  const { t } = useTranslation();
  
  return (
    <div className="bg-[#fff8e7] min-h-screen">
      {/* Hero — ảnh nền làng nghề phủ overlay đỏ, chữ + số liệu đè lên trên */}
      <section className="relative overflow-hidden">
        <img
          src="/image/anh-cau-chuyen-lang-nghe.jpg"
          alt="Làng nghề truyền thống Việt Nam"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#ab2124]/85" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff8e7 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="container mx-auto px-6 md:px-10 max-w-6xl relative grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-4 items-center py-20 md:py-28">
          <div className="space-y-6 reveal-left in-view">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] text-[#C9973A] uppercase">
              <span className="w-8 h-px bg-[#C9973A]" />
              {t('about.hero.subtitle')}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05]" dangerouslySetInnerHTML={{ __html: t('about.hero.title') }} />
            <p className="text-[#C9B99A] text-sm md:text-base leading-relaxed text-justify text-pretty max-w-xl">
              {t('about.hero.desc')}
            </p>
          </div>

          {/* Cột số liệu — xếp dọc, kẻ ngăn cách, khác hẳn lưới 4 ô căn giữa cũ */}
          <div className="reveal-right in-view border-t border-white/15 lg:border-t-0 lg:border-l lg:pl-10 pt-8 lg:pt-0 divide-y divide-white/15">
            {getStats(t).map((s) => (
              <div key={s.label} className="flex items-baseline justify-between py-4 first:pt-0">
                <span className="text-3xl md:text-4xl font-bold text-title-gradient">{s.value}</span>
                <span className="text-xs text-[#C9B99A] uppercase tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tầm nhìn & Sứ mệnh — mỗi mục kèm khung ảnh làng nghề, xen kẽ trái/phải */}
      <section className="container mx-auto px-6 md:px-10 max-w-5xl py-20 md:py-28 space-y-16 md:space-y-24">
        <div className="reveal-left in-view grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-3 order-2 md:order-1">
            <span className="text-[64px] md:text-[80px] leading-none font-bold text-[#C9973A]/15 select-none block">
              01
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#ab2124] text-title-gradient">{t('about.vision.title')}</h2>
            <p className="text-sm md:text-base text-[#ab2124] leading-relaxed text-justify text-pretty">
              {t('about.vision.desc')}
            </p>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="absolute -inset-3 border-2 border-[#C9973A]/40 rounded-lg -z-10 hidden md:block" />
            <img
              src="/image/lang-gom.jpg"
              alt="Tầm nhìn — làng nghề gốm Bát Tràng"
              className="w-full h-56 md:h-72 object-cover rounded-lg shadow-large"
            />
          </div>
        </div>

        <div className="reveal-right in-view grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-3 border-2 border-[#C9973A]/40 rounded-lg -z-10 hidden md:block" />
            <img
              src="/image/lang-lua.jpg"
              alt="Sứ mệnh — làng lụa Vạn Phúc"
              className="w-full h-56 md:h-72 object-cover rounded-lg shadow-large"
            />
          </div>
          <div className="space-y-3">
            <span className="text-[64px] md:text-[80px] leading-none font-bold text-[#C9973A]/15 select-none block">
              02
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#ab2124] text-title-gradient">{t('about.mission.title')}</h2>
            <p className="text-sm md:text-base text-[#ab2124] leading-relaxed text-justify text-pretty">
              {t('about.mission.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Dải ảnh làng nghề — phá khối chữ trước khi vào Core Values */}
      <section className="grid grid-cols-2 md:grid-cols-5 reveal in-view">
        {VILLAGE_IMAGES.map((v) => (
          <div key={v.label} className="relative h-40 md:h-52 overflow-hidden group">
            <img
              src={v.src}
              alt={v.label}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#ab2124]/80 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 right-2 text-[11px] md:text-xs font-semibold text-white leading-tight">
              {v.label}
            </span>
          </div>
        ))}
      </section>

      {/* Core Values — danh sách ngang có số đếm, thay cho lưới card 3 cột */}
      <section className="bg-[#ab2124] py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-10 max-w-5xl">
          <div className="mb-14 reveal in-view">
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#C9973A] uppercase block mb-3">
              Core Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{t('about.values_title')}</h2>
          </div>

          <div className="divide-y divide-white/15">
            {getValues(t).map((item, i) => (
              <div
                key={item.title}
                className="reveal in-view group py-8 grid grid-cols-1 md:grid-cols-[80px_auto_1fr] gap-4 md:gap-8 items-start"
              >
                <span className="text-2xl font-bold text-[#C9973A]/40 group-hover:text-[#C9973A] transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-12 h-12 shrink-0 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#C9973A]/20 transition-colors">
                  {item.icon}
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-bold text-white text-lg">{item.title}</h3>
                    <span className="text-xs font-semibold text-[#C9973A] uppercase tracking-wide">
                      {item.subtitle}
                    </span>
                  </div>
                  <p className="text-sm text-[#C9B99A] leading-relaxed text-justify text-pretty max-w-2xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote kết */}
      <section className="container mx-auto px-6 md:px-10 max-w-3xl py-20 md:py-28 text-center space-y-6 reveal in-view">
        <Quote size={36} className="mx-auto text-[#C9973A]/60" />
        <p className="text-lg md:text-2xl text-[#ab2124] italic leading-relaxed font-medium">
          {t('about.quote')}
        </p>
        <div className="w-12 h-[1px] bg-[#C9973A]/60 mx-auto" />
        <Link
          to="/villages"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#7B1C2E] text-[#fff8e7] text-sm font-bold tracking-wider uppercase rounded-full hover:bg-[#9B2438] shadow-gold-glow transition-colors"
        >
          {t('about.cta')}
          <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}
