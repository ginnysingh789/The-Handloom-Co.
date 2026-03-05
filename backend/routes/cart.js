const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// GET cart by session ID
router.get('/:sessionId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ sessionId: req.params.sessionId }).populate('items.product');
    if (!cart) {
      cart = { sessionId: req.params.sessionId, items: [], totalAmount: 0 };
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD item to cart
router.post('/:sessionId/items', async (req, res) => {
  try {
    const { productId, productName, variant, quantity, addons, image, whatsappNumberId } = req.body;
    let cart = await Cart.findOne({ sessionId: req.params.sessionId });

    if (!cart) {
      cart = new Cart({ sessionId: req.params.sessionId, items: [] });
    }

    // Check if same product + variant already exists
    const existingIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.variant.color === variant.color &&
        item.variant.size === variant.size
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += quantity || 1;
    } else {
      cart.items.push({
        product: productId,
        productName,
        variant,
        quantity: quantity || 1,
        addons: addons || [],
        image: image || '',
        whatsappNumberId: whatsappNumberId || ''
      });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE item quantity
router.put('/:sessionId/items/:itemId', async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    if (quantity <= 0) {
      cart.items.pull(req.params.itemId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// REMOVE item from cart
router.delete('/:sessionId/items/:itemId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    cart.items.pull(req.params.itemId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CLEAR cart
router.delete('/:sessionId', async (req, res) => {
  try {
    await Cart.findOneAndDelete({ sessionId: req.params.sessionId });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
