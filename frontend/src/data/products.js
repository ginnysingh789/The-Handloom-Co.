// Static fallback data when backend is unavailable
export const staticProducts = [
  {
    _id: '1',
    name: 'Maharaja Persian Silk Rug',
    slug: 'maharaja-persian-silk-rug',
    sku: 'RUG-PER-001',
    shortDescription: 'Hand-knotted pure silk rug with intricate floral medallion pattern, crafted by master artisans in Kashmir.',
    longDescription: 'This exquisite hand-knotted silk rug represents the pinnacle of Persian craftsmanship. Each piece takes over 6 months to complete, with artisans tying over 400 knots per square inch.',
    basePrice: 45999,
    originalPrice: 59999,
    currency: '$',
    category: 'Persian',
    collection: 'Persian Heritage',
    tags: ['silk', 'hand-knotted', 'persian', 'luxury', 'bestseller'],
    material: '100% Pure Silk',
    weaveType: 'Hand-Knotted',
    origin: 'Kashmir, India',
    variants: [
      {
        color: { name: 'Royal Ivory', hex: '#F5F0E8', images: [
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955268/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_3.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955281/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_18.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955283/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_19.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955284/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_22.jpg'
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
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955268/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_3.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955279/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_15.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955281/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_18.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955284/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_22.jpg'
        ]},
        sizes: [
          { label: '4×6 ft', dimensions: '4 feet × 6 feet', price: 45999, stock: 4, readyToShip: true },
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 65999, stock: 2, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 125999, stock: 1, readyToShip: false }
        ]
      },
      {
        color: { name: 'Midnight Blue', hex: '#191970', images: [
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955268/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_3.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955283/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_19.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955279/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_15.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955281/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_18.jpg'
        ]},
        sizes: [
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 65999, stock: 3, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 125999, stock: 2, readyToShip: false }
        ]
      }
    ],
    images: [
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955268/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_3.jpg',
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955281/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_18.jpg',
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955283/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_19.jpg',
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955284/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_22.jpg'
    ],
    details: {
      productDetails: 'Material: 100% Pure Silk\nWeave: Hand-Knotted (400+ knots/sq inch)\nPile Height: 6mm\nBacking: Cotton\nOrigin: Kashmir, India\nPattern: Floral Medallion\nEdge: Hand-bound serging\nCertification: Ethically sourced',
      washingCare: 'Professional dry cleaning recommended\nVacuum regularly with suction only (no beater bar)\nRotate rug every 6 months for even wear\nBlot spills immediately with clean white cloth\nAvoid direct sunlight to prevent fading\nUse rug pad on hard floors',
      shippingReturns: 'Free shipping on all orders above $10,000\nDelivery within 5-7 business days (metro cities)\n10-14 business days for remote locations\n15-day return policy for unused items\nFree pickup for returns\nCustom orders are non-returnable',
      aboutDesign: 'The Maharaja Persian Silk Rug draws inspiration from the royal gardens of 16th-century Persia. The central medallion represents the sun, surrounded by intricate floral arabesques symbolizing paradise.'
    },
    deliveryTimeline: '5-7 business days',
    isFeatured: true,
    isNewArrival: false,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 124
  },
  {
    _id: '2',
    name: 'Zenith Contemporary Wool Rug',
    slug: 'zenith-contemporary-wool-rug',
    sku: 'RUG-MOD-002',
    shortDescription: 'Hand-tufted New Zealand wool rug with geometric abstract pattern in neutral tones.',
    longDescription: 'The Zenith rug brings contemporary elegance to any space with its abstract geometric pattern.',
    basePrice: 32999,
    originalPrice: 42999,
    currency: '$',
    category: 'Modern',
    collection: 'Modern Minimalist',
    tags: ['wool', 'hand-tufted', 'modern', 'geometric', 'new-arrival'],
    material: 'New Zealand Wool',
    weaveType: 'Hand-Tufted',
    origin: 'Bhadohi, India',
    variants: [
      {
        color: { name: 'Warm Grey', hex: '#9E9E9E', images: [
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955276/world-weave-rugs/1771944039726-25070a19-06bc-4ecc-91ed-89efdec00c1aNEW__3.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955272/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_68.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955280/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_17.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955288/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_26.jpg'
        ]},
        sizes: [
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 32999, stock: 8, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 62999, stock: 4, readyToShip: true },
          { label: '9×12 ft', dimensions: '9 feet × 12 feet', price: 89999, stock: 2, readyToShip: false }
        ]
      },
      {
        color: { name: 'Sage Green', hex: '#8B9E7C', images: [
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955272/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_68.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955276/world-weave-rugs/1771944039726-25070a19-06bc-4ecc-91ed-89efdec00c1aNEW__3.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955288/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_26.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955280/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_17.jpg'
        ]},
        sizes: [
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 32999, stock: 6, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 62999, stock: 3, readyToShip: true }
        ]
      },
      {
        color: { name: 'Charcoal', hex: '#36454F', images: [
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955276/world-weave-rugs/1771944039726-25070a19-06bc-4ecc-91ed-89efdec00c1aNEW__3.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955272/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_68.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955280/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_17.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955288/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_26.jpg'
        ]},
        sizes: [
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 32999, stock: 5, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 62999, stock: 2, readyToShip: false }
        ]
      }
    ],
    images: [
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955276/world-weave-rugs/1771944039726-25070a19-06bc-4ecc-91ed-89efdec00c1aNEW__3.jpg',
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955272/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_68.jpg',
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955280/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_17.jpg',
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955288/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_26.jpg'
    ],
    details: {
      productDetails: 'Material: 100% New Zealand Wool\nWeave: Hand-Tufted\nPile Height: 12mm\nBacking: Canvas with latex\nOrigin: Bhadohi, India\nPattern: Geometric Abstract',
      washingCare: 'Professional cleaning recommended annually\nVacuum regularly in the direction of the pile\nBlot spills immediately\nAvoid steam cleaning',
      shippingReturns: 'Free shipping on all orders above $10,000\nDelivery within 5-7 business days\n15-day return policy\nFree pickup for returns',
      aboutDesign: 'The Zenith rug is a celebration of modern design principles with geometric abstract patterns inspired by architectural forms.'
    },
    deliveryTimeline: '5-7 business days',
    isFeatured: true,
    isNewArrival: true,
    isBestseller: false,
    rating: 4.6,
    reviewCount: 87
  },
  {
    _id: '3',
    name: 'Nomad Bohemian Kilim Rug',
    slug: 'nomad-bohemian-kilim-rug',
    sku: 'RUG-BOH-003',
    shortDescription: 'Flatweave kilim rug with vibrant tribal patterns, handwoven by nomadic artisans.',
    longDescription: 'Each Nomad Kilim tells a story through its tribal motifs and vibrant colors.',
    basePrice: 18999,
    originalPrice: 24999,
    currency: '$',
    category: 'Bohemian',
    collection: 'Bohemian Rhapsody',
    tags: ['kilim', 'flatweave', 'bohemian', 'tribal', 'colorful'],
    material: 'Wool & Cotton Blend',
    weaveType: 'Flatweave',
    origin: 'Rajasthan, India',
    variants: [
      {
        color: { name: 'Terracotta Multi', hex: '#E2725B', images: [
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955271/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_44.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955274/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_73.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955279/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_15.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955286/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_24.jpg'
        ]},
        sizes: [
          { label: '3×5 ft', dimensions: '3 feet × 5 feet', price: 12999, stock: 10, readyToShip: true },
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 18999, stock: 7, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 35999, stock: 4, readyToShip: true }
        ]
      },
      {
        color: { name: 'Indigo Blue', hex: '#3F51B5', images: [
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955274/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_73.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955271/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_44.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955286/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_24.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955279/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_15.jpg'
        ]},
        sizes: [
          { label: '3×5 ft', dimensions: '3 feet × 5 feet', price: 12999, stock: 8, readyToShip: true },
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 18999, stock: 5, readyToShip: true }
        ]
      }
    ],
    images: [
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955271/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_44.jpg',
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955274/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_73.jpg',
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955279/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_15.jpg',
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955286/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_24.jpg'
    ],
    details: {
      productDetails: 'Material: 80% Wool, 20% Cotton\nWeave: Flatweave (Kilim)\nPile Height: 3mm\nBacking: None (reversible)\nOrigin: Rajasthan, India',
      washingCare: 'Spot clean with mild detergent\nProfessional cleaning for deep stains\nVacuum both sides regularly',
      shippingReturns: 'Free shipping on all orders above $10,000\nDelivery within 5-7 business days\n15-day return policy',
      aboutDesign: 'The Nomad Kilim draws from centuries-old tribal weaving traditions of Rajasthan.'
    },
    deliveryTimeline: '3-5 business days',
    isFeatured: true,
    isNewArrival: false,
    isBestseller: true,
    rating: 4.7,
    reviewCount: 203
  },
  {
    _id: '4',
    name: 'Mughal Garden Silk-Wool Rug',
    slug: 'mughal-garden-silk-wool-rug',
    sku: 'RUG-MUG-004',
    shortDescription: 'Luxurious silk-wool blend rug featuring Mughal garden-inspired floral motifs with gold accents.',
    longDescription: 'Inspired by the legendary gardens of the Mughal emperors.',
    basePrice: 78999,
    originalPrice: 99999,
    currency: '$',
    category: 'Traditional',
    collection: 'Royal Mughal',
    tags: ['silk-wool', 'hand-knotted', 'mughal', 'luxury', 'gold-accent'],
    material: 'Silk & Wool Blend',
    weaveType: 'Hand-Knotted',
    origin: 'Agra, India',
    variants: [
      {
        color: { name: 'Emerald Gold', hex: '#2E7D32', images: [
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955265/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_19.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955270/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_31.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955284/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_22.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955286/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_24.jpg'
        ]},
        sizes: [
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 78999, stock: 3, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 149999, stock: 2, readyToShip: false },
          { label: '10×14 ft', dimensions: '10 feet × 14 feet', price: 249999, stock: 1, readyToShip: false }
        ]
      },
      {
        color: { name: 'Ruby Red', hex: '#9B111E', images: [
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955265/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_19.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955270/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_31.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955286/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_24.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955284/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_22.jpg'
        ]},
        sizes: [
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 78999, stock: 2, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 149999, stock: 1, readyToShip: false }
        ]
      }
    ],
    images: [
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955265/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_19.jpg',
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955270/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_31.jpg',
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955284/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_22.jpg',
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955286/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_24.jpg'
    ],
    details: {
      productDetails: 'Material: 60% Silk, 40% Wool\nWeave: Hand-Knotted (300+ knots/sq inch)\nPile Height: 8mm\nOrigin: Agra, India',
      washingCare: 'Professional dry cleaning only\nGentle vacuum with suction only\nKeep away from direct sunlight',
      shippingReturns: 'Free white-glove delivery\nDelivery within 7-10 business days\n15-day return policy',
      aboutDesign: 'The Mughal Garden rug is a tribute to the paradise gardens described in Mughal poetry.'
    },
    deliveryTimeline: '7-10 business days',
    isFeatured: true,
    isNewArrival: true,
    isBestseller: false,
    rating: 4.9,
    reviewCount: 56
  },
  {
    _id: '5',
    name: 'Coastal Jute Braided Rug',
    slug: 'coastal-jute-braided-rug',
    sku: 'RUG-CST-005',
    shortDescription: 'Natural jute braided rug with a relaxed coastal aesthetic.',
    longDescription: 'Bring the relaxed beauty of coastal living into your home.',
    basePrice: 14999,
    originalPrice: 19999,
    currency: '$',
    category: 'Natural',
    collection: 'Coastal Breeze',
    tags: ['jute', 'braided', 'natural', 'coastal', 'eco-friendly'],
    material: '100% Natural Jute',
    weaveType: 'Hand-Braided',
    origin: 'West Bengal, India',
    variants: [
      {
        color: { name: 'Natural', hex: '#D2B48C', images: [
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955264/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_1.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955267/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_2.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955270/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_31.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955288/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_26.jpg'
        ]},
        sizes: [
          { label: '4×6 ft', dimensions: '4 feet × 6 feet', price: 14999, stock: 15, readyToShip: true },
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 22999, stock: 10, readyToShip: true },
          { label: '8×10 ft', dimensions: '8 feet × 10 feet', price: 39999, stock: 6, readyToShip: true }
        ]
      },
      {
        color: { name: 'Bleached White', hex: '#FAF0E6', images: [
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955267/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_2.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955264/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_1.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955270/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_31.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955288/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_26.jpg'
        ]},
        sizes: [
          { label: '4×6 ft', dimensions: '4 feet × 6 feet', price: 14999, stock: 12, readyToShip: true },
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 22999, stock: 8, readyToShip: true }
        ]
      }
    ],
    images: [
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955264/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_1.jpg',
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955267/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_2.jpg',
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955270/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_31.jpg',
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955288/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_26.jpg'
    ],
    details: {
      productDetails: 'Material: 100% Natural Jute\nWeave: Hand-Braided\nPile Height: 5mm\nOrigin: West Bengal, India',
      washingCare: 'Vacuum regularly\nSpot clean with damp cloth\nAvoid excessive moisture',
      shippingReturns: 'Free shipping on all orders above $10,000\nDelivery within 3-5 business days',
      aboutDesign: 'The Coastal Jute rug celebrates the beauty of natural materials.'
    },
    deliveryTimeline: '3-5 business days',
    isFeatured: false,
    isNewArrival: true,
    isBestseller: false,
    rating: 4.5,
    reviewCount: 156
  },
  {
    _id: '6',
    name: 'Vintage Overdyed Turkish Rug',
    slug: 'vintage-overdyed-turkish-rug',
    sku: 'RUG-VIN-006',
    shortDescription: 'Authentic vintage Turkish rug, overdyed in rich jewel tones.',
    longDescription: 'Each Vintage Overdyed rug begins as an authentic Turkish rug, then undergoes a meticulous overdyeing process.',
    basePrice: 54999,
    originalPrice: 69999,
    currency: '$',
    category: 'Vintage',
    collection: 'Vintage Revival',
    tags: ['vintage', 'overdyed', 'turkish', 'unique', 'one-of-a-kind'],
    material: 'Wool',
    weaveType: 'Hand-Knotted (Vintage)',
    origin: 'Turkey (Vintage)',
    variants: [
      {
        color: { name: 'Teal', hex: '#008080', images: [
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955277/world-weave-rugs/1771944039726-25070a19-06bc-4ecc-91ed-89efdec00c1aNEW__6.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955274/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_73.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955288/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_26.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955280/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_17.jpg'
        ]},
        sizes: [
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 54999, stock: 1, readyToShip: true },
          { label: '7×10 ft', dimensions: '7 feet × 10 feet', price: 89999, stock: 1, readyToShip: true }
        ]
      },
      {
        color: { name: 'Amethyst', hex: '#9966CC', images: [
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955274/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_73.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955277/world-weave-rugs/1771944039726-25070a19-06bc-4ecc-91ed-89efdec00c1aNEW__6.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955280/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_17.jpg',
          'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955288/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_26.jpg'
        ]},
        sizes: [
          { label: '5×8 ft', dimensions: '5 feet × 8 feet', price: 54999, stock: 1, readyToShip: true }
        ]
      }
    ],
    images: [
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955277/world-weave-rugs/1771944039726-25070a19-06bc-4ecc-91ed-89efdec00c1aNEW__6.jpg',
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955274/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_73.jpg',
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955288/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_26.jpg',
      'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955280/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_17.jpg'
    ],
    details: {
      productDetails: 'Material: 100% Wool\nWeave: Hand-Knotted (Vintage)\nAge: 30-50 years\nOrigin: Turkey',
      washingCare: 'Professional cleaning only\nGentle vacuum regularly\nAvoid direct sunlight',
      shippingReturns: 'Free white-glove delivery\nDelivery within 5-7 business days\n7-day return policy',
      aboutDesign: 'Each Vintage Overdyed rug is a unique piece of history reimagined for modern interiors.'
    },
    deliveryTimeline: '5-7 business days',
    isFeatured: true,
    isNewArrival: false,
    isBestseller: false,
    rating: 4.9,
    reviewCount: 42
  }
];

