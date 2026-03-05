import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiSearch } from 'react-icons/hi';
import toast from 'react-hot-toast';

const orders = [
  { id: 'MYOWD-X1Y2', customer: 'Priya Sharma', email: 'priya@email.com', product: 'Royal Wedding Kit', total: 3299, date: '2024-12-20', status: 'processing' },
  { id: 'MYOWD-Z3A4', customer: 'Rahul Patel', email: 'rahul@email.com', product: 'Couple Kit', total: 2499, date: '2024-12-19', status: 'shipped' },
  { id: 'MYOWD-B5C6', customer: 'Ananya Gupta', email: 'ananya@email.com', product: 'Self-Love Journal', total: 1299, date: '2024-12-18', status: 'delivered' },
  { id: 'MYOWD-D7E8', customer: 'Aditya Kumar', email: 'aditya@email.com', product: 'Premium Memory Kit', total: 4599, date: '2024-12-17', status: 'processing' },
  { id: 'MYOWD-F9G0', customer: 'Meera Iyer', email: 'meera@email.com', product: 'Pre-Wedding Journal', total: 1999, date: '2024-12-16', status: 'shipped' },
];

const statusColors: Record<string, string> = {
  processing: 'bg-gold/10 text-gold',
  shipped: 'bg-gold/20 text-gold',
  delivered: 'bg-sage/20 text-sage',
  cancelled: 'bg-red-100 text-red-500',
};

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (search && !o.customer.toLowerCase().includes(search.toLowerCase()) && !o.id.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    toast.success(`Order ${orderId} updated to ${newStatus}`);
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-2xl sm:text-3xl mb-6">Orders</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-black/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer or order ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold/15 focus:border-gold outline-none text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gold/15 focus:border-gold outline-none text-sm"
          >
            <option value="all">All Status</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-soft-black/40 border-b border-gold/15 bg-gold/5">
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10">
                {filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-baby-pink/10">
                    <td className="p-4 font-mono text-xs">{order.id}</td>
                    <td className="p-4">
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-soft-black/40">{order.email}</p>
                    </td>
                    <td className="p-4 text-soft-black/70">{order.product}</td>
                    <td className="p-4 text-soft-black/60">{order.date}</td>
                    <td className="p-4 font-semibold">₹{order.total.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-gold/15 text-xs focus:border-gold outline-none"
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
