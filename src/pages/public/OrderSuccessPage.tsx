import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCheck, HiHome, HiClipboardList } from 'react-icons/hi';

export default function OrderSuccessPage() {
  const orderId = `MYOWD-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-warm-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md mx-auto px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(247,221,226,0.2))' }}
        >
          <HiCheck className="w-12 h-12 text-gold" />
        </motion.div>

        <h1 className="font-serif text-3xl sm:text-4xl mb-3">Order Placed!</h1>
        <p className="text-soft-black/60 mb-2">Thank you for your order. We're preparing your kit with love!</p>
        <p className="text-sm text-soft-black/40 mb-8">
          Order ID: <span className="font-mono font-medium text-soft-black/70">{orderId}</span>
        </p>

        <div className="card p-6 mb-8 text-left">
          <h3 className="font-serif text-lg mb-3">What happens next?</h3>
          <ul className="space-y-3 text-sm text-soft-black/70">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-gold-dark" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(247,221,226,0.2))' }}>1</span>
              You'll receive a confirmation email shortly
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-gold-dark" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(247,221,226,0.2))' }}>2</span>
              Our team will start handcrafting your kit
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-gold-dark" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(247,221,226,0.2))' }}>3</span>
              You'll get tracking details once shipped
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary no-underline inline-flex items-center gap-2">
            <HiHome className="w-4 h-4" /> Back to Home
          </Link>
          <Link to="/dashboard/orders" className="btn-secondary no-underline inline-flex items-center gap-2">
            <HiClipboardList className="w-4 h-4" /> View Orders
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
