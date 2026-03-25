---
layout: project
title: "Gerador de Senhas"
date: 2023-10-19
excerpt: "Um pequeno gerador de frases-senha baseado no método Diceware, escrito em C."
technologies: "C"
permalink: /projects/pass-generate-pt/
lang: pt
lang_ref: pass-generate
---

Inspirado em [este artigo do The Intercept](https://theintercept.com/2015/03/26/passphrases-can-memorize-attackers-cant-guess/) sobre o método diceware — a ideia de que uma senha formada por algumas palavras aleatórias é ao mesmo tempo mais fácil de memorizar e mais difícil de quebrar do que uma senha típica.

Este pequeno programa em C gera uma frase-senha de 4 palavras usando exatamente esse método. Para cada palavra, você rola um dado 6 vezes, digita o resultado como número, e o programa busca a palavra correspondente em uma grande lista de palavras — tornando o resultado genuinamente aleatório sem depender de nenhum algoritmo para decidir. Você também escolhe o idioma de cada palavra de forma independente, entre Português, Inglês e Italiano, podendo misturar idiomas na mesma frase-senha.

**Stack:** C.

[GitHub Repository](https://github.com/VitorHolandaI/passGenerate)
