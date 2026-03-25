---
layout: project
title: "Visualizador de Horário CLI"
date: 2024-07-07
excerpt: "Uma ferramenta de linha de comando para visualizar seu horário atual direto no terminal."
technologies: "Shell, Bash"
permalink: /projects/horario-controle-pt/
lang: pt
lang_ref: horario-controle
---

Um único script Bash que faz login no portal acadêmico da UFCG, baixa o horário de aulas de um semestre específico e exibe tudo direto no terminal — sem precisar abrir navegador.

Você informa suas credenciais, o ano e o período. O script faz o POST no portal, salva o cookie de sessão, baixa a página do horário, extrai apenas a tabela com `awk` e abre o resultado no `elinks` para você ler sem sair do terminal. Os arquivos temporários são apagados automaticamente ao final.

**Stack:** Bash, wget, awk, elinks.

[GitHub Repository](https://github.com/VitorHolandaI/horarioControleBash)
