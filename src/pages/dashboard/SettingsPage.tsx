import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiCamera, HiSave } from 'react-icons/hi';
import { useAuthStore } from '../../store/authStore';

export default function SettingsPage() {
  const { user, updateProfile } = useAuthStore();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [address, setAddress] = useState({
    label: 'Home',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    isDefault: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: form.name, phone: form.phone });
    toast.success('Profile updated!');
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-2xl sm:text-3xl mb-6">Settings</h1>

        {/* Profile */}
        <div className="card p-6 mb-6">
          <h2 className="font-serif text-xl mb-4">Profile</h2>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="flex items-center gap-6 mb-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-serif" style={{ background: 'linear-gradient(135deg, #D4AF37, #F5E6A3)' }}>
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border border-gold/15 rounded-full flex items-center justify-center hover:border-gold transition-colors"
                >
                  <HiCamera className="w-4 h-4 text-soft-black/60" />
                </button>
              </div>
              <div>
                <p className="font-medium">{user?.name || 'User'}</p>
                <p className="text-sm text-soft-black/50">{user?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  name="email"
                  value={form.email}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-gold/10 bg-gold/5 text-soft-black/50 cursor-not-allowed"
                />
                <p className="text-xs text-soft-black/40 mt-1">Contact support to change email</p>
              </div>
            </div>

            <button type="submit" className="btn-primary inline-flex items-center gap-2">
              <HiSave className="w-4 h-4" /> Save Changes
            </button>
          </form>
        </div>

        {/* Address */}
        <div className="card p-6 mb-6">
          <h2 className="font-serif text-xl mb-4">Saved Address</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Street Address</label>
              <input
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                placeholder="House No., Street, Locality"
                className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">PIN Code</label>
              <input
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold outline-none"
              />
            </div>
          </div>
          <button
            onClick={() => toast.success('Address saved!')}
            className="btn-secondary mt-4 inline-flex items-center gap-2"
          >
            <HiSave className="w-4 h-4" /> Save Address
          </button>
        </div>

        {/* Danger Zone */}
        <div className="card p-6 border-red-200">
          <h2 className="font-serif text-xl mb-4 text-red-500">Danger Zone</h2>
          <p className="text-sm text-soft-black/60 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            onClick={() => toast.error('This is a demo — account not deleted')}
            className="px-6 py-2.5 rounded-xl border border-red-300 text-red-500 hover:bg-red-50 text-sm transition-colors"
          >
            Delete Account
          </button>
        </div>
      </motion.div>
    </div>
  );
}
