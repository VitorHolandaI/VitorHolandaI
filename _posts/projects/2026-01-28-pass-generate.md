---
layout: project
title: "Password Generator"
date: 2023-10-19
excerpt: "A tiny passphrase generator based on the Diceware method, written in C."
technologies: "C"
permalink: /projects/pass-generate/
---

Inspired by [this article from The Intercept](https://theintercept.com/2015/03/26/passphrases-can-memorize-attackers-cant-guess/) on the diceware method — the idea that a passphrase made of a few random words is both easier to remember and harder to crack than a typical password.

This small C program generates a 4-word passphrase using that exact method. For each word, you roll a die 6 times, enter the result as a number, and the program looks up the corresponding word in a large wordlist — making the output genuinely random without relying on any algorithm to decide it. You also pick the language for each word independently, choosing between Portuguese, English, and Italian, so you can mix languages in the same passphrase.

**Stack:** C.

[GitHub Repository](https://github.com/VitorHolandaI/passGenerate)
