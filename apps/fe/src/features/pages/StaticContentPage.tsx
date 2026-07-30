import { useParams, Link } from 'react-router-dom';
import { HelpCircle, ShieldAlert, Truck } from 'lucide-react';

export default function StaticContentPage() {
  const { key } = useParams();

  const getPageDetails = () => {
    switch (key) {
      case 'return-policy':
        return {
          title: 'Chính Sách Đổi Trả',
          icon: <ShieldAlert size={28} className="text-[#7B1C2E]" />,
          html: `
            <div class="space-y-4">
              <h3 class="text-xl font-bold text-[#ab2124]">1. Thời hạn Đổi trả Mô hình</h3>
              <p>Mô hình tiểu cảnh diorama được đổi trả trong vòng 7 ngày kể từ khi quý khách nhận hàng thành công. Sản phẩm đổi trả phải còn nguyên vẹn, không nứt vỡ lớp mica bảo vệ và không trầy xước khung gỗ ghép.</p>
              <h3 class="text-xl font-bold text-[#ab2124]">2. Phí vận chuyển hoàn trả</h3>
              <p>Trường hợp đổi trả do mong muốn chủ quan của khách hàng, chi phí vận chuyển sẽ do khách hàng chi trả. Nếu mô hình bị lỗi chế tác hoặc hư hỏng trong quá trình vận chuyển, chúng tôi chịu hoàn toàn phí vận chuyển.</p>
            </div>
          `
        };
      case 'shipping-policy':
        return {
          title: 'Chính Sách Vận Chuyển',
          icon: <Truck size={28} className="text-[#C9973A]" />,
          html: `
            <div class="space-y-4">
              <h3 class="text-xl font-bold text-[#ab2124]">1. Phạm vi Giao Hàng</h3>
              <p>Chúng tôi giao nhận mô hình trên toàn quốc từ Bắc vào Nam. Thời gian giao hàng nội thành Hà Nội trong vòng 24 giờ, các tỉnh thành khác từ 3 đến 5 ngày làm việc.</p>
              <h3 class="text-xl font-bold text-[#ab2124]">2. Đóng gói bảo vệ</h3>
              <p>Các hộp diorama tiểu cảnh được bọc xốp bọt cẩn thận chống sốc, niêm phong đóng hộp các lớp xốp dày chuyên dụng để tránh rung lắc, nứt vỡ trong quá trình di chuyển.</p>
            </div>
          `
        };
      case 'faq':
      default:
        return {
          title: 'Hỏi Đáp & Trợ Giúp (FAQ)',
          icon: <HelpCircle size={28} className="text-[#ab2124]" />,
          html: `
            <div class="space-y-6">
              <div>
                <h4 class="text-lg font-bold text-[#ab2124]">Hộp mô hình tiểu cảnh có sử dụng đèn LED không?</h4>
                <p class="mt-1 text-sm">Có. Các mô hình diorama làng nghề đều được tích hợp hệ thống đèn LED ấm cúng sử dụng cổng USB hoặc pin tiện lợi để làm sáng không gian trưng bày ban đêm.</p>
              </div>
              <div>
                <h4 class="text-lg font-bold text-[#ab2124]">Làm thế nào để bảo quản mica và khung gỗ?</h4>
                <p class="mt-1 text-sm">Tránh ánh nắng rọi trực tiếp hoặc nguồn nhiệt cao, dùng khăn mềm ẩm lau nhẹ lớp mica bảo vệ ngoài. Tránh ẩm ướt để bảo quản chất lượng gỗ MDF mộc mạc lâu bền.</p>
              </div>
          `
        };
    }
  };

  const page = getPageDetails();

  return (
    <div className="container mx-auto px-6 md:px-8 py-12 max-w-3xl space-y-8">
      {/* Header static page */}
      <div className="flex items-center gap-3 border-b border-[#D4B896] pb-5 reveal">
        {page.icon}
        <h1 className="text-3xl font-normal text-[#ab2124] text-title-gradient">
          {page.title}
        </h1>
      </div>

      {/* HTML Render */}
      <div
        className="text-sm text-[#ab2124] leading-relaxed space-y-4 prose reveal delay-75"
        dangerouslySetInnerHTML={{ __html: page.html }}
      />

      <div className="pt-6 border-t border-[#D4B896]/30">
        <Link
          to="/"
          className="text-[11px] font-bold tracking-wider text-[#ab2124] hover:text-[#7B1C2E] uppercase transition-colors"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}
