const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const { requireAuth } = require('../middleware/auth');

// GET /api/settings — public: get contact settings
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne({ key: 'contact' });
    if (!settings) {
      settings = await Settings.create({ key: 'contact' });
    }
    res.json({
      whatsappNumber: (settings.whatsappNumber || '').replace(/[^\d]/g, ''),
      contactEmail: settings.contactEmail,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/settings — admin: update contact settings
router.put('/', requireAuth, async (req, res) => {
  try {
    const { whatsappNumber, contactEmail } = req.body;
    const update = {};
    if (whatsappNumber) update.whatsappNumber = whatsappNumber.replace(/[^\d]/g, '');
    if (contactEmail) update.contactEmail = contactEmail.trim();

    const settings = await Settings.findOneAndUpdate(
      { key: 'contact' },
      update,
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      whatsappNumber: settings.whatsappNumber,
      contactEmail: settings.contactEmail,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
