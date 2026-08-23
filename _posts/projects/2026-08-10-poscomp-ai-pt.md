---
layout: project
title: "POSCOMP Web"
date: 2026-08-10
excerpt: "App web local que importa PDFs de provas do POSCOMP, recorta cada questão como imagem e gera simulados na proporção oficial."
technologies: "Python, FastAPI, Jinja2, PyMuPDF, uvicorn, uv, Docker"
permalink: /projects/poscomp-ai-pt/
image: "https://raw.githubusercontent.com/VitorHolandaI/poscomp_ai/main/docs/screenshots/simulados.png"
image_alt: "Tela de simulados do POSCOMP Web, listando as provas por ano"
lang: pt
lang_ref: poscomp-ai
---

Um app web que roda local e transforma os PDFs das provas do POSCOMP num banco de questões pesquisável, com simulado gerado na hora. Cobre as provas publicadas de **2002 a 2025**, incluindo as variantes Tipo 1 e Tipo 2 de 2017, com 70 questões cada.

O detalhe que decide o projeto é como a questão é exibida. Em vez de extrair o texto do PDF, o app **recorta o enunciado como imagem** com PyMuPDF. Prova de computação é cheia de fórmula, autômato, árvore e diagrama, e extração de texto destrói tudo isso ou entrega LaTeX quebrado. Recortando o pixel, a questão aparece exatamente como está na prova original, sem exceção e sem caso especial pra tratar.

O gerador de simulado sorteia na **proporção oficial do exame**: 20 de Matemática, 30 de Fundamentos e 20 de Tecnologia. Dá pra filtrar por ano ou deixar aberto pra todos, e escolher o total de questões. Cada questão do simulado gerado carrega de qual prova e ano ela veio, então o simulado vira uma trilha própria em vez de uma lista solta.

Fora do modo simulado, as questões são navegáveis por **área, tema e subtema**. O subtema desce até o nível de árvore binária, recursividade ou tabela hash, com contagem de questões em cada um, o que serve pra treinar um assunto específico em vez de fazer prova inteira.

A tela de admin importa PDF da pasta local ou por upload, e é onde a questão é revisada, o gabarito conferido e o tema classificado. Também exporta e importa pacotes, então o trabalho de classificação não fica preso numa máquina só.

**Stack:** Python, FastAPI, Jinja2, PyMuPDF (recorte das questões), uvicorn, uv, Docker.

[Repositório no GitHub](https://github.com/VitorHolandaI/poscomp_ai)
