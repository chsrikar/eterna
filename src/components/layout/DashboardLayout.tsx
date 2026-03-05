import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  HiOutlineShoppingBag,
  HiOutlineCog,
  HiOutlineHeart,
  HiOutlinePhotograph,
  HiOutlineBell,
  HiOutlineHome,
  HiOutlineLogout,
  HiOutlineCollection,
} from 'react-icons/hi';

const sideLinks = [
  { label: 'Dashboard', path: '/dashboard', icon: HiOutlineHome },
  { label: 'My Orders', path: '/dashboard/orders', icon: HiOutlineShoppingBag },
  { label: 'Saved Kits', path: '/dashboard/saved-kits', icon: HiOutlineCollection },
  { label: 'Wishlist', path: '/dashboard/wishlist', icon: HiOutlineHeart },
  { label: 'My Photos', path: '/dashboard/photos', icon: HiOutlinePhotograph },
  { label: 'Notifications', path: '/dashboard/notifications', icon: HiOutlineBell },
  { label: 'Settings', path: '/dashboard/settings', icon: HiOutlineCog },
];

export default function DashboardLayout() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-cream/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-cream-dark/20 p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <h4 className="font-serif text-lg text-soft-black">{user?.name || 'User'}</h4>
                <p className="text-muted text-sm">{user?.email}</p>
              </div>

              <nav className="space-y-1">
                {sideLinks.map(({ label, path, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all no-underline ${
                      location.pathname === path
                        ? 'bg-gold/10 text-gold-dark'
                        : 'text-soft-black/60 hover:bg-gold/5 hover:text-gold'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Link>
                ))}
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-soft-black/60 hover:bg-red-50 hover:text-red-500 transition-all w-full border-none bg-transparent cursor-pointer"
                >
                  <HiOutlineLogout className="w-5 h-5" />
                  Logout
                </button>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
