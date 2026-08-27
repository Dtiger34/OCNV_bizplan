import { useParams, Link } from 'react-router-dom';
import { HelpCircle, ShieldAlert, Truck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function StaticContentPage() {
  const { key } = useParams();
  const { t } = useTranslation();

  const getPageDetails = () => {
    switch (key) {
      case 'return-policy':
        return {
          title: t('static.return_title'),
          icon: <ShieldAlert size={28} className="text-[#7B1C2E]" />,
          html: t('static.return_html')
        };
      case 'shipping-policy':
        return {
          title: t('static.shipping_title'),
          icon: <Truck size={28} className="text-[#C9973A]" />,
          html: t('static.shipping_html')
        };
      case 'faq':
      default:
        return {
          title: t('static.faq_title'),
          icon: <HelpCircle size={28} className="text-[#ab2124]" />,
          html: t('static.faq_html')
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
          {t('static.back_home')}
        </Link>
      </div>
    </div>
  );
}
