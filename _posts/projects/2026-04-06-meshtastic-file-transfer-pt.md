---
layout: project
title: "Meshtastic File Transfer"
date: 2026-04-06
excerpt: "Um protocolo de transferência de arquivos confiável estilo TCP construído sobre Meshtastic LoRa, com chunking, ACK/NAK, retransmissão e verificação MD5."
technologies: "Python, Meshtastic, LoRa, psutil"
permalink: /projects/meshtastic-file-transfer-pt/
lang: pt
lang_ref: meshtastic-file-transfer
---

Um protocolo de transferência de arquivos confiável construído sobre redes mesh Meshtastic LoRa. O Meshtastic por si só só garante entrega best-effort — esse projeto adiciona as primitivas de confiabilidade necessárias para transferir arquivos de verdade: divisão em chunks, confirmação por chunk, retransmissão em caso de timeout e verificação MD5 de ponta a ponta.

O protocolo (chamado de MeshTCP) funciona em três fases. Primeiro, o remetente envia um header FILE com o nome do arquivo, total de chunks e hash MD5. Em seguida, envia cada chunk um por vez, aguardando um ACK antes de prosseguir. Se nenhum ACK chegar dentro do timeout, o chunk é retransmitido — até um máximo configurável antes de abortar a transferência. Por fim, quando todos os chunks são recebidos, o receptor remonta o arquivo, verifica o MD5 e envia um pacote DONE com o resultado.

Como o LoRa é extremamente lento (~5 segundos por chunk na prática), o remetente exibe uma estimativa de tempo antes de começar e avisa quando o arquivo ultrapassa 10 KB. Mesmo arquivos pequenos podem levar vários minutos.

A implementação lida com vários cenários reais de falha: chunks duplicados são re-ACKados sem reescrever o dado, o ACK é enviado três vezes para combater perda de pacotes no caminho de volta, e desconexões USB durante a transferência disparam uma reconexão automática com retry. O receptor também filtra os pacotes pelo ID do nó remetente para ignorar tráfego não relacionado na mesh.

Cada pacote é codificado em binário com um prefixo de tipo compacto (FILE, CHK, ACK, NAK, DONE, ABORT) e cabe dentro do limite de 228 bytes de payload do Meshtastic. O protocolo vive em `meshtcp.py`, com `sender.py` e `receiver.py` como os dois lados da transferência.

**Stack:** Python, Meshtastic Python SDK, pypubsub.

[GitHub Repository](https://github.com/VitorHolandaI/meshtastic_file_transfer)
