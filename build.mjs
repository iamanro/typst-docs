// Static site generator: content/<lang>/**/*.md -> dist/. Every Typst block is compiled with the
// pinned Typst CLI at build time, so a broken example fails the build.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { Marked } from 'marked';
import { createHighlighter } from 'shiki';

const BASE = process.env.BASE ?? '/typst-docs/';
const ORIGIN = process.env.ORIGIN ?? 'https://iamanro.github.io';
const OUT = process.env.OUT ?? 'dist';
const CACHE = path.resolve('.cache');
const FONT_DIR = path.join(CACHE, 'fonts');
const TYPST_CLI = '0.15.1';
const TS_VERSION = JSON.parse(fs.readFileSync('node_modules/@myriaddreamin/typst.ts/package.json', 'utf8')).version;
const TS_TYPST = '0.15.0-rc.1'; // typst.ts 0.8.0-rc3 release notes: "Updated the Typst integration to Typst v0.15.0-rc.1"
const HUBS = ['learn-typst', 'typst-tips', 'typst-errors', 'research-writing'];
const SEQUENCED = { tutorial: 'stepOf', 'learn-typst': 'lessonOf' };
const PREAMBLE = '#set page(width: 12cm, height: auto, margin: 6mm)\n';
// Same font files for the CLI and the browser, so static and live output match.
const FONTS = [
  'LibertinusSerif-Regular.otf', 'LibertinusSerif-Italic.otf', 'LibertinusSerif-Bold.otf', 'LibertinusSerif-BoldItalic.otf',
  'NewCMMath-Regular.otf', 'DejaVuSansMono.ttf', 'DejaVuSansMono-Bold.ttf',
];
const i18n = JSON.parse(fs.readFileSync('i18n.json', 'utf8'));
const LANGS = Object.keys(i18n);

const cliVersion = spawnSync('typst', ['--version'], { encoding: 'utf8' }).stdout ?? '';
if (!cliVersion.startsWith(`typst ${TYPST_CLI} `)) throw new Error(`Need typst ${TYPST_CLI}, found: ${cliVersion || 'none'}`);

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
const fmt = (s, vars) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k]);
const url = (lang, slug = '') => `${BASE}${lang}/${slug ? `${slug}/` : ''}`;
const slugify = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(dir, e.name)) : e.name.endsWith('.md') ? [path.join(dir, e.name)] : []);

// ---------- fonts ----------
fs.mkdirSync(FONT_DIR, { recursive: true });
for (const f of FONTS) {
  const file = path.join(FONT_DIR, f);
  if (fs.existsSync(file)) continue;
  const res = await fetch(`https://raw.githubusercontent.com/typst/typst-assets/v${TYPST_CLI}/files/fonts/${f}`);
  if (!res.ok) throw new Error(`font ${f}: HTTP ${res.status}`);
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
}

// ---------- typst ----------
const exampleFiles = new Map(); // dist path -> cache path
function compile(source, expectError) {
  const hash = sha(`${cliVersion}\0${FONTS.join()}\0${source}`).slice(0, 16);
  const dir = path.join(CACHE, 'examples', hash);
  if (!fs.existsSync(path.join(dir, 'result.json'))) {
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'main.typ'), source);
    const r = spawnSync('typst', ['--color', 'never', 'compile', '--ignore-system-fonts', '--ignore-embedded-fonts',
      '--font-path', FONT_DIR, 'main.typ', 'page-{0p}.svg'], { cwd: dir, encoding: 'utf8' });
    fs.writeFileSync(path.join(dir, 'result.json'), JSON.stringify({ ok: r.status === 0, stderr: r.stderr.trim() }));
  }
  const result = JSON.parse(fs.readFileSync(path.join(dir, 'result.json'), 'utf8'));
  if (expectError ? result.ok : !result.ok || result.stderr) {
    throw new Error(`${expectError ? 'expected an error, but this compiled' : 'Typst reported'}:\n${result.stderr}\n--- source ---\n${source}`);
  }
  const pages = fs.readdirSync(dir).filter((f) => f.endsWith('.svg')).sort().map((f) => {
    const svg = fs.readFileSync(path.join(dir, f), 'utf8');
    const [, w, h] = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg);
    const out = `assets/examples/${hash}-${f}`;
    exampleFiles.set(out, path.join(dir, f));
    return { src: BASE + out, width: Math.round(w * 4 / 3), height: Math.round(h * 4 / 3) };
  });
  return { pages, stderr: result.stderr };
}

