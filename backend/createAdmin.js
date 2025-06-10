import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// Configure environment variables
dotenv.config({ path: './.env' });

// Database connection with improved configuration
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`);
  return conn;
};

// Enhanced admin creation with validation
const createAdmin = async () => {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'securepassword123';
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';

  try {
    // Validate environment variables
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }

    // Check if admin exists
    const existingAdmin = await User.findOne({ 
      $or: [
        { email: ADMIN_EMAIL },
        { username: ADMIN_USERNAME }
      ]
    });

    if (existingAdmin) {
      console.log('Admin user already exists:');
      console.log(`Email: ${existingAdmin.email}`);
      console.log(`Role: ${existingAdmin.role}`);
      return;
    }

    // Create admin user
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    const admin = new User({
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    
    console.log('✅ Admin user created successfully!');
    console.log('📋 Admin credentials:');
    console.log(`👤 Username: ${ADMIN_USERNAME}`);
    console.log(`📧 Email: ${ADMIN_EMAIL}`);
    console.log(`🔑 Password: ${ADMIN_PASSWORD}`);
    console.log('\n⚠️ Important: Change this password immediately after first login!');
  } catch (err) {
    console.error('❌ Error creating admin user:', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

// Execute with proper error handling
(async () => {
  try {
    await connectDB();
    await createAdmin();
  } catch (err) {
    console.error('❌ Fatal error:', err.message);
    process.exit(1);
  }
})();