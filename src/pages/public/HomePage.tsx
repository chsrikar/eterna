import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineSparkles,
  HiOutlineHeart,
  HiOutlineGift,
  HiOutlineStar,
  HiArrowRight,
} from 'react-icons/hi';
import ProductCard from '../../components/ui/ProductCard';
// import TestimonialsCarousel from '../../components/ui/TestimonialsCarousel';
import { HoverExpand_001 } from '../../components/ui/HoverExpand';
import { sampleProducts, categoryInfo } from '../../data/sampleData';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function HomePage() {
  const featuredProducts = sampleProducts.filter((p) => p.featured);
  const categories = Object.entries(categoryInfo);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF0F3 0%, #FFFDF8 35%, #F7DDE2 65%, #FFF0F3 100%)' }}>
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl animate-float" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.08), transparent)' }} />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl animate-float-delay" style={{ background: 'radial-gradient(circle, rgba(247,221,226,0.3), transparent)' }} />
        {/* Gold sparkle particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold/40 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-gold/30 rounded-full animate-float-delay" />
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-gold/25 rounded-full animate-float-slow" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="text-gold font-semibold text-xs uppercase tracking-[0.3em] mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                ✨ Just Launched! Now Accepting Orders ✨
              </motion.p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-soft-black leading-tight mb-4">
                Make Your <br />
                <span className="text-gradient-gold">Own Wedding Day</span>
                <br />
                Unforgettable
              </h1>
              {/* Launch Offer Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/15 to-transparent border border-gold/25 rounded-full px-4 py-2 mb-6">
                <span className="animate-pulse text-gold text-xl">●</span>
                <span className="text-soft-black font-semibold text-sm">Grand Opening Special: 30% OFF First Orders!</span>
              </div>
              {/* Gold underline accent */}
              <div className="w-24 h-0.5 mb-6" style={{ background: 'linear-gradient(90deg, #D4AF37, #E8C84A, transparent)' }} />
              <p className="text-soft-black/55 text-lg max-w-lg mb-8 leading-relaxed">
                We're brand new and excited to share our premium customizable memory kits, journals, 
                and gifts with you. <span className="text-gold-dark font-semibold">Be among our first customers</span> and 
                get exclusive launch pricing!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="btn-primary inline-flex items-center gap-2 no-underline">
                  Shop Collection <HiArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/kit-builder" className="btn-secondary inline-flex items-center gap-2 no-underline">
                  <HiOutlineSparkles className="w-4 h-4" /> Build Your Kit
                </Link>
              </div>

              {/* Trust Badges - New Business */}
              <div className="flex flex-wrap gap-8 mt-10 text-sm text-soft-black/45">
                <div className="flex items-center gap-2">
                  <HiOutlineHeart className="w-5 h-5 text-gold" />
                  <span className="font-medium text-gold-dark">Now Accepting Orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineStar className="w-5 h-5 text-gold" />
                  <span>Early Bird Pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineGift className="w-5 h-5 text-gold" />
                  <span>Handmade Quality</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl blur-2xl" style={{ background: 'linear-gradient(135deg, rgba(247,221,226,0.3), rgba(212,175,55,0.1))' }} />
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=700&fit=crop"
                  alt="Wedding Memory Kit"
                  className="relative rounded-3xl w-full object-cover aspect-[4/5]"
                  style={{ boxShadow: '0 25px 60px rgba(212,175,55,0.12), 0 6px 20px rgba(0,0,0,0.06)' }}
                />
                {/* Gold frame border */}
                <div className="absolute inset-0 rounded-3xl border border-gold/15 pointer-events-none" />
                
                {/* Floating Card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-3 border border-gold/15"
                  style={{ boxShadow: '0 10px 30px rgba(212,175,55,0.1)' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.05))' }}>
                    <HiOutlineGift className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-soft-black">30% OFF</p>
                    <p className="text-xs text-gold-dark">Launch Special</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -right-6 bg-gradient-to-br from-gold to-gold-dark text-white backdrop-blur-xl rounded-2xl p-4 border border-gold/15"
                  style={{ boxShadow: '0 10px 30px rgba(212,175,55,0.25)' }}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <p className="text-xs font-bold">Just Launched!</p>
                  <p className="text-xs opacity-90">Be Our First Customer</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Launch Announcement Banner */}
      <section className="relative py-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1E1E1E 0%, #2A2A2A 50%, #1E1E1E 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold-light rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-6 py-2 mb-6"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
              </span>
              <span className="text-gold-light font-semibold text-sm uppercase tracking-wider">Limited Time Launch Offer</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4"
            >
              Get <span className="text-gold">30% OFF</span> Your First Order
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-lg mb-8 max-w-2xl mx-auto"
            >
              We're celebrating our grand opening! Be among our first 100 customers and enjoy exclusive launch pricing. 
              Use code <span className="text-gold font-bold bg-white/10 px-3 py-1 rounded">LAUNCH30</span> at checkout.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/shop" className="btn-primary inline-flex items-center gap-2 no-underline">
                Shop Now <HiArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/kit-builder" className="btn-secondary inline-flex items-center gap-2 no-underline bg-white/10 hover:bg-white/20 border-white/20">
                <HiOutlineSparkles className="w-4 h-4" /> Build Custom Kit
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex items-center justify-center gap-6 text-sm text-white/50"
            >
              <div className="flex items-center gap-2">
                <HiOutlineHeart className="w-4 h-4 text-gold" />
                <span>No minimum order</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineGift className="w-4 h-4 text-gold" />
                <span>Free shipping over ₹999</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.p {...fadeUp} className="text-gold font-semibold text-xs uppercase tracking-[0.3em] mb-3">
              🎊 New Collections Available Now
            </motion.p>
            <motion.h2 {...fadeUp} className="font-serif text-3xl sm:text-4xl text-soft-black">
              Explore Our Categories
            </motion.h2>
            <div className="w-16 h-0.5 mx-auto mt-4" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
            <motion.p {...fadeUp} className="text-muted text-sm mt-4 max-w-xl mx-auto">
              We're excited to introduce our first collection! <span className="text-gold-dark font-semibold">Order now and save 30%</span> as one of our founding customers.
            </motion.p>
          </div>

          {/* Desktop: HoverExpand */}
          <div className="hidden md:flex justify-center">
            <HoverExpand_001
              className="mx-auto"
              images={[
                {
                  src: categoryInfo['wedding-memory-kit'].heroImage,
                  alt: categoryInfo['wedding-memory-kit'].description,
                  code: categoryInfo['wedding-memory-kit'].title,
                  link: '/wedding-kits',
                },
                {
                  src: categoryInfo['pre-wedding-journal'].heroImage,
                  alt: categoryInfo['pre-wedding-journal'].description,
                  code: categoryInfo['pre-wedding-journal'].title,
                  link: '/shop?category=pre-wedding-journal',
                },
                {
                  src: categoryInfo['couple-kit'].heroImage,
                  alt: categoryInfo['couple-kit'].description,
                  code: categoryInfo['couple-kit'].title,
                  link: '/couple-kits',
                },
                {
                  src: categoryInfo['self-love-kit'].heroImage,
                  alt: categoryInfo['self-love-kit'].description,
                  code: categoryInfo['self-love-kit'].title,
                  link: '/self-love-kits',
                },
              ]}
            />
          </div>

          {/* Mobile: Stacked cards */}
          <div className="grid grid-cols-2 gap-4 md:hidden">
            {categories.map(([key, info], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/shop?category=${key}`}
                  className="group block relative rounded-2xl overflow-hidden aspect-[3/4] no-underline border border-gold/10"
                >
                  <img
                    src={info.heroImage}
                    alt={info.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-serif text-base text-white mb-1">{info.title}</h3>
                    <span className="inline-flex items-center gap-1 text-gold-light text-xs font-medium group-hover:gap-2 transition-all">
                      Explore <HiArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, #FFFDF8, #FFF0F3 50%, #FFFDF8)' }}>
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.p {...fadeUp} className="text-gold font-semibold text-xs uppercase tracking-[0.3em] mb-3">
                ⭐ Launch Week Specials
              </motion.p>
              <motion.h2 {...fadeUp} className="font-serif text-3xl sm:text-4xl text-soft-black">
                Featured Products
              </motion.h2>
              <motion.p {...fadeUp} className="text-muted text-sm mt-2">
                All products 30% off for our first customers!
              </motion.p>
            </div>
            <Link to="/shop" className="hidden sm:inline-flex items-center gap-2 text-gold-dark font-medium hover:gap-3 transition-all no-underline hover:text-gold">
              View All <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.slice(0, 3).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.p {...fadeUp} className="text-gold font-semibold text-xs uppercase tracking-[0.3em] mb-3">
              Simple & Delightful
            </motion.p>
            <motion.h2 {...fadeUp} className="font-serif text-3xl sm:text-4xl text-soft-black">
              How It Works
            </motion.h2>
            <div className="w-16 h-0.5 mx-auto mt-4" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Choose Your Kit', desc: 'Pick from our curated collection or build your own custom kit', icon: '🎁' },
              { step: '02', title: 'Customize It', desc: 'Add your names, dates, photos, and personal touches', icon: '✨' },
              { step: '03', title: 'We Handcraft', desc: 'Our artisans carefully assemble your personalized kit', icon: '🎨' },
              { step: '04', title: 'Unbox Joy', desc: 'Receive your beautifully packaged kit at your doorstep', icon: '💝' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center relative group"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <p className="text-gold font-bold text-sm mb-2" style={{ fontFamily: 'var(--font-serif)' }}>{item.step}</p>
                <h3 className="font-serif text-lg text-soft-black mb-2">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                {/* Gold connector */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-px bg-gradient-to-r from-gold/30 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Build Your Kit */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1600"
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(30,30,30,0.85), rgba(30,30,30,0.5), rgba(212,175,55,0.1))' }} />
        </div>
        <div className="container-custom relative z-10 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-gold font-semibold text-xs uppercase tracking-[0.3em] mb-4">
              ✨ New Feature Just Launched
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl text-white leading-tight mb-6">
              Build Your Own Memory Kit
            </h2>
            <div className="w-20 h-0.5 mb-6" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
            <div className="bg-gold/20 border border-gold/30 rounded-lg p-4 mb-6 inline-block">
              <p className="text-white font-semibold">🎁 Early Access Bonus: Get an extra gift with custom kit orders!</p>
            </div>
            <p className="text-white/65 text-lg mb-8 leading-relaxed">
              Design a perfectly personalized kit with our step-by-step builder. Choose templates,
              add-ons, upload photos, and create something truly one-of-a-kind. <span className="text-gold-light">Be one of the first to try it!</span>
            </p>
            <Link
              to="/kit-builder"
              className="btn-primary inline-flex items-center gap-2 text-lg no-underline"
            >
              Start Building <HiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials - Commented out for now, can be added back later */}
      {/* <TestimonialsCarousel /> */}

      {/* Instagram / Gallery */}
      <section className="section-padding bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.p {...fadeUp} className="text-gold font-semibold text-xs uppercase tracking-[0.3em] mb-3">
              @eterna.gifting
            </motion.p>
            <motion.h2 {...fadeUp} className="font-serif text-3xl sm:text-4xl text-soft-black">
              Join Our Journey from Day One
            </motion.h2>
            <div className="w-16 h-0.5 mx-auto mt-4" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
            <motion.p {...fadeUp} className="text-muted text-sm mt-4">
              We're just getting started! Follow us on Instagram for exclusive behind-the-scenes content and <span className="text-gold-dark font-semibold">special offers for our early supporters</span>.
            </motion.p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=300&h=300&fit=crop',
            ].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="aspect-square rounded-xl overflow-hidden group cursor-pointer border border-gold/8 hover:border-gold/25 transition-all duration-500"
                style={{ boxShadow: '0 2px 10px rgba(212,175,55,0.04)' }}
              >
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