// ---------- content ----------
function parseDoc(file) {
  const src = fs.readFileSync(file, 'utf8');
  const m = /^---\n([\s\S]*?)\n---\n/.exec(src);
  if (!m) throw new Error(`${file}: missing front matter`);
  const meta = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i < 0) continue;
    const k = line.slice(0, i).trim();
    const v = line.slice(i + 1).trim();
    meta[k] = v.startsWith('[') ? v.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean)
      : /^\d+$/.test(v) ? Number(v) : v.replace(/^"(.*)"$/, '$1');
  }
  for (const k of ['title', 'description']) if (!meta[k]) throw new Error(`${file}: missing ${k}`);
  // `code` in titles: <code> in page HTML, plain text in <title>, meta tags and search
  meta.titleHtml = esc(meta.title).replace(/`([^`]+)`/g, '<code>$1</code>');
  meta.title = meta.title.replace(/`/g, '');
  return { meta, body: src.slice(m[0].length) };
}

const site = {};
const errors = []; // collected so one run reports every broken page
for (const lang of LANGS) {
  const root = path.join('content', lang);
  site[lang] = new Map(walk(root).map((file) => {
    const slug = path.relative(root, file).replace(/\.md$/, '').split(path.sep).join('/').replace(/^index$/, '');
    return [slug, { slug, file, ...parseDoc(file) }];
  }));
  for (const p of site[lang].values()) {
    for (const r of p.meta.related ?? []) if (!site[lang].has(r)) errors.push(`${p.file}: related page "${r}" does not exist`);
    if (p.meta.section && !site[lang].has(hubSlug(p.meta.section))) {
      errors.push(`${p.file}: section "${p.meta.section}" has no hub page`);
      site[lang].delete(p.slug);
    }
  }
}
function hubSlug(section) {
  return section === 'tutorial' ? 'tutorial' : `topics/${section}`;
}
const sectionPages = (lang, section) => [...site[lang].values()].filter((p) => p.meta.section === section)
  .sort((a, b) => (a.meta.order ?? 999) - (b.meta.order ?? 999) || a.meta.title.localeCompare(b.meta.title));

// ---------- markdown ----------
const highlighter = await createHighlighter({ themes: ['github-light', 'github-dark'], langs: ['typst', 'bash', 'bibtex', 'yaml'] });
const highlight = (code, lang) => highlighter.codeToHtml(code, {
  lang: lang === 'typ' ? 'typst' : highlighter.getLoadedLanguages().includes(lang) ? lang : 'text',
  themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false,
});

function renderOutput(pages, t) {
  return pages.map((p) => `<img src="${p.src}" width="${p.width}" height="${p.height}" alt="${esc(t.output)}" loading="lazy">`).join('');
}

