import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiPencil, HiTrash, HiShoppingCart } from 'react-icons/hi';
import toast from 'react-hot-toast';

const savedKits = [
  {
    id: 'draft-1',
    name: 'Our Wedding Kit',
    type: 'Wedding Memory Kit',
    template: 'Floral Elegance',
    addOns: 3,
    photos: 8,
    price: 3299,
    lastModified: '2024-12-18',
  },
  {
    id: 'draft-2',
    name: 'Anniversary Surprise',
    type: 'Couple Kit',
    template: 'Modern Love',
    addOns: 2,
    photos: 5,
    price: 2199,
    lastModified: '2024-12-10',
  },
];

export default function SavedKitsPage() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-2xl sm:text-3xl">Saved Kits</h1>
          <Link to="/kit-builder" className="btn-primary text-sm no-underline">
            Build New Kit
          </Link>
        </div>

        {savedKits.length > 0 ? (
          <div className="space-y-4">
            {savedKits.map((kit, i) => (
              <motion.div
                key={kit.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-lg mb-1">{kit.name}</h3>
                    <p className="text-sm text-soft-black/50 mb-2">{kit.type} • {kit.template}</p>
                    <div className="flex gap-4 text-xs text-soft-black/40">
                      <span>{kit.addOns} add-ons</span>
                      <span>{kit.photos} photos</span>
                      <span>Modified: {kit.lastModified}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-bold text-gold-dark">₹{kit.price.toLocaleString('en-IN')}</p>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg border border-gold/15 hover:border-gold/40 transition-all">
                        <HiPencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toast.success('Added to cart!')}
                        className="p-2 rounded-lg text-white transition-colors"
                        style={{ background: 'linear-gradient(135deg, #D4AF37, #E8C84A)' }}
                      >
                        <HiShoppingCart className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toast.success('Kit deleted')}
                        className="p-2 rounded-lg border border-gold/15 hover:border-red-300 hover:text-red-500 transition-all"
                      >
                        <HiTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(247,221,226,0.2))' }}>
              <span className="text-3xl">📦</span>
            </div>
            <h3 className="font-serif text-xl mb-2">No saved kits</h3>
            <p className="text-soft-black/50 mb-6">Start building your custom kit!</p>
            <Link to="/kit-builder" className="btn-primary no-underline">Build a Kit</Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
