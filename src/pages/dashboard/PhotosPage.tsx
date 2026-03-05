import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiTrash, HiUpload } from 'react-icons/hi';
import toast from 'react-hot-toast';

const demoPhotos = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=300',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300',
  'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=300',
  'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=300',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300',
];

export default function PhotosPage() {
  const [photos, setPhotos] = useState(demoPhotos);

  const handleDelete = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    toast.success('Photo removed');
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl mb-1">My Photos</h1>
            <p className="text-sm text-soft-black/50">{photos.length} photos uploaded</p>
          </div>
          <button className="btn-primary text-sm inline-flex items-center gap-2">
            <HiUpload className="w-4 h-4" /> Upload
          </button>
        </div>

        {photos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="relative group rounded-xl overflow-hidden aspect-square"
              >
                <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(i)}
                    className="opacity-0 group-hover:opacity-100 p-2 bg-white rounded-full text-red-500 hover:bg-red-50 transition-all"
                  >
                    <HiTrash className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(247,221,226,0.2))' }}>
              <span className="text-3xl">📸</span>
            </div>
            <h3 className="font-serif text-xl mb-2">No photos yet</h3>
            <p className="text-soft-black/50 mb-6">Upload your favorite memories!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
