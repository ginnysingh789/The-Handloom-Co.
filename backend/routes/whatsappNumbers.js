const express = require('express');
const router = express.Router();
const WhatsAppNumber = require('../models/WhatsAppNumber');
const { requireAuth } = require('../middleware/auth');

// GET /api/whatsapp-numbers — public: all numbers
router.get('/', async (req, res) => {
  try {
    const numbers = await WhatsAppNumber.find().sort({ isDefault: -1, createdAt: -1 });
    res.json(numbers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/whatsapp-numbers — admin: create
router.post('/', requireAuth, async (req, res) => {
  try {
    const { label, country, number, isDefault } = req.body;
    if (!label || !country || !number) {
      return res.status(400).json({ error: 'Label, country, and number are required.' });
    }
    const clean = number.replace(/[^0-9]/g, '');
    if (isDefault) {
      await WhatsAppNumber.updateMany({}, { isDefault: false });
    }
    const entry = new WhatsAppNumber({ label, country, number: clean, isDefault: !!isDefault });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/whatsapp-numbers/:id — admin: update
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { label, country, number, isDefault } = req.body;
    const clean = number ? number.replace(/[^0-9]/g, '') : undefined;
    if (isDefault) {
      await WhatsAppNumber.updateMany({ _id: { $ne: req.params.id } }, { isDefault: false });
    }
    const update = {};
    if (label !== undefined) update.label = label;
    if (country !== undefined) update.country = country;
    if (clean !== undefined) update.number = clean;
    if (isDefault !== undefined) update.isDefault = isDefault;
    const entry = await WhatsAppNumber.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!entry) return res.status(404).json({ error: 'Not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/whatsapp-numbers/:id — admin: delete
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const entry = await WhatsAppNumber.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
