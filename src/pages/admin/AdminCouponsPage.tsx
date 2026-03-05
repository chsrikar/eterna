import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import toast from 'react-hot-toast';
import Modal from '../../components/ui/Modal';

const coupons = [
  { id: '1', code: 'WELCOME10', type: 'percentage', value: 10, minOrder: 999, used: 45, maxUses: 100, active: true, expires: '2025-01-31' },
  { id: '2', code: 'FLAT200', type: 'flat', value: 200, minOrder: 1500, used: 22, maxUses: 50, active: true, expires: '2025-02-28' },
  { id: '3', code: 'LOVE15', type: 'percentage', value: 15, minOrder: 2000, used: 8, maxUses: 30, active: true, expires: '2025-02-14' },
  { id: '4', code: 'SUMMER20', type: 'percentage', value: 20, minOrder: 2500, used: 50, maxUses: 50, active: false, expires: '2024-09-30' },
];

export default function AdminCouponsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-2xl sm:text-3xl">Coupons</h1>
          <button onClick={() => setShowModal(true)} className="btn-primary text-sm inline-flex items-center gap-2">
            <HiPlus className="w-4 h-4" /> Create Coupon
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {coupons.map((coupon, i) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-lg">{coupon.code}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        coupon.active ? 'bg-sage/20 text-sage' : 'bg-red-100 text-red-500'
                      }`}
                    >
                      {coupon.active ? 'Active' : 'Expired'}
                    </span>
                  </div>
                  <p className="text-sm text-gold font-semibold">
                    {coupon.type === 'percentage' ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-baby-pink/20 transition-colors">
                    <HiPencil className="w-4 h-4 text-soft-black/50" />
                  </button>
                  <button
                    onClick={() => toast.success('Coupon deleted (demo)')}
                    className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <HiTrash className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-soft-black/50">
                <span>Min. ₹{coupon.minOrder}</span>
                <span>Used: {coupon.used}/{coupon.maxUses}</span>
                <span>Expires: {coupon.expires}</span>
              </div>
              <div className="mt-3 h-1.5 bg-gold/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${(coupon.used / coupon.maxUses) * 100}%`, background: 'linear-gradient(135deg, #D4AF37, #E8C84A)' }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Coupon Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Coupon">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Coupon Code</label>
              <input
                placeholder="e.g. WELCOME10"
                className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold outline-none uppercase font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Discount Type</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold outline-none">
                  <option value="percentage">Percentage</option>
                  <option value="flat">Flat Amount</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Value</label>
                <input
                  type="number"
                  placeholder="10"
                  className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Min. Order (₹)</label>
                <input
                  type="number"
                  placeholder="999"
                  className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Max Uses</label>
                <input
                  type="number"
                  placeholder="100"
                  className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Expires On</label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold outline-none"
              />
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
              <button
                onClick={() => {
                  toast.success('Coupon created (demo)');
                  setShowModal(false);
                }}
                className="btn-primary"
              >
                Create
              </button>
            </div>
          </div>
        </Modal>
      </motion.div>
    </div>
  );
}
