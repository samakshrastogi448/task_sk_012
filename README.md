# Glasshouse Letters — Project 012

A cinematic botanical vow-renewal experience built with React + Vite + GSAP.

## Art direction
- Category: Vow Renewal / Botanical Editorial
- Visual language: greenhouse panes, letters, herbarium cards, archival paper, misty botanical portraiture
- Palette: pine, paper cream, moss, glass green and clay
- Entry: sealed-letter interaction
- Story: 12 distinct scenes with quiet editorial pacing
- Motion: GSAP reveals and restrained image drift with reduced-motion fallback

## Customize
Edit `src/data.js` for names, date, location, photographs and scene copy.

## Commands
```bash
npm install
npm run dev
npm run build
npm run qa:production
```

Production QA is defined in `qa/production-qa.mjs` and `.github/workflows/production-qa.yml` and targets `https://tasksk012.vercel.app`.
