import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import DashboardLayout from './components/layout/DashboardLayout';
import AdminLayout from './components/layout/AdminLayout';
import { SkeletonPage } from './components/ui/Skeleton';

// Public pages
const HomePage = lazy(() => import('./pages/public/HomePage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const ShopPage = lazy(() => import('./pages/public/ShopPage'));
const ProductDetailPage = lazy(() => import('./pages/public/ProductDetailPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const FAQPage = lazy(() => import('./pages/public/FAQPage'));
const BlogPage = lazy(() => import('./pages/public/BlogPage'));
const KitBuilderPage = lazy(() => import('./pages/public/KitBuilderPage'));
const CartPage = lazy(() => import('./pages/public/CartPage'));
const CheckoutPage = lazy(() => import('./pages/public/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('./pages/public/OrderSuccessPage'));
const WeddingKitsPage = lazy(() => import('./pages/public/WeddingKitsPage'));
const CoupleKitsPage = lazy(() => import('./pages/public/CoupleKitsPage'));
const SelfLoveKitsPage = lazy(() => import('./pages/public/SelfLoveKitsPage'));
const QRMemoryViewerPage = lazy(() => import('./pages/public/QRMemoryViewerPage'));

// Auth pages
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const SignupPage = lazy(() => import('./pages/auth/SignupPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));

// Dashboard pages
const DashboardHomePage = lazy(() => import('./pages/dashboard/DashboardHomePage'));
const OrdersPage = lazy(() => import('./pages/dashboard/OrdersPage'));
const WishlistPage = lazy(() => import('./pages/dashboard/WishlistPage'));
const SavedKitsPage = lazy(() => import('./pages/dashboard/SavedKitsPage'));
const PhotosPage = lazy(() => import('./pages/dashboard/PhotosPage'));
const SettingsPage = lazy(() => import('./pages/dashboard/SettingsPage'));

// Admin pages
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminProductsPage = lazy(() => import('./pages/admin/AdminProductsPage'));
const AdminOrdersPage = lazy(() => import('./pages/admin/AdminOrdersPage'));
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'));
const AdminCouponsPage = lazy(() => import('./pages/admin/AdminCouponsPage'));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SkeletonPage />}>{children}</Suspense>
);

const router = createBrowserRouter([
  // Public routes with main layout
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <SuspenseWrapper><HomePage /></SuspenseWrapper> },
      { path: 'about', element: <SuspenseWrapper><AboutPage /></SuspenseWrapper> },
      { path: 'shop', element: <SuspenseWrapper><ShopPage /></SuspenseWrapper> },
      { path: 'product/:id', element: <SuspenseWrapper><ProductDetailPage /></SuspenseWrapper> },
      { path: 'contact', element: <SuspenseWrapper><ContactPage /></SuspenseWrapper> },
      { path: 'faq', element: <SuspenseWrapper><FAQPage /></SuspenseWrapper> },
      { path: 'blog', element: <SuspenseWrapper><BlogPage /></SuspenseWrapper> },
      { path: 'kit-builder', element: <SuspenseWrapper><KitBuilderPage /></SuspenseWrapper> },
      { path: 'cart', element: <SuspenseWrapper><CartPage /></SuspenseWrapper> },
      { path: 'checkout', element: <SuspenseWrapper><CheckoutPage /></SuspenseWrapper> },
      { path: 'order-success', element: <SuspenseWrapper><OrderSuccessPage /></SuspenseWrapper> },
      { path: 'wedding-kits', element: <SuspenseWrapper><WeddingKitsPage /></SuspenseWrapper> },
      { path: 'couple-kits', element: <SuspenseWrapper><CoupleKitsPage /></SuspenseWrapper> },
      { path: 'self-love-kits', element: <SuspenseWrapper><SelfLoveKitsPage /></SuspenseWrapper> },
    ],
  },
  // QR Memory Viewer (standalone layout)
  {
    path: '/memory/:id',
    element: <SuspenseWrapper><QRMemoryViewerPage /></SuspenseWrapper>,
  },
  // Auth routes (no main layout)
  {
    path: '/login',
    element: <SuspenseWrapper><LoginPage /></SuspenseWrapper>,
  },
  {
    path: '/signup',
    element: <SuspenseWrapper><SignupPage /></SuspenseWrapper>,
  },
  {
    path: '/forgot-password',
    element: <SuspenseWrapper><ForgotPasswordPage /></SuspenseWrapper>,
  },
  // User dashboard
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <SuspenseWrapper><DashboardHomePage /></SuspenseWrapper> },
      { path: 'orders', element: <SuspenseWrapper><OrdersPage /></SuspenseWrapper> },
      { path: 'wishlist', element: <SuspenseWrapper><WishlistPage /></SuspenseWrapper> },
      { path: 'saved-kits', element: <SuspenseWrapper><SavedKitsPage /></SuspenseWrapper> },
      { path: 'photos', element: <SuspenseWrapper><PhotosPage /></SuspenseWrapper> },
      { path: 'settings', element: <SuspenseWrapper><SettingsPage /></SuspenseWrapper> },
    ],
  },
  // Admin login (standalone)
  {
    path: '/admin/login',
    element: <SuspenseWrapper><AdminLoginPage /></SuspenseWrapper>,
  },
  // Admin panel
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <SuspenseWrapper><AdminDashboardPage /></SuspenseWrapper> },
      { path: 'products', element: <SuspenseWrapper><AdminProductsPage /></SuspenseWrapper> },
      { path: 'orders', element: <SuspenseWrapper><AdminOrdersPage /></SuspenseWrapper> },
      { path: 'users', element: <SuspenseWrapper><AdminUsersPage /></SuspenseWrapper> },
      { path: 'coupons', element: <SuspenseWrapper><AdminCouponsPage /></SuspenseWrapper> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#2d2d2d',
            color: '#fefcf9',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#b7c9a8',
              secondary: '#fefcf9',
            },
          },
          error: {
            iconTheme: {
              primary: '#e8919c',
              secondary: '#fefcf9',
            },
          },
        }}
      />
    </>
  );
}
