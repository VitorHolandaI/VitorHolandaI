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

Um protocolo de transferência de arquivos confiável construído sobre redes mesh Meshtastic LoRa. O Meshtastic por si só só garante entrega best-effort. Este projeto adiciona as primitivas de confiabilidade necessárias para transferir arquivos de verdade: divisão em chunks, confirmação por chunk, retransmissão em caso de timeout e verificação MD5 de ponta a ponta.

O protocolo (chamado de MeshTCP) funciona em três fases. Primeiro, o remetente envia um header FILE com o nome do arquivo, total de chunks e hash MD5. Em seguida, envia cada chunk um por vez, aguardando um ACK antes de prosseguir. Se nenhum ACK chegar dentro do timeout, o chunk é retransmitido até atingir um limite configurável antes de abortar a transferência. Por fim, quando todos os chunks são recebidos, o receptor remonta o arquivo, verifica o MD5 e envia um pacote DONE com o resultado.

Como o LoRa é extremamente lento, o remetente calcula uma estimativa antes de começar e pede confirmação. A conta usada pelo script é simples: o arquivo é dividido em chunks de 200 bytes e cada chunk entra na estimativa como cerca de 5 segundos de rádio. Um arquivo de 1 KB vira 6 chunks e fica perto de 30 segundos. Um arquivo de 5 KB vira 26 chunks e fica perto de 2 minutos e 10 segundos. Um arquivo de 10 KB fica em torno de 50 chunks e pode levar cerca de 4 minutos.

Esse tempo é uma estimativa otimista, porque ele assume que cada chunk recebe ACK sem perda. Na prática, se o receptor não confirmar um chunk em 15 segundos, o sender retransmite. Cada chunk pode ser tentado até 5 vezes antes da transferência ser abortada, então um único trecho ruim de rádio já pode adicionar mais de um minuto. Por isso o README trata arquivos abaixo de 10 KB como o uso mais prático, mostra warning quando a estimativa passa de 5 minutos e marca arquivos acima de 50 KB como arriscados, principalmente por causa de quedas de USB em transferências longas.

A implementação lida com vários cenários reais de falha: chunks duplicados são re-ACKados sem reescrever o dado, o ACK é enviado três vezes para combater perda de pacotes no caminho de volta, e desconexões USB durante a transferência disparam uma reconexão automática com retry. O receptor também filtra os pacotes pelo ID do nó remetente para ignorar tráfego não relacionado na mesh.

Cada pacote é codificado em binário com um prefixo de tipo compacto (FILE, CHK, ACK, NAK, DONE, ABORT) e cabe dentro do limite de 228 bytes de payload do Meshtastic. O protocolo vive em `meshtcp.py`, com `sender.py` e `receiver.py` como os dois lados da transferência.

**Stack:** Python, Meshtastic Python SDK, pypubsub.

[GitHub Repository](https://github.com/VitorHolandaI/meshtastic_file_transfer)
