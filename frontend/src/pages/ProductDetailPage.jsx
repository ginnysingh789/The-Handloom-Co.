import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api, formatPrice } from '../utils/api';
import { staticProducts, staticAddons } from '../data/products';
import { useCart } from '../context/CartContext';
import { getCachedSettings } from '../utils/contactConfig';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();

  // Product state
  const [product, setProduct] = useState(null);
  const [addons, setAddons] = useState(staticAddons);
  const [loading, setLoading] = useState(true);
  const [waNumbers, setWaNumbers] = useState([]);

  // Selection state
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [addedToCart, setAddedToCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const mainImageRef = useRef(null);
  const thumbContainerRef = useRef(null);

  // Load product data
  useEffect(() => {
    async function load() {
      setLoading(true);
      const [prodData, addonData] = await Promise.all([
        api.getProductBySlug(slug),
        api.getAddons()
      ]);

      if (prodData) {
        setProduct(prodData);
      } else {
        const fallback = staticProducts.find((p) => p.slug === slug);
        setProduct(fallback || staticProducts[0]);
      }
      if (addonData?.length) setAddons(addonData);
      setLoading(false);
    }
    load();
    api.getWhatsAppNumbers().then(d => { if (d) setWaNumbers(d); });
  }, [slug]);

  // Reset selections when product changes
  useEffect(() => {
    setSelectedVariantIdx(0);
    setSelectedSizeIdx(0);
    setQuantity(1);
    setSelectedAddons([]);
    setActiveImageIdx(0);
    setAddedToCart(false);
  }, [product?._id]);

  // Derived data
  const variant = product?.variants?.[selectedVariantIdx];
  const size = variant?.sizes?.[selectedSizeIdx];
  const currentImages = variant?.color?.images || product?.images || [];
  const currentPrice = size?.price || product?.basePrice || 0;

  // Addon total
  const addonTotal = selectedAddons.reduce((sum, id) => {
    const addon = addons.find((a) => a._id === id);
    return sum + (addon?.price || 0);
  }, 0);

  const totalPrice = (currentPrice + addonTotal) * quantity;

  // Build WhatsApp link using product-specific number or global fallback
  const getProductWhatsAppLink = () => {
    let waNum = '';
    if (product?.whatsappNumberId && waNumbers.length > 0) {
      const assigned = waNumbers.find(w => w._id === product.whatsappNumberId);
      if (assigned) waNum = assigned.number;
    }
    if (!waNum) {
      const { whatsappNumber } = getCachedSettings();
      waNum = (whatsappNumber || '').replace(/[^0-9]/g, '');
    }
    const text = encodeURIComponent(
      `Hi! I'm interested in the ${product?.name}\n` +
      `Color: ${variant?.color?.name || 'N/A'}\n` +
      `Size: ${size?.label || 'N/A'}\n` +
      `Price: ${formatPrice(currentPrice)}\n` +
      `SKU: ${product?.sku}\n\n` +
      `Could you help me with more details?`
    );
    return `https://wa.me/${waNum}?text=${text}`;
  };

  // Handlers
  const handleVariantChange = (idx) => {
    setSelectedVariantIdx(idx);
    setSelectedSizeIdx(0);
    setActiveImageIdx(0);
  };

  const handleAddonToggle = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleAddToCart = async () => {
    if (!product) return;
    const addonItems = selectedAddons.map((id) => {
      const a = addons.find((x) => x._id === id);
      return { name: a?.name, price: a?.price };
    });

    const productImage = currentImages?.[0] || product?.images?.[0] || '';
    await addToCart(
      product._id,
      product.name,
      {
        color: variant?.color?.name,
        size: size?.label,
        price: currentPrice
      },
      quantity,
      addonItems,
      productImage,
      product.whatsappNumberId || ''
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Zoom handlers
  const handleMouseMove = useCallback((e) => {
    if (!mainImageRef.current) return;
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#e7f3eb] border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-forest-dark mb-2">Product Not Found</h2>
          <Link to="/" className="text-primary hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex justify-center w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12">
        <div className="w-full max-w-[1280px]">
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-8 text-xs sm:text-sm">
            <Link to="/" className="text-[#4c9a66] hover:text-primary font-medium transition-colors">Home</Link>
            <span className="text-[#4c9a66] font-medium">/</span>
            <span className="text-[#4c9a66] hover:text-primary font-medium transition-colors cursor-pointer">{product.collection}</span>
            <span className="text-[#4c9a66] font-medium">/</span>
            <span className="text-forest-dark font-medium">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16">
            {/* Left Column: Gallery */}
            <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-3 sm:gap-4 h-fit lg:sticky lg:top-8">
              {/* Thumbnails */}
              <div
                ref={thumbContainerRef}
                className="flex lg:flex-col gap-2 sm:gap-3 overflow-x-auto lg:overflow-y-auto lg:h-[600px] no-scrollbar shrink-0"
              >
                {currentImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                      activeImageIdx === idx
                        ? 'border-2 border-primary ring-2 ring-primary/20'
                        : 'border border-transparent hover:border-primary/50'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div
                ref={mainImageRef}
                className="flex-1 w-full bg-[#f0f4f1] rounded-xl overflow-hidden relative group aspect-square sm:aspect-[4/5] lg:aspect-auto lg:h-[600px]"
              >
                <img
                  src={currentImages[activeImageIdx]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); setIsFavorited(!isFavorited); }}
                  className={`absolute top-4 right-4 p-2.5 rounded-full cursor-pointer hover:scale-110 transition-all duration-300 shadow-sm z-10 ${
                    isFavorited ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-sm text-forest-dark hover:bg-white'
                  }`}
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                </button>
              </div>
            </div>

            {/* Right Column: Product Info */}
            <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-8">
              {/* Header Info */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">{product.collection}</span>
                  <span className="text-xs text-gray-500">SKU: {product.sku}</span>
                </div>
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-forest-dark tracking-tight">{product.name}</h1>
                  <img src="/logo.png" alt="World Weave Carpets" className="h-12 w-12 sm:h-14 sm:w-14 object-contain drop-shadow-md" />
                </div>
                <p className="text-xl sm:text-2xl font-semibold text-primary">{formatPrice(currentPrice)}</p>
                {product.rating > 0 && (
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex text-accent-gold text-sm">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: star <= Math.round(product.rating) ? "'FILL' 1" : "'FILL' 0" }}>
                          {star <= Math.floor(product.rating) ? 'star' : star === Math.ceil(product.rating) && product.rating % 1 >= 0.5 ? 'star_half' : 'star'}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviewCount} Reviews)</span>
                  </div>
                )}
              </div>

              {/* Eco & Trust Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-[11px] font-bold px-3 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-xs">eco</span> Eco-Friendly
                </span>
                <span className="inline-flex items-center gap-1 bg-[#e8f5e9] text-slate-700 text-[11px] font-bold px-3 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-xs">verified</span> Ethically Made
                </span>
                <span className="inline-flex items-center gap-1 bg-[#e8f5e9] text-slate-700 text-[11px] font-bold px-3 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-xs">local_shipping</span> Free Shipping
                </span>
                <span className="inline-flex items-center gap-1 bg-[#e8f5e9] text-slate-700 text-[11px] font-bold px-3 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-xs">recycling</span> Plastic-Free
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-base">{product.shortDescription}</p>

              {/* Selectors */}
              <div className="flex flex-col gap-6">
                {/* Sizes */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-forest-dark">Select Size</span>
                    <button className="text-xs text-[#4c9a66] hover:text-primary font-medium underline">Size Guide</button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {variant?.sizes?.map((s, idx) => (
                      <label key={idx} className="cursor-pointer group">
                        <input
                          type="radio"
                          name="size"
                          className="peer sr-only"
                          checked={selectedSizeIdx === idx}
                          onChange={() => setSelectedSizeIdx(idx)}
                        />
                        <div className="h-12 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-forest-dark transition-all peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:ring-1 peer-checked:ring-primary group-hover:border-primary/50">
                          {s.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 sm:gap-3 pt-2 sm:pt-4">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className={`w-full h-14 rounded-lg text-base font-bold tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 ${
                    addedToCart
                      ? 'bg-green-600 text-white hover:shadow-green-500/30'
                      : 'bg-primary hover:bg-primary/90 text-white hover:shadow-primary/30'
                  }`}
                >
                  <span className="material-symbols-outlined">{addedToCart ? 'check_circle' : 'favorite'}</span>
                  {addedToCart ? 'Added to Wishlist!' : `Add to Wishlist - ${formatPrice(totalPrice)}`}
                </motion.button>
                <a
                  href={getProductWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 border border-primary text-primary hover:bg-primary/5 rounded-lg text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">chat</span>
                  Inquire on WhatsApp
                </a>
                <p className="text-center text-xs text-gray-400 mt-2">
                  <span className="material-symbols-outlined align-middle text-sm mr-1">local_shipping</span>
                  Free shipping worldwide on orders over $200
                </p>
              </div>

              {/* Accordions */}
              <div className="border-t border-gray-200 mt-4">
                {/* Product Details */}
                <details className="group py-4 border-b border-gray-200 cursor-pointer">
                  <summary className="flex items-center justify-between font-bold text-forest-dark list-none">
                    Product Details
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                  </summary>
                  <div className="text-gray-600 text-sm leading-relaxed mt-4">
                    {product.details?.productDetails ? (
                      product.details.productDetails.split('\n').map((line, i) => (
                        <p key={i} className="mb-1">{line}</p>
                      ))
                    ) : (
                      <p>Information coming soon.</p>
                    )}
                  </div>
                </details>

                {/* Washing & Care */}
                <details className="group py-4 border-b border-gray-200 cursor-pointer" open>
                  <summary className="flex items-center justify-between font-bold text-forest-dark list-none">
                    Washing & Care
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                  </summary>
                  <div className="mt-4 space-y-3">
                    {[
                      { icon: 'do_not_touch', text: 'Do NOT brush or scrub the rug.' },
                      { icon: 'vacuum', text: 'Only vacuum clean periodically. Avoid using vacuum beater brush mode.' },
                      { icon: 'water_drop', text: 'If spills occur, blot immediately. Do not rub the stain.' },
                      { icon: 'sync', text: 'Rotate occasionally to equalize wear.' },
                      { icon: 'weekend', text: 'Use protectors under the legs of heavy furniture to avoid flattening and piling.' },
                      { icon: 'content_cut', text: 'If thread comes out, do not pull the yarn. Trim with scissors.' },
                      { icon: 'dry_cleaning', text: 'Periodic professional cleaning recommended.' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-base text-gray-600">{item.icon}</span>
                        </div>
                        <p className="text-sm text-gray-600 pt-1">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </details>

                {/* Shipping & Returns */}
                <details className="group py-4 border-b border-gray-200 cursor-pointer">
                  <summary className="flex items-center justify-between font-bold text-forest-dark list-none">
                    Shipping & Returns
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                  </summary>
                  <div className="text-gray-600 text-sm leading-relaxed mt-4">
                    {product.details?.shippingReturns ? (
                      product.details.shippingReturns.split('\n').map((line, i) => (
                        <p key={i} className="mb-1">{line}</p>
                      ))
                    ) : (
                      <div className="space-y-2">
                        <p>Free shipping on all orders above $200.</p>
                        <p>Standard delivery: 7-14 business days.</p>
                        <p>Express delivery: 3-5 business days (additional charges apply).</p>
                        <p>Returns accepted within 7 days of delivery for unused items in original packaging.</p>
                      </div>
                    )}
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Craftsmanship Badges */}
      <section className="py-8 sm:py-12 bg-white border-t border-b border-slate-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-20">
            {[
              { icon: 'eco', label: 'Sustainable' },
              { icon: 'volunteer_activism', label: 'Handcrafted' },
              { icon: 'texture', label: 'Made with Genuine Fabric' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-slate-700">{item.icon}</span>
                </div>
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Story Section */}
      <section className="py-12 sm:py-20 lg:py-28 bg-background-light">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
              <img
                src="https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955267/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_2.jpg"
                alt="Artisan weaving"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 to-transparent flex items-end p-8">
                <p className="text-white/90 text-sm font-medium tracking-wider uppercase">Atlas Mountains, Morocco</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 text-accent-gold mb-2">
                <span className="material-symbols-outlined">history_edu</span>
                <span className="text-sm font-bold uppercase tracking-widest">The Artisan Story</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-forest-dark leading-tight">
                Woven by History.<br />Crafted by Hand.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Each rug is a singular masterpiece, born from the hands of master weavers. This isn't just manufacturing; it is a rhythmic, meditative process that preserves centuries of heritage.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                By choosing World Weave Carpets, you directly support fair wages and sustainable wool sourcing, ensuring this ancient art form continues to thrive for generations to come.
              </p>
              <div className="pt-4">
                <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold hover:underline decoration-2 underline-offset-4 transition-all">
                  Meet Our Artisans
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
