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

### Comics (no authentication)

- `GET /api/comics` - List all comics
- `POST /api/comics` - Create comic (AI-generated). Body: `{ title, story, style?, numPanels? }`
- `GET /api/comics/:id` - Get comic by ID
- `PATCH /api/comics/:id` - Update comic
- `DELETE /api/comics/:id` - Delete comic

## AI Provider (Replicate)

Comic generation uses Replicate:
- **Story → panels**: `meta/meta-llama-3-8b-instruct` (splits story into panel descriptions)
- **Panel images**: `black-forest-labs/flux-schnell` (FLUX image generation)

Set `REPLICATE_API_TOKEN` in `.env` (get a token at [replicate.com/account](https://replicate.com/account)).

## Models

### Comic
- title: string (required)
- description: string (optional)
- style: string (shounen | shoujo | seinen | chibi | isekai)
- panels: array of `{ imagePath, caption?, prompt? }`
- author: ObjectId (optional)
- isPublic: boolean
- tags: array of strings
