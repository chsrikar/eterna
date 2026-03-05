import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, AddOn, Product, CustomizationData, PriceDetails, Coupon } from '../types';

interface CartStore {
  items: CartItem[];
  coupon: Coupon | null;
  addItem: (product: Product, quantity?: number, addOns?: AddOn[], customization?: CustomizationData) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateAddOns: (productId: string, addOns: AddOn[]) => void;
  updateCustomization: (productId: string, customization: CustomizationData) => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  getItemCount: () => number;
  getPriceDetails: () => PriceDetails;
}

const calculateItemPrice = (item: CartItem): number => {
  const addOnsPrice = item.selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  return (item.product.price + addOnsPrice) * item.quantity;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,

      addItem: (product, quantity = 1, addOns = [], customization) => {
        set((state) => {
          const existingIndex = state.items.findIndex((i) => i.productId === product.id);
          if (existingIndex >= 0) {
            const updated = [...state.items];
            updated[existingIndex].quantity += quantity;
            updated[existingIndex].totalPrice = calculateItemPrice(updated[existingIndex]);
            return { items: updated };
          }
          const newItem: CartItem = {
            productId: product.id,
            product,
            quantity,
            selectedAddOns: addOns,
            customization,
            totalPrice: 0,
          };
          newItem.totalPrice = calculateItemPrice(newItem);
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => {
          const updated = state.items.map((i) => {
            if (i.productId === productId) {
              const item = { ...i, quantity: Math.max(1, quantity) };
              item.totalPrice = calculateItemPrice(item);
              return item;
            }
            return i;
          });
          return { items: updated };
        });
      },

      updateAddOns: (productId, addOns) => {
        set((state) => {
          const updated = state.items.map((i) => {
            if (i.productId === productId) {
              const item = { ...i, selectedAddOns: addOns };
              item.totalPrice = calculateItemPrice(item);
              return item;
            }
            return i;
          });
          return { items: updated };
        });
      },

      updateCustomization: (productId, customization) => {
        set((state) => ({
          items: state.items.map((i) => (i.productId === productId ? { ...i, customization } : i)),
        }));
      },

      applyCoupon: (coupon) => set({ coupon }),
      removeCoupon: () => set({ coupon: null }),
      clearCart: () => set({ items: [], coupon: null }),

      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      getPriceDetails: () => {
        const { items, coupon } = get();
        const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
        const addOnsTotal = items.reduce(
          (sum, i) => sum + i.selectedAddOns.reduce((a, ao) => a + ao.price, 0) * i.quantity,
          0
        );
        const deliveryCharge = subtotal > 1500 ? 0 : 99;
        const gst = Math.round((subtotal + addOnsTotal) * 0.18);
        let discount = 0;
        if (coupon && subtotal >= coupon.minOrderValue) {
          if (coupon.discountType === 'percentage') {
            discount = Math.round((subtotal * coupon.discountValue) / 100);
            if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
          } else {
            discount = coupon.discountValue;
          }
        }
        const total = subtotal + addOnsTotal + deliveryCharge + gst - discount;
        return {
          subtotal,
          addOnsTotal,
          deliveryCharge,
          gst,
          discount,
          couponCode: coupon?.code,
          total: Math.max(0, total),
        };
      },
    }),
    { name: 'eterna-cart' }
  )
);
