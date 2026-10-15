---
layout: post
title:  "Transistor 3D: planar, FinFET e GAA (por que o 3D rende mais)"
date:   2026-10-15 10:00:00 -0300
categories: ci
lang: pt
---

> Resumo: terceiro post da aba **CI**. Depois de girar o layout da NAND3 e do
> inversor, fui atrás da pergunta que vem antes de tudo isso: por que o transistor
> virou 3D. A resposta não é "porque é mais moderno", é largura de canal e
> controle de porta. Montei os três modelos lado a lado pra enxergar a diferença
> de quantas faces do canal a porta consegue comandar.

<link rel="stylesheet" href="{{ '/assets/ci/ci-post.css' | relative_url }}">

## A pergunta

> Por que o desempenho dos transistores tridimensionais é maior do que os planares?

Transistor plano e transistor 3D conduzem do mesmo jeito: uma porta puxa cargas
pra superfície do canal e forma uma corrente entre fonte e dreno. O que muda é
**quanta superfície de canal a porta controla com o mesmo pedaço de silício**.
Duas coisas saem desse ganho:

- **largura efetiva de canal** (`W_eff`): cada face controlada conta como canal.
  Com a mesma área de layout, o 3D liga mais corrente.
- **controle eletrostático**: a porta fica envolvendo o canal, então o campo dela
  vence o campo do dreno. Isso corta os efeitos de canal curto, reduz a fuga no
  estado desligado e deixa a curva de sublimiar mais perto do ideal (`60 mV/dec`).
  Com menos fuga dá pra baixar o `Vth` e o `Vdd`, ganhando velocidade.

## As três gerações

<svg class="n3-schematic" viewBox="0 0 660 250" role="img" aria-labelledby="t3-faces-title">
  <title id="t3-faces-title">Corte transversal: no planar a porta controla 1 face, no FinFET 3 faces e no GAA as 4 faces do nanosheet.</title>

  <g fill="#888780">
    <rect x="30" y="120" width="140" height="45"/>
    <rect x="250" y="120" width="140" height="45"/>
    <rect x="470" y="120" width="140" height="45"/>
  </g>

  <rect x="55" y="112" width="90" height="8" fill="#D4537E"/>
  <rect x="55" y="88" width="90" height="18" fill="#E24B4A" opacity="0.55"/>

  <rect x="310" y="60" width="20" height="60" fill="#888780"/>
  <g fill="#D4537E">
    <rect x="310" y="60" width="20" height="6"/>
    <rect x="310" y="60" width="5" height="60"/>
    <rect x="325" y="60" width="5" height="60"/>
  </g>
  <g fill="#E24B4A" opacity="0.55">
    <rect x="288" y="52" width="16" height="68"/>
    <rect x="336" y="52" width="16" height="68"/>
    <rect x="288" y="40" width="64" height="12"/>
  </g>

  <rect x="500" y="66" width="80" height="54" fill="#E24B4A" opacity="0.55"/>
  <rect x="514" y="80" width="52" height="24" fill="#888780"/>
  <rect x="514" y="80" width="52" height="24" fill="none" stroke="#D4537E" stroke-width="5"/>

  <g fill="currentColor" text-anchor="middle" font-family="inherit">
    <text x="100" y="190" font-size="14">planar</text>
    <text x="100" y="208" font-size="11">1 face</text>
    <text x="100" y="226" font-size="11">W_eff = W</text>

    <text x="320" y="190" font-size="14">FinFET (tri-gate)</text>
    <text x="320" y="208" font-size="11">3 faces</text>
    <text x="320" y="226" font-size="11">W_eff = 2·H_fin + W_fin</text>

    <text x="540" y="190" font-size="14">GAA (nanosheet)</text>
    <text x="540" y="208" font-size="11">4 faces</text>
    <text x="540" y="226" font-size="11">W_eff = 2·(W_sheet + T_sheet)</text>
  </g>
</svg>

Da esquerda pra direita: no planar a porta é uma barra deitada em cima do canal e
só a face de cima conduz. No FinFET o canal virou um **fin** em pé e a porta
desce pelos dois lados, então três faces conduzem. No **GAA** o canal é um
**nanosheet** deitado e a porta fecha em volta; as quatro faces conduzem, e ainda
dá pra **empilhar** vários sheets na vertical para multiplicar a corrente sem
crescer o layout.

## O modelo pra girar

O `Vgs` liga o canal, o `Vds` empurra as cargas, e os botões trocam a vista. Em
`Corte do canal` o GAA é cortado ao meio pra mostrar a porta abraçando cada
sheet.

<div id="t3-vis">
  <div class="n3-row">
    <span>Vgs</span>
    <input type="range" id="t3-vgs" min="0" max="1" step="0.01" value="0">
    <span>Vds</span>
    <input type="range" id="t3-vds" min="0" max="1" step="0.01" value="0">
    <span id="t3-out"></span>
  </div>

  <p id="t3-path"></p>

  <div class="n3-row">
    <button data-preset="0,0" type="button">OFF</button>
    <button data-preset="0.85,0.35" type="button">Canal ON</button>
    <button data-preset="1,1" type="button">Saturação</button>
    <label><input type="checkbox" data-l="gate" checked> Porta</label>
    <label><input type="checkbox" data-l="lbl" checked> Labels</label>
  </div>

  <div class="n3-row">
    <button data-view="all" type="button">Tudo</button>
    <button data-view="planar" type="button">Planar</button>
    <button data-view="finfet" type="button">FinFET</button>
    <button data-view="gaa" type="button">GAA</button>
    <button data-view="cross" type="button">Corte do canal</button>
    <button data-view="top" type="button">Topo</button>
  </div>

  <div id="t3-wrap">
    <div id="t3-lbl"></div>
  </div>

  <div class="n3-row n3-legend">
    <span><span class="n3-swatch" style="background:#888780"></span>Silício (substrato, fin, sheet)</span>
    <span><span class="n3-swatch" style="background:#E24B4A"></span>Porta</span>
    <span><span class="n3-swatch" style="background:#D4537E"></span>Canal ligado</span>
    <span><span class="n3-swatch n3-swatch--dot" style="background:#185FA5"></span>Elétron (corrente)</span>
  </div>
</div>

<script src="{{ '/assets/ci/three.min.js' | relative_url }}" defer></script>
<script src="{{ '/assets/ci/OrbitControls.js' | relative_url }}" defer></script>
<script src="{{ '/assets/ci/transistor-3d.js' | relative_url }}" defer></script>

## O que o GAA muda

O FinFET foi o 3D de primeira geração: ele já envolve o canal por três lados,
mas a quarta face continua presa ao substrato. O GAA fecha esse lado que faltava e
libera o canal, deixando a porta mandar nas quatro faces. Na prática isso quer
dizer:

- **mais largura por sheet**: os dois lados mais o topo e a base contam.
- **empilhamento**: em vez de um fin largo, o GAA usa vários sheets finos
  empilhados, então a corrente escala empilhando altura em vez de largura.
- **controle melhor ainda**: a porta vence o dreno em canais cada vez mais
  curtos, que é o que segura a fuga conforme o nó encolhe.

É por isso que o roadmap saiu de planar, passou por FinFET e chegou no nanosheet
GAA. A corrente não vem de um truque de material, vem de dar à porta mais
superfície do canal para comandar.
