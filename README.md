# Joginder Karyana Shop — Premium Grocery E-Commerce Platform

A modern, responsive, premium grocery e-commerce web application designed for **Joginder Karyana Shop**, a trusted neighbourhood kiryana and general store located in **Swankha, Near Kabir Mandir**.

Recreated faithfully according to the approved Emergent design system, layout, visual hierarchy, typography, and warm earthy color palette.

---

## 🎨 Design Reference & Brand Identity

- **Background:** Warm cream (`#FAF5EC`)
- **Primary Green:** Deep forest green (`#12372A`)
- **Secondary Green:** Sage green (`#6F9277`)
- **Accent Orange:** Warm golden orange (`#E8A044`)
- **Card Background:** Rounded off-white (`#FFFDF8`)
- **Typography:**
  - Headings: *Playfair Display* (High-contrast, elegant serif typography with distinctive italic accents)
  - Body & UI: *Plus Jakarta Sans* (Clean, modern geometric sans-serif)

---

## 🛍️ Features & Core Sections

### 1. Floating Sticky Header (`Navbar.tsx`)
- Pill-shaped floating navigation bar with soft backdrop blur and subtle border.
- Circular **J** emblem and brand title: **Joginder Karyana** (*SHOP · SWANKHA*).
- Navigation links: **Shop**, **Categories**, **About us**, **Contact**.
- Integrated real-time search input (*"Search essentials..."*).
- *"Hi, neighbour"* warm community greeting.
- Interactive Shopping Bag button with live item count badge.
- Saved Wishlist button with live count.
- Responsive mobile hamburger menu with category shortcuts.

### 2. Hero Section (`Hero.tsx`)
- Headline: *"Everyday essentials. Trusted quality."* with sage-green italic serif accents.
- Subtitle: *"Good food, fair prices, and the familiar warmth of your local store — delivered to your doorstep in Swankha."*
- Actions: *"Explore products →"* button and direct *"Order on WhatsApp"* chat button.
- Arch-style rounded imagery container (`hero-arch`) showcasing vibrant pantry and vegetable produce.
- Floating circular **QUALITY FIRST** badge in warm accent orange (`#E8A044`).
- Local trust indicators: Fast Swankha Delivery, 100% Pure Staples, and Open 7 Days a week.

### 3. Category Section — "Shop by Aisle" (`CategorySection.tsx`)
- Section heading: *"Good things live here."* with *"Browse all >"* expansion trigger.
- 4 primary image cards as shown in the approved design:
  1. **Rice & Grains** — *Staples for every kitchen*
  2. **Pulses & Dals** — *Wholesome pantry picks*
  3. **Spices & Masalas** — *A little magic in every meal*
  4. **Tea & Coffee** — *Slow mornings, made better*
- Expandable aisles including *Atta & Flour*, *Cooking Oils*, *Snacks & Biscuits*, *Household Essentials*, *Dairy Products*, *Personal Care*, and *Beverages*.
- Rich dark green gradient overlays and interactive arrow navigation.

### 4. Product Section — "The Everyday Edit: Pantry Favourites" (`ProductSection.tsx`)
- Horizontally scrollable category filter pills (*All, Rice & Grains, Pulses & Dals, Atta & Flour, Spices, Cooking Oils, Tea & Coffee, Snacks, Household, Dairy*).
- 3-column desktop grid with 2-column mobile layout.
- Each product card (`ProductCard.tsx`) features:
  - High-resolution, distinct grocery photography (no repeated images).
  - Brand and quantity subtitle (e.g. `Daawat · 5 kg`, `Tata Sampann · 1 kg`, `Fortune · 1 L`).
  - Product name in elegant serif typography.
  - Current price in INR (₹) and original price with strikethrough.
  - Badges: *Bestseller*, *8% off*, *Deal*, *Essential*.
  - Wishlist toggle heart button.
  - "+ Add" button with quantity stepper (`- qty +`) once added to the bag.

### 5. Promotional Banner (`PromotionalBanner.tsx`)
- Dark forest green banner (`#12372A`) with subtle decorative concentric rings.
- Label: `A LITTLE EXTRA`
- Heading: *"Stock up, save more."*
- Description: *"Make your monthly pantry run feel a little more rewarding. Discover quality essentials and everyday favourites at prices you'll love."*
- Call-to-action: *"Shop offers →"* button.
- Circular emblem badge featuring **10% OFF PANTRY FAVOURITES**.

### 6. About the Store — "Our Little Story" (`AboutSection.tsx`)
- Story honoring **Joginder Karyana Shop**, located at **Add. Swankha, Near Kabir Mandir**.
- Official store identity reference card replicating the authentic local shop signboard.
- Arch-style container showcasing natural spices and grains.
- The 4 core commitments:
  1. *Trusted Local Shopping*
  2. *Quality Everyday Essentials*
  3. *Fair & Affordable Pricing*
  4. *Friendly Neighbourhood Service*

