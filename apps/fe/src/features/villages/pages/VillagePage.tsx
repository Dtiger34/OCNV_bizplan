import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Quote, ArrowRight, CheckCircle2, ScanLine } from 'lucide-react';
import { motion } from 'framer-motion';
import { getVillage } from '../data/villages-static';

export default function VillagePage() {
  const { slug } = useParams<{ slug: string }>();
  const village = getVillage(slug ?? '');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  if (!village) {
    return (
      <div className="min-h-screen bg-[#FDF6E3] flex flex-col items-center justify-center gap-6 px-4">
        <p className="text-[#5C3D1E] text-lg">Không tìm thấy làng nghề này.</p>
        <Link to="/villages" className="text-sm text-[#C9973A] underline underline-offset-4">
          ← Quay lại danh sách
        </Link>
      </div>
    );
  }

  const historyParagraphs = village.fullHistory.split('\n\n').filter(Boolean);

  return (
    <div className="min-h-screen bg-[#FDF6E3]">
      {/* Fixed breadcrumb */}
      <Link
        to="/villages"
        className="fixed top-20 left-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-[#5C3D1E] hover:text-[#2C1A0E] backdrop-blur-md bg-[#FDF6E3]/80 border border-[#D4B896] shadow-sm transition-all hover:border-[#C9973A]/60"
      >
        <ChevronLeft size={13} />
        Làng Nghề
      </Link>

      {/* Hero — dark cinematic */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${village.heroImageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E] via-[#2C1A0E]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C1A0E]/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-6 sm:px-10 lg:px-16 pb-16 max-w-4xl"
        >
          <p
            className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3"
            style={{ color: village.color }}
          >
            Làng Nghề Truyền Thống
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight mb-4">
            {village.name}
          </h1>
          <p className="text-base sm:text-lg italic text-[#D4B896] mb-5">{village.tagline}</p>
          <div className="h-[1px] w-16" style={{ backgroundColor: village.color + '80' }} />
        </motion.div>
      </section>

      {/* Facts bar — nền kem đậm */}
      <section className="bg-[#EDE3CE] border-b border-[#D4B896]/60">
        <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {village.facts.map((fact) => (
            <div key={fact.label}>
              <p className="text-sm sm:text-base font-medium text-[#2C1A0E] mb-0.5">{fact.value}</p>
              <p className="text-[10px] tracking-widest text-[#9C8670] uppercase">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* History — nền kem trắng */}
      <section className="py-16 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: village.color }}>
              Lịch Sử
            </p>
            <h2 className="text-2xl sm:text-3xl font-light text-[#2C1A0E] leading-snug">
              Hành Trình <span className="italic text-[#7A5230]">Hàng Thế Kỷ</span>
            </h2>
            <div className="h-[1px] w-12 bg-[#D4B896] mt-4" />
          </motion.div>

          <div className="space-y-5">
            {historyParagraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-[#5C3D1E] leading-relaxed text-sm sm:text-base"
              >
                {i === 0 ? (
                  <>
                    <span
                      className="float-left text-5xl leading-none mr-2 mt-1 font-light"
                      style={{ color: village.color }}
                    >
                      {para[0]}
                    </span>
                    {para.slice(1)}
                  </>
                ) : (
                  para
                )}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — nền kem đậm */}
      {village.galleryImages.length > 0 && (
        <section className="py-12 px-6 sm:px-10 bg-[#EDE3CE]">
          <div className="max-w-5xl mx-auto">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#9C8670] mb-5 text-center">
              Hình Ảnh
            </p>
            <div className="grid grid-cols-3 gap-3">
              {village.galleryImages.map((img, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  onClick={() => setLightboxImg(img)}
                  className="relative overflow-hidden rounded-[6px] aspect-video sm:aspect-square group cursor-pointer border border-[#D4B896]/60 hover:border-[#C9973A]/50 transition-all"
                >
                  <img
                    src={img}
                    alt={`${village.name} ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#2C1A0E]/0 group-hover:bg-[#2C1A0E]/20 transition-all duration-300" />
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Artisan quote — dark band */}
      {village.artisanQuote && (
        <section className="py-16 px-6 bg-[#2C1A0E]">
          <div className="max-w-2xl mx-auto text-center">
            <Quote size={26} className="mx-auto mb-5 opacity-40" style={{ color: village.color }} />
            <blockquote className="text-lg sm:text-xl text-white font-light italic leading-relaxed mb-5">
              "{village.artisanQuote}"
            </blockquote>
            {village.artisanStory && (
              <p className="text-xs text-[#8C7B68] leading-relaxed max-w-lg mx-auto">{village.artisanStory}</p>
            )}
          </div>
        </section>
      )}

      {/* Production stages — so le ảnh + nội dung */}
      <section className="py-16 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: village.color }}>
              Quy Trình
            </p>
            <h2 className="text-2xl sm:text-3xl font-light text-[#2C1A0E] leading-snug">
              Từ Nguyên Liệu <span className="italic text-[#7A5230]">Đến Tinh Hoa</span>
            </h2>
            <div className="h-[1px] w-12 bg-[#D4B896] mt-4" />
          </div>

          <div className="space-y-12">
            {village.stages.map((stage, i) => {
              const isReverse = i % 2 === 1;
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55 }}
                  className={`flex flex-col md:flex-row gap-8 items-center ${isReverse ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Ảnh */}
                  <div className="w-full md:w-1/2 flex-shrink-0">
                    <div className="relative overflow-hidden rounded-[8px] aspect-[4/3]">
                      <img
                        src={stage.imageUrl}
                        alt={stage.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Số thứ tự đè lên ảnh */}
                      <div
                        className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                        style={{ backgroundColor: village.color }}
                      >
                        {String(stage.order).padStart(2, '0')}
                      </div>
                    </div>
                  </div>

                  {/* Nội dung */}
                  <div className="w-full md:w-1/2 space-y-3">
                    <p
                      className="text-[10px] font-bold tracking-[0.2em] uppercase"
                      style={{ color: village.color }}
                    >
                      Bước {stage.order}
                    </p>
                    <h3 className="text-xl font-medium text-[#2C1A0E]">{stage.title}</h3>
                    <div className="h-[1px] w-8 bg-[#D4B896]" />
                    <p className="text-sm text-[#5C3D1E] leading-relaxed">{stage.description}</p>
                    {stage.details && stage.details.length > 0 && (
                      <ul className="space-y-2 pt-1">
                        {stage.details.map((d, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-[#7A5230]">
                            <CheckCircle2
                              size={14}
                              className="flex-shrink-0 mt-0.5"
                              style={{ color: village.color }}
                            />
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA — dark footer band */}
      <section className="py-14 px-4 bg-[#2C1A0E] text-center">
        <p className="text-[10px] tracking-[0.25em] text-[#9C8670] uppercase mb-3">Khám Phá Thêm</p>
        <h2 className="text-2xl font-light text-white mb-6">
          Tìm Hiểu Các Làng Nghề <span className="italic text-[#D4B896]">Khác</span>
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/villages"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#C9973A]/50 text-sm text-[#D4B896] hover:text-white hover:bg-[#C9973A]/10 rounded-sm transition-all duration-200"
          >
            Xem Tất Cả Làng Nghề
            <ArrowRight size={14} />
          </Link>
          {slug === 'non-chuong' && (
            <Link
              to={`/villages/${slug}/ar`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9973A] hover:bg-[#B8862A] text-[#2C1A0E] text-sm font-semibold rounded-sm transition-all duration-200"
            >
              <ScanLine size={16} />
              Xem Mô Hình 3D · AR
            </Link>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImg(null)}
        >
          <img
            src={lightboxImg}
            alt="Gallery"
            className="max-w-full max-h-[90vh] rounded-md object-contain shadow-2xl"
          />
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl leading-none"
            onClick={() => setLightboxImg(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
