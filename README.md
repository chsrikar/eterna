# ETERNA — The Gifting Store

A full-stack e-commerce web application for customizable **Wedding Memory Kits**, **Pre-Wedding Journals**, **Couple Kits**, and **Self-Love Kits**.

Built with **React 19 + Vite + TypeScript + TailwindCSS v4 + Firebase + Zustand**.

---

## ✨ Features

| Area | Highlights |
|------|-----------|
| **Shop** | Category-filtered catalog, price-range slider, search, sort, quick-add to cart |
| **Kit Builder** | 8-step wizard — pick type → template → add-ons → photos → message → packaging → review → complete |
| **Cart & Checkout** | Quantity controls, coupon codes, GST breakdown, Razorpay / COD payment |
| **QR Memory Viewer** | Password-protected photo gallery with lightbox & slideshow |
| **User Dashboard** | Orders, wishlist, saved kits, uploaded photos, profile settings |
| **Admin Panel** | KPIs, product CRUD, order status management, user moderation, coupon management |
| **Auth** | Email / password, Google OAuth (Firebase Auth) |
| **UX** | Framer Motion transitions, floating petal animations, lazy loading, skeleton screens, responsive design |

---

## 🛠 Tech Stack

- **Framework:** React 19.2 + Vite 7.3 + TypeScript 5.9
- **Styling:** TailwindCSS v4 (`@tailwindcss/vite` plugin)
- **State:** Zustand with `persist` middleware
- **Routing:** React Router DOM v7 — `createBrowserRouter`, lazy imports, code splitting
- **Backend:** Firebase (Auth · Firestore · Storage)
- **Payments:** Razorpay (client-side integration scaffold)
- **Animations:** Framer Motion
- **Icons:** React Icons (Lucide)
- **Fonts:** Playfair Display · Inter · Dancing Script (Google Fonts)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/        # Navbar, Footer, Layout, DashboardLayout, AdminLayout
│   └── ui/            # ProductCard, Modal, Accordion, Tabs, Stepper, …
├── data/
│   └── sampleData.ts  # Products, add-ons, templates, reviews, blogs, banners
├── lib/
│   └── firebase.ts    # Firebase app init & exports
├── pages/
│   ├── admin/         # Dashboard, Products, Orders, Users, Coupons, Login
│   ├── auth/          # Login, Signup, ForgotPassword
│   ├── dashboard/     # Home, Orders, Wishlist, SavedKits, Photos, Settings
│   └── public/        # Home, About, Shop, ProductDetail, KitBuilder, Cart, …
├── store/
│   ├── authStore.ts
│   ├── cartStore.ts
│   └── kitBuilderStore.ts
├── types/
│   └── index.ts       # All TypeScript interfaces
├── App.tsx            # Router config with lazy loading
├── main.tsx
└── index.css          # TailwindCSS v4 theme & utilities
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Install

```bash
git clone https://github.com/your-org/eterna.git
cd eterna
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` is required because some packages haven't declared React 19 peer support yet.

### Configure

```bash
cp .env.example .env
```

Fill in your Firebase project credentials and Razorpay key in `.env`.

### Develop

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
```

Production output goes to `dist/`.

### Preview

```bash
npm run preview
```

---

## 🌐 Deployment

### Vercel (recommended)

A `vercel.json` is included with SPA rewrites and cache headers.

```bash
npm i -g vercel
vercel --prod
```

### Firebase Hosting

```bash
npm i -g firebase-tools
firebase init hosting   # select dist as public dir, configure as SPA
npm run build
firebase deploy
```

---

## 🎨 Brand Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Blush | `#f8d7da` | Backgrounds, cards |
| Lavender | `#e6d5f7` | Accents, badges |
| Cream | `#fef9ef` | Page backgrounds |
| Rose | `#e8919c` | Primary buttons, links |
| Gold | `#d4a574` | Premium accents |
| Sage | `#b7c9a8` | Success states |
| Warm White | `#fefcf9` | Card surfaces |
| Soft Black | `#2d2d2d` | Body text |

---

## 📜 License

Private — All rights reserved.