### 7. Contact & Store Hours (`ContactSection.tsx`)
- Store Name: **Joginder Karyana Shop**
- Address: **Add. Swankha, Near Kabir Mandir**
- Verified phone contact: **+91 94191 88320**
- One-click **WhatsApp Ordering** button.
- Stylized **Google Maps** location card with directions shortcut.
- Business timings:
  - *Monday – Saturday:* 7:30 AM – 9:00 PM
  - *Sunday:* 8:00 AM – 2:00 PM & 5:00 PM – 9:00 PM
  - *Status:* Open 7 days a week for neighbourhood essentials.
- Quick inquiry/grocery list form that forwards directly to WhatsApp.

### 8. Interactive Cart Drawer (`CartDrawer.tsx`)
- Slide-over drawer with backdrop blur.
- Dynamic **Free Delivery Meter**: shows progress towards ₹499 free Swankha local delivery threshold.
- Full item list with image thumbnails, brand, quantity counter, and trash removal.
- Real-time subtotal, savings, delivery fee calculation, and grand total.
- Direct *"Proceed to Checkout"* and *"Instant WhatsApp Order"* buttons.

### 9. Saved Wishlist Drawer (`WishlistDrawer.tsx`)
- Slide-over wishlist manager to save favourite pantry items.
- One-click *"Add to Bag"* and *"Add all to Bag"*.

### 10. Complete Checkout Page (`Checkout.tsx`)
- Customer full name and phone number.
- Full Swankha delivery address, landmark, and order instructions.
- Payment method selector (Cash on Delivery or UPI on Delivery).
- Itemized order summary with thumbnails and totals.
- **WhatsApp Order Placement Engine**: automatically constructs a structured WhatsApp message with customer info, delivery address, item breakdown, and total, opening `wa.me/919419188320` instantly.
- Order confirmation receipt with unique Order ID (e.g. `JK-849201`).

### 11. Mobile Responsiveness & Bottom Navigation (`MobileNavigation.tsx`)
- Mobile-first responsive layout tested across screen sizes.
- Sticky bottom navigation bar on mobile screens with **Home**, **Shop**, **Categories**, **Saved**, and **Bag** (with live badge).
- Touch-friendly action buttons and zero horizontal page overflow.

---

## 🛠️ Technical Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** Lucide React
- **Routing:** React Router v7 (`react-router-dom`)
- **State Management:** React Context API (`CartContext`, `WishlistContext`)
- **Data Persistence:** LocalStorage (`joginder_karyana_cart_v1`, `joginder_karyana_wishlist_v1`)

---

## 📁 Project Structure

```
d:\newstore/
├── public/
│   └── favicon.svg           # Dark forest green emblem with serif J
├── src/
│   ├── assets/               # Static assets & icons
│   ├── config/
│   │   └── shopConfig.ts     # Configurable store details, address & WhatsApp phone
│   ├── context/
│   │   ├── CartContext.tsx   # Shopping bag state & WhatsApp message builder
│   │   └── WishlistContext.tsx # Wishlist state & persistence
│   ├── data/
│   │   ├── categories.ts     # Configurable category catalog & photography
│   │   └── products.ts       # Realistic Indian grocery products & individual images
│   ├── types/
│   │   ├── cart.ts           # Cart & checkout data interfaces
│   │   └── product.ts        # Product & category data interfaces
│   ├── components/
│   │   ├── Navbar.tsx        # Floating sticky rounded header
│   │   ├── Hero.tsx          # Hero section with Arch image & Quality badge
│   │   ├── CategorySection.tsx # "Shop by Aisle" 4-card grid
│   │   ├── ProductCard.tsx   # Product card with price, badges & stepper
│   │   ├── ProductSection.tsx # "Pantry Favourites" with horizontal filters
│   │   ├── PromotionalBanner.tsx # "Stock up, save more." dark green banner
│   │   ├── AboutSection.tsx  # "Our Little Story" with Swankha signboard tribute
│   │   ├── ContactSection.tsx # Store contact, hours & Google Maps placeholder
│   │   ├── Footer.tsx        # Store footer with links & delivery coverage
│   │   ├── CartDrawer.tsx    # Slide-over cart with free delivery meter
│   │   ├── WishlistDrawer.tsx # Slide-over saved items drawer
│   │   ├── QuickViewModal.tsx # Product quick-view dialog
│   │   └── MobileNavigation.tsx # Sticky bottom bar for mobile screens
│   ├── pages/
│   │   ├── Home.tsx          # Full landing experience
│   │   ├── Shop.tsx          # Filterable, searchable store catalogue
│   │   ├── ProductDetails.tsx# Product view with specs & related staples
│   │   └── Checkout.tsx      # Customer delivery info & WhatsApp checkout
│   ├── App.tsx               # Main application routing
│   ├── index.css             # Tailwind v4 import, fonts & arch mask styles
│   └── main.tsx              # Application entry point
├── index.html                # Google Fonts (Playfair Display & Plus Jakarta Sans)
├── package.json              # Project dependencies & scripts
├── tsconfig.json             # TypeScript compiler settings
└── vite.config.ts            # Vite & Tailwind configuration
```

---

## 🚀 Setup & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```
Generates an optimized production bundle in the `dist/` directory with zero TypeScript errors.

### 4. Preview Production Build
```bash
npm run preview
```
Runs a local preview of the production build at [http://localhost:4173](http://localhost:4173).
