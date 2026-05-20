---
layout: page
title: Curriculum
permalink: /cv/
---

<div class="cv-no-print" markdown="1">
🇧🇷 [Versão em Português](/cv-pt/)
</div>

## Vitor Holanda

Contact: vitor.holanda@ccc.ufcg.edu.br · bartmoss77@tutanota.com  

[GitHub](https://github.com/VitorHolandaI) · [LinkedIn](https://www.linkedin.com/in/vitor-holanda-465b20259/) · [Blog](https://bitssand.blog/) · [Projetos](https://bitssand.blog/projects/)


### Technical Skills & Technologies

- **AI / LLM Engineering:** LangChain, LangGraph, MCP (Model Context Protocol), tool calling, agentic workflows, RAG (Retrieval-Augmented Generation), hybrid search (semantic + lexical), reranking (BGE-reranker, cross-encoder), embeddings, vector databases, prompt engineering, prompt-injection / red teaming, structured outputs with Pydantic, OpenAI-compatible APIs
- **LLM Evaluation & Observability:** Arize Phoenix, custom evaluation metrics, tracing, token-cost & throughput analysis
- **Operating Systems:** Linux, FreeBSD
- **Containers & DevOps:** Docker, Podman, Git, Kubernetes (academic use: app deployment and load testing), Ansible (light configuration management)
- **SRE & Reliability:** Incident response, runbooks/playbooks, post-mortems, failover (hot-standby), disaster recovery (DR) drills, high availability (HA), observability (Zabbix, Checkmk), host/service availability monitoring
- **Networking & Systems:** Network administration, system administration, virtualization (KVM, Proxmox), DNS stack management, pfSense firewalls
- **Programming & Development:** Python (Flask, FastAPI), C++, Java, Haskell, Prolog, React
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

#### Infrastructure & Virtualization
- Designed and implemented infrastructure to host services for the laboratory community.
- Planned and deployed **KVM-based virtualization stacks** from scratch, significantly expanding service capacity and flexibility.
- Designed, assembled, and managed physical servers and workstations supporting virtualized environments, using **Proxmox** and **KVM**.
- Built and configured **on-demand machines and test-lab environments** for lab members (researchers, students, partner projects), specifying hardware, assembling, and provisioning systems according to each use case.

#### Storage, Backup, Reliability & Disaster Recovery
- Designed and implemented **backup infrastructure** for KVM virtual machines and file-based workloads, including **encrypted backup validation tests** (restore drills) to verify that backups were actually recoverable, not just written successfully.
- Configured and managed **Dell servers** and general-purpose servers.
- Started with a **TrueNAS-based backup setup** and later **migrated to a fully custom backup server**, built in-house for greater control, lower cost, and higher capacity.
- For the custom server, **evaluated all candidate drives** available at the lab — running diagnostics and inspecting **SMART data (including power-on hours / drive uptime)** — to select the disks with the lowest wear for the array.
- Built the final server on **Rocky Linux 9** with six 2.5" drives in **RAID 10**, mounted in a **custom 3D-printed drive holder**, ensuring high redundancy and data integrity.
- Maintained **VM snapshot policies** as part of the lab's **disaster recovery (DR)** strategy, enabling rapid rollback after failed updates or hardware events.

#### Networking & Connectivity
- Performed **network planning and design** for the lab, including segmentation, growth capacity, and rack/distribution layout.
- Administered and configured **network switches**, including **VLAN management**, port assignments, trunking, and link aggregation, enabling proper traffic segmentation and isolation across services and tenants.
- Managed the laboratory's full **DNS stack**, including internal zones and resolution for lab services and VMs.
- Simulated and validated network topologies using **Cisco Packet Tracer**.
- Standardized and reorganized server rack infrastructure, including **structured cabling** with a cascading architecture, improving network design, throughput, and maintainability.
- Identified and resolved a pre-existing bottleneck caused by **disorganized cabling and outdated 100 Mb/s links**, upgrading the network to **stable 1 Gb/s connectivity** and enabling full utilization of available bandwidth.
- Configured and optimized **Ubiquiti UniFi access points** and administered the **UniFi Controller** to maximize wireless coverage and performance.
- Repurposed legacy networking equipment by installing **OpenWrt** on older routers, extending hardware lifecycle and reducing costs.

#### Security, Firewalling & Access Control
- Administered and secured **pfSense firewalls**, including:
  - Replaced an **insecure legacy backup script that stored credentials in plaintext** with **documented best practices** and **secure, encrypted configuration backups**
  - Management of VPNs, threat detection, monitoring, and advisory systems
- Deployed and maintained **security and monitoring tools**, including **OpenVAS** for vulnerability scanning.
- Developed a **prototype access-control system** using security cameras and AI for controlled laboratory access and person identification.
- Maintained a **hot-standby physical backup machine for pfSense**, enabling rapid replacement of the primary firewall and minimizing downtime — used in real incidents (e.g., UPS short-circuit event, see Incident Response below).
- Also evaluated running pfSense inside a **Proxmox VM** for centralized management, but the network link proved unstable in that configuration, so the **physical hot-standby remained the production failover path** — a deliberate choice based on observed reliability rather than convenience.

#### Observability, Monitoring & Power Continuity
- Built and operated the lab's **observability stack**, initially with **Zabbix** and later **migrating to Checkmk** as the primary monitoring system, complemented by **UniFi Manager** and virtualization management tools, providing **host and service availability metrics** for lab-hosted services.
- Configured **alerting and on-call notification** flows for service and host failures, enabling early detection and faster **incident response**.
- Developed a **monitoring dashboard** (Python, HTML, CSS) to track **UPS (no-break) status** during power outages, surfacing battery state and runtime to support operator decisions.
- Mitigated internet downtime during power failures by extending UPS capacity for a centralized university internet concentrator, sustaining approximately **1 hour of continued connectivity** (effective availability improvement during grid events).

#### Incident Response & Operational Reliability
- Owned **incident response** for the lab as the single on-call operator: triage, mitigation, communication, and recovery for outages affecting servers, network, firewall, and end-user services.
- **Documented post-incident runbooks/playbooks** after each significant event, capturing root cause, mitigation steps, and follow-up actions to speed up recovery on recurrence.
- Example incident: **UPS short-circuit** that tripped the room's circuit breakers — executed live mitigation by cutting power to the affected machine (which had been damaged inside the UPS) and **triggered the pfSense hot-standby failover**, restoring network and firewall services with minimal downtime.
- Handled recurring **power-grid variations and surges** as a preventive operator: when conditions looked unsafe, **proactively alerted the entire lab to disconnect equipment** or **cut power at the breaker panel**, protecting sensitive hardware from damage.
- Performed periodic **disaster recovery drills**, including restore validation of **encrypted VM backups** to confirm the backup pipeline produced recoverable artifacts (not just successful writes).
- While the lab's **DVR was broken and no surveillance cameras were available**, designed and built an **improvised camera system** for the support room (where all critical equipment was stored), using a **Banana Pi M2 Zero** and a **scavenged notebook webcam**, restoring basic on-site visibility from spare parts at zero cost.

#### Asset Management & Procurement
- Implemented **asset tracking and property accounting (patrimônio)** by maintaining an inventory of serial numbers and university asset tags, supporting audits and identification of laboratory-owned equipment.

#### Automation, Configuration Management & Platforms
- Deployed and managed services using **Docker** for containerized workloads and service isolation; also explored **Podman** as a daemonless alternative.
- Used **Ansible** for selected configuration management and repeatable setup tasks across lab hosts (lightweight IaC).

#### General Systems Administration & End-User Support
- Performed general system administration tasks, including:
  - **Budget planning, vendor quotations, and procurement** of IT equipment for the laboratory
  - Preparation of technical specifications and price comparisons to support purchase decisions
  - Maintenance of notebooks, desktops, printers, projectors, UPS units, and power supplies
- Provided **hands-on end-user support** for faculty and lab members: software installation, PC troubleshooting, projector swaps, and on-site equipment setup/teardown.
- Diagnosed and **repaired a broken DVR** received non-functional, restoring it to working condition and avoiding replacement cost.


### **AI / LLM Engineer & Applied Researcher** – LSD-DELL, UFCG
*April 2025 – April 2026 (Part-time)*

Part of a cross-functional team building **LLM-powered agents** for
Dell customer support. Hybrid AI engineering + applied research role:
**Python**-based development in Agile sprints with peer code review
via Pull Requests and integration through Dell's internal CI/CD
pipeline, alongside benchmarking, model evaluation, and
literature-driven experimentation.

#### LLM Agents, Tool Use & Applied Research
- Built **LLM-powered agents** in **Python** using **LangChain** and **LangGraph**, including **tool calling**, **agentic workflows**, and experiments with **MCP (Model Context Protocol) servers** for extensible tool integration.
- Consumed Dell's **internally hosted LLMs** via an **OpenAI-compatible API** (same `openai` SDK pattern, internal `base_url`), so all client code remained portable across providers.
- Implemented **structured outputs** with **Pydantic models** as response schemas (`response_model`-style), ensuring strict type validation of LLM outputs and reliable downstream parsing.
- Applied **input/output validation via Pydantic** as a lightweight guardrail layer to reject malformed or out-of-schema responses before they reached downstream systems.
- Conducted **prompt engineering and prompt-injection (red teaming) tests**, identifying vulnerabilities and contributing fixes to improve agent robustness and safety.
- Deployed a **web-based interface** for testing LLM APIs and services when remote VDI environments restricted required tooling, unblocking the team's experimentation workflow.

#### Retrieval-Augmented Generation (RAG) & Hybrid Search
- Worked on a **FAQ system built on Retrieval-Augmented Generation (RAG)** using a **vector database** for similarity search over a knowledge base of customer-support content.
- Used **internally hosted embedding models** (served via the same OpenAI-compatible API) to encode documents and queries.
- Modified and tested **hybrid search** (semantic + lexical) to improve retrieval relevance and answer accuracy.
- Integrated **reranking** with **BGE-reranker / cross-encoder** models on top of the initial retrieval stage to lift top-k precision before passing context to the LLM.
- Produced evaluation reports on RAG system quality and implementation status.

#### LLM Evaluation, Benchmarking & Model Selection
- Designed and ran **LLM evaluations** using **Arize Phoenix** as the observability/eval platform, including:
  - **Custom evaluation metrics** for task-specific quality
  - Analysis of **agent behavior**, **response quality**, **throughput**, and **token-cost** trade-offs
  - Tracing of agent runs to debug tool-use and retrieval paths
- Deployed **state-of-the-art LLM benchmarks** to support **data-driven model selection** (e.g., choosing the most suitable models for translation tasks).
- Performed **descriptive statistical analysis** on evaluation datasets, including **prompt/response token-usage** profiling for cost optimization.

#### Data Engineering & Dataset Expansion
- Expanded an evaluation dataset from **42 to over 120 questions**, increasing coverage, variability, and robustness for LLM agent testing.
- Contributed as part of the team to **multilingual dataset translation** using LLMs to enable evaluation across different languages.
- Researched, reviewed, and implemented benchmarking methodologies from state-of-the-art academic literature on machine translation and LLM evaluation.

---

### **Academic Tutoring (Volunteer Work)** – UFCG

**Teaching Assistant (Volunteer)**  
*Graph Theory & Concurrent Programming*

- Assisted professors during laboratory and practical sessions for undergraduate courses.
- Supported students with problem-solving, algorithm design, and theoretical concepts in **Graph Theory**.
- Helped students during hands-on activities, clarifying assignments and providing technical guidance.
- Assisted in the correction and review of student assignments and exercises.
- Acted as a bridge between students and faculty, reinforcing course content and improving learning outcomes.


### **Volunteer IT Support & Systems Maintenance** – Guardians Group, UFCG

**Volunteer – Computer Science Department**

- Provided general IT maintenance and troubleshooting for the Computer Science department, supporting faculty, staff, and students.
- Assisted with deployment and reinstallation of **Linux and Windows operating systems** on laboratory and staff machines.
- Helped with **network cabling, basic network setup**, and device organization across laboratories.
- Maintained and updated inventories of departmental equipment, including desktops, notebooks, projectors, and peripherals.
- Recovered and repurposed an **abandoned SonicWall firewall**, configuring it as a sandbox and learning playground for students.
- Participated in the **“Imagem Prova – Version 1” project**, involving the creation of a **customized Linux image** used during exams to ensure fairness by restricting unauthorized tools and resources.
- Developed a **Bash-based access control solution** using `iptables` and `dig` to enforce a **custom domain whitelist/blacklist**, limiting network access to approved domains during assessments.
- Actively supported day-to-day maintenance activities across multiple computer labs, ensuring system availability and reliability.



---

<div class="cv-no-print" markdown="1">
### 📄 Download

<button type="button" class="cv-print-btn" onclick="window.print()">Save as PDF</button>

Tip: in the browser print dialog, choose "Save as PDF" and disable headers/footers for a clean output.

### Projects
[See my projects](https://bitssand.blog/projects/)
</div>

