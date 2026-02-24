# Comic Generator

AI-powered comic creation app. Enter a story and generate manga-style comic panels using Hugging Face.

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB (local or cloud)
- [Hugging Face](https://huggingface.co) account (for AI generation)

## Quick Start

### 1. Clone and Install

```bash
npm install
npm run install:all
```

### 2. Environment Setup

**Backend** (`backend/.env`):
```bash
cd backend
cp .env.example .env
```

Required: `DATABASE_URL`, `HUGGINGFACE_TOKEN`. See [backend/README.md](backend/README.md) for Hugging Face setup.

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:3000
```

### 3. Run the Application

```bash
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000

### 4. Verify

Visit http://localhost:3000/health to check the backend.

## Features

- **Create comics** – Story → AI-generated panel descriptions → AI-generated panel images
- **Manga styles** – shounen, shoujo, seinen, chibi, isekai
- **Manga AI page** – `/manga-ai` (UI demo)

## Tech Stack

| Layer   | Tech |
|---------|------|
| Frontend | React 18, Vite, React Router, Axios, TailwindCSS |
| Backend  | Node.js, Express, Mongoose |
| Database | MongoDB |
| AI       | Hugging Face Inference (chat + FLUX.1-schnell) |

## Project Structure

```
comic-generator/
├── frontend/     # React app
├── backend/      # Express API + AI service
└── package.json
```

## Troubleshooting

### Port Already in Use
If ports 3000 or 5173 are already in use, update the port numbers in:
- Backend: `backend/.env` (PORT)
- Frontend: `frontend/vite.config.js` (server.port)

### Module Not Found
```bash
rm -rf node_modules frontend/node_modules backend/node_modules
npm run install:all
```

## License

MIT
