require('dotenv').config();
const mongoose = require('mongoose');
const Review = require('./models/Review');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/luxury-rugs';

const defaultReviews = [
  { name: 'Priya Sharma', role: 'Interior Designer', rating: 5, text: 'Absolutely stunning craftsmanship! The hand-knotted rug I ordered exceeded all my expectations. The colors are vibrant and the quality is unmatched.', approved: true },
  { name: 'Michael Chen', role: 'Homeowner', rating: 5, text: 'World Weave Carpets delivered a beautiful custom rug for my living room. The attention to detail and the softness of the wool is incredible.', approved: true },
  { name: 'Sarah Johnson', role: 'Art Collector', rating: 5, text: 'I have been searching for the perfect heritage rug for months. World Weave had exactly what I was looking for — authentic, luxurious, and timeless.', approved: true },
  { name: 'Arjun Mehta', role: 'Architect', rating: 4, text: 'Outstanding quality and fast delivery. The rug transformed our office reception area. Will definitely order again for our new projects.', approved: true },
  { name: 'Emily Davis', role: 'Homeowner', rating: 5, text: 'The geometric collection is breathtaking. Every guest who visits comments on how beautiful our new rug is. Worth every penny!', approved: true },
  { name: 'Rajesh Patel', role: 'Hotel Manager', rating: 5, text: 'As a B2B partner, I can vouch for their professionalism and product quality. They consistently deliver on time with impeccable craftsmanship.', approved: true },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const count = await Review.countDocuments();
  if (count > 0) {
    console.log(`Already ${count} reviews in DB. Skipping seed.`);
  } else {
    await Review.insertMany(defaultReviews);
    console.log(`Seeded ${defaultReviews.length} default reviews.`);
  }

  await mongoose.disconnect();
  console.log('Done.');
}

seed().catch((err) => {
  console.error('Seed error:', err.message);
  process.exit(1);
});
