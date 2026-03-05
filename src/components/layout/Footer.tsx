import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiOutlineMail } from 'react-icons/hi';
import { FaInstagram, FaPinterest, FaFacebookF, FaYoutube } from 'react-icons/fa';

const footerLinks = {
  Shop: [
    { label: 'Wedding Memory Kits', path: '/wedding-kits' },
    { label: 'Pre-Wedding Journals', path: '/shop?category=pre-wedding-journal' },
    { label: 'Couple Kits', path: '/couple-kits' },
    { label: 'Self-Love Kits', path: '/self-love-kits' },
    { label: 'Build Your Kit', path: '/kit-builder' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
  ],
  Support: [
    { label: 'Track Order', path: '/dashboard/orders' },
    { label: 'Shipping Policy', path: '/faq' },
    { label: 'Return Policy', path: '/faq' },
    { label: 'Privacy Policy', path: '/faq' },
  ],
};

export default function Footer() {
  return (
    <footer>
      {/* Newsletter */}
      <div className="gradient-luxury relative overflow-hidden">
        {/* Decorative gold elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center relative">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-4">🎉 Join Our Launch Journey</p>
          <h3 className="font-serif text-2xl sm:text-3xl text-soft-black mb-3">
            Be Part of Our Story
          </h3>
          <p className="text-soft-black/50 mb-8 max-w-lg mx-auto">
            We just launched! Subscribe now for exclusive early-bird offers, launch updates, and be the first 
            to see our new collections. <span className="text-gold-dark font-semibold">30% OFF for subscribers!</span>
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
              <input
                type="email"
                placeholder="Your email address"
                className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gold/25 bg-white/80 backdrop-blur-sm text-soft-black focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all placeholder:text-muted/50"
              />
            </div>
            <button className="btn-primary whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="bg-soft-black text-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <img src="/logo.jpeg" alt="ETERNA" className="h-16 w-auto mb-4" />
              <p className="text-white/45 text-sm leading-relaxed mb-6">
                Just launched! 🎊 Handcrafted memory kits to preserve life's beautiful moments. Join our journey from day one.
              </p>
              <div className="flex gap-3">
                {[FaInstagram, FaPinterest, FaFacebookF, FaYoutube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center hover:bg-gold/20 hover:text-gold transition-all duration-300 border border-white/5 hover:border-gold/30"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h5 className="text-gold font-semibold mb-4 text-xs uppercase tracking-[0.2em]">
                  {title}
                </h5>
                <ul className="space-y-3 list-none p-0 m-0">
                  {links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-white/45 hover:text-gold text-sm transition-colors no-underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Gold divider */}
          <div className="mt-12 mb-8 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/35 text-sm">
              © 2026 MYOWD. All rights reserved. Made with{' '}
              <HiOutlineHeart className="inline w-4 h-4 text-gold" /> in India.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/35 hover:text-gold text-sm transition-colors no-underline">
                Terms
              </a>
              <a href="#" className="text-white/35 hover:text-gold text-sm transition-colors no-underline">
                Privacy
              </a>
              <a href="#" className="text-white/35 hover:text-gold text-sm transition-colors no-underline">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
