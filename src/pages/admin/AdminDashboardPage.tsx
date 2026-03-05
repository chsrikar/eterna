import { motion } from 'framer-motion';
import { HiCurrencyRupee, HiShoppingBag, HiUsers, HiTrendingUp, HiEye, HiCollection } from 'react-icons/hi';

const kpis = [
  { label: 'Total Revenue', value: '₹2,45,890', change: '+12.5%', icon: HiCurrencyRupee },
  { label: 'Total Orders', value: '156', change: '+8.2%', icon: HiShoppingBag },
  { label: 'Customers', value: '89', change: '+15.3%', icon: HiUsers },
  { label: 'Conversion Rate', value: '3.2%', change: '+0.5%', icon: HiTrendingUp },
];

const recentOrders = [
  { id: 'MYOWD-X1Y2', customer: 'Priya Sharma', product: 'Royal Wedding Kit', total: '₹3,299', status: 'Processing' },
  { id: 'MYOWD-Z3A4', customer: 'Rahul Patel', product: 'Couple Kit', total: '₹2,499', status: 'Shipped' },
  { id: 'MYOWD-B5C6', customer: 'Ananya Gupta', product: 'Self-Love Journal', total: '₹1,299', status: 'Delivered' },
  { id: 'MYOWD-D7E8', customer: 'Aditya Kumar', product: 'Premium Memory Kit', total: '₹4,599', status: 'Processing' },
  { id: 'MYOWD-F9G0', customer: 'Meera Iyer', product: 'Pre-Wedding Journal', total: '₹1,999', status: 'Shipped' },
];

const topProducts = [
  { name: 'Royal Wedding Memory Kit', sold: 45, revenue: '₹1,48,455' },
  { name: 'Love Story Memory Kit', sold: 32, revenue: '₹79,968' },
  { name: 'Self-Love Journal', sold: 28, revenue: '₹36,372' },
];

const statusColors: Record<string, string> = {
  Processing: 'bg-gold/10 text-gold',
  Shipped: 'bg-gold/20 text-gold',
  Delivered: 'bg-sage/20 text-sage',
};

export default function AdminDashboardPage() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-2xl sm:text-3xl mb-6">Admin Dashboard</h1>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-gold" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(247,221,226,0.15))' }}>
                  <kpi.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-sage">{kpi.change}</span>
              </div>
              <p className="text-2xl font-bold mb-1">{kpi.value}</p>
              <p className="text-sm text-soft-black/50">{kpi.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg">Recent Orders</h2>
              <button className="text-sm text-gold hover:underline flex items-center gap-1">
                <HiEye className="w-4 h-4" /> View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-soft-black/40 border-b border-gold/15">
                    <th className="pb-3 font-medium">Order</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/10">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-baby-pink/10">
                      <td className="py-3 font-mono text-xs">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3 text-soft-black/70">{order.product}</td>
                      <td className="py-3 font-semibold">{order.total}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <HiCollection className="w-5 h-5 text-gold" />
              <h2 className="font-serif text-lg">Top Products</h2>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-sm font-bold text-gold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                      <p className="text-xs text-soft-black/40">{product.sold} sold</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">{product.revenue}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
