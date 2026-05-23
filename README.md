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
  .htaccess                SPA fallback + headers for Apache / cPanel
  contact.php              Contact handler for cPanel/PHP hosting (optional)
worker/index.ts            Cloudflare Worker: serves the SPA + POST /api/contact
wrangler.jsonc             Cloudflare Worker config (assets + SPA fallback)
src/
  routes/                  Pages (index, about, services, gallery, contact)
  components/              Header, Footer, shared UI
  data/site.ts             All site content lives here (one place to edit)
```

Most copy, contact details, pillars, gallery items, and the areas-of-operation
data are centralized in [`src/data/site.ts`](src/data/site.ts).

## Deployment — Cloudflare Workers (recommended)

This repo deploys as a **Worker with static assets**. Connect it in the
Cloudflare dashboard (**Workers & Pages → Create → Import a repository**) and set,
under the project's **Settings → Build**:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Node version | 20 (set via `.nvmrc`) |

`wrangler.jsonc` serves `dist/` and uses `not_found_handling: single-page-application`
so deep links / hard refreshes resolve to the SPA. The Worker in
[`worker/index.ts`](worker/index.ts) handles `POST /api/contact`; all other
requests are served as static assets.

To deploy from your machine instead: `npm run deploy` (runs `vite build` then `wrangler deploy`).

### Contact form (Cloudflare)

The form posts to `/api/contact`, handled by the Worker, which sends email via
[Resend](https://resend.com). In the Worker's **Settings → Variables and Secrets**, add:

| Variable | Value | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | `re_…` | **Secret.** From the Resend dashboard. |
| `CONTACT_TO` | `info@mcern.org` | Optional. Where submissions are delivered. |
| `CONTACT_FROM` | `M-CERN Website <noreply@mcern.org>` | Optional. Must use a Resend-verified domain. |

Until `RESEND_API_KEY` is set (and during local `vite` runs), the form
gracefully falls back to opening the visitor's email client (`mailto:`).

## Deployment — Netlify

`netlify.toml` is configured (build `npm run build`, publish `dist`, SPA redirect).
Connect the repo in Netlify (**Add new site → Import an existing project**) and it
builds automatically.

### Contact form (Netlify Forms)

The form uses **Netlify Forms** — no API key or function needed. A hidden static
form in `index.html` (`name="contact"`) lets Netlify's build bot detect the form;
the React form posts URL-encoded data to `/` with `form-name=contact`.

To receive submissions: Netlify dashboard → **Forms** (submissions are listed
there) → **Form notifications** → add an email notification to `info@mcern.org`.
Spam is filtered via the `bot-field` honeypot. Free tier: 100 submissions/month.

> Netlify Forms only works when the site is hosted on Netlify. On other hosts the
> form falls back to opening the visitor's email client (`mailto:`).

## Deployment — cPanel / Apache

Upload the contents of `dist/` to `public_html`. `public/.htaccess` handles HTTPS,
SPA routing, caching, and the `/contact.php` passthrough. (The form falls back to
`mailto:` unless you wire `contact.php`.)
