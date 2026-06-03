import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, ChevronLeft } from 'lucide-react';
import { useVillage } from '../hooks/useVillage';
import { useLanguageStore } from '@/store/languageStore';

const PLACEHOLDER = 'https://placehold.co/1200x460?text=Village';

export default function VillagePage() {
  const { slug } = useParams<{ slug: string }>();
  const { language: lang } = useLanguageStore();
  const [activeStage, setActiveStage] = useState(0);

  const { data: village, isLoading, isError } = useVillage(slug ?? '');

  if (isLoading) {
    return <div className="flex min-h-[60vh] items-center justify-center text-[#9C8670]">Đang tải...</div>;
  }

  if (isError || !village) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-2xl text-[#2C1A0E]">Không tìm thấy làng nghề</p>
        <Link to="/villages" className="text-[#C9973A] underline text-sm">← Quay lại danh sách</Link>
      </div>
    );
  }

  const t = (field: { vi: string; en: string }) => field[lang];
  const sortedStages = [...village.stages].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section
        className="relative h-[460px] bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url('${village.coverImageUrl ?? PLACEHOLDER}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/80 via-[#2C1A0E]/30 to-transparent" />

        <Link
          to="/villages"
          className="absolute top-6 left-6 z-10 flex items-center gap-1.5 text-[#F5EDD6]/80 text-xs tracking-wide hover:text-[#C9973A] transition-colors"
        >
          <ChevronLeft size={14} />
          {lang === 'vi' ? 'Tất cả làng nghề' : 'All Villages'}
        </Link>

        <div className="relative z-10 w-full px-8 md:px-16 pb-10 space-y-3">
          <h1 className="text-4xl md:text-5xl font-light text-[#F5EDD6] leading-tight">
            {t(village.name)}
          </h1>
          <p className="text-sm md:text-base text-[#F5EDD6]/80 italic max-w-2xl">
            "{t(village.tagline)}"
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9973A] opacity-70" />
      </section>

      {/* History + Video */}
      <section className="container mx-auto px-6 md:px-8 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4 reveal-left">
          <span className="text-[10px] font-bold tracking-[0.14em] text-[#7A5A1A] uppercase block">
            {lang === 'vi' ? 'Lịch sử' : 'History'}
          </span>
          <h2 className="text-2xl md:text-3xl font-medium text-[#2C1A0E]">
            {lang === 'vi' ? 'Ngàn năm dựng nghề' : 'A Thousand Years of Craft'}
          </h2>
          <p className="text-sm text-[#2C1A0E] leading-relaxed">
            {t(village.fullHistory)}
          </p>
        </div>

        <div className="space-y-6 reveal-right">
          {village.introVideoUrl && (
            <div className="aspect-video bg-black border border-[#D4B896] rounded-[6px] overflow-hidden shadow-medium">
              <iframe
                title={`Video ${t(village.name)}`}
                className="w-full h-full"
                src={village.introVideoUrl}
                allowFullScreen
              />
            </div>
          )}
          <div className="bg-[#FDF6E3] border border-[#D4B896]/60 rounded-[6px] p-4 space-y-2">
            <span className="text-[10px] font-bold tracking-[0.14em] text-[#C9973A] uppercase block">
              {lang === 'vi' ? 'Giới thiệu' : 'Introduction'}
            </span>
            <p className="text-xs text-[#2C1A0E] leading-relaxed">
              {t(village.shortDescription)}
            </p>
          </div>
        </div>
      </section>

      {/* Production Stages */}
      {sortedStages.length > 0 && (
        <section className="bg-[#FDF6E3] border-y border-[#D4B896]/40 py-12">
          <div className="container mx-auto px-6 md:px-8 max-w-5xl space-y-8">
            <div className="text-center space-y-2 reveal">
              <span className="text-[10px] font-bold tracking-[0.14em] text-[#7A5A1A] uppercase block">
                {lang === 'vi' ? 'Quy trình chế tác' : 'Craft Process'}
              </span>
              <h3 className="text-2xl md:text-3xl text-[#2C1A0E]">
                {lang === 'vi' ? 'Các bước tạo nên kiệt tác' : 'Steps to a Masterpiece'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {sortedStages.map((stage, idx) => (
                <div
                  key={stage._id}
                  onClick={() => setActiveStage(idx)}
                  className={`p-4 border rounded-[6px] transition-all cursor-pointer ${
                    activeStage === idx
                      ? 'bg-[#5C3D1E] border-[#5C3D1E] text-[#F5EDD6] shadow-medium scale-105'
                      : 'bg-[#FDF6E3] border-[#D4B896] text-[#2C1A0E] hover:border-[#C9973A]'
                  }`}
                >
                  <span className="text-[10px] font-bold tracking-wider block mb-1 opacity-70">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h4 className="text-xs font-bold tracking-wide mb-2">{t(stage.title)}</h4>
                  <p className="text-xs leading-relaxed opacity-90">{t(stage.description)}</p>
                </div>
              ))}
            </div>

            {sortedStages[activeStage]?.imageUrls?.[0] && (
              <div className="max-w-md mx-auto aspect-video overflow-hidden rounded-[6px] border border-[#D4B896]/60 shadow-medium">
                <img
                  src={sortedStages[activeStage].imageUrls[0]}
                  alt={t(sortedStages[activeStage].title)}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Artisan Spotlight */}
      {(village.artisanStory || village.artisanQuote) && (
        <section className="container mx-auto px-6 md:px-8 max-w-4xl bg-[#FDF6E3] border border-[#D4B896] rounded-[8px] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-subtle reveal">
          {village.artisanImageUrl ? (
            <img
              src={village.artisanImageUrl}
              alt="Nghệ nhân"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-[#C9973A] shrink-0"
            />
          ) : (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#5C3D1E] text-[#F5EDD6] text-4xl font-bold flex items-center justify-center shrink-0 border-2 border-[#C9973A]">
              N
            </div>
          )}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Award size={18} className="text-[#C9973A]" />
              <span className="text-[11px] font-bold tracking-wider text-[#5C3D1E] uppercase">
                {lang === 'vi' ? 'Nghệ nhân tiêu biểu' : 'Featured Artisan'}
              </span>
            </div>
            {village.artisanStory && (
              <p className="text-sm text-[#2C1A0E] leading-relaxed">{t(village.artisanStory)}</p>
            )}
            {village.artisanQuote && (
              <div className="border-l-4 border-[#C9973A] pl-4 py-1 italic text-sm text-[#7A5A1A]">
                "{t(village.artisanQuote)}"
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
