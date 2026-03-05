import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, isAuthenticated: false }),

      updateProfile: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      toggleWishlist: (productId) =>
        set((state) => {
          if (!state.user) return state;
          const wishlist = state.user.wishlist.includes(productId)
            ? state.user.wishlist.filter((id) => id !== productId)
            : [...state.user.wishlist, productId];
          return { user: { ...state.user, wishlist } };
        }),

      isInWishlist: (productId) => {
        const { user } = get();
        return user?.wishlist.includes(productId) ?? false;
      },
    }),
    { name: 'eterna-auth' }
  )
);
