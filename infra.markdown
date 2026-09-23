---
layout: page
title: "Infra atual"
permalink: /infra/
---

<p><em>Página em construção: as seções abaixo ainda estão sendo preenchidas.</em></p>

O currículo lista o que eu fiz sendo pago pra fazer. Esta página é o outro lado:
o que eu administro hoje, em casa, porque quis. É onde eu erro por conta
própria, sem ninguém dependendo do uptime, e é de onde sai boa parte do que eu
aprendo.

Sem endereço, sem topologia e sem nome de host aqui. O que interessa é o que
roda, por que roda assim, e o que eu mudaria.

## Antes: cluster ARM refrigerado a óleo

Antes da infraestrutura atual, montei um cluster Docker Swarm com quatro SBCs
ARM: Banana Pi M2 Zero W, Orange Pi Zero 2W, Raspberry Pi 3B e Raspberry Pi
Zero W. O experimento serviu para testar serviços distribuídos, consumo e
temperatura em hardware de baixo consumo.

Parte dos nós ficou submersa em óleo mineral, com um módulo Peltier e um cooler
como refrigeração. Não era uma solução para produção: era um laboratório para
entender os limites do hardware e do Docker em arquiteturas ARM diferentes.

![Cluster ARM com SBCs em recipientes de óleo mineral e refrigeração auxiliar]({{ '/cluster_arm.jpg' | relative_url }})

Para referência: [visão geral do Docker Swarm](https://docs.docker.com/swarm/overview/)
e [imagens Docker multi-plataforma](https://docs.docker.com/build/building/multi-platform/).

## Rede

<!-- segmentação, DNS, VPN, o que é isolado de quê e por quê -->

## Serviços

<!-- o que está no ar hoje e pra que serve cada um -->

## Backup

<!-- o que é copiado, com que frequência, e como eu sei que restaura -->

## Observabilidade

<!-- o que eu monitoro, o que me acorda, e o que eu decidi não monitorar -->

## Automação

<!-- o que é reproduzível a partir de arquivo e o que ainda é manual -->

## O que eu faria diferente

<!-- as decisões que envelheceram mal -->
