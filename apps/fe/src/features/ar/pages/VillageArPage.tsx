import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { X, Smartphone, ScanLine, Loader2, AlertTriangle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

// Chrome/Firefox/Edge trên iOS đều dùng WebKit nhưng gắn CriOS/FxiOS/EdgiOS trong UA —
// AR (Quick Look/WebXR) trên iOS chỉ chạy được trong Safari thật
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isNonSafariOniOS = /CriOS|FxiOS|EdgiOS|OPiOS/.test(navigator.userAgent);
const isChromeIOS = isIOS && isNonSafariOniOS;

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
          'touch-action'?: string;
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
  const [arUnsupported, setArUnsupported] = useState(false);
  const viewerRef = useRef<HTMLElement & { canActivateAR?: boolean }>(null);

  const arAssets = VILLAGE_AR[slug ?? ''];
  const arUrl = `${window.location.origin}/villages/${slug}/ar`;
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  // model-viewer đã được load global trong index.html — chỉ cần đợi custom element đăng ký xong
  useEffect(() => {
    customElements.whenDefined('model-viewer').then(() => setScriptsLoaded(true));
  }, []);

  // Sau khi model load xong, kiểm tra thiết bị/trình duyệt có thực sự kích hoạt được AR không
  // (thiếu ARCore/WebXR/Quick Look) — nếu không thì báo rõ cho người dùng thay vì im lặng
  useEffect(() => {
    if (!scriptsLoaded || isChromeIOS) return;
    const viewer = viewerRef.current;
    if (!viewer) return;

    const onLoad = () => setArUnsupported(!viewer.canActivateAR);
    viewer.addEventListener('load', onLoad);
    return () => viewer.removeEventListener('load', onLoad);
  }, [scriptsLoaded]);

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
          ref={viewerRef}
          src={arAssets.model}
          alt={arAssets.label}
          ar={!isChromeIOS}
          ar-modes="webxr scene-viewer quick-look"
          ar-placement="floor"
          ar-scale="auto"
          camera-controls
          auto-rotate
          touch-action="none"
          style={{ width: '100%', height: '100%', backgroundColor: '#111' }}
        />
      )}

      {/* Chrome trên iOS không hỗ trợ AR (chỉ Safari mới chạy được Quick Look/WebXR) */}
      {scriptsLoaded && isChromeIOS && (
        <div className="absolute top-16 left-4 right-4 z-30 bg-[#2C1A0E]/95 border border-[#C9973A] rounded-xl p-4 text-center space-y-2">
          <AlertTriangle className="w-6 h-6 text-[#C9973A] mx-auto" />
          <p className="text-[#F5EDD6] text-sm font-semibold">AR không khả dụng trên Chrome iOS</p>
          <p className="text-[#9C8670] text-xs">
            Vui lòng mở trang này bằng <span className="text-[#C9973A] font-medium">Safari</span> để dùng AR
          </p>
        </div>
      )}

      {/* Thiết bị/trình duyệt không hỗ trợ AR thật (thiếu ARCore/WebXR/Quick Look) */}
      {scriptsLoaded && !isChromeIOS && arUnsupported && (
        <div className="absolute bottom-6 left-4 right-4 z-30 bg-[#2C1A0E]/95 border border-[#C9973A]/60 rounded-xl p-4 text-center">
          <p className="text-[#C9B99A] text-xs leading-relaxed">
            Trình duyệt này chưa hỗ trợ AR. Vui lòng dùng <span className="text-[#C9973A]">Safari trên iPhone</span> hoặc{' '}
            <span className="text-[#C9973A]">Chrome trên Android</span>.
          </p>
        </div>
      )}
    </div>
  );
}
