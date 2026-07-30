import React, { useState } from 'react';
import { Truck, RotateCcw, ShieldCheck, CreditCard, Package, HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  icon: React.ReactNode;
  title: string;
  color: string;
  items: { heading: string; body: string }[];
}

const SECTIONS: Section[] = [
  {
    id: 'shipping',
    icon: <Truck size={20} />,
    title: 'Vận Chuyển & Giao Hàng',
    color: '#C9973A',
    items: [
      {
        heading: 'Phạm vi giao hàng',
        body: 'Chúng tôi giao nhận mô hình trên toàn quốc từ Bắc vào Nam. Thời gian giao hàng nội thành Hà Nội trong vòng 24 giờ, các tỉnh thành khác từ 3–5 ngày làm việc.',
      },
      {
        heading: 'Phí vận chuyển',
        body: 'Phí vận chuyển cố định 30.000₫/đơn hàng toàn quốc. Miễn phí vận chuyển cho đơn hàng từ 1.500.000₫ trở lên.',
      },
      {
        heading: 'Đóng gói bảo vệ',
        body: 'Mỗi hộp diorama được bọc xốp bọt cẩn thận chống sốc, niêm phong đóng hộp nhiều lớp để tránh rung lắc, nứt vỡ trong quá trình di chuyển. Mica bảo vệ bên ngoài được dán thêm màng mỏng chống trầy xước.',
      },
      {
        heading: 'Theo dõi đơn hàng',
        body: 'Sau khi đơn được xác nhận giao vận, quý khách sẽ nhận email có mã vận đơn để theo dõi hành trình kiện hàng theo thời gian thực.',
      },
    ],
  },
  {
    id: 'return',
    icon: <RotateCcw size={20} />,
    title: 'Đổi Trả & Hoàn Tiền',
    color: '#7B1C2E',
    items: [
      {
        heading: 'Thời hạn đổi trả',
        body: 'Mô hình tiểu cảnh được đổi trả trong vòng 7 ngày kể từ khi quý khách nhận hàng thành công. Sản phẩm đổi trả phải còn nguyên vẹn, không nứt vỡ lớp mica bảo vệ và không trầy xước khung gỗ.',
      },
      {
        heading: 'Điều kiện đổi trả',
        body: 'Sản phẩm phải còn nguyên tem nhãn, chưa qua sử dụng và có đầy đủ phụ kiện đi kèm. Ảnh chụp tình trạng sản phẩm ngay khi nhận hàng được khuyến khích để làm bằng chứng khi cần.',
      },
      {
        heading: 'Phí vận chuyển hoàn trả',
        body: 'Trường hợp đổi trả do mong muốn chủ quan của khách hàng, chi phí vận chuyển sẽ do khách hàng chi trả. Nếu mô hình bị lỗi chế tác hoặc hư hỏng trong quá trình vận chuyển, chúng tôi chịu hoàn toàn phí vận chuyển.',
      },
      {
        heading: 'Thời gian hoàn tiền',
        body: 'Sau khi nhận và kiểm tra sản phẩm hoàn trả, chúng tôi sẽ xử lý hoàn tiền trong vòng 5–7 ngày làm việc qua phương thức thanh toán ban đầu của quý khách.',
      },
    ],
  },
  {
    id: 'product',
    icon: <Package size={20} />,
    title: 'Chất Lượng Sản Phẩm',
    color: '#ab2124',
    items: [
      {
        heading: 'Vật liệu và chế tác',
        body: 'Tất cả mô hình diorama sử dụng mica acrylic cao cấp, gỗ MDF phủ veneer, chi tiết resin in 3D và sơn acrylic thủ công. Mỗi sản phẩm đều qua kiểm tra chất lượng trước khi đóng gói.',
      },
      {
        heading: 'Sai số kích thước',
        body: 'Do đặc tính thủ công của sản phẩm, có thể xảy ra sai số kích thước nhỏ (±2mm) và sự khác biệt nhẹ về màu sắc so với hình ảnh hiển thị trên website do điều kiện ánh sáng chụp ảnh.',
      },
      {
        heading: 'Bảo hành',
        body: 'Sản phẩm được bảo hành 3 tháng với các lỗi về kết cấu khung, hỏng đèn LED tích hợp hoặc lỗi kết nối QR. Bảo hành không áp dụng cho hư hỏng do va đập, ẩm ướt hoặc sử dụng không đúng cách.',
      },
    ],
  },
  {
    id: 'payment',
    icon: <CreditCard size={20} />,
    title: 'Thanh Toán',
    color: '#4A9E6B',
    items: [
      {
        heading: 'Phương thức thanh toán',
        body: 'Chúng tôi hỗ trợ thanh toán qua VNPAY (thẻ ATM nội địa, thẻ quốc tế Visa/Mastercard), chuyển khoản ngân hàng và thanh toán khi nhận hàng (COD) với đơn hàng dưới 3.000.000₫.',
      },
      {
        heading: 'Bảo mật thông tin',
        body: 'Toàn bộ giao dịch thanh toán được mã hóa theo chuẩn SSL. Chúng tôi không lưu trữ thông tin thẻ thanh toán của khách hàng trên hệ thống.',
      },
      {
        heading: 'Xác nhận đơn hàng',
        body: 'Email xác nhận đơn hàng sẽ được gửi ngay sau khi thanh toán thành công. Nếu không nhận được email trong 15 phút, vui lòng kiểm tra thư mục spam hoặc liên hệ chúng tôi.',
      },
    ],
  },
  {
    id: 'privacy',
    icon: <ShieldCheck size={20} />,
    title: 'Chính Sách Bảo Mật',
    color: '#8B6FBA',
    items: [
      {
        heading: 'Thu thập thông tin',
        body: 'Chúng tôi chỉ thu thập thông tin cần thiết cho việc xử lý đơn hàng và cải thiện trải nghiệm người dùng: họ tên, địa chỉ giao hàng, email và số điện thoại liên lạc.',
      },
      {
        heading: 'Sử dụng thông tin',
        body: 'Thông tin cá nhân của quý khách được sử dụng để xử lý đơn hàng, gửi thông báo giao hàng và hỗ trợ khách hàng. Chúng tôi không bán hoặc chia sẻ thông tin với bên thứ ba vì mục đích thương mại.',
      },
      {
        heading: 'Quyền của khách hàng',
        body: 'Quý khách có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình bất kỳ lúc nào bằng cách liên hệ qua email hỗ trợ của chúng tôi.',
      },
    ],
  },
  {
    id: 'faq',
    icon: <HelpCircle size={20} />,
    title: 'Câu Hỏi Thường Gặp',
    color: '#ab2124',
    items: [
      {
        heading: 'Hộp mô hình có đèn LED không?',
        body: 'Có. Các mô hình diorama đều được tích hợp hệ thống đèn LED ấm sử dụng cổng USB hoặc pin để làm sáng không gian trưng bày ban đêm.',
      },
      {
        heading: 'Làm thế nào để kích hoạt AR?',
        body: 'Quét mã QR ở đế sản phẩm bằng camera điện thoại, trình duyệt sẽ mở trang AR ngay không cần cài ứng dụng. Yêu cầu iOS 12+ hoặc Android 8+ với camera hỗ trợ AR.',
      },
      {
        heading: 'Có thể đặt hàng số lượng lớn (B2B) không?',
        body: 'Có. Chúng tôi hỗ trợ đặt hàng số lượng lớn cho doanh nghiệp, tổ chức với chính sách giá ưu đãi và khả năng in logo/branding theo yêu cầu. Liên hệ email để được tư vấn.',
      },
      {
        heading: 'Bảo quản sản phẩm như thế nào?',
        body: 'Tránh ánh nắng trực tiếp và nguồn nhiệt cao. Dùng khăn mềm ẩm lau nhẹ lớp mica ngoài. Tránh môi trường ẩm ướt để bảo vệ khung gỗ MDF. Không tháo rời các chi tiết miniature bên trong.',
      },
    ],
  },
];

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
  const [activeSection, setActiveSection] = useState<string>('shipping');

  const current = SECTIONS.find((s) => s.id === activeSection) ?? SECTIONS[0];

  return (
    <div className="pb-20">
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 pt-12 pb-8 border-b border-[#D4B896]/50 reveal">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[13px] font-bold tracking-[0.2em] text-[#C9973A] uppercase">
              Nghề Xưa Nét Mới
            </span>
            <h1 className="text-4xl md:text-5xl font-light text-[#ab2124] text-title-gradient">Chính Sách</h1>
          </div>
          <p className="hidden md:block text-sm text-[#ab2124] max-w-xs text-right leading-relaxed">
            Tổng hợp chính sách, điều khoản và hướng dẫn mua hàng
          </p>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 pt-12 flex gap-8 items-start">
        {/* Sidebar nav */}
        <aside className="hidden md:flex flex-col gap-1 w-56 shrink-0 reveal-left">
          {SECTIONS.map((s) => (
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
            {SECTIONS.map((s) => (
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
              const idx = SECTIONS.findIndex((s) => s.id === activeSection);
              const prev = SECTIONS[idx - 1];
              const next = SECTIONS[idx + 1];
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
