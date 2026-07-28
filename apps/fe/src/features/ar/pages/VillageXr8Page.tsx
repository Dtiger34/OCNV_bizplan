import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { X, ScanLine, Loader2 } from 'lucide-react';
import * as THREE from 'three';
import type { Object3D, PerspectiveCamera } from 'three';
import { VILLAGE_AR_MODELS } from '../data/village-ar-models';
import { VILLAGE_AR_POINTS } from '../data/village-ar-points';
import { createVillageScenePipelineModule } from '../xr8/village-scene';
import { loadXr8Scripts } from '../xr8/load-xr8';

// Khai báo global cho các script 8th Wall load qua thẻ <script> trong index.html
declare global {
  interface Window {
    XR8?: {
      addCameraPipelineModules: (modules: unknown[]) => void;
      run: (opts: { canvas: HTMLCanvasElement }) => void;
      Threejs: {
        pipelineModule: () => unknown;
        xrScene: () => { scene: THREE.Scene; camera: PerspectiveCamera; renderer: THREE.WebGLRenderer };
      };
      XrController: {
        pipelineModule: () => unknown;
        updateCameraProjectionMatrix: (opts: { origin: THREE.Vector3; facing: THREE.Quaternion }) => void;
        recenter: () => void;
      };
      GlTextureRenderer: { pipelineModule: () => unknown };
    };
    XRExtras?: {
      FullWindowCanvas: { pipelineModule: () => unknown };
      Loading: { pipelineModule: () => unknown };
      RuntimeError: { pipelineModule: () => unknown };
    };
    LandingPage?: { pipelineModule: () => unknown };
    THREE?: typeof THREE;
  }
}

// XR8.Threejs.pipelineModule() đọc window.THREE như một biến global (đúng cách sample chính
// thức của 8th Wall làm trong app.js) — import ES module thôi không đủ, engine binary không
// nhìn thấy được.
window.THREE = THREE;