function renderPage(lang, page) {
  const t = i18n[lang];
  const state = { headings: [], idents: new Set(), quiz: 0, ids: new Set() };
  const marked = new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const html = this.parser.parseInline(tokens);
        if (depth < 2) return `<h${depth}>${html}</h${depth}>\n`;
        let id = slugify(html) || 'section';
        while (state.ids.has(id)) id += '-';
        state.ids.add(id);
        if (depth === 2) state.headings.push(html.replace(/<[^>]+>/g, ''));
        return `<h${depth} id="${id}">${html}<a class="heading-link" href="#${id}" aria-label="#">#</a></h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        let target = href;
        if (/^\/(?!\/)/.test(href)) {
          const [slugPart, hash] = href.slice(1).split('#');
          const slug = slugPart.replace(/\/$/, '');
          if (!site[lang].has(slug)) throw new Error(`${page.file}: broken link ${href}`);
          target = url(lang, slug) + (hash ? `#${hash}` : '');
        }
        return `<a href="${esc(target)}"${title ? ` title="${esc(title)}"` : ''}>${text}</a>`;
      },
      code({ text, lang: info }) {
        const [lng, kind] = (info ?? '').split(/\s+/);
        if (lng === 'quiz') return quiz(text);
        if (lng === 'typ') for (const m of text.matchAll(/(?:#|\b(?:set|show)\s+)?([a-z][a-z0-9-]*)(?=\()/g)) state.idents.add(m[1]);
        if (lng !== 'typ' || !kind) return highlight(text, lng);
        if (kind === 'example') {
          const { pages } = compile(PREAMBLE + text, false);
          return `<figure class="example" data-example data-preamble="${esc(PREAMBLE)}" data-code="${esc(text)}"><div class="example-source">${highlight(text, 'typ')}</div><div class="example-output">${renderOutput(pages, t)}</div><button type="button" class="example-edit" data-edit hidden>${esc(t.edit)}</button></figure>\n`;
        }
        if (kind === 'error') {
          const { stderr } = compile(text, true);
          return `<figure class="example is-error"><div class="example-source">${highlight(text, 'typ')}</div><div class="example-output"><p class="output-label">${esc(t.errorOutput)}</p><pre class="diagnostic">${esc(stderr)}</pre></div></figure>\n`;
        }
        if (kind === 'lab') {
          const { pages } = compile(text, false);
          return `<div class="lab" data-lab data-code="${esc(text)}"><div class="lab-source"><div class="pane-bar"><span>${esc(t.source)}</span></div><div class="lab-editor">${highlight(text, 'typ')}</div></div><div class="lab-preview"><div class="pane-bar"><span>${esc(t.preview)}</span><span class="lab-status" aria-live="polite"></span></div><div class="lab-pages">${renderOutput(pages, t)}</div><div class="lab-diagnostics" aria-live="polite"></div><noscript><p>${esc(t.noscript)}</p></noscript></div></div>\n`;
        }
        throw new Error(`${page.file}: unknown block kind "${info}"`);
      },
    },
  });

  // ```quiz: question, "- [ ]"/"- [x]" options, "> " explanation.
  function quiz(src) {
    const lines = src.trim().split('\n');
    const options = lines.filter((l) => /^- \[[ x]\] /.test(l));
    const correct = options.findIndex((l) => l.startsWith('- [x]'));
    const question = lines.filter((l) => !/^(- \[[ x]\] |> )/.test(l)).join(' ');
    const explanation = lines.filter((l) => l.startsWith('> ')).map((l) => l.slice(2)).join(' ');
    if (correct < 0 || options.length < 2 || !question) throw new Error(`${page.file}: malformed quiz:\n${src}`);
    const name = `quiz-${++state.quiz}`;
    const letter = (i) => String.fromCharCode(65 + i);
    return `<form class="quiz" data-quiz data-correct="${correct}" data-correct-label="${esc(t.correct)}" data-wrong-label="${esc(t.wrong)}"><fieldset><legend>${marked.parseInline(question)}</legend>${options.map((o, i) =>
      `<label class="quiz__answer"><input type="radio" name="${name}" value="${i}"><span class="quiz__letter">${letter(i)}.</span><span>${marked.parseInline(o.slice(6))}</span></label>`).join('')}</fieldset><div class="quiz__actions" hidden><button type="submit">${esc(t.check)}</button></div><p class="quiz__feedback" aria-live="polite"></p><details class="quiz__key"><summary>${esc(t.answer)}</summary><p><strong>${letter(correct)}.</strong> <span data-quiz-explanation>${marked.parseInline(explanation)}</span></p></details></form>\n`;
  }

  let html = marked.parse(page.body);
  if (page.slug === '') html += homeExtras(lang);
  const hub = Object.keys(SEQUENCED).concat(HUBS).find((s) => hubSlug(s) === page.slug);
  if (hub) html += hubList(lang, hub);
  return { html, ...state };
}

function homeExtras(lang) {
  const tut = site[lang].get('tutorial');
  let html = tut ? `<a class="feature-card" href="${url(lang, 'tutorial')}"><strong>${tut.meta.titleHtml}</strong>${esc(tut.meta.description)}</a>` : '';
  for (const h of HUBS) {
    const p = site[lang].get(hubSlug(h));
    if (p) html += `<h3><a href="${url(lang, p.slug)}">${p.meta.titleHtml}</a></h3><p>${esc(p.meta.description)}</p>`;
  }
  return html;
}

function hubList(lang, section) {
  const pages = sectionPages(lang, section);
  const tag = SEQUENCED[section] ? 'ol' : 'ul';
  return `<${tag} class="page-list">${pages.map((p) => `<li><a href="${url(lang, p.slug)}">${p.meta.titleHtml}</a><span>${esc(p.meta.description)}</span></li>`).join('')}</${tag}>`;
}

function learningNav(lang, page) {
  const key = SEQUENCED[page.meta.section];
  if (!key) return '';
  const t = i18n[lang];
  const list = sectionPages(lang, page.meta.section);
  const i = list.indexOf(page);
  const prev = i === 0 ? site[lang].get(hubSlug(page.meta.section)) : list[i - 1];
  const next = list[i + 1];
  const label = fmt(t[key], { n: i + 1, total: list.length });
  const link = (p, cls, rel, caption) => p ? `<a class="${cls}" rel="${rel}" href="${url(lang, p.slug)}"><span>${esc(caption)}</span><strong>${p.meta.titleHtml}</strong></a>` : '';
  return `<nav class="learning-nav" aria-label="${esc(label)}"><p>${esc(label)}</p><div>${link(prev, 'learning-nav__previous', 'prev', t.previous)}${link(next, 'learning-nav__next', 'next', t.next)}</div></nav>`;
}

