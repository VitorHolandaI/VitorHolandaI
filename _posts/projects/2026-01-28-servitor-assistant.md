---
layout: project
title: "Servitor Assistant"
date: 2026-03-18
excerpt: "A distributed voice assistant with a Warhammer 40k Magos personality, running across a PC and a Raspberry Pi."
technologies: "Python, FastAPI, LangChain, Ollama, Vosk, Piper TTS, React, Raspberry Pi"
permalink: /projects/servitor-assistant/
lang: en
lang_ref: servitor-assistant
---

A voice assistant split across two machines: a PC handles all the heavy work — speech recognition, LLM inference, text-to-speech — and a Raspberry Pi acts as the physical interface, listening through a microphone, playing back the response through speakers, and pulsing an LED while it waits.

The assistant has a Warhammer 40k Adeptus Mechanicus personality. It talks like a Magos from the Imperium — brief, curious, slightly unnerving.

Under the hood, speech is transcribed offline with Vosk, sent to a LangChain agent backed by a local Ollama model, and the response is synthesized with Piper TTS. Audio passes through SoX on the Pi for some overdrive and reverb to sell the voice effect. There's also a web chat frontend in React that streams responses via SSE and can optionally trigger the same TTS pipeline on the Pi.

The agent has access to tools through an MCP server: weather for Campina Grande, a full task manager with recurring task support backed by SQLite, and basic math. A reminder loop polls every minute and sends an audio alert to the Pi when a task comes due.

The whole thing is housed inside a 3D-printed skull.

**Stack:** Python, FastAPI, LangChain, FastMCP, Ollama (llama3.2), Vosk, Piper TTS, SoX, React + Vite + TypeScript, SQLite, Raspberry Pi, RPi.GPIO.

[GitHub Repository](https://github.com/VitorHolandaI/ServitorAssisstant)
