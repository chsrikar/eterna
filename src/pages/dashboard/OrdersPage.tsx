import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiEye, HiSearch } from 'react-icons/hi';

type OrderStatus = 'all' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

const orders = [
  {
    id: 'ETERNA-A1B2C3',
    product: 'Royal Wedding Memory Kit',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=200',
    status: 'shipped' as const,
    date: '2024-12-15',
    total: 3299,
    tracking: 'IN1234567890',
  },
  {
    id: 'ETERNA-D4E5F6',
    product: 'Custom Couple Kit',
    image: 'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=200',
    status: 'processing' as const,
    date: '2024-12-20',
    total: 2499,
    tracking: null,
  },
  {
    id: 'ETERNA-G7H8I9',
    product: 'Self-Love Journal',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    status: 'delivered' as const,
    date: '2024-11-28',
    total: 1299,
    tracking: 'IN0987654321',
  },
];

const statusColors: Record<string, string> = {
  processing: 'bg-gold/10 text-gold',
  shipped: 'bg-gold/20 text-gold',
  delivered: 'bg-sage/20 text-sage',
  cancelled: 'bg-red-100 text-red-500',
};

export default function OrdersPage() {
  const [filter, setFilter] = useState<OrderStatus>('all');
  const [search, setSearch] = useState('');

  const filtered = orders.filter((o) => {
    if (filter !== 'all' && o.status !== filter) return false;
    if (search && !o.product.toLowerCase().includes(search.toLowerCase()) && !o.id.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-2xl sm:text-3xl mb-6">My Orders</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-black/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold/15 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['all', 'processing', 'shipped', 'delivered', 'cancelled'] as OrderStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-full text-sm capitalize transition-all ${
                  filter === s ? 'text-white' : 'bg-baby-pink/20 text-soft-black/60 hover:bg-baby-pink/40'
                }`}
                style={filter === s ? { background: 'linear-gradient(135deg, #D4AF37, #E8C84A)' } : {}}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Orders */}
        <div className="space-y-4">
          {filtered.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card p-4 sm:p-6"
            >
              <div className="flex gap-4">
                <img src={order.image} alt={order.product} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-serif text-lg">{order.product}</h3>
                      <p className="text-xs text-soft-black/40 font-mono">{order.id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                    <div className="flex items-center gap-4 text-sm text-soft-black/60">
                      <span>Placed: {order.date}</span>
                      <span className="font-semibold text-soft-black">₹{order.total.toLocaleString('en-IN')}</span>
                    </div>
                    <Link
                      to={`/dashboard/orders/${order.id}`}
                      className="flex items-center gap-1 text-sm text-gold hover:underline no-underline"
                    >
                      <HiEye className="w-4 h-4" /> View Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-soft-black/50">No orders found.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
