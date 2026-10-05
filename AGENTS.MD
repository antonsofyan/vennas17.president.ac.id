# Agents.md (for AI coding agents)

Guidelines for this repository (`vennas_website`). Two sections: (1) work rules, (2) project architecture.

**Tradeoff:** Bias toward caution over speed. For trivial tasks, use judgment.

---

## 1. Work Rules

### Think before coding
- State assumptions explicitly. If ambiguous, ask — don't silently pick.
- If simpler approach exists, say so. Push back when warranted.

### Simplicity first
- Minimum code that solves the problem. Nothing speculative.
- No abstractions for single-use code. No config for values that never change.
- If it's 200 lines and could be 50, rewrite.

### Surgical changes
- Touch only what you must. Don't "improve" surrounding code/formatting.
- Match existing style, even if you'd do it differently.
- Mention dead code — don't delete it unless asked.
- Remove orphans (imports/vars/functions) that **your changes** made unused.
- Every changed line must trace directly to user's request.

### Goal-driven execution
- Turn tasks into verifiable criteria. Multi-step → brief plan `[step] → verify: [check]`.
- **Verification required after every edit** (see §3).

---

## 2. Architecture

Static multi-page site (MPA), HTML + Tailwind + Vanilla JS. **No framework, no bundler, no backend.** Deployed via GitHub Pages → `vennas17.president.ac.id` (see `CNAME`).

### Build pipeline
```
assets/css/input.css  ──postcss(@tailwindcss/postcss)──►  assets/css/style.css
```
- `input.css`: `@import "tailwindcss"` + `@import "./fonts.css"` + `@theme` block (color/font tokens).
- Tailwind v4 auto-scans text files in project root (respects `.gitignore`, so `node_modules/`, `mockup/`, `.agents/` are excluded).
- `style.css` = **compiled output, never edit directly.** New Tailwind classes in HTML/JS won't exist until rebuild.
- `postcss.config.mjs`: plugin `@tailwindcss/postcss`.
- Command: `npm run build` (one-off) / `npm run watch` (dev).

### Dynamic components
- `components/nav.html` + `components/footer.html` are fetched by `assets/js/components.js` into `<div id="nav-placeholder">` and `<div id="footer-placeholder">`.
- `components.js` also contains the sidebar nav toggle logic (`initNav`).
- **Consequence:** pages must be served via HTTP, not `file://` (fetch triggers CORS). Run `python3 -m http.server 8000`.
- Every page must have both placeholders + `<script src="assets/js/components.js">` before `</body>`.

### Pages
| File | Content |
|---|---|
| `index.html` | Home: hero, about, `Peluang publikasi` (grid of 13 journal links), etc. |
| `about.html` | About Vennas + Call for Papers |
| `about-aihii.html` | About AIHII |
| `about-presuni.html` | About President University |
| `contact.html` | Contact |
| `important-date.html` | Important dates timeline |
| `location.html` | Venue & accommodation + Google Maps embed |
| `kegiatan-pendamping.html` | Side events agenda |

### Assets
- `assets/images/` — logos, illustrations, QR, maps, footer graphics.
- `assets/fonts/` — Bebas Neue, DM Sans, Libre Baskerville (self-hosted). Registered via `@font-face` in `assets/css/fonts.css`.
- `mockup/` — PDF/PNG design references (gitignored, read-only).
- `node_modules/` — gitignored.

### Design system
- **Color:** `vennas-blue` (`#00AEEF`) defined as token `--color-vennas-blue` in `input.css`. Use via Tailwind classes (`bg-vennas-blue`, `text-vennas-blue`). Don't hardcode hex in HTML.
- **Fonts:** `font-dm` (body/nav), `font-bebas` (buttons/accents), `font-libre` (hero title).
- **Layout:** avoid excessive `max-w-*`. Use fluid padding `px-6 md:px-12 lg:px-20 xl:px-32`.
- **Animation:** AOS from CDN (`data-aos="fade-up"` + `data-aos-delay`).
- Desktop & mobile: sidebar nav toggled from fixed hamburger button.

---

## 3. Workflow

Edit HTML/JS →
```bash
npm run build     # REQUIRED if any new Tailwind class was added
python3 -m http.server 8000
```
Hard refresh browser (`Ctrl+Shift+R`). `style.css` caching frequently makes changes appear "not working".

### Common gotchas
1. **New Tailwind class has no effect** → forgot `npm run build`, OR browser cache. Both are the most frequent cause.
2. **Nav/footer empty** → opened via `file://`, not HTTP server.
3. **Grid item order in 2-column grid** — auto-placement: odd items → left column, even → right. Use `md:col-start-2` / `md:col-start-1` to force a column, but that leaves an empty cell in the paired position. Cleaner approach: reorder the HTML (interleave left/right items) and let auto-placement handle it.
4. **`about.html` also has journal links** — when editing journal list/attributes in `index.html`, check `about.html` too.
5. **Tailwind v4 and PostCSS** — `@tailwindcss/postcss` is the v4-compatible plugin. The old `tailwindcss` PostCSS plugin (v3) is not used.

---

**Success metric:** minimal diffs, no rewrites from over-engineering, clarifying questions before implementation rather than after mistakes.