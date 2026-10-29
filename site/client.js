const root = document.documentElement;
const loadLab = () => import(root.dataset.labModule);

// Quizzes: reveal the check button, keep the <details> answer as the no-JS fallback.
for (const form of document.querySelectorAll('form[data-quiz]')) {
  const actions = form.querySelector('.quiz__actions');
  const button = actions.querySelector('button');
  const feedback = form.querySelector('.quiz__feedback');
  const explanation = form.querySelector('[data-quiz-explanation]');
  form.querySelector('.quiz__key').hidden = true;
  actions.hidden = false;
  button.disabled = true;
  form.addEventListener('change', () => {
    button.disabled = false;
    feedback.replaceChildren();
    delete form.dataset.result;
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const choice = form.querySelector('input:checked');
    if (!choice) return;
    const ok = choice.value === form.dataset.correct;
    form.dataset.result = ok ? 'correct' : 'wrong';
    const label = document.createElement('strong');
    label.textContent = ok ? form.dataset.correctLabel : form.dataset.wrongLabel;
    feedback.replaceChildren(label);
    if (ok) feedback.append(' ', ...[...explanation.childNodes].map((n) => n.cloneNode(true)));
  });
}

// Search: one JSON index per language, fetched on first focus.
const form = document.querySelector('form.search');
if (form) {
  const input = form.querySelector('input');
  const status = form.querySelector('[data-search-status]');
  const list = form.querySelector('[data-search-results]');
  const base = root.dataset.base + root.lang + '/';
  let records;
  const load = () => (records ??= fetch(form.dataset.searchIndex).then((r) => r.json()).then((d) => d.records));
  const score = (r, terms) => {
    let total = 0;
    for (const term of terms) {
      const hit = r[1].toLowerCase().includes(term) ? 4 : r[5].includes(term) ? 3 : r[4].toLowerCase().includes(term) ? 2
        : r[2].toLowerCase().includes(term) || r[3].toLowerCase().includes(term) ? 1 : 0;
      if (!hit) return 0;
      total += hit;
    }
    return total;
  };
  const run = async () => {
    const terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) {
      list.replaceChildren();
      status.textContent = '';
      return;
    }
    const hits = (await load()).map((r) => [score(r, terms), r]).filter(([s]) => s > 0).sort((a, b) => b[0] - a[0]).slice(0, 12);
    status.textContent = hits.length === 0 ? form.dataset.searchEmpty
      : hits.length === 1 ? form.dataset.searchCountedOne : form.dataset.searchCounted.replace('{count}', hits.length);
    list.replaceChildren(...hits.map(([, r]) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = base + (r[0] ? `${r[0]}/` : '');
      a.textContent = r[1];
      const small = document.createElement('small');
      small.textContent = r[3] || r[2];
      li.append(a, small);
      return li;
    }));
  };
  input.addEventListener('focus', load, { once: true });
  input.addEventListener('input', run);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    list.querySelector('a')?.click();
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = '';
      run();
    }
  });
}

// Live editing: labs mount on load, examples on request.
const labs = document.querySelectorAll('[data-lab]');
if (labs.length) loadLab().then(({ mount }) => labs.forEach((el) => mount(el)));
for (const figure of document.querySelectorAll('[data-example]')) {
  const button = figure.querySelector('[data-edit]');
  button.hidden = false;
  button.addEventListener('click', () => {
    button.disabled = true;
    loadLab().then(({ mount }) => {
      button.remove();
      mount(figure);
    }, () => {
      button.disabled = false;
    });
  });
}
