# OFFGRID SUPPLY

An original, static streetwear brand experience. Built for a front-end portfolio with HTML5, compiled Tailwind CSS, custom CSS, Vanilla JavaScript modules, GSAP Core and ScrollTrigger. All runtime assets are local. There is no production Node server, backend, database, tracking, checkout or subscription service.

**Fictional brand:** OFFGRID SUPPLY, its products, prices, campaigns and London identity are demonstration content. Nothing is manufactured, sold or subscribed through this website. Photography is AI-generated concept imagery. The contact address uses the reserved `.example` domain.

## Preview

In this folder, run `npm run preview` (or `node scripts/serve.mjs`) using a recent Node.js installation. Open **http://127.0.0.1:4174**. This preview needs no dependency install. It is a development utility, not a production server. An ordinary static HTTP server works too. Avoid opening `index.html` using `file://`, because ES modules require an HTTP origin in browsers.

## Rebuild

Production CSS and the rendered catalogue are already included. To edit and rebuild:

```sh
npm ci
npm run build
npm run check
```

The build compiles `css/input.css` into `css/style.css`, pre-renders the six product cards from `data/products.js` into the marked block in `index.html`, and refreshes local GSAP distributions. Node is needed only for development. Exact dependencies are pinned in `package-lock.json`; no production Tailwind CDN is used.

## Design

Industrial editorial with Swiss-inspired hierarchy, concrete imagery, asymmetric page rhythm, bone/black contrast and restrained red accents. Archivo Black handles display type, Space Grotesk handles body/UI, and IBM Plex Mono handles metadata. Original geometric wordmarks and O/G monogram are in `assets/icons/`. See `DESIGN-NOTES.md` for actual references, asset prompts and intentional differences from generated concepts.

## Structure

```text
index.html             All sections and pre-rendered product catalogue
css/input.css          Tailwind input, tokens, custom layouts and media queries
css/style.css          Compiled production stylesheet
js/main.js             Navigation, dialogs, filters, lookbook, form demo, GSAP
data/products.js       Canonical six-product content
assets/images/         Optimised local WebP campaign/product images
assets/fonts/          Local WOFF2 fonts
assets/icons/          Original SVG identity
assets/vendor/         Pinned GSAP Core and ScrollTrigger
scripts/               Development build, static checks and preview server
licenses/              Font licences and GSAP attribution
_headers               Proposed Netlify response headers
netlify.toml           Static publishing configuration
vercel.json            Static publishing and response-header configuration
```

## Content editing

- Products: edit `data/products.js`, then run `npm run build`. Do not manually edit the generated product HTML block. The modal reads the same data file.
- Copy and section order: edit `index.html`.
- Images: replace local WebPs with authorised assets. Preserve filenames or update HTML/data references. Maintain full/small variants, `srcset`, `sizes`, explicit dimensions and meaningful alt text. Keep the hero eager/high priority; lazy-load below the fold. Update `ASSET-LICENSES.md` when replacing assets. Product images are square 512px with 320px variants; campaign hero and closing are 1536px with 768px variants. For very large displays, commission higher-resolution lookbook originals rather than enlarging the supplied 512px studies.
- Palette, spacing, typography and breakpoints: edit `:root`, `@theme`, `@font-face` and media queries in `css/input.css`, then rebuild. The visible SVG wordmark is independent of web-font loading.
- Brand narrative is available in the manifesto and expandable footer story. Both archive campaigns explicitly identify themselves as fictional studies.

## Interactions and accessibility

Sticky header, working section anchors, full-screen mobile menu, five product filters with pressed states/live counts, six complete product dialogs, six-image lightbox with previous/next controls and Left/Right keys, Escape dismissal and focus restoration, newsletter validation and honest demo feedback. No input is persisted or transmitted.

Native `<dialog>` supplies modal focus containment and background inertness in current browsers. Navigation moves focus to the chosen mobile destination. Skip link, semantic landmarks/headings, visible keyboard focus and descriptive image alternatives are present. `prefers-reduced-motion` disables CSS transitions/smooth scrolling and GSAP timelines. If GSAP fails, content and core interactions remain. Without JavaScript, all products remain in HTML with native disclosure details and lookbook images open directly. Newsletter processing stays inactive. WCAG 2.2 AA is a target, not a certification; complete a screen-reader and contrast audit before a client launch.

## Deployment

Deploy the **contents of `offgrid-supply/`**, with `index.html` at the publishing root. Runtime consists of HTML, CSS, `js/`, `data/`, and `assets/`; documentation and licence files can stay alongside it. Never upload `node_modules` or development caches. No credentials or environment variables are needed.

