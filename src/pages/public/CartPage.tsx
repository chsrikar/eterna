import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { HiTrash, HiPlus, HiMinus, HiArrowRight, HiShoppingCart, HiTag } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useCartStore } from '../../store/cartStore';
import type { Coupon } from '../../types';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, applyCoupon, removeCoupon, coupon, getPriceDetails } = useCartStore();
  const priceDetails = getPriceDetails();

  const handleApplyCoupon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const code = (form.elements.namedItem('coupon') as HTMLInputElement).value.trim();
    if (code) {
      // In production, validate against Firestore. For now, create a demo coupon.
      const demoCoupon: Coupon = {
        code,
        discountType: 'percentage',
        discountValue: 10,
        minOrderValue: 500,
        maxDiscount: 500,
        validFrom: new Date().toISOString(),
        validTo: new Date(Date.now() + 86400000).toISOString(),
        usageLimit: 100,
        usedCount: 0,
        isActive: true,
      };
      applyCoupon(demoCoupon);
      toast.success('Coupon applied!');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, rgba(247,221,226,0.3), rgba(212,175,55,0.1))' }}>
            <HiShoppingCart className="w-12 h-12 text-gold/50" />
          </div>
          <h2 className="font-serif text-2xl mb-3">Your cart is empty</h2>
          <p className="text-soft-black/60 mb-6">Looks like you haven't added anything yet!</p>
          <Link to="/shop" className="btn-primary no-underline inline-flex items-center gap-2">
            Continue Shopping <HiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white">
      <section className="section-padding">
        <div className="container-custom">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-4xl mb-8"
          >
            Shopping Cart ({items.length})
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card p-4 sm:p-6"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-serif text-lg mb-1 line-clamp-1">{item.product.title}</h3>
                          {item.customization?.coupleName1 && (
                            <p className="text-sm text-soft-black/50">
                              For: {item.customization.coupleName1}
                              {item.customization.coupleName2 && ` & ${item.customization.coupleName2}`}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-soft-black/30 hover:text-red-500 transition-colors p-1"
                        >
                          <HiTrash className="w-5 h-5" />
                        </button>
                      </div>

                      {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {item.selectedAddOns.map((ao) => (
                            <span key={ao.id} className="text-xs bg-gold/10 text-gold-dark px-2 py-0.5 rounded-full">
                              {ao.name}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gold/15 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                            className="p-2 hover:bg-baby-pink/20 transition-colors rounded-l-lg"
                          >
                            <HiMinus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 text-sm font-medium min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-2 hover:bg-baby-pink/20 transition-colors rounded-r-lg"
                          >
                            <HiPlus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-semibold text-lg text-gold-dark">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Launch Special Banner */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-4 p-4 rounded-xl border-2 border-gold/30"
                style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(247,221,226,0.08))' }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <HiTag className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-soft-black mb-1 text-sm">🎉 Launch Special!</h4>
                    <p className="text-xs text-soft-black/60 mb-2">
                      Get 30% OFF your first order! Use code <span className="font-bold text-gold-dark">LAUNCH30</span>
                    </p>
                    <p className="text-xs text-gold-dark">Limited time offer for our first customers</p>
                  </div>
                </div>
              </motion.div>

              {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card p-6 sticky top-28"
              >
                <h3 className="font-serif text-xl mb-6">Order Summary</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-soft-black/60">Subtotal</span>
                    <span>₹{priceDetails.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {priceDetails.addOnsTotal > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-soft-black/60">Add-ons</span>
                      <span>₹{priceDetails.addOnsTotal.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {priceDetails.discount > 0 && (
                    <div className="flex justify-between text-sm text-sage">
                      <span>Discount</span>
                      <span>-₹{priceDetails.discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-soft-black/60">Shipping</span>
                    <span>{priceDetails.deliveryCharge === 0 ? 'Free' : `₹${priceDetails.deliveryCharge}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-soft-black/60">GST (18%)</span>
                    <span>₹{priceDetails.gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-t border-gold/15 pt-3 flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-gold-dark">₹{priceDetails.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Coupon */}
                {coupon ? (
                  <div className="mb-6 flex items-center justify-between bg-gold/8 px-4 py-3 rounded-xl border border-gold/15">
                    <div className="flex items-center gap-2">
                      <HiTag className="w-4 h-4 text-gold" />
                      <span className="text-sm font-medium">{coupon.code}</span>
                    </div>
                    <button onClick={removeCoupon} className="text-xs text-red-500 hover:underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="mb-6 flex gap-2">
                    <input
                      name="coupon"
                      type="text"
                      placeholder="Coupon code"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gold/15 text-sm focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none"
                    />
                    <button type="submit" className="btn-secondary text-sm !py-2.5 !px-4">
                      Apply
                    </button>
                  </form>
                )}

                {priceDetails.deliveryCharge === 0 && (
                  <div className="text-xs text-sage text-center mb-4">
                    🎉 You qualify for free shipping!
                  </div>
                )}

                <button
                  onClick={() => navigate('/checkout')}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <HiArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/shop"
                  className="block text-center text-sm text-soft-black/50 hover:text-gold mt-4 no-underline"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
