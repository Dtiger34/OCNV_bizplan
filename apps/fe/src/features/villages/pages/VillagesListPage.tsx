import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useVillages } from '../hooks/useVillage';

export default function VillagesListPage() {
  const lang = 'vi' as const;
  const { data: villages = [], isLoading } = useVillages();

  return (
    <div className="pb-20">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#2C1A0E] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2C1A0E]/80" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 py-14 md:py-24 text-center space-y-5 reveal">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#C9973A] uppercase block">
            HÀNH TRÌNH VỀ NGUỒN CỘI
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-[#F5EDD6] leading-tight">
            {lang === 'vi' ? 'Câu Chuyện Làng Nghề' : 'Village Stories'}
          </h1>
          <p className="text-[#F5EDD6]/70 text-base md:text-lg leading-relaxed">
            {lang === 'vi'
              ? 'Mỗi làng nghề là một trang lịch sử sống — nơi đôi bàn tay tài hoa của những người thợ thủ công đã gìn giữ và truyền nối tinh hoa văn hóa Việt qua hàng trăm năm.'
              : 'Each craft village is a living page of history — where the skilled hands of artisans have preserved and passed down the essence of Vietnamese culture for hundreds of years.'}
          </p>
        </div>
      </section>

      {/* ── Project intro ────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Left — label + heading */}
          <div className="space-y-5 reveal-left">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#C9973A] uppercase block">
              {lang === 'vi' ? 'Về dự án' : 'About the Project'}
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-[#2C1A0E] leading-snug">
              {lang === 'vi'
                ? <>Chúng tôi đang cố gắng<br /><span className="font-semibold">giữ lại những gì</span><br />sắp bị lãng quên</>
                : <>We are trying to<br /><span className="font-semibold">hold on to what</span><br />is about to be forgotten</>}
            </h2>
            <div className="h-px w-12 bg-[#C9973A]" />
            <p className="text-sm text-[#5C3D1E]/80 leading-relaxed">
              {lang === 'vi'
                ? 'Việt Nam có hàng nghìn làng nghề truyền thống, nhưng rất nhiều trong số đó đang dần mai một theo thời gian. Thế hệ trẻ ngày càng xa lạ với tiếng thoi dệt, mùi đất nung hay khói hương bảng lảng sân làng.'
                : 'Vietnam has thousands of traditional craft villages, but many are slowly fading with time. Younger generations are growing increasingly distant from the sound of the loom, the smell of fired clay, or the drifting incense smoke in a village courtyard.'}
            </p>
          </div>

          {/* Right — body text */}
          <div className="space-y-4 text-sm text-[#5C3D1E]/80 leading-relaxed reveal-right">
            <p>
              {lang === 'vi'
                ? 'Nghề Xưa Nét Mới ra đời từ câu hỏi: làm thế nào để kể lại những câu chuyện ấy theo cách mà người trẻ hôm nay muốn lắng nghe? Câu trả lời là một hộp tiểu cảnh nhỏ — tái hiện không gian làng nghề trong lòng bàn tay, kết hợp với công nghệ AR và âm thanh để câu chuyện không chỉ được nhìn mà còn được trải nghiệm.'
                : 'Old Crafts New Vibes was born from a question: how do we retell those stories in a way today\'s young people actually want to hear? The answer is a small diorama box — recreating the village space in the palm of your hand, combined with AR technology and audio so the story is not just seen but experienced.'}
            </p>
            <p>
              {lang === 'vi'
                ? 'Mỗi câu chuyện dưới đây là một làng nghề thật, một nghệ nhân thật, một kỹ thuật hàng trăm năm tuổi đang được chúng tôi tái hiện — để không ai phải nói: "Tôi chưa bao giờ biết điều đó từng tồn tại."'
                : 'Each story below is a real village, a real artisan, a real technique hundreds of years old that we are recreating — so no one ever has to say: "I never knew that existed."'}
            </p>
          </div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 reveal">
        <div className="h-px bg-[#D4B896]/50" />
      </div>

      {/* ── Village cards — centered 5-in-a-row ─────────────────────────── */}
      <section className="py-16 px-6">
        <div className="text-center space-y-2 mb-10 reveal">
          <span className="text-[10px] font-bold tracking-[0.18em] text-[#7A5A1A] uppercase">
            {lang === 'vi' ? 'Năm câu chuyện, một Việt Nam' : 'Five Stories, One Vietnam'}
          </span>
          <h3 className="text-2xl md:text-3xl text-[#2C1A0E]">
            {lang === 'vi' ? 'Chọn làng nghề để bắt đầu' : 'Choose a village to begin'}
          </h3>
        </div>

        {isLoading ? (
          <div className="text-center text-[#9C8670] py-10">Đang tải...</div>
        ) : (
          <div className="flex flex-wrap justify-center gap-5 max-w-[1400px] mx-auto">
            {villages.map((village, idx) => (
              <motion.div
                key={village.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="w-full sm:w-[220px] shrink-0"
              >
                <Link
                  to={`/villages/${village.slug}`}
                  className="group block bg-[#FDF6E3] border border-[#D4B896] rounded-[8px] overflow-hidden shadow-subtle hover:shadow-medium transition-all hover:-translate-y-2 h-full"
                >
                  <div className="h-[150px] overflow-hidden relative">
                    <img
                      src={village.coverImageUrl ?? 'https://placehold.co/220x150?text=Village'}
                      alt={village.name[lang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/60 to-transparent" />
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="h-[2px] w-6 rounded-full bg-[#C9973A]" />
                    <h2 className="text-sm font-bold text-[#2C1A0E] leading-snug group-hover:text-[#5C3D1E] transition-colors">
                      {village.name[lang]}
                    </h2>
                    <p className="text-[10px] text-[#7A5A1A] italic line-clamp-2 leading-relaxed">
                      "{village.tagline[lang]}"
                    </p>
                    <div className="flex items-center gap-1 text-[11px] font-semibold pt-1 text-[#C9973A]">
                      {lang === 'vi' ? 'Đọc câu chuyện' : 'Read the story'}
                      <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
