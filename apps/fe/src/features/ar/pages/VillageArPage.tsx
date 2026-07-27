import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { X, Smartphone, ScanLine, Loader2, AlertTriangle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { VILLAGE_AR_MODELS } from '../data/village-ar-models';
import { VILLAGE_AR_POINTS } from '../data/village-ar-points';

// Chrome/Firefox/Edge trên iOS đều dùng WebKit nhưng gắn CriOS/FxiOS/EdgiOS trong UA —
// AR (Quick Look/WebXR) trên iOS chỉ chạy được trong Safari thật
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isNonSafariOniOS = /CriOS|FxiOS|EdgiOS|OPiOS/.test(navigator.userAgent);
const isChromeIOS = isIOS && isNonSafariOniOS;
// Point cố định overlay chỉ vẽ được khi AR chạy qua WebXR (camera nằm trong chính trang web) —
// Scene Viewer (Android không hỗ trợ WebXR) và Quick Look (iOS) là app rời của hệ điều hành,
// trang web bị đẩy ra nền nên không có cách nào chèn UI lên trên
const isAndroid = /Android/i.test(navigator.userAgent);

// Khai báo để TypeScript không báo lỗi với custom element của model-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          'ios-src'?: string;
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
  const [isPresentingAr, setIsPresentingAr] = useState(false);
  const [activePointId, setActivePointId] = useState<string | null>(null);
  const viewerRef = useRef<HTMLElement & { canActivateAR?: boolean; activateAR?: () => Promise<void> }>(null);

  const arAssets = VILLAGE_AR_MODELS[slug ?? ''];
  const arPoints = VILLAGE_AR_POINTS[slug ?? ''] ?? [];
  const arUrl = `${window.location.origin}/villages/${slug}/ar`;
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  // model-viewer đã được load global trong index.html — chỉ cần đợi custom element đăng ký xong
  useEffect(() => {
    customElements.whenDefined('model-viewer').then(() => setScriptsLoaded(true));
  }, []);

  // Sau khi model load xong, kiểm tra thiết bị/trình duyệt có thực sự kích hoạt được AR không
  // (thiếu ARCore/WebXR/Quick Look) — nếu không thì báo rõ cho người dùng thay vì im lặng.
  // Trên Android tự bật camera AR ngay (WebXR overlay đè lên được nên không cần xem trước).
  // Trên iOS thì KHÔNG tự bật — Quick Look mở app rời, đẩy trang web ra nền nên mất khả năng
  // hiện point-tap-info; để người dùng xem model + chạm point trước ở chế độ inline, rồi tự bấm
  // nút AR khi muốn đặt mô hình vào không gian thực (nút mặc định của model-viewer vẫn hiện).
  // Lưu ý: trình duyệt có thể chặn nếu "user activation" từ lúc quét QR/mở link đã hết hạn
  // trước khi model tải xong — khi đó nút AR mặc định của model-viewer vẫn còn để bấm tay.
  useEffect(() => {
    if (!scriptsLoaded || isChromeIOS) return;
    const viewer = viewerRef.current;
    if (!viewer) return;

    const onLoad = () => {
      const supported = !!viewer.canActivateAR;
      setArUnsupported(!supported);
      if (supported && isAndroid) {
        viewer.activateAR?.().catch(() => {
          // Trình duyệt chặn auto-activate (mất user activation) — người dùng tự bấm nút AR
        });
      }
    };
    viewer.addEventListener('load', onLoad);
    return () => viewer.removeEventListener('load', onLoad);
  }, [scriptsLoaded]);

  // Theo dõi trạng thái phiên AR — chỉ khi 'session-started' (WebXR, camera chạy ngay trong
  // trang) thì overlay 2D của mình mới thực sự hiển thị đè lên được. Scene Viewer/Quick Look
  // mở app rời nên trang web (và overlay) bị đẩy ra nền, sự kiện này sẽ không báo 'session-started'.
  useEffect(() => {
    if (!scriptsLoaded) return;
    const viewer = viewerRef.current;
    if (!viewer) return;

    const onArStatus = (e: Event) => {
      const status = (e as CustomEvent<{ status: string }>).detail?.status;
      setIsPresentingAr(status === 'session-started');
      if (status !== 'session-started') setActivePointId(null);
    };
    viewer.addEventListener('ar-status', onArStatus);
    return () => viewer.removeEventListener('ar-status', onArStatus);
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
          className="px-6 py-2.5 bg-gold text-ink text-xs font-bold tracking-widest uppercase rounded"
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
          ios-src={arAssets.usdz}
          alt={arAssets.label}
          ar={!isChromeIOS}
          ar-modes="webxr scene-viewer quick-look"
          ar-placement="floor"
          ar-scale="auto"
          camera-controls
          auto-rotate
          touch-action="none"
          style={{ width: '100%', height: '100%', backgroundColor: '#111' }}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            // Dev helper để lấy toạ độ 3D calibrate point: bấm giữ Alt lên model rồi xem console.
            if (!import.meta.env.DEV || !e.altKey) return;
            const viewer = e.currentTarget as HTMLElement & {
              positionAndNormalFromPoint?: (x: number, y: number) => { position: { x: number; y: number; z: number }; normal: { x: number; y: number; z: number } } | null;
            };
            const rect = viewer.getBoundingClientRect();
            const hit = viewer.positionAndNormalFromPoint?.(e.clientX - rect.left, e.clientY - rect.top);
            if (hit) console.log('[AR calibrate] position:', hit.position, 'normal:', hit.normal);
          }}
        >
          {!isPresentingAr && arPoints.map((point) =>
            point.position && point.normal ? (
              <button
                key={`hotspot-${point.id}`}
                slot={`hotspot-${point.id}`}
                data-position={`${point.position.x}m ${point.position.y}m ${point.position.z}m`}
                data-normal={`${point.normal.x} ${point.normal.y} ${point.normal.z}`}
                onClick={(evt) => {
                  evt.stopPropagation();
                  setActivePointId((cur) => (cur === point.id ? null : point.id));
                }}
                aria-label={point.title}
                style={{
                  display: 'block',
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  border: '2px solid #F5EDD6',
                  backgroundColor: '#C9973A',
                  boxShadow: '0 0 0 4px rgba(201,151,58,0.3)',
                  cursor: 'pointer',
                }}
              />
            ) : null
          )}
        </model-viewer>
      )}

      {/* Xem trước inline (mọi nền tảng, bao gồm iOS) — chạm point trước khi vào AR thật,
          vì Quick Look mở app rời nên không overlay được DOM lên trên khi đang trong AR. */}
      {scriptsLoaded && !isPresentingAr && activePointId && (
        (() => {
          const point = arPoints.find((p) => p.id === activePointId);
          if (!point) return null;
          return (
            <div className="absolute bottom-24 left-4 right-4 z-30 bg-[#2C1A0E]/95 border border-[#C9973A] rounded-xl p-4 shadow-2xl">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <p className="text-sm font-semibold text-[#F5EDD6]">{point.title}</p>
                <button onClick={() => setActivePointId(null)} className="text-[#9C8670] hover:text-white shrink-0" aria-label="Đóng">
                  <X size={16} />
                </button>
              </div>
              <p className="text-xs text-[#C9B99A] leading-relaxed">{point.description}</p>
            </div>
          );
        })()
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

      {/* Point cố định + bong bóng chat — chỉ vẽ được khi camera AR chạy qua WebXR
          (Android), vì đó là lúc trang web vẫn hiển thị dưới lớp camera. Scene Viewer/Quick Look
          mở app rời của hệ điều hành nên không có cách nào chèn overlay lên trên. */}
      {isAndroid && isPresentingAr && arPoints.length > 0 && (
        <>
          {arPoints.map((point) => (
            <button
              key={point.id}
              onClick={() => setActivePointId((cur) => (cur === point.id ? null : point.id))}
              className="absolute z-40 w-8 h-8 -ml-4 -mt-4 rounded-full bg-gold border-2 border-white shadow-lg flex items-center justify-center animate-pulse"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              aria-label={point.title}
            >
              <span className="w-2 h-2 rounded-full bg-white" />
            </button>
          ))}

          {arPoints.map((point) =>
            activePointId === point.id ? (
              <div
                key={`bubble-${point.id}`}
                className="absolute z-50 w-64 max-w-[80vw] bg-white rounded-xl shadow-2xl p-4"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  transform: `translate(-50%, ${point.y > 50 ? 'calc(-100% - 1rem)' : '1rem'})`,
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="text-sm font-semibold text-ink">{point.title}</p>
                  <button
                    onClick={() => setActivePointId(null)}
                    className="text-[#9C8670] hover:text-ink shrink-0"
                    aria-label="Đóng"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="text-xs text-wood leading-relaxed">{point.description}</p>
              </div>
            ) : null
          )}
        </>
      )}
    </div>
  );
}
