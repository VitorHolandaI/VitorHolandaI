---
layout: page
title: Currículo
permalink: /cv-pt/
---

<div class="cv-no-print" markdown="1">
🇺🇸 [English version](/cv/)
</div>

## Vitor Holanda

Contato: vitor.holanda@ccc.ufcg.edu.br · bartmoss77@tutanota.com

[GitHub](https://github.com/VitorHolandaI) · [LinkedIn](https://www.linkedin.com/in/vitor-holanda-465b20259/) · [Blog](https://bitssand.blog/) · [Projetos](https://bitssand.blog/projects/) · [Infra](https://bitssand.blog/infra/)


### Resumo

Bacharel em Ciência da Computação (UFCG) com trajetória que une infraestrutura de missão crítica, engenharia de confiabilidade e Inteligência Artificial aplicada em produção:

- **Infraestrutura, SRE & Confiabilidade (1 ano e 5 meses):** Como único administrador de sistemas e operador on-call de um prédio de pesquisa de ~20 salas (SPLab), construí a infraestrutura que não existia. Projetei e implantei ~20 VLANs em uma rede anteriormente plana, cabeamento estruturado para 1 Gb/s estável, servidores físicos com Proxmox/KVM, rotinas de backup criptografado e desduplicado com Restic e ZFS RAID 10 (com restore drills periódicos), firewall pfSense em cold-standby e monitoramento proativo com Checkmk e dashboard customizado de telemetria de no-breaks (NUT) com mais de 255 mil logs reais em quedas de energia. Cobri todo o espectro operacional: do suporte presencial e helpdesk até a resposta a incidentes críticos e elaboração de runbooks.
- **Engenharia de IA & LLMs em Produção (1 ano):** Atuei no LSD-DELL desenvolvendo agentes baseados em LLMs para suporte corporativo. Entreguei Python em produção com integração contínua (CI/CD), tool calling, servidores MCP, pipelines avançados de RAG com busca híbrida (BM25 + vetorial + RRF) e reranking (BGE-reranker), além de observabilidade e tracing ponta a ponta com Arize Phoenix e testes de segurança contra prompt-injection.
- **Liderança Técnica (Atual):** Atualmente lidero tecnicamente um time de engenharia de IA em projeto do setor público, definindo a arquitetura de sistemas multi-agentes orquestrados com LangGraph, inferência de modelos locais auto-hospedados (Ollama e llama.cpp), padrões de qualidade de código, cobertura de testes e mentoria técnica da equipe.

Domínio completo da pilha: monto o rack e a rede física embaixo, opero a confiabilidade e os serviços no meio, e construo os sistemas de IA que rodam em cima.


### Habilidades Técnicas & Tecnologias

- **Confiabilidade & Incidentes:** On-call (operador principal), resposta a incidentes, elaboração de runbooks/playbooks, exercícios de disaster recovery (DR), validação de restore criptografado (Restic), procedimentos de failover, follow-up de post-mortem, redução de toil
- **Observabilidade:** Checkmk, Zabbix, ntopng, NUT (Network UPS Tools), dashboards customizados de telemetria (Python/Flask); Prometheus & Grafana (em progresso)
- **Containers & Virtualização:** Docker, Docker Compose, Podman, KVM, Proxmox, Kubernetes (lab / k3s em progresso), hardening de containers
- **Infraestrutura como Código & Automação:** Ansible, Terraform (lab), scripts em Bash, automação em Python
- **CI/CD:** GitHub Actions (pipelines de teste, build e release)
- **Redes:** VLANs (802.1Q), trunking, link aggregation (LAG), pfSense, stack DNS, OpenWrt, UniFi Controller, TCP/IP
- **Segurança:** Políticas de firewall default-deny, Suricata (IDS/IPS), OpenVAS, Bitwarden (gestão de credenciais e segredos), higiene de segredos, testes de prompt-injection
- **Nuvem & Plataformas:** Sistemas on-premise / auto-hospedados, Linux (Debian, Ubuntu, Rocky Linux), FreeBSD (pfSense), AWS (VPC, IAM, EC2, S3 em progresso)
- **Linguagens de Programação:** Python (produção), Bash, C++, Rust, TypeScript, Java; Go (em progresso)
- **Engenharia de IA & LLM:** LangChain, LangGraph (sistemas multi-agentes), modelos locais (Ollama, llama.cpp), MCP (Model Context Protocol), RAG, busca híbrida (BM25 + vetorial denso + RRF), BGE-reranker, bancos de dados vetoriais, structured outputs com Pydantic, Arize Phoenix (avaliação e tracing)


### Experiência

---

### **Líder Técnico, Engenharia de IA** – LSD, UFCG (projeto com órgão do governo)
*Maio 2026 – Atual*  
**Stack:** Python · LangGraph (Sistemas Multi-Agentes) · Ollama · llama.cpp · Modelos Locais · Pydantic · Git

Liderança técnica de um time pequeno de engenharia de IA num projeto do setor público, atuando junto de um professor e de um gerente de projeto. O domínio e os dados do projeto estão sob confidencialidade.

- Arquitetura e definição da stack técnica do projeto: desenvolvimento em **Python**, inferência de **modelos locais** auto-hospedados via **Ollama** e **llama.cpp**, e orquestração de **sistemas multi-agentes com LangGraph**.
- Definição da direção técnica, design de sistemas e decisões de arquitetura para confiabilidade dos pipelines de execução dos agentes.
- Condução de revisões de código rigorosas no repositório, garantindo cobertura de testes, consistência e manutenibilidade.
- Planejamento de sprints, divisão de tarefas e orientação técnica contínua para a equipe de engenharia.

### **Engenheiro de IA / LLM & Pesquisador Aplicado** – LSD-DELL, UFCG
*Abril 2025 – Abril 2026 (Meio período)*  
**Stack:** Python · LangChain · LangGraph · MCP · RAG · Arize Phoenix · BM25 / RRF · BGE-reranker · Pydantic · CI/CD

Parte de uma equipe multifuncional construindo **agentes baseados em LLM** para o suporte ao cliente da Dell. Função híbrida de engenharia de IA + pesquisa aplicada: desenvolvimento em **Python** em sprints Ágeis com revisão por pares via Pull Requests e integração contínua pelo pipeline interno de CI/CD da Dell, junto a benchmarks e avaliação de modelos guiada pela literatura.

#### Agentes LLM, Uso de Ferramentas & Pesquisa Aplicada
- Construí **agentes baseados em LLM** em **Python** usando **LangChain** e **LangGraph**, incluindo **tool calling**, **workflows agênticos** e experimentos com **servidores MCP (Model Context Protocol)** para integração extensível de ferramentas.
- Consumi os **LLMs hospedados internamente pela Dell** através de uma **API compatível com a OpenAI** (padrão oficial da biblioteca `openai`, com `base_url` interna), mantendo o código cliente portável entre provedores.
- Implementei **saídas estruturadas (structured outputs)** com **modelos Pydantic** como schema de resposta (estilo `response_model`), garantindo validação estrita de tipos nas saídas do LLM e parsing confiável a jusante.
- Apliquei **validação de entrada/saída via Pydantic** como camada de guardrail leve, rejeitando respostas mal-formadas ou fora do schema antes de chegarem aos sistemas subsequentes.
- Executei **testes de prompt-injection** contra os agentes, focados em evasão de comportamento e quebra de guardrails; reportei vulnerabilidades e contribuí com correções de segurança.
- Desenvolvi e implantei uma **interface web interna** para testes de APIs e serviços de LLM quando ambientes remotos em VDI restringiam ferramentas locais, viabilizando a experimentação do time.

#### Geração Aumentada por Recuperação (RAG) & Busca Híbrida
- Desenvolvi um **sistema corporativo de FAQ baseado em RAG** utilizando **banco de dados vetorial** para busca por similaridade sobre a base de conhecimento de suporte.
- Integrei **modelos de embeddings hospedados internamente** (servidos pela mesma API compatível com OpenAI) para vetorização de documentos e consultas.
- Implementei e avaliei **busca híbrida**: combinando **BM25** (lexical) com recuperação vetorial densa, fundidos via **RRF (Reciprocal Rank Fusion)**, comparados contra o baseline de recuperação anterior.
- Integrei **reranking** com modelos **BGE-reranker / cross-encoder** sobre o estágio inicial de recuperação, elevando expressivamente a precisão top-k antes do envio do contexto ao LLM.
- Produzi relatórios técnicos de avaliação cobrindo a qualidade da recuperação, performance e status da arquitetura RAG.

#### Avaliação de LLMs, Benchmarking & Observabilidade
- Projetei e executei **avaliações abrangentes de LLMs** utilizando o **Arize Phoenix** como plataforma de observabilidade e eval:
  - Desenvolvimento de **métricas customizadas** para aferição de qualidade contextual.
  - Análise de **comportamento dos agentes**, **qualidade de resposta**, **throughput** e trade-offs de **custo em tokens**.
  - Tracing detalhado de execuções para depuração de chamadas de ferramentas e rotas de recuperação.
- Avaliei modelos em benchmarks públicos (**MMMLU** para conhecimento geral multilíngue, **MGSM** para raciocínio matemático multilíngue) para guiar a seleção de modelos baseada em dados.
- Criei novas questões expandindo o dataset de avaliação interno de **42 para mais de 120 questões**, aumentando a cobertura e variabilidade dos testes.

### **Administrador de Sistemas / Engenheiro de Confiabilidade (Único operador on-call)** – SPLab, UFCG (Meio período)
*Nov 2023 – Abril 2025*  
**Stack:** Linux (Rocky/Debian) · ZFS (RAID 10) · Restic · Proxmox/KVM · pfSense · VLANs (802.1Q) · Checkmk · Docker · Ansible · Bitwarden · NUT (Python)

Único administrador de sistemas e operador on-call responsável por toda a infraestrutura de TI de um prédio de pesquisa de ~20 salas (~10 salas de professores, laboratórios de pós-graduação e projetos em parceria com empresas privadas e órgãos públicos), respondendo por servidores, redes, virtualização, firewall, observabilidade, resposta a incidentes e confiabilidade operacional.

Ser a única pessoa significava que engenharia de plataforma e operação física eram a mesma função. Um dia típico ia de projetar segmentação por VLANs e cabeamento estruturado até resolver drivers de impressão, integrar novos pesquisadores, instalar estações de trabalho ou trocar equipamentos no teto em cima de uma escada. Tudo abaixo foi construído entre essas interrupções operacionais cotidianas, não isolado delas.

#### Infraestrutura & Virtualização
- Planejei e implantei stacks de virtualização baseadas em KVM do zero, expandindo expressivamente a capacidade e a flexibilidade de hospedagem de serviços no prédio.
- Ampliei a capacidade computacional: o laboratório contava originalmente com apenas um servidor rodando VMs. Especifiquei, montei e coloquei em operação **dois novos servidores físicos** (um dedicado a cargas de produção, outro dedicado ao armazenamento de backups de VMs), gerenciados junto às estações via **Proxmox** e **KVM**.
- Provisionei máquinas e ambientes de laboratório sob demanda para pesquisadores e projetos parceiros, selecionando hardware, montando nós físicos e disponibilizando VMs com autogestão delegada, mantendo a posse da plataforma e o suporte a escalações técnicas.

#### Armazenamento, Backup, Confiabilidade & Disaster Recovery
- Projetei e construí a capacidade de backup do laboratório partindo do zero: implantei inicialmente um setup com TrueNAS, evoluindo para um **servidor de backup customizado com Rocky Linux 9** e **pool ZFS em RAID 10 (mirrors em stripe)** montado com discos do próprio lab em suporte impresso em 3D. O ZFS foi adotado deliberadamente pelos **checksums fim-a-fim** para prevenir e detectar corrupção silenciosa de dados.
- Implantei o **Restic** para rotinas de backup automatizadas, desduplicadas e criptografadas de sistemas e configurações críticas, estabelecendo políticas de retenção de snapshots e verificação de integridade dos repositórios.
- Avaliei previamente os discos disponíveis no laboratório rodando diagnósticos e analisando **atributos SMART (incluindo horas de uso)** para selecionar as unidades com menor desgaste para o array de produção.
- Conduzi **exercícios periódicos de disaster recovery (DR)**, validando procedimentos de **restore de backups criptografados com Restic e snapshots de VMs** para garantir que as cópias eram confiavelmente recuperáveis, e não apenas escritas com sucesso.
- Defini e mantive **políticas de snapshot de VMs** como parte da estratégia de DR, viabilizando reversão ágil em falhas de atualização e manutenções de hardware.

#### Redes & Conectividade
- Projetei e implantei **~20 VLANs do zero** com mapeamento de portas 802.1Q, trunking e agregação de links (LAG) em uma rede anteriormente plana, isolando o tráfego de serviços e projetos.
- Realizei reset de fábrica e reconfiguração de switches legados sem credenciais registradas, trazendo toda a malha de comutação para gerência ativa e estruturada.
- Validei e simulei topologias de rede utilizando o **Cisco Packet Tracer** antes da implantação física.
- Substituí cabeamento desorganizado e links legados de 100 Mb/s por uma **arquitetura de cabeamento estruturado padronizada** em cascata, alcançando **conectividade estável de 1 Gb/s**.
- Administrei toda a **stack de DNS** interna do laboratório, incluindo zonas locais e resolução de nomes para serviços e máquinas virtuais.
- Configurei e gerenciei pontos de acesso **Ubiquiti UniFi** via UniFi Controller; reutilizei roteadores antigos com **OpenWrt** para estender o ciclo de vida dos ativos e evitar custos de aquisição.

#### Observabilidade & Monitoramento
- Construí e operei a stack de observabilidade: migrei o monitoramento de uma instalação legada instável do Zabbix para o **Checkmk**, complementado pelo **ntopng** para análise de fluxos de rede, monitorando a disponibilidade de hosts e serviços.
- Estruturei **fluxos de notificação e alertas on-call** para detecção precoce de indisponibilidades e redução do tempo de resposta (MTTR).
- Desenvolvi um **dashboard de telemetria e monitoramento** (Python, Flask, Chart.js) integrado ao **NUT (Network UPS Tools)**, reunindo mais de 255 mil registros de log para acompanhar a saúde e autonomia das baterias durante interrupções reais na rede elétrica.
- Estendi a autonomia de no-break para o concentrador de internet do campus, garantindo sustentação de aproximadamente 1 hora de conexão ininterrupta durante apagões (medida e cronometrada).

#### Segurança, Firewall & Controle de Acesso
- Substituí scripts legados inseguros de backup que continham credenciais em texto claro por rotinas documentadas e backups de configuração seguros e criptografados.
- Substituí o uso inadequado do Google Drive (onde senhas e credenciais do laboratório ficavam armazenadas em pastas e planilhas compartilhadas sem controle) por um gerenciador de senhas dedicado: implantei e gerenciei uma instância de **Bitwarden auto-hospedada**, estabelecendo controle de acesso baseado em funções (RBAC) por usuário, cofres criptografados de ponta a ponta e trilha de auditoria.
- Implantei ferramentas de segurança perimetral: **Suricata** (IDS/IPS na borda do pfSense), **OpenVAS** para varredura de vulnerabilidades e **darkstat** para análise de tráfego.
- Mantive um firewall pfSense físico em cold standby (pré-configurado e acionável via Wake-on-LAN) como rota deliberada e confiável de failover. Avaliei a virtualização do pfSense em VM no Proxmox, mas constatei instabilidade no link de rede, optando conscientemente pela máquina física de standby com base na confiabilidade real em produção.
- Desenvolvi protótipo funcional de controle de acesso via visão computacional com identificação de pessoas para controle de entrada física no laboratório.

#### Resposta a Incidentes & Confiabilidade Operacional
- Atuei como único operador on-call responsável pela **resposta a incidentes** em ~20 salas: triagem, mitigação em tempo real, comunicação e recuperação de falhas em servidores, links de rede e firewall.
- Elaborei **runbooks e playbooks pós-incidente** documentados na wiki interna, registrando causas-raiz, etapas de mitigação e planos de ação preventivos para consolidar o conhecimento operacional.
- **Incidente de curto-circuito em no-break**: executei mitigação imediata isolando o equipamento danificado e realizei failover para o **firewall físico em cold standby via Wake-on-LAN** com migração manual do uplink óptico, limitando o tempo total de recuperação estritamente a duas etapas físicas.
- **Diagnóstico de falha silenciosa no pfSense**: solucionei cenário em que um ciclo de energia frio (power cycle) resetava a configuração do firewall para o padrão de fábrica sem gerar erros nos logs. Identifiquei que a placa-mãe renomeava a interface pai no boot a frio; corrigido com um ajuste pontual de configuração após diagnóstico da causa-raiz.
- Monitorei oscilações da rede elétrica e surtos proativamente, isolando equipamentos críticos ou seccionando disjuntores para prevenir queima de hardware sensível.
- Desenvolvi sistema emergencial de visibilidade durante falha no DVR do prédio: montei uma unidade improvisada de monitoramento com **Banana Pi M2 Zero** e webcam reaproveitada de notebook para manter a segurança física da sala de servidores a custo zero.

#### Gestão de Ativos & Decisões Práticas de Ferramental
- Mantive o controle patrimonial do laboratório, rastreando números de série e plaquetas de patrimônio da universidade para auditorias e alocação de equipamentos.
- Implantei o **GLPI** para gestão de ativos e chamados formais, e posteriormente optei por desativá-lo: com um único operador presencial, os usuários preferiam o alinhamento presencial direto em vez de abrir tickets, de modo que aposentar a ferramenta eliminou manutenção recorrente sem qualquer prejuízo à operação.

#### Automação, Plataformas & Configuração
- Automatizei a gerência de configuração em **~10 hosts físicos e máquinas virtuais** utilizando **Ansible** (IaC leve).
- Implantei serviços conteinerizados com **Docker** e Docker Compose; explorei **Podman** para execução sem daemon central e avaliei o Portainer para visibilidade de containers.
- Estruturei e mantive um **Otter Wiki** interno contendo topologia de rede, configurações de serviços e runbooks operacionais.

#### Administração de Sistemas, Reparo de Hardware & Suporte
- Conduzi planejamento orçamentário, cotações com fornecedores e especificações técnicas de hardware para subsidiar decisões de compra do laboratório.
- Prestei **suporte presencial direto e rotinas de helpdesk** para docentes, pesquisadores e alunos: formatação e instalação de sistemas operacionais, resolução de chamados de software, diagnóstico de hardware e montagem física de equipamentos, incluindo **troca de projetores no teto em escada (operação individual)**.
- Mantive estações de trabalho, notebooks, fontes, no-breaks e servidores de impressão via **CUPS**.
- Diagnostiquei e reparei um gravador de vídeo (DVR) inoperante, recuperando o aparelho e evitando custo de substituição.
- Desenvolvi **automação em Python** para decodificar e concatenar gravações de vídeo segmentadas de gravadores Intelbras em arquivos contínuos, transformando um resgate manual em rotina automatizada e repetível.

---

### **Suporte de TI & Manutenção de Sistemas (Voluntário)** – Guardians Group, UFCG
*2023 – Atual*  
**Stack:** Linux · Bash · iptables · SonicWall · Cabeamento Estruturado · Diagnóstico de Hardware

- Prestei suporte técnico e manutenção de infraestrutura no Departamento de Ciência da Computação da UFCG para professores, pesquisadores e alunos.
- Participei do desenvolvimento do projeto **"Imagem Prova"**: imagem de boot Linux customizada e blindada utilizada em provas acadêmicas para restringir ferramentas não autorizadas.
- Desenvolvi ferramenta de controle de acesso em Bash combinando `iptables` e `dig` para aplicação de listas dinâmicas de permissão (whitelist) e bloqueio durante avaliações.
- Recuperei e reconfigurei um firewall SonicWall desativado, transformando-o em sandbox didático para estudantes.
- Apoiei rotinas de clonagem de sistemas operacionais, cabeamento e manutenção preventiva nos laboratórios de ensino.

### **Monitoria Acadêmica (Voluntário)** – UFCG
*2023*  
**Foco:** Teoria dos Grafos · Programação Concorrente · Projeto de Algoritmos · Didática Técnica

- Auxiliei professores durante sessões práticas de laboratório e acompanhamento de projetos.
- Orientei estudantes em tópicos de modelagem de algoritmos em grafos e resolução de problemas teóricos e concorrentes.
- Apoiei na revisão de listas de exercícios e trabalhos práticos com feedback técnico aos alunos.

---

### Formação

---
**Bacharelado em Ciência da Computação** · Universidade Federal de Campina Grande · 2022 – 2026


### Idiomas

- **Português:** Nativo
- **Inglês:** Avançado


### Projetos Selecionados

- **[Monitor de Energia UPS](https://bitssand.blog/projects/power-ups-front-pt/)**: Python, Flask, Chart.js, NUT, Docker. Dashboard de telemetria com mais de 255 mil logs reais registrando saúde de baterias e autonomia durante quedas de energia.
- **[WhiteList](https://bitssand.blog/projects/whitelist-pt/)**: Bash, iptables, ufw. Solução de firewall default-deny orquestrando controle de acesso e whitelisting dinâmico de domínios em ambiente de provas.
- **[Servitor Assistant](https://bitssand.blog/projects/servitor-assistant-pt/)**: Python, FastAPI, LangChain, Ollama, Vosk, Piper TTS, Raspberry Pi. Assistente de voz auto-hospedado para edge computing com inferência local de LLM.

[Todos os projetos](https://bitssand.blog/projects/) · Post-mortems e análises de incidentes em [bitssand.blog/everydaysbugs](https://bitssand.blog/everydaysbugs/)

---

<div class="cv-no-print" markdown="1">
### 📄 Download

<button type="button" class="cv-print-btn" onclick="window.print()">Salvar como PDF</button>

Dica: no diálogo de impressão do navegador, escolha "Salvar como PDF" e desabilite cabeçalhos/rodapés para um resultado limpo.

</div>
