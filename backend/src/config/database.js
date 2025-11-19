import mongoose from 'mongoose';

export const connectDatabase = async () => {
  try {
    const dbUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/comic-generator';

    await mongoose.connect(dbUrl);

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('Database error:', error);
});
