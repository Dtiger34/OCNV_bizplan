import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { X, Smartphone, ScanLine, Info } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { VILLAGES } from '@/features/villages/data/villages-static';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          ar?: boolean | string;
          'ar-modes'?: string;
          'camera-controls'?: boolean | string;
          'auto-rotate'?: boolean | string;
          'shadow-intensity'?: string;
          'environment-image'?: string;
          style?: React.CSSProperties;
          poster?: string;
        },
        HTMLElement
      >;
    }
  }
}

// Map slug → GLB model + target image
const VILLAGE_AR: Record<string, { model: string; target: string; label: string }> = {
  'lang-non': {
    model: '/models/lang-non.glb',
    target: '/models/lang-non-target.jpg',
    label: 'Làng Nón Chuông',
  },
};

export default function VillageArPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [showGuide, setShowGuide] = useState(true);

  const village = VILLAGES.find((v) => v.slug === slug);
  const arAssets = VILLAGE_AR[slug ?? ''];
  const arUrl = `${window.location.origin}/villages/${slug}/ar`;
  const isMobile = window.innerWidth < 1024;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Slug không có model → fallback
  if (!arAssets) {
    return (
      <div className="min-h-screen bg-[#2C1A0E] flex flex-col items-center justify-center p-8 text-center gap-6">
        <ScanLine className="w-14 h-14 text-[#C9973A]" />
        <h1 className="text-2xl font-light text-white">AR chưa khả dụng</h1>
        <p className="text-sm text-[#9C8670] max-w-xs">
          Mô hình 3D AR cho làng nghề này đang được chuẩn bị. Hiện chỉ có Làng Nón Chuông.
        </p>
        <Link
          to={`/villages/${slug}`}
          className="px-6 py-2.5 bg-[#C9973A] text-[#2C1A0E] text-xs font-bold tracking-widest uppercase rounded"
        >
          Quay Lại
        </Link>
      </div>
    );
  }

  // Desktop → QR code
  if (!isMobile) {
    return (
      <div className="min-h-screen bg-[#2C1A0E] text-[#F5EDD6] flex flex-col items-center justify-center p-6 text-center gap-8">
        <Smartphone className="w-14 h-14 text-[#C9973A] animate-bounce" />
        <div className="space-y-2">
          <p className="text-[10px] tracking-[0.3em] text-[#C9973A] uppercase">AR Trải Nghiệm</p>
          <h1 className="text-3xl font-light">{arAssets.label}</h1>
          <p className="text-sm text-[#9C8670] max-w-sm mx-auto leading-relaxed">
            Quét mã QR bằng điện thoại để xem mô hình 3D diorama ngay trong không gian của bạn.
          </p>
        </div>
        <div className="p-4 bg-white rounded-xl">
          <QRCodeSVG value={arUrl} size={200} />
        </div>
        <p className="text-[10px] text-[#5C3D1E] tracking-widest">{arUrl}</p>
        <button
          onClick={() => navigate(`/villages/${slug}`)}
          className="px-6 py-2.5 bg-[#5C3D1E] hover:bg-[#7A5230] text-[#F5EDD6] text-[11px] font-bold tracking-wider uppercase rounded-sm cursor-pointer transition-colors"
        >
          Quay Lại Làng Nghề
        </button>
      </div>
    );
  }

  // Mobile → AR viewer
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <p className="text-[9px] tracking-[0.25em] text-[#C9973A] uppercase">AR · Mô Hình 3D</p>
          <p className="text-white text-sm font-medium leading-tight">{arAssets.label}</p>
        </div>
        <button
          onClick={() => navigate(`/villages/${slug}`)}
          className="w-9 h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white"
        >
          <X size={18} />
        </button>
      </div>

      {/* model-viewer */}
      <model-viewer
        src={arAssets.model}
        alt={`Mô hình 3D ${arAssets.label}`}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        style={{ width: '100%', height: '100%', background: '#1a0a00' }}
      />

      {/* Hướng dẫn quét */}
      {showGuide && (
        <div className="absolute bottom-20 left-4 right-4 z-20 bg-[#2C1A0E]/95 border border-[#C9973A]/60 rounded-xl p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Info size={14} className="text-[#C9973A] shrink-0 mt-0.5" />
              <p className="text-[#F5EDD6] text-xs font-semibold">Cách xem AR</p>
            </div>
            <button
              onClick={() => setShowGuide(false)}
              className="text-[#9C8670] hover:text-[#F5EDD6]"
            >
              <X size={14} />
            </button>
          </div>

          <div className="flex items-start gap-3">
            <img
              src={arAssets.target}
              alt="target"
              className="w-16 h-16 object-cover rounded-lg border border-[#C9973A]/40 shrink-0"
            />
            <div className="space-y-1.5">
              <p className="text-[#C9B99A] text-[11px] leading-relaxed">
                1. Nhấn nút <span className="text-[#C9973A] font-semibold">AR</span> phía dưới màn hình
              </p>
              <p className="text-[#C9B99A] text-[11px] leading-relaxed">
                2. Hướng camera vào mô hình diorama trông như ảnh bên trái
              </p>
              <p className="text-[#C9B99A] text-[11px] leading-relaxed">
                3. Mô hình 3D sẽ hiện ngay lên bề mặt phẳng phía trước
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-5 pt-8 flex flex-col items-center gap-2 bg-gradient-to-t from-black/70 to-transparent">
        {!showGuide && (
          <button
            onClick={() => setShowGuide(true)}
            className="flex items-center gap-1.5 text-[10px] text-[#C9B99A] hover:text-[#F5EDD6] mb-1"
          >
            <Info size={11} /> Xem hướng dẫn
          </button>
        )}
        <p className="text-[10px] text-[#9C8670] tracking-wide text-center px-6">
          Xoay mô hình bằng cách vuốt · Nhấn nút AR để đặt vào không gian thực
        </p>
      </div>
    </div>
  );
}
