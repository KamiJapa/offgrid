import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {products} from '../data/products.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(ids.length,new Set(ids).size,'Duplicate HTML IDs');
let links=0,assets=0;
for(const [,ref] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
 if(ref==='#')continue;
 if(ref.startsWith('#')){assert(ids.includes(ref.slice(1)),`Missing anchor ${ref}`);links++;}
 else if(!/^(https?:|data:|mailto:)/.test(ref)){assert(fs.existsSync(path.join(root,ref)),`Missing asset ${ref}`);assets++;}
}
for(const [,srcset] of html.matchAll(/srcset="([^"]+)"/g))for(const item of srcset.split(',')){assert(fs.existsSync(path.join(root,item.trim().split(' ')[0])),'Missing responsive asset');}
for(const p of products){assert(html.includes(`data-product="${p.id}"`));assert(fs.existsSync(path.join(root,`assets/images/${p.image}.webp`)));assert(p.description&&p.colour&&p.category&&p.price>0);}
assert.equal((html.match(/<h1\b/g)||[]).length,1);
assert.equal((html.match(/<article class="product"/g)||[]).length,6);
assert(!html.includes('cdn.tailwindcss.com'));
assert(!html.includes('type="password"'));
const js=fs.readFileSync(path.join(root,'js/main.js'),'utf8');
assert(!/localStorage|sessionStorage|fetch\(|XMLHttpRequest|innerHTML/.test(js),'Unexpected network, persistence or unsafe HTML insertion');
for(const config of ['package.json','vercel.json'])JSON.parse(fs.readFileSync(path.join(root,config),'utf8'));
const css=fs.readFileSync(path.join(root,'css/style.css'),'utf8');
for(const [,font] of css.matchAll(/url\(["']?(\.\.\/assets\/fonts\/[^"')]+)["']?\)/g))assert(fs.existsSync(path.resolve(root,'css',font)));
console.log(`PASS: 6 complete products; ${links} valid internal links; ${assets} local references; responsive images; unique IDs; one H1; JSON; fonts; no newsletter persistence/network calls.`);
