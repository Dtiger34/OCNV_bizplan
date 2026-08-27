import { ProfileLayout } from './ProfilePage';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';
import { useWishlist, useRemoveFromWishlist } from '../hooks/useWishlist';
import { useCart } from '@/context/CartContext';
import { useTranslation } from 'react-i18next';

const PLACEHOLDER = 'https://placehold.co/400x400?text=OCNV';

export default function WishlistPage() {
  const { addToCart } = useCart();
  const { data: items = [], isLoading } = useWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const { t } = useTranslation();

  return (
    <ProfileLayout>
      <div className="bg-[#fff8e7] border border-[#D4B896] rounded-[6px] p-6 space-y-6">
        <h3 className="text-2xl font-bold text-[#ab2124] border-b border-[#D4B896]/30 pb-3">
          {t('profile.wishlist.title')}
        </h3>

        {isLoading && (
          <div className="h-[220px] flex items-center justify-center text-[#ab2124] text-sm">{t('profile.wishlist.loading')}</div>
        )}

        {!isLoading && items.length === 0 && (
          <div className="h-[220px] flex flex-col items-center justify-center text-center p-8 space-y-4">
            <Heart size={32} className="text-[#ab2124] animate-pulse" />
            <span className="text-xl text-[#ab2124] italic">{t('profile.wishlist.empty')}</span>
          </div>
        )}

        {!isLoading && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div key={item._id}
                className="flex gap-4 p-3 bg-[#fff8e7] border border-[#D4B896] rounded-[6px] relative group hover:border-[#C9973A] transition-all">
                <img
                  src={item.mainImageUrl ?? PLACEHOLDER}
                  alt={item.name.vi}
                  className="w-20 h-20 object-cover border border-[#D4B896] rounded-sm"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-[#ab2124] uppercase">{item.village?.name?.vi ?? 'OCNV'}</span>
                    <h4 className="text-base font-bold text-[#ab2124] leading-tight line-clamp-1">{item.name.vi}</h4>
                    <span className="text-sm font-semibold text-[#7B1C2E] block">{item.price.toLocaleString('vi-VN')} ₫</span>
                  </div>

                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#D4B896]/20">
                    <button
                      onClick={() => addToCart({
                        id: item._id,
                        name: item.name.vi,
                        price: item.price,
                        image: item.mainImageUrl ?? PLACEHOLDER,
                        material: '',
                        origin: item.village?.name?.vi ?? 'OCNV',
                      })}
                      className="flex items-center gap-1 text-[9px] font-bold text-[#ab2124] hover:text-[#7B1C2E] uppercase transition-colors">
                      <ShoppingCart size={12} />
                      {t('profile.wishlist.add_cart')}
                    </button>
                    <button onClick={() => removeFromWishlist.mutate(item._id)}
                      className="text-[#ab2124] hover:text-[#7B1C2E] transition-colors p-1">
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
