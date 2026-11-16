---
layout: post
title:  "A nota vira letra: um decodificador de 7 segmentos feito só com portas"
date:   2026-11-16 10:00:00 -0300
categories: ci
lang: pt
---

> Resumo: quinto post da aba CI, e o mais velho. Em abril de 2023, numa
> disciplina de circuitos digitais, eu entreguei um circuito que lê a nota de
> alguém em 4 bits e acende `A`, `F` ou `R` num display de sete segmentos. Sem
> microcontrolador e sem decodificador pronto: portas AND, OR e inversores,
> soldadas numa placa ilhada. Achei a foto e o diagrama, conferi as equações
> três anos depois, e elas ainda fecham.

<link rel="stylesheet" href="{{ '/assets/ci/ci-post.css' | relative_url }}">

## O pedido

A nota entra como um número de 0 a 10 e o circuito tem que dizer a situação:
aprovado, final ou reprovado. Quatro bits dão conta de 0 a 15, então sobram
cinco combinações que nunca aparecem.

A saída é um display de sete segmentos, que é onde o problema fica
interessante. Sete segmentos não desenham qualquer letra. O `A` sai inteiro, o
`F` também, e o `R` não: a perna diagonal não existe nesse alfabeto. O que dá
pra fazer é a forma do `P`, que é o `R` sem a perna, e foi o que eu usei.

## Três letras, dois segmentos

Os segmentos de um display são nomeados de `a` a `g`. Escrevendo as três letras
lado a lado:

| letra | segmentos acesos |
|:-:|:--|
| `A` | a, b, c, e, f, g |
| `F` | a, e, f, g |
| `R` (forma de P) | a, b, e, f, g |
{:.truth-table}

Os segmentos `a`, `e`, `f` e `g` aparecem nas três. O `d` não aparece em
nenhuma. Ou seja: cinco dos sete segmentos são constantes e podem ir direto no
trilho de alimentação ou no terra. Só `b` e `c` dependem da nota, e o circuito
inteiro se resume a duas funções booleanas.

É por isso que não tem um 7447 na placa. Um decodificador pronto resolveria
dígitos de 0 a 9, que não é o que eu queria mostrar.

## As duas equações

Chamando os quatro bits de `W`, `X`, `Z` e `Y`, com pesos 8, 4, 2 e 1:

```
b = X̄ + W + Z·Y
c = X·W̄·Z·Y + W·X̄
```

