const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'contact',
  },
  whatsappNumber: {
    type: String,
    default: '919999999999',
  },
  contactEmail: {
    type: String,
    default: 'info@worldweavecarpets.com',
  },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
