import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { VILLAGES } from '../data/villages-static';
import { useTranslation } from 'react-i18next';

export default function VillagesListPage() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'en' ? 'en' : 'vi') as 'vi' | 'en';

  return (
    <div className="min-h-screen bg-[#fff8e7]">
      {/* Hero — dark cinematic band */}
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url('/image/anh-cau-chuyen-lang-nghe.jpg')`,
            filter: 'brightness(0.3)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#ab2124]/70 via-transparent to-[#fff8e7]" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#C9973A] uppercase mb-4"
          >
            {t('villages.list.subtitle')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight mb-5"
            dangerouslySetInnerHTML={{ __html: t('villages.list.title') }}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-[1px] w-16 bg-[#C9973A]/60 mx-auto mb-5"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-[#D4B896]/80 leading-relaxed max-w-lg mx-auto"
          >
            {t('villages.list.desc')}
          </motion.p>
        </div>
      </section>

      {/* Stats strip — kem ấm */}
      <section className="bg-[#EDE3CE] border-y border-[#D4B896]/50">
        <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-3 gap-6 text-center">
          {[
            { value: '5', label: t('villages.list.stats.villages') },
            { value: '700+', label: t('villages.list.stats.history') },
            { value: '∞', label: t('villages.list.stats.stories') },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl sm:text-4xl font-light text-[#ab2124] mb-0.5">{value}</p>
              <p className="text-[10px] tracking-widest text-[#ab2124] uppercase">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Village cards */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.25em] text-[#ab2124] uppercase mb-2">{t('villages.list.explore')}</p>
            <h2 className="text-2xl sm:text-3xl font-light text-[#ab2124] text-title-gradient" dangerouslySetInnerHTML={{ __html: t('villages.list.featured_title') }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VILLAGES.map((village, i) => (
              <motion.div
                key={village.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={`/villages/${village.slug}`}
                  className="group block overflow-hidden rounded-[8px] bg-[#fff8e7] border border-[#D4B896] hover:border-[#C9973A]/60 hover:shadow-lg transition-all duration-400"
                  onMouseEnter={() => setHoveredSlug(village.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={village.coverImageUrl}
                      alt={village.name[lang]}
                      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#ab2124]/70 via-transparent to-transparent" />

                    {/* Accent bar bottom */}
                    <div
                      className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                      style={{ backgroundColor: village.color }}
                    />

                    <div className="absolute bottom-3 left-4 right-4">
                      <h2 className="text-white text-lg font-medium leading-tight drop-shadow-md">
                        {village.name[lang]}
                      </h2>
                    </div>
                  </div>

                  {/* Body — nền kem */}
                  <div className="p-5 space-y-3">
                    <p className="text-xs italic text-[#ab2124]">{village.tagline[lang]}</p>
                    <p className="text-sm text-[#ab2124] leading-relaxed line-clamp-3">
                      {village.shortDescription[lang]}
                    </p>

                    <div className="flex items-center gap-4 pt-1">
                      <span className="flex items-center gap-1.5 text-[10px] text-[#ab2124]">
                        <MapPin size={11} />
                        {village.facts.find((f) => f.label.vi === 'Vị trí' || f.label.en === 'Location')?.value[lang] ?? 'Hà Nội'}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] text-[#ab2124]">
                        <Clock size={11} />
                        {village.facts.find((f) => f.label.vi === 'Lịch sử' || f.label.en === 'History')?.value[lang] ?? ''}
                      </span>
                    </div>

                    <div
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider pt-1 transition-colors duration-300"
                      style={{ color: hoveredSlug === village.slug ? village.color : '#ab2124' }}
                    >
                      {t('villages.list.explore_btn')}
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
        </div>
      </section>
    </div>
  );
}