export const staticCollections = [
  { _id: 'c1', name: 'Persian Heritage', slug: 'persian-heritage', description: 'Timeless Persian designs handcrafted by master artisans', image: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955268/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_3.jpg', featured: true },
  { _id: 'c2', name: 'Modern Minimalist', slug: 'modern-minimalist', description: 'Clean lines and contemporary patterns for modern spaces', image: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955276/world-weave-rugs/1771944039726-25070a19-06bc-4ecc-91ed-89efdec00c1aNEW__3.jpg', featured: true },
  { _id: 'c3', name: 'Bohemian Rhapsody', slug: 'bohemian-rhapsody', description: 'Free-spirited designs with vibrant colors and textures', image: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955271/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_44.jpg', featured: true },
  { _id: 'c4', name: 'Royal Mughal', slug: 'royal-mughal', description: 'Inspired by the grandeur of Mughal architecture', image: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955265/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_19.jpg', featured: true },
  { _id: 'c5', name: 'Coastal Breeze', slug: 'coastal-breeze', description: 'Light, airy designs inspired by ocean and sand', image: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955264/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_1.jpg', featured: false },
  { _id: 'c6', name: 'Vintage Revival', slug: 'vintage-revival', description: 'Distressed and aged looks with old-world charm', image: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955274/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_73.jpg', featured: true }
];

export const staticAddons = [
  { _id: 'a1', name: 'Anti-Slip Backing', description: 'Premium anti-slip rubber backing to prevent rug movement', price: 1499, tooltip: 'Recommended for hardwood and tile floors. Adds a thin rubber layer to the back of your rug.' },
  { _id: 'a2', name: 'Stain Resistance Coating', description: 'Nano-tech stain resistance coating for easy maintenance', price: 1999, tooltip: 'Invisible protective coating that repels liquids and prevents stains. Lasts up to 2 years.' },
  { _id: 'a3', name: 'Custom Fringe Finishing', description: 'Hand-tied decorative fringe on rug edges', price: 2499, tooltip: 'Artisan hand-tied fringe adds an elegant finishing touch to your rug.' }
];
