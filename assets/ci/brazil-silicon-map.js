// Mapa do ecossistema de semicondutores por estado. Monta o SVG a partir dos
// paths ja projetados em brazil-silicon.json; ver assets/ci/README.md.
(function () {
  const raiz = document.getElementById('bsr');
  if (!raiz) return;

  const elMapa = document.getElementById('bsr-mapa');
  const elPainel = document.getElementById('bsr-painel');
  const elLegenda = document.getElementById('bsr-legenda');
  const SVG_NS = 'http://www.w3.org/2000/svg';

  // Escala de cinza: quanto mais claro, mais organizacoes. A divisa entre dois
  // estados e' um traco da cor do fundo (ver #bsr-mapa path no ci-post.css),
  // entao dois cinzas vizinhos nunca encostam um no outro.
  const DEGRAUS = [
    { min: 15, cor: '#eceae4', rotulo: '15 ou mais' },
    { min: 8, cor: '#a9ada8', rotulo: '8 a 14' },
    { min: 3, cor: '#6d7276', rotulo: '3 a 7' },
    { min: 1, cor: '#3d4145', rotulo: '1 ou 2' }
  ];
  const COR_VAZIO = '#1d2023';

  let dados = null;
  let fixado = null;

  function corDe(uf) {
    for (const d of DEGRAUS) if (totalDe(uf) >= d.min) return d.cor;
    return COR_VAZIO;
  }

  function totalDe(uf) {
    const e = dados.ecossistema[uf];
    return e ? e.total : 0;
  }

  function criar(tag, classe, texto) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }

  // Os dados vem de um repositorio de terceiro, entao so http(s) vira link.
  function linkSeguro(url, texto) {
    if (!/^https?:\/\//i.test(url || '')) return criar('span', 'bsr-fonte', texto);
    const a = criar('a', 'bsr-fonte', texto);
    a.href = url;
    a.rel = 'noopener noreferrer';
    a.target = '_blank';
    return a;
  }

  // Logo so aparece pra quem tinha favicon legivel; o resto fica no monograma
  // pra lista nao ficar com buraco de 28px.
  function marca(emp) {
    const arquivo = (dados.logos || {})[emp.id];
    if (!arquivo) return criar('div', 'bsr-mono', emp.nome.trim()[0].toUpperCase());
    const img = document.createElement('img');
    img.className = 'bsr-logo';
    img.src = dados.pastaLogos + arquivo;
    img.alt = '';
    img.loading = 'lazy';
    img.width = 28;
    img.height = 28;
    img.addEventListener('error', () => {
      img.replaceWith(criar('div', 'bsr-mono', emp.nome.trim()[0].toUpperCase()));
    });
    return img;
  }

  function cartaoEmpresa(emp) {
    const li = criar('li', 'bsr-empresa');
    li.appendChild(marca(emp));
    li.appendChild(criar('strong', null, emp.nome));
    const cat = dados.categorias[emp.cat] || emp.cat;
    li.appendChild(criar('span', 'bsr-cat', cat));
    li.appendChild(criar('p', 'bsr-atividade', emp.atividade));
    if (emp.url) li.appendChild(linkSeguro(emp.url, 'fonte'));
    return li;
  }

  function mostrarEstado(uf) {
    const eco = dados.ecossistema[uf];
    elPainel.replaceChildren();
    const cab = criar('div', 'bsr-cab');
    cab.appendChild(criar('h3', null, (dados.nomes[uf] || uf) + ' (' + uf + ')'));
    cab.appendChild(criar('span', 'bsr-contagem',
      eco.orgs + (eco.orgs === 1 ? ' organização' : ' organizações')));
    elPainel.appendChild(cab);

    for (const polo of eco.polos) {
      elPainel.appendChild(criar('h4', 'bsr-polo', polo.polo));
      const ul = criar('ul', 'bsr-lista');
      polo.empresas.forEach(e => ul.appendChild(cartaoEmpresa(e)));
      elPainel.appendChild(ul);
    }
  }

  function mostrarResumo() {
    const r = dados.resumo;
    elPainel.replaceChildren();
    const cab = criar('div', 'bsr-cab');
    cab.appendChild(criar('h3', null, 'Brasil'));
    cab.appendChild(criar('span', 'bsr-contagem', r.organizacoes + ' organizações'));
    elPainel.appendChild(cab);
    elPainel.appendChild(criar('p', 'bsr-dica',
      'Passe o mouse num estado aceso para ver quem está lá, ou toque para fixar.'));

    const ufs = Object.keys(dados.ecossistema)
      .sort((a, b) => totalDe(b) - totalDe(a));
    const ul = criar('ul', 'bsr-ranking');
    for (const uf of ufs) {
      const li = criar('li');
      li.appendChild(criar('span', 'bsr-uf', uf));
      const barra = criar('span', 'bsr-barra');
      barra.style.width = (totalDe(uf) / totalDe(ufs[0]) * 100) + '%';
      barra.style.background = 'var(--np-sodium)';
      li.appendChild(barra);
      li.appendChild(criar('span', 'bsr-n', String(totalDe(uf))));
      ul.appendChild(li);
    }
    elPainel.appendChild(ul);
  }

  function pintar() {
    elMapa.querySelectorAll('path[data-uf]').forEach(p => {
      const uf = p.dataset.uf;
      p.setAttribute('fill', corDe(uf));
      p.classList.toggle('bsr-fixado', uf === fixado);
    });
  }

  function focar(uf) {
    if (!dados.ecossistema[uf]) return;
    mostrarEstado(uf);
  }

  function alternarFixo(uf) {
    if (!dados.ecossistema[uf]) return;
    fixado = fixado === uf ? null : uf;
    pintar();
    if (fixado) mostrarEstado(fixado); else mostrarResumo();
  }

  function ligarEventos(path, uf) {
    path.addEventListener('mouseenter', () => focar(uf));
    path.addEventListener('focus', () => focar(uf));
    path.addEventListener('click', () => alternarFixo(uf));
    path.addEventListener('keydown', ev => {
      if (ev.key !== 'Enter' && ev.key !== ' ') return;
      ev.preventDefault();
      alternarFixo(uf);
    });
  }

  function desenharMapa() {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', dados.viewBox);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label',
      'Mapa do Brasil por estado com a contagem de organizações de semicondutores.');

    for (const est of dados.estados) {
      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', est.d);
      path.dataset.uf = est.c;
      const total = totalDe(est.c);
      if (total) {
        path.setAttribute('tabindex', '0');
        path.classList.add('bsr-ativo');
      }
      const t = document.createElementNS(SVG_NS, 'title');
      t.textContent = est.n + (total ? ' — ' + total + ' organizações' : ' — sem registro');
      path.appendChild(t);
      if (total) ligarEventos(path, est.c);
      svg.appendChild(path);
    }

    svg.addEventListener('mouseleave', () => {
      if (fixado) mostrarEstado(fixado); else mostrarResumo();
    });
    elMapa.replaceChildren(svg);
    pintar();
  }

  function chave(cor, rotulo) {
    const item = criar('span', 'bsr-chave');
    const amostra = criar('span', 'bsr-amostra');
    amostra.style.background = cor;
    item.appendChild(amostra);
    item.appendChild(criar('span', null, rotulo));
    return item;
  }

  function montarLegenda() {
    elLegenda.replaceChildren();
    elLegenda.appendChild(chave(COR_VAZIO, 'sem registro'));
    DEGRAUS.slice().reverse().forEach(d => {
      elLegenda.appendChild(chave(d.cor, d.rotulo));
    });
  }

  function falhar(erro) {
    elPainel.replaceChildren(criar('p', 'bsr-erro',
      'Não deu pra carregar o mapa: ' + erro.message));
  }

  fetch(raiz.dataset.src)
    .then(resp => {
      if (!resp.ok) {
        throw new Error('fetch ' + raiz.dataset.src + ' respondeu ' + resp.status +
          ', esperado 200');
      }
      return resp.json();
    })
    .then(doc => {
      dados = doc;
      dados.pastaLogos = raiz.dataset.logos || '';
      dados.nomes = {};
      dados.estados.forEach(e => { dados.nomes[e.c] = e.n; });
      desenharMapa();
      montarLegenda();
      mostrarResumo();
    })
    .catch(falhar);
})();
