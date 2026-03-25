---
layout: project
title: "Task Tracker CLI"
date: 2025-05-25
excerpt: "Um gerenciador de tarefas de linha de comando feito em Nim."
technologies: "Nim"
permalink: /projects/task-tracker-pt/
lang: pt
lang_ref: task-tracker
---

Um gerenciador de tarefas pessoal de linha de comando escrito em Nim, chamado `Doin`. As tarefas são armazenadas como arquivos JSON simples em `~/.tasks/`, organizadas em três pastas — ativas, concluídas e atrasadas — sem banco de dados, com os dados sempre legíveis.

Suporta tarefas únicas com prazo e tarefas recorrentes diárias. Tarefas diárias registram quantas vezes foram concluídas no prazo versus com atraso, criando um histórico simples estilo streak. Tarefas atrasadas são movidas automaticamente para a própria pasta quando marcadas como concluídas.

Os comandos cobrem o básico: adicionar tarefa, definir descrição, atribuir prazo, marcar como concluída e listar tarefas — incluindo um atalho para mostrar apenas o que vence hoje. O CI está configurado para compilar e publicar binários para Linux, macOS e Windows a cada tag de versão.

**Stack:** Nim.

[GitHub Repository](https://github.com/VitorHolandaI/task-tracker)
