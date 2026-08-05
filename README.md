# Artavita Redesign — Portfolio Case Study

A fully static, 11-page redesign concept for artavita.com, built as a **portfolio
case study / demo** to show prospective clients — not a live deployment for the
real Artavita business. No backend, no real accounts, no real payments; a couple
of buttons show a "this is a demo" alert instead of submitting.

## What's included

| Page | Template type |
|---|---|
| `index.html` | Homepage |
| `artworks.html` | Browse / grid — all artworks (filters, sort, pagination) |
| `artwork-detail.html` | Single artwork detail page |
| `artists.html` | Browse / grid — Artists & Galleries directory (two subsections) |
| `artist-profile.html` | Artist / gallery profile page |
| `news-post.html` | Article / post detail |
| `signin.html` | Sign in / sign up (tabbed form) |
| `contest-entry.html` | Multi-step wizard (contest submission) |
| `about.html` | Static content + contact form + FAQ accordion |
| `pricing.html` | Pricing table (monthly/yearly toggle) |
| `dashboard.html` | Account dashboard |

All pages share one design system:

- `assets/styles.css` — brand colors, type (Imprima headings / Inter body), layout,
  and all component styles
- `assets/script.js` — shared interactions: scroll reveal, count-up stats, header
  shrink-on-scroll, mobile nav, video player, filters, tabs, accordion, pricing
  toggle, wizard navigation
- `assets/logo-color.png`, `assets/logo-white.png` — real Artavita logo assets

Brand colors: Teal Green `#096B59`, Keppel `#2BB79A`, Pale Turquoise `#AFF7E8`,
Black, Bright Gray `#5A5A5A`, White Smoke `#F5F5F5`.

### How the click-through flow works

Every artwork thumbnail across the site (homepage, Discover grid, an artist's
portfolio) links to the same `artwork-detail.html`, and every artist/gallery
card (homepage, the Artists & Galleries directory) links to the same
`artist-profile.html`. That's intentional: this is a design case study, not a
working database, so rather than build a unique page per artwork or per artist
— which isn't the point of a portfolio piece — every card demonstrates the same
real detail-page template. It's enough to show a client the full browse →
profile → artwork flow without needing hundreds of near-duplicate pages behind
it.

## Run it locally

No build step — just open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Deploy to Cloudflare Pages

**Option A — Cloudflare dashboard (no CLI needed)**

1. Go to the Cloudflare dashboard → Workers & Pages → Create → Pages → Upload assets.
2. Drag this whole folder in (or a zip of it) and deploy. Done — you'll get a
   `*.pages.dev` URL immediately.

**Option B — Wrangler CLI**

```bash
npm install -g wrangler
wrangler login
wrangler pages deploy . --project-name=artavita-portfolio-demo
```

This repo's `wrangler.toml` is already scoped to this folder, so `wrangler pages
deploy .` from inside it works without extra flags once you're logged in.

## Notes for whoever picks this up

- A few images reference the real artavita.com CDN (`s3-us-west-1.amazonaws.com`)
  and `picsum.photos` placeholders — they'll load fine once this is served over
  the open internet.
- Every internal link was verified to resolve to a real file in this folder —
  there are no dead links across the 11 pages.
- Nothing here talks to a real backend. Forms, checkout, and payment buttons are
  intentionally non-functional (demo-only), by design, since this is a design
  case study rather than a working product.
