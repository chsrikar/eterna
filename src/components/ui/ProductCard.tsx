import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineHeart, HiHeart, HiOutlineShoppingBag, HiStar } from 'react-icons/hi';
import type { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const { isInWishlist, toggleWishlist, isAuthenticated } = useAuthStore();
  const [imgLoaded, setImgLoaded] = useState(false);
  const wishlisted = isAuthenticated && isInWishlist(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-500 border border-gold/8 hover:-translate-y-2"
      style={{ boxShadow: '0 2px 20px rgba(212,175,55,0.06)' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 50px rgba(212,175,55,0.18)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.25)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 20px rgba(212,175,55,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.08)'; }}
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-[4/5] no-underline">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-baby-pink/30 animate-pulse" />
        )}
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Soft gold overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.bestSeller && (
            <span className="text-xs px-3 py-1.5 rounded-full font-semibold text-white" style={{ background: 'linear-gradient(135deg, #D4AF37, #E8C84A)' }}>
              ★ Best Seller
            </span>
          )}
          {discount > 0 && (
            <span className="text-white text-xs px-3 py-1.5 rounded-full font-semibold" style={{ background: 'linear-gradient(135deg, #D4AF37, #E8C84A)' }}>
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isAuthenticated) toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all border border-gold/10 cursor-pointer hover:border-gold/30 hover:shadow-md"
        >
          {wishlisted ? (
            <HiHeart className="w-5 h-5 text-gold" />
          ) : (
            <HiOutlineHeart className="w-5 h-5 text-soft-black/30 group-hover:text-gold" />
          )}
        </button>

        {/* Quick Add */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.02 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addItem(product);
          }}
          className="absolute bottom-3 left-3 right-3 backdrop-blur-xl text-white py-2.5 rounded-xl font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 border-none cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #E8C84A)', boxShadow: '0 4px 20px rgba(212,175,55,0.35)' }}
        >
          <HiOutlineShoppingBag className="w-4 h-4" />
          Add to Cart
        </motion.button>
      </Link>

      {/* Info */}
      <Link to={`/product/${product.id}`} className="p-4 block no-underline">
        <p className="text-[10px] text-gold-dark uppercase tracking-[0.15em] mb-1.5 font-semibold">
          {product.category.replace(/-/g, ' ')}
        </p>
        <h3 className="font-serif text-base text-soft-black mb-2 line-clamp-2 leading-snug">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }, (_, i) => (
            <HiStar
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-gold' : 'text-cream-dark'}`}
            />
          ))}
          <span className="text-xs text-muted ml-1">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-soft-black">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
