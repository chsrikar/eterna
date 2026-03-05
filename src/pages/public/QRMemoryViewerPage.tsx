import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { HiHeart, HiPhotograph, HiChevronLeft, HiChevronRight, HiX, HiPlay, HiLockClosed } from 'react-icons/hi';

const demoMemory = {
  id: 'mem-abc123',
  coupleName: 'Rahul & Priya',
  date: '2024-12-15',
  message: 'Every love story is beautiful, but ours is my favorite. Thank you for making every moment magical. Here\'s to a lifetime of memories together! 💕',
  photos: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=800',
    'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
  ],
  bgMusic: null,
  isPasswordProtected: false,
};

export default function QRMemoryViewerPage() {
  const { id } = useParams();
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(!demoMemory.isPasswordProtected);
  const [password, setPassword] = useState('');
  const [slideshow, setSlideshow] = useState(false);

  const memory = demoMemory; // In production, fetch by id

  const nextPhoto = () => setCurrentPhoto((prev) => (prev + 1) % memory.photos.length);
  const prevPhoto = () => setCurrentPhoto((prev) => (prev - 1 + memory.photos.length) % memory.photos.length);

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #FFF0F3, #FFFDF8, #FFF0F3)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-8 max-w-sm w-full text-center"
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(247,221,226,0.2))' }}>
            <HiLockClosed className="w-8 h-8 text-gold" />
          </div>
          <h2 className="font-serif text-2xl mb-2">Private Memory</h2>
          <p className="text-soft-black/60 text-sm mb-6">Enter the password to view this memory.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsUnlocked(true);
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl border border-gold/15 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none text-center"
            />
            <button type="submit" className="btn-primary w-full">Unlock</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FFF0F3, #FFFDF8, #FFF0F3)' }}>
      {/* Header */}
      <section className="py-12 sm:py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container-custom">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HiHeart className="w-6 h-6 text-gold" />
            <span className="text-xs uppercase tracking-widest text-soft-black/40">Memory • {id || memory.id}</span>
            <HiHeart className="w-6 h-6 text-gold" />
          </div>
          <h1 className="font-script text-4xl sm:text-5xl lg:text-6xl text-gradient-gold mb-4">
            {memory.coupleName}
          </h1>
          <p className="text-soft-black/50 text-sm">{memory.date}</p>
        </motion.div>
      </section>

      {/* Personal Message */}
      {memory.message && (
        <section className="pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="container-custom max-w-2xl"
          >
            <div className="card p-8 text-center glass">
              <p className="font-script text-3xl text-gold mb-4">"</p>
              <p className="text-soft-black/70 leading-relaxed italic">{memory.message}</p>
              <p className="font-script text-3xl text-gold mt-4">"</p>
            </div>
          </motion.div>
        </section>
      )}

      {/* Featured Photo */}
      <section className="pb-8">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => setLightboxOpen(true)}
          >
            <img
              src={memory.photos[currentPhoto]}
              alt={`Memory ${currentPhoto + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-between px-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevPhoto();
                }}
                className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <HiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
                }}
                className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <HiChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSlideshow(!slideshow);
                }}
                className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1"
              >
                <HiPlay className="w-3 h-3" /> {slideshow ? 'Stop' : 'Slideshow'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="pb-16">
        <div className="container-custom max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <HiPhotograph className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-xl">All Photos ({memory.photos.length})</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
            {memory.photos.map((photo, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                onClick={() => {
                  setCurrentPhoto(i);
                  setLightboxOpen(true);
                }}
                className={`aspect-square rounded-xl overflow-hidden ring-2 transition-all ${
                  currentPhoto === i ? 'ring-gold ring-offset-2' : 'ring-transparent'
                }`}
              >
                <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center py-8 border-t border-gold/10">
        <p className="text-sm text-soft-black/40">
          Made with <HiHeart className="inline w-4 h-4 text-gold" /> by{' '}
          <a href="/" className="text-gold hover:underline">MYOWD</a>
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 z-10"
            >
              <HiX className="w-5 h-5" />
            </button>
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20"
            >
              <HiChevronLeft className="w-6 h-6" />
            </button>
            <motion.img
              key={currentPhoto}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              src={memory.photos[currentPhoto]}
              alt=""
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            />
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20"
            >
              <HiChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {currentPhoto + 1} / {memory.photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
