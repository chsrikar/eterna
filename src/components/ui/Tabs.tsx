import { useState } from 'react';
import { motion } from 'framer-motion';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface Props {
  tabs: Tab[];
}

export default function Tabs({ tabs }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex gap-1 border-b border-gold/15 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`relative px-6 py-3 text-sm font-medium transition-colors bg-transparent border-none cursor-pointer whitespace-nowrap ${
              active === index ? 'text-gold' : 'text-muted hover:text-soft-black'
            }`}
          >
            {tab.label}
            {active === index && (
              <motion.div
                layoutId="tabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ background: 'linear-gradient(90deg, #D4AF37, #E8C84A)' }}
              />
            )}
          </button>
        ))}
      </div>
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="py-6"
      >
        {tabs[active].content}
      </motion.div>
    </div>
  );
}
