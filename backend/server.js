const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const productRoutes = require('./routes/products');
const collectionRoutes = require('./routes/collections');
const cartRoutes = require('./routes/cart');
const addonRoutes = require('./routes/addons');
const reviewRoutes = require('./routes/reviews');
const uploadRoutes = require('./routes/upload');
const adminRoutes = require('./routes/admin');
const settingsRoutes = require('./routes/settings');
const whatsappNumberRoutes = require('./routes/whatsappNumbers');
const { requireAuth } = require('./middleware/auth');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// ---------- Security Middleware ----------
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

// CORS — restrict in production
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:5000'];
app.use(cors({
  origin: isProduction
    ? (origin, cb) => {
        if (!origin || allowedOrigins.includes(origin)) cb(null, true);
        else cb(new Error('Not allowed by CORS'));
      }
    : true,
  credentials: true,
}));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

// Stricter limit for uploads
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: 'Upload limit reached, try again later.' },
});
app.use('/api/upload', uploadLimiter);

// Body parsing with size limits
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// ---------- API Routes ----------
app.use('/api/products', productRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/addons', addonRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/upload', requireAuth, uploadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/whatsapp-numbers', whatsappNumberRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ---------- Serve Frontend in Production ----------
if (isProduction) {
  const frontendBuild = path.join(__dirname, '..', 'frontend', 'dist');
  app.use(express.static(frontendBuild));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuild, 'index.html'));
  });
}

// ---------- Connect to MongoDB and Start ----------
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/luxury-rugs';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} [${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}]`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.log('Starting server without MongoDB...');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (no DB)`);
    });
  });

module.exports = app;
