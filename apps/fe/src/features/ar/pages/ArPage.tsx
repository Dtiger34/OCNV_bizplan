import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, Smartphone, ChevronRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useProductHotspots, type Hotspot } from '../hooks/useProductHotspots';
// Swap với file .glb thật của từng sản phẩm khi có
const PLACEHOLDER_MODEL_URL =
  'https://modelviewer.dev/shared-assets/models/Astronaut.glb';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
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
  const lang = 'vi' as const;

  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const isMobile = window.innerWidth < 1024;
  const arUrl = `${window.location.origin}/ar/${id}`;

  const { data: hotspots = [] } = useProductHotspots(id ?? '');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = () => navigate(`/products/${id ?? ''}`);

  if (!isMobile) {
    return (
      <div className="min-h-screen bg-[#3A1A0A] text-[#F5EDD6] flex flex-col items-center justify-center p-6 text-center space-y-8">
        <Smartphone className="w-16 h-16 text-[#C9973A] animate-bounce" />
        <h1 className="text-3xl font-light tracking-widest uppercase">AR Trải Nghiệm Di Động</h1>
        <p className="text-sm max-w-md text-[#C9B99A] leading-relaxed">
          Để đặt thử mô hình 3D vào căn phòng của bạn, hãy quét mã QR bên dưới bằng điện thoại di động.
        </p>
        <div className="p-4 bg-white rounded-lg border-2 border-[#C9973A]">
          <QRCodeSVG value={arUrl} size={192} />
        </div>
        <p className="text-[10px] text-[#C9B99A] tracking-widest">{arUrl}</p>
        <button
          onClick={handleClose}
          className="px-6 py-2.5 bg-[#5C3D1E] hover:bg-[#7A5230] text-[#F5EDD6] text-[11px] font-bold tracking-wider uppercase rounded-sm cursor-pointer"
        >
          Quay Lại Chi Tiết Sản Phẩm
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/70 to-transparent">
        <span className="text-[11px] font-bold tracking-widest text-[#C9973A] uppercase">
          AR · Mô Hình 3D
        </span>
        <button
          onClick={handleClose}
          className="w-9 h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white"
        >
          <X size={18} />
        </button>
      </div>

      {/* model-viewer */}
      <model-viewer
        src={PLACEHOLDER_MODEL_URL}
        alt="Mô hình sản phẩm 3D"
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        style={{ width: '100%', height: '100%', background: '#1a0a00' }}
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
              border: '2px solid #F5EDD6',
              backgroundColor: '#C9973A',
              cursor: 'pointer',
            }}
          />
        ))}
      </model-viewer>

      {/* Hotspot info bubble */}
      {activeHotspot && (
        <div className="absolute bottom-24 left-4 right-4 z-20 bg-[#3A1A0A]/95 border border-[#C9973A] rounded-xl p-4 space-y-2 shadow-2xl">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[#F5EDD6] font-semibold text-sm leading-snug">
              {activeHotspot.title[lang]}
            </h3>
            <button
              onClick={() => setActiveHotspot(null)}
              className="shrink-0 w-6 h-6 flex items-center justify-center text-[#C9B99A] hover:text-[#F5EDD6]"
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
                      ? 'bg-[#C9973A] text-[#3A1A0A]'
                      : 'bg-[#5C3D1E] text-[#F5EDD6] hover:bg-[#7A5230]'
                  }`}
                >
                  {h.title[lang].slice(0, 12)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-6 pt-10 flex flex-col items-center gap-2 bg-gradient-to-t from-black/70 to-transparent">
        {hotspots.length > 0 && !activeHotspot && (
          <p className="text-[11px] text-[#C9B99A] tracking-wide flex items-center gap-1">
            <ChevronRight size={12} /> Chạm vào các điểm vàng để xem thông tin
          </p>
        )}
        <p className="text-[11px] text-[#C9B99A] tracking-wide text-center px-6">
          Nhấn nút AR phía dưới để đặt mô hình vào không gian thực tế
        </p>
        <button
          onClick={handleClose}
          className="px-6 py-2.5 bg-[#5C3D1E] hover:bg-[#7A5230] text-[#F5EDD6] text-[11px] font-bold tracking-wider uppercase rounded-sm"
        >
          Xem Chi Tiết Sản Phẩm
        </button>
      </div>
    </div>
  );
}
