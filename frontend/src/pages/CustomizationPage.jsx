import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWhatsAppLink, getContactEmail } from '../utils/contactConfig';

const patterns = [
  { id: 'geometric', label: 'Geometric', icon: 'grid_on', preview: 'repeating-linear-gradient(45deg, var(--c1) 25%, transparent 25%, transparent 75%, var(--c1) 75%), repeating-linear-gradient(45deg, var(--c1) 25%, var(--c2) 25%, var(--c2) 75%, var(--c1) 75%)' },
  { id: 'floral', label: 'Floral', icon: 'local_florist', preview: 'radial-gradient(circle at 30% 30%, var(--c1) 10%, transparent 10%), radial-gradient(circle at 70% 70%, var(--c1) 10%, transparent 10%), radial-gradient(circle at 50% 50%, var(--c1) 15%, transparent 15%)' },
  { id: 'abstract', label: 'Abstract', icon: 'gesture', preview: 'linear-gradient(135deg, var(--c1) 0%, var(--c2) 50%, var(--c1) 100%)' },
  { id: 'striped', label: 'Striped', icon: 'view_agenda', preview: 'repeating-linear-gradient(0deg, var(--c1) 0px, var(--c1) 12px, var(--c2) 12px, var(--c2) 24px)' },
  { id: 'medallion', label: 'Medallion', icon: 'filter_vintage', preview: 'radial-gradient(ellipse at center, var(--c1) 20%, var(--c2) 20%, var(--c2) 40%, var(--c1) 40%, var(--c1) 60%, var(--c2) 60%)' },
  { id: 'solid', label: 'Solid / Plain', icon: 'square', preview: 'var(--c1)' },
];

const sizes = [
  { id: '3x5', label: '3×5 ft', w: 120, h: 200, desc: 'Bedside / Accent' },
  { id: '5x8', label: '5×8 ft', w: 160, h: 256, desc: 'Living Room' },
  { id: '6x9', label: '6×9 ft', w: 180, h: 270, desc: 'Dining Room' },
  { id: '8x10', label: '8×10 ft', w: 200, h: 250, desc: 'Large Room' },
  { id: '9x12', label: '9×12 ft', w: 216, h: 288, desc: 'Grand Hall' },
  { id: 'runner', label: 'Runner', w: 80, h: 300, desc: '2.5×10 ft Hallway' },
  { id: 'round', label: 'Round 6 ft', w: 200, h: 200, desc: 'Circular' },
  { id: 'custom', label: 'Custom', w: 180, h: 260, desc: 'Your dimensions' },
];

const colorPalettes = [
  { id: 'ivory-gold', label: 'Ivory & Gold', c1: '#F5F0E1', c2: '#C5A55A' },
  { id: 'navy-cream', label: 'Navy & Cream', c1: '#1B2A4A', c2: '#F0EDE3' },
  { id: 'emerald-sage', label: 'Emerald & Sage', c1: '#0A5C36', c2: '#B5C9A8' },
  { id: 'rust-terracotta', label: 'Rust & Terracotta', c1: '#A0522D', c2: '#E8C4A0' },
  { id: 'charcoal-silver', label: 'Charcoal & Silver', c1: '#36454F', c2: '#C0C0C0' },
  { id: 'burgundy-blush', label: 'Burgundy & Blush', c1: '#722F37', c2: '#F2D7D9' },
  { id: 'ocean-sand', label: 'Ocean & Sand', c1: '#2E6B8A', c2: '#E8DCC8' },
  { id: 'black-white', label: 'Black & White', c1: '#1A1A1A', c2: '#F5F5F5' },
  { id: 'teal-coral', label: 'Teal & Coral', c1: '#008080', c2: '#FF7F50' },
  { id: 'plum-lavender', label: 'Plum & Lavender', c1: '#5B2C6F', c2: '#D7BDE2' },
  { id: 'forest-moss', label: 'Forest & Moss', c1: '#1B4332', c2: '#95D5B2' },
  { id: 'copper-cream', label: 'Copper & Cream', c1: '#B87333', c2: '#FFF8E7' },
  { id: 'slate-peach', label: 'Slate & Peach', c1: '#4A5568', c2: '#FFDAB9' },
  { id: 'indigo-mustard', label: 'Indigo & Mustard', c1: '#2C3E7B', c2: '#E3B505' },
  { id: 'wine-rose', label: 'Wine & Rose', c1: '#5E1224', c2: '#F4C2C2' },
  { id: 'olive-sand', label: 'Olive & Sand', c1: '#556B2F', c2: '#F5DEB3' },
];

