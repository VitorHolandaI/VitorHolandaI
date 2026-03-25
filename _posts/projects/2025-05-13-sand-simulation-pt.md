---
layout: project
title: "Simulação de Areia"
date: 2025-05-13
excerpt: "Um simulador de areia caindo feito com Python e Tkinter."
technologies: "Python, Tkinter"
permalink: /projects/sand-simulation-pt/
lang: pt
lang_ref: sand-simulation
---

Um simulador de areia caindo feito inteiramente em Python usando Tkinter — sem bibliotecas externas. Mova o mouse sobre a janela e a areia começa a cair, desce pela gravidade e vai se acumulando no fundo ou em cima dos grãos já depositados.

Cada grão é um quadradinho de 1x1 pixel gerado na posição do cursor com um pequeno deslocamento aleatório para o fluxo parecer natural. A cada 10 milissegundos a simulação move todos os grãos ativos um pixel para baixo, parando cada um ao atingir o chão ou pousar em cima de um grão parado.

Um projeto pessoal pequeno para explorar o canvas e o loop de eventos do Tkinter — ainda em desenvolvimento no lado da física, mas já parece e se comporta como areia.

**Stack:** Python, Tkinter.

[GitHub Repository](https://github.com/VitorHolandaI/sand_simulation)
