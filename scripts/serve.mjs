import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT || 4174);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.webp':'image/webp', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.txt':'text/plain; charset=utf-8' };
const csp = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'";
http.createServer((req, res) => {
  try {
    if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405); return res.end(); }
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
    const relative = path.relative(root, file);
    if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(path.sep).some(part => part.startsWith('.') || part === 'node_modules')) { res.writeHead(403); return res.end(); }
    const stat = fs.statSync(file);
    if (!stat.isFile()) throw new Error('Not a file');
    const compress = /gzip/.test(req.headers['accept-encoding'] || '') && /\.(html|css|js|svg|txt)$/.test(file);
    const body = compress ? gzipSync(fs.readFileSync(file)) : null;
    res.writeHead(200, { 'Content-Type':types[path.extname(file)] || 'application/octet-stream', 'Content-Length':body ? body.length : stat.size, ...(compress ? { 'Content-Encoding':'gzip', 'Vary':'Accept-Encoding' } : {}), 'Content-Security-Policy':csp, 'X-Content-Type-Options':'nosniff', 'X-Frame-Options':'DENY', 'Referrer-Policy':'strict-origin-when-cross-origin', 'Permissions-Policy':'camera=(), microphone=(), geolocation=()', 'Cache-Control':'no-cache' });
    if (req.method === 'HEAD') return res.end();
    if (body) res.end(body); else fs.createReadStream(file).pipe(res);
  } catch { res.writeHead(404, { 'Content-Type':'text/plain; charset=utf-8' }); res.end('Página não encontrada.'); }
}).listen(port, '127.0.0.1', () => console.log(`OFFGRID SUPPLY — http://127.0.0.1:${port}`));

