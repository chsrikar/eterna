import type { Product, AddOn, BlogPost, Banner, Review, Template, ColorTheme, PackagingStyle } from '../types';

export const sampleAddOns: AddOn[] = [
  { id: 'addon-1', name: 'Polaroid Prints (10pc)', price: 299, image: '/images/addons/polaroid.jpg', description: 'Custom printed polaroid-style photos' },
  { id: 'addon-2', name: 'Custom Stickers Pack', price: 149, image: '/images/addons/stickers.jpg', description: 'Themed decorative sticker sheets' },
  { id: 'addon-3', name: 'Couple Mug Set', price: 499, image: '/images/addons/mugs.jpg', description: 'Matching couple mugs with your names' },
  { id: 'addon-4', name: 'QR Memory Album', price: 399, image: '/images/addons/qr-album.jpg', description: 'Digital photo album accessible via QR code' },
  { id: 'addon-5', name: 'Scrapbook Tools Kit', price: 349, image: '/images/addons/scrapbook.jpg', description: 'Washi tapes, paper cutouts & markers' },
  { id: 'addon-6', name: 'Dried Flower Press', price: 249, image: '/images/addons/flowers.jpg', description: 'Pressed dried flowers for decoration' },
  { id: 'addon-7', name: 'Personalized Bookmark', price: 99, image: '/images/addons/bookmark.jpg', description: 'Engraved wooden bookmark with names' },
  { id: 'addon-8', name: 'Wax Seal Kit', price: 199, image: '/images/addons/waxseal.jpg', description: 'Custom initial wax seal stamp with wax' },
];

export const sampleTemplates: Template[] = [
  { id: 'tpl-1', name: 'Classic Romance', preview: '/images/templates/classic.jpg', category: 'wedding-memory-kit' },
  { id: 'tpl-2', name: 'Rustic Garden', preview: '/images/templates/rustic.jpg', category: 'wedding-memory-kit' },
  { id: 'tpl-3', name: 'Modern Minimal', preview: '/images/templates/modern.jpg', category: 'couple-kit' },
  { id: 'tpl-4', name: 'Dreamy Pastels', preview: '/images/templates/pastels.jpg', category: 'pre-wedding-journal' },
  { id: 'tpl-5', name: 'Boho Chic', preview: '/images/templates/boho.jpg', category: 'self-love-kit' },
  { id: 'tpl-6', name: 'Vintage Love', preview: '/images/templates/vintage.jpg', category: 'wedding-memory-kit' },
];

export const sampleColorThemes: ColorTheme[] = [
  { id: 'ct-1', name: 'Blush & Gold', colors: ['#f8d7da', '#d4a574', '#fef9ef'], preview: '/images/themes/blush-gold.jpg' },
  { id: 'ct-2', name: 'Lavender Dreams', colors: ['#e6d5f7', '#b794d6', '#f3ecfc'], preview: '/images/themes/lavender.jpg' },
  { id: 'ct-3', name: 'Sage & Cream', colors: ['#b7c9a8', '#8fa87a', '#fef9ef'], preview: '/images/themes/sage.jpg' },
  { id: 'ct-4', name: 'Rose Garden', colors: ['#e8919c', '#c2636f', '#fdf2f4'], preview: '/images/themes/rose.jpg' },
  { id: 'ct-5', name: 'Midnight Blue', colors: ['#2c3e6b', '#1a2340', '#e8edf5'], preview: '/images/themes/midnight.jpg' },
];

export const samplePackaging: PackagingStyle[] = [
  { id: 'pkg-1', name: 'Classic White Box', image: '/images/packaging/white.jpg', price: 0 },
  { id: 'pkg-2', name: 'Kraft Rustic Box', image: '/images/packaging/kraft.jpg', price: 99 },
  { id: 'pkg-3', name: 'Velvet Premium Box', image: '/images/packaging/velvet.jpg', price: 299 },
  { id: 'pkg-4', name: 'Floral Gift Wrap', image: '/images/packaging/floral.jpg', price: 149 },
];

