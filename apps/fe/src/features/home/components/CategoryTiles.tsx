import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  count: string;
  image: string;
  description: string;
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
  return (
    <motion.div
      onClick={() => onSelectCategory?.(cat.name)}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`group relative overflow-hidden rounded-[4px] border border-[#D4B896]/60 hover:border-[#C9973A] cursor-pointer shadow-sm ${layoutClass}`}
    >
      {/* Background Image: Dimmed initially, brightens on hover */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.75] group-hover:brightness-[0.95]"
        style={{ 
          backgroundImage: `url('${cat.image}')`,
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/95 via-[#2C1A0E]/40 to-[#2C1A0E]/20 pointer-events-none" />

      {/* Content overlay */}
      <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center space-y-3 pointer-events-none select-none">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#C9973A] uppercase">
          {cat.count}
        </span>
        
        <h3 className="text-3xl font-bold text-[#F5EDD6] leading-tight group-hover:text-white transition-colors uppercase tracking-wider">
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
  const categories: Category[] = [
    {
      id: 'hop-lang-gom',
      name: 'Hộp Làng Gốm',
      count: '12 Mô Hình',
      image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80',
      description: 'Mô phỏng chân thực nghệ nhân xoay gốm trên bàn xoay thủ công và lò nung gạch cổ Bát Tràng.'
    },
    {
      id: 'hop-lang-lua',
      name: 'Hộp Làng Lụa',
      count: '8 Mô Hình',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      description: 'Lớp dệt cửi tơ tằm óng ả và các sấp lụa Vạn Phúc rực rỡ sắc màu được mô phỏng sinh động.'
    },
    {
      id: 'hop-lang-non',
      name: 'Hộp Làng Nón',
      count: '6 Mô Hình',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80',
      description: 'Tái hiện không gian phơi lá cọ non trắng muốt và quá trình nghệ nhân khâu nón Chuông tỉ mỉ.'
    },
    {
      id: 'hop-lang-huong',
      name: 'Hộp Làng Hương',
      count: '9 Mô Hình',
      image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=600&q=80',
      description: 'Tái hiện sân phơi hương Quảng Phú Cầu đỏ rực rỡ tựa như những đóa hoa khổng lồ nở rộ.'
    }
  ];

  // Staggered layout configurations
  const layoutStyles = [
    "col-span-1 md:col-span-2 h-[420px] md:h-[480px]",
    "col-span-1 h-[360px] md:h-[400px] md:translate-y-8",
    "col-span-1 h-[360px] md:h-[400px] md:-translate-y-4",
    "col-span-1 md:col-span-2 h-[320px] md:h-[360px] md:translate-y-4"
  ];

  return (
    <div className="space-y-10">
      {/* Category Tiles Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto reveal">
        <span className="text-[11px] font-bold tracking-[0.14em] text-[#7A5A1A] uppercase block">
          KHÔNG GIAN VĂN HÓA THU NHỎ
        </span>
        <h2 className="text-3xl md:text-[36px] font-bold text-[#2C1A0E] tracking-wide">
          Hộp Tiểu Cảnh Diorama Làng Nghề
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
