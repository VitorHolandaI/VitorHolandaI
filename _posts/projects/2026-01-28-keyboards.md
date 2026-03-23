---
layout: project
title: "Custom Keyboards"
date: 2025-11-12
excerpt: "Custom mechanical keyboard builds — from a handwired split to a Raspberry Pi Pico with LCD and startup sound."
technologies: "Python, KMK, CircuitPython, Arduino, QMK, Electronics, 3D Printing"
permalink: /projects/keyboards/
---

A series of custom mechanical keyboard builds, each one pushing a bit further than the last.

---

### Split Mechanical Keyboard

The first build — a handwired split keyboard made almost entirely from salvaged parts. The 60 keys and blue switches came from a broken wireless keyboard, and the copper wire was pulled from an old angle grinder motor. All structural parts were 3D printed in yellow filament from scratch using a custom design modeled in OnShape.

With only one Arduino Pro Micro available, a true wired split wasn't possible, so the two halves are wired back to a single controller in an ortholinear layout. The firmware runs on QMK using the `boardsource 5x12` profile as a base.

[GitHub Repository](https://github.com/VitorHolandaI/split_mecanico)

---

### teclado3

The latest build — a 65-key keyboard running on a Raspberry Pi Pico with CircuitPython and KMK firmware. It has a 16x2 LCD display that shows the active layer in real time, and plays an MP3 startup jingle on boot.

Two layers are defined: a standard QWERTY layout and a function layer with F1–F12 and navigation keys. There's also a hidden macro on the function layer that prints a large ASCII art doge face made of Braille block characters.

[GitHub Repository](https://github.com/VitorHolandaI/teclado3)
