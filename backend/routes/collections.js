const express = require('express');
const router = express.Router();
const Collection = require('../models/Collection');

// GET all collections
router.get('/', async (req, res) => {
  try {
    const collections = await Collection.find().sort({ order: 1 });
    res.json(collections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single collection by slug
router.get('/:slug', async (req, res) => {
  try {
    const collection = await Collection.findOne({ slug: req.params.slug });
    if (!collection) return res.status(404).json({ error: 'Collection not found' });
    res.json(collection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
