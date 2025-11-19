import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static('uploads'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
// app.use('/api/comics', comicRoutes);
// app.use('/api/users', userRoutes);

// Error handling
app.use(errorHandler);

// Start server
// const startServer = async () => {
//   try {
//     await connectDatabase();
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//       console.log(`Environment: ${process.env.NODE_ENV}`);
//     });
//   } catch (error) {
//     console.error('Failed to start server:', error);
//     process.exit(1);
//   }
// };

// startServer();
app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
});