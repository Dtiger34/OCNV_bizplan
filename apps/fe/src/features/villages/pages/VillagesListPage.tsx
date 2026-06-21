import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { VILLAGES } from '../data/villages-static';

export default function VillagesListPage() {
  return (
    <div className="bg-[#FDF6E3] min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#2C1A0E]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C1A0E]/30 via-transparent to-[#2C1A0E]/80" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 py-20 text-center space-y-5">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#C9973A] uppercase block">
            HÀNH TRÌNH VỀ NGUỒN CỘI
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-[#F5EDD6] leading-tight">
            Câu Chuyện Làng Nghề
          </h1>
          <div className="h-px w-16 bg-[#C9973A] mx-auto" />
          <p className="text-[#F5EDD6]/70 text-base md:text-lg leading-relaxed italic">
            Mỗi làng nghề là một trang lịch sử sống — nơi đôi bàn tay tài hoa gìn giữ tinh hoa văn hóa Việt qua hàng trăm năm.
          </p>
        </div>
      </section>

      {/* ── Editorial intro ──────────────────────────────────────────────── */}
      <section className="bg-[#2C1A0E]">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div className="space-y-5">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#C9973A] uppercase block">
                Về Dự Án
              </span>
              <h2 className="text-2xl md:text-3xl font-light text-[#F5EDD6] leading-snug">
                Chúng tôi đang cố gắng{' '}
                <span className="text-[#C9973A]">giữ lại những gì</span>{' '}
                sắp bị lãng quên
              </h2>
              <p className="text-sm text-[#F5EDD6]/60 leading-relaxed">
                Việt Nam có hàng nghìn làng nghề truyền thống, nhưng rất nhiều trong số đó đang dần mai một theo thời gian. Thế hệ trẻ ngày càng xa lạ với tiếng thoi dệt, mùi đất nung hay khói hương bảng lảng sân làng.
              </p>
              <p className="text-sm text-[#F5EDD6]/60 leading-relaxed">
                Đây là trách nhiệm chung của tất cả chúng ta — gìn giữ di sản nghề thủ công không chỉ là bảo tồn văn hóa mà còn là bảo vệ bản sắc dân tộc qua hàng trăm năm lịch sử.
              </p>
            </div>

            <div className="space-y-4 text-sm text-[#F5EDD6]/60 leading-relaxed">
              <p>
                Nghề Xưa Nét Mới ra đời từ câu hỏi: làm thế nào để kể lại những câu chuyện ấy theo cách mà người trẻ hôm nay muốn lắng nghe? Câu trả lời là một hộp tiểu cảnh nhỏ — tái hiện không gian làng nghề trong lòng bàn tay, kết hợp với công nghệ AR.
              </p>
              <p>
                Mỗi câu chuyện dưới đây là một làng nghề thật, một nghệ nhân thật, một kỹ thuật hàng trăm năm tuổi đang được chúng tôi tái hiện — để không ai phải nói: "Tôi chưa bao giờ biết điều đó từng tồn tại."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C9973A] to-transparent" />

      {/* ── Village cards ────────────────────────────────────────────────── */}
      <section className="py-14 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-10">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#C9973A] uppercase block">
              Năm câu chuyện, một Việt Nam
            </span>
            <h2 className="text-2xl md:text-3xl font-light text-[#2C1A0E]">
              Chọn Làng Nghề Của Bạn
            </h2>
            <div className="h-px w-12 bg-[#D4B896] mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VILLAGES.map((village, idx) => (
              <motion.div
                key={village.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: 'easeOut' }}
              >
                <Link
                  to={`/villages/${village.slug}`}
                  className="group block bg-[#FDF6E3] border border-[#D4B896] rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#C9973A] transition-all duration-300 h-full"
                >
                  {/* Image */}
                  <div className="relative h-[220px] overflow-hidden">
                    <img
                      src={village.coverImageUrl}
                      alt={village.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/75 via-[#2C1A0E]/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                      <h3 className="text-base font-semibold text-[#F5EDD6] leading-snug drop-shadow">
                        {village.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <p className="text-[11px] text-[#7B1C2E] italic leading-relaxed">
                      "{village.tagline}"
                    </p>
                    <p className="text-xs text-[#5C3D1E]/80 leading-relaxed line-clamp-3">
                      {village.shortDescription}
                    </p>
                    <div className="flex items-center gap-1 pt-1 text-[11px] font-semibold text-[#C9973A] group-hover:gap-2 transition-all">
                      Khám phá <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom padding ───────────────────────────────────────────────── */}
      <div className="pb-16" />
    </div>
  );
}
