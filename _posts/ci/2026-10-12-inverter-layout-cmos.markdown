---
layout: post
title:  "Inversor CMOS: tabela verdade, esquemático e o layout em 3D pra girar"
date:   2026-10-12 11:00:00 -0300
categories: ci
lang: pt
---

> Resumo: segundo post da aba **CI**. Depois da NAND3 eu fui atrás do inversor, que é
> a célula mais boba do CMOS, e mesmo assim tinha coisa que eu não enxergava no papel:
> onde ficam os taps e por que o poli não pode encostar no well. Fiz a mesma parada de
> girar em 3D, agora com uma entrada só.

<link rel="stylesheet" href="{{ '/assets/ci/ci-post.css' | relative_url }}">

## O inversor

`Y = NOT A`. Com `A = 0` o pMOS de cima liga e puxa `Y` pro `VDD`, então a saída vai
pra 1. Com `A = 1` liga o nMOS de baixo e `Y` cai pro `GND`. Como os dois nunca ligam
juntos, parado ele não gasta corrente.

| A | série nMOS | pMOS | Y |
|:-:|:--|:--|:-:|
| 0 | cortado | conduz | 1 |
| 1 | conduz | cortado | 0 |
{:.truth-table}

Aqui é mais fácil de ver que na NAND3: um transistor de cada lado, a mesma entrada na
gate dos dois, e os dois drenos amarrados no mesmo nó (`Y`).

## O esquemático

<svg class="n3-schematic" viewBox="0 0 560 320" role="img" aria-labelledby="inv-schematic-title">
  <title id="inv-schematic-title">Esquemático do inversor CMOS: pMOS entre VDD e a saída Y, nMOS entre Y e GND, gate dos dois na entrada A.</title>
  <defs>
    <g id="inv-nmos" fill="none" stroke="currentColor" stroke-linecap="round">
      <path d="M0 -18 V18" stroke-width="2.5"/>
      <path d="M-9 -14 V14" stroke-width="2"/>
      <path d="M0 -18 H18" stroke-width="1.5"/>
      <path d="M0 18 H18" stroke-width="1.5"/>
      <path d="M-9 0 H-32" stroke-width="1.5"/>
    </g>
    <g id="inv-pmos" fill="none" stroke="currentColor" stroke-linecap="round">
      <path d="M0 -18 V18" stroke-width="2.5"/>
      <path d="M-9 -14 V14" stroke-width="2"/>
      <path d="M0 -18 H18" stroke-width="1.5"/>
      <path d="M0 18 H18" stroke-width="1.5"/>
      <circle cx="-15" cy="0" r="5.5" stroke-width="1.5"/>
      <path d="M-20.5 0 H-32" stroke-width="1.5"/>
    </g>
  </defs>

  <g fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M300 30 H450"/>
    <path d="M398 30 V72"/>
    <path d="M398 108 V212"/>
    <path d="M398 160 H470"/>
    <path d="M398 248 V290"/>
    <path d="M300 290 H450"/>
    <path d="M300 160 H348"/>
    <path d="M348 90 V230"/>
  </g>

  <g fill="currentColor">
    <circle cx="398" cy="30" r="4"/>
    <circle cx="398" cy="160" r="4"/>
    <circle cx="348" cy="160" r="4"/>
  </g>

  <use href="#inv-pmos" x="380" y="90"/>
  <use href="#inv-nmos" x="380" y="230"/>

  <g font-size="16" text-anchor="end">
    <text x="286" y="166">A</text>
  </g>
  <g font-size="16">
    <text x="458" y="36">VDD</text>
    <text x="458" y="296">GND</text>
    <text x="478" y="166">Y</text>
  </g>
</svg>

Um pMOS em cima entre `VDD` e `Y`, um nMOS embaixo entre `Y` e `GND`, as duas gates
ligadas em `A`. É a mesma estrutura da NAND3: a rede que puxa pra cima é o dual da que
puxa pra baixo.

## O layout

A célula segue o estilo da NAND3 (`CMOS VLSI Design`, Weste & Harris): uma tira de
difusão P em cima, dentro do N-well, e uma tira de difusão N embaixo, no P-substrate.
A diferença é que aqui só tem **uma porta de poly**, vertical, cruzando as duas tiras.
É ela que faz o `A` controlar o pMOS e o nMOS de uma vez só. Em cima fica a trilha de
Metal 1 do `VDD`, embaixo a do `GND`, e a saída `Y` sai pela direita, ligando os dois
drenos.

Duas coisas que eu não conseguia ver no desenho 2D:

