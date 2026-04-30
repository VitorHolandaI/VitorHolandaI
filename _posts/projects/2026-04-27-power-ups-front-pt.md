---
layout: project
title: "Monitor de Energia UPS"
date: 2026-04-27
excerpt: "Dashboard web em Flask para monitorar nobreaks (UPS) com tensão, carga, uso, autonomia e histórico."
technologies: "Python, Flask, Chart.js, NUT, Docker"
permalink: /projects/power-ups-front-pt/
image: "https://raw.githubusercontent.com/VitorHolandaI/power_ups_front/main/docs/assets/dashboard.png"
image_alt: "Dashboard web com métricas e gráficos de um nobreak UPS"
lang: pt
lang_ref: power-ups-front
---

Um dashboard web para monitoramento em tempo real de nobreaks (UPS). Ele lê dados de log gerados pelo `upslog`, do Network UPS Tools, e transforma esses registros em cards e gráficos para acompanhar tensão de entrada, carga da bateria, uso atual, autonomia estimada, tensão da bateria e status do equipamento.

O frontend espera um arquivo simples em `data/data.txt`, gerado por cron. Cada linha é separada por ponto e vírgula e inclui data, hora e métricas do UPS em uma ordem fixa. A aplicação interpreta esses registros e converte a autonomia de segundos para um formato mais legível em horas e minutos.

O painel mostra valores atuais junto com resumos de tensão mínima, máxima e média. Os gráficos históricos podem ser filtrados por intervalo de datas, o que ajuda a acompanhar a estabilidade elétrica e a saúde do nobreak em um servidor doméstico ou qualquer máquina que precise ficar ligada.

O projeto está organizado como uma aplicação Flask/WSGI pequena, com templates HTML em `power_ups_dashboard`, logs locais do UPS em `data/` e screenshots de documentação em `docs/assets`.

**Stack:** Python, Flask, Chart.js, Network UPS Tools (upslog), Docker.

[GitHub Repository](https://github.com/VitorHolandaI/power_ups_front)
