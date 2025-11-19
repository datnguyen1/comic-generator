# Comic Generator Frontend

React frontend application for the comic generator.

## Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── .env.example         # Environment variables template
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
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

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Pages

- `/` - Home page
- `/comics` - List of user's comics
- `/comics/create` - Create new comic
- `/comics/:id` - Comic detail page

## Tech Stack

- React 18
- JavaScript (ES6+)
- Vite
- React Router
- Axios
- TailwindCSS
- Vercel for deployment

