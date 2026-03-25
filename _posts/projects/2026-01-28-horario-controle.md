---
layout: project
title: "Schedule Viewer CLI"
date: 2024-07-07
excerpt: "A tiny CLI tool for visualizing your current schedule in the terminal."
technologies: "Shell, Bash"
permalink: /projects/horario-controle/
lang: en
lang_ref: horario-controle
---

A single Bash script that logs into UFCG's academic portal, downloads your class schedule for a given semester, and renders it straight in the terminal — no browser needed.

You enter your credentials, the year, and the semester period. The script posts to the portal, saves the session cookie, downloads the schedule page, strips it down to just the timetable with `awk`, and opens the result in `elinks` so you can read it without leaving the terminal. Temp files are cleaned up automatically when done.

**Stack:** Bash, wget, awk, elinks.

[GitHub Repository](https://github.com/VitorHolandaI/horarioControleBash)
