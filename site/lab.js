// Live Typst editor: typst.ts compiles in the page, keeps the last good preview while there are errors.
const base = new URL(document.documentElement.dataset.base + 'vendor/', location.href);
const t = JSON.parse(document.documentElement.dataset.labStrings);

let engine;
function loadEngine() {
  return (engine ??= (async () => {
    const [{ createTypstCompiler, createTypstRenderer, loadFonts }, manifest] = await Promise.all([
      import(new URL('typst.js', base).href),
      fetch(new URL('manifest.json', base)).then((r) => r.json()),
    ]);
    const compiler = createTypstCompiler();
    const renderer = createTypstRenderer();
    await Promise.all([
      compiler.init({
        getModule: () => new URL('compiler.wasm', base),
        beforeBuild: [loadFonts(manifest.fonts.map((f) => new URL(f, base).href))],
      }),
      renderer.init({ getModule: () => new URL('renderer.wasm', base) }),
    ]);
    return { compiler, renderer };
  })());
}

let queue = Promise.resolve();
let counter = 0;

export function mount(el) {
  const code = el.dataset.code;
  const preamble = el.dataset.preamble ?? '';
  const offset = preamble ? preamble.split('\n').length - 1 : 0;
  const file = `/doc-${++counter}.typ`;
  const isLab = el.hasAttribute('data-lab');
  const sourceHost = el.querySelector(isLab ? '.lab-editor' : '.example-source');
  const pages = el.querySelector(isLab ? '.lab-pages' : '.example-output');
  let status = el.querySelector('.lab-status');
  let diagnostics = el.querySelector('.lab-diagnostics');
  if (!isLab) {
    status = document.createElement('span');
    status.className = 'lab-status';
    status.setAttribute('aria-live', 'polite');
    diagnostics = document.createElement('div');
    diagnostics.className = 'lab-diagnostics';
    diagnostics.setAttribute('aria-live', 'polite');
    el.append(status, diagnostics);
    el.classList.add('is-live');
  }

  const textarea = document.createElement('textarea');
  textarea.className = 'editor';
  textarea.value = code;
  textarea.spellcheck = false;
  textarea.setAttribute('autocapitalize', 'off');
  textarea.setAttribute('aria-label', t.source);
  textarea.rows = Math.max(4, code.split('\n').length + 1);
  sourceHost.replaceChildren(textarea);
  textarea.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || e.shiftKey) return;
    e.preventDefault();
    textarea.setRangeText('  ', textarea.selectionStart, textarea.selectionEnd, 'end');
    textarea.dispatchEvent(new Event('input'));
  });

  status.textContent = t.loading;
  let timer;
  let latest = 0;
  const compile = () => {
    const id = ++latest;
    status.textContent = t.compiling;
    el.dataset.state = 'compiling';
    queue = queue.then(async () => {
      if (id !== latest) return;
      const { compiler, renderer } = await loadEngine();
      compiler.addSource(file, preamble + textarea.value);
      const out = await compiler.compile({ mainFilePath: file, format: 'vector', diagnostics: 'full' });
      if (id !== latest) return;
      const items = (out.diagnostics ?? []).filter((d) => d.path === file || d.package);
      diagnostics.replaceChildren(...items.map((d) => {
        const p = document.createElement('p');
        p.className = `diagnostic is-${d.severity}`;
        const line = Number(d.range?.split(':')[0]) + 1 - offset;
        const strong = document.createElement('strong');
        strong.textContent = d.package || !(line > 0) ? d.severity : t.line.replace('{n}', line);
        p.append(strong, `: ${d.message}`);
        return p;
      }));
      if (out.result) {
        const svg = await renderer.renderSvg({ artifactContent: out.result });
        pages.innerHTML = svg;
      }
      status.textContent = '';
      el.dataset.state = out.result ? 'ok' : 'error';
    }).catch((err) => {
      status.textContent = '';
      el.dataset.state = 'error';
      const p = document.createElement('p');
      p.className = 'diagnostic is-error';
      p.textContent = String(err?.message ?? err);
      diagnostics.replaceChildren(p);
    });
  };
  textarea.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(compile, 300);
  });
  compile();
  if (!isLab) textarea.focus();
}
