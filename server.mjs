import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('./public/', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml' };
const files = new Set(['/index.html', '/style.css', '/app.js', '/forecast.js', '/favicon.svg']);
export const server = createServer(async (req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname === '/health') { res.writeHead(200); res.end('ok'); return; }
  const file = pathname === '/' ? '/index.html' : pathname;
  if (!files.has(file)) { res.writeHead(404); res.end('Not found'); return; }
  try {
    const body = await readFile(path.join(root, file));
    res.writeHead(200, { 'Content-Type': types[path.extname(file)], 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(500); res.end('Something went wrong. Probably another feature request.'); }
});
server.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => console.log(`Cockwatch is listening at http://localhost:${server.address().port}`));
