import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { VILLAGES } from '../data/villages-static';

export default function VillagesListPage() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <div className="bg-[#2C1A0E] min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1920&q=80')`,
            filter: 'brightness(0.25)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C1A0E]/60 via-transparent to-[#2C1A0E]" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#C9973A] uppercase mb-4"
          >
            Nghề Xưa Nét Mới
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight mb-6"
          >
            Câu Chuyện <br />
            <span className="italic text-[#D4B896]">Làng Nghề</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-[1px] w-20 bg-[#C9973A]/60 mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-sm sm:text-base text-[#BEA882] leading-relaxed max-w-xl mx-auto"
          >
            Hành trình khám phá 5 làng nghề truyền thống Hà Nội — nơi lịch sử, văn hóa và tài hoa
            người thợ thủ công được gìn giữ qua hàng trăm năm.
          </motion.p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-10 px-4 bg-[#231309]">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { value: '5', label: 'Làng Nghề' },
            { value: '700+', label: 'Năm Lịch Sử' },
            { value: '∞', label: 'Câu Chuyện' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl sm:text-4xl font-light text-[#C9973A] mb-1">{value}</p>
              <p className="text-[10px] tracking-widest text-[#8C7B68] uppercase">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Village cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VILLAGES.map((village, i) => (
            <motion.div
              key={village.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                to={`/villages/${village.slug}`}
                className="group block relative overflow-hidden rounded-lg bg-[#1A0F07] border border-[#3D2B1A] hover:border-[#C9973A]/50 transition-all duration-500"
                onMouseEnter={() => setHoveredSlug(village.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={village.coverImageUrl}
                    alt={village.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F07] via-[#1A0F07]/20 to-transparent" />

                  {/* Accent bottom bar on hover */}
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                    style={{ backgroundColor: village.color }}
                  />

                  <div className="absolute bottom-3 left-4 right-4">
                    <h2 className="text-white text-lg font-medium leading-tight drop-shadow-lg">
                      {village.name}
                    </h2>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3">
                  <p className="text-xs italic text-[#C9973A]">{village.tagline}</p>
                  <p className="text-sm text-[#BEA882] leading-relaxed line-clamp-3">
                    {village.shortDescription}
                  </p>

                  <div className="flex items-center gap-4 pt-1">
                    <span className="flex items-center gap-1.5 text-[10px] text-[#8C7B68]">
                      <MapPin size={11} />
                      {village.facts.find((f) => f.label === 'Vị trí')?.value ?? 'Hà Nội'}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-[#8C7B68]">
                      <Clock size={11} />
                      {village.facts.find((f) => f.label === 'Lịch sử')?.value ?? ''}
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider pt-1 transition-colors duration-300"
                    style={{ color: hoveredSlug === village.slug ? village.color : '#9C8670' }}
                  >
                    Khám Phá
                    <ArrowRight
                      size={13}
                      className={`transition-transform duration-300 ${hoveredSlug === village.slug ? 'translate-x-1' : ''}`}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom editorial */}
      <section className="py-16 px-4 border-t border-[#3D2B1A]">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <p className="text-[10px] tracking-[0.25em] text-[#C9973A] uppercase">Sứ Mệnh</p>
          <h2 className="text-2xl sm:text-3xl font-light text-white leading-snug">
            Gìn Giữ Tinh Hoa, <br />
            <span className="italic text-[#D4B896]">Kết Nối Thế Hệ</span>
          </h2>
          <p className="text-sm text-[#8C7B68] leading-relaxed">
            Mỗi sản phẩm thủ công là một câu chuyện — về đôi bàn tay người thợ, về đất, về lửa,
            về những kỹ thuật được truyền từ đời này sang đời khác. Chúng tôi đưa những câu
            chuyện đó đến gần hơn với bạn.
          </p>
        </div>
      </section>
    </div>
  );
}