<svg class="n3-schematic" viewBox="0 0 700 330" role="img" aria-labelledby="afp-diag-titulo">
  <title id="afp-diag-titulo">Diagrama das duas equações: b sai de um OR de três entradas, c sai de um OR de dois ANDs.</title>

  <defs>
    <g id="afp-and">
      <path d="M0,-22 H16 A22,22 0 0 1 16,22 H0 Z" fill="none" stroke="currentColor" stroke-width="2"/>
    </g>
    <g id="afp-or">
      <path d="M-2,-22 Q16,-22 38,0 Q16,22 -2,22 Q10,0 -2,-22 Z" fill="none" stroke="currentColor" stroke-width="2"/>
    </g>
    <g id="afp-not">
      <path d="M0,-13 L22,0 L0,13 Z" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="27" cy="0" r="5" fill="none" stroke="currentColor" stroke-width="2"/>
    </g>
  </defs>

  <g font-family="monospace" font-size="15" fill="currentColor">
    <text x="18" y="60">W</text>
    <text x="18" y="110">X</text>
    <text x="18" y="160">Z</text>
    <text x="18" y="210">Y</text>
  </g>

  <g stroke="currentColor" stroke-width="2" fill="none">
    <line x1="34" y1="55" x2="70" y2="55"/>
    <line x1="34" y1="105" x2="70" y2="105"/>
    <line x1="34" y1="155" x2="70" y2="155"/>
    <line x1="34" y1="205" x2="70" y2="205"/>
  </g>

  <g transform="translate(90,105)"><use href="#afp-not"/></g>
  <text x="128" y="100" font-family="monospace" font-size="13" fill="currentColor">X̄</text>

  <g transform="translate(200,180)"><use href="#afp-and"/></g>
  <g stroke="currentColor" stroke-width="2" fill="none">
    <line x1="70" y1="155" x2="200" y2="168"/>
    <line x1="70" y1="205" x2="200" y2="192"/>
    <line x1="238" y1="180" x2="300" y2="180"/>
  </g>
  <text x="246" y="172" font-family="monospace" font-size="13" fill="currentColor">Z·Y</text>

  <g transform="translate(320,105)"><use href="#afp-or"/></g>
  <g stroke="currentColor" stroke-width="2" fill="none">
    <line x1="122" y1="105" x2="320" y2="88"/>
    <line x1="70" y1="55" x2="320" y2="105"/>
    <line x1="300" y1="180" x2="320" y2="122"/>
    <line x1="358" y1="105" x2="430" y2="105"/>
  </g>
  <text x="440" y="111" font-family="monospace" font-size="16" fill="currentColor">b</text>

  <g transform="translate(200,270)"><use href="#afp-and"/></g>
  <g transform="translate(200,320)"><use href="#afp-and"/></g>
  <g stroke="currentColor" stroke-width="2" fill="none">
    <line x1="70" y1="105" x2="200" y2="258"/>
    <line x1="70" y1="155" x2="200" y2="270"/>
    <line x1="70" y1="205" x2="200" y2="282"/>
    <line x1="238" y1="270" x2="300" y2="270"/>
    <line x1="70" y1="55" x2="200" y2="312"/>
    <line x1="238" y1="320" x2="300" y2="320"/>
  </g>
  <text x="246" y="262" font-family="monospace" font-size="13" fill="currentColor">X·W̄·Z·Y</text>
  <text x="246" y="312" font-family="monospace" font-size="13" fill="currentColor">W·X̄</text>

  <g transform="translate(320,295)"><use href="#afp-or"/></g>
  <g stroke="currentColor" stroke-width="2" fill="none">
    <line x1="300" y1="270" x2="320" y2="278"/>
    <line x1="300" y1="320" x2="320" y2="312"/>
    <line x1="358" y1="295" x2="430" y2="295"/>
  </g>
  <text x="440" y="301" font-family="monospace" font-size="16" fill="currentColor">c</text>

  <g font-family="monospace" font-size="12" fill="currentColor" opacity="0.65">
    <text x="480" y="80">a, e, f, g = 1</text>
    <text x="480" y="100">d = 0</text>
    <text x="480" y="130">os cinco segmentos</text>
    <text x="480" y="148">constantes vão direto</text>
    <text x="480" y="166">pro trilho</text>
  </g>
</svg>

## Mexe nas chaves

As quatro chaves abaixo são as mesmas quatro do DIP switch. O widget avalia as
duas equações como elas foram escritas em 2023 e acende os segmentos que o
resultado manda, então o que você vê é o que a placa faz.

<div id="afp">
  <div class="afp-grid">
    <div>
      <div class="afp-chaves">
        <label class="afp-chave"><b>W</b><input type="checkbox" data-bit="W"><span>8</span></label>
        <label class="afp-chave"><b>X</b><input type="checkbox" data-bit="X"><span>4</span></label>
        <label class="afp-chave"><b>Z</b><input type="checkbox" data-bit="Z"><span>2</span></label>
        <label class="afp-chave"><b>Y</b><input type="checkbox" data-bit="Y"><span>1</span></label>
      </div>
      <p class="afp-leitura">
        nota <strong id="afp-valor">0</strong> ·
        letra <strong id="afp-letra">R</strong><br>
        <span id="afp-nome">reprovado</span><br>
        <span id="afp-eq">b = 1   c = 0</span>
      </p>
    </div>

    <svg class="afp-display" viewBox="0 0 100 172" role="img" aria-label="Display de sete segmentos com a letra atual.">
      <polygon data-seg="a" points="28,12 72,12 78,19 72,26 28,26 22,19"/>
      <polygon data-seg="b" points="81,22 88,29 88,76 81,83 74,76 74,29"/>
      <polygon data-seg="c" points="81,89 88,96 88,143 81,150 74,143 74,96"/>
      <polygon data-seg="d" points="28,146 72,146 78,153 72,160 28,160 22,153"/>
      <polygon data-seg="e" points="19,89 26,96 26,143 19,150 12,143 12,96"/>
      <polygon data-seg="f" points="19,22 26,29 26,76 19,83 12,76 12,29"/>
      <polygon data-seg="g" points="28,79 72,79 78,86 72,93 28,93 22,86"/>
    </svg>
  </div>
