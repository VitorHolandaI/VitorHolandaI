---
layout: page
title: Currículo
permalink: /cv-pt/
---

🇺🇸 [English version](/cv/)

## Vitor Holanda

Contato: vitor.holanda@ccc.ufcg.edu.br · bartmoss77@tutanota.com

[GitHub](https://github.com/VitorHolandaI) · [LinkedIn](https://www.linkedin.com/in/vitor-holanda-465b20259/) · [Blog](https://bitssand.blog/) · [Projetos](https://bitssand.blog/projects/)


### Formação

---
**Bacharelado em Ciência da Computação**
Universidade Federal de Campina Grande
2020 – 2026


### Experiência

---

### **Administrador de Sistemas / Analista de Sistemas** – SPLab, UFCG (Meio período) Nov 2023 – Abril 2025

#### Infraestrutura & Virtualização
- Projetei e implantei infraestrutura para hospedar serviços para a comunidade do laboratório.
- Planejei e implantei **stacks de virtualização baseadas em KVM** do zero, expandindo significativamente a capacidade e flexibilidade de serviços.
- Projetei, montei e gerenciei servidores físicos e estações de trabalho com ambientes virtualizados, utilizando **Proxmox** e **KVM**.

#### Armazenamento, Backup & Confiabilidade
- Projetei e implantei **infraestrutura de backup** para máquinas virtuais KVM e cargas de trabalho baseadas em arquivos.
- Configurei e gerenciei **servidores Dell** e servidores de uso geral.
- Implantei um servidor de backup customizado com seis drives de 2,5" em **RAID 10**, montados em um **suporte impresso em 3D**, garantindo alta redundância e integridade dos dados.

#### Redes & Conectividade
- Simulei e validei topologias de rede usando **Cisco Packet Tracer**.
- Padronizei e reorganizei a infraestrutura do rack de servidores, incluindo **cabeamento estruturado** com arquitetura em cascata, melhorando o design de rede, throughput e manutenibilidade.
- Atualizei a infraestrutura de rede de **links instáveis de 100 Mb/s para conectividade estável de 1 Gb/s**, permitindo utilização plena da banda disponível.
- Configurei e otimizei **pontos de acesso Ubiquiti UniFi** e administrei o **UniFi Controller** para maximizar cobertura e desempenho wireless.
- Reaproveitei equipamentos de rede legados instalando **OpenWrt** em roteadores antigos, estendendo a vida útil do hardware e reduzindo custos.

#### Segurança, Firewall & Controle de Acesso
- Administrei e protegi **firewalls pfSense**, incluindo:
  - Migração de backups ad-hoc baseados em scripts para boas práticas documentadas
  - Backups de configuração seguros e criptografados
  - Gerenciamento de VPNs, detecção de ameaças, monitoramento e sistemas de alerta
- Implantei e mantive **ferramentas de segurança e monitoramento**, incluindo **OpenVAS** para varredura de vulnerabilidades.
- Desenvolvi um **protótipo de sistema de controle de acesso** usando câmeras de segurança e IA para acesso controlado ao laboratório e identificação de pessoas.
- Implementei **backups de firewall em hot-standby**, permitindo substituição rápida em caso de falha do firewall principal.

#### Monitoramento, Gestão de Ativos & Continuidade de Energia
- Implantei e gerenciei sistemas de monitoramento, incluindo **Zabbix**, **Checkmk**, **UniFi Manager** e ferramentas de gerenciamento de virtualização.
- Implementei **rastreamento de ativos** mantendo inventário de números de série para identificar e gerenciar equipamentos do laboratório.
- Desenvolvi um **dashboard de monitoramento** (Python, HTML, CSS) para acompanhar o **status de no-breaks (UPS)** durante quedas de energia.
- Mitigei quedas de internet durante falhas de energia estendendo a capacidade do UPS para o concentrador de internet da universidade, garantindo aproximadamente **1 hora de conectividade contínua**.

#### Automação, Containers & Plataformas
- Implantei e gerenciei serviços usando **Docker** para cargas de trabalho containerizadas e isolamento de serviços.

#### Administração Geral de Sistemas
- Realizei tarefas gerais de administração de sistemas, incluindo:
  - Planejamento orçamentário e aquisição de equipamentos para o laboratório
  - Manutenção de notebooks, desktops, impressoras, projetores, no-breaks e fontes de alimentação


### **Desenvolvedor de Agentes Inteligentes & Pesquisa** – LSD-DELL, UFCG
*Abril 2025 – Presente (Meio período)*

#### Agentes LLM & Pesquisa Aplicada
- Auxiliei no desenvolvimento de **agentes inteligentes** para melhorar fluxos de atendimento ao cliente da Dell.
- Desenvolvi **agentes baseados em LLM** usando **LangChain** e **LangGraph**, incluindo experimentos com **tool calling** e **servidores MCP**.
- Prototipei e avaliei arquiteturas de agentes para cenários reais de interação com clientes.
- Conduzi **testes de engenharia de prompt e prompt-injection (red teaming)**, identificando vulnerabilidades e contribuindo com correções para melhorar robustez e segurança dos agentes.

#### Benchmarking, Avaliação & Seleção de Modelos
- Implantei **benchmarks de LLMs estado da arte** para apoiar tomada de decisão baseada em dados (ex.: seleção dos modelos mais adequados para tarefas de tradução).
- Realizei benchmarking de múltiplas abordagens de LLM usando **Arize Phoenix**, incluindo:
  - Implementação de métricas de avaliação customizadas
  - Análise de comportamento de agentes, latência e qualidade de respostas
- Realizei **análise estatística descritiva** em datasets, incluindo análise de uso de tokens em prompts e respostas.

#### Engenharia de Dados & Expansão de Dataset
- Expandi um dataset de avaliação de **42 para mais de 120 questões**, aumentando cobertura, variabilidade e robustez para testes de agentes LLM.
- Conduzi **tradução multilíngue de datasets** usando LLMs para suportar avaliação em diferentes idiomas.
- Pesquisei, revisei e implementei benchmarks da literatura acadêmica focados em tradução automática e avaliação de LLMs.

#### Recuperação, Busca & Sistemas RAG
- Avaliei um **sistema de FAQ usando Geração Aumentada por Recuperação (RAG)**, produzindo relatórios sobre qualidade e status de implementação.
- Modifiquei e testei **abordagens de busca híbrida** (semântica + lexical) para melhorar relevância e precisão das respostas.

#### Ferramentas, APIs & Suporte de Infraestrutura
- Implantei uma **interface web** para testar APIs e serviços de LLM quando ambientes VDI remotos restringiam as ferramentas necessárias.

---

### **Monitoria Acadêmica (Voluntário)** – UFCG

**Monitor (Voluntário)**
*Teoria dos Grafos & Programação Concorrente*

- Auxiliei professores durante aulas de laboratório e sessões práticas em cursos de graduação.
- Apoiei estudantes na resolução de problemas, design de algoritmos e conceitos teóricos em **Teoria dos Grafos**.
- Ajudei estudantes durante atividades práticas, esclarecendo trabalhos e fornecendo orientação técnica.
- Auxiliei na correção e revisão de trabalhos e exercícios de estudantes.
- Atuei como ponte entre estudantes e docentes, reforçando o conteúdo das disciplinas e melhorando os resultados de aprendizagem.


### **Suporte de TI & Manutenção de Sistemas (Voluntário)** – Guardians Group, UFCG

**Voluntário – Departamento de Ciência da Computação**

- Realizei manutenção geral de TI e troubleshooting para o departamento, apoiando docentes, servidores e estudantes.
- Auxiliei na implantação e reinstalação de **sistemas operacionais Linux e Windows** em máquinas de laboratório e equipe.
- Ajudei com **cabeamento de rede, configuração básica de rede** e organização de dispositivos nos laboratórios.
- Mantive e atualizei inventários de equipamentos departamentais, incluindo desktops, notebooks, projetores e periféricos.
- Recuperei e reaproveitei um **firewall SonicWall abandonado**, configurando-o como sandbox para aprendizado dos estudantes.
- Participei do projeto **"Imagem Prova – Versão 1"**, envolvendo a criação de uma **imagem Linux customizada** usada em provas para garantir imparcialidade, restringindo ferramentas não autorizadas.
- Desenvolvi uma **solução de controle de acesso em Bash** usando `iptables` e `dig` para impor uma **lista de permissão/bloqueio de domínios**, limitando o acesso à rede a domínios aprovados durante avaliações.
- Apoiei ativamente atividades de manutenção cotidiana em múltiplos laboratórios de informática, garantindo disponibilidade e confiabilidade dos sistemas.



### **Habilidades Técnicas & Tecnologias**

- **Sistemas Operacionais:** Linux, FreeBSD
- **Containers & DevOps:** Docker, Git
- **Redes & Sistemas:** Administração de redes, administração de sistemas, virtualização (KVM, Proxmox)
- **Programação & Desenvolvimento:** Python (Flask, FastAPI), C++, Java, Haskell, Prolog, React
- **Sistemas Embarcados & Hardware:** SBCs, microcontroladores, programação embarcada


---

### 📄 Download
[Download Currículo (PDF – PT)](/assets/cv-pt.pdf)

### Projetos
[Ver meus projetos](https://bitssand.blog/projects/)
