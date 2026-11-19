# basantathapa.de

Persönliche Website von Basanta Thapa, gebaut mit [Astro](https://astro.build) und automatisch über GitHub Pages veröffentlicht.

## Inhalte

- `src/posts/` – Blogbeiträge als Markdown (Dateiname `JJJJ-MM-TT-titel.md`, `draft: true` blendet aus)
- `src/data/publications.json`, `src/data/talks.json` – Publikationen und Vorträge
- `src/components/` – Seiten (Start, Über mich, Kontakt …) jeweils für Deutsch und Englisch
- `src/archive/` – ältere Seiten aus Studium und Forschung
- `public/uploads/` – Bilder und PDFs

## Lokal

```
npm install
npm run dev
```

Jeder Push auf `main` baut und veröffentlicht die Seite.
