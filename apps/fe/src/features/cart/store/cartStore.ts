import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LocalCartItem { productId: string; quantity: number; name: string; price: number; imageUrl: string | null; stock: number; }
interface CartStore {
  items: LocalCartItem[];
  addItem: (item: LocalCartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotalCount: () => number;
}

export const useLocalCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existing = state.items.find(i => i.productId === item.productId);
        if (existing) {
          return { items: state.items.map(i => i.productId === item.productId ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.stock) } : i) };
        }
        return { items: [...state.items, item] };
      }),
      updateQuantity: (productId, quantity) => set((state) => ({
        items: quantity === 0 ? state.items.filter(i => i.productId !== productId) : state.items.map(i => i.productId === productId ? { ...i, quantity } : i)
      })),
      removeItem: (productId) => set((state) => ({ items: state.items.filter(i => i.productId !== productId) })),
      clearCart: () => set({ items: [] }),
      getTotalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'ocnv-cart' }
  )
);
