---
layout: post
title:  "NAND3 em CMOS: tabela verdade, esquemático e o layout em 3D pra girar"
date:   2026-10-07 20:00:00 -0300
categories: ci
lang: pt
---

> Resumo: primeiro post da aba **CI**. Isso aqui saiu do grupo de circuitos
> integrados que eu participo — tava estudando layout CMOS e fiz uma animação 3D
> da NAND3 pra conseguir *ver* onde a corrente passa quando eu mexo nas entradas.
> Tem a tabela verdade, o esquemático e o modelo pra girar no fim do post.

<link rel="stylesheet" href="{{ '/assets/ci/ci-post.css' | relative_url }}">

## A tabela verdade

NAND3 é o AND de três entradas com a saída invertida: `Y = NOT(A · B · C)`. Ou
seja, a saída só cai pra 0 quando as três entradas estão em 1.

| A | B | C | série nMOS | paralelo pMOS | Y |
|:-:|:-:|:-:|:--|:--|:-:|
| 0 | 0 | 0 | cortada | P1 P2 P3 | 1 |
| 0 | 0 | 1 | cortada | P1 P2 | 1 |
| 0 | 1 | 0 | cortada | P1 P3 | 1 |
| 0 | 1 | 1 | cortada | P1 | 1 |
| 1 | 0 | 0 | cortada | P2 P3 | 1 |
| 1 | 0 | 1 | cortada | P2 | 1 |
| 1 | 1 | 0 | cortada | P3 | 1 |
| 1 | 1 | 1 | conduz | nenhum | **0** |
{:.truth-table}

As duas colunas do meio são o circuito, não a álgebra: `série nMOS` é o caminho
de `Y` até o `GND`, e `paralelo pMOS` lista quais transistores de cima estão
conduzindo em cada linha. Basta um pMOS ligado pra `Y` ficar em 1 — por isso
sete linhas em 1 e uma só em 0, de graça, sem ninguém ter projetado pra isso.

## O esquemático

<svg class="n3-schematic" viewBox="0 0 680 440" role="img" aria-labelledby="n3-schematic-title">
  <title id="n3-schematic-title">Esquemático da NAND3 CMOS: três pMOS em paralelo entre VDD e a saída Y, e três nMOS em série entre Y e GND.</title>
  <defs>
    <g id="n3-nmos" fill="none" stroke="currentColor" stroke-linecap="round">
      <path d="M0 -18 V18" stroke-width="2.5"/>
      <path d="M-9 -14 V14" stroke-width="2"/>
      <path d="M0 -18 H18" stroke-width="1.5"/>
      <path d="M0 18 H18" stroke-width="1.5"/>
      <path d="M-9 0 H-32" stroke-width="1.5"/>
    </g>
    <g id="n3-pmos" fill="none" stroke="currentColor" stroke-linecap="round">
      <path d="M0 -18 V18" stroke-width="2.5"/>
      <path d="M-9 -14 V14" stroke-width="2"/>
      <path d="M0 -18 H18" stroke-width="1.5"/>
      <path d="M0 18 H18" stroke-width="1.5"/>
      <circle cx="-15" cy="0" r="5.5" stroke-width="1.5"/>
      <path d="M-20.5 0 H-32" stroke-width="1.5"/>
    </g>
  </defs>

  <g fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M160 40 H470"/>
    <path d="M198 40 V150"/>
    <path d="M318 40 V150"/>
    <path d="M438 40 V150"/>
    <path d="M198 150 H500"/>
    <path d="M318 150 V400"/>
    <path d="M300 400 H336 L318 422 Z"/>
  </g>

  <g fill="currentColor">
    <circle cx="318" cy="40" r="4"/>
    <circle cx="438" cy="40" r="4"/>
    <circle cx="318" cy="150" r="4"/>
    <circle cx="438" cy="150" r="4"/>
  </g>

  <use href="#n3-pmos" x="180" y="100"/>
  <use href="#n3-pmos" x="300" y="100"/>
  <use href="#n3-pmos" x="420" y="100"/>
  <use href="#n3-nmos" x="300" y="215"/>
  <use href="#n3-nmos" x="300" y="290"/>
  <use href="#n3-nmos" x="300" y="365"/>

  <g font-size="16" text-anchor="end">
    <text x="140" y="106">A</text>
    <text x="260" y="106">B</text>
    <text x="380" y="106">C</text>
    <text x="256" y="221">C</text>
    <text x="256" y="296">B</text>
    <text x="256" y="371">A</text>
  </g>

  <g font-size="16">
    <text x="478" y="46">VDD</text>
    <text x="508" y="156">Y</text>
  </g>

  <g font-size="13" opacity="0.7">
    <text x="206" y="134">P1</text>
    <text x="326" y="134">P2</text>
    <text x="446" y="134">P3</text>
    <text x="344" y="220">N3</text>
    <text x="344" y="295">N2</text>
    <text x="344" y="370">N1</text>
    <text x="530" y="106">pMOS em paralelo</text>
    <text x="530" y="296">nMOS em série</text>
  </g>
</svg>

A estrutura é a de sempre em CMOS estático: a rede que puxa pra cima (pull-up,
de pMOS) é o dual da que puxa pra baixo (pull-down, de nMOS).

