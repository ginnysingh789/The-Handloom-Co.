const express = require('express');
const router = express.Router();
const { upload, cloudinary } = require('../config/cloudinary');

// Upload single image
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    res.json({
      url: req.file.path,
      public_id: req.file.filename,
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// Upload multiple images (up to 10)
router.post('/images', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files provided' });
    }
    const results = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));
    res.json(results);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// Delete image by public_id
router.delete('/image/:public_id', async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.params.public_id);
    res.json({ result });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Image deletion failed' });
  }
});

module.exports = router;
