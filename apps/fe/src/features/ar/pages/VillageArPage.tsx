import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { X, Smartphone, ScanLine, Info, Loader2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { VILLAGES } from '@/features/villages/data/villages-static';

// Map slug → assets
const VILLAGE_AR: Record<string, { model: string; marker: string; label: string; target: string }> = {
  'non-chuong': {
    model: '/models/lang-non.glb',
    marker: '/models/markers/lang-non',
    target: '/models/lang-non-target.jpg',
    label: 'Làng Nón Chuông',
  },
};

// AR.js + A-Frame được load qua CDN script trong index.html
// Khai báo để TypeScript không báo lỗi
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        embedded?: boolean | string;
        arjs?: string;
        renderer?: string;
        'vr-mode-ui'?: string;
        'loading-screen'?: string;
      }, HTMLElement>;
      'a-nft': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        type?: string;
        url?: string;
        smooth?: string;
        smoothCount?: string;
        smoothTolerance?: string;
        smoothThreshold?: string;
      }, HTMLElement>;
      'a-entity': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'gltf-model'?: string;
        scale?: string;
        rotation?: string;
        position?: string;
        animation?: string;
      }, HTMLElement>;
      'a-camera': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export default function VillageArPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [markerFound, setMarkerFound] = useState(false);
  const sceneRef = useRef<HTMLElement>(null);

  const village = VILLAGES.find((v) => v.slug === slug);
  const arAssets = VILLAGE_AR[slug ?? ''];
  const arUrl = `${window.location.origin}/villages/${slug}/ar`;
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  // Load AR.js + A-Frame scripts động — chỉ khi vào trang AR
  useEffect(() => {
    const existing = document.getElementById('aframe-script');
    if (existing) { setScriptsLoaded(true); return; }

    const aframe = document.createElement('script');
    aframe.id = 'aframe-script';
    aframe.src = 'https://cdn.jsdelivr.net/npm/aframe@1.5.0/dist/aframe.min.js';
    aframe.onload = () => {
      const arjs = document.createElement('script');
      arjs.id = 'arjs-script';
      arjs.src = 'https://cdn.jsdelivr.net/npm/@ar-js-org/ar.js@3.4.5/aframe/build/aframe-ar-nft.js';
      arjs.onload = () => setScriptsLoaded(true);
      document.head.appendChild(arjs);
    };
    document.head.appendChild(aframe);

    return () => {
      // Không remove script — tránh reload khi navigate back
    };
  }, []);

  // Lắng nghe event marker found/lost từ A-Frame
  useEffect(() => {
    if (!scriptsLoaded) return;
    const scene = sceneRef.current;
    if (!scene) return;

    const onFound = () => setMarkerFound(true);
    const onLost = () => setMarkerFound(false);

    scene.addEventListener('markerFound', onFound);
    scene.addEventListener('markerLost', onLost);
    return () => {
      scene.removeEventListener('markerFound', onFound);
      scene.removeEventListener('markerLost', onLost);
    };
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
            Quét mã QR bằng điện thoại, sau đó hướng camera vào mô hình diorama để xem mô hình 3D hiện ra.
          </p>
        </div>
        <div className="p-4 bg-white rounded-xl">
          <QRCodeSVG value={arUrl} size={200} />
        </div>
        <div className="border border-[#5C3D1E] rounded-xl p-4 max-w-xs text-left space-y-2">
          <p className="text-[10px] tracking-widest text-[#C9973A] uppercase mb-2">Ảnh cần quét</p>
          <img src={arAssets.target} alt="target" className="w-full rounded-lg" />
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

  // Mobile → AR.js scene
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <p className="text-[9px] tracking-[0.25em] text-[#C9973A] uppercase">AR · Image Tracking</p>
          <p className="text-white text-sm font-medium">{arAssets.label}</p>
        </div>
        <button
          onClick={() => navigate(`/villages/${slug}`)}
          className="pointer-events-auto w-9 h-9 bg-black/50 rounded-full flex items-center justify-center text-white"
        >
          <X size={18} />
        </button>
      </div>

      {/* Loading A-Frame */}
      {!scriptsLoaded && (
        <div className="absolute inset-0 z-40 bg-[#2C1A0E] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 text-[#C9973A] animate-spin" />
          <p className="text-[#9C8670] text-sm">Đang khởi động AR...</p>
        </div>
      )}

      {/* A-Frame AR scene */}
      {scriptsLoaded && (
        // @ts-ignore — a-scene là custom element của A-Frame
        <a-scene
          ref={sceneRef}
          embedded
          arjs="sourceType: webcam; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
          renderer="logarithmicDepthBuffer: true; precision: medium;"
          vr-mode-ui="enabled: false"
          loading-screen="enabled: false"
          style={{ width: '100vw', height: '100vh' }}
        >
          {/* NFT marker — nhận diện ảnh target */}
          {/* @ts-ignore */}
          <a-nft
            type="nft"
            url={arAssets.marker}
            smooth="true"
            smoothCount="10"
            smoothTolerance="0.01"
            smoothThreshold="5"
          >
            {/* Model 3D hiện đè lên marker */}
            {/* @ts-ignore */}
            <a-entity
              gltf-model={arAssets.model}
              scale="0.005 0.005 0.005"
              rotation="-90 0 0"
              position="0 0 0"
              animation="property: rotation; to: -90 360 0; loop: true; dur: 8000; easing: linear"
            />
          </a-nft>

          {/* @ts-ignore */}
          <a-camera />
        </a-scene>
      )}

      {/* Marker status indicator */}
      {scriptsLoaded && (
        <div className={`absolute top-16 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${
          markerFound
            ? 'bg-green-500/80 text-white'
            : 'bg-black/60 text-[#C9973A]'
        }`}>
          {markerFound ? '✓ Đã nhận diện' : 'Hướng vào diorama'}
        </div>
      )}

      {/* Hướng dẫn */}
      {showGuide && scriptsLoaded && (
        <div className="absolute bottom-6 left-4 right-4 z-30 bg-[#2C1A0E]/95 border border-[#C9973A]/60 rounded-xl p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Info size={14} className="text-[#C9973A] shrink-0" />
              <p className="text-[#F5EDD6] text-xs font-semibold">Cách dùng AR Image</p>
            </div>
            <button onClick={() => setShowGuide(false)} className="text-[#9C8670]">
              <X size={14} />
            </button>
          </div>
          <div className="flex items-start gap-3">
            <img
              src={arAssets.target}
              alt="target"
              className="w-16 h-12 object-cover rounded-lg border border-[#C9973A]/40 shrink-0"
            />
            <div className="space-y-1">
              <p className="text-[#C9B99A] text-[11px] leading-relaxed">
                Hướng camera vào mô hình diorama trông giống ảnh bên trái
              </p>
              <p className="text-[#C9B99A] text-[11px] leading-relaxed">
                Mô hình 3D sẽ tự động hiện ra khi nhận diện được
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
