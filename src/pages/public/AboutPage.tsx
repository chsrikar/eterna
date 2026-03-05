import { motion } from 'framer-motion';
import { HiOutlineHeart, HiOutlineSparkles, HiOutlineStar } from 'react-icons/hi';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero section-padding text-center">
        <div className="container-custom">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold font-semibold text-xs uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-2"
          >
            <span>✨</span> Just Launched <span>✨</span>
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl text-soft-black max-w-3xl mx-auto mb-6"
          >
            A New Journey Begins - Join Us!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-soft-black/60 text-lg max-w-2xl mx-auto"
          >
            ETERNA just launched with a simple mission: to help you preserve life's most beautiful 
            moments with handcrafted memory kits. <span className="text-gold-dark font-semibold">Be part of our story from day one!</span>
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=500&fit=crop"
                alt="Our workshop"
                className="rounded-2xl shadow-lg w-full object-cover"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl text-soft-black mb-6">
                Fresh Start, Big Dreams
              </h2>
              <div className="space-y-4 text-soft-black/60 leading-relaxed">
                <p>
                  <span className="text-gold-dark font-semibold">🎉 We just launched!</span> ETERNA is a brand-new venture 
                  born from two friends' passion for making wedding memories more meaningful than just a photo album.
                </p>
                <p>
                  Each kit we create is handcrafted with premium materials, thoughtful design, and genuine care. 
                  From the texture of our papers to the colors of our ribbons, every element is chosen with intention 
                  to make your memories last forever.
                </p>
                <p>
                  We're at the very beginning of our journey, and we're looking for our first customers to help us 
                  grow! <span className="text-gold-dark font-semibold">Join us early and get exclusive launch pricing</span> 
                  — 30% off as a thank you for being part of our story from day one.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, #FFFDF8, #FFF0F3 50%, #FFFDF8)' }}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-gold font-semibold text-xs uppercase tracking-[0.3em] mb-3">✦ Values ✦</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-soft-black">Our Values</h2>
            <div className="w-12 h-0.5 mx-auto mt-4" style={{ background: 'linear-gradient(90deg, #D4AF37, #F5E6A3)' }} />
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <HiOutlineHeart className="w-8 h-8 text-gold" />,
                title: 'Made with Love',
                desc: 'Every kit is handcrafted by artisans who pour love into every detail.',
              },
              {
                icon: <HiOutlineSparkles className="w-8 h-8 text-gold" />,
                title: 'Premium Quality',
                desc: 'We use only the finest materials to ensure lasting memories.',
              },
              {
                icon: <HiOutlineStar className="w-8 h-8 text-gold" />,
                title: 'Truly Personal',
                desc: 'Your kit is uniquely yours — customized to tell your story.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center border border-gold/10 hover:shadow-lg transition-shadow"
                style={{ boxShadow: '0 4px 20px rgba(212,175,55,0.06)' }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(247,221,226,0.2))' }}>
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg text-soft-black mb-2">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