- **nMOS em série** entre `Y` e `GND`. Um transistor em série só conduz se
  todos conduzirem. nMOS liga com 1 na porta, então o caminho pro GND só fecha
  com `A = B = C = 1`. É a única linha com `Y = 0`.
- **pMOS em paralelo** entre `VDD` e `Y`. Em paralelo basta um conduzir. pMOS
  liga com 0 na porta, então qualquer entrada em 0 já joga `Y` pra 1 — e são
  sete combinações com pelo menos um zero.

As duas redes nunca ficam ligadas ao mesmo tempo: ou tem caminho pro VDD, ou tem
caminho pro GND, nunca os dois. É por isso que CMOS estático só gasta corrente
na transição, e não parado.

Repare na ordem dos nomes: no esquemático a série de baixo pra cima é
`N1 (A) → N2 (B) → N3 (C)`, e é essa ordem que aparece no layout — a entrada
que chega mais perto do GND é a mesma do transistor de baixo.

## O layout

No layout real (`CMOS VLSI Design`, 4ª ed., Weste & Harris, capítulo de
circuitos e layout) a NAND3 vira uma célula de **32λ por 40λ** com:

- tiras horizontais de difusão N e difusão P;
- portas de polisilício verticais, uma por entrada, atravessando as duas tiras;
- trilha de Metal 1 do `VDD` em cima e trilha de Metal 1 do `GND` embaixo;
- `4λ` de folga entre a difusão e a borda da célula.

Cada porta de poli cruzando as duas difusões é o que faz a mesma entrada
controlar um pMOS em cima e um nMOS embaixo de uma vez só. É a parte que eu não
conseguia visualizar no papel: no desenho 2D as camadas estão todas empilhadas
no mesmo plano.

## O modelo pra girar

Daí eu fiz isto. Clica em `A`, `B` e `C` pra mudar as entradas; as partículas
mostram por onde a corrente anda em cada combinação. O slider separa as camadas
na vertical, e os checkboxes ligam e desligam cada uma — inclusive `Todos os
rótulos`, que apaga os textos flutuantes quando você quer olhar só a geometria.

<div id="n3-vis">
  <div class="n3-row">
    <span>Entradas:</span>
    <button id="n3-bA" type="button">A = 1</button>
    <button id="n3-bB" type="button">B = 0</button>
    <button id="n3-bC" type="button">C = 1</button>
    <span id="n3-out"></span>
  </div>

  <p id="n3-path"></p>

  <div class="n3-row">
    <label><input type="checkbox" data-l="sub" checked> Substrato</label>
    <label><input type="checkbox" data-l="well" checked> Poço N</label>
    <label><input type="checkbox" data-l="diff" checked> Difusões</label>
    <label><input type="checkbox" data-l="ch" checked> Canais</label>
    <label><input type="checkbox" data-l="gox" checked> Óxido de porta</label>
    <label><input type="checkbox" data-l="poly" checked> Poli</label>
    <label><input type="checkbox" data-l="cont" checked> Contatos</label>
    <label><input type="checkbox" data-l="metal" checked> Metal 1</label>
    <label><input type="checkbox" data-l="sdg" checked> Rótulos S/D/G</label>
    <label><input type="checkbox" data-l="rot" checked> Todos os rótulos</label>
    <label><input type="checkbox" data-l="cur" checked> Corrente</label>
  </div>

  <div class="n3-row">
    <span>Separar camadas</span>
    <input type="range" id="n3-ex" min="0" max="3" step="0.1" value="0.6">
    <button id="n3-top" type="button">Vista de cima</button>
    <button id="n3-iso" type="button">Vista 3D</button>
  </div>

  <div id="n3-wrap">
    <div id="n3-lbl"></div>
  </div>

  <div class="n3-row n3-legend">
    <span><span class="n3-swatch n3-swatch--dot" style="background:#D85A30"></span>Corrente VDD → Y (carrega Y)</span>
    <span><span class="n3-swatch n3-swatch--dot" style="background:#185FA5"></span>Corrente Y → GND (descarrega Y)</span>
    <span><span class="n3-swatch" style="background:#D4537E"></span>Canal aberto</span>
    <span><span class="n3-swatch" style="background:#EF9F27"></span>P+</span>
    <span><span class="n3-swatch" style="background:#97C459"></span>N+</span>
    <span><span class="n3-swatch" style="background:#E24B4A"></span>Poli</span>
    <span><span class="n3-swatch" style="background:#378ADD"></span>Metal 1</span>
  </div>
</div>

<script src="{{ '/assets/ci/three.min.js' | relative_url }}" defer></script>
<script src="{{ '/assets/ci/OrbitControls.js' | relative_url }}" defer></script>
<script src="{{ '/assets/ci/nand3-layout-3d.js' | relative_url }}" defer></script>

O que ficou mais claro girando: o poço N só existe na metade de cima, os três
pMOS dividem a mesma tira de difusão P dentro dele, e os contatos de Metal 1 são
o que amarra as duas metades. Com `A = B = C = 1` dá pra ver o caminho único
descendo pela série de nMOS até o GND — qualquer entrada que você zerar quebra
essa série e acende o caminho do VDD.
