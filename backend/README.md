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

Comic generation uses the Hugging Face router (`@huggingface/inference`):

- **Story → panels**: chat completion (tries several small instruct models; optional `HF_CHAT_PROVIDER` such as `groq` if enabled on your account)
- **Panel images**: tries, in order, `HF_IMAGE_MODEL` if set, then common Stable Diffusion checkpoints on HF Inference, then **FLUX.1-schnell** via `fal-ai` and `replicate` if your token has those providers enabled

**Setup:**

1. Create a token with inference permissions at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained)
2. **Enable inference providers** at [hf.co/settings/inference-providers](https://hf.co/settings/inference-providers) (chat: e.g. Groq; images: HF serverless and/or fal-ai for FLUX)
3. Set `HUGGINGFACE_TOKEN` in `.env`

If you see *“Failed to perform inference: an HTTP error occurred when requesting the provider”*, the router could not complete the call (token, provider not enabled, rate limit, or model not available). Set `HF_IMAGE_MODEL=stabilityai/stable-diffusion-2-1` to prefer a widely available image model, or configure `HF_IMAGE_PROVIDER` (e.g. `fal-ai`) for FLUX—see `.env.example`.

### Chat (story → panels) fails for every model

1. **Use the app anyway:** the server **falls back automatically** to a local split (by sentences or character chunks) if all chat models error. You still need a working **image** model for panel art.
2. **Fix Hugging Face chat:** create a [fine-grained token](https://huggingface.co/settings/tokens) with **Make calls to Inference Providers** (and read access if required). Open [Inference Providers](https://hf.co/settings/inference-providers) and enable at least one provider that serves chat (e.g. **Groq**). Then in `.env` add `HF_CHAT_PROVIDER=groq` and restart the backend.
3. **Skip chat on purpose:** set `HF_PANELS_CHAT=0` to always use the local splitter (no chat API calls).

### Quick checklist

| Check | Action |
|--------|--------|
| Token type | Fine-grained with Inference / Inference Providers permissions |
| Providers | Enabled at hf.co/settings/inference-providers for the models you use |
| Chat | Optional `HF_CHAT_PROVIDER=groq` after enabling Groq |
| Images | Optional `HF_IMAGE_MODEL` / `HF_IMAGE_PROVIDER` if defaults fail |

## Models

### Comic
- title: string (required)
- description: string (optional)
- style: string (shounen | shoujo | seinen | chibi | isekai)
- panels: array of `{ imagePath, caption?, prompt? }`
- author: ObjectId (optional)
- isPublic: boolean
- tags: array of strings
