import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Send } from 'lucide-react';
import { useContactStore } from '@/store/contactStore';
import { useTranslation } from 'react-i18next';

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  rating: number;
}

const SUBJECTS = [
  'Hỏi về sản phẩm',
  'Đặt làm theo yêu cầu',
  'Vận chuyển & giao hàng',
  'Bảo hành & đổi trả',
  'Hợp tác kinh doanh',
  'Góp ý chung',
];

export default function ContactPage() {
  const { t } = useTranslation();
  const subjects = t('contact.subjects', { returnObjects: true }) as string[];

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: subjects[0] || SUBJECTS[0],
    message: '',
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const addContact = useContactStore((s) => s.addContact);

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = t('contact.err_name');
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = t('contact.err_email');
    if (!form.message.trim()) e.message = t('contact.err_msg');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addContact({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
      rating: form.rating,
    });
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', subject: subjects[0] || SUBJECTS[0], message: '', rating: 5 });
    setErrors({});
    setTimeout(() => setSubmitted(false), 6000);
  };

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="bg-[#fff8e7] min-h-screen">
      {/* Hero */}
      <div className="relative bg-[#ab2124] py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-[120px] font-bold text-white/[0.03] select-none pointer-events-none uppercase tracking-widest leading-none">
          {t('contact.system')}
        </div>
        <div className="relative z-10 space-y-3">
          <span className="text-[13px] font-bold tracking-[0.22em] text-[#C9973A] uppercase block">
            {t('contact.brand')}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{t('contact.title')}</h1>
          <p className="text-[#C9B99A] text-sm max-w-md mx-auto leading-relaxed">
            {t('contact.desc')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 max-w-6xl py-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Left — Info */}
        <aside className="lg:col-span-2 space-y-8">
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-[#ab2124] text-title-gradient">{t('contact.info_title')}</h2>
            {[
              {
                icon: <MapPin size={18} className="text-[#C9973A] shrink-0 mt-0.5" />,
                label: t('contact.address_lbl'),
                value: t('contact.address_val'),
              },
              {
                icon: <Phone size={18} className="text-[#C9973A] shrink-0 mt-0.5" />,
                label: t('contact.phone_lbl'),
                value: t('contact.phone_val'),
              },
              {
                icon: <Mail size={18} className="text-[#C9973A] shrink-0 mt-0.5" />,
                label: t('contact.email_lbl'),
                value: t('contact.email_val'),
              },
              {
                icon: <Clock size={18} className="text-[#C9973A] shrink-0 mt-0.5" />,
                label: t('contact.hours_lbl'),
                value: t('contact.hours_val'),
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-3">
                {item.icon}
                <div>
                  <p className="text-[13px] font-bold tracking-wider text-[#ab2124] uppercase mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm text-[#ab2124] whitespace-pre-line leading-relaxed">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Rating prompt */}
          <div className="bg-[#fff8e7] border border-[#D4B896]/60 rounded-[6px] p-5 space-y-3">
            <p className="text-[13px] font-bold tracking-[0.15em] text-[#ab2124] uppercase">
              {t('contact.rating_title')}
            </p>
            <p className="text-xs text-[#ab2124] leading-relaxed">
              {t('contact.rating_desc')}
            </p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, rating: s }))}
                  className="transition-transform hover:scale-110 cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-7 h-7 transition-colors ${s <= form.rating ? 'text-[#C9973A]' : 'text-[#D4B896]'}`}
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right — Form */}
        <div className="lg:col-span-3">
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <CheckCircle2 size={48} className="text-[#7A9E8E]" />
              <h3 className="text-xl font-bold text-[#ab2124]">{t('contact.success_title')}</h3>
              <p className="text-sm text-[#ab2124] max-w-xs leading-relaxed">
                {t('contact.success_desc')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold tracking-wider text-[#ab2124] uppercase">
                    {t('contact.form_name')} <span className="text-[#7B1C2E]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Nguyễn Văn A"
                    className={`w-full h-10 px-3 bg-[#fff8e7] border rounded-[4px] text-sm text-[#ab2124] placeholder-[#ab2124]/60 focus:outline-none focus:border-[#C9973A] transition-colors ${errors.name ? 'border-[#7B1C2E]' : 'border-[#D4B896]'}`}
                  />
                  {errors.name && <p className="text-[10px] text-[#7B1C2E]">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold tracking-wider text-[#ab2124] uppercase">
                    {t('contact.form_email')} <span className="text-[#7B1C2E]">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="ban@email.com"
                    className={`w-full h-10 px-3 bg-[#fff8e7] border rounded-[4px] text-sm text-[#ab2124] placeholder-[#ab2124]/60 focus:outline-none focus:border-[#C9973A] transition-colors ${errors.email ? 'border-[#7B1C2E]' : 'border-[#D4B896]'}`}
                  />
                  {errors.email && <p className="text-[10px] text-[#7B1C2E]">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold tracking-wider text-[#ab2124] uppercase">
                    {t('contact.form_phone')}
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="0901 234 567"
                    className="w-full h-10 px-3 bg-[#fff8e7] border border-[#D4B896] rounded-[4px] text-sm text-[#ab2124] placeholder-[#ab2124]/60 focus:outline-none focus:border-[#C9973A] transition-colors"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold tracking-wider text-[#ab2124] uppercase">
                    {t('contact.form_subject')}
                  </label>
                  <select
                    value={form.subject}
                    onChange={set('subject')}
                    className="w-full h-10 px-3 bg-[#fff8e7] border border-[#D4B896] rounded-[4px] text-sm text-[#ab2124] focus:outline-none focus:border-[#C9973A] transition-colors cursor-pointer"
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold tracking-wider text-[#ab2124] uppercase">
                  {t('contact.form_message')} <span className="text-[#7B1C2E]">*</span>
                </label>
                <textarea
                  rows={6}
                  value={form.message}
                  onChange={set('message')}
                  placeholder={t('contact.form_message_ph')}
                  className={`w-full px-3 py-2.5 bg-[#fff8e7] border rounded-[4px] text-sm text-[#ab2124] placeholder-[#ab2124]/60 focus:outline-none focus:border-[#C9973A] transition-colors resize-none ${errors.message ? 'border-[#7B1C2E]' : 'border-[#D4B896]'}`}
                />
                {errors.message && <p className="text-[10px] text-[#7B1C2E]">{errors.message}</p>}
              </div>

              {/* Rating display in form */}
              <div className="flex items-center gap-3 py-2 border-y border-[#D4B896]/30">
                <span className="text-[13px] font-bold tracking-wider text-[#ab2124] uppercase shrink-0">
                  {t('contact.form_rating')}
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, rating: s }))}
                      className="transition-transform hover:scale-110 cursor-pointer"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className={`w-6 h-6 transition-colors ${s <= form.rating ? 'text-[#C9973A]' : 'text-[#D4B896]'}`}
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </button>
                  ))}
                </div>
                <span className="text-xs text-[#ab2124]">
                  {['', t('contact.rating_1'), t('contact.rating_2'), t('contact.rating_3'), t('contact.rating_4'), t('contact.rating_5')][form.rating]}
                </span>
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-[#ab2124] hover:bg-[#ab2124] text-[#fff8e7] text-[13px] font-bold tracking-wider uppercase rounded-[4px] flex items-center justify-center gap-2 transition-colors active:scale-[0.98] cursor-pointer"
              >
                <Send size={14} />
                {t('contact.btn_submit')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
