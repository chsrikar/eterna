import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineCollection,
  HiOutlineUsers,
  HiOutlineChartBar,
  HiOutlineNewspaper,
  HiOutlinePhotograph,
  HiOutlineTag,
  HiOutlineCube,
  HiOutlineLogout,
} from 'react-icons/hi';

const adminLinks = [
  { label: 'Dashboard', path: '/admin', icon: HiOutlineHome },
  { label: 'Products', path: '/admin/products', icon: HiOutlineCube },
  { label: 'Orders', path: '/admin/orders', icon: HiOutlineShoppingBag },
  { label: 'Users', path: '/admin/users', icon: HiOutlineUsers },
  { label: 'Customizations', path: '/admin/customizations', icon: HiOutlineCollection },
  { label: 'Coupons', path: '/admin/coupons', icon: HiOutlineTag },
  { label: 'Blog', path: '/admin/blog', icon: HiOutlineNewspaper },
  { label: 'Banners', path: '/admin/banners', icon: HiOutlinePhotograph },
  { label: 'Analytics', path: '/admin/analytics', icon: HiOutlineChartBar },
];

export default function AdminLayout() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-soft-black text-white min-h-screen fixed left-0 top-0 z-30 flex flex-col">
        <div className="p-6">
          <Link to="/admin" className="no-underline">
            <h2 className="font-serif text-xl text-white">MYOWD Admin</h2>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {adminLinks.map(({ label, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all no-underline ${
                location.pathname === path
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all w-full border-none bg-transparent cursor-pointer"
          >
            <HiOutlineLogout className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
