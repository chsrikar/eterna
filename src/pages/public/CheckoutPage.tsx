import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiShieldCheck, HiArrowLeft } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getPriceDetails, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const priceDetails = getPriceDetails();

  const [form, setForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.firstName || !form.email || !form.phone || !form.address || !form.city || !form.pincode) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsProcessing(true);

    // Simulate payment flow
    await new Promise((r) => setTimeout(r, 2000));

    if (paymentMethod === 'razorpay') {
      // In production, this would open Razorpay checkout
      toast.success('Payment successful! Order placed.');
    } else {
      toast.success('Order placed! Pay on delivery.');
    }

    clearCart();
    setIsProcessing(false);
    navigate('/order-success');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-warm-white">
      <section className="section-padding">
        <div className="container-custom">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-soft-black/60 hover:text-gold mb-6 transition-colors"
          >
            <HiArrowLeft className="w-4 h-4" /> Back to Cart
          </button>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-4xl mb-8"
          >
            Checkout
          </motion.h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Shipping Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card p-6"
                >
                  <h3 className="font-serif text-xl mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        First Name <span className="text-gold">*</span>
                      </label>
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name</label>
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email <span className="text-gold">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone <span className="text-gold">*</span>
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Address */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="card p-6"
                >
                  <h3 className="font-serif text-xl mb-4">Shipping Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Address <span className="text-gold">*</span>
                      </label>
                      <input
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        placeholder="House No., Street, Locality"
                        className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          City <span className="text-gold">*</span>
                        </label>
                        <input
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">State</label>
                        <input
                          name="state"
                          value={form.state}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          PIN Code <span className="text-gold">*</span>
                        </label>
                        <input
                          name="pincode"
                          value={form.pincode}
                          onChange={handleChange}
                          required
                          pattern="[0-9]{6}"
                          className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Payment */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="card p-6"
                >
                  <h3 className="font-serif text-xl mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    <label
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'razorpay' ? 'border-gold bg-gold/5' : 'border-gold/15'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'razorpay'}
                        onChange={() => setPaymentMethod('razorpay')}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'razorpay' ? 'border-gold' : 'border-soft-black/20'
                        }`}
                      >
                        {paymentMethod === 'razorpay' && <div className="w-3 h-3 rounded-full bg-gold" />}
                      </div>
                      <div>
                        <p className="font-medium">Pay Online (Razorpay)</p>
                        <p className="text-xs text-soft-black/50">UPI, Cards, Net Banking, Wallets</p>
                      </div>
                    </label>

                    <label
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'cod' ? 'border-gold bg-gold/5' : 'border-gold/15'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'cod' ? 'border-gold' : 'border-soft-black/20'
                        }`}
                      >
                        {paymentMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-gold" />}
                      </div>
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-xs text-soft-black/50">Pay when your kit arrives</p>
                      </div>
                    </label>
                  </div>
                </motion.div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="card p-6 sticky top-28"
                >
                  <h3 className="font-serif text-xl mb-4">Order Summary</h3>

                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.productId} className="flex gap-3">
                        <img src={item.product.images[0]} alt={item.product.title} className="w-14 h-14 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">{item.product.title}</p>
                          <p className="text-xs text-soft-black/50">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold whitespace-nowrap">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gold/15 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-soft-black/60">Subtotal</span>
                      <span>₹{priceDetails.subtotal.toLocaleString('en-IN')}</span>
                    </div>
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
                    <div className="border-t border-gold/15 pt-3 flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-gold-dark">₹{priceDetails.total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn-primary w-full mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <HiShieldCheck className="w-5 h-5" />
                        {paymentMethod === 'razorpay' ? 'Pay Now' : 'Place Order'}
                      </>
                    )}
                  </button>

                  <p className="text-xs text-soft-black/40 text-center mt-3">
                    🔒 Your payment details are secure and encrypted
                  </p>
                </motion.div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
