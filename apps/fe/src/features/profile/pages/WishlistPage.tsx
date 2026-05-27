import React, { useState } from 'react';
import { ProfileLayout } from './ProfilePage';
import { useCart } from '@/context/CartContext';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  material: string;
  origin: string;
}

export default function WishlistPage() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([
    {
      id: 'tieu-canh-van-phuc',
      name: 'Mô Hình Làng Lụa Vạn Phúc',
      price: 1450000,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
      material: 'Mica acrylic, Gỗ MDF, Tơ tằm',
      origin: 'Phân xưởng Nghề Xưa Nét Mới'
    },
    {
      id: 'tieu-canh-bat-trang',
      name: 'Mô Hình Làng Gốm Bát Tràng',
      price: 1250000,
      image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=400&q=80',
      material: 'Mica acrylic, Gỗ MDF, Đất sét',
      origin: 'Phân xưởng Nghề Xưa Nét Mới'
    }
  ]);

  const handleRemove = (id: string) => {
    setWishlist(wishlist.filter((w) => w.id !== id));
  };

  return (
    <ProfileLayout>
      <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6 space-y-6">
        <h3 className="text-2xl font-bold text-[#2C1A0E] border-b border-[#D4B896]/30 pb-3">
          DANH SÁCH SẢN PHẨM YÊU THÍCH
        </h3>

        {wishlist.length === 0 ? (
          <div className="h-[220px] flex flex-col items-center justify-center text-center p-8 space-y-4">
            <Heart size={32} className="text-[#9C8670] animate-pulse" />
            <span className="text-xl text-[#9C8670] italic">
              Chưa lưu sản phẩm nào
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] relative group hover:border-[#C9973A] transition-all"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover border border-[#D4B896] rounded-sm"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-[#7A5A1A] uppercase">
                      {item.origin}
                    </span>
                    <h4 className="text-base font-bold text-[#2C1A0E] leading-tight line-clamp-1">
                      {item.name}
                    </h4>
                    <span className="text-sm font-semibold text-[#7B1C2E] block">
                      {item.price.toLocaleString('vi-VN')} ₫
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#D4B896]/20">
                    <button
                      onClick={() => addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        material: item.material,
                        origin: item.origin
                      })}
                      className="flex items-center gap-1 text-[9px] font-bold text-[#5C3D1E] hover:text-[#7B1C2E] uppercase transition-colors"
                    >
                      <ShoppingCart size={12} />
                      Thêm vào giỏ
                    </button>
                    
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-[#9C8670] hover:text-[#7B1C2E] transition-colors p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProfileLayout>
  );
}
