const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { requireAuth } = require('../middleware/auth');

// GET all products with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, collection, featured, bestseller, newArrival, limit, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (collection) filter.collection = collection;
    if (featured === 'true') filter.isFeatured = true;
    if (bestseller === 'true') filter.isBestseller = true;
    if (newArrival === 'true') filter.isNewArrival = true;
    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'i');
      filter.$or = [
        { name: regex },
        { category: regex },
        { collection: regex },
        { tags: regex },
        { material: regex },
        { shortDescription: regex }
      ];
    }

    let query = Product.find(filter).sort({ createdAt: -1 });
    if (limit) query = query.limit(parseInt(limit));

    const products = await query;
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new product (admin)
router.post('/', requireAuth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a product by ID (admin)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a product by ID (admin)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single product by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET products by category
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
