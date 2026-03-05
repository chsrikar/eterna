import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { KitConfig, ProductCategory, AddOn } from '../types';

interface KitBuilderStore {
  currentStep: number;
  config: KitConfig;
  isDirty: boolean;
  draftId: string | null;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setKitType: (type: ProductCategory) => void;
  setTemplate: (templateId: string) => void;
  toggleAddOn: (addOn: AddOn) => void;
  setPhotos: (photos: string[]) => void;
  addPhoto: (photo: string) => void;
  removePhoto: (index: number) => void;
  setPersonalNote: (note: string) => void;
  setCoupleNames: (name1: string, name2: string) => void;
  setWeddingDate: (date: string) => void;
  setColorTheme: (themeId: string) => void;
  setPackagingStyle: (styleId: string) => void;
  calculatePrice: () => number;
  reset: () => void;
  saveDraft: () => void;
  loadDraft: (config: KitConfig, draftId: string) => void;
}

const initialConfig: KitConfig = {
  kitType: undefined,
  template: undefined,
  addOns: [],
  photos: [],
  personalNote: '',
  coupleName1: '',
  coupleName2: '',
  weddingDate: '',
  colorTheme: '',
  packagingStyle: '',
  totalPrice: 0,
};

const BASE_PRICES: Record<ProductCategory, number> = {
  'wedding-memory-kit': 2499,
  'pre-wedding-journal': 1299,
  'couple-kit': 1799,
  'self-love-kit': 999,
};

export const useKitBuilderStore = create<KitBuilderStore>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      config: { ...initialConfig },
      isDirty: false,
      draftId: null,

      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 7) })),
      prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 0) })),

      setKitType: (type) =>
        set((s) => ({ config: { ...s.config, kitType: type, totalPrice: BASE_PRICES[type] }, isDirty: true })),

      setTemplate: (templateId) =>
        set((s) => ({ config: { ...s.config, template: templateId }, isDirty: true })),

      toggleAddOn: (addOn) =>
        set((s) => {
          const exists = s.config.addOns.find((a) => a.id === addOn.id);
          const addOns = exists ? s.config.addOns.filter((a) => a.id !== addOn.id) : [...s.config.addOns, addOn];
          return { config: { ...s.config, addOns }, isDirty: true };
        }),

      setPhotos: (photos) =>
        set((s) => ({ config: { ...s.config, photos: photos.slice(0, 20) }, isDirty: true })),

      addPhoto: (photo) =>
        set((s) => {
          if (s.config.photos.length >= 20) return s;
          return { config: { ...s.config, photos: [...s.config.photos, photo] }, isDirty: true };
        }),

      removePhoto: (index) =>
        set((s) => ({
          config: { ...s.config, photos: s.config.photos.filter((_, i) => i !== index) },
          isDirty: true,
        })),

      setPersonalNote: (note) =>
        set((s) => ({ config: { ...s.config, personalNote: note }, isDirty: true })),

      setCoupleNames: (name1, name2) =>
        set((s) => ({ config: { ...s.config, coupleName1: name1, coupleName2: name2 }, isDirty: true })),

      setWeddingDate: (date) =>
        set((s) => ({ config: { ...s.config, weddingDate: date }, isDirty: true })),

      setColorTheme: (themeId) =>
        set((s) => ({ config: { ...s.config, colorTheme: themeId }, isDirty: true })),

      setPackagingStyle: (styleId) =>
        set((s) => ({ config: { ...s.config, packagingStyle: styleId }, isDirty: true })),

      calculatePrice: () => {
        const { config } = get();
        const base = config.kitType ? BASE_PRICES[config.kitType] : 0;
        const addOnsPrice = config.addOns.reduce((sum, a) => sum + a.price, 0);
        return base + addOnsPrice;
      },

      reset: () => set({ currentStep: 0, config: { ...initialConfig }, isDirty: false, draftId: null }),

      saveDraft: () => set({ isDirty: false }),

      loadDraft: (config, draftId) => set({ config, draftId, isDirty: false, currentStep: 0 }),
    }),
    { name: 'eterna-kit-builder' }
  )
);
