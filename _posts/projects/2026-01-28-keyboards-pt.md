---
layout: project
title: "Teclados Customizados"
date: 2025-11-12
excerpt: "Builds de teclados mecânicos customizados — de um split handwired a um Raspberry Pi Pico com LCD e som de inicialização."
technologies: "Python, KMK, CircuitPython, Arduino, QMK, Electronics, 3D Printing"
permalink: /projects/keyboards-pt/
lang: pt
lang_ref: keyboards
---

Uma série de builds de teclados mecânicos customizados, cada um indo um pouco além do anterior.

---

### Teclado Mecânico Split

O primeiro build — um teclado split handwired feito quase inteiramente com peças reaproveitadas. As 60 teclas e switches azuis vieram de um teclado wireless quebrado, e o fio de cobre foi retirado do motor de uma esmerilhadeira antiga. Todas as peças estruturais foram impressas em 3D em filamento amarelo a partir de um design próprio modelado no OnShape.

Com apenas um Arduino Pro Micro disponível, um split cabeado de verdade não era possível, então as duas metades foram ligadas de volta a um único controlador em layout ortolinear. O firmware roda em QMK usando o perfil `boardsource 5x12` como base.

[GitHub Repository](https://github.com/VitorHolandaI/split_mecanico)

---

### teclado3

O build mais recente — um teclado de 65 teclas rodando num Raspberry Pi Pico com CircuitPython e firmware KMK. Tem um display LCD 16x2 que mostra a layer ativa em tempo real, e toca um jingle MP3 na inicialização.

Duas layers são definidas: um layout QWERTY padrão e uma layer de funções com F1–F12 e teclas de navegação. Há também um macro escondido na layer de funções que imprime um enorme ASCII art de um doge feito de caracteres Braille.

[GitHub Repository](https://github.com/VitorHolandaI/teclado3)
