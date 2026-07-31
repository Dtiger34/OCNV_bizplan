import { Link } from 'react-router-dom';
import { Landmark, Sparkles, GraduationCap, Users, Leaf, ArrowRight, Quote } from 'lucide-react';

const VALUES = [
  {
    icon: <Landmark size={26} className="text-[#C9973A]" />,
    title: 'Cultural Authenticity',
    subtitle: 'Gìn giữ bản sắc văn hóa',
    desc: 'Tôn trọng và gìn giữ những giá trị nguyên bản của các làng nghề truyền thống Việt Nam, bảo đảm mỗi sản phẩm và trải nghiệm đều phản ánh đúng bản sắc và tinh hoa văn hóa.',
  },
  {
    icon: <Sparkles size={26} className="text-[#C9973A]" />,
    title: 'Innovation',
    subtitle: 'Đổi mới sáng tạo',
    desc: 'Kết hợp công nghệ hiện đại với tư duy sáng tạo để phát triển những trải nghiệm văn hóa hấp dẫn, đồng thời vẫn gìn giữ giá trị cốt lõi của nghề thủ công truyền thống.',
  },
  {
    icon: <GraduationCap size={26} className="text-[#C9973A]" />,
    title: 'Cultural Learning',
    subtitle: 'Lan tỏa tri thức văn hóa',
    desc: 'Chuyển tải câu chuyện và tri thức văn hóa thành những trải nghiệm trực quan, dễ tiếp cận và có tính tương tác, giúp công chúng hiểu rõ hơn về di sản làng nghề Việt Nam.',
  },
  {
    icon: <Users size={26} className="text-[#C9973A]" />,
    title: 'Community Connection',
    subtitle: 'Kết nối cộng đồng',
    desc: 'Thúc đẩy sự kết nối và hợp tác giữa nghệ nhân, cộng đồng địa phương, khách hàng và các tổ chức văn hóa nhằm cùng tạo ra giá trị và góp phần gìn giữ di sản.',
  },
  {
    icon: <Leaf size={26} className="text-[#C9973A]" />,
    title: 'Sustainability',
    subtitle: 'Phát triển bền vững',
    desc: 'Cam kết góp phần bảo tồn và phát triển bền vững các làng nghề truyền thống Việt Nam thông qua đổi mới có trách nhiệm và việc tạo ra những giá trị văn hóa lâu dài.',
  },
];

const STATS = [
  { value: '5+', label: 'Làng nghề' },
  { value: '100+', label: 'Năm lịch sử' },
  { value: 'AR', label: 'Tương tác' },
];

const VILLAGE_IMAGES = [
  { src: '/image/lang-gom.jpg', label: 'Gốm Bát Tràng' },
  { src: '/image/lang-lua.jpg', label: 'Lụa Vạn Phúc' },
  { src: '/image/lang-non.webp', label: 'Nón Chuông' },
  { src: '/image/lang-huong.webp', label: 'Hương Quảng Phú Cầu' },
  { src: '/image/lang-quat.jpg', label: 'Quạt giấy' },
];

export default function AboutPage() {
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
              Về Chúng Tôi
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">
              Nghề Xưa
              <br />
              Nét Mới
            </h1>
            <p className="text-[#C9B99A] text-sm md:text-base leading-relaxed text-justify text-pretty max-w-xl">
              Thương hiệu văn hóa sáng tạo mang đến một cách tiếp cận mới với các làng nghề truyền thống Việt Nam —
              kết hợp giá trị thủ công với AR, QR Storytelling và các sản phẩm phygital, biến mỗi sản phẩm thành
              một hành trình khám phá văn hóa.
            </p>
          </div>

          {/* Cột số liệu — xếp dọc, kẻ ngăn cách, khác hẳn lưới 4 ô căn giữa cũ */}
          <div className="reveal-right in-view border-t border-white/15 lg:border-t-0 lg:border-l lg:pl-10 pt-8 lg:pt-0 divide-y divide-white/15">
            {STATS.map((s) => (
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
            <h2 className="text-2xl md:text-3xl font-bold text-[#ab2124] text-title-gradient">Tầm Nhìn</h2>
            <p className="text-sm md:text-base text-[#ab2124] leading-relaxed text-justify text-pretty">
              Nghề Xưa Nét Mới hướng tới trở thành một thương hiệu hàng đầu về văn hóa sáng tạo, góp phần đưa di sản
              làng nghề truyền thống Việt Nam đến gần hơn với công chúng thông qua những trải nghiệm tương tác hiện
              đại, khơi dậy tình yêu và niềm tự hào về bản sắc văn hóa dân tộc.
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
            <h2 className="text-2xl md:text-3xl font-bold text-[#ab2124] text-title-gradient">Sứ Mệnh</h2>
            <p className="text-sm md:text-base text-[#ab2124] leading-relaxed text-justify text-pretty">
              Gìn giữ và lan tỏa tinh hoa làng nghề truyền thống Việt Nam bằng việc kiến tạo các sản phẩm văn hóa kết
              hợp công nghệ, giúp di sản được tiếp cận theo cách gần gũi, hấp dẫn và phù hợp với nhịp sống đương đại.
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
            <h2 className="text-3xl md:text-4xl font-bold text-white">Giá Trị Cốt Lõi</h2>
          </div>

          <div className="divide-y divide-white/15">
            {VALUES.map((item, i) => (
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
          "Nghề Xưa Nét Mới không chỉ tái hiện làng nghề Việt Nam, mà còn tạo ra một cách mới để con người trải nghiệm
          văn hóa truyền thống trong thời đại công nghệ số."
        </p>
        <div className="w-12 h-[1px] bg-[#C9973A]/60 mx-auto" />
        <Link
          to="/villages"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#7B1C2E] text-[#fff8e7] text-sm font-bold tracking-wider uppercase rounded-full hover:bg-[#9B2438] shadow-gold-glow transition-colors"
        >
          Khám phá các làng nghề
          <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}
