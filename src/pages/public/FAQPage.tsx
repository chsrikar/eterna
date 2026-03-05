import { motion } from 'framer-motion';
import Accordion from '../../components/ui/Accordion';

const faqItems = [
  { title: 'How do I place a custom order?', content: 'You can use our Kit Builder to customize your order step by step. Choose your kit type, select a template, pick add-ons, upload photos, and write personalized notes. It\'s easy and fun!' },
  { title: 'What is the delivery time?', content: 'Standard delivery takes 5-7 business days. Custom kits take an additional 2-3 days for handcrafting. Express shipping (2-3 days) is available at ₹199.' },
  { title: 'Can I cancel or modify my order?', content: 'Orders can be cancelled or modified within 6 hours of placing them. After that, we begin handcrafting your kit. Please contact us at hello@eterna.in for any changes.' },
  { title: 'Do you offer gift wrapping?', content: 'Yes! All our kits come beautifully packaged. You can upgrade to premium packaging options (Velvet Box, Kraft Box, or Floral Wrap) during checkout.' },
  { title: 'What is the QR Memory Page?', content: 'With every wedding memory kit, you get a unique QR code that links to a beautiful digital memory page. You can add photos, videos, and messages that your loved ones can access by scanning the QR code.' },
  { title: 'Do you ship internationally?', content: 'Currently, we ship within India only. International shipping is coming soon! Follow us on Instagram @eterna.gifting for updates.' },
  { title: 'What if my order arrives damaged?', content: 'We take great care in packaging, but if your order arrives damaged, please contact us within 48 hours with photos of the damage. We\'ll send a replacement at no extra cost.' },
  { title: 'Can I return a personalized kit?', content: 'Due to the handcrafted and personalized nature of our products, we cannot accept returns on custom kits. However, if there\'s a manufacturing defect, we\'ll make it right.' },
  { title: 'What payment methods do you accept?', content: 'We accept all major credit/debit cards, UPI, net banking, and wallets through Razorpay. All transactions are 100% secure.' },
  { title: 'Do you offer bulk orders for weddings?', content: 'Yes! We offer special pricing for bulk orders (10+ kits). Contact us at hello@eterna.in with your requirements and we\'ll create a custom quote.' },
];

export default function FAQPage() {
  return (
    <div>
      <section className="gradient-hero py-12 sm:py-16 text-center">
        <div className="container-custom">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl sm:text-5xl text-soft-black mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-soft-black/60 text-lg max-w-2xl mx-auto"
          >
            Find answers to common questions about our products, orders, and shipping.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Accordion items={faqItems} />
        </div>
      </section>
    </div>
  );
}
