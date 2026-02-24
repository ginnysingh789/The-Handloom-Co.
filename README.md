# Work Weave Carpet — Custom & Bespoke Carpets

Full-stack e-commerce web application for a luxury handcrafted rugs and carpets brand.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router, Framer Motion, Google Material Symbols
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Font**: Manrope (Google Fonts)

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally (or update `.env` with your connection string)

### Backend Setup
```bash
cd backend
npm install
npm run seed   # Seeds the database with sample products
npm run dev    # Starts the server on port 5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev    # Starts Vite dev server on port 3000
```

The frontend proxies `/api` requests to `http://localhost:5000`.

### Environment Variables

**Backend** (`backend/.env`):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/luxury-rugs
NODE_ENV=development
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Hero, trust signals, triptych collections, product grid, bespoke section, journal, newsletter |
| Product Detail | `/product/:slug` | Thumbnails + main image gallery, color/size selectors, accordions, artisan story |
| Customization | `/customize` | Timeline-based bespoke process, premium materials, CTA |
| B2B / Trade | `/b2b` | Hero, process steps, commercial terms, industries, apply CTA |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (with filters) |
| GET | `/api/products/slug/:slug` | Get product by slug |
| GET | `/api/collections` | List collections |
| GET | `/api/addons` | List add-on services |
| GET | `/api/cart/:sessionId` | Get cart |
| POST | `/api/cart/:sessionId/items` | Add item to cart |
| PUT | `/api/cart/:sessionId/items/:itemId` | Update cart item |
| DELETE | `/api/cart/:sessionId/items/:itemId` | Remove cart item |

## Design System

- **Primary Green**: `#0fbd49`
- **Dark Green**: `#0A2E18` / `#0d1b12`
- **Gold Accent**: `#D4AF37` / `#C5A065`
- **Background**: `#f8fcf9` (light), `#051109` (dark)
- **Icons**: Google Material Symbols Outlined
- **Font**: Manrope (weights 200–800)