// ---------- assets ----------
const assetUrl = {};
for (const f of ['site.css', 'client.js', 'lab.js']) {
  const src = fs.readFileSync(path.join('site', f), 'utf8');
  assetUrl[f] = `${BASE}assets/${f}?v=${sha(src).slice(0, 10)}`;
  write(path.join(OUT, 'assets', f), src);
}

function layout({ lang, page, title, description, body, searchUrl, robots = 'index,follow' }) {
  const t = i18n[lang];
  const alternates = page ? LANGS.filter((l) => site[l].has(page.slug)) : [];
  const head = [
    `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">`,
    `<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="${robots}">`,
    page ? `<link rel="canonical" href="${ORIGIN}${url(lang, page.slug)}">` : '',
    ...alternates.map((l) => `<link rel="alternate" hreflang="${l}" href="${ORIGIN}${url(l, page.slug)}">`),
    alternates.includes('en') ? `<link rel="alternate" hreflang="x-default" href="${ORIGIN}${url('en', page.slug)}">` : '',
    `<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website"><meta property="og:locale" content="${t.locale}"><meta property="og:site_name" content="${esc(t.siteName)}">`,
    `<link rel="stylesheet" href="${assetUrl['site.css']}"><script type="module" src="${assetUrl['client.js']}"></script>`,
  ].join('');
  const langs = LANGS.map((l) => {
    const target = page && site[l].has(page.slug) ? page.slug : '';
    return l === lang ? `<span aria-current="true">${esc(i18n[l].name)}</span>` : `<a href="${url(l, target)}" hreflang="${l}" lang="${l}">${esc(i18n[l].name)}</a>`;
  }).join('');
  return `<!doctype html><html lang="${lang}" data-base="${BASE}" data-lab-module="${assetUrl['lab.js']}" data-lab-strings="${esc(JSON.stringify({ loading: t.loading, compiling: t.compiling, line: t.line, source: t.source }))}"><head>${head}</head><body><a class="skip" href="#content">${esc(t.skip)}</a><header><div class="header-inner"><a class="brand" href="${url(lang)}">${esc(t.siteName)}</a><form class="search" role="search" action="${url(lang)}" data-search-index="${searchUrl}" data-search-counted="${esc(t.searchCount)}" data-search-counted-one="${esc(t.searchCountOne)}" data-search-empty="${esc(t.searchEmpty)}"><label class="visually-hidden" for="docs-search">${esc(t.searchLabel)}</label><input id="docs-search" name="q" type="search" autocomplete="off" placeholder="${esc(t.search)}"><p class="search-status" data-search-status aria-live="polite"></p><ul class="search-results" data-search-results></ul></form><nav class="langs" aria-label="${esc(t.languages)}">${langs}</nav></div></header><div class="page"><main id="content">${body}</main></div><footer><p>${esc(t.footer)}</p><p>${esc(fmt(t.versions, { cli: TYPST_CLI, ts: TS_VERSION, tsTypst: TS_TYPST }))}</p></footer></body></html>`;
}

// ---------- pages ----------
const sitemap = [];
for (const lang of LANGS) {
  const t = i18n[lang];
  const rendered = [...site[lang].values()].flatMap((page) => {
    try {
      return [[page, renderPage(lang, page)]];
    } catch (err) {
      errors.push(`${page.file}: ${err.message}`);
      return [];
    }
  });
  const searchJson = JSON.stringify({ locale: lang, records: rendered.map(([p, r]) => [p.slug, p.meta.title, p.meta.description,
    p.meta.section ? site[lang].get(hubSlug(p.meta.section)).meta.title : '', r.headings.join(' '), [...r.idents].sort().join(' ')]) });
  const searchUrl = `${BASE}assets/search-${lang}.json?v=${sha(searchJson).slice(0, 10)}`;
  write(path.join(OUT, 'assets', `search-${lang}.json`), searchJson);
  for (const [page, r] of rendered) {
    const hub = page.meta.section && site[lang].get(hubSlug(page.meta.section));
    const crumb = hub ? `<p class="breadcrumb"><a href="${url(lang, hub.slug)}">${esc(hub.meta.title)}</a></p>` : '';
    const related = (page.meta.related ?? []).map((s) => site[lang].get(s)).filter(Boolean); // missing ones already reported
    const body = `<article>${crumb}<h1>${page.meta.titleHtml}</h1><p class="lede">${esc(page.meta.description)}</p>${r.html}${learningNav(lang, page)}${related.length ? `<section class="related"><h2>${esc(t.related)}</h2><ul>${related.map((p) => `<li><a href="${url(lang, p.slug)}">${p.meta.titleHtml}</a></li>`).join('')}</ul></section>` : ''}</article>`;
    const title = page.slug === '' ? page.meta.title : `${page.meta.title} · ${t.siteName}`;
    write(path.join(OUT, lang, page.slug, 'index.html'), layout({ lang, page, title, description: page.meta.description, body, searchUrl }));
    sitemap.push(page);
  }
}

