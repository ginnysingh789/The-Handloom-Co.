import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api, formatPrice } from '../utils/api';
import { staticProducts, staticCollections } from '../data/products';
import { useCart } from '../context/CartContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const collectionCards = [
  { label: 'Modern Series', title: 'Abstract', desc: 'Fluid forms and organic shapes for the contemporary soul.', img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955276/world-weave-rugs/1771944039726-25070a19-06bc-4ecc-91ed-89efdec00c1aNEW__3.jpg' },
  { label: 'Structural Balance', title: 'Geometric', desc: 'Precise patterns creating harmony and order in your living space.', img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955272/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_68.jpg' },
  { label: 'Timeless Classics', title: 'Heritage', desc: 'Honoring centuries of craftsmanship with enduring motifs.', img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955265/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_19.jpg' },
];

export default function LandingPage() {
  const [products, setProducts] = useState(staticProducts);
  const [activeFilter, setActiveFilter] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = product.variants?.[0];
    const size = variant?.sizes?.[0];
    addToCart(
      product._id,
      product.name,
      {
        color: variant?.color?.name || 'Default',
        size: size?.label || 'Standard',
        price: size?.price || product.basePrice,
      },
      1,
      []
    );
  };

  useEffect(() => {
    async function load() {
      const prodData = await api.getProducts();
      if (prodData?.length) {
        // Merge: DB products (new arrivals) on top, then static products that aren't duplicated
        const dbSlugs = new Set(prodData.map(p => p.slug));
        const uniqueStatic = staticProducts.filter(p => !dbSlugs.has(p.slug));
        setProducts([...prodData, ...uniqueStatic]);
      }
    }
    load();
  }, []);

  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const filtered = activeFilter === 'All' ? products : products.filter((p) => p.category === activeFilter);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60 z-10"></div>
          <img
            src="https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955281/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_18.jpg"
            alt="Luxury living room with a large textured hand-knotted rug"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="relative z-20 text-center max-w-4xl px-5 sm:px-4 fade-in-up">
          <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-medium tracking-[0.2em] uppercase text-white mb-6 bg-white/10 backdrop-blur-sm">
            Hand-Knotted Artistry
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white mb-4 sm:mb-6 tracking-tight">
            Custom Rugs <br /> <span className="italic font-serif">&amp; Carpets</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6 sm:mb-10 font-light leading-relaxed">
            Elevate your space with handcrafted designs crafted for the discerning home. Experience the warmth of true luxury underfoot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/customize"
              className="bg-primary hover:bg-[#0da640] text-white px-8 py-4 rounded-lg font-bold tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(15,189,73,0.3)] hover:shadow-[0_0_30px_rgba(15,189,73,0.5)] uppercase text-sm"
            >
              Start Your Journey
            </Link>
            <a
              href="#collections"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-lg font-bold tracking-wide transition-all duration-300 uppercase text-sm"
            >
              View Collections
            </a>
          </div>
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 animate-bounce text-white/50 hidden sm:block">
          <span className="material-symbols-outlined text-3xl">keyboard_arrow_down</span>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 border-b border-slate-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-slate-400 mb-8 uppercase">Trusted by Interior Designers Worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 md:gap-24 opacity-60">
            <span className="text-sm sm:text-xl font-serif italic text-slate-800">Vogue Living</span>
            <span className="text-sm sm:text-xl font-bold tracking-tight text-slate-800">ARCHITECTURAL DIGEST</span>
            <span className="text-sm sm:text-xl font-serif text-slate-800">ELLE DECOR</span>
            <span className="text-sm sm:text-xl font-mono tracking-tighter text-slate-800">DWELL</span>
          </div>
        </div>
      </section>

      {/* Eco-Friendly Commitment Banner */}
      <section className="py-10 sm:py-16 bg-gradient-to-r from-[#e8f5e9] via-[#f1f8f2] to-[#e8f5e9]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/15 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl sm:text-3xl text-primary">eco</span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Eco-Friendly & Sustainable</h3>
                <p className="text-xs sm:text-sm text-slate-500">Certified responsible craftsmanship</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-primary/20"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 flex-1 w-full">
              {[
                { icon: 'compost', label: 'Natural Dyes', sub: 'Plant-based colors' },
                { icon: 'water_drop', label: 'Low Water', sub: '60% less water used' },
                { icon: 'volunteer_activism', label: 'Fair Trade', sub: 'Ethically sourced' },
                { icon: 'recycling', label: 'Zero Waste', sub: 'Recycled packaging' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group cursor-default">
                  <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-lg text-primary">{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.label}</p>
                    <p className="text-[11px] text-slate-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curated Collections (Triptych) */}
      <section id="collections" className="py-24 md:py-32 bg-background-light">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-light text-slate-900 mb-4">Curated Collections</h2>
              <div className="h-1 w-20 bg-primary"></div>
            </div>
            <p className="text-slate-600 max-w-md text-lg leading-relaxed">
              Explore our distinct aesthetic categories, each telling a unique story of texture, color, and tradition.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 h-auto md:h-[600px]">
            {collectionCards.map((card, i) => (
              <Link key={i} to={`/product/${products[i]?.slug || products[0]?.slug}`} className="group relative h-[350px] sm:h-[500px] md:h-full overflow-hidden rounded-lg cursor-pointer">
                <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-5 sm:p-8 md:p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">{card.label}</span>
                  <h3 className="text-3xl font-medium text-white mb-2">{card.title}</h3>
                  <p className="text-white/70 font-light text-sm max-w-[240px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{card.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-slate-900">New Arrivals</h2>
            <Link to="/" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-slate-900 transition-colors">
              View All
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
            </Link>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-[#e7f3eb] text-[#0d1b12] hover:bg-primary/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-8 sm:gap-y-12">
            {filtered.map((product, i) => (
              <motion.div
                key={product._id || i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.08 } } }}
              >
                <Link to={`/product/${product.slug}`} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-slate-100 mb-2 sm:mb-4">
                    {product.isBestseller && (
                      <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded text-slate-900">
                        Best Seller
                      </span>
                    )}
                    {product.isNewArrival && (
                      <span className="absolute top-3 left-3 z-10 bg-primary text-white backdrop-blur text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                        New
                      </span>
                    )}
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="absolute bottom-4 right-4 bg-white text-slate-900 p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white z-10"
                    >
                      <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                    </button>
                    {/* Eco badge */}
                    <span className="absolute top-3 right-3 z-10 bg-primary/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">eco</span> Eco
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{product.collection}</p>
                    <h3 className="text-sm sm:text-lg font-medium text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                      <p className="text-xs sm:text-sm font-semibold text-slate-700">From {formatPrice(product.basePrice)}</p>
                      {product.originalPrice && product.originalPrice > product.basePrice && (
                        <p className="text-xs text-slate-400 line-through">{formatPrice(product.originalPrice)}</p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customize Section */}
      <section className="relative py-24 md:py-32 bg-[#0A2E18] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="#ffffff" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
          </svg>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Customization Service</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-light mb-6 sm:mb-8 leading-tight">
                Designed by You, <br />
                <span className="italic text-white/80 font-serif">Crafted by Masters.</span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">palette</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Color Match</h4>
                    <p className="text-white/60 font-light leading-relaxed">Choose from over 2,000 distinct wool and silk dyes to perfectly match your interior palette.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">straighten</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Perfect Sizing</h4>
                    <p className="text-white/60 font-light leading-relaxed">Whether it's a grand hallway or a cozy nook, we loom specifically to your dimensions.</p>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <Link to="/customize" className="bg-white text-[#0A2E18] hover:bg-primary hover:text-white px-8 py-4 rounded-lg font-bold tracking-wide transition-colors duration-300 uppercase text-sm inline-block">
                  Consult a Designer
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="relative z-10 rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955279/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_15.jpg"
                  alt="Artisan hand knotting a rug on a loom"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute top-6 -right-6 w-full h-full border border-primary/30 rounded-lg -z-0 hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial / Journal Teaser */}
      <section className="py-16 sm:py-24 bg-background-light">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-light text-slate-900">From The Journal</h2>
            <Link to="/journal" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-slate-900 transition-colors">
              View All
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { cat: 'Craftsmanship', title: 'Handknotted Rugs: The Oldest Weaving Method', desc: 'Knotted-pile carpets have piles made from the cut ends of warp-weft knots. Each knot is tied individually by hand, creating pieces that last generations.', img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955267/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_2.jpg' },
              { cat: 'Interior Trends', title: 'Minimalism in 2025: Texture over Color', desc: 'Discover how leading designers are using high-pile rugs to add warmth to minimalist spaces without adding visual clutter.', img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955284/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_22.jpg' },
              { cat: 'Care Guide', title: 'Preserving the Knot: Hand-knotted Rug Care', desc: 'Essential tips for maintaining the vibrancy and structural integrity of your luxury heirloom pieces for generations.', img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955286/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_24.jpg' },
            ].map((article, i) => (
              <Link to="/journal" key={i} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-5 sm:p-6">
                  <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">{article.cat}</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-3">{article.desc}</p>
                  <span className="text-xs font-bold text-primary group-hover:underline">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Image side */}
            <div className="w-full lg:w-1/2 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955264/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_1.jpg"
                  alt="Artisan using natural dyes"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
              </div>
              {/* Floating stat card */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="absolute -bottom-6 right-2 sm:-right-4 md:right-6 bg-white rounded-xl shadow-xl border border-gray-100 p-4 sm:p-5 w-48 sm:w-56"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">forest</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">12,000+</p>
                    <p className="text-[11px] text-slate-500">Trees planted this year</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content side */}
            <div className="w-full lg:w-1/2">
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">eco</span>
                Our Commitment
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-light text-slate-900 mb-6 leading-tight">
                Luxury That <br />
                <span className="italic font-serif">Loves the Planet</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                Every rug we create is a promise — to the artisan who weaves it, to the home it graces, and to the earth it comes from. We use only natural, biodegradable materials and plant-based dyes.
              </p>

              <div className="space-y-5 mb-10">
                {[
                  { icon: 'spa', title: 'Organic Materials', desc: '100% natural wool, silk, jute, and cotton — no synthetics, ever.' },
                  { icon: 'water_drop', title: 'Water Conservation', desc: 'Our dyeing process uses 60% less water than industry standard.' },
                  { icon: 'groups', title: 'Fair Wages', desc: 'Every artisan earns above living wage with healthcare benefits.' },
                  { icon: 'package_2', title: 'Plastic-Free Shipping', desc: 'Recycled kraft paper and biodegradable packaging only.' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.4, delay: i * 0.1 } } }}
                    className="flex gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-lg text-primary group-hover:text-white transition-colors">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-[#e8f5e9] rounded-full px-4 py-2">
                  <span className="material-symbols-outlined text-primary text-sm">verified</span>
                  <span className="text-xs font-bold text-slate-700">Ethically Certified</span>
                </div>
                <div className="flex items-center gap-2 bg-[#e8f5e9] rounded-full px-4 py-2">
                  <span className="material-symbols-outlined text-primary text-sm">verified</span>
                  <span className="text-xs font-bold text-slate-700">Safe Materials</span>
                </div>
                <div className="flex items-center gap-2 bg-[#e8f5e9] rounded-full px-4 py-2">
                  <span className="material-symbols-outlined text-primary text-sm">verified</span>
                  <span className="text-xs font-bold text-slate-700">Carbon Neutral</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 border-t border-slate-200 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          {subscribed ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl text-primary">check_circle</span>
              </div>
              <h3 className="text-2xl font-medium mb-2 text-slate-900">You're In!</h3>
              <p className="text-slate-500">Welcome to the inner circle. Check your inbox for a 10% welcome discount.</p>
            </motion.div>
          ) : (
            <>
              <span className="material-symbols-outlined text-4xl text-primary mb-4">mail</span>
              <h3 className="text-2xl font-medium mb-2 text-slate-900">Join the Inner Circle</h3>
              <p className="text-slate-600 mb-2">Subscribe for early access to new collections, exclusive offers, and design inspiration.</p>
              <p className="text-primary font-bold text-sm mb-8">Get 10% off your first order</p>
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => { e.preventDefault(); if (email.trim()) { setSubscribed(true); setEmail(''); } }}>
                <input
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-slate-900"
                  placeholder="Your email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="bg-slate-900 text-white font-bold uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors">
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-slate-400 mt-4">No spam, ever. Unsubscribe anytime.</p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
