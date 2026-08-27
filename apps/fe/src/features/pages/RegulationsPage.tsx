import React, { useState } from 'react';
import { Truck, RotateCcw, ShieldCheck, CreditCard, Package, HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Section {
  id: string;
  icon: React.ReactNode;
  title: string;
  color: string;
  items: { heading: string; body: string }[];
}

const SECTION_ICONS: Record<string, { icon: React.ReactNode; color: string }> = {
  shipping: { icon: <Truck size={20} />, color: '#C9973A' },
  return: { icon: <RotateCcw size={20} />, color: '#7B1C2E' },
  product: { icon: <Package size={20} />, color: '#ab2124' },
  payment: { icon: <CreditCard size={20} />, color: '#4A9E6B' },
  privacy: { icon: <ShieldCheck size={20} />, color: '#8B6FBA' },
  faq: { icon: <HelpCircle size={20} />, color: '#ab2124' },
};

function AccordionItem({ heading, body }: { heading: string; body: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#D4B896]/40 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3.5 text-left cursor-pointer group"
      >
        <span className="text-sm font-semibold text-[#ab2124] group-hover:text-[#ab2124] transition-colors">
          {heading}
        </span>
        <ChevronDown
          size={15}
          className={`text-[#ab2124] shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-[#ab2124]/80 leading-relaxed">{body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RegulationsPage() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>('shipping');

  const rawSections = t('regulations.sections', { returnObjects: true }) as Record<string, { title: string; items: { heading: string; body: string }[] }>;
  const sections: Section[] = Object.entries(rawSections).map(([id, data]) => ({
    id,
    icon: SECTION_ICONS[id]?.icon || <HelpCircle size={20} />,
    color: SECTION_ICONS[id]?.color || '#ab2124',
    title: data.title,
    items: data.items,
  }));

  const current = sections.find((s) => s.id === activeSection) ?? sections[0];

  return (
    <div className="pb-20">
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 pt-12 pb-8 border-b border-[#D4B896]/50 reveal">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[13px] font-bold tracking-[0.2em] text-[#C9973A] uppercase">
              {t('regulations.brand')}
            </span>
            <h1 className="text-4xl md:text-5xl font-light text-[#ab2124] text-title-gradient">{t('regulations.title')}</h1>
          </div>
          <p className="hidden md:block text-sm text-[#ab2124] max-w-xs text-right leading-relaxed">
            {t('regulations.desc')}
          </p>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 pt-12 flex gap-8 items-start">
        {/* Sidebar nav */}
        <aside className="hidden md:flex flex-col gap-1 w-56 shrink-0 reveal-left">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[6px] text-left text-sm transition-all cursor-pointer ${
                activeSection === s.id
                  ? 'font-semibold'
                  : 'text-[#ab2124]/60 hover:text-[#ab2124] hover:bg-[#fff8e7]'
              }`}
              style={activeSection === s.id ? { color: s.color, backgroundColor: `${s.color}12` } : {}}
            >
              <span style={{ color: activeSection === s.id ? s.color : undefined }}>{s.icon}</span>
              {s.title}
            </button>
          ))}
        </aside>

        {/* Mobile section selector */}
        <div className="md:hidden w-full mb-6">
          <select
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value)}
            className="w-full border border-[#D4B896] rounded-[6px] px-3 py-2 text-sm text-[#ab2124] bg-[#fff8e7]"
          >
            {sections.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0 reveal-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-[#fff8e7] border border-[#D4B896] rounded-[8px] p-6 md:p-8 shadow-subtle"
            >
              {/* Section header */}
              <div className="flex items-center gap-3 pb-5 mb-5 border-b border-[#D4B896]/50">
                <div
                  className="w-10 h-10 rounded-[6px] flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${current.color}15`, color: current.color }}
                >
                  {current.icon}
                </div>
                <h2 className="text-xl font-semibold text-[#ab2124] text-title-gradient">{current.title}</h2>
              </div>

              {/* Accordion items */}
              <div>
                {current.items.map((item) => (
                  <AccordionItem key={item.heading} heading={item.heading} body={item.body} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom nav — prev/next section */}
          <div className="flex justify-between mt-6">
            {(() => {
              const idx = sections.findIndex((s) => s.id === activeSection);
              const prev = sections[idx - 1];
              const next = sections[idx + 1];
              return (
                <>
                  <div>
                    {prev && (
                      <button
                        onClick={() => setActiveSection(prev.id)}
                        className="text-xs text-[#ab2124] hover:text-[#ab2124] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        ← {prev.title}
                      </button>
                    )}
                  </div>
                  <div>
                    {next && (
                      <button
                        onClick={() => setActiveSection(next.id)}
                        className="text-xs text-[#ab2124] hover:text-[#ab2124] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {next.title} →
                      </button>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </main>
      </div>
    </div>
  );
}
