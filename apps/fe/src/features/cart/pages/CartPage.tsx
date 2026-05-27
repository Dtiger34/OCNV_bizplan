import React from 'react';
import { useCart } from '@/context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN');
  };

  return (
    <div className="container mx-auto px-6 md:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="border-b border-[#D4B896] pb-4 reveal">
        <h1 className="text-3xl md:text-4xl font-normal text-[#2C1A0E]">
          GIỎ HÀNG CỦA BẠN
        </h1>
        <p className="text-xs text-[#9C8670] mt-1">
          Xem lại thông tin và số lượng mô hình diorama trong giỏ hàng
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="h-[350px] border border-[#D4B896] rounded-[6px] bg-[#FDF6E3] flex flex-col items-center justify-center text-center p-8 space-y-4">
          <ShoppingBag size={48} className="text-[#9C8670] animate-pulse" />
          <span className="text-2xl text-[#9C8670] italic">
            Giỏ hàng của bạn đang trống
          </span>
          <p className="text-sm text-[#9C8670]">
            Hãy khám phá các mô hình tiểu cảnh làng nghề độc đáo của chúng tôi để chọn sản phẩm ưng ý.
          </p>
          <Link
            to="/shop"
            className="px-6 py-3 bg-[#5C3D1E] text-[#F5EDD6] text-[11px] font-bold tracking-wider uppercase rounded-sm hover:bg-[#7A5230] transition-colors"
          >
            ĐI TỚI CỬA HÀNG
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* List items */}
          <div className="lg:col-span-8 space-y-4 reveal-left">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 p-4 bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] relative group hover:border-[#C9973A] transition-all"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover border border-[#D4B896] rounded-sm self-center sm:self-auto"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-semibold tracking-wider text-[#7A5A1A] uppercase">
                        {item.origin}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#9C8670] hover:text-[#7B1C2E] transition-colors p-1"
                      >
                        <Trash2 size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#2C1A0E]">
                      {item.name}
                    </h3>
                    
                    <p className="text-xs text-[#9C8670]">
                      {item.material}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#D4B896] rounded-sm bg-[#F5EDD6]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-[#5C3D1E] hover:bg-[#5C3D1E]/5 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 text-sm text-[#2C1A0E]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-[#5C3D1E] hover:bg-[#5C3D1E]/5 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-xl font-medium text-[#7B1C2E]">
                      {(item.price * item.quantity).toLocaleString('vi-VN')}
                      <span className="text-[11px] font-medium align-super ml-0.5">₫</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between pt-2">
              <button
                onClick={clearCart}
                className="text-[10px] font-bold tracking-wider text-[#7B1C2E] hover:underline uppercase transition-all"
              >
                XÓA TẤT CẢ SẢN PHẨM
              </button>
              
              <Link
                to="/shop"
                className="text-[10px] font-bold tracking-wider text-[#5C3D1E] hover:underline uppercase transition-all"
              >
                TIẾP TỤC MUA SẮM
              </Link>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="lg:col-span-4 bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6 space-y-6 reveal-right">
            <h3 className="text-xl font-bold text-[#2C1A0E] border-b border-[#D4B896]/30 pb-3">
              THÔNG TIN THANH TOÁN
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-[#2C1A0E]">
                <span>Tạm tính:</span>
                <span>{formatPrice(total)} ₫</span>
              </div>
              <div className="flex justify-between text-[#2C1A0E]">
                <span>Phí vận chuyển:</span>
                <span className="text-[#3A6B4A]">Miễn phí</span>
              </div>
              <div className="h-[1px] bg-[#D4B896]/30" />
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-[#5C3D1E] uppercase">Tổng thanh toán:</span>
                <span className="text-2xl font-bold text-[#7B1C2E]">
                  {formatPrice(total)}
                  <span className="text-xs font-semibold align-super ml-0.5">₫</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full h-12 bg-[#7B1C2E] hover:bg-[#9B2438] text-[#F5EDD6] text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center active:scale-[0.97] transition-all cursor-pointer"
            >
              TIẾN HÀNH ĐẶT HÀNG
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
