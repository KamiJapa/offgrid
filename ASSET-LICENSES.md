# Asset provenance

Prepared 12 October 2026. No established fashion brand campaign assets, logos or trademarks were downloaded.

## Original concept imagery

All WebP images under `assets/images/` were generated for this project with the built-in OpenAI image generation tool. These are synthetic fashion studies, not photographs of manufactured OFFGRID products. Usage remains subject to the OpenAI terms applicable to the generating account; this document does not assert exclusive copyright or grant a third-party stock licence.

| Files | Source and purpose |
| --- | --- |
| hero.webp, hero-small.webp | Original generated campaign: adult Black model in oversized shell jacket and cargo trousers, concrete architecture, negative space at left. |
| jacket, tee, cargo, hoodie, cap, crossbody (full and small WebP) | Original generated 3 × 2 product photography sheet. Each panel extracted, resized and compressed for the catalogue. |
| look-1 through look-6 (full and small WebP) | Original generated 3 × 2 campaign contact sheet with diverse adult models, macro garment detail and an after-hours study. Panels extracted and optimised. |
| closing.webp, closing-small.webp | Original generated wide closing campaign with two adult models in concrete architecture. |

The image-generation prompt descriptions and design decisions are recorded in `DESIGN-NOTES.md`. No image generation service is called by the website. Original large generation files are outside the deployment package; the final optimised assets are included.

## Typography

Archivo Black, Space Grotesk and IBM Plex Mono were obtained from the official Google Fonts stylesheet and fonts.gstatic.com on 12 October 2026. They are served locally with `font-display: swap`. SIL Open Font License texts are included in `licenses/`.

- https://github.com/google/fonts/tree/main/ofl/archivoblack
- https://github.com/google/fonts/tree/main/ofl/spacegrotesk
- https://github.com/google/fonts/tree/main/ofl/ibmplexmono

## Code libraries

- GSAP Core and ScrollTrigger 3.15.0, locally bundled official distribution. Original copyright/licence notices retained in both vendor files. See the included `licenses/GSAP-README.md` and https://gsap.com/standard-license/ for the applicable standard licence. Do not describe GSAP as MIT-licensed.
- Tailwind CSS 4.3.3 and PostCSS 8.5.28 are build-time dependencies under MIT licences. No Tailwind CDN runtime is used. Version resolution is recorded in `package-lock.json`.

## Identity and code

OFFGRID wordmark paths and O/G monogram are original project SVGs. The SUPPLY descriptor uses the system Arial fallback within the SVG; Arial font files are not redistributed. Interface arrows are Unicode glyphs. The original application source was created for this portfolio brief. No external template was copied.

Generated garment images are visual interpretations. Small branding details in approved concept copy are not manufacturing specifications and may not be legible in renders. No unsupported colour variants, material certifications, stock or review claims are presented.
