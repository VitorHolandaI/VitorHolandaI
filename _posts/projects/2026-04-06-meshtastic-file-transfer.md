---
layout: project
title: "Meshtastic File Transfer"
date: 2026-04-06
excerpt: "A TCP-like reliable file transfer protocol built on top of Meshtastic LoRa, with chunking, ACK/NAK, retransmission, and MD5 verification."
technologies: "Python, Meshtastic, LoRa, psutil"
permalink: /projects/meshtastic-file-transfer/
lang: en
lang_ref: meshtastic-file-transfer
---

A custom reliable file transfer protocol layered on top of Meshtastic LoRa mesh networks. Meshtastic itself only guarantees best-effort delivery — this project adds the reliability primitives needed to transfer actual files: chunking, per-chunk acknowledgement, retransmission on timeout, and end-to-end MD5 verification.

The protocol (dubbed MeshTCP) works in three phases. First, the sender broadcasts a FILE header containing the filename, total chunk count, and MD5 hash. Then it sends each chunk one at a time, waiting for an ACK before moving to the next. If no ACK arrives within the timeout window, it retransmits — up to a configurable maximum before aborting the transfer. Finally, once all chunks are received, the receiver assembles the file, checks the MD5, and sends a DONE packet back with the result.

Because LoRa is extremely slow (~5 seconds per chunk in practice), the sender shows an upfront transfer estimate before starting, and warns when a file exceeds 10 KB. Transfers of even small files can take minutes.

The implementation handles several real-world failure modes: duplicate chunks are re-ACKed without writing twice, the ACK is sent three times to fight packet loss on the return path, and USB disconnections mid-transfer trigger an automatic reconnect and retry. The receiver also filters incoming packets by sender node ID to ignore unrelated traffic on the mesh.

Each packet is binary-encoded with a compact type prefix (FILE, CHK, ACK, NAK, DONE, ABORT) and fits within Meshtastic's 228-byte raw payload limit. The protocol lives in `meshtcp.py`, with `sender.py` and `receiver.py` as the two sides of the transfer.

**Stack:** Python, Meshtastic Python SDK, pypubsub.

[GitHub Repository](https://github.com/VitorHolandaI/meshtastic_file_transfer)
