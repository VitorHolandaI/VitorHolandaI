---
layout: project
title: "Sand Simulation"
date: 2025-05-13
excerpt: "A falling-sand simulator built with Python and Tkinter."
technologies: "Python, Tkinter"
permalink: /projects/sand-simulation/
---

A falling-sand simulator built entirely in Python using Tkinter — no external libraries. Move the mouse over the window and sand pours out, falls under gravity, and piles up at the bottom or on top of already settled grains.

Each grain is a tiny 1x1 pixel square spawned at the cursor position with a small random offset to make the pour look natural. Every 10 milliseconds the simulation moves all active grains down by one pixel, stopping each one when it hits the floor or lands on a settled grain.

A small personal project to explore Tkinter's canvas and event loop — still a work in progress on the physics side, but it already looks and feels like sand.

**Stack:** Python, Tkinter.

[GitHub Repository](https://github.com/VitorHolandaI/sand_simulation)
