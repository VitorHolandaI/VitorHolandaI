---
layout: page
title: Curriculum
permalink: /cv/
---

## Vitor Holanda

Contact: vitor.holanda@ccc.ufcg.edu.br · bartmoss77@tutanota.com  
[GitHub](https://github.com/VitorHolandaI) · [LinkedIn](https://www.linkedin.com/in/vitor-holanda-465b20259/)


### Education

---
**BSc in Computer Science**  
Universidade Federal de Campina Grande
2020 – 2026


### Experience

---

### **System Administrator / Systems Analyst** – SPLab, UFCG (Part-time) Nov 2023 - April 2025

#### Infrastructure & Virtualization
- Designed and implemented infrastructure to host services for the laboratory community.
- Planned and deployed **KVM-based virtualization stacks** from scratch, significantly expanding service capacity and flexibility.
- Designed, assembled, and managed physical servers and workstations supporting virtualized environments, using **Proxmox** and **KVM**.

#### Storage, Backup & Reliability
- Designed and implemented **backup infrastructure** for KVM virtual machines and file-based workloads.
- Configured and managed **Dell servers** and general-purpose servers.
- Deployed a custom backup server using six 2.5" drives in **RAID 10**, mounted in a **custom 3D-printed drive holder**, ensuring high redundancy and data integrity.

#### Networking & Connectivity
- Simulated and validated network topologies using **Cisco Packet Tracer**.
- Standardized and reorganized server rack infrastructure, including **structured cabling** with a cascading architecture, improving network design, throughput, and maintainability.
- Upgraded network infrastructure from inconsistent **100 Mb/s links to stable 1 Gb/s connectivity**, enabling full utilization of available bandwidth.
- Configured and optimized **Ubiquiti UniFi access points** and administered the **UniFi Controller** to maximize wireless coverage and performance.
- Repurposed legacy networking equipment by installing **OpenWrt** on older routers, extending hardware lifecycle and reducing costs.

#### Security, Firewalling & Access Control
- Administered and secured **pfSense firewalls**, including:
  - Migration from ad-hoc script-based backups to documented best practices
  - Secure, encrypted configuration backups
  - Management of VPNs, threat detection, monitoring, and advisory systems
- Deployed and maintained **security and monitoring tools**, including **OpenVAS** for vulnerability scanning.
- Developed a **prototype access-control system** using security cameras and AI for controlled laboratory access and person identification.
- Implemented **hot-standby firewall backups**, allowing rapid replacement in case of primary firewall failure.

#### Monitoring, Asset Management & Power Continuity
- Deployed and managed monitoring systems, including **Zabbix**, **Checkmk**, **UniFi Manager**, and virtualization management tools.
- Implemented **asset tracking** by maintaining an inventory of system serial numbers to identify and manage laboratory-owned equipment.
- Developed a **monitoring dashboard** (Python, HTML, CSS) to track **UPS system status** during power outages.
- Mitigated internet downtime during power failures by extending UPS capacity for a centralized university internet concentrator, enabling approximately **1 hour of continued connectivity**.

#### Automation, Containers & Platforms
- Deployed and managed services using **Docker** for containerized workloads and service isolation.

#### General Systems Administration
- Performed general system administration tasks, including:
  - Budget planning and procurement of laboratory equipment
  - Maintenance of notebooks, desktops, printers, projectors, UPS units, and power supplies


### **Smart Agents & Research Developer** – LSD-DELL, UFCG  
*April 2025 – Present (Part-time)*

#### LLM Agents & Applied Research
- Assisted in the development of **smart agents** aimed at improving Dell customer support workflows.
- Developed **LLM-based agents** using **LangChain** and **LangGraph**, including experiments with **tool calling** and **MCP servers**.
- Prototyped and evaluated agent architectures for real-world customer interaction scenarios.
- Conducted **prompt engineering and prompt-injection (red teaming) tests**, identifying vulnerabilities and contributing fixes to improve agent robustness and safety.

#### Benchmarking, Evaluation & Model Selection
- Deployed **state-of-the-art LLM benchmarks** to support data-driven decision-making (e.g., selecting the most suitable models for translation tasks).
- Benchmarked multiple LLM approaches using **Arize Phoenix**, including:
  - Implementation of custom evaluation metrics
  - Analysis of agent behavior, latency, and response quality
- Performed **descriptive statistical analysis** on datasets, including token usage analysis for prompts and responses.

#### Data Engineering & Dataset Expansion
- Expanded an evaluation dataset from **42 to over 120 questions**, increasing coverage, variability, and robustness for LLM agent testing.
- Conducted **multilingual dataset translation** using LLMs to support evaluation across different languages.
- Researched, reviewed and implemented benchmarking from state-of-the-art academic literature focused on machine translation and LLM evaluation.

#### Retrieval, Search & RAG Systems
- Evaluated an existing **FAQ system using Retrieval-Augmented Generation (RAG)**, producing reports on system quality and implementation status.
- Modified and tested **hybrid search approaches** (semantic + lexical) to improve LLM response relevance and accuracy.

#### Tooling, APIs & Infrastructure Support
- Deployed a **web-based interface** for testing APIs and LLM services when remote VDI environments restricted required tooling.

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



### **Technical Skills & Technologies**

- **Operating Systems:** Linux, FreeBSD
- **Containers & DevOps:** Docker, Git
- **Networking & Systems:** Network administration, system administration, virtualization (KVM, Proxmox)
- **Programming & Development:** Python (Flask, FastAPI), C++, Java, Haskell, Prolog, React
- **Embedded Systems & Hardware:** SBCs, microcontrollers, embedded programming


---

### 📄 Download
[Download CV (PDF)](/assets/cv.pdf)

### Projects
[See my projects](/projects/)

