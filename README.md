# Books Vibe

A book discovery and reading tracker built with Next.js.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy on Vercel

Import this repository into Vercel. The default Next.js settings are ready to use; Vercel will run `npm run build` automatically.

The book pages load `public/booksData.json` with async server-side `fetch`, using the current request URL so local development and Vercel deployments use the same code path.
