import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiTrash, HiShoppingCart } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { sampleProducts } from '../../data/sampleData';

export default function WishlistPage() {
  const { user, toggleWishlist } = useAuthStore();
  const addToCart = useCartStore((s) => s.addItem);
  const wishlistProducts = sampleProducts.filter((p) => user?.wishlist?.includes(p.id));

  const handleAddToCart = (product: typeof sampleProducts[0]) => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-2xl sm:text-3xl mb-6">My Wishlist</h1>

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {wishlistProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card p-4 flex gap-4"
              >
                <Link to={`/product/${product.id}`}>
                  <img src={product.images[0]} alt={product.title} className="w-24 h-24 object-cover rounded-xl" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`} className="no-underline">
                    <h3 className="font-serif text-lg mb-1 line-clamp-1 hover:text-gold">{product.title}</h3>
                  </Link>
                  <p className="text-gold-dark font-semibold mb-3">
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-1 text-sm px-3 py-1.5 text-white rounded-lg transition-colors"
                      style={{ background: 'linear-gradient(135deg, #D4AF37, #E8C84A)' }}
                    >
                      <HiShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
                    <button
                      onClick={() => {
                        toggleWishlist(product.id);
                        toast.success('Removed from wishlist');
                      }}
                      className="flex items-center gap-1 text-sm px-3 py-1.5 border border-gold/15 rounded-lg hover:border-red-300 hover:text-red-500 transition-all"
                    >
                      <HiTrash className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(247,221,226,0.2))' }}>
              <span className="text-3xl">💝</span>
            </div>
            <h3 className="font-serif text-xl mb-2">Your wishlist is empty</h3>
            <p className="text-soft-black/50 mb-6">Start saving your favorite kits!</p>
            <Link to="/shop" className="btn-primary no-underline">Browse Products</Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
