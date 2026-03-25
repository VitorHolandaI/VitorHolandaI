---
layout: project
title: "Alimentador de Pássaros"
date: 2024-07-09
excerpt: "Um alimentador automático de pássaros feito com Arduino e C++."
technologies: "C++, Arduino, Electronics"
permalink: /projects/alimentador-pt/
lang: pt
lang_ref: alimentador
---

Um projeto de eletrônica pessoal nascido de uma necessidade simples: manter meus pássaros alimentados mesmo quando estou fora de casa. Construído em torno de um Arduino Uno, o alimentador funciona completamente no próprio horário — sem apps, sem internet, sem intervenção necessária.

O sistema usa um módulo RTC DS1307 para rastrear o tempo real, acionando um servo motor em três horários predefinidos ao longo do dia para dispensar ração por uma estrutura de cano PVC. Um display OLED pequeno mostra a hora atual e o horário de alimentação, enquanto três botões físicos permitem navegar em um menu no próprio dispositivo para ajustar os horários na hora — sem precisar regravar o firmware.

O gabinete é feito de canos PVC fechados em uma grade de arame, mantendo a ração protegida e facilitando a limpeza e recarga. A eletrônica fica numa placa separada conectada à estrutura.

> Um porém: as configurações de horário feitas pelo menu são resetadas se o Arduino perder energia, então mudanças permanentes de horário são melhor feitas no código.

**Stack:** C++ / Arduino, RTC DS1307, display OLED, servo motor, estrutura em PVC.

[GitHub Repository](https://github.com/VitorHolandaI/alimentador_def)
