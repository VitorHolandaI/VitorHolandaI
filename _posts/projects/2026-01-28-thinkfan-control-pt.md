---
layout: project
title: "ThinkFan Control GUI"
date: 2024-09-07
excerpt: "Um pequeno app gráfico para Linux para controlar a velocidade do fan e monitorar temperaturas em ThinkPads."
technologies: "Rust, GTK4"
permalink: /projects/thinkfan-control-pt/
lang: pt
lang_ref: thinkfan-control
---

Um pequeno app de desktop GTK4 escrito em Rust para controlar o fan em laptops ThinkPad. Oferece três botões — AUMENTAR, DIMINUIR e AUTO — para definir manualmente o nível do fan (0–7) ou devolver o controle ao firmware, e mostra o RPM atual e o nível do fan atualizado ao vivo a cada segundo.

Sem daemon necessário. Fala diretamente com o kernel Linux via `/proc/acpi/ibm/fan`, lendo o estado atual e gravando as mudanças de velocidade diretamente nesse arquivo. Precisa de `sudo` para alterar a velocidade e de uma configuração de uma linha no módulo do kernel para liberar o controle do fan.

Este é um fork de uma versão anterior em Python/Tkinter, reescrito em Rust.

**Stack:** Rust, GTK4, glib.

[GitHub Repository](https://github.com/VitorHolandaI/thinkfan-control-gui)