export const sampleProducts: Product[] = [
  {
    id: 'prod-1',
    title: 'The Grand Wedding Memory Kit',
    description: 'A beautifully curated memory kit to capture every precious moment of your wedding journey. Includes a premium journal, photo holders, decorative elements, and everything you need to preserve your special day forever.',
    price: 2499,
    originalPrice: 3499,
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
    ],
    category: 'wedding-memory-kit',
    addOns: [sampleAddOns[0], sampleAddOns[1], sampleAddOns[3], sampleAddOns[5]],
    stock: 50,
    rating: 4.8,
    reviewCount: 124,
    tags: ['bestseller', 'premium', 'wedding', 'memory'],
    whatsInside: ['Hardbound Memory Journal', 'Photo Corner Stickers (100pc)', 'Decorative Washi Tapes (5 rolls)', 'Pressed Flower Kit', 'Handmade Bookmark', 'Fabric Pouch', 'Instruction Guide'],
    featured: true,
    bestSeller: true,
    createdAt: '2025-01-15',
    updatedAt: '2025-06-01',
  },
  {
    id: 'prod-2',
    title: 'Pre-Wedding Journal - "Our Story"',
    description: 'Chronicle your love story from the first date to the big day. This guided journal is filled with prompts, activities, and space for photos to help you and your partner reflect on your journey together.',
    price: 1299,
    originalPrice: 1799,
    images: [
      'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800',
    ],
    category: 'pre-wedding-journal',
    addOns: [sampleAddOns[0], sampleAddOns[4], sampleAddOns[6]],
    stock: 80,
    rating: 4.7,
    reviewCount: 89,
    tags: ['journal', 'pre-wedding', 'guided'],
    whatsInside: ['120-page Guided Journal', 'Couple Activity Cards (30)', 'Date Night Scratch Cards (10)', 'Memory Pocket Envelopes (5)', 'Decorative Stickers'],
    featured: true,
    bestSeller: false,
    createdAt: '2025-02-10',
    updatedAt: '2025-05-20',
  },
  {
    id: 'prod-3',
    title: 'Couple Connection Kit',
    description: 'Strengthen your bond with this thoughtfully designed couple kit. Perfect for date nights, anniversaries, or just because. Packed with activities, conversation starters, and sweet surprises.',
    price: 1799,
    images: [
      'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800',
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800',
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800',
    ],
    category: 'couple-kit',
    addOns: [sampleAddOns[2], sampleAddOns[6], sampleAddOns[7]],
    stock: 65,
    rating: 4.9,
    reviewCount: 67,
    tags: ['couple', 'date-night', 'gift', 'anniversary'],
    whatsInside: ['Couple Journal', 'Conversation Cards (52)', 'Scratch-off Date Ideas', 'Mini Polaroid Frame', 'Love Letter Kit', 'Matching Wishbands'],
    featured: true,
    bestSeller: true,
    createdAt: '2025-03-01',
    updatedAt: '2025-06-15',
  },
  {
    id: 'prod-4',
    title: 'Self-Love Blossom Kit',
    description: 'A nurturing self-care kit designed to help you reconnect with yourself. Filled with journaling prompts, affirmation cards, wellness items, and tools to cultivate self-love and mindfulness.',
    price: 999,
    originalPrice: 1499,
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    ],
    category: 'self-love-kit',
    addOns: [sampleAddOns[5], sampleAddOns[6], sampleAddOns[7]],
    stock: 100,
    rating: 4.6,
    reviewCount: 45,
    tags: ['self-love', 'wellness', 'mindfulness', 'journaling'],
    whatsInside: ['Self-Love Journal (90 pages)', 'Affirmation Cards (30)', 'Aromatherapy Sachets (3)', 'Gratitude Prompts Booklet', 'Silk Scrunchie', 'Mindfulness Guide'],
    featured: false,
    bestSeller: false,
    createdAt: '2025-04-01',
    updatedAt: '2025-06-10',
  },
  {
    id: 'prod-5',
    title: 'The Ultimate Wedding Box',
    description: 'Our most comprehensive wedding memory kit. Everything you need to document, decorate, and cherish your wedding memories for a lifetime. The ultimate gift for newlyweds.',
    price: 3999,
    originalPrice: 5499,
    images: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
    ],
    category: 'wedding-memory-kit',
    addOns: sampleAddOns,
    stock: 30,
    rating: 5.0,
    reviewCount: 28,
    tags: ['premium', 'ultimate', 'wedding', 'bestseller', 'gift'],
    whatsInside: ['Luxury Memory Album', 'Photo Display Stand', 'Washi Tape Collection (10)', 'Pressed Flower Set', 'Customized Vow Books (2)', 'QR Memory Album', 'Premium Pen Set', 'Gift Certificate for Couple Photoshoot'],
    featured: true,
    bestSeller: true,
    createdAt: '2025-01-20',
    updatedAt: '2025-06-20',
  },
  {
    id: 'prod-6',
    title: 'Love Letters Journal',
    description: 'A beautiful journal designed for couples to write love letters to each other. Features guided prompts, sealed letter pouches, and a timeline to track your love story through the years.',
    price: 899,
    images: [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800',
      'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800',
    ],
    category: 'couple-kit',
    addOns: [sampleAddOns[6], sampleAddOns[7]],
    stock: 120,
    rating: 4.5,
    reviewCount: 56,
    tags: ['journal', 'love-letters', 'couple', 'romantic'],
    whatsInside: ['Love Letters Journal (100 pages)', 'Sealed Letter Pouches (12)', 'Vintage Stamps', 'Wax Seal Kit', 'Instruction Booklet'],
    featured: false,
    bestSeller: false,
    createdAt: '2025-05-01',
    updatedAt: '2025-06-01',
  },
];

