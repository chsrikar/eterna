import { useEffect, useState, useMemo } from 'react';

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

const PETAL_COLORS = ['#f8d7da', '#e6d5f7', '#fef9ef', '#e8919c', '#b794d6'];

export default function FloatingPetals() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const check = () => setVisible(window.innerWidth > 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const petals = useMemo<Petal[]>(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 8 + Math.random() * 16,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * 20,
      opacity: 0.15 + Math.random() * 0.25,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    })),
    []
  );

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal absolute rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            top: '-5%',
          }}
        />
      ))}
    </div>
  );
}
