---
layout: page
title: Curriculum
permalink: /cv/
lang: en
---

<div class="cv-no-print" markdown="1">
🇧🇷 [Versão em Português](/cv-pt/)
</div>

## Vitor Holanda

Contact: vitor.holanda@ccc.ufcg.edu.br · bartmoss77@tutanota.com  

[GitHub](https://github.com/VitorHolandaI) · [LinkedIn](https://www.linkedin.com/in/vitor-holanda-465b20259/) · [Blog](https://bitssand.blog/) · [Projects](https://bitssand.blog/projects/)


### Summary

Computer Science graduate (UFCG). As the **sole sysadmin** of a ~20-room
research building, I did not inherit an infrastructure — I built the one that
was missing: backups from zero with restore drills, ~20 VLANs where the network
was flat, a password vault replacing a shared Drive folder, 100 Mb/s links
brought up to a stable 1 Gb/s. Then a year in **AI/LLM engineering**: agents,
RAG, and evaluation pipelines for Dell customer support. From the cable in the
rack to the eval metric.


### Technical Skills & Technologies

- **AI / LLM Engineering:** LangChain, LangGraph, MCP (Model Context Protocol), tool calling, agentic workflows, RAG (Retrieval-Augmented Generation), hybrid search (semantic + lexical), reranking (BGE-reranker, cross-encoder), embeddings, vector databases, prompt engineering, prompt-injection testing (guardrail bypass), structured outputs with Pydantic, OpenAI-compatible APIs
- **LLM Evaluation & Observability:** Arize Phoenix, custom evaluation metrics, tracing, token-cost & throughput analysis
- **Operating Systems:** Linux, FreeBSD (via pfSense)
- **Containers & DevOps:** Docker, Podman, Git, Kubernetes (academic and personal use: app deployment and load testing), Ansible (configuration management across ~10 lab hosts)
- **SRE & Reliability:** Incident response, runbooks/playbooks, post-mortems, failover (manual cutover to a pre-configured standby), disaster recovery (DR) drills, high availability (HA), observability (Zabbix, Checkmk), host/service availability monitoring
- **Networking & Systems:** Network administration, system administration, virtualization (KVM, Proxmox), DNS stack management, pfSense firewalls
- **Programming & Development:** Python (Flask, FastAPI), C++ (personal projects), Java (coursework projects), Haskell and Prolog (coursework projects)
- **Embedded Systems & Hardware:** SBCs, microcontrollers, embedded programming


### Education

---
**BSc in Computer Science** — Graduated · Universidade Federal de Campina Grande · 2022 – 2026


### Languages

- **Portuguese:** Native
- **English:** Advanced


### Experience

---

### **System Administrator / Systems Analyst (SRE-adjacent)** – SPLab, UFCG (Part-time) Nov 2023 - April 2025

Sole sysadmin responsible for the full IT infrastructure of a ~20-room
building (~10 faculty offices plus postgraduate research projects and
**projects in partnership with private companies and other public
entities**), covering servers, networking, virtualization,
firewalling, observability, incident response, and end-user support.

Being the only person meant the platform work and the helpdesk were the same
job. A single day could hold VLAN segmentation planning and then walking
somebody through a printer driver, installing an OS for a new arrival,
activating a piece of software for someone stuck, or swapping a projector alone
on a ladder. Everything below was built **between** those interruptions, not
instead of them.

#### Infrastructure & Virtualization
- Designed and implemented infrastructure to host services for the laboratory community.
- Planned and deployed **KVM-based virtualization stacks** from scratch, significantly expanding service capacity and flexibility.
- **The lab ran a single server with VMs on it and nothing else.** Specified, assembled, and put into service **two more physical servers** — one for production workloads, one dedicated to VM backups — and managed them alongside workstations, using **Proxmox** and **KVM**.
- Built and configured **on-demand machines and test-lab environments** for lab members (researchers, students, partner projects), specifying hardware, assembling, and provisioning systems according to each use case. Research projects were handed **their own VMs to self-manage**, with me owning the platform underneath and every technical escalation on top.

#### Storage, Backup, Reliability & Disaster Recovery
- Designed and implemented **backup infrastructure** for KVM virtual machines and file-based workloads, including **encrypted backup validation tests** (restore drills) to verify that backups were actually recoverable, not just written successfully.
- Configured and managed **Dell servers** and general-purpose servers.
- **There was no backup at all before this.** Built the capability from zero: first a **TrueNAS-based setup**, then a **fully custom backup server** assembled in-house from drives already on site, giving more control and capacity without buying an appliance.
- For the custom server, **evaluated all candidate drives** available at the lab — running diagnostics and inspecting **SMART data (including power-on hours / drive uptime)** — to select the disks with the lowest wear for the array.
- Built the final server on **Rocky Linux 9**, six 2.5" drives in a **ZFS pool in RAID 10 (striped mirrors)**, mounted in a **custom 3D-printed drive holder**. ZFS was the deliberate choice for **end-to-end checksums**: on a backup target, silent corruption has to be detected, not faithfully copied.
- Maintained **VM snapshot policies** as part of the lab's **disaster recovery (DR)** strategy, enabling rapid rollback after failed updates or hardware events.

#### Networking & Connectivity
- Performed **network planning and design** for the lab, including segmentation, growth capacity, and rack/distribution layout.
- Administered and configured **network switches**. **There was no VLAN segmentation in place: designed and built the lab's ~20 VLANs from scratch**, together with port assignments, trunking, and link aggregation, isolating traffic across services and tenants. Several switches had no usable credentials on record and had to be factory-reset before they could be brought under management at all.
- Managed the laboratory's full **DNS stack**, including internal zones and resolution for lab services and VMs.
- Simulated and validated network topologies using **Cisco Packet Tracer**.
- Standardized and reorganized server rack infrastructure. **There was no topology standard to follow, so I defined one**: **structured cabling** in a cascading architecture, improving network design, throughput, and maintainability.
- Identified and resolved a pre-existing bottleneck caused by **disorganized cabling and outdated 100 Mb/s links**, upgrading the network to **stable 1 Gb/s connectivity** and enabling full utilization of available bandwidth.
- Configured and optimized **Ubiquiti UniFi access points** and administered the **UniFi Controller** to maximize wireless coverage and performance.
- Repurposed legacy networking equipment by installing **OpenWrt** on older routers, extending hardware lifecycle and reducing costs.

#### Security, Firewalling & Access Control
- Administered and secured **pfSense firewalls**, including:
  - Replaced an **insecure legacy backup script that stored credentials in plaintext** with **documented best practices** and **secure, encrypted configuration backups**
  - Management of VPNs, threat detection, monitoring, and advisory systems
- Ended the practice of keeping the lab's shared credentials in **Google Drive**, standing up a **self-hosted Bitwarden** vault instead: secrets moved from a shared cloud folder to per-user access with an audit trail.
- Deployed and maintained **security and monitoring tools**: **OpenVAS** for vulnerability scanning, **Suricata** as IDS/IPS at the pfSense edge, and **darkstat** for traffic accounting.
- Built and ran a **camera-based access-control prototype** (AI person identification) for controlled laboratory access. It worked end to end; the ceiling was the **existing cameras' image quality**, not the model, which is what killed accuracy in practice.
- Maintained a **physical cold-standby firewall**: a second machine, plugged in but powered down, with the pfSense configuration pre-loaded and brought up by **Wake-on-LAN**. Cutover was deliberately manual rather than CARP-based HA, because the optical converter had no spare port and the uplink cable had to be moved by hand. Exercised in a real incident (UPS short-circuit, see Incident Response below).
- Also evaluated running pfSense inside a **Proxmox VM** for centralized management, but the network link proved unstable in that configuration, so the **physical standby machine remained the production failover path** — a deliberate choice based on observed reliability rather than convenience.

#### Observability, Monitoring & Power Continuity
- Built and operated the lab's **observability stack**, initially with **Zabbix** and later **migrating to Checkmk** as the primary monitoring system (the inherited Zabbix install was broken and carried no documentation, so rebuilding on Checkmk cost less than reverse-engineering it), complemented by **ntopng** for traffic analysis, **UniFi Manager**, and virtualization management tools, providing **host and service availability metrics** for lab-hosted services.
- Configured **alerting and on-call notification** flows for service and host failures, enabling early detection and faster **incident response**.
- Developed a **monitoring dashboard** (Python, HTML, CSS) on top of **NUT (Network UPS Tools)** to track **UPS (no-break) status** during power outages, surfacing battery state and runtime to support operator decisions.
- Mitigated internet downtime during power failures by extending UPS capacity for a centralized university internet concentrator, sustaining approximately **1 hour of continued connectivity**, timed with a stopwatch during real outages.

#### Incident Response & Operational Reliability
- Owned **incident response** for the lab as the single on-call operator: triage, mitigation, communication, and recovery for outages affecting servers, network, firewall, and end-user services.
- **Documented post-incident runbooks/playbooks** after each significant event, capturing root cause, mitigation steps, and follow-up actions to speed up recovery on recurrence. These lived in the lab wiki, so they outlasted my own access.
- Example incident: **UPS short-circuit** that tripped the room's circuit breakers. Executed live mitigation by cutting power to the affected machine (damaged inside the UPS), then **failed the firewall over to the standby**: Wake-on-LAN to boot it, plus a manual uplink cable move, since the optical converter had no free port. Recovery time was bounded by those two steps.
- Handled recurring **power-grid variations and surges** as a preventive operator: when conditions looked unsafe, **proactively alerted the entire lab to disconnect equipment** or **cut power at the breaker panel**, protecting sensitive hardware from damage.
- Performed periodic **disaster recovery drills**, including restore validation of **encrypted VM backups** to confirm the backup pipeline produced recoverable artifacts (not just successful writes).
- While the lab's **DVR was broken and no surveillance cameras were available**, designed and built an **improvised camera system** for the support room (where all critical equipment was stored), using a **Banana Pi M2 Zero** and a **scavenged notebook webcam**, restoring basic on-site visibility from spare parts at zero cost.

#### Asset Management & Procurement
- Implemented **asset tracking and property accounting (patrimônio)** by maintaining an inventory of serial numbers and university asset tags, supporting audits and identification of laboratory-owned equipment.
- Deployed **GLPI** (asset management plus helpdesk) to formalise inventory and ticketing, then **took it back down**. With a single on-site operator, people kept walking into the support room instead of opening tickets, so the tool cost maintenance without changing behaviour. Retiring it was the cheaper call.

#### Automation, Configuration Management & Platforms
- Deployed and managed services using **Docker** for containerized workloads and service isolation, including a **small in-house scheduling service** written for specific faculty members; also explored **Podman** as a daemonless alternative. **Portainer** went up for container visibility but stayed marginal, since **Checkmk** already covered host and service monitoring.
- Used **Ansible** for repeatable configuration across **~10 physical hosts and VMs** (lightweight IaC).
- Stood up an **Otter Wiki** as the lab's documentation home, having inherited systems with none — the Zabbix install was the worst case. Runbooks, network topology, and service notes went there instead of staying in one person's head.

#### General Systems Administration & End-User Support
- Performed general system administration tasks, including:
  - **Budget planning, vendor quotations, and procurement** of IT equipment for the laboratory
  - Preparation of technical specifications and price comparisons to support purchase decisions
  - Maintenance of notebooks, desktops, printers (**CUPS** print server administration), projectors, UPS units, and power supplies
- Provided **hands-on end-user support** for faculty and lab members: software installation, PC troubleshooting, projector swaps (ladder included, single-handed), and on-site equipment setup/teardown.
- Diagnosed and **repaired a broken DVR** received non-functional, restoring it to working condition and avoiding replacement cost.
- Wrote **Python tooling to reassemble DVR footage**: there was no procedure for pulling a usable recording, and the Intelbras recorders export video split into segments, so the scripts stitched the segments back into a single file and turned an ad-hoc retrieval into a repeatable one.


### **AI / LLM Engineer & Applied Researcher** – LSD-DELL, UFCG
*April 2025 – April 2026 (Part-time)*

Part of a cross-functional team building **LLM-powered agents** for
Dell customer support. Hybrid AI engineering + applied research role:
**Python**-based development in Agile sprints with peer code review
via Pull Requests and integration through Dell's internal CI/CD
pipeline, alongside benchmarking, model evaluation, and
literature-driven experimentation. It was a research team with shared
ownership, so the work below was done in collaboration rather than in
separate, individually-owned tracks.

#### LLM Agents, Tool Use & Applied Research
- Built **LLM-powered agents** in **Python** using **LangChain** and **LangGraph**, including **tool calling**, **agentic workflows**, and experiments with **MCP (Model Context Protocol) servers** for extensible tool integration.
- Consumed Dell's **internally hosted LLMs** via an **OpenAI-compatible API** (same `openai` SDK pattern, internal `base_url`), so all client code remained portable across providers.
- Implemented **structured outputs** with **Pydantic models** as response schemas (`response_model`-style), ensuring strict type validation of LLM outputs and reliable downstream parsing.
- Applied **input/output validation via Pydantic** as a lightweight guardrail layer to reject malformed or out-of-schema responses before they reached downstream systems.
- Ran **prompt-injection tests** against the agents, focused on one class: making the agent break out of its assigned behaviour and bypass its guardrail. Reported the cases found and contributed fixes.
- Deployed a **web-based interface** for testing LLM APIs and services when remote VDI environments restricted required tooling, unblocking the team's experimentation workflow.

#### Retrieval-Augmented Generation (RAG) & Hybrid Search
- Worked on a **FAQ system built on Retrieval-Augmented Generation (RAG)** using a **vector database** for similarity search over a knowledge base of customer-support content.
- Used **internally hosted embedding models** (served via the same OpenAI-compatible API) to encode documents and queries.
- Modified and tested **hybrid search**, **BM25** combined with dense retrieval and fused with **RRF (Reciprocal Rank Fusion)**, measured against the previous retrieval baseline. Numbers are internal to Dell and are not reproduced here.
- Integrated **reranking** with **BGE-reranker / cross-encoder** models on top of the initial retrieval stage to lift top-k precision before passing context to the LLM.
- Produced evaluation reports on RAG system quality and implementation status.

#### LLM Evaluation, Benchmarking & Model Selection
- Designed and ran **LLM evaluations** using **Arize Phoenix** as the observability/eval platform, including:
  - **Custom evaluation metrics** for task-specific quality
  - Analysis of **agent behavior**, **response quality**, **throughput**, and **token-cost** trade-offs
  - Tracing of agent runs to debug tool-use and retrieval paths
- Ran published **LLM benchmarks** for **data-driven model selection**, including a **general multilingual benchmark** and a **mathematics-specific** one, to choose models for translation work.
- Performed **descriptive statistical analysis** on evaluation datasets, including **prompt/response token-usage** profiling for cost optimization.

#### Data Engineering & Dataset Expansion
- **Authored** the new items that grew an evaluation dataset from **42 to over 120 questions**, increasing coverage and variability for LLM agent testing.
- Contributed as part of the team to **multilingual dataset translation** using LLMs to enable evaluation across different languages.
- Researched, reviewed, and implemented benchmarking methodologies from state-of-the-art academic literature on machine translation and LLM evaluation.

---

### **Academic Tutoring (Volunteer Work)** – UFCG · 2023

**Teaching Assistant (Volunteer)**  
*Graph Theory & Concurrent Programming*

- Assisted professors during laboratory and practical sessions for undergraduate courses.
- Supported students with problem-solving, algorithm design, and theoretical concepts in **Graph Theory**.
- Helped students during hands-on activities, clarifying assignments and providing technical guidance.
- Assisted in the correction and review of student assignments and exercises.
- Acted as a bridge between students and faculty, reinforcing course content and improving learning outcomes.


### **Volunteer IT Support & Systems Maintenance** – Guardians Group, UFCG · 2023 – Present

**Volunteer – Computer Science Department**

- Provided general IT maintenance and troubleshooting for the Computer Science department, supporting faculty, staff, and students.
- Assisted with deployment and reinstallation of **Linux and Windows operating systems** on laboratory and staff machines.
- Helped with **network cabling, basic network setup**, and device organization across laboratories.
- Maintained and updated inventories of departmental equipment, including desktops, notebooks, projectors, and peripherals.
- Recovered and repurposed an **abandoned SonicWall firewall**, configuring it as a sandbox and learning playground for students.
- Participated in **“Imagem Prova”, version 1** (exam boot image): a **customized Linux image** used during exams to ensure fairness by restricting unauthorized tools and resources.
- Developed a **Bash-based access control solution** using `iptables` and `dig` to enforce a **custom domain whitelist/blacklist**, limiting network access to approved domains during assessments.
- Actively supported day-to-day maintenance activities across multiple computer labs, ensuring system availability and reliability.



### Selected Projects

- **[UPS Energy Monitor](https://bitssand.blog/projects/power-ups-front/)** — Python, Flask, Chart.js, NUT, Docker. The UPS dashboard described in the SPLab role above.
- **[Servitor Assistant](https://bitssand.blog/projects/servitor-assistant/)** — Python, FastAPI, LangChain, Ollama, Vosk, Piper TTS, Raspberry Pi. Self-hosted voice assistant.
- **[WhiteList](https://bitssand.blog/projects/whitelist/)** — Bash, iptables, ufw. The exam-time domain whitelist described in the Guardians role above.

[All projects](https://bitssand.blog/projects/)

---

<div class="cv-no-print" markdown="1">
### 📄 Download

<button type="button" class="cv-print-btn" onclick="window.print()">Save as PDF</button>

Tip: in the browser print dialog, choose "Save as PDF" and disable headers/footers for a clean output.

</div>

