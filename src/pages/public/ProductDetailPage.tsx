import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiOutlineHeart, HiHeart, HiOutlineShoppingBag, HiOutlineCheck, HiArrowRight } from 'react-icons/hi';
import { sampleProducts, sampleReviews, sampleAddOns } from '../../data/sampleData';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import ProductCard from '../../components/ui/ProductCard';
import Tabs from '../../components/ui/Tabs';
import type { AddOn } from '../../types';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = sampleProducts.find((p) => p.id === id);
  const addItem = useCartStore((s) => s.addItem);
  const { isInWishlist, toggleWishlist, isAuthenticated } = useAuthStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [coupleName1, setCoupleName1] = useState('');
  const [coupleName2, setCoupleName2] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [zoomActive, setZoomActive] = useState(false);

  if (!product) {
    return (
      <div className="section-padding text-center">
        <h2 className="font-serif text-2xl text-soft-black mb-4">Product Not Found</h2>
        <Link to="/shop" className="btn-primary inline-block no-underline">Back to Shop</Link>
      </div>
    );
  }

  const wishlisted = isAuthenticated && isInWishlist(product.id);
  const reviews = sampleReviews.filter((r) => r.productId === product.id);
  const relatedProducts = sampleProducts.filter((p) => p.category === product.category && p.id !== product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const addOnsPrice = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const totalPrice = (product.price + addOnsPrice) * quantity;

  const toggleAddOn = (addOn: AddOn) => {
    setSelectedAddOns((prev) =>
      prev.find((a) => a.id === addOn.id) ? prev.filter((a) => a.id !== addOn.id) : [...prev, addOn]
    );
  };

  const handleAddToCart = () => {
    addItem(product, quantity, selectedAddOns, {
      coupleName1,
      coupleName2,
      weddingDate,
    });
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container-custom py-4">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Link to="/" className="hover:text-gold no-underline text-muted">Home</Link>
          <span className="text-gold/30">/</span>
          <Link to="/shop" className="hover:text-gold no-underline text-muted">Shop</Link>
          <span className="text-gold/30">/</span>
          <span className="text-soft-black">{product.title}</span>
        </div>
      </div>

      {/* Product Section */}
      <section className="container-custom pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div
              className="relative aspect-square rounded-2xl overflow-hidden cursor-zoom-in border border-gold/10"
              onClick={() => setZoomActive(!zoomActive)}
              style={{ boxShadow: '0 8px 30px rgba(212,175,55,0.08)' }}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  zoomActive ? 'scale-150' : 'scale-100'
                }`}
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 text-white text-sm px-4 py-1.5 rounded-full font-medium" style={{ background: 'linear-gradient(135deg, #D4AF37, #E8C84A)' }}>
                  {discount}% OFF
                </span>
              )}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedImage(i); setZoomActive(false); }}
                  className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === i ? 'border-gold' : 'border-transparent hover:border-gold/30'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="text-gold font-semibold text-xs uppercase tracking-[0.2em] mb-2">
                {product.category.replace(/-/g, ' ')}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl text-soft-black mb-3">
                {product.title}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <HiStar key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-gold' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-sm text-muted">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-soft-black">
                  ₹{totalPrice.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <p className="text-soft-black/60 leading-relaxed">{product.description}</p>

            {/* Customization */}
            <div className="space-y-4 rounded-2xl p-6 border border-gold/15" style={{ background: 'linear-gradient(135deg, rgba(247,221,226,0.15), rgba(255,253,248,0.5))' }}>
              <h3 className="font-serif text-lg text-soft-black flex items-center gap-2">
                <span className="text-gold">✦</span> Customize Your Kit
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Partner 1 Name"
                  value={coupleName1}
                  onChange={(e) => setCoupleName1(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gold/15 bg-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Partner 2 Name"
                  value={coupleName2}
                  onChange={(e) => setCoupleName2(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gold/15 bg-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-colors"
                />
              </div>
              <input
                type="date"
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gold/15 bg-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-colors"
              />
            </div>

            {/* Add-ons */}
            <div>
              <h3 className="font-serif text-lg text-soft-black mb-3">Add-ons</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {product.addOns.map((addOn) => {
                  const isSelected = selectedAddOns.find((a) => a.id === addOn.id);
                  return (
                    <button
                      key={addOn.id}
                      onClick={() => toggleAddOn(addOn)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left cursor-pointer bg-white ${
                        isSelected ? 'border-gold bg-gold/5' : 'border-gold/10 hover:border-gold/30'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-gold bg-gold' : 'border-gray-300'
                      }`}>
                        {isSelected && <HiOutlineCheck className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-soft-black truncate">{addOn.name}</p>
                        <p className="text-xs text-muted">+₹{addOn.price}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity + Actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gold/15 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-lg font-medium hover:bg-baby-pink/20 transition-colors bg-transparent border-none cursor-pointer"
                >
                  −
                </button>
                <span className="px-4 py-3 text-center font-medium min-w-[3rem]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-lg font-medium hover:bg-baby-pink/20 transition-colors bg-transparent border-none cursor-pointer"
                >
                  +
                </button>
              </div>

              <button onClick={handleAddToCart} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <HiOutlineShoppingBag className="w-5 h-5" />
                Add to Cart — ₹{totalPrice.toLocaleString()}
              </button>

              <button
                onClick={() => isAuthenticated && toggleWishlist(product.id)}
                className="p-3 border border-gold/15 rounded-xl hover:border-gold hover:bg-gold/5 transition-all bg-transparent cursor-pointer"
              >
                {wishlisted ? (
                  <HiHeart className="w-6 h-6 text-gold" />
                ) : (
                  <HiOutlineHeart className="w-6 h-6 text-muted" />
                )}
              </button>
            </div>

            {/* Stock Info */}
            <p className="text-sm text-muted">
              {product.stock > 0 ? (
                <span className="text-sage-dark">✓ In stock — {product.stock} available</span>
              ) : (
                <span className="text-red-500">✕ Out of stock</span>
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs: What's Inside / Reviews */}
      <section className="container-custom pb-16">
        <Tabs
          tabs={[
            {
              label: "What's Inside",
              content: (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.whatsInside.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-gold/10" style={{ background: 'linear-gradient(135deg, rgba(247,221,226,0.1), rgba(255,253,248,0.4))' }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.05))' }}>
                        <HiOutlineCheck className="w-4 h-4 text-gold" />
                      </div>
                      <span className="text-sm text-soft-black">{item}</span>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              label: `Reviews (${reviews.length})`,
              content: (
                <div className="space-y-4 max-w-2xl">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="rounded-xl p-5 border border-gold/8" style={{ background: 'linear-gradient(135deg, rgba(247,221,226,0.08), rgba(255,253,248,0.3))' }}>
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: review.rating }, (_, i) => (
                            <HiStar key={i} className="w-4 h-4 text-gold" />
                          ))}
                        </div>
                        <p className="text-soft-black/70 mb-3 leading-relaxed">{review.comment}</p>
                        <p className="text-sm text-muted">— {review.userName}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No reviews yet. Be the first to review!</p>
                  )}
                </div>
              ),
            },
            {
              label: 'Shipping & Returns',
              content: (
                <div className="max-w-2xl space-y-4 text-soft-black/60 leading-relaxed">
                  <p><strong>Free Shipping</strong> on orders over ₹1,500. Standard delivery in 5-7 business days.</p>
                  <p><strong>Express Shipping</strong> available at ₹199. Delivery in 2-3 business days.</p>
                  <p><strong>Returns:</strong> Due to the handcrafted and personalized nature of our products, we accept returns within 7 days only for defective items.</p>
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding" style={{ background: 'linear-gradient(180deg, #FFFDF8, #FFF0F3 50%, #FFFDF8)' }}>
          <div className="container-custom">
            <h2 className="font-serif text-2xl text-soft-black mb-8">You Might Also Love</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.slice(0, 3).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
