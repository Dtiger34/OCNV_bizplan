import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden -mt-20">
      {/* Background image */}
      <img
        src="/image/herobanner.jpg"
        alt="Làng nghề Việt Nam"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay — heavier bottom-left to make text readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* Content — bottom-left aligned like the design */}
      <div className="absolute inset-0 flex flex-col justify-end pb-10 md:pb-20 px-4 md:px-10 lg:px-16 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight mb-4 md:mb-6"
        >
          Tinh hoa làng nghề,<br />trải nghiệm thực tế ảo.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-white/75 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8 max-w-xl"
        >
          Khám phá tinh hoa Bát Tràng, Vạn Phúc, Quảng Phú Cầu — tái hiện trong mô hình 3D kết hợp công nghệ AR sống động.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/shop')}
            className="px-6 md:px-8 py-2.5 md:py-3 bg-white text-black text-sm font-semibold tracking-wide rounded-full hover:bg-white/90 transition-colors cursor-pointer"
          >
            Khám phá ngay
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/villages')}
            className="px-6 md:px-8 py-2.5 md:py-3 bg-transparent text-white text-sm font-semibold tracking-wide rounded-full border border-white/60 hover:border-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            Câu chuyện làng nghề
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom-right attribution */}
      <p className="absolute bottom-6 right-8 text-white/40 text-xs tracking-wide">
        Nghề Xưa Nét Mới — Làng Nghề Việt Nam
      </p>
    </section>
  );
}
