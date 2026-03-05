import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineAdjustments, HiOutlineX } from 'react-icons/hi';
import ProductCard from '../../components/ui/ProductCard';
import { sampleProducts, categoryInfo } from '../../data/sampleData';
import type { ProductCategory, ProductFilters } from '../../types';

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Best Rating', value: 'rating' },
  { label: 'Best Selling', value: 'best-selling' },
];

const categoryOptions: { label: string; value: ProductCategory | '' }[] = [
  { label: 'All Products', value: '' },
  { label: 'Wedding Memory Kits', value: 'wedding-memory-kit' },
  { label: 'Pre-Wedding Journals', value: 'pre-wedding-journal' },
  { label: 'Couple Kits', value: 'couple-kit' },
  { label: 'Self-Love Kits', value: 'self-love-kit' },
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({
    category: (searchParams.get('category') as ProductCategory) || undefined,
    sortBy: 'newest',
    priceRange: [0, 10000],
  });

  const filteredProducts = useMemo(() => {
    let result = [...sampleProducts];

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.priceRange) {
      result = result.filter(
        (p) => p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1]
      );
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'best-selling':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [filters]);

  return (
    <div>
      {/* Header */}
      <section className="gradient-luxury py-12 sm:py-16 relative">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="container-custom text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold font-semibold text-xs uppercase tracking-[0.3em] mb-3"
          >
            ✦ Curated Collection ✦
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-4xl text-soft-black mb-3"
          >
            {filters.category ? categoryInfo[filters.category]?.title : 'Shop All Products'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-soft-black/60 max-w-2xl mx-auto"
          >
            {filters.category
              ? categoryInfo[filters.category]?.description
              : 'Explore our complete collection of handcrafted memory kits and journals.'}
          </motion.p>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-16 lg:top-20 z-20 bg-white/90 backdrop-blur-xl border-b border-gold/10">
        <div className="container-custom py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 text-sm font-medium hover:border-gold hover:text-gold-dark transition-all bg-transparent cursor-pointer"
            >
              <HiOutlineAdjustments className="w-4 h-4" />
              Filters
            </button>
            {/* Category Pills */}
            <div className="hidden md:flex gap-2">
              {categoryOptions.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() =>
                    setFilters((f) => ({ ...f, category: cat.value as ProductCategory | undefined }))
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all border-none cursor-pointer ${
                    (filters.category || '') === cat.value
                      ? 'text-white'
                      : 'bg-baby-pink/30 text-soft-black/60 hover:bg-gold/10 hover:text-gold-dark'
                  }`}
                  style={(filters.category || '') === cat.value ? { background: 'linear-gradient(135deg, #D4AF37, #E8C84A)' } : undefined}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted hidden sm:block">
              {filteredProducts.length} products
            </span>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((f) => ({ ...f, sortBy: e.target.value as ProductFilters['sortBy'] }))
              }
              className="px-4 py-2 rounded-full border border-gold/15 text-sm bg-transparent focus:outline-none focus:border-gold cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Filter Sidebar (Mobile) */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/30" onClick={() => setShowFilters(false)} />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ ease: 'easeOut' }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl p-6 overflow-y-auto border-r border-gold/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-lg">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 rounded-full hover:bg-gray-100 border-none bg-transparent cursor-pointer"
                >
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-soft-black mb-3">Category</h4>
                <div className="space-y-2">
                  {categoryOptions.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() =>
                        setFilters((f) => ({
                          ...f,
                          category: cat.value as ProductCategory | undefined,
                        }))
                      }
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all border-none cursor-pointer ${
                        (filters.category || '') === cat.value
                          ? 'bg-gold/10 text-gold-dark font-medium'
                          : 'text-soft-black/60 hover:bg-baby-pink/20'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-soft-black mb-3">Price Range</h4>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={filters.priceRange?.[1] || 10000}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, priceRange: [0, parseInt(e.target.value)] }))
                  }
                  className="w-full accent-gold"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>₹0</span>
                  <span>₹{(filters.priceRange?.[1] || 10000).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setShowFilters(false)}
                className="btn-primary w-full"
              >
                Apply Filters
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="font-serif text-xl text-soft-black mb-2">No products found</h3>
              <p className="text-muted">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
