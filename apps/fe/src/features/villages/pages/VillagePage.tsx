import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Clock, Layers } from 'lucide-react';
import { getVillage } from '../data/villages-static';

export default function VillagePage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeStage, setActiveStage] = useState(0);

  const village = getVillage(slug ?? '');

  if (!village) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6">
        <p className="text-2xl font-light text-[#2C1A0E]">Không tìm thấy làng nghề</p>
        <Link to="/villages" className="text-[#C9973A] underline text-sm hover:text-[#5C3D1E] transition-colors">
          ← Quay lại danh sách
        </Link>
      </div>
    );
  }

  const firstLetter = village.fullHistory.charAt(0);
  const restHistory = village.fullHistory.slice(1);

  return (
    <div className="bg-[#FDF6E3] min-h-screen">

      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <div className="fixed top-20 left-4 z-40">
        <Link
          to="/villages"
          className="inline-flex items-center gap-1.5 text-[#F5EDD6]/80 text-xs tracking-wide hover:text-[#C9973A] transition-colors bg-[#2C1A0E]/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10"
        >
          <ChevronLeft size={13} />
          Tất cả làng nghề
        </Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[75vh] md:min-h-screen bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url('${village.heroImageUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E] via-[#2C1A0E]/50 to-transparent" />

        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 pb-14 md:pb-20 space-y-4 max-w-4xl">
          <span className="inline-block text-[10px] font-bold tracking-[0.25em] text-[#C9973A] uppercase border border-[#C9973A]/50 px-3 py-1 rounded-sm">
            Làng Nghề Truyền Thống
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-[#F5EDD6] leading-tight">
            {village.name}
          </h1>
          <p className="text-[#F5EDD6]/70 italic text-sm md:text-base max-w-xl">
            "{village.tagline}"
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9973A]" />
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <section className="bg-[#2C1A0E]">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-0 md:divide-x divide-[#C9973A]/30">
            {village.facts.map((fact, i) => (
              <div key={i} className="md:px-8 text-center">
                <p className="text-[9px] tracking-[0.18em] text-[#C9973A]/60 uppercase mb-0.5">{fact.label}</p>
                <p className="text-xs text-[#F5EDD6]/80 font-medium">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── History + Pull-quote ─────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* Left — history with drop-cap */}
          <div className="space-y-5">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#C9973A] uppercase block">
              Lịch Sử
            </span>
            <h2 className="text-2xl md:text-3xl font-light text-[#2C1A0E] leading-snug">
              Ngàn năm dựng nghề
            </h2>
            <div className="text-sm text-[#2C1A0E]/85 leading-relaxed">
              <span className="float-left text-6xl leading-none font-serif text-[#C9973A] mr-2 mt-1 select-none">
                {firstLetter}
              </span>
              {restHistory.split('\n\n').map((para, i) => (
                <p key={i} className={i > 0 ? 'mt-4 clear-none' : ''}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Right — pull-quote + short desc */}
          <div className="space-y-6">
            <div className="border-l-4 border-[#C9973A] pl-5 py-2">
              <p className="text-sm italic text-[#5C3D1E] leading-relaxed">
                "{village.shortDescription}"
              </p>
            </div>

            {/* Artisan quote if available */}
            {village.artisanQuote && (
              <div className="bg-[#2C1A0E] rounded-lg p-6 space-y-3">
                <p className="text-base italic text-[#F5EDD6]/85 leading-relaxed">
                  "{village.artisanQuote}"
                </p>
                <div className="h-px w-8 bg-[#C9973A]" />
                <p className="text-[10px] tracking-widest text-[#C9973A]/70 uppercase">Nghệ nhân làng {village.name}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Production Stages ────────────────────────────────────────────── */}
      <section className="bg-[#F5EDD6] border-y border-[#D4B896]/50 py-14">
        <div className="max-w-5xl mx-auto px-6 md:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#C9973A] uppercase block">
              Nghệ thuật chế tác
            </span>
            <h2 className="text-2xl md:text-3xl font-light text-[#2C1A0E]">
              Quy Trình Chế Tác
            </h2>
            <div className="h-px w-12 bg-[#D4B896] mx-auto" />
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {village.stages.map((stage, idx) => (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`text-left p-5 border rounded-lg transition-all duration-200 cursor-pointer ${
                  activeStage === idx
                    ? 'bg-[#3A1A0A] border-[#3A1A0A] text-[#F5EDD6] shadow-lg scale-[1.02]'
                    : 'bg-[#FDF6E3] border-[#D4B896] text-[#2C1A0E] hover:border-[#C9973A]'
                }`}
              >
                <span className={`text-[10px] font-bold tracking-widest block mb-2 ${activeStage === idx ? 'text-[#C9973A]' : 'text-[#C9973A]/60'}`}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h4 className="text-sm font-bold mb-2 leading-snug">{stage.title}</h4>
                <p className={`text-xs leading-relaxed ${activeStage === idx ? 'text-[#F5EDD6]/80' : 'text-[#5C3D1E]/70'}`}>
                  {stage.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Artisan Spotlight ────────────────────────────────────────────── */}
      {village.artisanStory && (
        <section className="bg-[#2C1A0E] py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center space-y-6">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#C9973A] uppercase block">
              Người Giữ Lửa
            </span>
            <h2 className="text-2xl md:text-3xl font-light text-[#F5EDD6]">
              Nghệ Nhân Tiêu Biểu
            </h2>
            <div className="h-px w-12 bg-[#C9973A] mx-auto" />
            <p className="text-sm text-[#F5EDD6]/65 leading-relaxed max-w-2xl mx-auto">
              {village.artisanStory}
            </p>
          </div>
        </section>
      )}

      {/* ── Back CTA ─────────────────────────────────────────────────────── */}
      <section className="py-14 text-center">
        <Link
          to="/villages"
          className="inline-flex items-center gap-2 px-8 py-3 border border-[#C9973A] text-[#5C3D1E] rounded-full text-sm font-semibold hover:bg-[#C9973A] hover:text-[#F5EDD6] transition-all"
        >
          <ChevronLeft size={14} />
          Xem tất cả làng nghề
        </Link>
      </section>
    </div>
  );
}
