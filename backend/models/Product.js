const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  color: {
    name: { type: String, required: true },
    hex: { type: String, required: true },
    images: [{ type: String }]
  },
  sizes: [
    {
      label: { type: String, required: true },
      dimensions: { type: String },
      price: { type: Number, required: true },
      stock: { type: Number, default: 0 },
      readyToShip: { type: Boolean, default: false }
    }
  ]
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    sku: { type: String, required: true },
    shortDescription: { type: String },
    longDescription: { type: String },
    basePrice: { type: Number, required: true },
    originalPrice: { type: Number },
    currency: { type: String, default: '₹' },
    category: { type: String, required: true },
    collection: { type: String },
    tags: [{ type: String }],
    material: { type: String },
    weaveType: { type: String },
    origin: { type: String },
    variants: [variantSchema],
    images: [{ type: String }],
    thumbnails: [{ type: String }],
    details: {
      productDetails: { type: String },
      washingCare: { type: String },
      shippingReturns: { type: String },
      aboutDesign: { type: String }
    },
    deliveryTimeline: { type: String, default: '5-7 business days' },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
