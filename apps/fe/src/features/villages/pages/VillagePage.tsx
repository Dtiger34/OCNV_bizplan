import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Quote, ArrowRight, CheckCircle2, ScanLine, Smartphone, Play, X, Box, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { getVillage } from '../data/villages-static';
import { VILLAGE_AR_MODELS } from '@/features/ar/data/village-ar-models';
import { VILLAGE_AR_POINTS } from '@/features/ar/data/village-ar-points';
import { useTranslation } from 'react-i18next';

const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

// Khai báo để TypeScript không báo lỗi với custom element của model-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          'camera-controls'?: boolean;
          'auto-rotate'?: boolean;
          'touch-action'?: string;
        },
        HTMLElement
      >;
    }
  }
}

export default function VillagePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const village = getVillage(slug ?? '');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [viewerReady, setViewerReady] = useState(false);
  const [showDesktopQr, setShowDesktopQr] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activePreviewPoint, setActivePreviewPoint] = useState<string | null>(null);
  const viewerRef = useRef<HTMLElement>(null);
  const arModel = VILLAGE_AR_MODELS[slug ?? ''];
  const arPoints = VILLAGE_AR_POINTS[slug ?? ''] ?? [];

  useEffect(() => {
    customElements.whenDefined('model-viewer').then(() => setViewerReady(true));
  }, []);

  // AR thật chạy qua 8th Wall ở trang riêng /villages/:slug/ar (world-tracking trong chính
  // trang web, không mở app rời như Quick Look/Scene Viewer — nhờ vậy có thể chèn UI point
  // tuỳ biến ngay trong lúc AR đang chạy, trên cả iOS lẫn Android).
  const handleViewAr = () => {
    if (!isMobile) {
      setShowDesktopQr(true);
      return;
    }
    navigate(`/villages/${slug}/ar`);
  };

  if (!village) {
    return (
      <div className="min-h-screen bg-parchment flex flex-col items-center justify-center gap-6 px-4">
        <p className="text-wood text-lg">{t('village_detail.not_found')}</p>
        <Link to="/villages" className="text-sm text-gold underline underline-offset-4">
          {t('village_detail.back_to_list')}
        </Link>
      </div>
    );
  }

  const introParagraphs = village.intro.split('\n\n').filter(Boolean);
  const historyParagraphs = village.historyText?.split('\n\n').filter(Boolean) ?? [];

  return (
    <div className="min-h-screen bg-parchment">
      {/* Fixed breadcrumb */}
      <Link
        to="/villages"
        className="fixed top-20 left-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-wood hover:text-ink backdrop-blur-md bg-parchment/80 border border-[#D4B896] shadow-sm transition-all hover:border-gold/60"
      >
        <ChevronLeft size={13} />
        {t('village_detail.village_label')}
      </Link>

      {/* Hero — nền be như phần dưới trang, khối video/model 3D bên phải dùng đỏ thương hiệu */}
      <section className="relative min-h-[80vh] overflow-hidden bg-parchment">
        <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-24 md:py-28 min-h-[80vh] flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <p
                className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3"
                style={{ color: village.color }}
              >
                {t('village_detail.traditional_village')}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-ink leading-tight mb-4">
                {village.name}
              </h1>
              <p className="text-base sm:text-lg italic text-wood mb-5">{village.tagline}</p>
              <div className="h-px w-16" style={{ backgroundColor: village.color + '80' }} />
            </motion.div>

            {/* Ô Video giới thiệu + Model 3D — khối nền đỏ thương hiệu, nằm cạnh hero */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="grid grid-cols-2 lg:grid-cols-1 gap-4 bg-ink rounded-xl p-4"
            >
              {/* Video giới thiệu — phát ngay trong ô, nút mở rộng riêng để phóng to giữa màn hình */}
              <div className="group relative rounded-lg overflow-hidden border border-white/20 bg-black aspect-video">
                {isVideoPlaying ? (
                  village.youtubeId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${village.youtubeId}?autoplay=1`}
                      title={`Video giới thiệu ${village.name}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : village.videoUrl ? (
                    <video
                      src={encodeURI(village.videoUrl)}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center px-4 text-center">
                      <p className="text-[#D4B896] text-xs sm:text-sm">
                        {t('village_detail.video_soon', { name: village.name })}
                      </p>
                    </div>
                  )
                ) : (
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute inset-0 cursor-pointer"
                  >
                    <img
                      src={village.coverImageUrl}
                      alt={`${t('village_detail.video_intro')} ${village.name}`}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-ink/30 flex flex-col items-center justify-center gap-2">
                      <div
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: village.color }}
                      >
                        <Play size={16} className="text-white ml-0.5" fill="white" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold tracking-wide text-white uppercase">
                        {t('village_detail.video_intro')}
                      </span>
                    </div>
                  </button>
                )}

                {isVideoPlaying && (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                    aria-label="Phóng to video"
                  >
                    <Maximize2 size={13} />
                  </button>
                )}
              </div>
              {village.videoSource && (
                <p className="text-[10px] text-[#D4B896]/70 col-start-1 -mt-2">
                  {t('village_detail.source')}: {village.videoSource}
                </p>
              )}

              {/* Model 3D — model-viewer thật ngay trong banner */}
              {arModel && (
                <div className="relative rounded-lg overflow-hidden border border-white/20 bg-black/40 backdrop-blur-sm aspect-video">
                  {!viewerReady && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  {viewerReady && (
                    // @ts-ignore — model-viewer là custom element
                    <model-viewer
                      ref={viewerRef}
                      src={arModel.model}
                      alt={arModel.label}
                      camera-controls
                      auto-rotate
                      touch-action="pan-y"
                      style={{ width: '100%', height: '100%' }}
                      onClick={(e: React.MouseEvent<HTMLElement>) => {
                        // Dev helper để lấy toạ độ 3D calibrate hotspot AR — giữ Alt rồi click lên
                        // model, tọa độ position/normal sẽ log ra console để copy vào
                        // village-ar-points.ts (xem VILLAGE_AR_POINTS).
                        if (!e.altKey) return;
                        const viewer = e.currentTarget as HTMLElement & {
                          positionAndNormalFromPoint?: (
                            x: number,
                            y: number
                          ) => { position: { x: number; y: number; z: number }; normal: { x: number; y: number; z: number } } | null;
                        };
                        const rect = viewer.getBoundingClientRect();
                        const hit = viewer.positionAndNormalFromPoint?.(e.clientX - rect.left, e.clientY - rect.top);
                        if (hit) {
                          console.log(
                            `[AR calibrate] slug=${slug}\nposition: { x: ${hit.position.x.toFixed(3)}, y: ${hit.position.y.toFixed(3)}, z: ${hit.position.z.toFixed(3)} },\nnormal: { x: ${hit.normal.x.toFixed(2)}, y: ${hit.normal.y.toFixed(2)}, z: ${hit.normal.z.toFixed(2)} },`
                          );
                        }
                      }}
                    >
                      {/* Hotspot preview — dùng đúng toạ độ AR (village-ar-points.ts), model-viewer
                          tự chiếu 3D->2D và ẩn hotspot bị khuất sau model (built-in occlusion) */}
                      {arPoints.map((point) => (
                        <button
                          key={point.id}
                          // @ts-ignore — slot/data-position/data-normal là API riêng của model-viewer
                          slot={`hotspot-${point.id}`}
                          data-position={`${point.position.x} ${point.position.y} ${point.position.z}`}
                          data-normal={point.normal ? `${point.normal.x} ${point.normal.y} ${point.normal.z}` : undefined}
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            setActivePreviewPoint((cur) => (cur === point.id ? null : point.id));
                          }}
                          className="w-4 h-4 -ml-2 -mt-2 rounded-full border-2 border-white shadow-lg animate-pulse cursor-pointer"
                          style={{ backgroundColor: village.color }}
                        />
                      ))}
                    </model-viewer>
                  )}
                  {activePreviewPoint && (() => {
                    const point = arPoints.find((p) => p.id === activePreviewPoint);
                    if (!point) return null;
                    return (
                      <div className="absolute inset-x-2 bottom-2 z-20 bg-white rounded-lg shadow-2xl p-2.5">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-[11px] font-semibold text-ink leading-tight">{point.title}</p>
                          <button
                            onClick={() => setActivePreviewPoint(null)}
                            className="text-[#ab2124] hover:text-ink shrink-0"
                          >
                            <X size={12} />
                          </button>
                        </div>
                        <p className="text-[10px] text-wood leading-snug line-clamp-3">{point.description}</p>
                      </div>
                    );
                  })()}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-ink/70 backdrop-blur-sm pointer-events-none">
                    <Box size={11} className="text-white" />
                    <span className="text-[9px] font-semibold tracking-wide text-white uppercase">
                      {t('village_detail.3d_model')}
                    </span>
                  </div>
                  <button
                    onClick={handleViewAr}
                    disabled={!viewerReady}
                    className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-white text-[10px] font-semibold uppercase tracking-wide shadow-lg disabled:opacity-50 transition-transform hover:scale-105"
                    style={{ backgroundColor: village.color }}
                  >
                    <ScanLine size={12} />
                    AR
                  </button>
                </div>
              )}
            </motion.div>

            {showDesktopQr && arModel && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-start-2 flex flex-col items-center gap-2 bg-white/95 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 text-xs text-ink">
                  <Smartphone size={14} className="text-gold" />
                  {t('village_detail.scan_ar')}
                </div>
                <QRCodeSVG value={`${window.location.origin}/villages/${slug}/ar`} size={140} />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Video modal — mở rộng cỡ lớn giữa màn hình */}
      {showVideo && (
        <div
          className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-6xl aspect-video bg-ink rounded-lg overflow-hidden flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {village.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${village.youtubeId}?autoplay=1`}
                title={`${t('village_detail.video_intro')} ${village.name}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : village.videoUrl ? (
              <video
                src={encodeURI(village.videoUrl)}
                controls
                autoPlay
                className="w-full h-full"
              />
            ) : (
              <p className="text-[#D4B896] text-base sm:text-lg px-6 text-center">
                {t('village_detail.video_soon', { name: village.name })}
              </p>
            )}
          </div>
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white"
            onClick={() => setShowVideo(false)}
          >
            <X size={28} />
          </button>
        </div>
      )}

      {/* Facts bar — nền kem đậm */}
      <section className="bg-[#EDE3CE] border-b border-[#D4B896]/60">
        <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {village.facts.map((fact) => (
            <div key={fact.label}>
              <p className="text-sm sm:text-base font-medium text-ink mb-0.5">{fact.value}</p>
              <p className="text-[10px] tracking-widest text-[#ab2124] uppercase">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 1. Giới thiệu chung — nền kem trắng */}
      <section className="py-16 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: village.color }}>
              {t('village_detail.intro_title_1')}
            </p>
            <h2 
              className="text-2xl sm:text-3xl font-light text-ink leading-snug text-title-gradient"
              dangerouslySetInnerHTML={{ __html: t('village_detail.intro_title_2') }}
            />
            <div className="h-px w-12 bg-[#D4B896] mt-4" />
          </motion.div>

          <div className="space-y-5">
            {introParagraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-wood leading-relaxed text-sm sm:text-base"
              >
                {i === 0 ? (
                  <>
                    <span
                      className="float-left text-5xl leading-none mr-2 mt-1 font-light"
                      style={{ color: village.color }}
                    >
                      {para[0]}
                    </span>
                    {para.slice(1)}
                  </>
                ) : (
                  para
                )}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Lịch sử hình thành và phát triển — nền kem đậm, tách khỏi Giới thiệu chung */}
      <section className="py-16 px-6 sm:px-10 bg-[#EDE3CE]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: village.color }}>
              {t('village_detail.history_title_1')}
            </p>
            <h2 
              className="text-2xl sm:text-3xl font-light text-ink leading-snug text-title-gradient"
              dangerouslySetInnerHTML={{ __html: t('village_detail.history_title_2') }}
            />
            <div className="h-px w-12 bg-[#D4B896] mt-4" />
          </motion.div>

          {village.historyMilestones ? (
            <div className="space-y-6">
              {village.historyMilestones.map((milestone, i) => (
                <motion.div
                  key={milestone.period}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-4 sm:gap-6"
                >
                  <div className="flex flex-col items-center shrink-0 pt-1">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: village.color }}
                    />
                    {i < village.historyMilestones!.length - 1 && (
                      <div className="w-px flex-1 mt-1.5" style={{ backgroundColor: village.color + '40' }} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="text-sm sm:text-base font-semibold text-ink mb-2">{milestone.period}</p>
                    <ul className="space-y-1.5">
                      {milestone.points.map((point, j) => (
                        <li key={j} className="text-sm text-wood leading-relaxed">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              {historyParagraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="text-wood leading-relaxed text-sm sm:text-base"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery — nền kem đậm */}
      {village.galleryImages.length > 0 && (
        <section className="py-12 px-6 sm:px-10 bg-[#EDE3CE] border-t border-[#D4B896]/60">
          <div className="max-w-5xl mx-auto">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#ab2124] mb-5 text-center">
              {t('village_detail.gallery')}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {village.galleryImages.map((img, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  onClick={() => setLightboxImg(img)}
                  className="relative overflow-hidden rounded-md aspect-video sm:aspect-square group cursor-pointer border border-[#D4B896]/60 hover:border-gold/50 transition-all"
                >
                  <img
                    src={img}
                    alt={`${village.name} ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-all duration-300" />
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Artisan quote — dark band */}
      {village.artisanQuote && (
        <section className="py-16 px-6 bg-ink">
          <div className="max-w-2xl mx-auto text-center">
            <Quote size={26} className="mx-auto mb-5 opacity-40" style={{ color: village.color }} />
            <blockquote className="text-lg sm:text-xl text-white font-light italic leading-relaxed mb-5">
              "{village.artisanQuote}"
            </blockquote>
            {village.artisanStory && (
              <p className="text-xs text-[#ab2124] leading-relaxed max-w-lg mx-auto">{village.artisanStory}</p>
            )}
          </div>
        </section>
      )}

      {/* Production stages — so le ảnh + nội dung */}
      <section className="py-16 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: village.color }}>
              {t('village_detail.process_title_1')}
            </p>
            <h2 
              className="text-2xl sm:text-3xl font-light text-ink leading-snug text-title-gradient"
              dangerouslySetInnerHTML={{ __html: t('village_detail.process_title_2') }}
            />
            <div className="h-px w-12 bg-[#D4B896] mt-4" />
          </div>

          <div className="space-y-12">
            {village.stages.map((stage, i) => {
              const isReverse = i % 2 === 1;
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55 }}
                  className={`flex flex-col md:flex-row gap-8 items-center ${isReverse ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Ảnh */}
                  <div className="w-full md:w-1/2 shrink-0">
                    <div className="relative overflow-hidden rounded-lg aspect-4/3">
                      <img
                        src={stage.imageUrl}
                        alt={stage.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Số thứ tự đè lên ảnh */}
                      <div
                        className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                        style={{ backgroundColor: village.color }}
                      >
                        {String(stage.order).padStart(2, '0')}
                      </div>
                    </div>
                  </div>

                  {/* Nội dung */}
                  <div className="w-full md:w-1/2 space-y-3">
                    <p
                      className="text-[13px] font-bold tracking-[0.2em] uppercase"
                      style={{ color: village.color }}
                    >
                      {t('village_detail.step', { order: stage.order })}
                    </p>
                    <h3 className="text-xl font-medium text-ink">{stage.title}</h3>
                    <div className="h-px w-8 bg-[#D4B896]" />
                    <p className="text-sm text-wood leading-relaxed">{stage.description}</p>
                    {stage.details && stage.details.length > 0 && (
                      <ul className="space-y-2 pt-1">
                        {stage.details.map((d, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-[#ab2124]">
                            <CheckCircle2
                              size={14}
                              className="shrink-0 mt-0.5"
                              style={{ color: village.color }}
                            />
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA — dark footer band */}
      <section className="py-14 px-4 bg-ink text-center">
        <p className="text-[10px] tracking-[0.25em] text-[#ab2124] uppercase mb-3">{t('village_detail.explore_more')}</p>
        <h2 
          className="text-2xl font-light text-white mb-6"
          dangerouslySetInnerHTML={{ __html: t('village_detail.explore_other') }}
        />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/villages"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gold/50 text-sm text-[#D4B896] hover:text-white hover:bg-gold/10 rounded-sm transition-all duration-200"
          >
            {t('village_detail.view_all')}
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-100 bg-black/85 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImg(null)}
        >
          <img
            src={lightboxImg}
            alt="Gallery"
            className="max-w-full max-h-[90vh] rounded-md object-contain shadow-2xl"
          />
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl leading-none"
            onClick={() => setLightboxImg(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