const materials = [
  { id: 'wool', label: 'New Zealand Wool', icon: 'diamond', desc: 'Durable & stain-resistant', price: '₹₹' },
  { id: 'silk', label: 'Pure Silk', icon: 'water_drop', desc: 'Lustrous & opulent', price: '₹₹₹₹' },
  { id: 'wool-silk', label: 'Wool-Silk Blend', icon: 'spa', desc: 'Best of both worlds', price: '₹₹₹' },
  { id: 'bamboo', label: 'Bamboo Silk', icon: 'eco', desc: 'Eco-friendly luxury', price: '₹₹₹' },
  { id: 'cotton', label: 'Organic Cotton', icon: 'grass', desc: 'Soft & breathable', price: '₹' },
  { id: 'jute', label: 'Natural Jute', icon: 'nature', desc: 'Rustic & textured', price: '₹' },
];

const shapes = [
  { id: 'rectangle', label: 'Rectangle', icon: 'crop_landscape', clip: 'none', ratio: 0.67, desc: 'Classic rectangular rug' },
  { id: 'square', label: 'Square', icon: 'crop_square', clip: 'none', ratio: 1, desc: 'Perfect square' },
  { id: 'round', label: 'Round', icon: 'circle', clip: 'ellipse(50% 50% at 50% 50%)', ratio: 1, desc: 'Circular rug' },
  { id: 'oval', label: 'Oval', icon: 'panorama_fish_eye', clip: 'ellipse(50% 50% at 50% 50%)', ratio: 0.7, desc: 'Elegant oval shape' },
  { id: 'runner', label: 'Runner', icon: 'view_column', clip: 'none', ratio: 0.25, desc: 'Long hallway runner' },
  { id: 'octagon', label: 'Octagon', icon: 'octagon', clip: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', ratio: 1, desc: 'Eight-sided classic' },
  { id: 'hexagon', label: 'Hexagon', icon: 'hexagon', clip: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', ratio: 0.87, desc: 'Modern six-sided' },
  { id: 'kidney', label: 'Kidney / Freeform', icon: 'water', clip: 'ellipse(45% 48% at 55% 50%)', ratio: 0.75, desc: 'Organic freeform shape' },
  { id: 'diamond', label: 'Diamond', icon: 'diamond', clip: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', ratio: 0.75, desc: 'Rotated square' },
  { id: 'scalloped', label: 'Scalloped', icon: 'filter_vintage', clip: 'polygon(50% 0%, 63% 5%, 75% 0%, 85% 10%, 100% 15%, 95% 28%, 100% 40%, 95% 52%, 100% 65%, 90% 72%, 85% 85%, 72% 90%, 60% 100%, 50% 95%, 40% 100%, 28% 90%, 15% 85%, 10% 72%, 0% 65%, 5% 52%, 0% 40%, 5% 28%, 0% 15%, 15% 10%, 25% 0%, 37% 5%)', ratio: 1, desc: 'Decorative scalloped edge' },
  { id: 'arch', label: 'Arch / Prayer', icon: 'door_front', clip: 'polygon(0% 100%, 0% 35%, 5% 20%, 15% 8%, 30% 2%, 50% 0%, 70% 2%, 85% 8%, 95% 20%, 100% 35%, 100% 100%)', ratio: 0.65, desc: 'Traditional prayer rug' },
  { id: 'halfmoon', label: 'Half Moon', icon: 'dark_mode', clip: 'ellipse(50% 100% at 50% 100%)', ratio: 1.8, desc: 'Semi-circular doormat' },
];

const builderSteps = [
  { key: 'shape', label: 'Shape', icon: 'category' },
  { key: 'pattern', label: 'Pattern', icon: 'brush' },
  { key: 'size', label: 'Size', icon: 'square_foot' },
  { key: 'color', label: 'Colors', icon: 'palette' },
  { key: 'material', label: 'Material', icon: 'texture' },
];

export default function CustomizationPage() {
  const [builderStep, setBuilderStep] = useState(0);
  const [selections, setSelections] = useState({
    shape: null,
    pattern: null,
    size: null,
    color: null,
    material: null,
    customW: '',
    customH: '',
    borderStyle: 'none',
  });
  const [showSummary, setShowSummary] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const [customC1, setCustomC1] = useState('#C5A55A');
  const [customC2, setCustomC2] = useState('#F5F0E1');

  const selectedShape = shapes.find((s) => s.id === selections.shape);
  const selectedPattern = patterns.find((p) => p.id === selections.pattern);
  const selectedSize = sizes.find((s) => s.id === selections.size);
  const selectedColor = selections.color === 'custom'
    ? { id: 'custom', label: `Custom (${customC1} / ${customC2})`, c1: customC1, c2: customC2 }
    : colorPalettes.find((c) => c.id === selections.color);
  const selectedMaterial = materials.find((m) => m.id === selections.material);

  const canProceed = () => {
    const k = builderSteps[builderStep]?.key;
    return !!selections[k];
  };

  const getRugStyle = () => {
    const c1 = selectedColor?.c1 || '#E8DCC8';
    const c2 = selectedColor?.c2 || '#C5A55A';
    const clip = selectedShape?.clip || 'none';
    const needsRadius = !selectedShape || selectedShape.id === 'rectangle' || selectedShape.id === 'square' || selectedShape.id === 'runner';
    const isSolid = !selectedPattern || selectedPattern.id === 'solid';
    const bgSize = selectedPattern?.id === 'geometric' || selectedPattern?.id === 'striped' ? '24px 24px' : 'cover';
    const style = {
      clipPath: clip !== 'none' ? clip : undefined,
      borderRadius: needsRadius ? (selections.borderStyle === 'fringed' ? '2px' : '8px') : undefined,
      border: selections.borderStyle === 'bordered' ? `4px solid ${c1}` : selections.borderStyle === 'fringed' ? `4px dashed ${c1}` : 'none',
      boxShadow: clip !== 'none' ? 'none' : '0 20px 60px rgba(0,0,0,0.15)',
    };
    if (isSolid) {
      style.backgroundColor = c1;
    } else {
      style.backgroundImage = selectedPattern.preview.replace(/var\(--c1\)/g, c1).replace(/var\(--c2\)/g, c2);
      style.backgroundSize = bgSize;
      style.backgroundColor = c2;
    }
    return style;
  };

  const getPreviewDimensions = () => {
    const shapeRatio = selectedShape?.ratio || 0.67;
    if (!selectedSize) {
      const baseH = 240;
      return { width: Math.round(baseH * shapeRatio), height: baseH };
    }
    const maxH = 260;
    const ratio = selectedSize.w / selectedSize.h;
    const h = Math.min(selectedSize.h, maxH);
    const w = h * ratio;
    return { width: Math.min(w, 280), height: h };
  };

  const generateSummary = () => {
    const sizeLabel = selectedSize?.id === 'custom' ? `${selections.customW}×${selections.customH} ft` : selectedSize?.label;
    return `Custom Rug Inquiry:\n• Shape: ${selectedShape?.label || 'N/A'}\n• Pattern: ${selectedPattern?.label || 'N/A'}\n• Size: ${sizeLabel || 'N/A'}\n• Colors: ${selectedColor?.label || 'N/A'}\n• Material: ${selectedMaterial?.label || 'N/A'}\n• Border: ${selections.borderStyle}\n\nI'd like to get a quote for this custom rug.`;
  };

  const steps = [
    { num: '01', icon: 'brush', title: 'Choose Design', desc: 'Begin with inspiration. Select from our curated archival patterns or collaborate with our artists to create a completely unique motif that speaks to your space.', img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955268/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_3.jpg', imgAlt: 'Artist sketching rug designs' },
    { num: '02', icon: 'square_foot', title: 'Define Dimensions', desc: 'Precision is paramount. Whether it\'s a grand hall runner or an intimate bedside accent, we tailor the dimensions to fit your floor plan perfectly.', img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955276/world-weave-rugs/1771944039726-25070a19-06bc-4ecc-91ed-89efdec00c1aNEW__3.jpg', imgAlt: 'Measuring tape on floor plan' },
    { num: '03', icon: 'palette', title: 'Colors & Materials', desc: 'Hand-pick from our library of 1,200+ wool and silk dyes. Feel the difference between highland wool and botanical silk through our sample box.', img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955271/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_44.jpg', imgAlt: 'Colorful yarn spools' },
    { num: '04', icon: '3d_rotation', title: 'Design Preview', desc: 'Visualize the final piece in your room before weaving begins. We provide high-fidelity 3D renderings to ensure every nuance meets your expectations.', img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955284/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_22.jpg', imgAlt: 'Digital tablet showing rug render' },
    { num: '05', icon: 'gesture', title: 'Artisan Crafting', desc: 'Once approved, your design travels to our looms. Master artisans hand-knot every inch, a process that takes 12-16 weeks of dedicated craftsmanship.', img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955267/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_2.jpg', imgAlt: 'Hands weaving a rug on a loom' },
  ];

  return (
    <div className="bg-background-light text-slate-900 font-display antialiased">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] sm:h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background-light z-10"></div>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955283/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_19.jpg')" }}
          />
        </div>
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-6">
          <span className="text-primary font-medium tracking-widest uppercase text-sm bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full border border-white/20">
            The Atelier Process
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
            Create Your <br /> Custom Rug
          </h1>
          <p className="text-base sm:text-xl text-gray-200 max-w-2xl font-light leading-relaxed">
            A Journey Designed Around You. From imagination to the loom, witness the art of custom craftsmanship woven into every fiber.
          </p>
          <div className="mt-8">
            <a href="#builder" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center gap-2">
              Design Your Rug
              <span className="material-symbols-outlined text-sm">arrow_downward</span>
            </a>
          </div>
        </div>
      </div>

      {/* ===== INTERACTIVE RUG BUILDER ===== */}
      <section id="builder" className="py-12 sm:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-3 block">Interactive</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">Design Your Rug</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Customize every detail and see a live preview. When you're happy, send your design to our artisans.</p>
          </div>

          {/* Step Progress */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-10">
            {builderSteps.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setBuilderStep(i)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  builderStep === i
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : i < builderStep && selections[s.key]
                    ? 'bg-primary/10 text-primary'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <span className="material-symbols-outlined text-base sm:text-lg">{
                  i < builderStep && selections[s.key] ? 'check_circle' : s.icon
                }</span>
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{String(i + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left: Options Panel */}
            <div className="lg:col-span-3 min-h-[320px]">
              <AnimatePresence mode="wait">
                {/* STEP 0: Shape */}
                {builderStep === 0 && (
                  <motion.div key="shape" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Choose Rug Shape</h3>
                    <p className="text-sm text-slate-500 mb-6">Select the form your rug will take — from classic rectangles to unique freeform shapes.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {shapes.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSelections({ ...selections, shape: s.id })}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                            selections.shape === s.id
                              ? 'border-primary bg-primary/5 shadow-md'
                              : 'border-gray-200 hover:border-primary/40 bg-white'
                          }`}
                        >
                          {/* Shape thumbnail */}
                          <div className="w-14 h-14 flex items-center justify-center">
                            <div
                              className={`transition-colors ${
                                selections.shape === s.id ? 'bg-primary/20' : 'bg-gray-100'
                              }`}
                              style={{
                                width: Math.round(40 * Math.min(s.ratio, 1.2)),
                                height: Math.round(40 / Math.max(s.ratio, 0.4)),
                                clipPath: s.clip !== 'none' ? s.clip : undefined,
                                borderRadius: s.clip === 'none' ? (s.id === 'runner' ? '3px' : '4px') : undefined,
                                maxWidth: 48,
                                maxHeight: 48,
                              }}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-800 text-center leading-tight">{s.label}</span>
                          <span className="text-[10px] text-slate-400 text-center leading-tight">{s.desc}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 1: Pattern */}
                {builderStep === 1 && (
                  <motion.div key="pattern" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Choose a Pattern</h3>
                    <p className="text-sm text-slate-500 mb-6">Select the base design motif for your rug.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                      {patterns.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setSelections({ ...selections, pattern: p.id })}
                          className={`flex flex-col items-center gap-3 p-4 sm:p-5 rounded-xl border-2 transition-all ${
                            selections.pattern === p.id
                              ? 'border-primary bg-primary/5 shadow-md'
                              : 'border-gray-200 hover:border-primary/40 bg-white'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            selections.pattern === p.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                          }`}>
                            <span className="material-symbols-outlined text-2xl">{p.icon}</span>
                          </div>
                          <span className="text-sm font-bold text-slate-800">{p.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Reference Designs */}
                    <div className="mt-6 pt-5 border-t border-gray-100">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-sm text-primary">lightbulb</span>
                        <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Reference Designs for Inspiration</p>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {[
                          { img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955268/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_3.jpg', label: 'Persian Medallion' },
                          { img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955276/world-weave-rugs/1771944039726-25070a19-06bc-4ecc-91ed-89efdec00c1aNEW__3.jpg', label: 'Modern Geometric' },
                          { img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955272/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_68.jpg', label: 'Diamond Lattice' },
                          { img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955265/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_19.jpg', label: 'Moroccan Berber' },
                          { img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955274/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_73.jpg', label: 'Classic Trellis' },
                          { img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955271/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_44.jpg', label: 'Jute Diamond' },
                          { img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955277/world-weave-rugs/1771944039726-25070a19-06bc-4ecc-91ed-89efdec00c1aNEW__6.jpg', label: 'Abstract Art' },
                          { img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955264/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_1.jpg', label: 'Natural Jute' },
                        ].map((ref, i) => (
                          <div key={i} className="group relative rounded-lg overflow-hidden aspect-square cursor-pointer">
                            <img src={ref.img} alt={ref.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                              <span className="text-[10px] font-bold text-white leading-tight">{ref.label}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-2 text-center">These are reference images for inspiration. Your custom rug will be uniquely crafted.</p>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Size */}
                {builderStep === 2 && (
                  <motion.div key="size" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Select Size</h3>
                    <p className="text-sm text-slate-500 mb-6">Pick a standard size or enter custom dimensions.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {sizes.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSelections({ ...selections, size: s.id })}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            selections.size === s.id
                              ? 'border-primary bg-primary/5 shadow-md'
                              : 'border-gray-200 hover:border-primary/40 bg-white'
                          }`}
                        >
                          <span className="text-base font-bold text-slate-800 block">{s.label}</span>
                          <span className="text-xs text-slate-500">{s.desc}</span>
                        </button>
                      ))}
                    </div>
                    {selections.size === 'custom' && (
                      <div className="flex gap-4 mt-4">
                        <div className="flex-1">
                          <label className="text-xs font-bold text-slate-600 mb-1 block">Width (ft)</label>
                          <input type="number" value={selections.customW} onChange={(e) => setSelections({ ...selections, customW: e.target.value })} placeholder="e.g. 7" className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm" />
                        </div>
                        <div className="flex-1">
                          <label className="text-xs font-bold text-slate-600 mb-1 block">Height (ft)</label>
                          <input type="number" value={selections.customH} onChange={(e) => setSelections({ ...selections, customH: e.target.value })} placeholder="e.g. 10" className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* STEP 3: Colors */}
                {builderStep === 3 && (
                  <motion.div key="color" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Choose Color Palette</h3>
                    <p className="text-sm text-slate-500 mb-4">Select a preset or pick your own custom colors.</p>

                    {/* Custom color picker */}
                    <div className={`mb-5 p-4 rounded-xl border-2 transition-all ${
                      selections.color === 'custom' ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'
                    }`}>
                      <button
                        onClick={() => setSelections({ ...selections, color: 'custom' })}
                        className="flex items-center gap-3 w-full text-left mb-3"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center" style={{ backgroundImage: `linear-gradient(135deg, ${customC1}, ${customC2})` }}>
                          <span className="material-symbols-outlined text-white text-lg drop-shadow">colorize</span>
                        </div>
                        <div>
                          <span className="text-sm font-bold text-slate-800 block">Custom Colors</span>
                          <span className="text-xs text-slate-500">Pick any two colors you want</span>
                        </div>
                        {selections.color === 'custom' && (
                          <span className="material-symbols-outlined text-primary ml-auto">check_circle</span>
                        )}
                      </button>
                      {selections.color === 'custom' && (
                        <div className="flex gap-4 pt-2 border-t border-gray-100">
                          <div className="flex-1">
                            <label className="text-xs font-bold text-slate-600 mb-1.5 block">Primary Color</label>
                            <div className="flex items-center gap-2">
                              <input type="color" value={customC1} onChange={(e) => setCustomC1(e.target.value)} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
                              <input type="text" value={customC1} onChange={(e) => setCustomC1(e.target.value)} className="flex-1 px-2 py-1.5 rounded-lg border border-gray-200 text-xs font-mono" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <label className="text-xs font-bold text-slate-600 mb-1.5 block">Secondary Color</label>
                            <div className="flex items-center gap-2">
                              <input type="color" value={customC2} onChange={(e) => setCustomC2(e.target.value)} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
                              <input type="text" value={customC2} onChange={(e) => setCustomC2(e.target.value)} className="flex-1 px-2 py-1.5 rounded-lg border border-gray-200 text-xs font-mono" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Preset palettes */}
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Or choose a preset</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {colorPalettes.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelections({ ...selections, color: c.id })}
                          className={`p-2.5 rounded-xl border-2 transition-all ${
                            selections.color === c.id
                              ? 'border-primary shadow-md'
                              : 'border-gray-200 hover:border-primary/40'
                          }`}
                        >
                          <div className="flex gap-0.5 mb-1.5 justify-center">
                            <div className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: c.c1 }} />
                            <div className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: c.c2 }} />
                          </div>
                          <span className="text-[10px] font-bold text-slate-600 block leading-tight">{c.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Border style */}
                    <div className="mt-6">
                      <p className="text-sm font-bold text-slate-700 mb-3">Border Style</p>
                      <div className="flex flex-wrap gap-2">
                        {['none', 'bordered', 'fringed'].map((b) => (
                          <button
                            key={b}
                            onClick={() => setSelections({ ...selections, borderStyle: b })}
                            className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all ${
                              selections.borderStyle === b
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {b === 'none' ? 'No Border' : b}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Material */}
                {builderStep === 4 && (
                  <motion.div key="material" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Select Material</h3>
                    <p className="text-sm text-slate-500 mb-6">Choose the fiber that suits your lifestyle.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {materials.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setSelections({ ...selections, material: m.id })}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                            selections.material === m.id
                              ? 'border-primary bg-primary/5 shadow-md'
                              : 'border-gray-200 hover:border-primary/40 bg-white'
                          }`}
                        >
                          <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
                            selections.material === m.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                          }`}>
                            <span className="material-symbols-outlined">{m.icon}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-bold text-slate-800 block">{m.label}</span>
                            <span className="text-xs text-slate-500">{m.desc}</span>
                          </div>
                          <span className="text-xs font-bold text-primary shrink-0">{m.price}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => builderStep > 0 && setBuilderStep(builderStep - 1)}
                  disabled={builderStep === 0}
                  className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">arrow_back</span>
                  Back
                </button>
                {builderStep < 4 ? (
                  <button
                    onClick={() => canProceed() && setBuilderStep(builderStep + 1)}
                    disabled={!canProceed()}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                  >
                    Next Step
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                ) : (
                  <button
                    onClick={() => { if (canProceed()) setShowSummary(true); }}
                    disabled={!canProceed()}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                  >
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    Get Quote
                  </button>
                )}
              </div>
            </div>

            {/* Right: Live Preview */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
                {/* Toggle: Preview / Room View */}
                <div className="flex items-center justify-center gap-1 mb-5 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setShowRoom(false)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-bold transition-all ${
                      !showRoom ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-400'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">visibility</span>
                    Preview
                  </button>
                  <button
                    onClick={() => setShowRoom(true)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-bold transition-all ${
                      showRoom ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-400'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">living</span>
                    View in Room
                  </button>
                </div>

                <div className="mb-6" style={{ minHeight: 300 }}>
                  {showRoom ? (
                    /* Room view — luxury marble floor with rug */
                    <div className="relative w-full rounded-xl overflow-hidden" style={{ height: 320 }}>
                      {/* Marble floor */}
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundColor: '#f0ece4',
                          backgroundImage: `
                            radial-gradient(ellipse at 20% 50%, rgba(180,165,140,0.15) 0%, transparent 50%),
                            radial-gradient(ellipse at 80% 20%, rgba(160,145,120,0.12) 0%, transparent 40%),
                            radial-gradient(ellipse at 60% 80%, rgba(170,155,130,0.1) 0%, transparent 45%),
                            linear-gradient(135deg, rgba(200,190,170,0.08) 25%, transparent 25%),
                            linear-gradient(225deg, rgba(200,190,170,0.08) 25%, transparent 25%),
                            linear-gradient(315deg, rgba(200,190,170,0.08) 25%, transparent 25%),
                            linear-gradient(45deg, rgba(200,190,170,0.08) 25%, transparent 25%)
                          `,
                          backgroundSize: '100% 100%, 100% 100%, 100% 100%, 40px 40px, 40px 40px, 40px 40px, 40px 40px',
                        }}
                      />
                      {/* Marble veins */}
                      <div className="absolute inset-0 opacity-[0.04]" style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'400\' height=\'400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 200 Q100 180 200 200 T400 180\' stroke=\'%23666\' fill=\'none\' stroke-width=\'1\'/%3E%3Cpath d=\'M0 100 Q150 120 250 90 T400 110\' stroke=\'%23888\' fill=\'none\' stroke-width=\'0.5\'/%3E%3Cpath d=\'M0 300 Q120 280 220 310 T400 290\' stroke=\'%23777\' fill=\'none\' stroke-width=\'0.8\'/%3E%3C/svg%3E")',
                        backgroundSize: '400px 400px',
                      }} />
                      {/* Warm ambient light */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-transparent to-stone-200/20" />
                      {/* Subtle shadow edges for depth */}
                      <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.08)]" />

                      {/* Rug — exact same rendering as preview */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div
                          style={{
                            ...getRugStyle(),
                            width: getPreviewDimensions().width,
                            height: getPreviewDimensions().height,
                            filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.2))',
                          }}
                        />
                      </div>

                      {/* Logo — bottom-right corner */}
                      <div className="absolute bottom-2.5 right-2.5 pointer-events-none">
                        <img src="/logo.png" alt="" className="w-5 h-5 opacity-40" />
                      </div>
                      {/* Label */}
                      <div className="absolute top-2.5 left-2.5 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded flex items-center gap-1">
                        <span className="material-symbols-outlined text-[10px]">living</span>
                        Floor View
                      </div>
                    </div>
                  ) : (
                    /* Standard preview */
                    <div className="relative flex items-center justify-center" style={{ minHeight: 300 }}>
                      <motion.div
                        layout
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                        style={{
                          ...getRugStyle(),
                          width: getPreviewDimensions().width,
                          height: getPreviewDimensions().height,
                        }}
                        className="relative flex items-center justify-center"
                      >
                        {!selections.pattern && !selections.color && (
                          <div className="text-center text-gray-400">
                            <span className="material-symbols-outlined text-4xl mb-2 block">brush</span>
                            <p className="text-xs font-medium">Start customizing</p>
                          </div>
                        )}
                      </motion.div>
                      {/* Logo — bottom-right corner */}
                      <div className="absolute bottom-1 right-1 pointer-events-none">
                        <img src="/logo.png" alt="" className="w-6 h-6 opacity-25" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Selection Summary */}
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Shape', value: selectedShape?.label },
                    { label: 'Pattern', value: selectedPattern?.label },
                    { label: 'Size', value: selectedSize?.id === 'custom' ? `${selections.customW || '?'}×${selections.customH || '?'} ft` : selectedSize?.label },
                    { label: 'Colors', value: selectedColor?.label },
                    { label: 'Material', value: selectedMaterial?.label },
                    { label: 'Border', value: selections.borderStyle !== 'none' ? selections.borderStyle : null },
                  ].filter(s => s.value).map((s, i) => (
                    <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
                      <span className="text-gray-500 text-xs font-medium">{s.label}</span>
                      <span className="text-slate-800 text-xs font-bold">{s.value}</span>
                    </div>
                  ))}
                  {!selectedShape && !selectedPattern && !selectedSize && !selectedColor && !selectedMaterial && (
                    <p className="text-center text-xs text-gray-400 py-4">Your selections will appear here</p>
                  )}
                </div>

                {/* Share on WhatsApp button */}
                {(selections.pattern || selections.color) && (
                  <a
                    href={getWhatsAppLink(generateSummary())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold transition-all shadow-lg shadow-[#25D366]/20"
                  >
                    <span className="material-symbols-outlined text-lg">chat</span>
                    Share Design on WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Modal */}
      <AnimatePresence>
        {showSummary && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowSummary(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-[#0A2E18] px-6 py-6 text-center">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-3xl text-primary">check_circle</span>
                </div>
                <h3 className="text-xl font-bold text-white">Your Custom Rug</h3>
                <p className="text-gray-400 text-sm mt-1">Here's a summary of your design</p>
              </div>
              <div className="px-6 py-6 space-y-3">
                {[
                  { icon: 'category', label: 'Shape', value: selectedShape?.label },
                  { icon: 'brush', label: 'Pattern', value: selectedPattern?.label },
                  { icon: 'square_foot', label: 'Size', value: selectedSize?.id === 'custom' ? `${selections.customW}×${selections.customH} ft` : selectedSize?.label },
                  { icon: 'palette', label: 'Colors', value: selectedColor?.label },
                  { icon: 'texture', label: 'Material', value: selectedMaterial?.label },
                  { icon: 'crop_free', label: 'Border', value: selections.borderStyle === 'none' ? 'No Border' : selections.borderStyle },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <p className="text-sm font-bold text-slate-800">{item.value || 'N/A'}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={getWhatsAppLink(generateSummary())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-whatsapp flex items-center justify-center gap-2 text-sm"
                >
                  <span className="material-symbols-outlined text-lg">chat</span>
                  Send via WhatsApp
                </a>
                <a
                  href={`mailto:${getContactEmail()}?subject=Custom Rug Inquiry&body=${encodeURIComponent(generateSummary())}`}
                  className="flex-1 btn-dark flex items-center justify-center gap-2 text-sm"
                >
                  <span className="material-symbols-outlined text-lg">mail</span>
                  Email Us
                </a>
              </div>
              <div className="px-6 pb-4 text-center">
                <button onClick={() => setShowSummary(false)} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                  ← Back to editing
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Timeline Steps */}
      <div id="steps" className="relative max-w-[1280px] mx-auto px-6 py-24 overflow-hidden">
        {/* Central Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#c5b358]/30 to-transparent hidden md:block -translate-x-1/2"></div>

        {steps.map((step, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={step.num} className="relative flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-12 mb-16 sm:mb-32 group">
              {/* Content */}
              <div className={`w-full md:w-5/12 text-center ${isEven ? 'md:text-right md:order-1' : 'md:text-left md:order-2'}`}>
                <div className="inline-block mb-4 p-3 bg-primary/10 rounded-full text-primary">
                  <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                </div>
                <h3 className="text-primary font-bold text-lg mb-2">Step {step.num}</h3>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{step.title}</h2>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                {step.num === '04' && (
                  <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-primary shadow-sm">
                    <p className="italic text-sm text-slate-500">"The 3D render was spot on. I knew exactly what I was getting." — Sarah J.</p>
                  </div>
                )}
              </div>

              {/* Timeline Node */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-12 h-12 rounded-full bg-background-light border-2 border-primary z-10 shadow-[0_0_15px_rgba(15,189,73,0.3)]">
                <span className="text-primary font-bold text-sm">{step.num}</span>
              </div>

              {/* Visual */}
              <div className={`w-full md:w-5/12 ${isEven ? 'md:order-3' : ''}`}>
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl relative group-hover:shadow-primary/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={step.img} alt={step.imgAlt} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Premium Materials Section */}
      <div className="bg-luxury-green text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined" style={{ fontSize: '400px' }}>filter_vintage</span>
        </div>
        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="mb-16 text-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight">The Foundation of Luxury</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
              We source only the finest fibers from around the world to ensure your piece stands the test of time and trend.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'diamond', title: 'New Zealand Wool', desc: 'Celebrated for its purity and whiteness, allowing for the most vibrant dye absorption. Durable, resilient, and naturally stain-resistant.' },
              { icon: 'spa', title: 'Bamboo Silk', desc: 'A sustainable luxury with a soft, lustrous sheen similar to traditional silk but with a modern eco-conscious footprint.' },
              { icon: 'water_drop', title: 'Pure Chinese Silk', desc: 'The ultimate in opulence. Its triangular prism-like fiber structure refracts light, giving the rug a shimmering, dynamic appearance.' },
            ].map((mat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 group">
                <div className="mb-6 text-[#c5b358]">
                  <span className="material-symbols-outlined text-4xl group-hover:scale-110 transition-transform">{mat.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{mat.title}</h3>
                <p className="text-gray-400 leading-relaxed">{mat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 bg-background-light">
        <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl shadow-xl p-10 md:p-16 border border-gray-100">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6">Ready to Weave Your Story?</h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Our design consultants are ready to guide you through every knot and hue. Start your custom rug journey today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <a
              href={getWhatsAppLink("Hi! I'm interested in a custom rug.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto btn-whatsapp flex items-center justify-center gap-3 text-lg"
            >
              <span className="material-symbols-outlined">chat</span>
              WhatsApp Us
            </a>
            <a
              href={`mailto:${getContactEmail()}?subject=Custom Rug Inquiry`}
              className="w-full sm:w-auto btn-dark flex items-center justify-center gap-3 text-lg"
            >
              <span className="material-symbols-outlined">mail</span>
              Email Design Team
            </a>
          </div>
          <p className="mt-8 text-sm text-slate-400">
            Typical response time: Under 2 hours during business hours.
          </p>
        </div>
      </div>
    </div>
  );
}
