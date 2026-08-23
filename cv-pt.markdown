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

[GitHub](https://github.com/VitorHolandaI) · [LinkedIn](https://www.linkedin.com/in/vitor-holanda-465b20259/) · [Blog](https://bitssand.blog/) · [Projetos](https://bitssand.blog/projects/)


### Resumo

Bacharel em Ciência da Computação (UFCG). Como **único sysadmin** de um prédio
de pesquisa de ~20 salas, não herdei uma infraestrutura: construí a que não
existia — backup do zero com teste de restore, ~20 VLANs onde a rede era plana,
cofre de senhas no lugar de pasta no Drive, rede de 100 Mb/s para 1 Gb/s
estável. Depois um ano em **engenharia de IA/LLM**, com agentes, RAG e pipelines
de avaliação para o atendimento da Dell. Do cabo no rack até a métrica de
avaliação.


### Habilidades Técnicas & Tecnologias

- **Engenharia de IA / LLM:** LangChain, LangGraph, MCP (Model Context Protocol), tool calling, workflows agênticos, RAG (Geração Aumentada por Recuperação), busca híbrida (semântica + lexical), reranking (BGE-reranker, cross-encoder), embeddings, bancos de dados vetoriais, prompt engineering, testes de prompt-injection (burla de guardrail), saídas estruturadas com Pydantic, APIs compatíveis com OpenAI
- **Avaliação & Observabilidade de LLMs:** Arize Phoenix, métricas de avaliação customizadas, tracing, análise de custo em tokens & throughput
- **Sistemas Operacionais:** Linux, FreeBSD (via pfSense)
- **Containers & DevOps:** Docker, Podman, Git, Kubernetes (uso acadêmico e pessoal: deploy de aplicações e testes de carga), Ansible (gerência de configuração em ~10 hosts do laboratório)
- **SRE & Confiabilidade:** Resposta a incidentes, runbooks/playbooks, post-mortems, failover (cutover manual para standby pré-configurado), disaster recovery (DR) drills, alta disponibilidade (HA), observabilidade (Zabbix, Checkmk), monitoramento de disponibilidade de host/serviço
- **Redes & Sistemas:** Administração de redes, administração de sistemas, virtualização (KVM, Proxmox), gerência de stack DNS, firewalls pfSense
- **Programação & Desenvolvimento:** Python (Flask, FastAPI), C++ (projetos pessoais), Java (projetos de disciplina), Haskell e Prolog (projetos de disciplina)
- **Sistemas Embarcados & Hardware:** SBCs, microcontroladores, programação embarcada


### Formação

---
**Bacharelado em Ciência da Computação** — Concluído · Universidade Federal de Campina Grande · 2022 – 2026


### Idiomas

- **Português:** Nativo
- **Inglês:** Avançado


### Experiência

---

### **Administrador de Sistemas / Analista de Sistemas (perfil SRE)** – SPLab, UFCG (Meio período) Nov 2023 – Abril 2025

Único administrador de sistemas responsável pela infraestrutura de TI
de um bloco com ~20 salas (~10 salas de professores, demais ocupadas
por projetos de pós-graduação e **projetos em parceria com empresas
privadas e outras entidades públicas**), cobrindo servidores, redes,
virtualização, firewall, observabilidade, resposta a incidentes e
suporte ao usuário.

Ser a única pessoa significava que o trabalho de plataforma e o helpdesk eram o
mesmo trabalho. Um mesmo dia podia ter planejamento de segmentação por VLAN e,
logo em seguida, ensinar alguém a usar a impressora, instalar o sistema de um
recém-chegado, ativar um software para quem travou, ou trocar um projetor
sozinho em cima de uma escada. Tudo abaixo foi construído **entre** essas
interrupções, não no lugar delas.

#### Infraestrutura & Virtualização
- Projetei e implantei infraestrutura para hospedar serviços para a comunidade do laboratório.
- Planejei e implantei **stacks de virtualização baseadas em KVM** do zero, expandindo significativamente a capacidade e flexibilidade de serviços.
- **O laboratório tinha um servidor só, com VMs em cima, e mais nada.** Especifiquei, montei e coloquei em serviço **mais dois servidores físicos** — um para carga de produção, outro dedicado a backup de VMs — e os gerenciei junto com as estações de trabalho, usando **Proxmox** e **KVM**.
- Montei e configurei **máquinas e ambientes de test-lab sob demanda** para membros do laboratório (pesquisadores, alunos, projetos parceiros), especificando hardware, montando e provisionando sistemas conforme o caso de uso. Projetos de pesquisa recebiam **VMs próprias para autogerenciar**, comigo sendo dono da plataforma embaixo e de toda escalação técnica em cima.

#### Armazenamento, Backup, Confiabilidade & Disaster Recovery
- Projetei e implantei **infraestrutura de backup** para máquinas virtuais KVM e cargas baseadas em arquivos, incluindo **testes de validação de backup criptografado** (restore drills) para verificar que os backups eram realmente recuperáveis, não apenas escritos com sucesso.
- Configurei e gerenciei **servidores Dell** e servidores de uso geral.
- **Não existia backup nenhum antes disso.** Construí a capacidade do zero: primeiro um **setup baseado em TrueNAS**, depois um **servidor de backup totalmente customizado**, montado internamente com discos que já estavam no laboratório, dando mais controle e capacidade sem comprar appliance.
- Para o servidor customizado, **avaliei todos os discos candidatos** disponíveis no laboratório — rodando diagnósticos e inspecionando **dados SMART (incluindo power-on hours / uptime dos drives)** — para selecionar os discos com menor desgaste para o array.
- Montei o servidor final sobre **Rocky Linux 9**, seis drives de 2,5" num **pool ZFS em RAID 10 (mirrors em stripe)**, em um **suporte impresso em 3D**. O ZFS foi escolha deliberada pelos **checksums fim-a-fim**: em destino de backup, corrupção silenciosa precisa ser detectada, não copiada fielmente.
- Mantive **políticas de snapshot de VMs** como parte da estratégia de **disaster recovery (DR)** do laboratório, permitindo rollback rápido após falhas em updates ou eventos de hardware.

#### Redes & Conectividade
- Realizei **planejamento e design de rede** para o laboratório, incluindo segmentação, capacidade de crescimento e layout de rack/distribuição.
- Administrei e configurei **switches de rede**. **Não existia segmentação por VLAN: projetei e criei do zero as ~20 VLANs do laboratório**, junto com atribuição de portas, trunking e agregação de links, isolando o tráfego entre serviços e tenants. Vários switches não tinham credencial conhecida registrada e precisaram de reset de fábrica antes de sequer entrarem sob gerência.
- Gerenciei toda a **stack de DNS** do laboratório, incluindo zonas internas e resolução para serviços e VMs do lab.
- Simulei e validei topologias de rede usando **Cisco Packet Tracer**.
- Padronizei e reorganizei a infraestrutura do rack de servidores. **Não havia padrão de topologia a seguir, então defini um**: **cabeamento estruturado** em arquitetura de cascata, melhorando o design de rede, throughput e manutenibilidade.
- Identifiquei e resolvi um gargalo pré-existente causado por **cabeamento desorganizado e links defasados de 100 Mb/s**, atualizando a rede para **conectividade estável de 1 Gb/s** e permitindo utilização plena da banda disponível.
- Configurei e otimizei **pontos de acesso Ubiquiti UniFi** e administrei o **UniFi Controller** para maximizar cobertura e desempenho wireless.
- Reaproveitei equipamentos de rede legados instalando **OpenWrt** em roteadores antigos, estendendo a vida útil do hardware e reduzindo custos.

#### Segurança, Firewall & Controle de Acesso
- Administrei e protegi **firewalls pfSense**, incluindo:
  - Substituí um **script legado inseguro que armazenava credenciais em texto plano** por **boas práticas documentadas** e **backups de configuração seguros e criptografados**
  - Gerenciamento de VPNs, detecção de ameaças, monitoramento e sistemas de alerta
- Acabei com a prática de guardar as credenciais compartilhadas do laboratório no **Google Drive**, subindo no lugar um cofre **Bitwarden auto-hospedado**: os segredos saíram de uma pasta compartilhada na nuvem para acesso por usuário com rastro de auditoria.
- Implantei e mantive **ferramentas de segurança e monitoramento**: **OpenVAS** para varredura de vulnerabilidades, **Suricata** como IDS/IPS na borda do pfSense e **darkstat** para contabilização de tráfego.
- Construí e coloquei pra rodar um **protótipo de controle de acesso por câmera** (identificação de pessoas com IA) para acesso controlado ao laboratório. Funcionou de ponta a ponta; o teto era a **qualidade de imagem das câmeras existentes**, não o modelo, e foi isso que derrubou a acurácia na prática.
- Mantive um **firewall físico em cold standby**: segunda máquina na tomada mas desligada, com a configuração do pfSense já carregada, subindo por **Wake-on-LAN**. O cutover era manual de propósito, e não HA com CARP, porque o conversor óptico não tinha porta sobrando e o cabo de uplink precisava ser trocado na mão. Exercitado em incidente real (curto-circuito no no-break, ver Resposta a Incidentes abaixo).
- Também avaliei rodar o pfSense dentro de uma **VM no Proxmox** para gerência centralizada, mas o link de rede mostrou-se instável nessa configuração, então a **máquina física em standby permaneceu como caminho de failover em produção** — escolha deliberada baseada em confiabilidade observada, não em conveniência.

#### Observabilidade, Monitoramento & Continuidade de Energia
- Construí e operei a **stack de observabilidade** do laboratório, inicialmente com **Zabbix** e posteriormente **migrando para Checkmk** como sistema de monitoramento principal (o Zabbix herdado estava quebrado e sem nenhuma documentação, então reconstruir no Checkmk saiu mais barato que fazer engenharia reversa), complementado por **ntopng** para análise de tráfego, **UniFi Manager** e ferramentas de gerenciamento de virtualização, fornecendo **métricas de disponibilidade de host e serviço** para os serviços do laboratório.
- Configurei **fluxos de alertas e notificação on-call** para falhas de serviço e host, permitindo detecção precoce e **resposta a incidentes** mais rápida.
- Desenvolvi um **dashboard de monitoramento** (Python, HTML, CSS) sobre o **NUT (Network UPS Tools)** para acompanhar o **status de no-breaks (UPS)** durante quedas de energia, expondo estado de bateria e runtime para apoiar decisões do operador.
- Mitigei quedas de internet durante falhas de energia estendendo a capacidade do UPS para o concentrador de internet da universidade, garantindo aproximadamente **1 hora de conectividade contínua**, cronometrada em quedas reais.

#### Resposta a Incidentes & Confiabilidade Operacional
- Responsável pela **resposta a incidentes** do laboratório como único operador on-call: triagem, mitigação, comunicação e recuperação para interrupções afetando servidores, rede, firewall e serviços ao usuário.
- **Documentei runbooks/playbooks pós-incidente** após cada evento significativo, registrando causa raiz, passos de mitigação e ações de follow-up para acelerar a recuperação em recorrências. Ficavam na wiki do laboratório, então sobreviveram ao meu próprio acesso.
- Exemplo de incidente: **curto-circuito em no-break** que derrubou os disjuntores da sala. Executei mitigação ao vivo cortando a energia da máquina afetada (que havia queimado dentro do no-break) e então **passei o firewall para a máquina em standby**: Wake-on-LAN para subir, mais troca manual do cabo de uplink, já que o conversor óptico não tinha porta livre. O tempo de recuperação era limitado por esses dois passos.
- Lidei com **variações e surtos recorrentes da rede elétrica** de forma preventiva: quando as condições pareciam inseguras, **avisava proativamente todo o laboratório para desconectar equipamentos** ou **cortava a energia no quadro de disjuntores**, protegendo hardware sensível contra danos.
- Realizei **disaster recovery drills** periódicos, incluindo validação de restore de **backups criptografados de VMs** para confirmar que o pipeline de backup produzia artefatos recuperáveis (não apenas escritas bem-sucedidas).
- Enquanto o **DVR do laboratório estava quebrado e não havia câmeras de vigilância disponíveis**, projetei e construí um **sistema improvisado de câmera** para a sala de suporte (onde ficavam todos os equipamentos críticos), usando um **Banana Pi M2 Zero** e uma **webcam de notebook reaproveitada da sucata**, restaurando visibilidade básica do local a custo zero, com peças sobressalentes.

#### Gestão de Ativos & Aquisição
- Implementei **rastreamento de ativos e controle patrimonial** mantendo inventário de números de série e plaquetas de patrimônio da universidade, dando suporte a auditorias e identificação de equipamentos do laboratório.
- Subi o **GLPI** (gestão de ativos + helpdesk) para formalizar inventário e chamados, e depois **tirei do ar**. Com um único operador presencial, as pessoas continuavam indo até a sala de suporte em vez de abrir chamado, então a ferramenta custava manutenção sem mudar comportamento. Aposentar saiu mais barato.

#### Automação, Gerência de Configuração & Plataformas
- Implantei e gerenciei serviços usando **Docker** para cargas containerizadas e isolamento de serviços, incluindo um **serviço caseiro e simples de agenda** escrito para professores específicos; também explorei **Podman** como alternativa sem daemon. O **Portainer** subiu para visibilidade de containers, mas ficou marginal, já que o **Checkmk** já cobria monitoramento de host e serviço.
- Usei **Ansible** para configuração repetível em **~10 hosts físicos e VMs** (IaC leve).
- Subi um **Otter Wiki** como casa da documentação do laboratório, depois de herdar sistema sem nenhuma — o Zabbix era o pior caso. Runbooks, topologia de rede e notas de serviço passaram a morar lá, em vez de ficar na cabeça de uma pessoa só.

#### Administração Geral de Sistemas & Suporte ao Usuário
- Realizei tarefas gerais de administração de sistemas, incluindo:
  - **Planejamento orçamentário, cotação com fornecedores e aquisição** de equipamentos de TI para o laboratório
  - Elaboração de especificações técnicas e comparativos de preço para apoiar decisões de compra
  - Manutenção de notebooks, desktops, impressoras (administração do servidor de impressão **CUPS**), projetores, no-breaks e fontes de alimentação
- Prestei **suporte direto ao usuário final** para docentes e membros do laboratório: instalação de software, troubleshooting de PCs, troca de projetores (escada incluída, sozinho) e montagem/desmontagem de equipamentos in loco.
- Diagnostiquei e **consertei um DVR quebrado** recebido sem funcionamento, restaurando-o à operação plena e evitando custo de substituição.
- Escrevi **ferramental em Python para remontar gravação de DVR**: não existia procedimento para tirar uma gravação utilizável, e os gravadores Intelbras exportam o vídeo picado em segmentos, então os scripts costuravam os segmentos de volta num arquivo só, transformando um resgate improvisado em passo repetível.


### **Engenheiro de IA / LLM & Pesquisador Aplicado** – LSD-DELL, UFCG
*Abril 2025 – Abril 2026 (Meio período)*

Parte de uma equipe multifuncional construindo **agentes baseados em
LLM** para o atendimento ao cliente da Dell. Função híbrida de
engenharia de IA + pesquisa aplicada: desenvolvimento em **Python**
em sprints Ágeis com revisão de código por pares via Pull Requests e
integração através do pipeline interno de CI/CD da Dell, além de
benchmarking, avaliação de modelos e experimentação baseada em
literatura. Era um time de pesquisa com posse compartilhada, então o
trabalho abaixo foi feito em colaboração, e não em trilhas separadas de
dono único.

#### Agentes LLM, Uso de Ferramentas & Pesquisa Aplicada
- Construí **agentes baseados em LLM** em **Python** usando **LangChain** e **LangGraph**, incluindo **tool calling**, **workflows agênticos** e experimentos com **servidores MCP (Model Context Protocol)** para integração extensível de ferramentas.
- Consumi os **LLMs hospedados internamente pela Dell** através de uma **API compatível com a OpenAI** (mesmo padrão do SDK `openai`, com `base_url` interna), mantendo todo o código cliente portável entre provedores.
- Implementei **saídas estruturadas (structured outputs)** com **modelos Pydantic** como schema de resposta (estilo `response_model`), garantindo validação estrita de tipos das saídas do LLM e parsing confiável a jusante.
- Apliquei **validação de entrada/saída via Pydantic** como camada leve de guardrail, rejeitando respostas mal-formadas ou fora do schema antes de chegarem em sistemas downstream.
- Rodei **testes de prompt-injection** contra os agentes, focados em uma classe: fazer o agente sair do comportamento atribuído e burlar seu guardrail. Reportei os casos encontrados e contribuí com correções.
- Implantei uma **interface web** para testar APIs e serviços de LLM quando ambientes VDI remotos restringiam as ferramentas necessárias, desbloqueando o fluxo de experimentação do time.

#### Geração Aumentada por Recuperação (RAG) & Busca Híbrida
- Atuei em um **sistema de FAQ baseado em RAG** usando um **banco de dados vetorial** para busca por similaridade sobre uma base de conhecimento de conteúdo de atendimento.
- Utilizei **modelos de embeddings hospedados internamente** (servidos pela mesma API compatível com OpenAI) para codificar documentos e queries.
- Modifiquei e testei **busca híbrida**, **BM25** combinado com recuperação densa e fundido com **RRF (Reciprocal Rank Fusion)**, medido contra o baseline de recuperação anterior. Os números são internos da Dell e não estão reproduzidos aqui.
- Integrei **reranking** com modelos **BGE-reranker / cross-encoder** sobre o estágio inicial de recuperação, elevando a precisão top-k antes de enviar o contexto ao LLM.
- Produzi relatórios de avaliação sobre qualidade e status de implementação do sistema RAG.

#### Avaliação de LLMs, Benchmarking & Seleção de Modelos
- Projetei e executei **avaliações de LLM** usando **Arize Phoenix** como plataforma de observabilidade/eval, incluindo:
  - **Métricas de avaliação customizadas** para qualidade específica da tarefa
  - Análise de **comportamento dos agentes**, **qualidade de resposta**, **throughput** e **custo em tokens**
  - Tracing das execuções dos agentes para depurar caminhos de uso de ferramentas e recuperação
- Rodei **benchmarks públicos de LLM** para **seleção de modelos baseada em dados**, incluindo um **benchmark multilíngue geral** e um **específico de matemática**, para escolher modelos para tradução.
- Realizei **análise estatística descritiva** em datasets de avaliação, incluindo **profiling de uso de tokens** em prompts e respostas para otimização de custo.

#### Engenharia de Dados & Expansão de Dataset
- **Escrevi** as questões novas que levaram um dataset de avaliação de **42 para mais de 120 questões**, aumentando cobertura e variabilidade para testes de agentes LLM.
- Contribuí como parte do time para a **tradução multilíngue de datasets** usando LLMs, viabilizando avaliação em diferentes idiomas.
- Pesquisei, revisei e implementei metodologias de benchmarking da literatura acadêmica focadas em tradução automática e avaliação de LLMs.

---

### **Monitoria Acadêmica (Voluntário)** – UFCG · 2023

**Monitor (Voluntário)**
*Teoria dos Grafos & Programação Concorrente*

- Auxiliei professores durante aulas de laboratório e sessões práticas em cursos de graduação.
- Apoiei estudantes na resolução de problemas, design de algoritmos e conceitos teóricos em **Teoria dos Grafos**.
- Ajudei estudantes durante atividades práticas, esclarecendo trabalhos e fornecendo orientação técnica.
- Auxiliei na correção e revisão de trabalhos e exercícios de estudantes.
- Atuei como ponte entre estudantes e docentes, reforçando o conteúdo das disciplinas e melhorando os resultados de aprendizagem.


### **Suporte de TI & Manutenção de Sistemas (Voluntário)** – Guardians Group, UFCG · 2023 – Atual

**Voluntário – Departamento de Ciência da Computação**

- Realizei manutenção geral de TI e troubleshooting para o departamento, apoiando docentes, servidores e estudantes.
- Auxiliei na implantação e reinstalação de **sistemas operacionais Linux e Windows** em máquinas de laboratório e equipe.
- Ajudei com **cabeamento de rede, configuração básica de rede** e organização de dispositivos nos laboratórios.
- Mantive e atualizei inventários de equipamentos departamentais, incluindo desktops, notebooks, projetores e periféricos.
- Recuperei e reaproveitei um **firewall SonicWall abandonado**, configurando-o como sandbox para aprendizado dos estudantes.
- Participei do projeto **"Imagem Prova – Versão 1"**, envolvendo a criação de uma **imagem Linux customizada** usada em provas para garantir imparcialidade, restringindo ferramentas não autorizadas.
- Desenvolvi uma **solução de controle de acesso em Bash** usando `iptables` e `dig` para impor uma **lista de permissão/bloqueio de domínios**, limitando o acesso à rede a domínios aprovados durante avaliações.
- Apoiei ativamente atividades de manutenção cotidiana em múltiplos laboratórios de informática, garantindo disponibilidade e confiabilidade dos sistemas.



### Projetos Selecionados

- **[Monitor de Energia UPS](https://bitssand.blog/projects/power-ups-front-pt/)** — Python, Flask, Chart.js, NUT, Docker. É o dashboard de no-break descrito na SPLab acima.
- **[Servitor Assistant](https://bitssand.blog/projects/servitor-assistant-pt/)** — Python, FastAPI, LangChain, Ollama, Vosk, Piper TTS, Raspberry Pi. Assistente de voz auto-hospedado.
- **[WhiteList](https://bitssand.blog/projects/whitelist-pt/)** — Bash, iptables, ufw. É a lista de domínios permitidos em prova, descrita no Guardians acima.

[Todos os projetos](https://bitssand.blog/projects/)

---

<div class="cv-no-print" markdown="1">
### 📄 Download

<button type="button" class="cv-print-btn" onclick="window.print()">Salvar como PDF</button>

Dica: no diálogo de impressão do navegador, escolha "Salvar como PDF" e desabilite cabeçalhos/rodapés para um resultado limpo.

</div>
