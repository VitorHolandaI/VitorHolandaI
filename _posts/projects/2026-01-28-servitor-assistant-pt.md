---
layout: project
title: "Servitor Assistant"
date: 2026-03-18
excerpt: "Um assistente de voz distribuído com personalidade de Magos do Warhammer 40k, rodando num PC e num Raspberry Pi."
technologies: "Python, FastAPI, LangChain, Ollama, Vosk, Piper TTS, React, Raspberry Pi"
permalink: /projects/servitor-assistant-pt/
image: "https://raw.githubusercontent.com/VitorHolandaI/ServitorAssisstant/main/skull.jpg"
image_alt: "Caveira impressa em 3D usada como corpo do Servitor Assistant"
lang: pt
lang_ref: servitor-assistant
---

Um assistente de voz dividido entre duas máquinas: um PC faz o trabalho pesado, incluindo reconhecimento de fala, inferência do LLM e síntese de voz. Um Raspberry Pi serve como interface física, ouvindo pelo microfone, reproduzindo a resposta nos alto-falantes e pulsando um LED enquanto aguarda.

O assistente tem personalidade de Adeptus Mechanicus do Warhammer 40k. Ele fala como um Magos do Imperium: breve, curioso e levemente perturbador.

Por baixo dos panos, a fala é transcrita offline com Vosk, enviada a um agente LangChain com um modelo local Ollama, e a resposta é sintetizada com Piper TTS. O áudio passa pelo SoX no Pi para adicionar overdrive e reverb que combinam com o efeito de voz. Há também um frontend de chat web em React que faz stream das respostas via SSE e pode opcionalmente acionar o mesmo pipeline de TTS no Pi.

O agente tem acesso a ferramentas via servidor MCP: clima de Campina Grande, gerenciador de tarefas completo com suporte a tarefas recorrentes em SQLite, e matemática básica. Um loop de lembretes verifica a cada minuto e envia um alerta de áudio ao Pi quando uma tarefa vence.

Tudo isso está dentro de uma caveira impressa em 3D.

**Stack:** Python, FastAPI, LangChain, FastMCP, Ollama (llama3.2), Vosk, Piper TTS, SoX, React + Vite + TypeScript, SQLite, Raspberry Pi, RPi.GPIO.

[GitHub Repository](https://github.com/VitorHolandaI/ServitorAssisstant)
