# CMN Superior Quality Training

**A bilingual training and product website with registration, administration, and API workflows.**

This repository contains a React-based frontend, an Express/TypeScript development server, and API handlers for training registrations, products, announcements, settings, and administration. The website content and interface support English and French.

## Features visible in the codebase

- Public training and product pages.
- Training information and bilingual content.
- Registration workflows and registration status operations.
- Product listing and product detail API routes.
- Announcements and configurable site settings.
- Admin login and password-change endpoints.
- Health endpoint.
- WhatsApp contact/community links.
- Local JSON data store used by the Express development server.

## Technology

- React 19 and TypeScript
- Vite
- Express
- Supabase JavaScript client
- Google GenAI SDK dependency
- Tailwind CSS
- Node.js / npm or Bun

## Requirements

- Node.js compatible with the versions in `package.json`
- npm or Bun
- Environment configuration for any external services enabled in the code

## Installation

```bash
git clone https://github.com/nyohleonard-nlktech/cmn-superior-training.git
cd cmn-superior-training
npm install
```

## Environment configuration

Review `.env.example` and the API/server source to identify required variables. Create a local `.env` file and provide your own values. Never commit credentials or production secrets.

The server currently includes a JSON-file fallback store at `data/db.json`. Treat that file as development/demo persistence unless a production-grade database and backup strategy are configured.

## Development

```bash
npm run dev
```

The Express development server is configured to listen on port 3000 and uses Vite middleware for the frontend.

## Build and production start

```bash
npm run build
npm start
```

Type-check the project:

```bash
npm run lint
```

## API overview

The repository contains handlers for:

| Route area | Purpose |
|---|---|
| `/api/health` | Health status |
| `/api/products` | Product collection and product detail |
| `/api/registrations` | Registration workflows |
| `/api/announcements` | Announcement data |
| `/api/settings` | Site settings |
| `/api/admin/login` | Admin login |
| `/api/admin/change-password` | Admin password change |

The exact HTTP methods, request schemas, and authorization requirements are defined in the corresponding files under `api/`. Consult those handlers before integrating another client.

## Project structure

```text
.
├── api/                 # Serverless API handlers
├── assets/              # Source media
├── data/                # Local JSON data
├── public/               # Static assets and redirects
├── src/
│   ├── components/
│   ├── data/
│   ├── services/
│   ├── utils/
│   └── views/
├── server.ts             # Express + Vite development server
├── index.html
├── package.json
├── netlify.toml
├── vercel.json
└── README.md
```

## Deployment

The repository contains both Netlify and Vercel configuration. Choose the intended host and verify its serverless-function routing, environment variables, and persistent storage model. A local JSON file is not a safe shared database for horizontally scaled or ephemeral serverless deployments.

## Security

The server source contains a development fallback administrator password. Replace this with a securely hashed credential and fail closed when production secrets are missing. Add authorization checks to every administrative API route, validate request bodies, rate-limit login attempts, and never expose private registration data.

## License

No license file is currently present. All rights are reserved unless an explicit license is added.