</div>

<script src="{{ '/assets/ci/nota-afp.js' | relative_url }}" defer></script>

## A tabela inteira

| nota | W X Z Y | b | c | letra |
|:-:|:-:|:-:|:-:|:-:|
| 0 | 0 0 0 0 | 1 | 0 | R |
| 1 | 0 0 0 1 | 1 | 0 | R |
| 2 | 0 0 1 0 | 1 | 0 | R |
| 3 | 0 0 1 1 | 1 | 0 | R |
| 4 | 0 1 0 0 | 0 | 0 | F |
| 5 | 0 1 0 1 | 0 | 0 | F |
| 6 | 0 1 1 0 | 0 | 0 | F |
| 7 | 0 1 1 1 | 1 | 1 | A |
| 8 | 1 0 0 0 | 1 | 1 | A |
| 9 | 1 0 0 1 | 1 | 1 | A |
| 10 | 1 0 1 0 | 1 | 1 | A |
{:.truth-table}

Rodei as duas equações nos onze casos e nenhum diverge do que o display deveria
mostrar.

## O que foi pro cobre

<img class="afp-foto" src="{{ '/assets/ci/nota-afp-placa.jpg' | relative_url }}" alt="Placa ilhada com DIP switch de oito posições, três circuitos integrados em DIP, resistores e um display de sete segmentos, ligados com fio vermelho.">
<p class="afp-legenda">A placa, dezembro de 2023. O fio vermelho é ponto a ponto, sem máscara e sem trilha.</p>

Três integrados em DIP, um DIP switch de oito posições, resistores de filme
metálico e o display. Ampliando a serigrafia dá pra ler `SN74HC08N` no chip ao
lado do display, que são quatro portas AND de duas entradas, e o `04` do
vizinho, que é a família dos inversores hex. O terceiro está embaixo dos fios e
eu não consigo ler. Pelo diagrama ele precisa ser um OR, e o OR quádruplo dessa
família é o 7432, mas isso é dedução minha e não leitura.

O DIP switch tem oito chaves para quatro bits. Sobraram quatro, e elas estão
ali porque era o que tinha na gaveta.

## O 4 que ficou do lado errado

Eu lembrava a regra como 0 a 4 reprovado, 5 e 6 final, 7 pra cima aprovado. As
equações fazem outra coisa: a nota 4 acende `F`, não `R`. A fronteira entre
reprovado e final está entre 3 e 4, e não entre 4 e 5.

A mensagem que eu mandei pra professora em abril de 2023 diz "7-10 é A, 6-4 é F,
3-0 é P", que é exatamente o que o circuito faz. Então o circuito está coerente
com o que eu tinha na cabeça naquele dia, e a memória é que escorregou em três
anos. Mexe na chave `X` sozinha no widget acima: ela sozinha leva a nota pra 4 e
o display vai pro `F`.

Se a regra certa da disciplina era a que eu lembro hoje, o circuito erra por um
valor, numa nota só, que é o tipo de erro que ninguém percebe testando duas ou
três entradas.

E as cinco combinações que sobraram, de 11 a 15? Nunca acontecem, então a
minimização podia tratar como quiser. Marque todas as chaves no widget e veja o
que aparece: o circuito responde alguma coisa, porque portas não sabem que
aquela entrada é impossível.
