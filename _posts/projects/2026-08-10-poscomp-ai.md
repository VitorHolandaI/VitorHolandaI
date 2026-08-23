---
layout: project
title: "POSCOMP Web"
date: 2026-08-10
excerpt: "A local web app that imports POSCOMP exam PDFs, crops each question as an image, and generates mock exams in the official proportion."
technologies: "Python, FastAPI, Jinja2, PyMuPDF, uvicorn, uv, Docker"
permalink: /projects/poscomp-ai/
image: "https://raw.githubusercontent.com/VitorHolandaI/poscomp_ai/main/docs/screenshots/simulados.png"
image_alt: "POSCOMP Web mock exam screen, listing the exams by year"
lang: en
lang_ref: poscomp-ai
---

A locally hosted web app that turns the PDF archive of POSCOMP (Brazil's national entrance exam for graduate computing programs) into a searchable question bank with mock exams generated on demand. It covers every published exam from **2002 to 2025**, including the Type 1 and Type 2 variants of 2017, at 70 questions each.

The detail that decides the project is how a question gets displayed. Instead of extracting text from the PDF, the app **crops the question as an image** using PyMuPDF. Computing exams are full of formulas, automata, trees and diagrams, and text extraction either destroys those or yields broken LaTeX. Cropping pixels means the question renders exactly as printed, with no exceptions and no special cases to maintain.

The mock exam generator draws questions in the **exam's official proportion**: 20 Mathematics, 30 Fundamentals, 20 Technology. Years can be filtered or left open, and the total question count is configurable. Every question in a generated exam carries the exam and year it came from, so a mock exam becomes its own navigable track rather than a flat list.

Outside mock-exam mode, questions are browsable by **area, theme and subtheme**. Subthemes go down to binary trees, recursion or hash tables, each with its question count, which makes it possible to drill one subject instead of sitting a whole exam.

The admin screen imports PDFs from a local folder or by upload, and is where questions are reviewed, answer keys checked and themes assigned. It also exports and imports packages, so the classification work is not trapped on one machine.

**Stack:** Python, FastAPI, Jinja2, PyMuPDF (question cropping), uvicorn, uv, Docker.

[GitHub Repository](https://github.com/VitorHolandaI/poscomp_ai)
