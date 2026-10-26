import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname;
const pages = ['', 'service', 'support', 'flow', 'store', 'assessment', 'faq'];
const issues = [];
let refsChecked = 0;

for (const slug of pages) {
  const path = join(root, slug, 'index.html');
  if (!existsSync(path)) {
    issues.push(`missing page: /${slug}/`);
    continue;
  }
  const html = readFileSync(path, 'utf8');
  const label = `/${slug}/`;
  const count = (pattern) => [...html.matchAll(pattern)].length;
  if (count(/<h1(?:\s|>)/g) !== 1) issues.push(`${label}: expected exactly one h1`);
  if (!html.includes('lang="ja"')) issues.push(`${label}: missing Japanese language`);
  if (!html.includes('name="description"')) issues.push(`${label}: missing meta description`);
  if (!html.includes('name="robots" content="noindex,nofollow"')) issues.push(`${label}: preview must remain noindex`);
  if (!html.includes('id="main"')) issues.push(`${label}: missing main landmark`);
  if (!html.includes('tel:0567694600') || !html.includes('line.me/R/ti/p/@329fogkk')) issues.push(`${label}: missing contact CTA`);
  if (/あま七宝店/.test(html)) issues.push(`${label}: incorrect store name`);
  if (/・+\s*(?:百島町.*あま七宝)/.test(html)) issues.push(`${label}: inconsistent address`);

  for (const match of html.matchAll(/<(a|img|link|script)\b[^>]*?\b(?:href|src)="([^"]+)"/g)) {
    const [tag, url] = [match[1], match[2]];
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    const [pathname, anchor] = url.split('#');
    const decoded = decodeURIComponent(pathname);
    const target = decoded.endsWith('/') ? join(root, decoded, 'index.html') : join(root, decoded);
    if (!existsSync(target)) issues.push(`${label}: broken ${tag} reference ${url}`);
    if (anchor && target.endsWith('.html') && existsSync(target)) {
      const destination = readFileSync(target, 'utf8');
      if (!destination.includes(`id="${anchor}"`)) issues.push(`${label}: broken anchor ${url}`);
    }
    refsChecked++;
  }
  for (const tag of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]*"/.test(tag[0])) issues.push(`${label}: image missing alt attribute`);
  }
  if (/<(img|a)\b[^>]*>[^<]*<\/\1>/.test(html) && html.includes('href="#"')) {
    issues.push(`${label}: placeholder link`);
  }
}
const style = readFileSync(join(root,'assets/style.css'), 'utf8');
if (!style.includes(':focus-visible')) issues.push('missing visible keyboard focus styling');
if (!style.includes('prefers-reduced-motion')) issues.push('missing reduced-motion styles');
if (!style.includes('@media (max-width: 720px)')) issues.push('missing mobile layout');
if (!style.includes('.mobile-actions')) issues.push('missing mobile contact bar styles');
if (issues.length) {
  for (const issue of issues) console.error('FAIL:', issue);
  process.exitCode = 1;
} else {
  console.log(`Verified ${pages.length} pages and ${refsChecked} internal references; contact, metadata and accessibility checks passed.`);
}