if (errors.length) {
  console.error(errors.join('\n\n'));
  process.exit(1);
}

for (const [out, src] of exampleFiles) {
  fs.mkdirSync(path.dirname(path.join(OUT, out)), { recursive: true });
  fs.copyFileSync(src, path.join(OUT, out));
}

// root: pick a language
const langLinks = LANGS.map((l) => `<li><a href="${url(l)}" hreflang="${l}" lang="${l}">${esc(i18n[l].name)}</a></li>`).join('');
write(path.join(OUT, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(i18n.en.siteName)}</title>${LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${ORIGIN}${url(l)}">`).join('')}<link rel="stylesheet" href="${assetUrl['site.css']}"><script>{const langs=${JSON.stringify(LANGS)};const pick=(navigator.languages||[]).map(l=>l.split('-')[0]).find(l=>langs.includes(l))||'en';location.replace(${JSON.stringify(BASE)}+pick+'/');}</script></head><body><main id="content"><ul>${langLinks}</ul></main></body></html>`);
write(path.join(OUT, '404.html'), layout({ lang: 'en', title: `${i18n.en.notFound} · ${i18n.en.siteName}`, description: i18n.en.notFoundBody, robots: 'noindex',
  searchUrl: `${BASE}assets/search-en.json`, body: `<article><h1>${esc(i18n.en.notFound)}</h1><p>${esc(i18n.en.notFoundBody)}</p><ul>${langLinks}</ul></article>` }));

write(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${sitemap.map((p) => {
  const lang = LANGS.find((l) => site[l].get(p.slug) === p);
  return `<url><loc>${ORIGIN}${url(lang, p.slug)}</loc>${LANGS.filter((l) => site[l].has(p.slug)).map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${ORIGIN}${url(l, p.slug)}"/>`).join('')}</url>`;
}).join('')}</urlset>`);
write(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}${BASE}sitemap.xml\n`);
write(path.join(OUT, 'llms.txt'), `# ${i18n.en.siteName}\n\n> ${site.en.get('')?.meta.description ?? ''}\n\nTypst examples are compiled with Typst ${TYPST_CLI}. Other languages: ${LANGS.filter((l) => l !== 'en').map((l) => `${ORIGIN}${url(l)}`).join(', ')}.\n${
  ['tutorial', ...HUBS].map((s) => { const hub = site.en.get(hubSlug(s)); return hub ? `\n## ${hub.meta.title}\n\n${[hub, ...sectionPages('en', s)].map((p) => `- [${p.meta.title}](${ORIGIN}${url('en', p.slug)}): ${p.meta.description}`).join('\n')}\n` : ''; }).join('')}`);
write(path.join(OUT, '.nojekyll'), '');

// live editor runtime: typst.ts bundle + wasm + the same fonts the CLI used
const ts = 'node_modules/@myriaddreamin/';
for (const [from, to] of [
  [`${ts}typst.ts/dist/esm/contrib/all-in-one-lite.bundle.js`, 'typst.js'],
  [`${ts}typst.ts/LICENSE`, 'LICENSE-typst.ts'],
  [`${ts}typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm`, 'compiler.wasm'],
  [`${ts}typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm`, 'renderer.wasm'],
  ...FONTS.map((f) => [path.join(FONT_DIR, f), `fonts/${f}`]),
]) {
  fs.mkdirSync(path.join(OUT, 'vendor', path.dirname(to)), { recursive: true });
  fs.copyFileSync(from, path.join(OUT, 'vendor', to));
}
write(path.join(OUT, 'vendor', 'manifest.json'), JSON.stringify({ version: TS_VERSION, fonts: FONTS.map((f) => `fonts/${f}`) }));

console.log(`Built ${sitemap.length} pages in ${LANGS.length} languages, ${exampleFiles.size} rendered pages of examples.`);
