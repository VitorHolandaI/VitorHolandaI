---
layout: project
title: "Mesh System Pager"
date: 2026-04-06
excerpt: "Uma ferramenta em Python que transmite métricas do sistema — CPU, RAM, rede e disco — em tempo real por uma rede mesh Meshtastic LoRa."
technologies: "Python, Meshtastic, psutil, LoRa"
permalink: /projects/mesh-system-pager-pt/
lang: pt
lang_ref: mesh-system-pager
---

Um daemon simples que lê métricas do sistema em tempo real de uma máquina Linux e as transmite por uma rede mesh Meshtastic LoRa, uma mensagem por categoria, a cada 60 segundos.

Três relatórios são enviados em sequência a cada ciclo: CPU (uso por núcleo, sensores de temperatura, uptime), RAM (usado/total, swap, top 5 processos por memória) e rede (taxas de RX/TX, totais, IPs das interfaces ativas, uso de disco). Cada relatório é empacotado em uma string compacta separada por pipes e truncado para caber no limite de 228 bytes de payload de texto do Meshtastic.

A ferramenta se conecta via serial a um dispositivo Meshtastic local e entra em loop indefinidamente. Handlers de sinal para `SIGINT` e `SIGTERM` fecham a interface corretamente ao sair.

O caso de uso é monitoramento remoto de uma máquina — um servidor doméstico, um Raspberry Pi em campo, ou qualquer máquina headless — sem precisar de Wi-Fi, celular ou conexão com a internet. Enquanto houver um nó Meshtastic dentro do alcance LoRa, é possível puxar as métricas de qualquer lugar.

**Stack:** Python, Meshtastic Python SDK, psutil.

[GitHub Repository](https://github.com/VitorHolandaI/mesh_system_pager)
