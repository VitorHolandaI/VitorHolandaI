---
layout: project
title: "WhiteList"
date: 2023-07-24
excerpt: "A Bash tool that locks down student machines to only approved websites during exams."
technologies: "Shell, Bash, iptables, ufw"
permalink: /projects/whitelist/
lang: en
lang_ref: whitelist
---

A network access control tool built for university lab environments. The idea is simple: instead of trying to block specific unwanted sites — which is a losing battle — it flips the approach and blocks everything by default, then opens only the domains the teacher has explicitly approved.

A `domains.txt` file holds the allowed domains. The script resolves each one to an IP via `dig` and uses `iptables` or `ufw` to drop all other traffic. The teacher can deploy and reset the rules on student machines remotely via SSH, keeping full control without being physically at each machine.

Two implementations are included — one using raw `iptables` and one using `ufw` — developed together with a classmate.

**Stack:** Bash, iptables, ufw.

[GitHub Repository](https://github.com/VitorHolandaI/whiteList)
