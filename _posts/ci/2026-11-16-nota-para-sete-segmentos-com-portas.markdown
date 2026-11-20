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

<svg class="n3-schematic" viewBox="0 0 840 520" role="img" aria-labelledby="afp-diag-titulo">
  <title id="afp-diag-titulo">Esquemático das duas equações: b sai de um OR de três entradas e c sai de um OR de dois ANDs.</title>
  <text class="afp-sinal" x="22" y="51">W</text>
  <path class="afp-fio" d="M40,46 L86,46"/>
  <text class="afp-sinal" x="22" y="97">X</text>
  <path class="afp-fio" d="M40,92 L108,92"/>
  <text class="afp-sinal" x="22" y="143">Z</text>
  <path class="afp-fio" d="M40,138 L130,138"/>
  <text class="afp-sinal" x="22" y="189">Y</text>
  <path class="afp-fio" d="M40,184 L152,184"/>
  <path class="afp-porta" d="M190,77 L216,92 L190,107 Z"/>
  <circle class="afp-porta" cx="221" cy="92" r="5"/>
  <path class="afp-fio" d="M108,92 L190,92"/>
  <path class="afp-fio" d="M221,92 L252,92"/>
  <text class="afp-sinal" x="228" y="84">X̄</text>
  <path class="afp-porta" d="M190,31 L216,46 L190,61 Z"/>
  <circle class="afp-porta" cx="221" cy="46" r="5"/>
  <path class="afp-fio" d="M86,46 L190,46"/>
  <path class="afp-fio" d="M221,46 L274,46"/>
  <text class="afp-sinal" x="281" y="40">W̄</text>
  <path class="afp-porta" d="M400,164 H434 A26,26 0 0 1 434,216 H400 Z"/>
  <path class="afp-fio" d="M152,181.33333333333334 L400,181.33333333333334"/>
  <circle class="afp-no" cx="152" cy="181.33333333333334" r="3"/>
  <path class="afp-fio" d="M130,198.66666666666666 L400,198.66666666666666"/>
  <circle class="afp-no" cx="130" cy="198.66666666666666" r="3"/>
  <path class="afp-fio" d="M460,190 L600,190"/>
  <text class="afp-termo" x="474" y="182">Z·Y</text>
  <path class="afp-porta" d="M400,274 H434 A46,46 0 0 1 434,366 H400 Z"/>
  <path class="afp-fio" d="M274,292.4 L400,292.4"/>
  <circle class="afp-no" cx="274" cy="292.4" r="3"/>
  <path class="afp-fio" d="M152,310.8 L400,310.8"/>
  <circle class="afp-no" cx="152" cy="310.8" r="3"/>
  <path class="afp-fio" d="M130,329.2 L400,329.2"/>
  <circle class="afp-no" cx="130" cy="329.2" r="3"/>
  <path class="afp-fio" d="M108,347.6 L400,347.6"/>
  <circle class="afp-no" cx="108" cy="347.6" r="3"/>
  <path class="afp-fio" d="M480,320 L600,320"/>
  <text class="afp-termo" x="494" y="312">X·W̄·Z·Y</text>
  <path class="afp-porta" d="M400,404 H434 A26,26 0 0 1 434,456 H400 Z"/>
  <path class="afp-fio" d="M252,421.3333333333333 L400,421.3333333333333"/>
  <circle class="afp-no" cx="252" cy="421.3333333333333" r="3"/>
  <path class="afp-fio" d="M86,438.6666666666667 L400,438.6666666666667"/>
  <circle class="afp-no" cx="86" cy="438.6666666666667" r="3"/>
  <path class="afp-fio" d="M460,430 L600,430"/>
  <text class="afp-termo" x="474" y="422">W·X̄</text>
  <path class="afp-porta" d="M640,104 Q664.3,104 694,150 Q664.3,196 640,196 Q656.2,150 640,104 Z"/>
  <path class="afp-fio" d="M252,127.0 L652.0,127.0"/>
  <circle class="afp-no" cx="252" cy="127.0" r="3"/>
  <path class="afp-fio" d="M86,150.0 L656.0,150.0"/>
  <circle class="afp-no" cx="86" cy="150.0" r="3"/>
  <path class="afp-fio" d="M600,190 L600,173.0"/>
  <path class="afp-fio" d="M600,173.0 L652.0,173.0"/>
  <path class="afp-fio" d="M694,150 L760,150"/>
  <text class="afp-saida" x="770" y="157">b</text>
  <path class="afp-porta" d="M640,360 Q664.3,360 694,400 Q664.3,440 640,440 Q656.2,400 640,360 Z"/>
  <path class="afp-fio" d="M600,320 L600,386.6666666666667"/>
  <path class="afp-fio" d="M600,386.6666666666667 L654.2222222222222,386.6666666666667"/>
  <path class="afp-fio" d="M600,430 L600,413.3333333333333"/>
  <path class="afp-fio" d="M600,413.3333333333333 L654.2222222222222,413.3333333333333"/>
  <path class="afp-fio" d="M694,400 L760,400"/>
  <text class="afp-saida" x="770" y="407">c</text>
  <path class="afp-fio" d="M86,46 L86,438.6666666666667"/>
  <path class="afp-fio" d="M108,92 L108,347.6"/>
  <path class="afp-fio" d="M130,138 L130,329.2"/>
  <path class="afp-fio" d="M152,184 L152,310.8"/>
  <path class="afp-fio" d="M252,92 L252,421.3333333333333"/>
  <path class="afp-fio" d="M274,46 L274,292.4"/>
  <text class="afp-nota" x="22" y="482">a, e, f, g = 1    d = 0</text>
  <text class="afp-nota" x="22" y="502">os cinco segmentos constantes vão direto pro trilho</text>
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