export const sampleReviews: Review[] = [
  { id: 'rev-1', productId: 'prod-1', uid: 'user-1', userName: 'Priya S.', rating: 5, comment: 'Absolutely beautiful! The quality of everything in the kit exceeded my expectations. My wife loved it as a wedding gift.', createdAt: '2025-05-15' },
  { id: 'rev-2', productId: 'prod-1', uid: 'user-2', userName: 'Rahul M.', rating: 5, comment: 'The attention to detail is incredible. Every element feels premium and thoughtful. Highly recommend!', createdAt: '2025-05-20' },
  { id: 'rev-3', productId: 'prod-3', uid: 'user-3', userName: 'Ananya K.', rating: 5, comment: 'Got this for our anniversary and we spent the whole evening going through the activity cards together. Such a wonderful bonding experience!', createdAt: '2025-04-10' },
  { id: 'rev-4', productId: 'prod-2', uid: 'user-4', userName: 'Meera R.', rating: 4, comment: 'Beautiful journal with meaningful prompts. Love how it guides you through your love story. The packaging was also gorgeous!', createdAt: '2025-04-25' },
  { id: 'rev-5', productId: 'prod-4', uid: 'user-5', userName: 'Sneha P.', rating: 5, comment: 'This self-love kit has been a game changer for my morning routine. The affirmation cards are my favorite part.', createdAt: '2025-06-01' },
];

export const sampleBlogPosts: BlogPost[] = [
  {
    id: 'blog-1', title: '10 Creative Ways to Preserve Your Wedding Memories', slug: '10-creative-ways-preserve-wedding-memories',
    excerpt: 'Your wedding day is one of the most magical days of your life. Here are 10 unique ways to preserve those precious memories...',
    content: 'Full blog content here...', coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    author: 'ETERNA Team', tags: ['wedding', 'memories', 'tips'], published: true, createdAt: '2025-05-01', updatedAt: '2025-05-01',
  },
  {
    id: 'blog-2', title: 'Why Every Couple Needs a Pre-Wedding Journal', slug: 'why-every-couple-needs-pre-wedding-journal',
    excerpt: 'The engagement period is filled with excitement, planning, and anticipation. A pre-wedding journal helps you capture it all...',
    content: 'Full blog content here...', coverImage: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800',
    author: 'ETERNA Team', tags: ['journal', 'pre-wedding', 'engagement'], published: true, createdAt: '2025-04-15', updatedAt: '2025-04-15',
  },
  {
    id: 'blog-3', title: 'The Art of Self-Love: Building a Daily Practice', slug: 'art-of-self-love-daily-practice',
    excerpt: 'Self-love isn\'t selfish—it\'s essential. Discover how small daily rituals can transform your relationship with yourself...',
    content: 'Full blog content here...', coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    author: 'ETERNA Team', tags: ['self-love', 'wellness', 'mindfulness'], published: true, createdAt: '2025-06-01', updatedAt: '2025-06-01',
  },
];

export const sampleBanners: Banner[] = [
  { id: 'banner-1', title: 'New Wedding Season Collection', subtitle: 'Handcrafted with love for your special day', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200', link: '/shop?category=wedding-memory-kit', isActive: true, order: 1 },
  { id: 'banner-2', title: 'Self-Love Starts Here', subtitle: 'Discover our wellness kits designed for you', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200', link: '/self-love-kits', isActive: true, order: 2 },
];

export const categoryInfo = {
  'wedding-memory-kit': {
    title: 'Wedding Memory Kits',
    description: 'Capture every precious moment of your wedding journey with our beautifully curated memory kits.',
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
    color: '#e8919c',
  },
  'pre-wedding-journal': {
    title: 'Pre-Wedding Journals',
    description: 'Chronicle your love story from engagement to the altar with guided prompts and activities.',
    heroImage: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1200',
    color: '#b794d6',
  },
  'couple-kit': {
    title: 'Couple Kits',
    description: 'Strengthen your bond with thoughtfully designed kits for date nights and beyond.',
    heroImage: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1200',
    color: '#d4a574',
  },
  'self-love-kit': {
    title: 'Self-Love Kits',
    description: 'Nurture your relationship with yourself through journaling, affirmations, and mindfulness.',
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200',
    color: '#b7c9a8',
  },
};
