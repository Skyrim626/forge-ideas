# ⚡ Forge — AI Project Idea Generator

A React + Vite app powered by Claude. Uses a local Express proxy to safely call the Anthropic API (avoiding CORS issues with direct browser calls).

## Setup

**1. Install dependencies**
```bash
npm install
```

**2. Add your API key**
```bash
cp .env.example .env
# Edit .env and set your ANTHROPIC_API_KEY
```

**3. Run both servers together**
```bash
npm run dev:all
```

This starts:
- Vite dev server → http://localhost:5173 (frontend)
- Express proxy  → http://localhost:3001 (API relay)

Or run them separately in two terminals:
```bash
npm run dev      # terminal 1 — Vite
npm run server   # terminal 2 — Express proxy
```

## Why a proxy?

Browsers block direct calls to `api.anthropic.com` due to CORS policy. The Express proxy (`server.js`) runs server-side, adds your API key securely, and forwards requests — keeping your key out of the browser bundle.

## Project Structure

```
forge-ideas/
├── server.js              ← Express CORS proxy (port 3001)
├── .env.example           ← Copy to .env and add your key
├── src/
│   ├── lib/api.js         ← Calls localhost:3001/api/messages
│   ├── hooks/useIdeaGenerator.js
│   └── components/
│       ├── BgGrid, Header, ConfigForm
│       ├── IdeaCard, IdeaList
```

## Stack

- React 18 + Vite
- Express + CORS (proxy)
- Framer Motion
- CSS Modules
- Claude Sonnet via Anthropic API
