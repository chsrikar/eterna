import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  className?: string;
  children: React.ReactNode;
}

interface AvatarImageProps {
  src: string;
  alt: string;
  className?: string;
}

interface AvatarFallbackProps {
  children: React.ReactNode;
  className?: string;
}

export function Avatar({ className, children }: AvatarProps) {
  return (
    <span
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function AvatarImage({ src, alt, className }: AvatarImageProps) {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={cn('aspect-square h-full w-full object-cover', className)}
    />
  );
}

export function AvatarFallback({ children, className }: AvatarFallbackProps) {
  return (
    <span
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-cream text-soft-black/60 text-sm font-medium',
        className,
      )}
    >
      {children}
    </span>
  );
}
