---
layout: project
title: "Mesh System Pager"
date: 2026-04-06
excerpt: "A Python tool that broadcasts live CPU, RAM, network, and disk stats over a Meshtastic LoRa mesh network."
technologies: "Python, Meshtastic, psutil, LoRa"
permalink: /projects/mesh-system-pager/
lang: en
lang_ref: mesh-system-pager
---

A small daemon that reads live system metrics from a Linux machine and broadcasts them over a Meshtastic LoRa mesh network, one message per category, every 60 seconds.

Three reports are sent in sequence on each cycle: CPU (per-core usage, temperature sensors, uptime), RAM (used/total, swap, top 5 processes by memory), and network (RX/TX rates, totals, active interface IPs, disk usage). Each report is packed into a compact pipe-delimited string and truncated to fit within Meshtastic's 228-byte text payload limit.

The tool connects via serial to a locally attached Meshtastic device, then loops indefinitely. Signal handlers for `SIGINT` and `SIGTERM` close the interface cleanly on exit.

The use case is remote monitoring of a machine, such as a home server, a Raspberry Pi in the field, or any headless box. It does not need Wi-Fi, cellular, or an internet connection. As long as a Meshtastic node is within LoRa range, you can pull stats from anywhere.

**Stack:** Python, Meshtastic Python SDK, psutil.

[GitHub Repository](https://github.com/VitorHolandaI/mesh_system_pager)
