# Setup Guide

Complete setup guide for the Comic Generator project.

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MySQL (local or cloud instance)

## Quick Start

### 1. Clone and Install

```bash
# Install root dependencies
npm install

# Install all dependencies (frontend + backend)
npm run install:all
```

### 2. Environment Setup

#### Backend Environment
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=3000
NODE_ENV=development
DATABASE_URL=
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

#### Frontend Environment
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:3000
```

### 3. Database Setup

Make sure database is running locally or update the `DATABASE_URL` in `backend/.env` to point to your cloud instance or database.

### 4. Run the Application

From the root directory:

```bash
# Run both frontend and backend concurrently
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### 5. Verify Setup

Visit http://localhost:3000/health to check if the backend is running.

## Development Workflow

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production
```bash
# Build frontend
npm run build:frontend
```

### Running Production Build
```bash
npm start
```

## Project Structure

```
comic-generator/
├── frontend/           # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   └── package.json
├── backend/            # Node.js API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   └── package.json
└── package.json        # Root workspace config
```

## Troubleshooting

### Port Already in Use
If ports 3000 or 5173 are already in use, update the port numbers in:
- Backend: `backend/.env` (PORT)
- Frontend: `frontend/vite.config.js` (server.port)

### Module Not Found
```bash
# Clean install
rm -rf node_modules frontend/node_modules backend/node_modules
npm run install:all
```
## Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Axios
- TailwindCSS

### Backend
- Node.js
- Express
- JavaScript (ES6+ Modules)
- MySQL 

## License
MIT
## Next Steps

1. Implement authentication endpoints in the backend
2. Add comic creation functionality
3. Integrate image generation/upload features
4. Add user authentication in the frontend
5. Implement state management with Zustand
6. Add more pages and features

