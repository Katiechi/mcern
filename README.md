# M-CERN Website

Marketing website for the **Mathare Community Emergency Response Network (M-CERN)** —
a grassroots, community-led disaster response and resilience network in Nairobi, Kenya.

Built as a static single-page app: **React + TypeScript + Vite + Tailwind CSS + TanStack Router**.

## Local development

```bash
npm install
npm run dev      # http://localhost:8080
```

Other scripts:

```bash
npm run build    # production build → dist/
npm run preview  # serve the built dist/ locally
npm run lint
```

## Project structure

```
functions/api/contact.ts   Cloudflare Pages Function for the contact form
public/                     Static assets copied as-is into the build
  images/                   Optimized site photos (webp)
  images/extras/            Gallery "Field Photos"
  _redirects               SPA fallback for Cloudflare Pages / Netlify
  .htaccess                SPA fallback + headers for Apache / cPanel
  contact.php              Contact handler for cPanel/PHP hosting (optional)
src/
  routes/                  Pages (index, about, services, gallery, contact)
  components/              Header, Footer, shared UI
  data/site.ts             All site content lives here (one place to edit)
```

Most copy, contact details, pillars, gallery items, and the areas-of-operation
data are centralized in [`src/data/site.ts`](src/data/site.ts).

## Deployment — Cloudflare Pages (recommended)

Connect this repo in the Cloudflare dashboard (**Workers & Pages → Create → Pages → Connect to Git**):

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Framework preset | None / Vite |
| Node version | 20 (set via `.nvmrc`) |

Client-side routes work on hard refresh via `public/_redirects`.

### Contact form (Cloudflare)

The form posts to `/api/contact`, handled by `functions/api/contact.ts`, which
sends email through [Resend](https://resend.com). In the Pages project under
**Settings → Environment variables**, add:

| Variable | Value | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | `re_…` | **Secret.** From the Resend dashboard. |
| `CONTACT_TO` | `info@mcern.org` | Optional. Where submissions are delivered. |
| `CONTACT_FROM` | `M-CERN Website <noreply@mcern.org>` | Optional. Must use a Resend-verified domain. |

Until `RESEND_API_KEY` is set (and during local `vite` runs), the form
gracefully falls back to opening the visitor's email client (`mailto:`).

## Deployment — other hosts

- **Netlify** — `netlify.toml` + `public/_redirects` are already configured.
- **cPanel / Apache** — upload the contents of `dist/` to `public_html`.
  `public/.htaccess` handles HTTPS, SPA routing, caching, and the `/contact.php`
  passthrough. (On non-Cloudflare hosts the form falls back to `mailto:` unless
  you wire `contact.php`.)
