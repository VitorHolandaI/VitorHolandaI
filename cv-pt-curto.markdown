---
layout: page
title: Currículo
permalink: /cv-pt/curto/
---

<span class="cv-curto"></span>

<div class="cv-no-print" markdown="1">
Versão curta, de duas páginas. [Versão completa](/cv-pt/) · 🇺🇸 [English version](/cv/)
</div>

## Vitor Holanda

Contato: vitor.holanda@ccc.ufcg.edu.br · bartmoss77@tutanota.com

[GitHub](https://github.com/VitorHolandaI) · [LinkedIn](https://www.linkedin.com/in/vitor-holanda-465b20259/) · [Blog](https://bitssand.blog/) · [Projetos](https://bitssand.blog/projects/)

### Resumo

Bacharel em Ciência da Computação (UFCG). Hoje sou residente do CI Inovador, na Trilha de Sistemas Digitais. Antes, liderei um time de engenharia de IA num projeto do setor público, construí agentes de LLM em produção para o suporte da Dell e fui o único administrador de sistemas e operador on-call de um prédio de pesquisa de ~20 salas.

### Experiência

**Residente em Microeletrônica, Trilha de Sistemas Digitais** – [CI Inovador](https://ciinovador.softex.br/o-programa/) (MCTI/Softex), polo UFCG · *Out 2026 – Atual*

- Residência em microeletrônica do MCTI coordenada pela Softex: 720 h em 24 semanas, da física do transistor ao tape-out, em período integral.
- Inversor CMOS no Cadence Virtuoso (layout, DRC e LVS), RTL em SystemVerilog, síntese no Cadence Genus e, em andamento, o processador Neander em Verilog como projeto final.

**Líder Técnico, Engenharia de IA** – LSD, UFCG (projeto com órgão do governo) · *Mai 2026 – Set 2026*

- Defini a arquitetura (Python, multi-agentes com LangGraph, modelos locais com Ollama e llama.cpp) e conduzi as revisões de código, as sprints e a orientação do time.

**Engenheiro de IA / LLM e Pesquisador Aplicado** – LSD-DELL, UFCG · *Abr 2025 – Abr 2026 (meio período)*

- Agentes de LLM para o suporte ao cliente da Dell em Python (LangChain, LangGraph, tool calling, MCP), com CI/CD, saídas estruturadas em Pydantic e testes de prompt-injection.
- FAQ corporativo com RAG: busca híbrida (BM25 + vetorial, fundidos com RRF) e reranking com BGE-reranker.
- Avaliação de LLMs no Arize Phoenix e em benchmarks públicos (MMMLU, MGSM); o dataset interno de avaliação passou de 42 para mais de 120 questões.

**Administrador de Sistemas / Engenheiro de Confiabilidade (único operador on-call)** – SPLab, UFCG · *Nov 2023 – Abr 2025 (meio período)*

- Fui responsável sozinho pela infraestrutura de um prédio de ~20 salas: servidores, rede, virtualização, firewall, monitoramento e resposta a incidentes.
- ~20 VLANs numa rede que era plana, e cabeamento estruturado que trocou links de 100 Mb/s por 1 Gb/s estável.
- Dois servidores novos com Proxmox/KVM, e backup criptografado com Restic sobre ZFS em RAID 10, com exercícios periódicos de restore.
- Checkmk, ntopng e um dashboard dos no-breaks (Python, Flask, NUT) com mais de 255 mil registros de quedas de energia; pfSense em cold standby para failover e runbooks pós-incidente.

**Voluntário** – UFCG · *2023 – Atual*: suporte de TI no Departamento de Computação (Guardians Group), a imagem de boot "Imagem Prova" para provas e monitoria de grafos, programação concorrente e algoritmos.

### Habilidades

- **Projeto digital:** SystemVerilog/Verilog, Cadence Virtuoso, Cadence Genus, Icarus Verilog, Verilator, Yosys, GTKWave
- **IA e LLM:** LangChain, LangGraph, MCP, RAG, busca híbrida, BGE-reranker, Ollama, llama.cpp, Pydantic, Arize Phoenix
- **Infraestrutura e SRE:** Linux, Proxmox/KVM, Docker, Ansible, ZFS, Restic, pfSense, VLANs, Checkmk, GitHub Actions; Kubernetes, Terraform e AWS em andamento
- **Linguagens:** Python (produção), Bash, C++, Rust, TypeScript, Java; Go em andamento

### Formação e idiomas

- **Bacharelado em Ciência da Computação** · UFCG · 2022 – 2026
- **Residência em Microeletrônica, Trilha de Sistemas Digitais** · CI Inovador (MCTI/Softex), polo UFCG · 2026 – Atual
- Português nativo · Inglês avançado

<div class="cv-no-print" markdown="1">
### 📄 Download

<button type="button" class="cv-print-btn" data-cv-pdf="">Salvar como PDF (2 páginas)</button>

Dica: no diálogo de impressão do navegador, escolha "Salvar como PDF" e desabilite cabeçalhos/rodapés.

</div>

<script src="{{ '/assets/cv-pdf.js' | relative_url }}" defer></script>
