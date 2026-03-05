import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiMail, HiArrowLeft } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSent(true);
    setLoading(false);
    toast.success('Reset link sent!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-baby-pink/20 via-warm-white to-lavender/20 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="no-underline">
            <img src="/logo.jpeg" alt="ETERNA" className="h-20 w-auto mx-auto mb-4" />
            <h1 className="font-serif text-3xl text-gradient">ETERNA</h1>
          </Link>
        </div>

        <div className="card p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiMail className="w-8 h-8 text-sage" />
              </div>
              <h2 className="font-serif text-2xl mb-2">Check Your Email</h2>
              <p className="text-soft-black/60 text-sm mb-6">
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox.
              </p>
              <Link to="/login" className="btn-primary no-underline inline-block">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <h2 className="font-serif text-2xl mb-2 text-center">Forgot Password?</h2>
              <p className="text-soft-black/60 text-sm text-center mb-6">
                No worries! Enter your email and we'll send you a reset link.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <div className="relative">
                    <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-black/30" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gold/15 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none"
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-sm text-soft-black/50 hover:text-gold mt-6 no-underline"
              >
                <HiArrowLeft className="w-4 h-4" /> Back to Sign In
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
