# Agaman Thapa — Portfolio

Next.js 15 · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion · Lucide.
See `DESIGN.md` for the concept, colour system and architecture.

## Run it
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Fill in the TODOs (do this first)
Search the project for `TODO`.

1. `data/portfolioData.ts` — LinkedIn URL, GitHub URL, email, and the exact LinkedIn education wording. Until set, those links show as muted "not added yet" chips instead of broken links.
2. `data/skills.ts` — cross-check against your LinkedIn Skills list; add real ones (e.g. JavaScript, SQL) and remove anything you don't want to claim.
3. `data/projects.ts` — check each project's `status`, and edit the challenges / learned / future text so it matches what really happened (it was drafted from your feature lists). Add `links.github` / `links.demo`.
4. `data/experience.ts` — add real roles (left empty on purpose) and optionally `credentials` in `portfolioData.ts` (certifications, courses, languages, achievements). Empty groups never render.
5. Screenshots — put images in `public/projects/` and add `{ caption, src: "/projects/p01.png" }` to a project's `screenshots`.

## Contact form
The form validates client- and server-side, but the site has no inbox of its own. Set an endpoint (Formspree, Web3Forms, your own webhook…) in `.env.local`:

```
CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-id
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```
Without `CONTACT_FORM_ENDPOINT` the form tells visitors the message was **not** sent (and offers your email) — it never pretends.

## Easter eggs
Logo hover · browser console message · Konami code (↑↑↓↓←→←→ B A) · terminal: `sudo hire agaman`, `cat future.txt`, `nmap localhost`, `exit`.

## Deploy
Push to GitHub and import into Vercel (zero config), or `npm run build && npm start` on any Node host.
