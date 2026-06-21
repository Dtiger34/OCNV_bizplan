import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Quote, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getVillage } from '../data/villages-static';

export default function VillagePage() {
  const { slug } = useParams<{ slug: string }>();
  const village = getVillage(slug ?? '');
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  if (!village) {
    return (
      <div className="min-h-screen bg-[#2C1A0E] flex flex-col items-center justify-center gap-6 px-4">
        <p className="text-[#BEA882] text-lg">Không tìm thấy làng nghề này.</p>
        <Link to="/villages" className="text-sm text-[#C9973A] underline underline-offset-4">
          ← Quay lại danh sách
        </Link>
      </div>
    );
  }

  const historyParagraphs = village.fullHistory.split('\n\n').filter(Boolean);

  return (
    <div className="bg-[#2C1A0E] min-h-screen">
      {/* Fixed breadcrumb */}
      <Link
        to="/villages"
        className="fixed top-20 left-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-[#D4B896] hover:text-white backdrop-blur-md bg-[#1A0F07]/70 border border-[#3D2B1A]/80 transition-all hover:border-[#C9973A]/50"
      >
        <ChevronLeft size={13} />
        Làng Nghề
      </Link>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${village.heroImageUrl}')` }}
        />
        {/* Multi-layer gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E] via-[#2C1A0E]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C1A0E]/50 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative z-10 px-4 sm:px-8 lg:px-16 pb-16 max-w-4xl"
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
          <p className="text-base sm:text-lg italic text-[#D4B896] mb-6">{village.tagline}</p>
          <div className="h-[1px] w-16" style={{ backgroundColor: village.color + '80' }} />
        </motion.div>
      </section>

      {/* Facts bar */}
      <section className="bg-[#1A0F07] border-y border-[#3D2B1A]">
        <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {village.facts.map((fact) => (
            <div key={fact.label}>
              <p className="text-sm sm:text-base font-medium text-white mb-0.5">{fact.value}</p>
              <p className="text-[10px] tracking-widest text-[#8C7B68] uppercase">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* History */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: village.color }}>
              Lịch Sử
            </p>
            <h2 className="text-2xl sm:text-3xl font-light text-white mb-8 leading-snug">
              Hành Trình <span className="italic text-[#D4B896]">Hàng Thế Kỷ</span>
            </h2>
          </motion.div>

          <div className="space-y-5">
            {historyParagraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-[#BEA882] leading-relaxed text-sm sm:text-base"
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

      {/* Gallery */}
      {village.galleryImages.length > 0 && (
        <section className="pb-16 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-3 gap-3">
              {village.galleryImages.map((img, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  onClick={() => setLightboxImg(img)}
                  className="relative overflow-hidden rounded-md aspect-video sm:aspect-square group cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`${village.name} ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#2C1A0E]/0 group-hover:bg-[#2C1A0E]/30 transition-all duration-300" />
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Artisan quote */}
      {village.artisanQuote && (
        <section className="py-16 px-4 bg-[#1A0F07] border-y border-[#3D2B1A]">
          <div className="max-w-2xl mx-auto text-center">
            <Quote size={28} className="mx-auto mb-5 opacity-40" style={{ color: village.color }} />
            <blockquote className="text-lg sm:text-xl text-white font-light italic leading-relaxed mb-6">
              "{village.artisanQuote}"
            </blockquote>
            {village.artisanStory && (
              <p className="text-xs text-[#8C7B68] leading-relaxed max-w-lg mx-auto">{village.artisanStory}</p>
            )}
          </div>
        </section>
      )}

      {/* Production stages */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: village.color }}>
              Quy Trình
            </p>
            <h2 className="text-2xl sm:text-3xl font-light text-white leading-snug">
              Từ Nguyên Liệu <span className="italic text-[#D4B896]">Đến Tinh Hoa</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {village.stages.map((stage, i) => {
              const isActive = activeStage === stage.id;
              return (
                <motion.button
                  key={stage.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  onClick={() => setActiveStage(isActive ? null : stage.id)}
                  className="text-left p-5 rounded-lg border transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: isActive ? village.color + '18' : '#1A0F07',
                    borderColor: isActive ? village.color + '60' : '#3D2B1A',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="text-xl font-light flex-shrink-0 leading-none mt-0.5"
                      style={{ color: village.color }}
                    >
                      {String(stage.order).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white mb-2">{stage.title}</p>
                      <p
                        className={`text-xs text-[#8C7B68] leading-relaxed transition-all duration-300 overflow-hidden ${
                          isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        {stage.description}
                      </p>
                      <p
                        className={`text-[10px] mt-2 transition-colors duration-200`}
                        style={{ color: isActive ? village.color : '#6B5C4E' }}
                      >
                        {isActive ? 'Thu gọn ↑' : 'Xem thêm ↓'}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 px-4 border-t border-[#3D2B1A] text-center">
        <p className="text-[10px] tracking-[0.25em] text-[#8C7B68] uppercase mb-3">Khám Phá Thêm</p>
        <h2 className="text-2xl font-light text-white mb-6">
          Tìm Hiểu Các Làng Nghề <span className="italic text-[#D4B896]">Khác</span>
        </h2>
        <Link
          to="/villages"
          className="inline-flex items-center gap-2 px-6 py-3 border text-sm text-[#D4B896] hover:text-white hover:bg-[#C9973A]/10 rounded-sm transition-all duration-200"
          style={{ borderColor: village.color + '60' }}
        >
          Xem Tất Cả Làng Nghề
          <ArrowRight size={14} />
        </Link>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
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
