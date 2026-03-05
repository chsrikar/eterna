import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineUser,
  HiOutlineSearch,
  HiX,
} from 'react-icons/hi';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import StaggeredMenu from '../ui/StaggeredMenu';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Shop', ariaLabel: 'Browse all products', link: '/shop' },
  { label: 'Wedding', ariaLabel: 'Wedding memory kits', link: '/wedding-kits' },
  { label: 'Couples', ariaLabel: 'Couple kits', link: '/couple-kits' },
  { label: 'Self-Love', ariaLabel: 'Self-love kits', link: '/self-love-kits' },
  { label: 'Build Kit', ariaLabel: 'Build your own kit', link: '/kit-builder' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Blog', ariaLabel: 'Read our blog', link: '/blog' },
  { label: 'FAQ', ariaLabel: 'Frequently asked questions', link: '/faq' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
];

const socialItems = [
  { label: 'Instagram', link: 'https://instagram.com' },
  { label: 'Pinterest', link: 'https://pinterest.com' },
  { label: 'Facebook', link: 'https://facebook.com' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [promoClosed, setPromoClosed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const itemCount = useCartStore((s) => s.getItemCount());
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
  }, [location.pathname]);

  const showPromo = !promoClosed && !scrolled;

  return (
    <>
      {/* ─── Announcement / Promo Bar ─── */}
      <AnimatePresence>
        {showPromo && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed top-0 left-0 right-0 z-[70] text-white/90 text-xs sm:text-sm text-center py-2.5 px-4"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #B8941F)' }}
          >
            <span className="tracking-wide">
              🎉 <strong>GRAND OPENING!</strong> Get <strong>30% OFF</strong> your first order &mdash; Use code: <strong className="text-white bg-black/20 px-2 py-0.5 rounded">LAUNCH30</strong>{' '}
              <span className="hidden sm:inline text-white/75"> | Limited Time Only!</span>
            </span>
            <span className="hidden sm:inline text-white ml-2">✦</span>
            <button
              onClick={() => setPromoClosed(true)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors bg-transparent border-none text-white/60 hover:text-white cursor-pointer"
              aria-label="Close announcement"
            >
              <HiX className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Main Navigation Bar ─── */}
      <motion.nav
        className={`fixed left-0 right-0 z-[55] transition-all duration-500 ${
          scrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_2px_30px_rgba(212,175,55,0.08)]' : 'bg-transparent'
        } ${showPromo ? 'top-[32px]' : 'top-0'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-2.5 no-underline group shrink-0">
              <img src="/logo.jpeg" alt="ETERNA" className="h-12 lg:h-14 w-auto" />
            </Link>

            {/* ── Right spacer — StaggeredMenu toggle sits here via fixed positioning ── */}
            <div className="w-20" />
          </div>
        </div>
      </motion.nav>

      {/* ─── StaggeredMenu (hamburger + animated panel with actions inside) ─── */}
      <div className="fixed inset-0 z-[60] pointer-events-none myowd-staggered-wrap" key={location.pathname}>
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering={true}
          menuButtonColor={scrolled ? '#2d2d2d' : '#2d2d2d'}
          openMenuButtonColor="#2d2d2d"
          changeMenuColorOnOpen={true}
          colors={['#FFF0F3', '#F7DDE2', '#F5E6A3']}
          accentColor="#D4AF37"
          isFixed
          className="myowd-menu"
        >
          {/* Action links inside the menu panel */}
          <div className="sm-action-links">
            <button
              type="button"
              className="sm-action-link"
              onClick={() => setSearchOpen(true)}
              style={{ border: 'none', cursor: 'pointer' }}
            >
              <HiOutlineSearch className="w-4 h-4" />
              Search
            </button>

            <Link
              to={isAuthenticated ? '/dashboard/wishlist' : '/login'}
              className="sm-action-link"
            >
              <HiOutlineHeart className="w-4 h-4" />
              Wishlist
            </Link>

            <Link to="/cart" className="sm-action-link">
              <HiOutlineShoppingBag className="w-4 h-4" />
              Cart
              {itemCount > 0 && (
                <span className="sm-action-badge">{itemCount > 9 ? '9+' : itemCount}</span>
              )}
            </Link>

            <Link
              to={isAuthenticated ? '/dashboard' : '/login'}
              className="sm-action-link"
            >
              <HiOutlineUser className="w-4 h-4" />
              Account
            </Link>
          </div>
        </StaggeredMenu>
      </div>

      {/* ─── Search Overlay ─── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-24 sm:pt-32 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl w-full max-w-xl p-1.5 relative border border-gold/15"
              style={{ boxShadow: '0 25px 60px rgba(212,175,55,0.12), 0 8px 20px rgba(0,0,0,0.08)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-4">
                <HiOutlineSearch className="w-5 h-5 text-muted shrink-0" />
                <input
                  type="text"
                  placeholder="Search kits, journals, gifts..."
                  autoFocus
                  className="flex-1 py-4 text-base text-soft-black placeholder:text-muted/60 bg-transparent border-none outline-none"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 rounded-full hover:bg-cream transition-colors bg-transparent border-none cursor-pointer text-muted hover:text-soft-black"
                  aria-label="Close search"
                >
                  <HiX className="w-4 h-4" />
                </button>
              </div>
              <div className="border-t border-gold/15 px-5 py-3">
                <p className="text-xs text-gold-dark mb-2 font-medium uppercase tracking-wider">Popular</p>
                <div className="flex flex-wrap gap-2">
                  {['Wedding Kit', 'Memory Journal', 'Couple Kit', 'Self-Love Box'].map((term) => (
                    <Link
                      key={term}
                      to={`/shop?q=${encodeURIComponent(term)}`}
                      onClick={() => setSearchOpen(false)}
                      className="text-xs px-3 py-1.5 rounded-full bg-baby-pink/40 hover:bg-gold/15 transition-colors text-soft-black/70 hover:text-gold-dark no-underline border border-gold/10"
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
