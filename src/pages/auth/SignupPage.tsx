import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, User, Gift, QrCode, Crown, Heart } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';

const features = [
  { icon: Gift, text: 'Handcrafted Wedding Kits' },
  { icon: QrCode, text: 'QR Memory Pages' },
  { icon: Crown, text: 'Premium Materials' },
  { icon: Heart, text: 'Personalized With Love' },
];

export default function SignupPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill all required fields');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPw) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setUser({
      uid: `user-${Date.now()}`,
      email,
      name,
      phone: '',
      addresses: [],
      wishlist: [],
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    toast.success('Account created successfully!');
    setLoading(false);
    navigate('/dashboard');
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setUser({
      uid: 'demo-google-1',
      email: 'demo@gmail.com',
      name: 'Demo User',
      phone: '',
      addresses: [],
      wishlist: [],
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    toast.success('Signed up with Google!');
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-baby-pink/20 via-warm-white to-champagne/30 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex w-full max-w-[920px] rounded-[40px] overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.5)',
          border: '1px solid rgba(212,175,55,0.12)',
          boxShadow: '0 25px 60px rgba(212,175,55,0.08), 0 4px 20px rgba(0,0,0,0.04)',
        }}
      >
        {/* ── Left Panel – Brand ── */}
        <div
          className="hidden lg:flex lg:w-1/2 flex-col justify-between p-10 rounded-3xl m-3 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #B8962E 40%, #D4AF37 70%, #E8C84A 100%)',
            minHeight: '620px',
          }}
        >
          {/* Decorative radial overlays */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 15%, rgba(255,255,255,0.25) 0%, transparent 50%), radial-gradient(circle at 75% 85%, rgba(255,255,255,0.15) 0%, transparent 50%)',
            }}
          />

          <div className="relative z-10">
            <Link to="/" className="no-underline">
              <img src="/logo.jpeg" alt="ETERNA" className="h-16 w-auto drop-shadow-lg" />
            </Link>
          </div>

          <div className="relative z-10 space-y-5">
            <h3 className="text-white text-3xl font-serif leading-tight drop-shadow-sm">
              Begin Your Love Story Today
            </h3>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              Join thousands of couples who trust MYOWD for crafting unforgettable
              wedding memory kits that last a lifetime.
            </p>
          </div>

          <div className="relative z-10 space-y-3">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 text-white/90 text-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center backdrop-blur-sm">
                  <f.icon className="w-4 h-4" />
                </div>
                <span>{f.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Right Panel – Signup Form ── */}
        <div className="w-full lg:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          {/* Mobile logo */}
          <div className="lg:hidden mb-6">
            <Link to="/" className="no-underline">
              <h2 className="font-serif text-2xl text-gradient">MYOWD</h2>
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-serif text-soft-black mb-2">Create Account</h1>
            <p className="text-soft-black/50 text-sm">
              Start building your dream wedding kits
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-soft-black/70 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-black/30" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gold/15 bg-warm-white/50 text-soft-black placeholder:text-soft-black/30 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-soft-black/70 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-black/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gold/15 bg-warm-white/50 text-soft-black placeholder:text-soft-black/30 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-soft-black/70 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-black/30" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-gold/15 bg-warm-white/50 text-soft-black placeholder:text-soft-black/30 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-soft-black/30 hover:text-soft-black transition-colors cursor-pointer"
                >
                  {showPw ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-soft-black/70 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-black/30" />
                <input
                  type="password"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  placeholder="Repeat password"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gold/15 bg-warm-white/50 text-soft-black placeholder:text-soft-black/30 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all"
                />
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 text-sm cursor-pointer">
              <input
                type="checkbox"
                required
                className="rounded border-gold/15 text-gold focus:ring-gold/10 mt-0.5 accent-[#D4AF37]"
              />
              <span className="text-soft-black/50 leading-snug">
                I agree to the{' '}
                <Link to="/terms" className="text-gold no-underline hover:text-gold-dark transition-colors">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-gold no-underline hover:text-gold-dark transition-colors">
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="auth-btn-gold w-full py-3 rounded-xl text-white font-medium cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account…
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gold/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white/60 backdrop-blur-sm px-4 text-soft-black/40">
                or continue with
              </span>
            </div>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl border border-gold/15 hover:border-gold/30 bg-white/50 hover:bg-white/80 transition-all disabled:opacity-50 cursor-pointer"
          >
            <FcGoogle className="w-5 h-5" />
            <span className="font-medium text-sm text-soft-black/70">
              Continue with Google
            </span>
          </button>

          <p className="text-center text-sm text-soft-black/50 mt-5">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-gold font-medium hover:text-gold-dark no-underline transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
