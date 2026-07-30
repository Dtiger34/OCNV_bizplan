import { Link } from 'react-router-dom';
import { Award, MapPin, Star, Sparkles, GraduationCap, Landmark, ArrowRight } from 'lucide-react';

const PILLARS = [
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
    desc: 'Đi sâu vào lịch sử, con người và tinh thần của những làng nghề nổi tiếng Việt Nam. Mỗi trang làng nghề là một hành trình — từ nguồn gốc, quy trình đến nét đặc trưng chỉ nơi đó mới có.',
  },
];

const VALUES = [
  {
    icon: <Landmark size={22} className="text-[#C9973A]" />,
    title: 'Giá trị văn hóa',
    desc: 'Góp phần giới thiệu và bảo tồn hình ảnh làng nghề truyền thống Việt Nam.',
  },
  {
    icon: <GraduationCap size={22} className="text-[#C9973A]" />,
    title: 'Giá trị giáo dục',
    desc: 'Giúp người xem hiểu quy trình và ý nghĩa của từng nghề thủ công qua trải nghiệm trực quan.',
  },
  {
    icon: <Sparkles size={22} className="text-[#C9973A]" />,
    title: 'Giá trị sáng tạo',
    desc: 'Kết hợp giữa thiết kế thủ công và công nghệ AR hiện đại, tạo ra một cách mới để trải nghiệm văn hóa.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#fff8e7] min-h-screen">
      {/* Hero */}
      <div className="relative bg-[#ab2124] py-20 px-6 text-center overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Về Chúng Tôi</h1>
          <p className="text-[#C9B99A] text-sm md:text-base leading-relaxed">
            Chúng tôi tái hiện các làng nghề truyền thống Việt Nam dưới dạng mô hình tiểu cảnh, kết hợp công nghệ
            thực tế tăng cường (AR) để biến không gian thủ công tĩnh lặng thành trải nghiệm sống động.
          </p>
        </div>
      </div>

      {/* Sứ mệnh */}
      <section className="container mx-auto px-6 md:px-8 max-w-4xl py-16 text-center space-y-5">
        <span className="text-[13px] font-bold tracking-[0.2em] text-[#ab2124] uppercase block">Sứ Mệnh</span>
        <h2 className="text-2xl md:text-3xl font-bold text-[#ab2124] leading-snug text-title-gradient">
          Sức Sống Mới Cho Di Sản Việt
        </h2>
        <div className="w-12 h-[1px] bg-[#C9973A]/60 mx-auto" />
        <p className="text-base md:text-lg text-[#ab2124] leading-relaxed max-w-4xl mx-auto text-justify text-pretty">
          Nghề Xưa Nét Mới là dự án kết hợp thủ công mỹ nghệ truyền thống và công nghệ hiện đại — mang câu chuyện
          của những làng nghề Việt Nam đến gần hơn với mọi người. Chúng tôi tin rằng văn hóa truyền thống không
          cần phải khô khan hay xa lạ — mà có thể trở nên sống động, gần gũi và dễ nhớ hơn khi được kể lại đúng cách.
        </p>
      </section>

      {/* 3 pillars */}
      <section className="bg-[#ab2124]/5 py-14 md:py-20 border-t border-b border-[#D4B896]/20">
        <div className="container mx-auto px-6 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((item) => (
              <div
                key={item.title}
                className="bg-[#fff8e7] border border-[#D4B896] rounded-[6px] p-6 space-y-3 hover:border-[#C9973A] transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#EDE3CE] flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#ab2124] text-base">{item.title}</h3>
                <p className="text-sm text-[#ab2124] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Câu chuyện & ý tưởng */}
      <section className="container mx-auto px-6 md:px-8 max-w-4xl py-16 space-y-6">
        <div className="text-center space-y-3">
          <span className="text-[13px] font-bold tracking-[0.18em] text-[#7B1C2E] uppercase block">
            Ý Tưởng Của Chúng Tôi
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#ab2124] text-title-gradient">Một Việt Nam Thu Nhỏ</h2>
          <div className="w-12 h-[1px] bg-[#C9973A] mx-auto" />
        </div>
        <div className="space-y-4 text-[#ab2124] leading-relaxed text-sm md:text-base text-justify text-pretty">
          <p>
            Lấy cảm hứng từ những làng nghề trăm năm tuổi — làng lụa Vạn Phúc, làng nón Chuông, làng mây tre đan
            Phú Vinh, làng gốm Bát Tràng, làng hương Quảng Phú Cầu — chúng tôi mong muốn không chỉ dừng lại ở việc
            trưng bày, mà hướng tới tái hiện trọn vẹn câu chuyện văn hóa, tạo trải nghiệm đa giác quan và kết nối
            truyền thống với công nghệ hiện đại.
          </p>
          <p>
            Khi người dùng mở trải nghiệm AR trên điện thoại, mô hình không còn tĩnh lặng nữa — người thợ gốm xoay
            bàn, khung cửi dệt lụa chuyển động, câu chuyện làng nghề hiện ra ngay trước mắt. Đây là điều khiến
            chúng tôi khác biệt so với những sản phẩm lưu niệm truyền thống trên thị trường.
          </p>
        </div>
      </section>

      {/* Giá trị mang lại */}
      <section className="bg-[#ab2124]/5 py-14 md:py-20 border-t border-b border-[#D4B896]/20">
        <div className="container mx-auto px-6 md:px-8 max-w-5xl">
          <div className="text-center space-y-3 mb-10">
            <span className="text-[13px] font-bold tracking-[0.18em] text-[#7B1C2E] uppercase block">
              Giá Trị Mang Lại
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#ab2124] text-title-gradient">Không Chỉ Là Một Sản Phẩm</h2>
            <div className="w-12 h-[1px] bg-[#C9973A] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center gap-3 p-6">
                <div className="w-12 h-12 rounded-full bg-[#EDE3CE] flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#ab2124] text-base">{item.title}</h3>
                <p className="text-sm text-[#ab2124] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote kết */}
      <section className="container mx-auto px-6 md:px-8 max-w-3xl py-16 text-center space-y-6">
        <p className="text-lg md:text-xl text-[#ab2124] italic leading-relaxed font-medium">
          "Nghề Xưa Nét Mới không chỉ tái hiện làng nghề Việt Nam, mà còn tạo ra một cách mới để con người trải nghiệm
          văn hóa truyền thống trong thời đại công nghệ số."
        </p>
        <div className="w-12 h-[1px] bg-[#C9973A]/60 mx-auto" />
        <Link
          to="/villages"
          className="inline-flex items-center gap-2 px-7 py-3 bg-[#7B1C2E] text-[#fff8e7] text-sm font-bold tracking-wider uppercase rounded-sm hover:bg-[#9B2438] transition-colors"
        >
          Khám phá các làng nghề
          <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}
