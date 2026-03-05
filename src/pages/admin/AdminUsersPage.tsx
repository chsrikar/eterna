import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiMail, HiBan } from 'react-icons/hi';
import toast from 'react-hot-toast';

const users = [
  { id: '1', name: 'Priya Sharma', email: 'priya@email.com', orders: 5, spent: '₹12,450', joined: '2024-10-15', status: 'active' },
  { id: '2', name: 'Rahul Patel', email: 'rahul@email.com', orders: 3, spent: '₹7,890', joined: '2024-11-01', status: 'active' },
  { id: '3', name: 'Ananya Gupta', email: 'ananya@email.com', orders: 8, spent: '₹22,300', joined: '2024-09-20', status: 'active' },
  { id: '4', name: 'Aditya Kumar', email: 'aditya@email.com', orders: 1, spent: '₹4,599', joined: '2024-12-05', status: 'active' },
  { id: '5', name: 'Meera Iyer', email: 'meera@email.com', orders: 2, spent: '₹3,998', joined: '2024-11-22', status: 'suspended' },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-2xl sm:text-3xl mb-6">Users</h1>

        <div className="relative mb-6">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-black/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold/15 focus:border-gold outline-none text-sm"
          />
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-soft-black/40 border-b border-gold/15 bg-gold/5">
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Orders</th>
                  <th className="p-4 font-medium">Total Spent</th>
                  <th className="p-4 font-medium">Joined</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-baby-pink/10">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(135deg, #D4AF37, #E8C84A)' }}>
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-soft-black/40">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{user.orders}</td>
                    <td className="p-4 font-semibold">{user.spent}</td>
                    <td className="p-4 text-soft-black/60">{user.joined}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-sage/20 text-sage' : 'bg-red-100 text-red-500'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toast.success('Email sent (demo)')}
                          className="p-1.5 rounded-lg hover:bg-baby-pink/20 transition-colors"
                          title="Email user"
                        >
                          <HiMail className="w-4 h-4 text-soft-black/50" />
                        </button>
                        <button
                          onClick={() => toast.success('User status toggled (demo)')}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          title="Suspend user"
                        >
                          <HiBan className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
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
