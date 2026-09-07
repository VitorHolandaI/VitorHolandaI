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

[GitHub](https://github.com/VitorHolandaI) · [LinkedIn](https://www.linkedin.com/in/vitor-holanda-465b20259/) · [Blog](https://bitssand.blog/) · [Projects](https://bitssand.blog/projects/) · [Infra](https://bitssand.blog/infra/)


### Summary

Computer Science graduate (UFCG) combining deep hands-on expertise across critical infrastructure, systems reliability, and production AI engineering:

- **Infrastructure, SRE & Reliability (~1.5 years):** As the sole sysadmin and primary on-call operator of a ~20-room research facility (SPLab), I built the infrastructure from zero. Designed and deployed ~20 VLANs across a previously flat network, upgraded cabling to stable 1 Gb/s, assembled physical servers on Proxmox/KVM, implemented deduplicated encrypted backup pipelines with Restic and ZFS RAID 10 (with recurring restore validation drills), maintained pfSense cold-standby failover, and operated observability via Checkmk and a custom NUT telemetry dashboard with 255k+ log lines collected during real power outages. Owned the full operational lifecycle: from hands-on helpdesk and hardware repairs to critical incident response and postmortem runbooks.
- **Production AI & LLM Engineering (1 year):** Worked at LSD-DELL building enterprise-grade LLM agents for customer support. Shipped production Python integrated into corporate CI/CD pipelines, implementing tool calling, MCP servers, advanced RAG architectures with hybrid retrieval (BM25 + dense vector + RRF) and cross-encoder reranking, full tracing and evaluation via Arize Phoenix, and prompt-injection security hardening.
- **Technical Leadership (Present):** Currently tech lead of an AI engineering team on a public-sector initiative, driving the architecture of multi-agent workflows orchestrated with LangGraph, self-hosted local LLM inference (Ollama and llama.cpp), code review standards, test coverage, and hands-on technical mentoring.

Complete ownership from the ground up: I build the physical rack and network underneath, operate the platform reliability in the middle, and engineer the production AI systems on top.


### Technical Skills & Technologies

- **Reliability & Incident:** On-call (primary operator), incident response, runbook authoring, disaster recovery (DR) drills, encrypted restore validation (Restic), failover procedures, postmortem follow-up, toil reduction
- **Observability:** Checkmk, Zabbix, ntopng, NUT (Network UPS Tools), custom telemetry dashboards (Python/Flask); Prometheus & Grafana (in progress)
- **Containers & Virtualization:** Docker, Docker Compose, Podman, KVM, Proxmox, Kubernetes (lab / k3s in progress), container hardening
- **Infrastructure as Code & Automation:** Ansible, Terraform (lab), Bash scripting, Python automation
- **CI/CD:** GitHub Actions (test, build, and release pipelines)
- **Networking:** VLANs (802.1Q), trunking, link aggregation (LAG), pfSense, DNS stack, OpenWrt, UniFi Controller, TCP/IP
- **Security:** Default-deny firewall policies, Suricata (IDS/IPS), OpenVAS, Bitwarden (secrets management), secrets hygiene, prompt-injection testing
- **Cloud & Platforms:** On-prem / self-hosted systems, Linux (Debian, Ubuntu, Rocky Linux), FreeBSD (pfSense), AWS (VPC, IAM, EC2, S3 in progress)
- **Programming Languages:** Python (production), Bash, C++, Rust, TypeScript, Java; Go (in progress)
- **AI & LLM Engineering:** LangChain, LangGraph (multi-agent systems), local models (Ollama, llama.cpp), MCP (Model Context Protocol), RAG, hybrid search (BM25 + dense + RRF), BGE-reranker, vector databases, Pydantic structured outputs, Arize Phoenix (evals & tracing)


### Experience

---

### **Tech Lead, AI Engineering** – LSD, UFCG (project with a Brazilian government agency)
*May 2026 – Present*  
**Stack:** Python · LangGraph (Multi-Agent Systems) · Ollama · llama.cpp · Local LLMs · Pydantic · Git

Technical lead of a small AI engineering team on a public-sector project, working alongside a professor and a project manager. Domain and internal project details are under confidentiality.

- Architected and guided the project's technical stack: **Python**, **local LLMs**, self-hosted inference via **Ollama** and **llama.cpp**, and **multi-agent systems orchestrated with LangGraph**.
- Set technical direction, system design, and architectural decisions for agent execution and pipeline reliability.
- Conduct thorough code reviews across the codebase to ensure consistency, test coverage, and reliability.
- Manage task breakdowns, sprint planning, and provide direct technical guidance to the engineering team.

### **AI / LLM Engineer & Applied Researcher** – LSD-DELL, UFCG
*April 2025 – April 2026 (Part-time)*  
**Stack:** Python · LangChain · LangGraph · MCP · RAG · Arize Phoenix · BM25 / RRF · BGE-reranker · Pydantic · CI/CD

Part of a cross-functional team building **LLM-powered agents** for Dell customer support. Hybrid AI engineering + applied research role: **Python**-based development in Agile sprints with peer code review via Pull Requests and integration through Dell's internal CI/CD pipeline, alongside benchmarking, model evaluation, and literature-driven experimentation.

#### LLM Agents, Tool Use & Applied Research
- Built **LLM-powered agents** in **Python** using **LangChain** and **LangGraph**, including **tool calling**, **agentic workflows**, and experiments with **MCP (Model Context Protocol) servers** for extensible tool integration.
- Consumed Dell's **internally hosted LLMs** via an **OpenAI-compatible API** (standard `openai` SDK pattern, internal `base_url`), ensuring client code remained portable across providers.
- Implemented **structured outputs** with **Pydantic models** as response schemas (`response_model`-style), ensuring strict type validation of LLM outputs and reliable downstream parsing.
- Applied **input/output validation via Pydantic** as a lightweight guardrail layer to reject malformed or out-of-schema responses before they reached downstream systems.
- Executed **prompt-injection tests** against the agents, specifically targeting guardrail bypass and behavioral boundaries; reported vulnerability cases and contributed hardening fixes.
- Built and deployed an **internal web-based testing interface** for LLM APIs and services when remote VDI environments restricted tooling, enabling fast experimentation across the team.

#### Retrieval-Augmented Generation (RAG) & Hybrid Search
- Developed an enterprise **FAQ system on Retrieval-Augmented Generation (RAG)** using a **vector database** for similarity search over customer-support documentation.
- Integrated **internally hosted embedding models** (served via the OpenAI-compatible API) to encode documents and queries.
- Implemented and benchmarked **hybrid search**: combining **BM25** (lexical) with dense vector retrieval, fused via **RRF (Reciprocal Rank Fusion)**, measured against earlier retrieval baselines.
- Integrated **reranking** with **BGE-reranker / cross-encoder** models over initial retrieval stages, significantly boosting top-k precision before passing context to the LLM.
- Authored evaluation reports on RAG system performance, retrieval quality, and implementation status.

#### LLM Evaluation, Benchmarking & Observability
- Designed and ran comprehensive **LLM evaluations** using **Arize Phoenix** as the observability/eval platform:
  - Developed **custom evaluation metrics** for domain-specific response quality.
  - Analyzed **agent behavior**, **response quality**, **throughput**, and **token-cost** trade-offs.
  - Profiled execution tracing across agent steps to debug tool-use and retrieval paths.
- Evaluated open and proprietary models on public benchmarks (**MMMLU** for multilingual general knowledge, **MGSM** for multilingual math reasoning) to guide data-driven model selection.
- Authored new questions expanding the internal evaluation dataset from **42 to over 120 questions**, increasing evaluation coverage and test variability.

### **System Administrator / Reliability Engineer (Sole on-call operator)** – SPLab, UFCG (Part-time)
*Nov 2023 – April 2025*  
**Stack:** Linux (Rocky/Debian) · ZFS (RAID 10) · Restic · Proxmox/KVM · pfSense · VLANs (802.1Q) · Checkmk · Docker · Ansible · Bitwarden · NUT (Python)

Sole sysadmin and on-call operator responsible for the full IT infrastructure of a ~20-room research building (~10 faculty offices plus postgraduate research projects and external partnerships with private companies and government agencies), covering servers, networking, virtualization, firewalling, observability, incident response, and operational reliability.

Being the sole person meant platform engineering and physical operations were the same role. A typical day spanned designing VLAN segmentation and structured cabling to debugging printer drivers, onboarding new researchers, installing workstations, or replacing ceiling-mounted hardware on a ladder. Everything below was architected and built between those operational interruptions, not in isolation.

#### Infrastructure & Virtualization
- Planned and deployed KVM-based virtualization stacks from scratch, expanding service hosting capacity and flexibility across the building.
- Expanded compute capacity: the lab originally ran a single server with VMs. Specified, assembled, and provisioned **two additional physical servers** (one dedicated to production workloads, one dedicated to VM backup storage) managed alongside workstations via **Proxmox** and **KVM**.
- Provisioned on-demand environments and testbeds for researchers and partner projects, selecting hardware, assembling physical nodes, and provisioning VMs with delegated self-management while retaining platform ownership and escalation support.

#### Storage, Backup, Reliability & Disaster Recovery
- Designed and built the laboratory's backup capability from zero: deployed an initial TrueNAS setup, followed by a **custom Rocky Linux 9 backup server** with a **ZFS pool in RAID 10 (striped mirrors)** assembled from on-site drives in a custom 3D-printed bracket. Selected ZFS for **end-to-end checksums** to actively catch and prevent silent bit rot.
- Deployed **Restic** to run automated, deduplicated, and encrypted backups across critical systems, establishing snapshot retention policies and secure repository verification.
- Evaluated candidate drives by running diagnostics and analyzing **SMART attributes (including power-on hours)** to select the lowest-wear disks for the production array.
- Executed recurring **disaster recovery (DR) drills**, validating **encrypted restore procedures with Restic and VM snapshots** to ensure backup archives were reliably recoverable, not just written.
- Defined and managed **VM snapshot policies** as part of the DR strategy, enabling rapid rollback across updates and maintenance windows.

#### Networking & Connectivity
- Designed and built **~20 VLANs from scratch** with 802.1Q port assignments, trunking, and link aggregation (LAG) across a previously flat network, isolating services and tenant traffic.
- Factory-reset and reconfigured undocumented legacy switches to bring the entire switching fabric under active structured management.
- Validated and simulated network topologies using **Cisco Packet Tracer** prior to deployment.
- Replaced disorganized cabling and legacy 100 Mb/s links with a **standardized structured cabling architecture** in a cascading layout, upgrading the facility to **stable 1 Gb/s connectivity**.
- Managed the laboratory's full **DNS stack**, including internal zones and resolution for services and virtual machines.
- Administered **Ubiquiti UniFi access points** and UniFi Controller; repurposed legacy routers with **OpenWrt** to extend hardware lifecycles and reduce procurement costs.

#### Observability & Monitoring
- Built and operated the observability stack: migrated from a broken, unmaintained Zabbix install to **Checkmk**, complemented by **ntopng** for traffic inspection, providing host and service availability metrics.
- Configured **alerting and on-call notification workflows** for host and service disruptions, reducing time to detection.
- Developed a custom **monitoring dashboard** (Python, Flask, Chart.js) on top of **NUT (Network UPS Tools)**, accumulating 255k+ log lines to track battery telemetry and runtime during live utility outages.
- Extended UPS battery runtime for the campus internet concentrator, sustaining ~1 hour of continuous connectivity during blackouts (stopwatch-timed).

#### Security & Access Control
- Replaced an insecure legacy backup script storing plaintext credentials with documented, secure, encrypted configuration backups.
- Replaced an inadequate, insecure workflow where lab credentials and keys were saved in a shared Google Drive folder: deployed and managed a **self-hosted Bitwarden** instance as a dedicated password and secrets manager, establishing per-user role-based access control (RBAC), end-to-end encrypted vaults, and audit logs.
- Deployed perimeter and vulnerability tooling: **Suricata** (IDS/IPS at the pfSense boundary), **OpenVAS** vulnerability scanning, and **darkstat** traffic accounting.
- Maintained a physical cold-standby pfSense firewall (pre-configured, bootable via Wake-on-LAN) as a resilient failover path. Evaluated running pfSense inside a Proxmox VM, but observed network link instability, deliberately retaining the physical standby based on observed production reliability.
- Built a working prototype for camera-based access control with edge person identification for secure laboratory entry.

#### Incident Response & Operational Reliability
- Owned **incident response** as the sole on-call operator for ~20 rooms: triage, live mitigation, communication, and recovery across hosts, network links, and firewall services.
- Authored post-incident **runbooks and playbooks** in the laboratory wiki, recording root causes, mitigation procedures, and preventative follow-ups so operational knowledge persisted.
- **UPS short-circuit incident**: executed live mitigation by isolating the failed machine and failing over to a physical **cold-standby firewall via Wake-on-LAN** with a manual optical uplink move, bounding total recovery time to two discrete steps.
- **pfSense silent failure diagnosis**: resolved a condition where cold power cycles reset firewall configuration to defaults with clean logs. Diagnosed root cause as a virtual interface whose parent NIC re-enumerated under a different name on cold boot; resolved with a one-line configuration fix after complete root-cause tracing.
- Handled power instability and grid surges proactively, isolating critical hardware and cutting panel breakers when conditions threatened equipment integrity.
- Designed an emergency visibility system when the building DVR failed: assembled an improvised monitoring unit using a **Banana Pi M2 Zero** and a scavenged laptop webcam to maintain physical visibility of the server room at zero cost.

#### Asset Management & Practical Tooling Decisions
- Maintained laboratory hardware inventories, tracking university asset tags (patrimônio) and serial numbers to support audits and equipment allocation.
- Deployed **GLPI** for asset management and formal ticketing, and later deliberately retired it: with a single on-site operator, lab members continuously engaged directly in person rather than through tickets, so retiring the system eliminated recurring maintenance overhead without impacting operational delivery.

#### Automation, Platforms & Configuration
- Automated configuration management across **~10 physical hosts and virtual machines** using **Ansible** (lightweight IaC).
- Deployed containerized workloads using **Docker** and Docker Compose; explored **Podman** for daemonless execution, and evaluated Portainer for container visibility.
- Stood up an internal **Otter Wiki** documenting network topology, system configurations, and operational runbooks.

#### Systems Administration, Hardware Repair & Support
- Managed technical budgeting, supplier quotes, and hardware specifications to support laboratory procurement decisions.
- Provided **hands-on end-user support and helpdesk** for faculty, researchers, and students: OS re-installation, software troubleshooting, hardware diagnostics, and physical equipment setup, including **ceiling projector swaps on a ladder (single-handed)**.
- Maintained departmental workstations, notebooks, power supplies, UPS units, and print servers via **CUPS**.
- Diagnosed and repaired a non-functional video recorder (DVR), restoring it to working order and avoiding hardware replacement expenses.
- Authored **custom Python tooling** to parse and concatenate fragmented video exports from Intelbras DVR units into single continuous files, turning a manual retrieval task into an automated, repeatable script.

---

### **Volunteer IT Support & Systems Maintenance** – Guardians Group, UFCG
*2023 – Present*  
**Stack:** Linux · Bash · iptables · SonicWall · Structured Cabling · Hardware Diagnostics

- Provided systems troubleshooting and maintenance for the Computer Science department, supporting faculty, researchers, and students.
- Participated in the **"Imagem Prova" (Exam Image)** project: a hardened custom Linux boot image restricting unapproved resources during academic exams.
- Built a Bash-based access-control tool using `iptables` and `dig` to enforce dynamic domain whitelists and blacklists during assessments.
- Recovered an abandoned SonicWall firewall, configuring it as a practical networking sandbox for students.
- Supported hardware re-imaging, cabling, and general infrastructure across departmental computer labs.

### **Academic Tutoring (Teaching Assistant)** – UFCG
*2023*  
**Focus:** Graph Theory · Concurrent Programming · Algorithm Design · Academic Mentoring

- Assisted professors during practical laboratory sessions and coursework.
- Guided students through algorithm design, graph theoretical problem-solving, and concurrent programming concepts.
- Reviewed student assignments and provided technical feedback.

---

### Education

---
**BSc in Computer Science** · Universidade Federal de Campina Grande · 2022 – 2026


### Languages

- **Portuguese:** Native
- **English:** Advanced


### Selected Projects

- **[UPS Energy Monitor](https://bitssand.blog/projects/power-ups-front/)**: Python, Flask, Chart.js, NUT, Docker. Monitoring and telemetry dashboard with 255k+ real log entries tracking battery health and runtime through power outages.
- **[WhiteList](https://bitssand.blog/projects/whitelist/)**: Bash, iptables, ufw. Exam-time default-deny firewall orchestrating dynamic domain whitelisting and access enforcement.
- **[Servitor Assistant](https://bitssand.blog/projects/servitor-assistant/)**: Python, FastAPI, LangChain, Ollama, Vosk, Piper TTS, Raspberry Pi. Self-hosted edge voice assistant with local LLM inference.

[All projects](https://bitssand.blog/projects/) · Technical postmortems and incident write-ups at [bitssand.blog/everydaysbugs](https://bitssand.blog/everydaysbugs/)

---

<div class="cv-no-print" markdown="1">
### 📄 Download

<button type="button" class="cv-print-btn" onclick="window.print()">Save as PDF</button>

Tip: in the browser print dialog, choose "Save as PDF" and disable headers/footers for a clean output.

</div>

