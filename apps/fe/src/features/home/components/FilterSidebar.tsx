import { useState } from 'react';
import { ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterSidebarProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedMaterials: string[];
  setSelectedMaterials: (materials: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

export default function FilterSidebar({
  selectedCategories,
  setSelectedCategories,
  selectedMaterials,
  setSelectedMaterials,
  priceRange,
  setPriceRange,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    categories: true,
    materials: true,
    price: true,
  });

  const toggleSection = (section: 'categories' | 'materials' | 'price') => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const categories = ['Hộp Làng Gốm', 'Hộp Làng Lụa', 'Hộp Làng Nón', 'Hộp Làng Hương', 'Hộp Làng Tre Đan'];
  const materials = ['Mica acrylic', 'Gỗ MDF / Basswood', 'Đất sét Bát Tràng', 'Tơ lụa tự nhiên', 'Lá cọ tự nhiên', 'Nhang màu nhuộm'];

  const handleCategoryChange = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleMaterialChange = (mat: string) => {
    if (selectedMaterials.includes(mat)) {
      setSelectedMaterials(selectedMaterials.filter((item) => item !== mat));
    } else {
      setSelectedMaterials([...selectedMaterials, mat]);
    }
  };

  const formatPrice = (price: number) => {
    return (price / 1000000).toFixed(1) + 'M';
  };

  // Custom Toggle Switch Component
  const ToggleSwitch = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
    <button
      type="button"
      onClick={onToggle}
      className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-300 ${
        active ? 'bg-[#5C3D1E]' : 'bg-[#C9B99A]/50'
      }`}
    >
      <motion.div
        layout
        className="bg-[#F5EDD6] w-4 h-4 rounded-full shadow-sm"
        animate={{ x: active ? 16 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />
    </button>
  );

  return (
    <div className="w-full bg-transparent space-y-6">
      {/* Sidebar Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#D4B896]/40 text-[#2C1A0E]">
        <SlidersHorizontal size={18} strokeWidth={1.5} className="text-[#C9973A]" />
        <h3 className="text-[20px] font-bold tracking-wide">
          Bộ Lọc Tìm Kiếm
        </h3>
      </div>

      {/* Categories Accordion Section */}
      <div className="pb-4 border-b border-[#D4B896]/20">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between text-[11px] font-bold tracking-[0.12em] text-[#5C3D1E] uppercase pb-2 text-left cursor-pointer hover:text-[#C9973A] transition-colors"
        >
          DANH MỤC TRƯNG BÀY
          {openSections.categories ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
        
        <AnimatePresence initial={false}>
          {openSections.categories && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-3">
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center justify-between group">
                    <span className="text-sm text-[#2C1A0E] group-hover:text-[#7B1C2E] transition-colors">
                      {cat}
                    </span>
                    <ToggleSwitch
                      active={selectedCategories.includes(cat)}
                      onToggle={() => handleCategoryChange(cat)}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Materials Accordion Section */}
      <div className="pb-4 border-b border-[#D4B896]/20">
        <button
          onClick={() => toggleSection('materials')}
          className="w-full flex items-center justify-between text-[11px] font-bold tracking-[0.12em] text-[#5C3D1E] uppercase pb-2 text-left cursor-pointer hover:text-[#C9973A] transition-colors"
        >
          CHẤT LIỆU CHẾ TÁC
          {openSections.materials ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>

        <AnimatePresence initial={false}>
          {openSections.materials && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-3">
                {materials.map((mat) => (
                  <div key={mat} className="flex items-center justify-between group">
                    <span className="text-sm text-[#2C1A0E] group-hover:text-[#7B1C2E] transition-colors">
                      {mat}
                    </span>
                    <ToggleSwitch
                      active={selectedMaterials.includes(mat)}
                      onToggle={() => handleMaterialChange(mat)}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Slider Accordion Section */}
      <div className="pb-4 border-b border-[#D4B896]/20">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-[11px] font-bold tracking-[0.12em] text-[#5C3D1E] uppercase pb-2 text-left cursor-pointer hover:text-[#C9973A] transition-colors"
        >
          KHOẢNG NGÂN LƯỢNG
          {openSections.price ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>

        <AnimatePresence initial={false}>
          {openSections.price && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4">
                <input
                  type="range"
                  min="0"
                  max="50000000"
                  step="1000000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-[2px] bg-[#C9B99A]/40 rounded-lg appearance-none cursor-pointer accent-[#5C3D1E]"
                />
                <div className="flex justify-between items-baseline text-[11px] font-bold text-[#5C3D1E]">
                  <span>TỐI THIỂU: {formatPrice(priceRange[0])}</span>
                  <span className="text-[#7B1C2E]">TỐI ĐA: {formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reset Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          setSelectedCategories([]);
          setSelectedMaterials([]);
          setPriceRange([0, 50000000]);
        }}
        className="w-full h-10 border border-[#D4B896] text-[#5C3D1E] hover:bg-[#5C3D1E]/5 transition-all text-[10px] font-bold tracking-wider uppercase rounded-full cursor-pointer flex items-center justify-center"
      >
        THIẾT LẬP LẠI
      </motion.button>
    </div>
  );
}
