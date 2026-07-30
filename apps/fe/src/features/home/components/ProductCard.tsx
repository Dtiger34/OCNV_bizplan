import { useCart } from '@/context/CartContext';
import { ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  material: string;
  origin: string;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock' | 'featured';
  badgeText: string;
  makerName?: string;
  makerProvince?: string;
  makerStory?: string;
}

interface ProductCardProps {
  product: Product;
  isFeatured?: boolean;
  onViewDetails?: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addToCart } = useCart();

  const getStockBadgeStyle = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'bg-[#3A6B4A]/10 text-[#3A6B4A] border-[#3A6B4A]/30';
      case 'low_stock':
        return 'bg-[#C9973A]/10 text-[#ab2124] border-[#C9973A]/30';
      case 'out_of_stock':
        return 'bg-[#7B1C2E]/10 text-[#7B1C2E] border-[#7B1C2E]/30';
      case 'featured':
      default:
        return 'bg-[#C9973A]/15 text-[#5C3A0A] border-[#C9973A]/30';
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN');
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="relative group bg-[#fff8e7] overflow-hidden flex flex-col h-[400px] hover:shadow-xl border-b-[2px] border-[#D4B896] hover:border-[#C9973A] rounded-[4px] cursor-pointer"
    >
      {/* Image container: fills top 60% */}
      <div className="relative w-full h-[60%] overflow-hidden bg-[#EDE3CE] rounded-t-[4px]">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500"
          whileHover={{ scale: 1.05 }}
        />
        
        {/* Soft elegant darkening overlay on hover */}
        <div className="absolute inset-0 bg-[#ab2124]/0 group-hover:bg-[#ab2124]/30 transition-all duration-300 flex items-center justify-center gap-3">
          {/* Add to Cart Icon Button Overlay (Hidden until hover) */}
          {product.stockStatus !== 'out_of_stock' && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  material: product.material,
                  origin: product.origin
                });
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 rounded-full bg-[#ab2124] text-[#fff8e7] hover:bg-[#ab2124] flex items-center justify-center shadow-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-3 group-hover:translate-y-0"
              title="Thêm vào giỏ"
            >
              <ShoppingCart size={16} />
            </motion.button>
          )}

          {/* View Details Icon Button Overlay */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.(product);
            }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-full bg-[#fff8e7] text-[#ab2124] hover:bg-[#fff8e7] flex items-center justify-center shadow-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-3 group-hover:translate-y-0 delay-75"
            title="Xem chi tiết"
          >
            <Eye size={16} />
          </motion.button>
        </div>
      </div>

      {/* Content: 40% */}
      <div className="p-4 flex-1 flex flex-col justify-between relative">
        <div className="space-y-1">
          {/* Overline Category */}
          <span className="text-[9px] font-bold tracking-[0.15em] text-[#ab2124] uppercase block pointer-events-none select-none">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 
            onClick={() => onViewDetails?.(product)}
            className="text-[18px] md:text-[20px] font-bold text-[#ab2124] hover:text-[#7B1C2E] cursor-pointer transition-colors leading-snug line-clamp-2"
          >
            {product.name}
          </h3>

          {/* Material & Provenance */}
          <p className="text-[11px] text-[#ab2124] italic pointer-events-none select-none">
            {product.material} — {product.origin}
          </p>
        </div>

        {/* Price + Stock Status */}
        <div className="flex items-center justify-between gap-2 pt-1 pointer-events-none select-none">
          <div className="flex items-baseline gap-2">
            {product.originalPrice ? (
              <>
                <span className="text-lg font-bold text-[#7B1C2E]">
                  {formatPrice(product.price)}
                  <span className="text-[11px] font-semibold align-super ml-0.5">₫</span>
                </span>
                <span className="text-xs line-through text-[#ab2124]">
                  {formatPrice(product.originalPrice)}
                  <span className="text-[9px] align-super ml-0.5">₫</span>
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-[#ab2124]">
                {formatPrice(product.price)}
                <span className="text-[11px] font-semibold align-super ml-0.5">₫</span>
              </span>
            )}
          </div>
          <span className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 border rounded-[2px] ${getStockBadgeStyle(product.stockStatus)}`}>
            {product.badgeText}
          </span>
        </div>

        {/* Minimal Classical Accent: Corner dot decoration */}
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-[#C9973A]/60 group-hover:bg-[#C9973A] transition-colors" />
      </div>
    </motion.div>
  );
}
