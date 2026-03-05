import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div>
      <section className="gradient-hero py-12 sm:py-16 text-center">
        <div className="container-custom">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl sm:text-5xl text-soft-black mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-soft-black/60 text-lg max-w-2xl mx-auto"
          >
            We'd love to hear from you. Whether it's a question, feedback, or a custom request — we're here to help!
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { icon: HiOutlineMail, label: 'Email Us', value: 'hello@eterna.in', href: 'mailto:hello@eterna.in' },
                { icon: HiOutlinePhone, label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210' },
                { icon: HiOutlineLocationMarker, label: 'Visit Us', value: 'Mumbai, Maharashtra, India', href: '#' },
              ].map(({ icon: Icon, label, value, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gold/10 no-underline hover:shadow-lg transition-shadow"
                  style={{ boxShadow: '0 4px 20px rgba(212,175,55,0.06)' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(247,221,226,0.15))' }}>
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-soft-black text-sm">{label}</p>
                    <p className="text-muted text-sm">{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gold/10 space-y-5"
              style={{ boxShadow: '0 4px 20px rgba(212,175,55,0.06)' }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-soft-black mb-1.5 block">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-soft-black mb-1.5 block">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-soft-black mb-1.5 block">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-colors"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-soft-black mb-1.5 block">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-colors resize-none"
                  placeholder="Tell us more..."
                />
              </div>
              <button type="submit" className="btn-primary">
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}
