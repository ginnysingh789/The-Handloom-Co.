const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');
const Collection = require('./models/Collection');
const Addon = require('./models/Addon');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/luxury-rugs';

const collections = [
  { name: 'Persian Heritage', slug: 'persian-heritage', description: 'Timeless Persian designs handcrafted by master artisans', image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=600', featured: true, order: 1 },
  { name: 'Modern Minimalist', slug: 'modern-minimalist', description: 'Clean lines and contemporary patterns for modern spaces', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600', featured: true, order: 2 },
  { name: 'Bohemian Rhapsody', slug: 'bohemian-rhapsody', description: 'Free-spirited designs with vibrant colors and textures', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600', featured: true, order: 3 },
  { name: 'Royal Mughal', slug: 'royal-mughal', description: 'Inspired by the grandeur of Mughal architecture', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', featured: true, order: 4 },
  { name: 'Coastal Breeze', slug: 'coastal-breeze', description: 'Light, airy designs inspired by ocean and sand', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600', featured: false, order: 5 },
  { name: 'Vintage Revival', slug: 'vintage-revival', description: 'Distressed and aged looks with old-world charm', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600', featured: true, order: 6 }
];

const addons = [
  { name: 'Anti-Slip Backing', description: 'Premium anti-slip rubber backing to prevent rug movement', price: 1499, tooltip: 'Recommended for hardwood and tile floors. Adds a thin rubber layer to the back of your rug.', isActive: true },
  { name: 'Stain Resistance Coating', description: 'Nano-tech stain resistance coating for easy maintenance', price: 1999, tooltip: 'Invisible protective coating that repels liquids and prevents stains. Lasts up to 2 years.', isActive: true },
  { name: 'Custom Fringe Finishing', description: 'Hand-tied decorative fringe on rug edges', price: 2499, tooltip: 'Artisan hand-tied fringe adds an elegant finishing touch to your rug.', isActive: true }
];

const products = [
  {
    name: 'Maharaja Persian Silk Rug',
    slug: 'maharaja-persian-silk-rug',
    sku: 'RUG-PER-001',
    shortDescription: 'Hand-knotted pure silk rug with intricate floral medallion pattern, crafted by master artisans in Kashmir.',
    longDescription: 'This exquisite hand-knotted silk rug represents the pinnacle of Persian craftsmanship. Each piece takes over 6 months to complete, with artisans tying over 400 knots per square inch. The intricate floral medallion design is inspired by 16th-century Persian garden motifs.',
    basePrice: 45999,
    originalPrice: 59999,
    category: 'Persian',
    collection: 'Persian Heritage',
    tags: ['silk', 'hand-knotted', 'persian', 'luxury', 'bestseller'],
    material: '100% Pure Silk',
    weaveType: 'Hand-Knotted',
    origin: 'Kashmir, India',
    variants: [
      {
        color: { name: 'Royal Ivory', hex: '#F5F0E8', images: [
          'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800',
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
        ]},
        sizes: [
          { label: '4×6 ft', dimensions: '4 feet × 6 feet', price: 45999, stock: 5, readyToShip: true },
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 65999, stock: 3, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 125999, stock: 2, readyToShip: false },
          { label: '9×12 ft', dimensions: '9 feet × 12 feet', price: 175999, stock: 1, readyToShip: false }
        ]
      },
      {
        color: { name: 'Deep Burgundy', hex: '#722F37', images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
          'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
        ]},
        sizes: [
          { label: '4×6 ft', dimensions: '4 feet × 6 feet', price: 45999, stock: 4, readyToShip: true },
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 65999, stock: 2, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 125999, stock: 1, readyToShip: false }
        ]
      },
      {
        color: { name: 'Midnight Blue', hex: '#191970', images: [
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
          'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800',
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800'
        ]},
        sizes: [
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 65999, stock: 3, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 125999, stock: 2, readyToShip: false }
        ]
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ],
    details: {
      productDetails: 'Material: 100% Pure Silk\nWeave: Hand-Knotted (400+ knots/sq inch)\nPile Height: 6mm\nBacking: Cotton\nOrigin: Kashmir, India\nPattern: Floral Medallion\nEdge: Hand-bound serging\nCertification: GoodWeave certified',
      washingCare: 'Professional dry cleaning recommended\nVacuum regularly with suction only (no beater bar)\nRotate rug every 6 months for even wear\nBlot spills immediately with clean white cloth\nAvoid direct sunlight to prevent fading\nUse rug pad on hard floors',
      shippingReturns: 'Free shipping on all orders above ₹10,000\nDelivery within 5-7 business days (metro cities)\n10-14 business days for remote locations\n15-day return policy for unused items\nFree pickup for returns\nCustom orders are non-returnable',
      aboutDesign: 'The Maharaja Persian Silk Rug draws inspiration from the royal gardens of 16th-century Persia. The central medallion represents the sun, surrounded by intricate floral arabesques symbolizing paradise. Each motif is carefully hand-knotted by master artisans who have inherited this craft through generations. The silk gives the rug a luminous sheen that changes with the light, making it a living piece of art.'
    },
    deliveryTimeline: '5-7 business days',
    isFeatured: true,
    isNewArrival: false,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 124
  },
  {
    name: 'Zenith Contemporary Wool Rug',
    slug: 'zenith-contemporary-wool-rug',
    sku: 'RUG-MOD-002',
    shortDescription: 'Hand-tufted New Zealand wool rug with geometric abstract pattern in neutral tones.',
    longDescription: 'The Zenith rug brings contemporary elegance to any space. Hand-tufted from premium New Zealand wool, its abstract geometric pattern creates visual depth and movement.',
    basePrice: 32999,
    originalPrice: 42999,
    category: 'Modern',
    collection: 'Modern Minimalist',
    tags: ['wool', 'hand-tufted', 'modern', 'geometric', 'new-arrival'],
    material: 'New Zealand Wool',
    weaveType: 'Hand-Tufted',
    origin: 'Bhadohi, India',
    variants: [
      {
        color: { name: 'Warm Grey', hex: '#9E9E9E', images: [
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
        ]},
        sizes: [
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 32999, stock: 8, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 62999, stock: 4, readyToShip: true },
          { label: '9×12 ft', dimensions: '9 feet × 12 feet', price: 89999, stock: 2, readyToShip: false }
        ]
      },
      {
        color: { name: 'Sage Green', hex: '#8B9E7C', images: [
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
          'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800'
        ]},
        sizes: [
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 32999, stock: 6, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 62999, stock: 3, readyToShip: true }
        ]
      },
      {
        color: { name: 'Charcoal', hex: '#36454F', images: [
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800'
        ]},
        sizes: [
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 32999, stock: 5, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 62999, stock: 2, readyToShip: false }
        ]
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    details: {
      productDetails: 'Material: 100% New Zealand Wool\nWeave: Hand-Tufted\nPile Height: 12mm\nBacking: Canvas with latex\nOrigin: Bhadohi, India\nPattern: Geometric Abstract\nEdge: Machine-bound\nCertification: OEKO-TEX Standard 100',
      washingCare: 'Professional cleaning recommended annually\nVacuum regularly in the direction of the pile\nBlot spills immediately\nAvoid steam cleaning\nRotate every 3-6 months\nUse rug pad underneath',
      shippingReturns: 'Free shipping on all orders above ₹10,000\nDelivery within 5-7 business days\n15-day return policy\nFree pickup for returns',
      aboutDesign: 'The Zenith rug is a celebration of modern design principles. Its geometric abstract pattern is inspired by architectural forms and the interplay of light and shadow. The neutral palette ensures versatility across different interior styles.'
    },
    deliveryTimeline: '5-7 business days',
    isFeatured: true,
    isNewArrival: true,
    isBestseller: false,
    rating: 4.6,
    reviewCount: 87
  },
  {
    name: 'Nomad Bohemian Kilim Rug',
    slug: 'nomad-bohemian-kilim-rug',
    sku: 'RUG-BOH-003',
    shortDescription: 'Flatweave kilim rug with vibrant tribal patterns, handwoven by nomadic artisans.',
    longDescription: 'Each Nomad Kilim tells a story through its tribal motifs and vibrant colors. Handwoven using traditional flatweave techniques passed down through generations of nomadic weavers.',
    basePrice: 18999,
    originalPrice: 24999,
    category: 'Bohemian',
    collection: 'Bohemian Rhapsody',
    tags: ['kilim', 'flatweave', 'bohemian', 'tribal', 'colorful'],
    material: 'Wool & Cotton Blend',
    weaveType: 'Flatweave',
    origin: 'Rajasthan, India',
    variants: [
      {
        color: { name: 'Terracotta Multi', hex: '#E2725B', images: [
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
          'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800'
        ]},
        sizes: [
          { label: '3×5 ft', dimensions: '3 feet × 5 feet', price: 12999, stock: 10, readyToShip: true },
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 18999, stock: 7, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 35999, stock: 4, readyToShip: true }
        ]
      },
      {
        color: { name: 'Indigo Blue', hex: '#3F51B5', images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
          'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800',
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800'
        ]},
        sizes: [
          { label: '3×5 ft', dimensions: '3 feet × 5 feet', price: 12999, stock: 8, readyToShip: true },
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 18999, stock: 5, readyToShip: true }
        ]
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800'
    ],
    details: {
      productDetails: 'Material: 80% Wool, 20% Cotton\nWeave: Flatweave (Kilim)\nPile Height: 3mm\nBacking: None (reversible)\nOrigin: Rajasthan, India\nPattern: Tribal Geometric\nEdge: Fringed\nReversible: Yes',
      washingCare: 'Spot clean with mild detergent\nProfessional cleaning for deep stains\nVacuum both sides regularly\nShake out dust periodically\nAvoid machine washing\nStore rolled, not folded',
      shippingReturns: 'Free shipping on all orders above ₹10,000\nDelivery within 5-7 business days\n15-day return policy\nFree pickup for returns',
      aboutDesign: 'The Nomad Kilim draws from centuries-old tribal weaving traditions of Rajasthan. Each geometric motif carries symbolic meaning — diamonds represent protection, zigzags represent water, and the vibrant colors are derived from natural dyes.'
    },
    deliveryTimeline: '3-5 business days',
    isFeatured: true,
    isNewArrival: false,
    isBestseller: true,
    rating: 4.7,
    reviewCount: 203
  },
  {
    name: 'Mughal Garden Silk-Wool Rug',
    slug: 'mughal-garden-silk-wool-rug',
    sku: 'RUG-MUG-004',
    shortDescription: 'Luxurious silk-wool blend rug featuring Mughal garden-inspired floral motifs with gold accents.',
    longDescription: 'Inspired by the legendary gardens of the Mughal emperors, this rug combines the durability of wool with the luminous sheen of silk. The intricate floral patterns feature gold-toned accents that catch the light beautifully.',
    basePrice: 78999,
    originalPrice: 99999,
    category: 'Traditional',
    collection: 'Royal Mughal',
    tags: ['silk-wool', 'hand-knotted', 'mughal', 'luxury', 'gold-accent'],
    material: 'Silk & Wool Blend',
    weaveType: 'Hand-Knotted',
    origin: 'Agra, India',
    variants: [
      {
        color: { name: 'Emerald Gold', hex: '#2E7D32', images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
          'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800',
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
        ]},
        sizes: [
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 78999, stock: 3, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 149999, stock: 2, readyToShip: false },
          { label: '10×14 ft', dimensions: '10 feet × 14 feet', price: 249999, stock: 1, readyToShip: false }
        ]
      },
      {
        color: { name: 'Ruby Red', hex: '#9B111E', images: [
          'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
        ]},
        sizes: [
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 78999, stock: 2, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 149999, stock: 1, readyToShip: false }
        ]
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    details: {
      productDetails: 'Material: 60% Silk, 40% Wool\nWeave: Hand-Knotted (300+ knots/sq inch)\nPile Height: 8mm\nBacking: Cotton\nOrigin: Agra, India\nPattern: Mughal Floral Garden\nEdge: Hand-bound with gold thread\nCertification: GoodWeave certified',
      washingCare: 'Professional dry cleaning only\nGentle vacuum with suction only\nImmediate blot for spills\nKeep away from direct sunlight\nRotate every 6 months\nProfessional moth treatment annually',
      shippingReturns: 'Free white-glove delivery\nDelivery within 7-10 business days\n15-day return policy for unused items\nFree pickup for returns\nCustom sizes: 4-6 weeks delivery',
      aboutDesign: 'The Mughal Garden rug is a tribute to the paradise gardens described in Mughal poetry. The central tree of life is surrounded by blooming flowers, singing birds, and flowing water channels — all rendered in exquisite detail with silk highlights on a wool foundation.'
    },
    deliveryTimeline: '7-10 business days',
    isFeatured: true,
    isNewArrival: true,
    isBestseller: false,
    rating: 4.9,
    reviewCount: 56
  },
  {
    name: 'Coastal Jute Braided Rug',
    slug: 'coastal-jute-braided-rug',
    sku: 'RUG-CST-005',
    shortDescription: 'Natural jute braided rug with a relaxed coastal aesthetic, perfect for casual living spaces.',
    longDescription: 'Bring the relaxed beauty of coastal living into your home with this hand-braided jute rug. Its natural texture and earthy tones create a warm, inviting atmosphere.',
    basePrice: 14999,
    originalPrice: 19999,
    category: 'Natural',
    collection: 'Coastal Breeze',
    tags: ['jute', 'braided', 'natural', 'coastal', 'eco-friendly'],
    material: '100% Natural Jute',
    weaveType: 'Hand-Braided',
    origin: 'West Bengal, India',
    variants: [
      {
        color: { name: 'Natural', hex: '#D2B48C', images: [
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
        ]},
        sizes: [
          { label: '4×6 ft', dimensions: '4 feet × 6 feet', price: 14999, stock: 15, readyToShip: true },
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 22999, stock: 10, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 39999, stock: 6, readyToShip: true }
        ]
      },
      {
        color: { name: 'Bleached White', hex: '#FAF0E6', images: [
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
          'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800'
        ]},
        sizes: [
          { label: '4×6 ft', dimensions: '4 feet × 6 feet', price: 14999, stock: 12, readyToShip: true },
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 22999, stock: 8, readyToShip: true }
        ]
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    details: {
      productDetails: 'Material: 100% Natural Jute\nWeave: Hand-Braided\nPile Height: 5mm\nBacking: None\nOrigin: West Bengal, India\nPattern: Braided Spiral\nEdge: Natural bound\nEco-Friendly: Yes',
      washingCare: 'Vacuum regularly\nSpot clean with damp cloth\nAvoid excessive moisture\nDry in shade if wet\nRotate periodically\nNot suitable for high-moisture areas',
      shippingReturns: 'Free shipping on all orders above ₹10,000\nDelivery within 3-5 business days\n15-day return policy\nFree pickup for returns',
      aboutDesign: 'The Coastal Jute rug celebrates the beauty of natural materials. Hand-braided by skilled artisans in West Bengal, each rug showcases the golden warmth and textural richness of pure jute. The spiral braiding pattern creates visual interest while maintaining a clean, organic aesthetic.'
    },
    deliveryTimeline: '3-5 business days',
    isFeatured: false,
    isNewArrival: true,
    isBestseller: false,
    rating: 4.5,
    reviewCount: 156
  },
  {
    name: 'Vintage Overdyed Turkish Rug',
    slug: 'vintage-overdyed-turkish-rug',
    sku: 'RUG-VIN-006',
    shortDescription: 'Authentic vintage Turkish rug, overdyed in rich jewel tones for a contemporary twist on tradition.',
    longDescription: 'Each Vintage Overdyed rug begins as an authentic Turkish rug, then undergoes a meticulous overdyeing process that transforms it with rich, saturated color while preserving the original pattern as a subtle ghost image.',
    basePrice: 54999,
    originalPrice: 69999,
    category: 'Vintage',
    collection: 'Vintage Revival',
    tags: ['vintage', 'overdyed', 'turkish', 'unique', 'one-of-a-kind'],
    material: 'Wool',
    weaveType: 'Hand-Knotted (Vintage)',
    origin: 'Turkey (Vintage)',
    variants: [
      {
        color: { name: 'Teal', hex: '#008080', images: [
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
          'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
        ]},
        sizes: [
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 54999, stock: 1, readyToShip: true },
          { label: '7×10 ft', dimensions: '7 feet × 10 feet', price: 89999, stock: 1, readyToShip: true }
        ]
      },
      {
        color: { name: 'Amethyst', hex: '#9966CC', images: [
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
        ]},
        sizes: [
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 54999, stock: 1, readyToShip: true }
        ]
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
      'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    details: {
      productDetails: 'Material: 100% Wool\nWeave: Hand-Knotted (Vintage)\nPile Height: 7mm\nBacking: Cotton (original)\nOrigin: Turkey\nAge: 30-50 years\nProcess: Overdyed\nUnique: One-of-a-kind piece',
      washingCare: 'Professional cleaning only\nGentle vacuum regularly\nAvoid direct sunlight\nBlot spills immediately\nStore rolled in acid-free paper\nMoth prevention recommended',
      shippingReturns: 'Free white-glove delivery\nDelivery within 5-7 business days\n7-day return policy (one-of-a-kind items)\nFree pickup for returns\nCertificate of authenticity included',
      aboutDesign: 'Each Vintage Overdyed rug is a unique piece of history reimagined for modern interiors. The original Turkish rug, aged 30-50 years, undergoes a careful bleaching and overdyeing process. The result is a stunning piece where the ghost of the original pattern shimmers beneath a rich, contemporary color.'
    },
    deliveryTimeline: '5-7 business days',
    isFeatured: true,
    isNewArrival: false,
    isBestseller: false,
    rating: 4.9,
    reviewCount: 42
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Collection.deleteMany({});
    await Addon.deleteMany({});
    console.log('Cleared existing data');

    // Seed collections
    await Collection.insertMany(collections);
    console.log(`Seeded ${collections.length} collections`);

    // Seed addons
    await Addon.insertMany(addons);
    console.log(`Seeded ${addons.length} addons`);

    // Seed products
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
