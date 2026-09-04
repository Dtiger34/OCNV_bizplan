import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, Smartphone, ChevronRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from 'react-i18next';
import { useProductHotspots, type Hotspot } from '../hooks/useProductHotspots';
import { useProduct } from '../../products/hooks/useProducts';

// Swap với file .glb thật của từng sản phẩm khi có
const PLACEHOLDER_MODEL_URL =
  'https://modelviewer.dev/shared-assets/models/Astronaut.glb';

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
          'camera-controls'?: boolean;
          'auto-rotate'?: boolean;
          style?: React.CSSProperties;
        },
        HTMLElement
      >;
    }
  }
}

function toDataPosition(p: Hotspot['position']) {
  return `${p.x}m ${p.y}m ${p.z}m`;
}

function toDataNormal(n: Hotspot['normal']) {
  return `${n.x} ${n.y} ${n.z}`;
}

export default function ArPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'en' ? 'en' : 'vi') as 'en' | 'vi';

  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const isMobile = window.innerWidth < 1024;
  const arUrl = `${window.location.origin}/ar/${id}`;

  const { data: hotspots = [] } = useProductHotspots(id ?? '');
  const { data: product } = useProduct(id ?? '');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = () => navigate(`/products/${id ?? ''}`);

  if (!isMobile) {
    return (
      <div className="min-h-screen bg-[#ab2124] text-[#fff8e7] flex flex-col items-center justify-center p-6 text-center space-y-8">
        <Smartphone className="w-16 h-16 text-[#C9973A] animate-bounce" />
        <h1 className="text-3xl font-light tracking-widest uppercase">{t('ar.title')}</h1>
        <p className="text-sm max-w-md text-[#C9B99A] leading-relaxed">
          {t('ar.desc')}
        </p>
        <div className="p-4 bg-white rounded-lg border-2 border-[#C9973A]">
          <QRCodeSVG value={arUrl} size={192} />
        </div>
        <p className="text-[10px] text-[#C9B99A] tracking-widest">{arUrl}</p>
        <button
          onClick={handleClose}
          className="px-6 py-2.5 bg-[#ab2124] hover:bg-[#ab2124] text-[#fff8e7] text-[11px] font-bold tracking-wider uppercase rounded-sm cursor-pointer"
        >
          {t('ar.back_product')}
        </button>
      </div>
    );
  }

  const modelSrc = product?.glbUrl || PLACEHOLDER_MODEL_URL;
  const iosSrc = product?.usdzUrl || undefined;

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
        <span className="text-[11px] font-bold tracking-widest text-[#C9973A] uppercase">
          {t('ar.ar_model')}
        </span>
        <button
          onClick={handleClose}
          className="pointer-events-auto w-9 h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white"
        >
          <X size={18} />
        </button>
      </div>

      {/* model-viewer — fills screen, camera-controls handles pinch/rotate */}
      <model-viewer
        src={modelSrc}
        ios-src={iosSrc}
        alt={product?.name?.[lang] || t('ar.ar_model')}
        ar
        ar-modes="scene-viewer webxr quick-look"
        ar-placement="floor"
        ar-scale="fixed"
        camera-controls
        style={{ width: '100%', height: '100%', backgroundColor: '#111' }}
      >
        {hotspots.map((hotspot) => (
          <button
            key={hotspot._id}
            slot={hotspot.slotName}
            data-position={toDataPosition(hotspot.position)}
            data-normal={toDataNormal(hotspot.normal)}
            onClick={() => setActiveHotspot((prev) => prev?._id === hotspot._id ? null : hotspot)}
            style={{
              display: 'block',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: '2px solid #fff8e7',
              backgroundColor: '#C9973A',
              cursor: 'pointer',
            }}
          />
        ))}

        {/* Custom AR button — slot="ar-button" được model-viewer đặt đúng vị trí, không bị overlay che */}
        <button
          slot="ar-button"
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '12px 28px',
            background: '#C9973A',
            color: '#ab2124',
            fontWeight: 700,
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {t('ar.view_ar')}
        </button>
      </model-viewer>

      {/* Hotspot info bubble */}
      {activeHotspot && (
        <div className="absolute bottom-24 left-4 right-4 z-20 bg-[#ab2124]/95 border border-[#C9973A] rounded-xl p-4 space-y-2 shadow-2xl pointer-events-auto">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[#fff8e7] font-semibold text-sm leading-snug">
              {activeHotspot.title[lang]}
            </h3>
            <button
              onClick={() => setActiveHotspot(null)}
              className="shrink-0 w-6 h-6 flex items-center justify-center text-[#C9B99A] hover:text-[#fff8e7]"
            >
              <X size={14} />
            </button>
          </div>

          {activeHotspot.imageUrl && (
            <img
              src={activeHotspot.imageUrl}
              alt={activeHotspot.title[lang]}
              className="w-full h-32 object-cover rounded-lg"
            />
          )}

          {activeHotspot.content?.[lang] && (
            <p className="text-[#C9B99A] text-xs leading-relaxed">
              {activeHotspot.content[lang]}
            </p>
          )}

          {hotspots.length > 1 && (
            <div className="flex gap-1.5 pt-1">
              {hotspots.map((h) => (
                <button
                  key={h._id}
                  onClick={() => setActiveHotspot(h)}
                  className={`flex-1 py-1 rounded text-[10px] font-semibold tracking-wide transition-colors ${
                    h._id === activeHotspot._id
                      ? 'bg-[#C9973A] text-[#ab2124]'
                      : 'bg-[#ab2124] text-[#fff8e7] hover:bg-[#ab2124]'
                  }`}
                >
                  {h.title[lang].slice(0, 12)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom bar — chỉ giữ nút quay lại, không che vùng AR button */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-4 flex flex-col items-center gap-2 pointer-events-none">
        {hotspots.length > 0 && !activeHotspot && (
          <p className="text-[11px] text-[#C9B99A] tracking-wide flex items-center gap-1 drop-shadow">
            <ChevronRight size={12} /> {t('ar.tap_points')}
          </p>
        )}
        <button
          onClick={handleClose}
          className="pointer-events-auto px-5 py-2 bg-black/50 text-[#fff8e7] text-[11px] font-bold tracking-wider uppercase rounded-sm border border-white/20"
        >
          {t('ar.back')}
        </button>
      </div>
    </div>
  );
}
