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

## AI Provider (Hugging Face)

Comic generation uses Hugging Face Inference Providers:
<<<<<<< Current (Your changes)
- **Story → panels**: Chat completions via `router.huggingface.co` (SmolLM2)
- **Panel images**: `@huggingface/inference` client (FLUX.1-schnell)

Set `HUGGINGFACE_TOKEN` in `.env`. Create a token with "Make calls to Inference Providers" at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained).
=======
- **Story → panels**: Chat (Llama, Qwen, Gemma, or Mistral)
- **Panel images**: FLUX.1-schnell

**Setup:**
1. Create a token with "Make calls to Inference Providers" at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained)
2. **Enable providers** at [hf.co/settings/inference-providers](https://hf.co/settings/inference-providers) (e.g. Groq for free chat, or HF Inference)
3. Set `HUGGINGFACE_TOKEN` in `.env`
>>>>>>> Incoming (Background Agent changes)

## Models

### Comic
- title: string (required)
- description: string (optional)
- style: string (shounen | shoujo | seinen | chibi | isekai)
- panels: array of `{ imagePath, caption?, prompt? }`
- author: ObjectId (optional)
- isPublic: boolean
- tags: array of strings