- os **taps**. O de cima (N⁺) fica dentro do N-well, colado no VDD; o de baixo (P⁺)
  fica no P-substrate, colado no GND.
- o **poly não pode encostar no well**. No primeiro 3D que eu montei a barra de poly
  da entrada entrava um pedaço dentro do N-well, que é o tipo de coisa que o DRC
  reclama na hora.

## O modelo pra girar

Mesma pegada da NAND3. Clica em `A` pra trocar a entrada e as partículas mostram por
onde a corrente anda; o slider separa as camadas; os checkboxes ligam cada uma.

<div id="inv-vis">
  <div class="n3-row">
    <span>Entrada:</span>
    <button id="inv-bA" type="button">A = 0</button>
    <span id="inv-out"></span>
  </div>

  <p id="inv-path"></p>

  <div class="n3-row">
    <label><input type="checkbox" data-l="sub" checked> P-substrate</label>
    <label><input type="checkbox" data-l="well" checked> N-well</label>
    <label><input type="checkbox" data-l="diff" checked> Diffusions (S/D)</label>
    <label><input type="checkbox" data-l="ch" checked> Channels</label>
    <label><input type="checkbox" data-l="gox" checked> Gate oxide</label>
    <label><input type="checkbox" data-l="poly" checked> Poly</label>
    <label><input type="checkbox" data-l="cont" checked> Contacts</label>
    <label><input type="checkbox" data-l="metal" checked> Metal 1</label>
    <label><input type="checkbox" data-l="sdg" checked> Labels S/D/G</label>
    <label><input type="checkbox" data-l="rot" checked> All labels</label>
    <label><input type="checkbox" data-l="cur" checked> Current</label>
  </div>

  <div class="n3-row">
    <span>Separar camadas</span>
    <input type="range" id="inv-ex" min="0" max="3" step="0.1" value="0.6">
    <button id="inv-top" type="button">Vista de cima</button>
    <button id="inv-iso" type="button">Vista 3D</button>
  </div>

  <div id="inv-wrap">
    <div id="inv-lbl"></div>
  </div>

  <div class="n3-row n3-legend">
    <span><span class="n3-swatch n3-swatch--dot" style="background:#D85A30"></span>Corrente VDD → Y (carrega Y)</span>
    <span><span class="n3-swatch n3-swatch--dot" style="background:#185FA5"></span>Corrente Y → GND (descarrega Y)</span>
    <span><span class="n3-swatch" style="background:#D4537E"></span>Channel on</span>
    <span><span class="n3-swatch" style="background:#EF9F27"></span>P+</span>
    <span><span class="n3-swatch" style="background:#97C459"></span>N+</span>
    <span><span class="n3-swatch" style="background:#E24B4A"></span>Poly</span>
    <span><span class="n3-swatch" style="background:#378ADD"></span>Metal 1</span>
  </div>
</div>

<script src="{{ '/assets/ci/three.min.js' | relative_url }}" defer></script>
<script src="{{ '/assets/ci/OrbitControls.js' | relative_url }}" defer></script>
<script src="{{ '/assets/ci/inverter-layout-3d.js' | relative_url }}" defer></script>

## Os taps N⁺ e P⁺

<img src="{{ '/assets/ci/inverter-layout-ref.png' | relative_url }}" alt="Layout real do inversor no gpdk045" style="max-width:320px;border:1px solid var(--np-hairline);border-radius:6px">

Essa é a célula no layout de verdade, pra comparar com o 3D. Repare que o tap N⁺ (VDD)
fica acima do pMOS e o tap P⁺ (GND) abaixo do nMOS. As fileiras de 5 contatos são os
vias `M1_NWELL` e `M1_PSUB`.

Um **tap** é uma região de difusão fortemente dopada, do mesmo tipo do well/substrate,
feita só pra puxar o potencial do **body** até um rail:

- **N⁺ tap** contata o **N-well** (material N) e vai pro **VDD**.
- **P⁺ tap** contata o **P-substrate** (material P) e vai pro **GND**.

Por que precisa: o well e o substrate são fracamente dopados, então metal pousado
direto vira um contato retificador (Schottky), de resistência alta. A dopagem pesada
do tap dá um contato ôhmico. E ele tem que ser do mesmo tipo do que contata (N⁺ dentro
do N-well, P⁺ no P-substrate); se fosse do tipo oposto, virava um diodo. Amarrar o body
no rail evita o body flutuar e o latch-up.

Girando dá pra ver o resto: o N-well só existe na metade de cima, as fileiras de
contato amarram metal e difusão, e com `A = 1` o caminho único desce pelo nMOS até o
GND.
