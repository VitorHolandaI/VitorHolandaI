# assets/ci

Tudo que os posts da aba **CI** (`/ci/`, montada por `ci.markdown`) carregam
além do texto: a folha de estilo compartilhada, os visualizadores 3D e o mapa
do ecossistema. Nada aqui é gerado no build do Jekyll — são arquivos estáticos
que o `_config.yml` copia direto para o site.

Dois motivos para os scripts morarem em arquivo e não inline no post: o
cabeçalho `Content-Security-Policy` do `nginx-security-headers.conf` usa
`script-src 'self'`, que barra script inline e CDN; e o markdown do post fica
legível sem 2 mil linhas de JavaScript no meio.

## Arquivos

- `ci-post.css` — folha única de todos os posts de CI. Cada post a referencia
  com `<link rel="stylesheet">` logo depois do front matter. Traduz as
  variáveis do tema (`--np-*`, definidas em `assets/css/neuropunk.css`) para os
  nomes que os widgets usam, e estiliza a tabela verdade (`.truth-table`), o
  esquemático SVG (`.n3-schematic`) e o mapa (`#bsr`).

- `three.min.js` (r128) e `OrbitControls.js` (0.128.0) — three.js vendorizado,
  pela regra de CSP acima. Carregados nessa ordem, antes do visualizador, pelos
  três posts de layout 3D.

- `nand3-layout-3d.js` — visualizador do layout da NAND3. Lê os controles de
  `#n3-vis` no post de 2026-10-07 e desenha em `#n3-wrap`.

- `inverter-layout-3d.js` — mesmo papel para o inversor CMOS, em `#inv-vis`
  (post de 2026-10-12). `inverter-layout-ref.png` é a referência de layout
  exibida nesse post.

- `transistor-3d.js` — os três transistores (planar, FinFET, GAA) lado a lado,
  em `#t3-vis` (post de 2026-10-15).

- `brazil-silicon-map.js` + `brazil-silicon.json` — o mapa do ecossistema de
  semicondutores por estado (post de 2026-11-06). O script lê os caminhos do
  JSON e da pasta de logos nos atributos `data-src` e `data-logos` de `#bsr`,
  busca o JSON com `fetch` (permitido pelo `connect-src 'self'`) e monta o SVG,
  o painel lateral e a legenda. Fluxo: `fetch` → `desenharMapa` →
  `montarLegenda` → `mostrarResumo`; o hover e o foco chamam `mostrarEstado`, e
  o clique fixa o estado em `alternarFixo`. O preenchimento é uma escala de
  cinza por quantidade de organizações (`DEGRAUS`), e a divisa dos estados é
  traçada com a cor do fundo da página, no `ci-post.css`, pra que dois cinzas
  vizinhos não encostem.

- `logos/` — 39 PNGs de 64x64, um por organização que tinha favicon legível no
  próprio site. Ficam aqui em vez de serem buscados na hora porque o post não
  deve disparar requisição a terceiro quando alguém abre a página. O mapa de
  `id` para arquivo vive na chave `logos` do `brazil-silicon.json`; as 9
  organizações que ficaram de fora caem no monograma montado em `marca()`.

Os quatro visualizadores seguem o mesmo contrato: um IIFE que sai calado se o
elemento raiz não existe na página, nenhuma variável global, ids namespaceados
por post (`n3-`, `inv-`, `t3-`, `bsr-`) para que dois widgets possam conviver.

## Origem de `brazil-silicon.json`

Arquivo derivado, editado só por regeneração. Vem de dois lugares:

- os dados de empresas de
  <https://github.com/MattGrossi12/brazil_silicon_roadmap>
  (`docs/data/companies.json`), que agrupa as organizações em 13 polos, cada um
  já com a sigla do estado;
- as fronteiras dos estados do mesmo repositório
  (`docs/data/brazil-map.json`), adaptadas de
  <https://github.com/codeforgermany/click_that_hood>, licença MIT — já são
  paths SVG projetados, por isso o mapa não precisa de D3 nem de projeção.

A fusão reagrupa os polos por unidade federativa, traduz as categorias para
português e guarda a procedência na chave `fonte` do próprio JSON. O link de
cada organização tem que ser o site oficial dela, e é o que o card mostra; a
chave `fonte.linksConferidos` diz quando eles foram checados pela última vez. Para
atualizar, baixe os dois arquivos de origem de novo e refaça o agrupamento; a
chave `fonte.gerado` diz de que data é o dataset que está no ar.
