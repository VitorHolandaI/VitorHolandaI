---
layout: project
title: "ThinkFan Control GUI"
date: 2024-09-07
excerpt: "A small GUI app for Linux to control fan speed and monitor temperatures on ThinkPad laptops."
technologies: "Rust, GTK4"
permalink: /projects/thinkfan-control/
---

A small GTK4 desktop app written in Rust for controlling the fan on ThinkPad laptops. It gives you three buttons — INCREASE, DECREASE, and AUTO — to manually set the fan level (0–7) or hand control back to the firmware, and shows the current RPM and fan level updated live every second.

No daemon needed. It talks directly to the Linux kernel through `/proc/acpi/ibm/fan`, reading the current state and writing speed changes straight to that file. Needs `sudo` to change fan speed and a one-line kernel module config to unlock fan control.

This is a fork of an earlier Python/Tkinter version, rewritten in Rust.

**Stack:** Rust, GTK4, glib.

[GitHub Repository](https://github.com/VitorHolandaI/thinkfan-control-gui)
