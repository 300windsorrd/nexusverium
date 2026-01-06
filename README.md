## Nexus Verium Website

Next.js (App Router) + TypeScript + Tailwind CSS site for Nexus Verium. Mobile-first, SEO-first, with programmatic pages driven from JSON content and a fixed logo watermark background.

### Setup

1) Install dependencies: `npm install`
2) Run locally: `npm run dev`
3) Lint: `npm run lint`
4) Production build: `npm run build` (outputs static `out/`), preview with `npx serve out`

Set `SITE_URL` in `.env.local` to your deployment hostname (used for canonical tags, sitemap, and JSON-LD):
```
SITE_URL=https://www.nexusverium.com
```

### Content model (all editable without code changes)

- Services: `content/services.json`
- Industries: `content/industries.json`
- Locations: `content/locations.json`
- Research: `content/research.json`
- Team: `content/team.json`
- Projects: `content/projects.json`
- Timeline: `content/timeline.json`

Each programmatic entry includes `slug`, `metaTitle`, `metaDescription`, `h1`, `intro`, `bullets`, `processSteps`, `faq`, `primaryKeywords`, `secondaryKeywords`, optional `location`, and `related` slugs for cross-linking. Pages are statically generated at build time.

### Adding new programmatic pages

1) Add an object to the matching JSON file with a unique `slug` and the required fields.
2) Run `npm run dev` to preview; the new route is available at `/services/{slug}`, `/industries/{slug}`, `/locations/{slug}`, or `/research/{slug}`.
3) Deploy; sitemap.xml and robots.txt will include the new URL automatically.

### Editing team, projects, and timeline

- Update `content/team.json` for bios, roles, and portrait paths. Image placeholders live in `public/team/`.
- Update `content/projects.json` for the project grid and /now page.
- Update `content/timeline.json` to change the interactive parallax roadmap (reduced-motion fallback is automatic).

### Contact form

- UI lives at `src/components/ContactForm.tsx`; submissions post to `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` when provided or the built-in `/api/contact` handler otherwise.
- Client-side validation: required fields and a honeypot spam trap.
- API handler in `src/app/api/contact/route.ts` persists submissions to Postgres when `CONTACT_FORM_DATABASE_URL` or `DATABASE_URL` is set (table name defaults to `contact_submissions`, override with `CONTACT_TABLE_NAME`); when no database URL is available it appends the payload to `data/contact-submissions.json` for local review.
- CAPTCHA placeholder: integrates Cloudflare Turnstile or reCAPTCHA by sending a `captchaToken` field to your form backend.

### Architecture notes

- Shared layout with notification bar, sticky header search, and logo watermark lives in `src/app/layout.tsx`.
- Design tokens in `src/app/globals.css`; Tailwind utilities drive spacing/typography.
- SEO helpers: `src/lib/metadata.ts` and `src/components/SeoHead.tsx` inject JSON-LD (Organization, Breadcrumb, Service/Research, FAQ).
- Dynamic routes in `src/app/services|industries|locations|research/[slug]/page.tsx` render from JSON content.
- Sitemap/robots: `src/app/sitemap.ts` and `src/app/robots.ts`.
