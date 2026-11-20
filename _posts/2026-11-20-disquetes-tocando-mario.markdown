---
layout: post
title:  "Três disquetes tocando Mario"
date:   2026-11-20 10:00:00 -0300
categories: hardware
lang: pt
---

> Resumo: dezembro de 2023, antes de eu saber chamar isso de qualquer coisa.
> Três drives de disquete ligados a uma protoboard tocando o tema do Mario.
> O vídeo estava só no meu celular desde então; fui procurar no GitHub e não
> tinha nada salvo. Agora mora aqui.

<video class="post-video" controls preload="metadata"
  poster="{{ '/assets/videos/disquetes-mario-poster.jpg' | relative_url }}"
  width="636">
  <source src="{{ '/assets/videos/disquetes-mario.mp4' | relative_url }}" type="video/mp4">
  Seu navegador não toca o vídeo. O arquivo está em
  <a href="{{ '/assets/videos/disquetes-mario.mp4' | relative_url }}">disquetes-mario.mp4</a>.
</video>

São 33 segundos, gravados de cima com a tampa dos três drives removida. O que
aparece no vídeo é só isso: os três drives lado a lado, os fios saindo de cada
um pra uma protoboard que fica fora do quadro, e o LED de atividade piscando no
ritmo da música.

## Por que um disquete canta

O cabeçote de leitura anda sobre um motor de passo. Motor de passo não gira
sozinho: ele espera um pulso, dá um passo, e para. Quem manda o pulso decide
quando o passo acontece.

Um passo sozinho é um clique, e ninguém chama isso de nota. Mas se os cliques
vierem 440 vezes por segundo, o ouvido para de contar clique e passa a ouvir um
lá. A frequência da nota é a taxa de passos por segundo que você mandou pro
motor, e não tem nada no circuito que sintetize som: o que se ouve é o metal
batendo na cadência que o microcontrolador impôs.

Como o drive tem um motor só, ele toca uma nota de cada vez. Pra ter duas notas
soando juntas você precisa de outro drive, e é por isso que são três ali.

## Os dois fios que importam

O conector de 34 vias do disquete tem muita coisa que não interessa aqui. Pra
fazer o cabeçote andar bastam dois sinais, nos pinos 18 e 20 da tabela do PC:

| pino | sinal | o que faz |
|:-:|:--|:--|
| 18 | `DIR` | pra que lado o cabeçote vai andar |
| 20 | `STEP` | um pulso, um passo |
{:.truth-table}

Os dois são ativos em nível baixo, que é como quase tudo nesse barramento
funciona: o sinal vale quando você puxa pro terra, não quando levanta pra 5 V.
Todos os pinos ímpares do conector são terra.

O pino que dá dor de cabeça é o de seleção de drive, porque ele depende de qual
tabela você está lendo. Na pinagem do PC da IBM, o 12 é o segundo
`DRIVE SELECT` e o 14 é o primeiro. Na tabela no estilo Shugart, o 10 é `DS0` e
o 12 é `DS1`. E cabo de PC costuma ter uma torção que troca justamente as vias
de seleção e de motor entre os dois conectores da ponta. Se o drive ignora o
que você manda, é aí que vale olhar antes de desconfiar do código.

## O cabeçote acaba

O cabeçote não anda pra sempre. Ele tem um curso que acaba, nos dois sentidos,
e quando acaba o motor continua recebendo pulso e perdendo passo contra o
batente. O barulho muda, o drive trava naquela ponta, e a melodia continua
sem ele.

Então quem toca precisa contar os passos que deu e inverter o `DIR` antes de
chegar no fim. Na prática o cabeçote fica indo e voltando dentro do trecho
livre enquanto toca, e a direção não tem nada a ver com a música: é só
administração de espaço. Quem assiste de fora vê o cabeçote dançando e acha
que faz parte do arranjo.

## O que eu não gravei

Não tem foto da protoboard nem cópia do código. O que ficou do dia foi esse
vídeo de 33 segundos no WhatsApp, e é por isso que ele está aqui agora: três
anos depois, era isso ou nada. Hoje eu commitaria o sketch antes de montar o
primeiro fio, nem que fosse num repositório privado.

Fontes da pinagem: a
[interface do disquete na Wikipédia](https://www.wikipedia.com/wiki/Shugart_bus)
e o [ArduinoFDC](https://github.com/dhansel/ArduinoFDC), que traz a tabela de
ligação do conector de 34 vias junto do código.