### Netlify

Unzip, then drag the folder containing `index.html` into Netlify's manual deploy interface. CSS is already compiled. For Git deployment set the project/base folder to `offgrid-supply`, publish directory to `.`, and leave the build command empty when using the checked-in production files. `_headers` is included. [Official deployment documentation](https://docs.netlify.com/deploy/create-deploys/).

### Vercel

Import a repository with root directory `offgrid-supply`, choose the static/Other preset, disable the build command and publish `.`. `vercel.json` supplies the output directory and proposed response headers. No serverless function or Node production process is needed. [Project configuration reference](https://vercel.com/docs/project-configuration).

### GitHub Pages

Put this folder's contents at a dedicated repository root (or in its `/docs` folder), select that branch/folder in Settings → Pages, and enable HTTPS. `.nojekyll` is included. Relative URLs support a repository subdirectory. GitHub Pages does not apply `_headers` or `vercel.json`; a proxy or another host is needed for custom response headers. [Pages creation documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

No deployment was performed. Once the actual HTTPS URL is known, add a canonical URL and make the Open Graph/Twitter image URLs absolute. Verify link previews against the real host. Do not add real-store structured data, fake stock, reviews or availability.

## Security

- No API keys, private tokens, backend endpoints, real payment or form integration in public assets.
- Form input uses native email validation; JavaScript prevents submission and resets the field after demo feedback. The input has no submission name and CSP forbids form actions. No local/session storage is used.
- User input is never inserted with `innerHTML`. Product descriptions are assigned as text.
- CSP defaults to same-origin resources and disables objects, external scripts and form submissions. Inline styles are permitted for GSAP and the no-JS fallback. This is intentional; inline scripts are not permitted.
- Proposed headers include CSP, nosniff, Referrer-Policy, Permissions-Policy, frame blocking and HSTS. They are **not asserted active in hosting** until deployment and response-header verification.
- Enable and verify HTTPS and HTTP→HTTPS redirects on the selected host. HSTS should be served only over a correctly configured HTTPS origin. No `includeSubDomains`/preload commitment is made.
- If a real newsletter is added later, obtain authorisation and consent, implement server-side validation, rate limiting, spam controls and privacy handling, and revise `form-action`/`connect-src` deliberately. This project currently has no submission endpoint.
- Libraries are pinned and local. `npm install --package-lock-only --ignore-scripts` reported 0 known vulnerabilities on 12 October 2026; this is a point-in-time package audit, not a security certification.

## Testing results — 12 October 2026

Tested at `http://127.0.0.1:4174` in Codex's in-app Chromium browser using its DOM, locator, screenshot and viewport APIs.

| Check | Actual result |
| --- | --- |
| Title, meaningful content, correct route, no framework error overlay | Passed |
| Responsive widths 320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920 | No horizontal page overflow or headings outside viewport |
| Desktop and 390px mobile visual inspection | Hero, catalogue, lookbook, navigation and detail states inspected |
| Five category filters | All 6; Outerwear 1; Tops 2; Bottoms 1; Accessories 2 |
| All six product panels | Correct title/price and complete content; close buttons work |
| Escape and focus restoration | Passed for product panel, lookbook and mobile menu |
| Keyboard focus cycle | Explicit Tab/Shift+Tab wrapping added after an edge escape was observed; mobile menu retest passed in both directions |
| Mobile menu destination | Collection anchor reached, menu closed, focus moved to section |
| Lookbook controls | Next image and Left key changed image/counter; Escape restored opener |
| Newsletter | Invalid email rejected; valid demo email produced truthful feedback and cleared input |
| Console warnings/errors | None observed in tested flows |
| Images | No broken loaded image observed; local files/srcsets validated |
| Static checks | Six complete products, 25 valid internal anchors, 33 local references, unique IDs, one H1, config JSON, no input persistence/network calls |
| Build and JS syntax | Passed |
| Reduced motion and no-JS fallback | Source reviewed; browser preference/JS-off emulation not exercised |
| ZIP | Generated and entry list/content verified at delivery |

Re-run `npm run check` for static validation. Browser screenshots are retained outside this deployable folder to keep the package clean.

## Known limitations

Lighthouse scores were not measured; no performance/accessibility/SEO score is claimed. Safari, Firefox, real touch devices, assistive technology and hosted headers were not tested. The browser capture API may soften screenshots independently of original assets. Some editorial photographs are 512px square visual studies and can soften when enlarged. AI-generated clothing may differ between product and campaign imagery. Meta share images require the final absolute deployment URL. The brand, prices, contact and newsletter are intentionally fictional. No external checkout or subscription is expected to work.