export default function VillageXr8Page() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [placed, setPlaced] = useState(false);
  const [activePointId, setActivePointId] = useState<string | null>(null);
  const [screenPoints, setScreenPoints] = useState<{ id: string; x: number; y: number }[]>([]);
  const modelRef = useRef<Object3D | null>(null);
  const rafRef = useRef<number>(0);

  const arAssets = VILLAGE_AR_MODELS[slug ?? ''];
  const arPoints = VILLAGE_AR_POINTS[slug ?? ''] ?? [];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!arAssets) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scenePipelineModule = createVillageScenePipelineModule({
      modelUrl: arAssets.model,
      onModelPlaced: (model: Object3D) => {
        modelRef.current = model;
        setPlaced(true);
      },
      onError: () => setLoading(false),
    });

    const startXr8 = () => {
      const XR8 = window.XR8;
      const XRExtras = window.XRExtras;
      if (!XR8 || !XRExtras) return;

      setLoading(false);
      XR8.addCameraPipelineModules([
        XR8.GlTextureRenderer.pipelineModule(),
        XR8.Threejs.pipelineModule(),
        XR8.XrController.pipelineModule(),
        window.LandingPage?.pipelineModule(),
        XRExtras.FullWindowCanvas.pipelineModule(),
        XRExtras.Loading.pipelineModule(),
        XRExtras.RuntimeError.pipelineModule(),
        scenePipelineModule,
      ].filter(Boolean));

      XR8.run({ canvas });
    };

    if (window.XR8) {
      startXr8();
    } else {
      window.addEventListener('xrloaded', startXr8);
      loadXr8Scripts().catch((err) => {
        console.error('[VillageAR] Lỗi tải 8th Wall:', err);
        setLoading(false);
      });
    }

    return () => {
      window.removeEventListener('xrloaded', startXr8);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arAssets?.model]);

  // Mỗi frame: chiếu toạ độ 3D của từng point (đã calibrate sẵn trong village-ar-points.ts,
  // dùng position tương đối so với tâm model) lên toạ độ 2D màn hình, để overlay HTML bám
  // đúng vị trí trên model dù model xoay/camera di chuyển.
  useEffect(() => {
    if (!placed || !window.XR8) return;

    const tick = () => {
      const model = modelRef.current;
      const XR8 = window.XR8;
      if (model && XR8) {
        const { camera } = XR8.Threejs.xrScene();
        const next = arPoints
          .map((p) => {
            const worldPos = new THREE.Vector3(p.position.x, p.position.y, p.position.z);
            model.localToWorld(worldPos);
            const projected = worldPos.clone().project(camera);
            return {
              id: p.id,
              x: (projected.x * 0.5 + 0.5) * 100,
              y: (-projected.y * 0.5 + 0.5) * 100,
              behindCamera: projected.z > 1,
            };
          })
          .filter((p) => !p.behindCamera);
        setScreenPoints(next);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [placed, arPoints]);

  if (!arAssets) {
    return (
      <div className="min-h-screen bg-ink flex flex-col items-center justify-center p-8 text-center gap-6">
        <ScanLine className="w-14 h-14 text-gold" />
        <h1 className="text-2xl font-light text-white">AR chưa khả dụng</h1>
        <Link
          to={`/villages/${slug}`}
          className="px-6 py-2.5 bg-gold text-ink text-xs font-bold tracking-widest uppercase rounded"
        >
          Quay Lại
        </Link>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <canvas ref={canvasRef} id="camerafeed" className="absolute inset-0 w-full h-full" />

      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <p className="text-[9px] tracking-[0.25em] text-gold uppercase">AR · Đặt Trong Phòng</p>
          <p className="text-white text-sm font-medium">{arAssets.label}</p>
        </div>
        <button
          onClick={() => navigate(`/villages/${slug}`)}
          className="pointer-events-auto w-9 h-9 bg-black/50 rounded-full flex items-center justify-center text-white"
        >
          <X size={18} />
        </button>
      </div>

      {loading && (
        <div className="absolute inset-0 z-40 bg-ink flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 text-gold animate-spin" />
          <p className="text-[#9C8670] text-sm">Đang khởi động AR...</p>
        </div>
      )}

      {!loading && !placed && (
        <div className="absolute bottom-10 left-4 right-4 z-30 text-center pointer-events-none">
          <p className="text-white text-sm bg-black/60 inline-block px-4 py-2 rounded-full">
            Chạm vào màn hình để đặt mô hình
          </p>
        </div>
      )}

      {placed &&
        screenPoints.map((sp) => (
          <button
            key={sp.id}
            onClick={() => setActivePointId((cur) => (cur === sp.id ? null : sp.id))}
            className="absolute z-40 w-8 h-8 -ml-4 -mt-4 rounded-full bg-gold border-2 border-white shadow-lg flex items-center justify-center animate-pulse"
            style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
          >
            <span className="w-2 h-2 rounded-full bg-white" />
          </button>
        ))}

      {placed &&
        screenPoints
          .filter((sp) => sp.id === activePointId)
          .map((sp) => {
            const point = arPoints.find((p) => p.id === sp.id);
            if (!point) return null;
            return (
              <div
                key={`bubble-${sp.id}`}
                className="absolute z-50 w-64 max-w-[80vw] bg-white rounded-xl shadow-2xl p-4"
                style={{
                  left: `${sp.x}%`,
                  top: `${sp.y}%`,
                  transform: `translate(-50%, ${sp.y > 50 ? 'calc(-100% - 1rem)' : '1rem'})`,
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="text-sm font-semibold text-ink">{point.title}</p>
                  <button onClick={() => setActivePointId(null)} className="text-[#9C8670] hover:text-ink shrink-0">
                    <X size={16} />
                  </button>
                </div>
                <p className="text-xs text-wood leading-relaxed">{point.description}</p>
              </div>
            );
          })}
    </div>
  );
}
