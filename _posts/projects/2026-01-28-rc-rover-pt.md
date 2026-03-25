---
layout: project
title: "RC Rover"
date: 2026-01-07
excerpt: "Um rover controlado remotamente com chassi impresso em 3D, ESP32 e vídeo ao vivo transmitido por um smartphone."
technologies: "C++, ESP32, Arduino, Nginx, 3D Printing"
permalink: /projects/rc-rover-pt/
lang: pt
lang_ref: rc-rover
---

Um rover terrestre controlado remotamente feito com peças impressas em 3D e movido por um ESP32. A parte interessante está em como ele lida com acesso remoto e vídeo: em vez de um módulo de câmera dedicado, um smartphone é montado no rover e faz dois trabalhos — transmite vídeo ao vivo via app de câmera IP, e funciona como gateway de rede por VPN, tornando o rover controlável de qualquer lugar com cobertura móvel, não apenas na Wi-Fi local.

O ESP32 roda um pequeno servidor HTTP que expõe endpoints direcionais (`/forward`, `/backward`, `/left`, `/right`). Uma página web otimizada para mobile servida diretamente pelo ESP32 envia requisições contínuas enquanto um botão é pressionado, movendo dois motores DC por uma ponte H. O smartphone roda Nginx como proxy reverso para rotear o tráfego externo ao ESP32.

O chassi é baseado em um design 3D printável do Thingiverse, com baterias separadas para a eletrônica e os motores.

**Stack:** C++ / Arduino (ESP32), Nginx, HTML, impressão 3D.

[GitHub Repository](https://github.com/VitorHolandaI/rc-rover)
