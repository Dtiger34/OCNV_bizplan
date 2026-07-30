import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Frosted Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#ab2124]/40 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Full-height frosted glass side panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.35 }}
            style={{ boxShadow: 'var(--shadow-large)' }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-[425px] bg-[#fff8e7]/90 backdrop-blur-md border-l border-[#D4B896]/60 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#D4B896]/30 px-6 py-5 bg-[#fff8e7]/60 backdrop-blur-sm">
              <h2 className="text-[24px] font-bold tracking-wider text-[#ab2124] text-title-gradient">
                GIỎ HÀNG THƯỞNG LÃM
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-[#ab2124] hover:text-[#7B1C2E] transition-colors p-1.5 rounded-full hover:bg-[#ab2124]/5 active:scale-95 cursor-pointer"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <span className="text-xl text-[#ab2124] italic">Trống không như lầu vắng</span>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-3 bg-[#ab2124] text-[#fff8e7] text-[11px] font-bold tracking-[0.1em] uppercase rounded-full hover:bg-[#ab2124] active:scale-[0.97] transition-all"
                  >
                    Tiếp tục thưởng lãm
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id}
                    className="flex gap-4 p-3 bg-[#fff8e7]/40 border-b border-[#D4B896]/30 relative group items-center"
                  >
                    {/* Rounded Product Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover border border-[#D4B896]/40 rounded-full flex-shrink-0"
                    />
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="pr-6">
                        <span className="text-[8px] font-bold tracking-widest text-[#ab2124] uppercase block">
                          {item.origin}
                        </span>
                        <h4 className="text-base font-bold text-[#ab2124] leading-tight mt-0.5">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-[#ab2124]">
                          {item.material}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2.5">
                        {/* Inline Stepper: flat inline +/- buttons */}
                        <div className="flex items-center border border-[#D4B896]/40 rounded-full bg-transparent p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[#ab2124] hover:bg-[#ab2124]/10 transition-colors"
                          >
                            <Minus size={12} strokeWidth={2} />
                          </button>
                          <span className="px-2.5 text-xs text-[#ab2124] min-w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[#ab2124] hover:bg-[#ab2124]/10 transition-colors"
                          >
                            <Plus size={12} strokeWidth={2} />
                          </button>
                        </div>

                        {/* Flat Price Display */}
                        <span className="text-base font-bold text-[#7B1C2E]">
                          {formatPrice(item.price * item.quantity)}
                          <span className="text-[10px] font-medium align-super ml-0.5">₫</span>
                        </span>
                      </div>
                    </div>

                    {/* Trash Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-3 right-2 text-[#ab2124] hover:text-[#7B1C2E] transition-colors p-1 cursor-pointer"
                    >
                      <Trash2 size={15} strokeWidth={1.5} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Sticky Pinned Checkout Bar */}
            {cartItems.length > 0 && (
              <div className="border-t border-[#D4B896]/40 bg-[#fff8e7]/90 backdrop-blur-sm p-6 space-y-4 sticky bottom-0">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-bold tracking-wider text-[#ab2124] uppercase">
                    TỔNG CỘNG
                  </span>
                  <span className="text-2xl font-bold text-[#7B1C2E]">
                    {formatPrice(total)}
                    <span className="text-[12px] font-semibold align-super ml-0.5">₫</span>
                  </span>
                </div>
                
                <p className="text-[12px] text-[#ab2124] italic text-center">
                  Đã bao gồm vận chuyển và bảo hiểm mô hình.
                </p>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    // Navigate to checkout directly instead of alert
                    window.location.href = '/checkout';
                  }}
                  className="w-full h-12 bg-[#7B1C2E] text-[#fff8e7] text-[12px] font-bold tracking-[0.1em] uppercase rounded-full hover:bg-[#9B2438] active:scale-[0.97] transition-all flex items-center justify-center cursor-pointer shadow-md"
                >
                  TIẾN HÀNH THANH TOÁN
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
