const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String },
  variant: {
    color: { type: String },
    size: { type: String },
    price: { type: Number }
  },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  addons: [
    {
      name: { type: String },
      price: { type: Number }
    }
  ],
  lineTotal: { type: Number },
  image: { type: String, default: '' },
  whatsappNumberId: { type: String, default: '' }
});

const cartSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    items: [cartItemSchema],
    totalAmount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Calculate totals before saving
cartSchema.pre('save', function (next) {
  this.items.forEach((item) => {
    const addonTotal = item.addons.reduce((sum, a) => sum + (a.price || 0), 0);
    item.lineTotal = (item.variant.price + addonTotal) * item.quantity;
  });
  this.totalAmount = this.items.reduce((sum, item) => sum + item.lineTotal, 0);
  next();
});

module.exports = mongoose.model('Cart', cartSchema);
