import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiPencil, HiTrash, HiPlus, HiEye } from 'react-icons/hi';
import toast from 'react-hot-toast';
import Modal from '../../components/ui/Modal';

const products = [
  { id: '1', name: 'Royal Wedding Memory Kit', category: 'Wedding Memory Kit', price: 3299, stock: 45, status: 'active' },
  { id: '2', name: 'Love Story Memory Kit', category: 'Wedding Memory Kit', price: 2499, stock: 32, status: 'active' },
  { id: '3', name: 'Pre-Wedding Journal', category: 'Pre-Wedding Journal', price: 1999, stock: 20, status: 'active' },
  { id: '4', name: 'Couple Date Night Kit', category: 'Couple Kit', price: 1799, stock: 15, status: 'active' },
  { id: '5', name: 'Self-Love Affirmation Kit', category: 'Self-Love Kit', price: 1299, stock: 0, status: 'out-of-stock' },
  { id: '6', name: 'Premium Memory Box', category: 'Wedding Memory Kit', price: 4599, stock: 8, status: 'active' },
];

export default function AdminProductsPage() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filtered = products.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="font-serif text-2xl sm:text-3xl">Products</h1>
          <button onClick={() => setShowModal(true)} className="btn-primary text-sm inline-flex items-center gap-2">
            <HiPlus className="w-4 h-4" /> Add Product
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-black/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold/15 focus:border-gold outline-none text-sm"
          />
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-soft-black/40 border-b border-gold/15 bg-gold/5">
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Stock</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-baby-pink/10">
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4 text-soft-black/60">{product.category}</td>
                    <td className="p-4 font-semibold">₹{product.price.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                      <span className={product.stock === 0 ? 'text-red-500' : ''}>{product.stock}</span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.status === 'active' ? 'bg-sage/20 text-sage' : 'bg-red-100 text-red-500'
                        }`}
                      >
                        {product.status === 'active' ? 'Active' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-baby-pink/20 transition-colors">
                          <HiEye className="w-4 h-4 text-soft-black/50" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-baby-pink/20 transition-colors">
                          <HiPencil className="w-4 h-4 text-soft-black/50" />
                        </button>
                        <button
                          onClick={() => toast.success('Product deleted (demo)')}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <HiTrash className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Product Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Product" size="lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                placeholder="e.g. Royal Wedding Memory Kit"
                className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold outline-none">
                  <option>Wedding Memory Kit</option>
                  <option>Pre-Wedding Journal</option>
                  <option>Couple Kit</option>
                  <option>Self-Love Kit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (₹)</label>
                <input
                  type="number"
                  placeholder="2499"
                  className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                rows={3}
                placeholder="Product description..."
                className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold outline-none resize-none"
              />
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
              <button
                onClick={() => {
                  toast.success('Product added (demo)');
                  setShowModal(false);
                }}
                className="btn-primary"
              >
                Add Product
              </button>
            </div>
          </div>
        </Modal>
      </motion.div>
    </div>
  );
}
