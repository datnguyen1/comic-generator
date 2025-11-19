# Comic Generator Backend

Node.js/Express backend API for the comic generator application.

## Structure

```
backend/
├── src/
│   ├── config/          # Configuration files (database, etc.)
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware (auth, error handling)
│   ├── routes/          # API routes
│   └── server.js        # Application entry point
├── uploads/             # File uploads directory
├── .env.example         # Environment variables template
└── package.json
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update environment variables in `.env`

4. Start development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

### Comics
- `GET /api/comics` - Get all user's comics
- `POST /api/comics` - Create new comic
- `GET /api/comics/:id` - Get comic by ID
- `PATCH /api/comics/:id` - Update comic
- `DELETE /api/comics/:id` - Delete comic

All endpoints require authentication.

## Models

### Comic
- title: string (required)
- description: string (optional)
- panels: array of panel objects
- author: ObjectId (ref: User)
- isPublic: boolean
- tags: array of strings

### User
- email: string (required, unique)
- password: string (required, hashed)
- username: string (required, unique)
