# mem01-site

Marketing landing page for mem01 — self-hosted belief memory for AI agents.

**Live:** [https://solomon-mithra.github.io/mem01-site/](https://solomon-mithra.github.io/mem01-site/)

## Stack

- [Next.js](https://nextjs.org) (App Router) static export
- [Tailwind CSS](https://tailwindcss.com) v4
- [lucide-react](https://lucide.dev) icons
- GitHub Pages via Actions (`.github/workflows/deploy-pages.yml`)

## Develop

```bash
cd mem01-site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Config

Edit `src/lib/site.ts` or set:

| Env | Purpose |
|-----|---------|
| `NEXT_PUBLIC_GITHUB_URL` | Hero / CTA GitHub link (default: `https://github.com/Solomon-mithra/mem01`) |
| `NEXT_PUBLIC_DOCS_URL` | Docs / quick start link |

## Build

```bash
npm run build
npm start
```

## Page structure (YC-style)

1. **Hero** — outcome headline, primary **Start on GitHub**, NY→SF micro-demo  
2. **Problem** — append-only memory fails under evolution  
3. **Compare** — table + narrative vs mem0 / Zep / DIY vectors  
4. **How it works** — remember → beliefs → recall  
5. **Features / API** — product grid + curl  
6. **FAQ + final CTA**
