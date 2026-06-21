import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroBannerImg from '@/assets/herobanner.jpg';

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden">
      <img
        src={heroBannerImg}
        alt="Làng nghề Việt Nam"
        className="w-full h-auto block"
      />

      {/* Overlay gradient bottom-left để chữ đọc được */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

      {/* Chữ đè lên ảnh, căn góc dưới trái */}
      <div className="absolute inset-0 flex flex-col justify-end pb-10 md:pb-16 px-4 md:px-10 lg:px-16">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-3 md:mb-5 max-w-3xl drop-shadow-lg"
        >
          Tinh hoa làng nghề,<br />trải nghiệm thực tế ảo.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-white/85 text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-xl drop-shadow"
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
    </section>
  );
}
