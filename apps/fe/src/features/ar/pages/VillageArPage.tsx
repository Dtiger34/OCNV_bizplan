import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { X, Smartphone, ScanLine, Loader2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

// Map slug → mô hình 3D — AR đặt mô hình trực tiếp trong phòng (model-viewer), không cần marker/ảnh diorama
const VILLAGE_AR: Record<string, { model: string; label: string }> = {
  'non-chuong': {
    model: '/models/lang-non.glb',
    label: 'Làng Nón Chuông',
  },
  'huong-quang-phu-cau': {
    model: '/models/lang-huong.glb',
    label: 'Làng Hương Quảng Phú Cầu',
  },
  'lua-van-phuc': {
    model: '/models/lang-lua.glb',
    label: 'Làng Lụa Vạn Phúc',
  },
  'quat-chang-son': {
    model: '/models/lang-quat.glb',
    label: 'Làng Quạt Chàng Sơn',
  },
};

// Khai báo để TypeScript không báo lỗi với custom element của model-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          ar?: boolean;
          'ar-modes'?: string;
          'ar-placement'?: string;
          'ar-scale'?: string;
          'camera-controls'?: boolean;
          'auto-rotate'?: boolean;
        },
        HTMLElement
      >;
    }
  }
}

export default function VillageArPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  const arAssets = VILLAGE_AR[slug ?? ''];
  const arUrl = `${window.location.origin}/villages/${slug}/ar`;
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  // model-viewer đã được load global trong index.html — chỉ cần đợi custom element đăng ký xong
  useEffect(() => {
    customElements.whenDefined('model-viewer').then(() => setScriptsLoaded(true));
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Slug không có model
  if (!arAssets) {
    return (
      <div className="min-h-screen bg-[#2C1A0E] flex flex-col items-center justify-center p-8 text-center gap-6">
        <ScanLine className="w-14 h-14 text-[#C9973A]" />
        <h1 className="text-2xl font-light text-white">AR chưa khả dụng</h1>
        <p className="text-sm text-[#9C8670] max-w-xs">
          Mô hình 3D AR cho làng nghề này đang được chuẩn bị.
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
            Quét mã QR bằng điện thoại để đặt mô hình 3D ngay trong không gian thực tế của bạn.
          </p>
        </div>
        <div className="p-4 bg-white rounded-xl">
          <QRCodeSVG value={arUrl} size={200} />
        </div>
        <button
          onClick={() => navigate(`/villages/${slug}`)}
          className="px-6 py-2.5 bg-[#5C3D1E] hover:bg-[#7A5230] text-[#F5EDD6] text-[11px] font-bold tracking-wider uppercase rounded-sm cursor-pointer transition-colors"
        >
          Quay Lại Làng Nghề
        </button>
      </div>
    );
  }

  // Mobile → model-viewer AR (đặt mô hình trực tiếp trong phòng)
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <p className="text-[9px] tracking-[0.25em] text-[#C9973A] uppercase">AR · Đặt Trong Phòng</p>
          <p className="text-white text-sm font-medium">{arAssets.label}</p>
        </div>
        <button
          onClick={() => navigate(`/villages/${slug}`)}
          className="pointer-events-auto w-9 h-9 bg-black/50 rounded-full flex items-center justify-center text-white"
        >
          <X size={18} />
        </button>
      </div>

      {!scriptsLoaded && (
        <div className="absolute inset-0 z-40 bg-[#2C1A0E] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 text-[#C9973A] animate-spin" />
          <p className="text-[#9C8670] text-sm">Đang khởi động AR...</p>
        </div>
      )}

      {scriptsLoaded && (
        // @ts-ignore — model-viewer là custom element
        <model-viewer
          src={arAssets.model}
          alt={arAssets.label}
          ar
          ar-modes="scene-viewer webxr quick-look"
          ar-placement="floor"
          ar-scale="auto"
          camera-controls
          auto-rotate
          style={{ width: '100%', height: '100%', backgroundColor: '#111' }}
        />
      )}
    </div>
  );
}
