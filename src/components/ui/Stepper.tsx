import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';

interface Props {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export default function Stepper({ steps, currentStep, onStepClick }: Props) {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex items-center min-w-max px-4">
        {steps.map((label, index) => {
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="flex items-center">
              {/* Step Circle */}
              <button
                onClick={() => onStepClick?.(index)}
                disabled={!onStepClick}
                className={`flex items-center gap-2 cursor-pointer border-none bg-transparent ${
                  !onStepClick ? 'cursor-default' : ''
                }`}
              >
                <motion.div
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    backgroundColor: isComplete ? '#D4AF37' : isCurrent ? '#D4AF37' : '#e5e7eb',
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    isComplete || isCurrent ? 'text-white' : 'text-muted'
                  }`}
                >
                  {isComplete ? <HiCheck className="w-4 h-4" /> : index + 1}
                </motion.div>
                <span
                  className={`text-xs font-medium whitespace-nowrap hidden sm:block ${
                    isCurrent ? 'text-gold-dark' : isComplete ? 'text-soft-black' : 'text-muted'
                  }`}
                >
                  {label}
                </span>
              </button>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="w-8 sm:w-12 h-0.5 mx-2">
                  <motion.div
                    animate={{
                      backgroundColor: isComplete ? '#D4AF37' : '#e5e7eb',
                    }}
                    className="h-full rounded-full"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
