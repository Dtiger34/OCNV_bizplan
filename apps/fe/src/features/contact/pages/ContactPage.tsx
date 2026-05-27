import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Send } from 'lucide-react';
import { useContactStore } from '@/store/contactStore';

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
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: SUBJECTS[0],
    message: '',
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const addContact = useContactStore((s) => s.addContact);

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = 'Vui lòng nhập họ tên';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Email không hợp lệ';
    if (!form.message.trim()) e.message = 'Vui lòng nhập nội dung';
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
    setForm({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '', rating: 5 });
    setErrors({});
    setTimeout(() => setSubmitted(false), 6000);
  };

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="bg-[#F5EDD6] min-h-screen">
      {/* Hero */}
      <div className="relative bg-[#3A1A0A] py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-[120px] font-bold text-white/[0.03] select-none pointer-events-none uppercase tracking-widest leading-none">
          LIÊN HỆ
        </div>
        <div className="relative z-10 space-y-3">
          <span className="text-[10px] font-bold tracking-[0.22em] text-[#C9973A] uppercase block">
            NGHỀ XƯA NÉT MỚI
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Liên Hệ & Phản Hồi</h1>
          <p className="text-[#C9B99A] text-sm max-w-md mx-auto leading-relaxed">
            Mọi thắc mắc, ý kiến đóng góp hay đơn đặt hàng riêng — chúng tôi luôn lắng nghe.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 max-w-6xl py-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Left — Info */}
        <aside className="lg:col-span-2 space-y-8">
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-[#2C1A0E]">Thông tin liên hệ</h2>
            {[
              {
                icon: <MapPin size={18} className="text-[#C9973A] shrink-0 mt-0.5" />,
                label: 'Địa chỉ',
                value: 'Phân xưởng Nghề Xưa Nét Mới\nTràng Tiền, Hoàn Kiếm, Hà Nội',
              },
              {
                icon: <Phone size={18} className="text-[#C9973A] shrink-0 mt-0.5" />,
                label: 'Điện thoại',
                value: '+84 1900 8888',
              },
              {
                icon: <Mail size={18} className="text-[#C9973A] shrink-0 mt-0.5" />,
                label: 'Email',
                value: 'hello@nghexxuanetmoi.vn',
              },
              {
                icon: <Clock size={18} className="text-[#C9973A] shrink-0 mt-0.5" />,
                label: 'Giờ làm việc',
                value: 'Thứ 2 – Thứ 7: 8:00 – 18:00\nChủ nhật: 9:00 – 15:00',
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-3">
                {item.icon}
                <div>
                  <p className="text-[10px] font-bold tracking-wider text-[#9C8670] uppercase mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm text-[#2C1A0E] whitespace-pre-line leading-relaxed">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Rating prompt */}
          <div className="bg-[#FDF6E3] border border-[#D4B896]/60 rounded-[6px] p-5 space-y-3">
            <p className="text-[11px] font-bold tracking-[0.15em] text-[#7A5A1A] uppercase">
              Đánh giá trải nghiệm
            </p>
            <p className="text-xs text-[#5C3D1E] leading-relaxed">
              Bạn cảm thấy thế nào về sản phẩm và dịch vụ của chúng tôi? Hãy chọn mức độ trong form bên cạnh.
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
              <h3 className="text-xl font-bold text-[#2C1A0E]">Cảm ơn bạn đã liên hệ!</h3>
              <p className="text-sm text-[#5C3D1E] max-w-xs leading-relaxed">
                Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc. Trân trọng mọi ý kiến đóng góp từ bạn.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">
                    Họ và tên <span className="text-[#7B1C2E]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Nguyễn Văn A"
                    className={`w-full h-10 px-3 bg-[#FDF6E3] border rounded-[4px] text-sm text-[#2C1A0E] placeholder-[#9C8670]/60 focus:outline-none focus:border-[#C9973A] transition-colors ${errors.name ? 'border-[#7B1C2E]' : 'border-[#D4B896]'}`}
                  />
                  {errors.name && <p className="text-[10px] text-[#7B1C2E]">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">
                    Email <span className="text-[#7B1C2E]">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="ban@email.com"
                    className={`w-full h-10 px-3 bg-[#FDF6E3] border rounded-[4px] text-sm text-[#2C1A0E] placeholder-[#9C8670]/60 focus:outline-none focus:border-[#C9973A] transition-colors ${errors.email ? 'border-[#7B1C2E]' : 'border-[#D4B896]'}`}
                  />
                  {errors.email && <p className="text-[10px] text-[#7B1C2E]">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="0901 234 567"
                    className="w-full h-10 px-3 bg-[#FDF6E3] border border-[#D4B896] rounded-[4px] text-sm text-[#2C1A0E] placeholder-[#9C8670]/60 focus:outline-none focus:border-[#C9973A] transition-colors"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">
                    Chủ đề
                  </label>
                  <select
                    value={form.subject}
                    onChange={set('subject')}
                    className="w-full h-10 px-3 bg-[#FDF6E3] border border-[#D4B896] rounded-[4px] text-sm text-[#2C1A0E] focus:outline-none focus:border-[#C9973A] transition-colors cursor-pointer"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase">
                  Nội dung <span className="text-[#7B1C2E]">*</span>
                </label>
                <textarea
                  rows={6}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Nhập nội dung bạn muốn gửi đến chúng tôi..."
                  className={`w-full px-3 py-2.5 bg-[#FDF6E3] border rounded-[4px] text-sm text-[#2C1A0E] placeholder-[#9C8670]/60 focus:outline-none focus:border-[#C9973A] transition-colors resize-none ${errors.message ? 'border-[#7B1C2E]' : 'border-[#D4B896]'}`}
                />
                {errors.message && <p className="text-[10px] text-[#7B1C2E]">{errors.message}</p>}
              </div>

              {/* Rating display in form */}
              <div className="flex items-center gap-3 py-2 border-y border-[#D4B896]/30">
                <span className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase shrink-0">
                  Mức độ hài lòng:
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
                <span className="text-xs text-[#9C8670]">
                  {['', 'Rất tệ', 'Chưa tốt', 'Bình thường', 'Hài lòng', 'Rất hài lòng'][form.rating]}
                </span>
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-[#5C3D1E] hover:bg-[#7A5230] text-[#F5EDD6] text-[11px] font-bold tracking-wider uppercase rounded-[4px] flex items-center justify-center gap-2 transition-colors active:scale-[0.98] cursor-pointer"
              >
                <Send size={14} />
                Gửi Phản Hồi
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
