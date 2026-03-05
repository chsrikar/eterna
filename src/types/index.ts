// Product & Catalog Types
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: ProductCategory;
  addOns: AddOn[];
  stock: number;
  templateConfig?: TemplateConfig;
  rating: number;
  reviewCount: number;
  tags: string[];
  whatsInside: string[];
  featured: boolean;
  bestSeller: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProductCategory = 'wedding-memory-kit' | 'pre-wedding-journal' | 'couple-kit' | 'self-love-kit';

export interface AddOn {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface TemplateConfig {
  templates: Template[];
  colorThemes: ColorTheme[];
  packagingStyles: PackagingStyle[];
}

export interface Template {
  id: string;
  name: string;
  preview: string;
  category: ProductCategory;
}

export interface ColorTheme {
  id: string;
  name: string;
  colors: string[];
  preview: string;
}

export interface PackagingStyle {
  id: string;
  name: string;
  image: string;
  price: number;
}

// User Types
export interface User {
  uid: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  wishlist: string[];
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

// Cart Types
export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedAddOns: AddOn[];
  customization?: CustomizationData;
  totalPrice: number;
}

export interface CustomizationData {
  coupleName1?: string;
  coupleName2?: string;
  weddingDate?: string;
  colorTheme?: string;
  personalNote?: string;
  photos?: string[];
  template?: string;
  packagingStyle?: string;
}

// Order Types
export interface Order {
  orderId: string;
  uid: string;
  items: OrderItem[];
  customizationData?: CustomizationData;
  uploadedPhotos: string[];
  priceDetails: PriceDetails;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  razorpayId?: string;
  shippingAddress: Address;
  trackingNumber?: string;
  timeline: OrderTimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  addOns: AddOn[];
  customization?: CustomizationData;
}

export interface PriceDetails {
  subtotal: number;
  addOnsTotal: number;
  deliveryCharge: number;
  gst: number;
  discount: number;
  couponCode?: string;
  total: number;
}

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type OrderStatus = 'placed' | 'processing' | 'customizing' | 'packing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

// Kit Builder Types
export interface KitDraft {
  kitId: string;
  uid: string;
  currentStep: number;
  config: KitConfig;
  photos: string[];
  savedAt: string;
}

export interface KitConfig {
  kitType?: ProductCategory;
  template?: string;
  addOns: AddOn[];
  photos: string[];
  personalNote?: string;
  coupleName1?: string;
  coupleName2?: string;
  weddingDate?: string;
  colorTheme?: string;
  packagingStyle?: string;
  totalPrice: number;
}

// QR Memory Types
export interface QRMemory {
  memoryId: string;
  orderId: string;
  coupleName1?: string;
  coupleName2?: string;
  weddingDate?: string;
  photos: string[];
  videoUrl?: string;
  messages: MemoryMessage[];
  accessCode?: string;
  isPasswordProtected: boolean;
  createdAt: string;
}

export interface MemoryMessage {
  id: string;
  from: string;
  message: string;
  timestamp: string;
}

// Coupon Types
export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  validFrom: string;
  validTo: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Banner Types
export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  isActive: boolean;
  order: number;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  uid: string;
  userName: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  uid: string;
  title: string;
  message: string;
  type: 'order' | 'promo' | 'system';
  read: boolean;
  link?: string;
  createdAt: string;
}

// Filter & Sort Types
export interface ProductFilters {
  category?: ProductCategory;
  priceRange?: [number, number];
  tags?: string[];
  addOns?: string[];
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'best-selling';
  search?: string;
}

// Admin Analytics Types
export interface AdminKPIs {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  deliveredOrders: number;
  refundRequests: number;
  totalUsers: number;
  averageOrderValue: number;
}

export interface SalesData {
  date: string;
  orders: number;
  revenue: number;
}
