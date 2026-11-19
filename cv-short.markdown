---
layout: page
title: Curriculum
permalink: /cv/short/
lang: en
---

<span class="cv-curto"></span>

<div class="cv-no-print" markdown="1">
Short version, two pages. [Full version](/cv/) · 🇧🇷 [Versão em Português](/cv-pt/curto/)
</div>

## Vitor Holanda

Contact: vitor.holanda@ccc.ufcg.edu.br · bartmoss77@tutanota.com

[GitHub](https://github.com/VitorHolandaI) · [LinkedIn](https://www.linkedin.com/in/vitor-holanda-465b20259/) · [Blog](https://bitssand.blog/) · [Projects](https://bitssand.blog/projects/)

Full CV, with the detail behind each line: [bitssand.blog/cv](https://bitssand.blog/cv/)

### Summary

Computer Science graduate (UFCG). Currently a resident of CI Inovador on the Digital Systems track. Before that I was tech lead of an AI engineering team on a public-sector project, built production LLM agents for Dell customer support, and was the sole sysadmin and on-call operator of a ~20-room research building.

### Experience

**Microelectronics Resident, Digital Systems Track** – [CI Inovador](https://ciinovador.softex.br/o-programa/) (MCTI/Softex), UFCG hub · *Oct 2026 – Present*

- The Brazilian Ministry of Science and Technology's microelectronics residency, run by Softex: 720 hours over 24 weeks, from transistor physics to tape-out, full time.
- CMOS inverter in Cadence Virtuoso (layout, DRC, and LVS), RTL in SystemVerilog, synthesis in Cadence Genus, and the Neander processor in Verilog as the final project, in progress.

**Tech Lead, AI Engineering** – LSD, UFCG (project with a Brazilian government agency) · *May 2026 – Sep 2026*

- Set the architecture (Python, multi-agent systems with LangGraph, local models with Ollama and llama.cpp) and ran the code reviews, the sprints, and the team's technical guidance.

**AI / LLM Engineer & Applied Researcher** – LSD-DELL, UFCG · *Apr 2025 – Apr 2026 (part-time)*

- LLM agents for Dell customer support in Python (LangChain, LangGraph, tool calling, MCP), shipped through CI/CD, with Pydantic structured outputs and prompt-injection testing.
- Enterprise FAQ on RAG: hybrid search (BM25 + dense vectors, fused with RRF) and reranking with BGE-reranker.
- LLM evaluation in Arize Phoenix and on public benchmarks (MMMLU, MGSM); expanded the internal evaluation dataset with new questions.

**System Administrator / Reliability Engineer (sole on-call operator)** – SPLab, UFCG · *Nov 2023 – Apr 2025 (part-time)*

- Single-handedly responsible for the infrastructure of a ~20-room building: servers, network, virtualization, firewall, monitoring, and incident response.
- ~20 VLANs across a network that was flat, and structured cabling that replaced 100 Mb/s links with stable 1 Gb/s.
- Two new servers on Proxmox/KVM, and encrypted backups with Restic over ZFS in RAID 10, with recurring restore drills.
- Checkmk, ntopng, and a UPS dashboard (Python, Flask, NUT) that held ~1 hour of connectivity through live outages; pfSense in cold standby for failover, and post-incident runbooks.

**Volunteer** – UFCG · *2023 – Present*: IT support for the Computer Science department (Guardians Group), the "Imagem Prova" hardened boot image for exams, and tutoring in graph theory, concurrent programming, and algorithm design.

### Skills

- **Digital design:** SystemVerilog/Verilog, Cadence Virtuoso, Cadence Genus, Icarus Verilog, Verilator, Yosys, GTKWave
- **AI and LLM:** LangChain, LangGraph, MCP, RAG, hybrid search, BGE-reranker, Ollama, llama.cpp, Pydantic, Arize Phoenix
- **Infrastructure and SRE:** Linux, Proxmox/KVM, Docker, Ansible, ZFS, Restic, pfSense, VLANs, Checkmk, GitHub Actions; Kubernetes, Terraform, and AWS in progress
- **Languages:** Python (production), Bash, C++, Rust, TypeScript, Java; Go in progress

### Education and languages

- **BSc in Computer Science** · UFCG · 2022 – 2026
- **Microelectronics Residency, Digital Systems Track** · CI Inovador (MCTI/Softex), UFCG hub · 2026 – Present
- Portuguese native · English advanced

<div class="cv-no-print" markdown="1">
### 📄 Download

<button type="button" class="cv-print-btn" data-cv-pdf="">Save as PDF (2 pages)</button>

Tip: in the browser print dialog, choose "Save as PDF" and disable headers/footers.

</div>

<script src="{{ '/assets/cv-pdf.js' | relative_url }}" defer></script>
