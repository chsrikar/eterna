import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlinePhotograph, HiOutlineX } from 'react-icons/hi';

interface Props {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  maxPhotos?: number;
}

export default function PhotoUploader({ photos, onPhotosChange, maxPhotos = 20 }: Props) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const remaining = maxPhotos - photos.length;
      const filesToProcess = acceptedFiles.slice(0, remaining);

      filesToProcess.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          onPhotosChange([...photos, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    },
    [photos, onPhotosChange, maxPhotos]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: maxPhotos - photos.length,
    disabled: photos.length >= maxPhotos,
  });

  const removePhoto = (index: number) => {
    onPhotosChange(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
          isDragActive
            ? 'border-gold bg-gold/5'
            : photos.length >= maxPhotos
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
            : 'border-cream-dark hover:border-gold/50 hover:bg-cream/30'
        }`}
      >
        <input {...getInputProps()} />
        <HiOutlinePhotograph className="w-12 h-12 text-muted mx-auto mb-3" />
        {photos.length >= maxPhotos ? (
          <p className="text-muted">Maximum {maxPhotos} photos reached</p>
        ) : isDragActive ? (
          <p className="text-gold font-medium">Drop your photos here...</p>
        ) : (
          <>
            <p className="text-soft-black font-medium mb-1">
              Drag & drop photos here, or click to browse
            </p>
            <p className="text-muted text-sm">
              {photos.length}/{maxPhotos} photos • JPG, PNG, WebP
            </p>
          </>
        )}
      </div>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          <AnimatePresence>
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <img
                  src={photo}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border-none cursor-pointer"
                >
                  <HiOutlineX className="w-3 h-3" />
                </button>
                <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                  {index + 1}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
