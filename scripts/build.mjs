import {createRequire} from 'node:module';
import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {products} from '../data/products.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let require=createRequire(import.meta.url);
try { require.resolve('@tailwindcss/postcss'); } catch { require=createRequire(path.join(root,'../nox-detail/package.json')); }
const postcss=require('postcss'), tailwind=require('@tailwindcss/postcss');
// Static product HTML keeps the whole catalogue readable without JavaScript.
let html=await readFile(path.join(root,'index.html'),'utf8');
const cards=products.map(p=>`<article class="product" data-category="${p.category}"><a class="product-link" href="#detail-${p.id}" data-product="${p.id}" aria-label="View details: ${p.name}"><div class="product-image"><span class="product-code mono">${p.id}</span><img src="assets/images/${p.image}.webp" srcset="assets/images/${p.image}-small.webp 320w, assets/images/${p.image}.webp 512w" sizes="(max-width: 359px) 90vw, (max-width: 767px) 45vw, 30vw" width="512" height="512" loading="lazy" alt="${p.name.toLowerCase()} in ${p.colour.toLowerCase()}"><span class="product-open" aria-hidden="true">↗</span><span class="product-view mono">VIEW DETAILS</span></div><div class="product-title"><h3>${p.name}</h3><span>£${p.price}</span></div><p class="product-meta mono">${p.category} / ${p.colour}</p></a><details class="fallback-detail" id="detail-${p.id}"><summary>Product details</summary><p>${p.description}</p><p>Fictional product. Concept price £${p.price}. Not available to purchase.</p></details></article>`).join('\n');
html=html.replace(/<!-- PRODUCTS START -->[\s\S]*?<!-- PRODUCTS END -->/,`<!-- PRODUCTS START -->\n${cards}\n<!-- PRODUCTS END -->`);
await writeFile(path.join(root,'index.html'),html);
const input=path.join(root,'css/input.css');
const css=await postcss([tailwind({base:root,optimize:{minify:true}})]).process(await readFile(input,'utf8'),{from:input,to:path.join(root,'css/style.css')});
await writeFile(path.join(root,'css/style.css'),css.css);
await mkdir(path.join(root,'assets/vendor'),{recursive:true});
for(const file of ['gsap.min.js','ScrollTrigger.min.js']) await copyFile(require.resolve(`gsap/dist/${file}`),path.join(root,'assets/vendor',file));
console.log(`Built static catalogue (${products.length} products), production CSS (${css.css.length} bytes), local GSAP.`);
