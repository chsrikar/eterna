import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import ProductCard from '../../components/ui/ProductCard';
import { sampleProducts } from '../../data/sampleData';

export default function WeddingKitsPage() {
  const products = sampleProducts.filter((p) => p.category === 'wedding-memory-kit');

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600"
            alt="Wedding Memory Kits"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <p className="text-gold font-semibold text-xs uppercase tracking-[0.3em] mb-4">✦ Collection ✦</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Wedding Memory Kits
            </h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Capture every precious moment of your wedding journey with our beautifully curated memory kits. Each kit is handcrafted with premium materials and customizable to tell your unique love story.
            </p>
            <Link to="/kit-builder" className="btn-primary inline-flex items-center gap-2 no-underline">
              Build Custom Kit <HiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
