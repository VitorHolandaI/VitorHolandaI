---
layout: project
title: "WhiteList"
date: 2023-07-24
excerpt: "Uma ferramenta Bash que restringe máquinas de alunos a apenas sites aprovados durante provas."
technologies: "Shell, Bash, iptables, ufw"
permalink: /projects/whitelist-pt/
lang: pt
lang_ref: whitelist
---

Uma ferramenta de controle de acesso à rede feita para laboratórios universitários. A ideia é simples: em vez de tentar bloquear sites indesejados específicos — o que é uma batalha sem fim — a abordagem é invertida: bloqueia tudo por padrão e abre apenas os domínios que o professor aprovou explicitamente.

Um arquivo `domains.txt` contém os domínios permitidos. O script resolve cada um para um IP via `dig` e usa `iptables` ou `ufw` para bloquear todo o resto. O professor pode implantar e resetar as regras nas máquinas dos alunos remotamente via SSH, mantendo controle total sem precisar estar fisicamente em cada máquina.

Duas implementações estão incluídas — uma usando `iptables` puro e outra usando `ufw` — desenvolvidas em conjunto com um colega.

**Stack:** Bash, iptables, ufw.

[GitHub Repository](https://github.com/VitorHolandaI/whiteList)
