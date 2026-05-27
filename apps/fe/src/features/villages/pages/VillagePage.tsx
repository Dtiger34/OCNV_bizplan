import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, MapPin, Calendar, ChevronLeft } from 'lucide-react';
import { getVillageBySlug } from '../data/villages';
import { useLanguageStore } from '@/store/languageStore';

export default function VillagePage() {
  const { slug } = useParams<{ slug: string }>();
  const { language: lang } = useLanguageStore();
  const [activeStage, setActiveStage] = useState(0);

  const village = getVillageBySlug(slug ?? '');

  if (!village) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-2xl text-[#2C1A0E]">Không tìm thấy làng nghề</p>
        <Link to="/villages" className="text-[#C9973A] underline text-sm">← Quay lại danh sách</Link>
      </div>
    );
  }

  const t = (field: { vi: string; en: string }) => field[lang];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section
        className="relative h-[460px] bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url('${village.coverImageUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/80 via-[#2C1A0E]/30 to-transparent" />

        {/* Back link */}
        <Link
          to="/villages"
          className="absolute top-6 left-6 z-10 flex items-center gap-1.5 text-[#F5EDD6]/80 text-xs tracking-wide hover:text-[#C9973A] transition-colors"
        >
          <ChevronLeft size={14} />
          {lang === 'vi' ? 'Tất cả làng nghề' : 'All Villages'}
        </Link>

        {/* Content */}
        <div className="relative z-10 w-full px-8 md:px-16 pb-10 space-y-3">
          <span
            className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 rounded"
            style={{ color: village.color, backgroundColor: `${village.color}22` }}
          >
            {t(village.craft)}
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-[#F5EDD6] leading-tight">
            {t(village.name)}
          </h1>
          <p className="text-sm md:text-base text-[#F5EDD6]/80 italic max-w-2xl">
            "{t(village.tagline)}"
          </p>
          <div className="flex items-center gap-4 text-[#F5EDD6]/60 text-xs">
            <span className="flex items-center gap-1"><MapPin size={11} />{t(village.location)}</span>
            <span className="flex items-center gap-1"><Calendar size={11} />{village.founded}</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-70" style={{ backgroundColor: village.color }} />
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
            {t(village.history)}
          </p>
        </div>

          <div className="space-y-6 reveal-right">
          {village.videoUrl && (
            <div className="aspect-video bg-black border border-[#D4B896] rounded-[6px] overflow-hidden shadow-medium">
              <iframe
                title={`Video ${t(village.name)}`}
                className="w-full h-full"
                src={village.videoUrl}
                allowFullScreen
              />
            </div>
          )}
          {/* Diorama description */}
          <div className="bg-[#FDF6E3] border border-[#D4B896]/60 rounded-[6px] p-4 space-y-2">
            <span
              className="text-[10px] font-bold tracking-[0.14em] uppercase block"
              style={{ color: village.color }}
            >
              {lang === 'vi' ? 'Về hộp tiểu cảnh' : 'About the Diorama Box'}
            </span>
            <p className="text-xs text-[#2C1A0E] leading-relaxed">
              {t(village.diaoramaDesc)}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {village.galleryImages.length > 0 && (
        <section className="container mx-auto px-6 md:px-8 max-w-5xl reveal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {village.galleryImages.map((url, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-[6px] border border-[#D4B896]/40">
                <img src={url} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Production Stages */}
      <section className="bg-[#FDF6E3] border-y border-[#D4B896]/40 py-12">
        <div className="container mx-auto px-6 md:px-8 max-w-5xl space-y-8">
          <div className="text-center space-y-2 reveal">
            <span className="text-[10px] font-bold tracking-[0.14em] text-[#7A5A1A] uppercase block">
              {lang === 'vi' ? 'Quy trình chế tác' : 'Craft Process'}
            </span>
            <h3 className="text-2xl md:text-3xl text-[#2C1A0E]">
              {lang === 'vi' ? 'Bốn bước tạo nên kiệt tác' : 'Four Steps to a Masterpiece'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {village.stages.map((stage, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStage(idx)}
                className={`p-4 border rounded-[6px] transition-all cursor-pointer ${
                  activeStage === idx
                    ? 'text-[#F5EDD6] shadow-medium scale-105'
                    : 'bg-[#FDF6E3] border-[#D4B896] text-[#2C1A0E] hover:border-[#C9973A]'
                }`}
                style={activeStage === idx ? { backgroundColor: village.color, borderColor: village.color } : {}}
              >
                <span className="text-[10px] font-bold tracking-wider block mb-1 opacity-70">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h4 className="text-xs font-bold tracking-wide mb-2">{t(stage.title)}</h4>
                <p className="text-xs leading-relaxed opacity-90">{t(stage.desc)}</p>
              </div>
            ))}
          </div>

          {/* Active stage detail image */}
          {village.stages[activeStage]?.imageUrl && (
            <div className="max-w-md mx-auto aspect-video overflow-hidden rounded-[6px] border border-[#D4B896]/60 shadow-medium">
              <img
                src={village.stages[activeStage].imageUrl}
                alt={t(village.stages[activeStage].title)}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
          )}
        </div>
      </section>

      {/* Artisan Spotlight */}
      <section className="container mx-auto px-6 md:px-8 max-w-4xl bg-[#FDF6E3] border border-[#D4B896] rounded-[8px] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-subtle reveal">
        {village.artisan.avatarUrl ? (
          <img
            src={village.artisan.avatarUrl}
            alt={village.artisan.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 shrink-0"
            style={{ borderColor: village.color }}
          />
        ) : (
          <div
            className="w-24 h-24 md:w-32 md:h-32 rounded-full text-[#F5EDD6] text-4xl font-bold flex items-center justify-center shrink-0 border-2"
            style={{ backgroundColor: village.color, borderColor: village.color }}
          >
            {village.artisan.name.charAt(village.artisan.name.lastIndexOf(' ') + 1)}
          </div>
        )}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Award size={18} style={{ color: village.color }} />
            <span className="text-[11px] font-bold tracking-wider text-[#5C3D1E] uppercase">
              {lang === 'vi' ? 'Nghệ nhân tiêu biểu' : 'Featured Artisan'}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#2C1A0E]">{village.artisan.name}</h3>
          <p className="text-sm text-[#2C1A0E] leading-relaxed">{t(village.artisan.story)}</p>
          <div className="border-l-4 pl-4 py-1 italic text-sm text-[#7A5A1A]" style={{ borderColor: village.color }}>
            "{t(village.artisan.quote)}"
          </div>
        </div>
      </section>
    </div>
  );
}
