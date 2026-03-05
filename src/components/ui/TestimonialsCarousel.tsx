import { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const defaultTestimonials = [
  {
    text: 'The wedding memory kit was beyond our expectations! Every detail was so thoughtfully curated. It\u2019s now our most treasured possession.',
    imageSrc: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    name: 'Priya & Arjun',
    username: 'Mumbai',
    role: 'Wedding Kit',
  },
  {
    text: 'I gifted the self-love kit to my best friend and she was in tears. The quality and presentation is absolutely premium.',
    imageSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    name: 'Sneha M.',
    username: 'Bangalore',
    role: 'Self-Love Kit',
  },
  {
    text: 'The custom kit builder made it so easy to create something truly personal. The QR memory page is such a brilliant touch!',
    imageSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    name: 'Rahul & Meera',
    username: 'Delhi',
    role: 'Custom Kit',
  },
  {
    text: 'Our pre-wedding journal helped us document every moment of our engagement. We read through it on our anniversary and it was so special.',
    imageSrc: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    name: 'Ananya K.',
    username: 'Pune',
    role: 'Couple Kit',
  },
  {
    text: 'Absolutely love how everything was packaged. The attention to detail is unmatched. Will be ordering again for my sister\u2019s wedding!',
    imageSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    name: 'Kavya R.',
    username: 'Hyderabad',
    role: 'Wedding Kit',
  },
  {
    text: 'MYOWD turned our chaotic wedding planning into something magical. The memory journal is a masterpiece we\u2019ll cherish forever.',
    imageSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    name: 'Vikram & Nisha',
    username: 'Chennai',
    role: 'Memory Journal',
  },
];

interface TestimonialProps {
  testimonials?: {
    text: string;
    imageSrc: string;
    name: string;
    username: string;
    role?: string;
  }[];
  title?: string;
  subtitle?: string;
  autoplaySpeed?: number;
  className?: string;
}

export default function TestimonialsCarousel({
  testimonials = defaultTestimonials,
  title = 'Our Early Supporters',
  subtitle = 'We just launched and already have amazing customers! Join our community and be part of our journey from day one.',
  autoplaySpeed = 3000,
  className,
}: TestimonialProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplaySpeed);

    return () => {
      clearInterval(autoplay);
    };
  }, [emblaApi, autoplaySpeed]);

  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      className={cn('relative overflow-hidden py-16 md:py-24', className)}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,180,184,0.15),transparent_60%)]" />
        <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-gold/8 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-40 w-40 rounded-full bg-baby-pink/15 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative mb-12 text-center md:mb-16"
        >
          <p className="text-gold font-semibold text-xs uppercase tracking-[0.3em] mb-3">
            🎊 Fresh Launch Testimonials
          </p>
          <h2 className="font-serif mb-4 text-3xl font-bold text-soft-black md:text-4xl lg:text-5xl">
            {title}
          </h2>

          <motion.p
            className="mx-auto max-w-2xl text-base text-soft-black/50 md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Testimonials carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {allTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="flex justify-center px-4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative h-full w-fit rounded-2xl border border-gold/12 bg-gradient-to-b from-cream/30 to-white p-6 shadow-md backdrop-blur-sm"
                >
                  {/* Decorative gradients */}
                  <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-rose/10 to-transparent blur-md" />
                  <div className="absolute -right-10 -bottom-10 -z-10 h-32 w-32 rounded-full bg-gradient-to-t from-lavender/10 to-transparent opacity-70 blur-xl" />

                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="text-gold mb-4"
                  >
                    <div className="relative">
                      <Quote className="h-10 w-10 -rotate-180" />
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="relative mb-6 text-base leading-relaxed text-soft-black/75"
                  >
                    <span className="relative">{testimonial.text}</span>
                  </motion.p>

                  {/* User info */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="mt-auto flex items-center gap-3 border-t border-gold/12 pt-4"
                  >
                    <Avatar className="h-10 w-10 border border-gold/15 ring-2 ring-gold/10 ring-offset-1 ring-offset-white">
                      <AvatarImage
                        src={testimonial.imageSrc}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <h4 className="font-medium text-soft-black whitespace-nowrap">
                        {testimonial.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gold/70 whitespace-nowrap">
                          {testimonial.username}
                        </p>
                        {testimonial.role && (
                          <>
                            <span className="text-muted flex-shrink-0">
                              &bull;
                            </span>
                            <p className="text-sm text-muted whitespace-nowrap">
                              {testimonial.role}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
