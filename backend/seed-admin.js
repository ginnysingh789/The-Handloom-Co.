/**
 * Seed script: Create initial admin user in MongoDB
 * Usage: node seed-admin.js
 * 
 * You can also pass custom credentials:
 *   node seed-admin.js myusername mypassword
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/luxury-rugs';

async function seedAdmin() {
  const username = (process.argv[2] || process.env.ADMIN_USERNAME || 'admin').toLowerCase().trim();
  const password = process.argv[3] || process.env.ADMIN_PASSWORD || 'admin123';

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log(`Admin "${username}" already exists. Updating password...`);
      existing.password = password;
      await existing.save();
      console.log(`Password updated for "${username}".`);
    } else {
      await Admin.create({ username, password, role: 'superadmin' });
      console.log(`Admin "${username}" created successfully.`);
    }

    console.log('\n=== Admin Credentials ===');
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log('========================\n');

  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedAdmin();
