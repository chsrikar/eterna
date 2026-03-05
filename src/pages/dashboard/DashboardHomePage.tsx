import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiShoppingBag, HiHeart, HiPhotograph, HiCollection, HiBell } from 'react-icons/hi';
import { useAuthStore } from '../../store/authStore';

const stats = [
  { label: 'Orders', value: '3', icon: HiShoppingBag, color: 'text-gold', link: '/dashboard/orders' },
  { label: 'Wishlist', value: '5', icon: HiHeart, color: 'text-gold', link: '/dashboard/wishlist' },
  { label: 'Saved Kits', value: '2', icon: HiCollection, color: 'text-gold', link: '/dashboard/saved-kits' },
  { label: 'Photos', value: '14', icon: HiPhotograph, color: 'text-gold', link: '/dashboard/photos' },
];

const recentOrders = [
  { id: 'ETERNA-A1B2C3', product: 'Royal Wedding Memory Kit', status: 'Shipped', date: '2024-12-15', total: '₹3,299' },
  { id: 'ETERNA-D4E5F6', product: 'Custom Couple Kit', status: 'Processing', date: '2024-12-20', total: '₹2,499' },
  { id: 'ETERNA-G7H8I9', product: 'Self-Love Journal', status: 'Delivered', date: '2024-11-28', total: '₹1,299' },
];

export default function DashboardHomePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div>
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl mb-2">
          Welcome back, {user?.name?.split(' ')[0] || 'there'}! 👋
        </h1>
        <p className="text-soft-black/60">Here's an overview of your account.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={stat.link} className="card p-5 flex items-center gap-4 hover:shadow-lg transition-shadow no-underline block">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`} style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(247,221,226,0.15))' }}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-soft-black/50">{stat.label}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl">Recent Orders</h2>
          <Link to="/dashboard/orders" className="text-sm text-gold hover:underline no-underline">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-soft-black/40 border-b border-gold/15">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-baby-pink/10">
                  <td className="py-3 font-mono text-xs">{order.id}</td>
                  <td className="py-3">{order.product}</td>
                  <td className="py-3 text-soft-black/60">{order.date}</td>
                  <td className="py-3 font-semibold">{order.total}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered'
                          ? 'bg-sage/20 text-sage'
                          : order.status === 'Shipped'
                          ? 'bg-gold/20 text-gold'
                          : 'bg-gold/10 text-gold'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6 mt-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <HiBell className="w-5 h-5 text-gold" />
          <h2 className="font-serif text-xl">Recent Notifications</h2>
        </div>
        <div className="space-y-3">
          <div className="flex gap-3 p-3 bg-gold/8 rounded-xl border border-gold/10">
            <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
            <div>
              <p className="text-sm">Your order <strong>ETERNA-D4E5F6</strong> is being prepared</p>
              <p className="text-xs text-soft-black/40 mt-1">2 hours ago</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 rounded-xl">
            <div className="w-2 h-2 bg-soft-black/20 rounded-full mt-2 flex-shrink-0" />
            <div>
              <p className="text-sm">New collection: Valentine's Special Kits are here!</p>
              <p className="text-xs text-soft-black/40 mt-1">1 day ago</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
