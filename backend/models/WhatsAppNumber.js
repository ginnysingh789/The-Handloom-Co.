const mongoose = require('mongoose');

const whatsAppNumberSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    country: { type: String, required: true },
    number: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WhatsAppNumber', whatsAppNumberSchema);
