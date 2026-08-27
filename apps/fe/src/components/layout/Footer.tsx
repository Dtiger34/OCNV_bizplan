import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <footer className="bg-[#ab2124] text-[#fff8e7] border-t border-[#C9973A]/20 pt-16 pb-8 transition-colors">
      {/* 3-Column Minimal Layout */}
      <div className="container mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 pb-12">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <h4 className="text-2xl font-bold tracking-wider text-[#fff8e7] uppercase">
            {t('footer.brand')}
          </h4>
          <div className="space-y-2 pt-2 text-[#C9B99A] text-sm">
            <div className="flex items-center gap-2.5">
              <MapPin size={15} className="text-[#C9973A]" />
              <span>{t('footer.address')}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={15} className="text-[#C9973A]" />
              <span>+84 865 963 234</span>
            </div>
          </div>
        </div>

        {/* Column 2: Navigation Links (Grouped lists side-by-side) */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-[13px] font-bold tracking-[0.2em] text-[#fff8e7] uppercase">
              {t('footer.villages_title')}
            </h4>
            <ul className="text-xs text-[#C9B99A] space-y-3">
              <li>
                <a href="/villages/bat-trang" className="hover:text-[#C9973A] transition-colors block">
                  {t('footer.villages.bat_trang')}
                </a>
              </li>
              <li>
                <a href="/villages/van-phuc" className="hover:text-[#C9973A] transition-colors block">
                  {t('footer.villages.van_phuc')}
                </a>
              </li>
              <li>
                <a href="/villages/non-chuong" className="hover:text-[#C9973A] transition-colors block">
                  {t('footer.villages.chuong')}
                </a>
              </li>
              <li>
                <a href="/villages/quang-phu-cau" className="hover:text-[#C9973A] transition-colors block">
                  {t('footer.villages.quang_phu_cau')}
                </a>
              </li>
              <li>
                <a href="/villages/chang-son" className="hover:text-[#C9973A] transition-colors block">
                  {t('footer.villages.chang_son')}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[13px] font-bold tracking-[0.2em] text-[#fff8e7] uppercase whitespace-nowrap">
              {t('footer.policies_title')}
            </h4>
            <ul className="text-xs text-[#C9B99A] space-y-3">
              <li>
                <a href="/pages/shipping-policy" className="hover:text-[#C9973A] transition-colors block">
                  {t('footer.policies.shipping')}
                </a>
              </li>
              <li>
                <a href="/pages/return-policy" className="hover:text-[#C9973A] transition-colors block">
                  {t('footer.policies.warranty')}
                </a>
              </li>
<li>
                <a href="/pages/faq" className="hover:text-[#C9973A] transition-colors block">
                  {t('footer.policies.faq')}
                </a>
              </li>
              <li>
                <Link to="/lien-he" className="hover:text-[#C9973A] transition-colors block">
                  {t('footer.policies.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 3: Newsletter */}
        <div className="space-y-4">
          <h4 className="text-[13px] font-bold tracking-[0.2em] text-[#fff8e7] uppercase">
            {t('footer.newsletter_title')}
          </h4>
          <p className="text-sm text-[#C9B99A] leading-relaxed">
            {t('footer.newsletter_desc')}
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
            <div className="flex gap-2 items-end border-b border-[#D4B896]/60 focus-within:border-[#C9973A] transition-colors pb-1">
              <input
                type="email"
                placeholder={t('footer.newsletter_placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-9 bg-transparent text-[#fff8e7] placeholder-[#ab2124]/80 text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="h-9 px-2 bg-transparent text-[#C9973A] hover:text-[#fff8e7] transition-colors cursor-pointer flex items-center justify-center"
              >
                <Mail size={16} strokeWidth={1.5} />
              </button>
            </div>
            {submitted && (
              <div className="flex items-center gap-1 text-[#7A9E8E] text-[11px] pt-1">
                <CheckCircle2 size={12} />
                <span>{t('footer.newsletter_success')}</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Thin divider line above copyright strip */}
      <div className="container mx-auto px-6 md:px-8 border-t border-[#D4B896]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-[#C9B99A]/50 text-center md:text-left">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>

        {/* Social Icons (Thin line symbols) */}
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/NgheXuaNetMoi"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full border border-[#D4B896]/10 flex items-center justify-center text-[#C9973A]/80 hover:text-[#fff8e7] hover:border-[#C9973A]/40 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@nghexuanetmoi"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full border border-[#D4B896]/10 flex items-center justify-center text-[#C9973A]/80 hover:text-[#fff8e7] hover:border-[#C9973A]/40 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.24 8.24 0 0 0 4.83 1.56V6.79a4.85 4.85 0 0 1-1.06-.1z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
