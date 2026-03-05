import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiArrowRight, HiCheck, HiShoppingCart } from 'react-icons/hi';
import toast from 'react-hot-toast';
import Stepper from '../../components/ui/Stepper';
import PhotoUploader from '../../components/ui/PhotoUploader';
import { useKitBuilderStore } from '../../store/kitBuilderStore';
import { useCartStore } from '../../store/cartStore';
import { sampleAddOns, sampleTemplates, sampleColorThemes, samplePackaging } from '../../data/sampleData';
import type { ProductCategory, Product } from '../../types';

const steps = [
  'Kit Type',
  'Template',
  'Add-ons',
  'Photos',
  'Message',
  'Packaging',
  'Review',
  'Complete',
];

const kitTypes: { id: ProductCategory; title: string; desc: string; image: string }[] = [
  {
    id: 'wedding-memory-kit',
    title: 'Wedding Memory Kit',
    desc: 'Preserve your most cherished wedding moments',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
  },
  {
    id: 'pre-wedding-journal',
    title: 'Pre-Wedding Journal',
    desc: 'Document every step of your wedding journey',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=400',
  },
  {
    id: 'couple-kit',
    title: 'Couple Kit',
    desc: 'Celebrate your love story together',
    image: 'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=400',
  },
  {
    id: 'self-love-kit',
    title: 'Self-Love Kit',
    desc: 'A gift of self-care and self-celebration',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
];

export default function KitBuilderPage() {
  const navigate = useNavigate();
  const store = useKitBuilderStore();
  const addToCart = useCartStore((s) => s.addItem);
  const [coupleName1, setCoupleName1] = useState('');
  const [coupleName2, setCoupleName2] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');

  const canNext = (): boolean => {
    switch (store.currentStep) {
      case 0:
        return !!store.config.kitType;
      case 1:
        return !!store.config.template;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (store.currentStep < steps.length - 1) {
      store.setStep(store.currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (store.currentStep > 0) {
      store.setStep(store.currentStep - 1);
    }
  };

  const handleAddToCart = () => {
    const price = store.calculatePrice();
    const kitInfo = kitTypes.find((k) => k.id === store.config.kitType);
    const product: Product = {
      id: `custom-kit-${Date.now()}`,
      title: `Custom ${kitInfo?.title || 'Kit'}`,
      description: 'Custom built kit',
      price,
      images: [kitInfo?.image || ''],
      category: store.config.kitType || 'wedding-memory-kit',
      addOns: [],
      stock: 1,
      rating: 5,
      reviewCount: 0,
      tags: ['custom'],
      whatsInside: [],
      featured: false,
      bestSeller: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addToCart(product, 1, store.config.addOns, {
      coupleName1,
      coupleName2,
      weddingDate,
      personalNote: personalMessage,
      template: store.config.template,
      colorTheme: store.config.colorTheme,
      packagingStyle: store.config.packagingStyle,
      photos: store.config.photos,
    });
    toast.success('Custom kit added to cart!');
    navigate('/cart');
  };

  const renderStep = () => {
    switch (store.currentStep) {
      case 0:
        return <StepKitType />;
      case 1:
        return <StepTemplate />;
      case 2:
        return <StepAddOns />;
      case 3:
        return <StepPhotos />;
      case 4:
        return <StepMessage />;
      case 5:
        return <StepPackaging />;
      case 6:
        return <StepReview />;
      case 7:
        return <StepComplete />;
      default:
        return null;
    }
  };

  function StepKitType() {
    return (
      <div>
        <h2 className="font-serif text-2xl mb-2">Choose Your Kit Type</h2>
        <p className="text-soft-black/60 mb-8">Select the type of memory kit you'd like to create.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {kitTypes.map((kit) => (
            <motion.button
              key={kit.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => store.setKitType(kit.id)}
              className={`relative overflow-hidden rounded-2xl border-2 text-left transition-all ${
                store.config.kitType === kit.id
                  ? 'border-gold ring-2 ring-gold/20'
                  : 'border-gold/15 hover:border-gold/40'
              }`}
            >
              <img src={kit.image} alt={kit.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-serif text-lg mb-1">{kit.title}</h3>
                <p className="text-sm text-soft-black/60">{kit.desc}</p>
              </div>
              {store.config.kitType === kit.id && (
                <div className="absolute top-3 right-3 w-7 h-7 bg-gold rounded-full flex items-center justify-center">
                  <HiCheck className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  function StepTemplate() {
    return (
      <div>
        <h2 className="font-serif text-2xl mb-2">Choose a Template</h2>
        <p className="text-soft-black/60 mb-8">Pick a design that matches your style.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {sampleTemplates.map((tpl) => (
            <motion.button
              key={tpl.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => store.setTemplate(tpl.id)}
              className={`rounded-xl border-2 p-3 text-left transition-all ${
                store.config.template === tpl.id
                  ? 'border-gold ring-2 ring-gold/20'
                  : 'border-gold/15 hover:border-gold/40'
              }`}
            >
              <img src={tpl.preview} alt={tpl.name} className="w-full h-24 object-cover rounded-lg mb-3" />
              <h3 className="font-medium text-sm">{tpl.name}</h3>
              <p className="text-xs text-soft-black/50">{tpl.category}</p>
            </motion.button>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="font-serif text-xl mb-4">Color Theme</h3>
          <div className="flex flex-wrap gap-3">
            {sampleColorThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => store.setColorTheme(theme.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
                  store.config.colorTheme === theme.id
                    ? 'border-gold bg-gold/5'
                    : 'border-gold/15 hover:border-gold/30'
                }`}
              >
                <div className="flex -space-x-1">
                  {theme.colors.slice(0, 3).map((c, i) => (
                    <div key={i} className="w-5 h-5 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <span className="text-sm font-medium">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function StepAddOns() {
    return (
      <div>
        <h2 className="font-serif text-2xl mb-2">Select Add-ons</h2>
        <p className="text-soft-black/60 mb-8">Enhance your kit with premium extras.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sampleAddOns.map((addon) => {
            const selected = store.config.addOns.some((a) => a.id === addon.id);
            return (
              <motion.button
                key={addon.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => store.toggleAddOn(addon)}
                className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                  selected ? 'border-gold bg-gold/5' : 'border-gold/15 hover:border-gold/30'
                }`}
              >
                <img src={addon.image} alt={addon.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-medium text-sm">{addon.name}</h3>
                    <span className="text-gold-dark font-semibold text-sm whitespace-nowrap">₹{addon.price}</span>
                  </div>
                  <p className="text-xs text-soft-black/60">{addon.description}</p>
                </div>
                <div
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                    selected ? 'bg-gold border-gold' : 'border-soft-black/20'
                  }`}
                >
                  {selected && <HiCheck className="w-4 h-4 text-white" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  function StepPhotos() {
    return (
      <div>
        <h2 className="font-serif text-2xl mb-2">Upload Your Photos</h2>
        <p className="text-soft-black/60 mb-8">
          Add up to 20 of your favorite photos to include in your kit. ({store.config.photos.length}/20)
        </p>
        <PhotoUploader
          photos={store.config.photos}
          onPhotosChange={(photos) => store.setPhotos(photos)}
          maxPhotos={20}
        />
      </div>
    );
  }

  function StepMessage() {
    return (
      <div>
        <h2 className="font-serif text-2xl mb-2">Personalize Your Kit</h2>
        <p className="text-soft-black/60 mb-8">Add personal details to make your kit truly unique.</p>

        <div className="space-y-6 max-w-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Partner 1 Name</label>
              <input
                type="text"
                value={coupleName1}
                onChange={(e) => setCoupleName1(e.target.value)}
                placeholder="e.g. Rahul"
                className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Partner 2 Name</label>
              <input
                type="text"
                value={coupleName2}
                onChange={(e) => setCoupleName2(e.target.value)}
                placeholder="e.g. Priya"
                className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Special Date</label>
            <input
              type="date"
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Personal Message</label>
            <textarea
              value={personalMessage}
              onChange={(e) => setPersonalMessage(e.target.value)}
              rows={4}
              maxLength={500}
              placeholder="Write a heartfelt message that will be included in your kit..."
              className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all resize-none"
            />
            <p className="text-xs text-soft-black/40 mt-1">{personalMessage.length}/500 characters</p>
          </div>
        </div>
      </div>
    );
  }

  function StepPackaging() {
    return (
      <div>
        <h2 className="font-serif text-2xl mb-2">Choose Packaging</h2>
        <p className="text-soft-black/60 mb-8">Select how you want your kit wrapped and presented.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {samplePackaging.map((pkg) => (
            <motion.button
              key={pkg.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => store.setPackagingStyle(pkg.id)}
              className={`p-5 rounded-xl border-2 text-left transition-all ${
                store.config.packagingStyle === pkg.id
                  ? 'border-gold ring-2 ring-gold/20 bg-gold/5'
                  : 'border-gold/15 hover:border-gold/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-lg">{pkg.name}</h3>
                {pkg.price > 0 ? (
                  <span className="text-gold-dark font-semibold">+₹{pkg.price}</span>
                ) : (
                  <span className="text-sage font-semibold">Free</span>
                )}
              </div>
              <p className="text-sm text-soft-black/60">{pkg.name}</p>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  function StepReview() {
    const price = store.calculatePrice();
    const template = sampleTemplates.find((t) => t.id === store.config.template);
    const colorTheme = sampleColorThemes.find((t) => t.id === store.config.colorTheme);
    const packaging = samplePackaging.find((p) => p.id === store.config.packagingStyle);
    const kitType = kitTypes.find((k) => k.id === store.config.kitType);

    return (
      <div>
        <h2 className="font-serif text-2xl mb-2">Review Your Kit</h2>
        <p className="text-soft-black/60 mb-8">Make sure everything looks perfect before adding to cart.</p>

        <div className="space-y-6 max-w-2xl">
          <div className="card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-soft-black/60">Kit Type</span>
              <span className="font-medium">{kitType?.title || '—'}</span>
            </div>
            <div className="border-t border-gold/10" />
            <div className="flex justify-between items-center">
              <span className="text-soft-black/60">Template</span>
              <span className="font-medium">{template?.name || '—'}</span>
            </div>
            <div className="border-t border-gold/10" />
            <div className="flex justify-between items-center">
              <span className="text-soft-black/60">Color Theme</span>
              <span className="font-medium">{colorTheme?.name || '—'}</span>
            </div>
            <div className="border-t border-gold/10" />
            <div className="flex justify-between items-center">
              <span className="text-soft-black/60">Photos</span>
              <span className="font-medium">{store.config.photos.length} photos</span>
            </div>
            <div className="border-t border-gold/10" />
            <div className="flex justify-between items-center">
              <span className="text-soft-black/60">Add-ons</span>
              <span className="font-medium">{store.config.addOns.length} selected</span>
            </div>
            <div className="border-t border-gold/10" />
            <div className="flex justify-between items-center">
              <span className="text-soft-black/60">Packaging</span>
              <span className="font-medium">{packaging?.name || 'Standard'}</span>
            </div>
            {coupleName1 && (
              <>
                <div className="border-t border-gold/10" />
                <div className="flex justify-between items-center">
                  <span className="text-soft-black/60">Names</span>
                  <span className="font-medium">
                    {coupleName1} {coupleName2 ? `& ${coupleName2}` : ''}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="card p-6">
            <div className="flex justify-between items-center text-xl">
              <span className="font-serif">Total Price</span>
              <span className="text-gold-dark font-bold">₹{price.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function StepComplete() {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(247,221,226,0.2))' }}
        >
          <HiCheck className="w-10 h-10 text-gold" />
        </motion.div>
        <h2 className="font-serif text-3xl mb-3">Your Kit is Ready!</h2>
        <p className="text-soft-black/60 mb-8 max-w-md mx-auto">
          Your custom memory kit has been configured. Add it to your cart to complete your order.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={handleAddToCart} className="btn-primary inline-flex items-center gap-2">
            <HiShoppingCart className="w-5 h-5" /> Add to Cart
          </button>
          <button onClick={() => store.reset()} className="btn-secondary">
            Build Another Kit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-gold/10 to-lavender/20 py-12 sm:py-16">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl mb-3">Build Your Custom Kit</h1>
            <p className="text-soft-black/60">Create something uniquely yours in just a few steps</p>
          </motion.div>
          <Stepper steps={steps} currentStep={store.currentStep} />
        </div>
      </section>

      {/* Step Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={store.currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Navigation */}
      {store.currentStep < steps.length - 1 && (
        <div className="sticky bottom-0 bg-white/80 backdrop-blur-lg border-t border-gold/10 py-4">
          <div className="container-custom flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={store.currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gold/15 text-soft-black/60 hover:border-gold/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <HiArrowLeft className="w-4 h-4" /> Back
            </button>

            <div className="text-sm text-soft-black/40">
              Step {store.currentStep + 1} of {steps.length}
            </div>

            <button
              onClick={handleNext}
              disabled={!canNext()}
              className="btn-primary flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {store.currentStep === steps.length - 2 ? 'Finish' : 'Next'} <HiArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
