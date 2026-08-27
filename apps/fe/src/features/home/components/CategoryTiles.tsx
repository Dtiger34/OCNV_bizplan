import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  imageFit?: 'cover' | 'contain';
}

interface CategoryTilesProps {
  onSelectCategory?: (categoryName: string) => void;
}

function CategoryCard({
  cat,
  layoutClass,
  onSelectCategory
}: {
  cat: Category;
  idx?: number;
  layoutClass: string;
  onSelectCategory?: (categoryName: string) => void;
}) {
  const fit = cat.imageFit ?? 'cover';
  return (
    <motion.div
      onClick={() => onSelectCategory?.(cat.name)}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`group relative overflow-hidden rounded-[4px] border border-[#D4B896]/60 hover:border-[#C9973A] cursor-pointer shadow-sm ${layoutClass}`}
    >
      {/* Background Image */}
      <motion.div
        className={`absolute inset-0 filter brightness-[0.75] group-hover:brightness-[0.95] ${fit === 'contain' ? 'bg-[#1a0a04] bg-contain bg-center bg-no-repeat' : 'bg-cover bg-center'}`}
        style={{ backgroundImage: `url('${cat.image}')` }}
        whileHover={{ scale: fit === 'cover' ? 1.05 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#ab2124]/95 via-[#ab2124]/40 to-[#ab2124]/20 pointer-events-none" />

      {/* Content overlay */}
      <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center space-y-3 pointer-events-none select-none">
        <h3 className="font-display text-3xl text-[#fff8e7] leading-tight group-hover:text-white transition-colors uppercase tracking-wider">
          {cat.name}
        </h3>
        
        {/* Underline animates on hover */}
        <div className="w-16 h-[1.5px] bg-[#C9973A] relative overflow-hidden">
          <span className="absolute left-0 top-0 h-full bg-white w-0 group-hover:w-full transition-all duration-500 ease-out" />
        </div>
        
        <p className="text-xs text-[#C9B99A]/95 max-w-md leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
          {cat.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function CategoryTiles({ onSelectCategory }: CategoryTilesProps) {
  const { t } = useTranslation();

  const categories: Category[] = [
    {
      id: 'hop-lang-gom',
      name: t('home.categories.items.gom.name'),
      image: '/image/lang-gom.jpg',
      description: t('home.categories.items.gom.desc')
    },
    {
      id: 'hop-lang-lua',
      name: t('home.categories.items.lua.name'),
      image: '/image/lang-lua.jpg',
      description: t('home.categories.items.lua.desc')
    },
    {
      id: 'hop-lang-non',
      name: t('home.categories.items.non.name'),
      image: '/image/lang-non.webp',
      description: t('home.categories.items.non.desc')
    },
    {
      id: 'hop-lang-huong',
      name: t('home.categories.items.huong.name'),
      image: '/image/lang-huong.webp',
      description: t('home.categories.items.huong.desc')
    },
    {
      id: 'hop-lang-quat',
      name: t('home.categories.items.quat.name'),
      image: '/image/lang-quat.jpg',
      description: t('home.categories.items.quat.desc')
    }
  ];

  // Layout fit với tỉ lệ ảnh thực tế:
  // Gốm 800x532 (3:2 ngang) — rộng 2 col, cao vừa
  // Lụa 1080x1440 (3:4 dọc) — 1 col, cao hơn
  // Nón 1200x809 (3:2 ngang) — 1 col, cao vừa
  // Hương 660x440 (3:2 ngang) — 2 col, cao vừa
  // Quạt 642x482 (4:3 ngang) — full 3 col, cao vừa
  const layoutStyles = [
    "col-span-1 md:col-span-2 h-[340px] md:h-[380px]",
    "col-span-1 h-[340px] md:h-[380px]",
    "col-span-1 h-[280px] md:h-[300px]",
    "col-span-1 md:col-span-2 h-[280px] md:h-[300px]",
    "col-span-1 md:col-span-3 h-[260px] md:h-[280px]"
  ];

  return (
    <div className="space-y-10">
      {/* Category Tiles Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto reveal">
        <span className="text-[13px] font-bold tracking-[0.14em] text-[#ab2124] uppercase block">
          {t('home.categories.subtitle')}
        </span>
        <h2 className="text-3xl md:text-[36px] font-bold text-[#ab2124] tracking-wide text-title-gradient">
          {t('home.categories.title')}
        </h2>
        <div className="w-12 h-[1px] bg-[#C9973A] mx-auto mt-2 reveal delay-75" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 pb-12">
        {categories.map((cat, idx) => (
          <CategoryCard
            key={cat.id}
            cat={cat}
            idx={idx}
            layoutClass={layoutStyles[idx]}
            onSelectCategory={onSelectCategory}
          />
        ))}
      </div>
    </div>
  );
}
