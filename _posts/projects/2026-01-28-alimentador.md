---
layout: project
title: "Bird Feeder"
date: 2024-07-09
excerpt: "An automated bird feeder built with Arduino and C++."
technologies: "C++, Arduino, Electronics"
permalink: /projects/alimentador/
---

A personal electronics project born from a simple need: keeping my birds fed even when I'm away from home. Built around an Arduino Uno, this feeder runs entirely on its own schedule — no apps, no internet, no intervention needed.

The system uses an RTC DS1307 module to track real time, triggering a servo motor at three preset times throughout the day to dispense food through a PVC pipe structure. A small OLED display shows the current time and feeding schedule, while three physical buttons let you navigate an on-device menu to adjust timings on the fly — no need to reflash the firmware.

The housing is built from PVC pipes enclosed in a wire grid, keeping the food protected while making the mechanism easy to clean and refill. The electronics sit on a separate board connected to the structure.

> One caveat: timing configurations stored via the menu reset if the Arduino loses power, so permanent schedule changes are better made in the code.

**Stack:** C++ / Arduino, RTC DS1307, OLED display, servo motor, PVC construction.

[GitHub Repository](https://github.com/VitorHolandaI/alimentador_def)
