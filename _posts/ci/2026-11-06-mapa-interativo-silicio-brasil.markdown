---
layout: post
title:  "Quem faz silício no Brasil: o roadmap virou mapa pra passar o mouse"
date:   2026-11-06 10:00:00 -0300
categories: ci
lang: pt
---

> Resumo: quarto post da aba CI, de novo saído do grupo CI Inovador que eu
> participo. Apareceu lá o [brazil_silicon_roadmap][repo], um levantamento de 48
> organizações de semicondutores no Brasil. O dado é bom e a figura é ilegível:
> um JPEG de 1,5 MB com texto pequeno demais pra ler no celular. Peguei o
> dataset e montei um mapa por estado, onde passar o mouse (ou tocar) mostra
> quem está lá.

<link rel="stylesheet" href="{{ '/assets/ci/ci-post.css' | relative_url }}">

## O problema da figura

O repositório do [MattGrossi12][repo] consolidou duas planilhas, uma em
português e outra em inglês, num dataset com 48 organizações, 66 registros de
localização e 13 polos. Tem empresa privada nacional e internacional, centro de
pesquisa público e privado, e estatal.

O resumo visual disso é um `roadmap.jpeg` de 1,5 MB, com tudo espremido numa
figura só e o nome das empresas em corpo minúsculo. Pra responder "quem faz ASIC
em Minas?" você abre a imagem, dá zoom e varre com o olho. Dar mais resolução
pra essa figura não ajudaria; o que falta é poder perguntar uma coisa de cada
vez.

## O que eu fiz

Peguei o `companies.json` gerado pelo conversor do repositório, mais as
fronteiras dos estados que eles já usam, e fundi os dois num asset só. O mapa é
HTML e JavaScript puro, sem framework, sem biblioteca de gráfico e sem CDN. Os
paths SVG já vêm projetados, então não entra D3 nem código de projeção
cartográfica.

O estado fica mais claro quanto mais organizações ele tem, e a divisa é
desenhada com a cor do fundo da página, pra que dois cinzas vizinhos nunca
encostem um no outro. O painel do lado lista os polos daquele estado com o logo,
a atividade e o site oficial de cada empresa. No celular o painel desce pra
baixo do mapa, e tocar num estado fixa ele, senão não dava pra clicar nos links.

Depois de montar o mapa eu fui conferir uma a uma se essas organizações ainda
existem, abrindo o site oficial de cada uma. Sete links apontavam pro lugar
errado e eu troquei: a LSI-TEC estava num domínio que não resolve mais, a página
da SIATT dava 404, a Macnica DHW tinha sido absorvida pela matriz. Aproveitei e
acrescentei cinco organizações que faltavam, achadas na lista de associadas da
ABISEMI e em anúncios de 2025 e 2026. O mapa está com 53 organizações e 71
registros, contra as 48 e 66 do dataset original.

<div id="bsr"
  data-src="{{ '/assets/ci/brazil-silicon.json' | relative_url }}"
  data-logos="{{ '/assets/ci/logos/' | relative_url }}">
  <div class="bsr-grid">
    <div id="bsr-mapa"></div>
    <div id="bsr-painel">
      <p class="bsr-dica">Carregando o mapa…</p>
    </div>
  </div>
  <div id="bsr-legenda"></div>
</div>

<script src="{{ '/assets/ci/brazil-silicon-map.js' | relative_url }}" defer></script>

## O que o mapa mostra

Nove estados aparecem. São Paulo sozinho leva 29 dos 71 registros, espalhados
entre Campinas, o interior, São José dos Campos e a capital. Campinas isolada já
tem 15, mais que qualquer outro estado inteiro. Depois vêm o Rio Grande do Sul
com 13, Minas Gerais com 10 e o Amazonas com 8, esse último quase todo na Zona
Franca de Manaus.

Do outro lado da lista estão a Paraíba, com uma única organização, e Bahia,
Paraná e Distrito Federal com duas cada. Dezoito estados não têm nenhum
registro. Ausência no dataset não é prova de ausência no mundo: é um
levantamento aberto, feito de planilha, e que aceita correção.

## Créditos e licença

Os dados são do [brazil_silicon_roadmap][repo], de Matt Grossi. As fronteiras
dos estados vêm do [click_that_hood][cth], sob licença MIT, que é de onde o
projeto original também tirou. Os logos são o favicon do site de cada empresa,
baixado uma vez e guardado junto com o resto do site, pra o post não sair
pedindo imagem a terceiro na hora que alguém abre a página. Quem não tinha
favicon legível, 9 das 53, aparece com a inicial no lugar. Eu reorganizei o
dataset por unidade federativa e escrevi o visualizador.

[repo]: https://github.com/MattGrossi12/brazil_silicon_roadmap
[cth]: https://github.com/codeforgermany/click_that_hood
