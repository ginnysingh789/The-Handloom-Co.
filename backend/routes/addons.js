const express = require('express');
const router = express.Router();
const Addon = require('../models/Addon');

// GET all active addons
router.get('/', async (req, res) => {
  try {
    const addons = await Addon.find({ isActive: true });
    res.json(addons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
