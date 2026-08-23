---
layout: post
title:  "bem deboa mas ai o ip estatico me fud30"
date:   2026-08-22 18:30:00 -0300
categories: jekyll update
---

> Resumo: passei a tarde investigando um bug de driver de wifi que não existia.
> Testei power save. Testei o outro power save. Comparei checksum de firmware.
> Considerei trocar de driver. Cheguei a ler issue de kernel. **Era um tablet na
> sala com o mesmo IP que o meu laptop.** O comando que matava isso em 3
> segundos foi o último que eu rodei. Este post é o caminho errado inteiro,
> porque o caminho errado é a única parte que presta.

Pra quem chegou aqui do Google com o mesmo sintoma e não quer ler a saga:

```bash
sudo arping -D -I wlan0 <o teu proprio IP>
```

Voltou resposta? Tem outro cara usando o teu endereço. Pode fechar a aba. De
nada.

---

## 1. O sintoma

A internet parava. Voltava sozinha. Parava de novo. Uns 30 segundos morto, 30
vivo, num loop bonito de tão regular.

Óbvio que é o wifi caindo, né?

- a associação 802.11 **nunca** caiu, o `connected time` só crescia
- sinal a -30 dBm, 1200 Mbit/s, `tx failed: 0`, `beacon loss: 0`
- o kernel e o `journalctl`: silêncio absoluto na hora da falha

Foi esse último ponto que me pegou. Não tinha erro nenhum no log, então eu
conclui: "bug silencioso de driver, claro". Não tinha erro no log porque, do
ponto de vista do wifi, **não aconteceu nada**. O wifi estava lá, de boa,
fazendo o trabalho dele. O problema era outro e eu estava lendo a página errada
do livro.

---

## 2. As cinco teorias que eu matei antes de acertar

Essa é a parte útil do post. As outras são enfeite.

### 2.1 "É o `rfkill unblock` do menu de wifi!"

Achei uma correlação linda: **todo** deauth acontecia 2 segundos depois de eu
abrir o menu de wifi. E o script desse menu roda `rfkill unblock wifi`
incondicionalmente antes de abrir a TUI.

Cinco de cinco. Eu já estava redigindo o bug report mentalmente.

**Como morreu:** rodei `rfkill unblock wifi` sozinho. Duas vezes. Não aconteceu
absolutamente nada.

O script dispara duas coisas juntas e eu culpei a errada.

> Correlação de 5/5 com n=5 e zero grupo de controle é o quê? É nada. É zero.
> Isolar a variável levava dez segundos e eu preferi construir uma teoria.

### 2.2 Power save do mac80211

```bash
sudo iw dev wlan0 set power_save off
```

Continuou igual. Beleza, próxima.

### 2.3 Power save do driver (porque existem dois, claro que existem dois)

Descobri que `iw set power_save` mexe só na camada genérica. O driver tem o
**próprio** modo de economia, num parâmetro de módulo separado, morando em outro
lugar, porque a vida é assim.

```bash
cat /sys/module/rtw89_core/parameters/disable_ps_mode   # N
```

Liguei. Continuou igual. Duas horas de vida, dois power saves, zero progresso.

Ressalva honesta: testei em runtime e numa reconexão, sem descarregar e
recarregar o módulo. Parâmetro de módulo às vezes só pega de verdade no
`modprobe -r`. Então essa hipótese eu enfraqueci, não matei. Sobreviveu por
tecnicalidade e morreu junto com as outras lá na seção 5.

### 2.4 Regressão de firmware

Essa aqui eu **queria** que fosse verdade. O pacote de firmware tinha sido
atualizado 6 dias antes. Tem relato em fórum de regressão nesse chip com esse
sintoma exato ("aparece conectado mas não pinga"). Encaixe perfeito. Narrativa
redonda. Culpado ideal.

**Como morreu:** resolvi comparar os binários com a versão anterior, que ainda
estava no cache do pacote.

```bash
bsdtar -xf /var/cache/pacman/pkg/linux-firmware-realtek-<versao-antiga>.pkg.tar.zst \
  usr/lib/firmware/rtw89/
sha256sum usr/lib/firmware/rtw89/*.bin.zst /lib/firmware/rtw89/*.bin.zst
```

Byte a byte idênticos. O downgrade não mudaria absolutamente nada.

Tá, essa eu aceito. Matar hipótese com um `sha256sum` em vez de com uma tarde de
teste é a única coisa esperta que eu fiz até aqui.

### 2.5 O ARP flux do meu próprio laptop (quase, mas não)

Aqui eu cheguei perto o suficiente pra me achar.

Eu estava com **duas placas na mesma sub-rede**, wifi e um adaptador USB de
rede. E o Linux, por padrão, anuncia alegremente qualquer IP local por qualquer
interface. Então meu próprio laptop podia estar ensinando o roteador que o IP do
wifi ficava no MAC do cabo.

Faz sentido! Explica quase tudo! Apliquei:

```bash
net.ipv4.conf.all.arp_announce = 2
net.ipv4.conf.all.arp_ignore   = 1
```

E o problema continuou. Lindo.

O detalhe é que a prova de que essa teoria estava errada já estava na minha
frente havia horas: se o roteador tivesse a entrada errada **fixa**, o wifi
estaria morto 100% do tempo. Não 70%. Ciclar quer dizer que a coisa volta
sozinha, e isso é cache expirando e reaprendendo, não envenenamento permanente.

Eu vi esse número. Eu escrevi esse número. Eu não olhei pra ele.

> Mesmo assim deixei os sysctls ligados, porque é a config correta pra qualquer
> máquina com duas placas no mesmo `/24`. Errar pelo motivo certo ainda conta
> alguma coisa.

---

## 3. Onde eu finalmente calei a boca e medi

Depois do quinto palpite furado, aceitei que ler log não ia me salvar e montei
um amostrador. A ideia é medir **cada camada separada**, a cada 2 segundos, e
ver qual morre primeiro em vez de adivinhar:

```bash
while true; do
  T=$(date '+%H:%M:%S')
  W=$(iw dev wlan0 link 2>/dev/null | grep -q Connected && echo ok || echo OFF)
  G=$(ping -c1 -W1 192.168.0.1 >/dev/null 2>&1 && echo ok || echo FALHA)
  I=$(ping -c1 -W1 1.1.1.1     >/dev/null 2>&1 && echo ok || echo FALHA)
  D=$(timeout 3 resolvectl query --cache=no github.com >/dev/null 2>&1 && echo ok || echo FALHA)
  echo "$T | $W | $G | $D | $I"
  sleep 2
done
```

Primeira rodada, primeira surpresa: durante o blackout, o ping pro **próprio
roteador** falhava. Não era DNS. Não era roteamento. Não era a internet. Era a
LAN, ali, a três metros de mim.

Aí adicionei contador de pacote lido do `/proc/net/dev`, e a coisa apareceu de
vez:

```
hora     | gw    | txpkt+ | rxpkt+ | sinal | inact
17:22:44 | ok    |     11 |     14 |   -36 |   6      <- saudavel: TX ~ RX
17:22:52 | FALHA |     83 |     19 |   -33 | 107
17:22:58 | FALHA |     99 |     14 |   -33 |  41
17:23:04 | FALHA |     90 |     14 |   -33 | 120
17:23:22 | ok    |    183 |    151 |   -37 |   6      <- voltou: TX ~ RX
```

**TX subindo, RX morrendo.** O rádio transmitia numa boa e não recebia quase
nada, só resto de beacon e multicast. Sinal excelente o tempo todo.

Ou seja: o rádio não estava travado coisa nenhuma. Alguém estava mandando as
minhas respostas pra outro endereço.

### 3.1 Antes disso, o medidor mentiu na minha cara

A primeira versão do amostrador me deu um resultado 100% errado e eu quase
comprei.

Eu estava usando `ping -I wlan0` pra forçar a medição pela interface certa. Só
que `-I` com nome de interface usa `SO_BINDTODEVICE`, e com duas placas no mesmo
`/24` e os sysctls ainda no default (`arp_ignore=0`, `arp_announce=0`) a
resposta volta pelo outro braço. O ping fica preso no socket amarrado ao wlan0 e
nunca enxerga a resposta que chegou pelo cabo.

Resultado: falha em 100% das amostras, inclusive nos momentos em que a rede
estava perfeita.

Medição amarrada a interface só é confiável com um braço só na sub-rede, ou
depois de corrigir os sysctls do 2.5. Instrumento é hipótese também: quando o
teu medidor te entrega 100% de qualquer coisa, desconfia dele antes de
desconfiar da rede.

### 3.2 De brinde, a sexta teoria morreu sozinha

Enquanto o amostrador rodava eu ainda tinha um suspeito guardado: o roam-scan do
iwd, que varre canais procurando AP melhor. Uma queda coincidiu com um scan e eu
já estava com o dedo apontado.

Os dados disseram o contrário. Os scans coincidiam com três **recuperações**, não
com quedas. Sexta correlação bonita, sexto palpite furado.

Pelo menos dessa vez quem me corrigiu foi o dado, e não a realidade três horas
depois.

---

## 4. O experimento que eu devia ter feito na primeira hora

Eu já tinha reparado, meio por acaso, que mandar um ARP gratuito consertava na
hora. E quase saí gritando "achei!".

Só que "consertou depois que eu fiz X" não prova nada sem controle. Que é
exatamente o erro que eu já tinha cometido na seção 2.1. Duas vezes na mesma
tarde seria muito, até pra mim.

Então montei um rodízio: **a cada blackout, aplicar um remédio diferente e
cronometrar a recuperação.**

- `CTRL`: não fazer nada, só olhar
- `GARP`: ARP gratuito (broadcast)
- `AREQ`: ARP request pro gateway
- `BCAST`: ping broadcast (é broadcast, mas não é ARP)

Resultado:

```
GARP    1.107s   1.008s      <- ARP cura, sempre
AREQ    1.012s   1.011s      <- ARP cura, sempre
BCAST  90.256s   8.042s      <- broadcast IP NAO cura
CTRL   46.618s   1.507s   24.062s
```

(aquele ~1.0s do GARP/AREQ é o próprio `arping` rodando, a cura é instantânea)

Duas conclusões pelo preço de uma:

1. **Não é "broadcast desentala". É ARP, especificamente.** O `BCAST` também é
   broadcast e não curou porcaria nenhuma.
2. O `AREQ` ainda me entregou de brinde que **o gateway respondia ARP durante o
   blackout**. Camada 2 viva, nos dois sentidos, o tempo inteiro. Nunca foi o
   wifi. Em momento nenhum.

O que `GARP` e `AREQ` têm em comum e o `BCAST` não tem: os dois enfiam o par
`meu IP -> meu MAC` na tabela ARP do gateway.

Traduzindo: o roteador **tinha** entrada pro meu IP, ela estava **errada**, e por
isso ele nem se dava ao trabalho de perguntar, ele achava que sabia. Meu tráfego
IP normal não corrigia nada, porque equipamento de rede só aprende de frame ARP.
Um ARP meu sobrescrevia. Aí estragava de novo. Loop.

---

## 5. E o culpado é

Como não era eu envenenando (já tinha corrigido os sysctls), sobrava alguém
**respondendo ARP pelo meu endereço**. Existe um comando pra isso. Existe há
décadas. Eu o rodei na hora e meia número três:

```bash
$ sudo arping -D -I wlan0 -c3 192.168.0.22
ARPING 192.168.0.22 from 0.0.0.0 wlan0
Unicast reply from 192.168.0.22 [D8:68:A0:15:30:F3]  34.895ms
Sent 1 probes (1 broadcast(s))
Received 1 response(s)
```

Esse MAC não é meu.

O `-D` é modo de detecção de endereço duplicado: pergunta "quem tem esse IP?"
sem se identificar. Teu próprio kernel não responde ao próprio probe, então
qualquer resposta que chegar é de terceiro. Não tem margem pra interpretação.

E o fabricante, num arquivo que já estava na minha máquina esse tempo todo:

```bash
$ grep -i "^D8-68-A0" /usr/share/hwdata/oui.txt
D8-68-A0   (hex)    Samsung Electronics Co.,Ltd
```

Um tablet Samsung. Com IP estático. **Dentro da faixa do DHCP.** O roteador não
fazia ideia de que aquele endereço estava ocupado e entregou o mesmo IP pro meu
wifi, feliz da vida.

O tablet, aliás, estava sofrendo exatamente a mesma coisa do lado dele. Somos
todos vítimas aqui.

---

## 6. A assinatura, pra ti não fazer o que eu fiz

Se bater tudo isso junto, é conflito de IP. Não é driver. Não é o wifi. Não é
firmware. Para de mexer no driver.

| sinal | por quê |
|---|---|
| TX flui, RX unicast morre | teu pacote sai; a resposta vai pro MAC errado |
| beacon e multicast passam normal | não dependem de ARP |
| ARP broadcast teu cura na hora | sobrescreve a entrada do gateway |
| tráfego IP teu **não** cura | equipamento só aprende de frame ARP |
| gateway responde ARP durante a queda | a camada 2 sempre esteve viva |
| kernel mudo | do ponto de vista do 802.11 não falhou nada |
| some quando tu troca de meio (cabo) | o outro aparelho não alcança o IP novo |

---

## 7. Como consertar de verdade

**1. No aparelho errado** (que é o certo a fazer): tira do IP estático, ou move
pra fora da faixa do DHCP.

**2. No roteador** (o definitivo): encolhe a faixa do DHCP pra não sobrepor os
endereços que tu usa como estático, e cria reserva DHCP pros MACs das tuas
máquinas. Cinco minutos. Resolve pra sempre.

**3. Na tua máquina** (o seguro contra reincidência): o systemd-networkd tem uma
opção que faz detecção de duplicado em cada lease e recusa se já estiver em uso.

```ini
[DHCPv4]
SendDecline=true
```

Vem **desligada** por padrão. Minha primeira reação foi "isso devia ser
default". Fui atrás e a resposta é mais interessante que eu esperava, porque a
metade que eu achava que sabia estava errada.

**Primeiro: a spec deixa pular.** A
[RFC 2131 §4.4.1](https://www.rfc-editor.org/rfc/rfc2131#section-4.4.1) diz:

> The client SHOULD perform a check on the suggested address to ensure that the
> address is not already in use.

SHOULD, não MUST. Quem pula continua conforme a spec. Se detectar em uso, aí sim
é MUST: manda `DHCPDECLINE`.

**Segundo: o preço, que eu tinha chutado pra cima.** Eu ia escrever aqui que
custa "uns 8 segundos por lease" e que isso é caro demais pra laptop. Fui
conferir na
[RFC 5227 §1.1](https://www.rfc-editor.org/rfc/rfc5227#section-1.1):

```
PROBE_WAIT         1 second    (initial random delay)
PROBE_NUM          3           (number of probe packets)
PROBE_MIN          1 second    (minimum delay until repeated probe)
PROBE_MAX          2 seconds   (maximum delay until repeated probe)
ANNOUNCE_WAIT      2 seconds   (delay before announcing)
```

E o procedimento, na
[§2.1.1](https://www.rfc-editor.org/rfc/rfc5227#section-2.1.1): espera aleatória
de 0 a `PROBE_WAIT`, depois 3 probes espaçados de `PROBE_MIN` a `PROBE_MAX` cada
um, depois `ANNOUNCE_WAIT` antes de anunciar.

Somando o pior caso: 1 + 2 + 2 + 2 = **7 segundos**. Média, uns 5,5.

Sete segundos. Uma vez por reconexão. Isso é o tempo de levantar e pegar café. Eu
ia vender isso como caro pra caramba e não é: pra economizar 7 segundos por
reconexão eu queimei uma tarde inteira.

**Terceiro, e esse é o motivo real de vir desligado:** a própria RFC 5227 avisa
que o teste dá falso positivo em wifi.

> Some kinds of Ethernet hub (often called a "buffered repeater") and many
> wireless access points may "rebroadcast" any received broadcast packets to all
> recipients, including the original sender itself.

Ou seja: tu manda o probe, o AP devolve o teu próprio probe pra ti, e tu conclui
que tem conflito onde não tem. Ligar isso por default quebraria máquina em rede
que funciona perfeitamente. O motivo é esse, não os 7 segundos.

Conclusão: liga. O custo é café, e os itens 1 e 2 continuam sendo a correção de
verdade.

---

## 8. O que eu levo dessa tarde

**Comando barato vai primeiro.** `arping -D` custa 3 segundos e elimina uma
classe inteira de problema. Eu rodei checksum de firmware antes dele. Eu li
issue de kernel antes dele. Pensa na burrice.

**Log mudo é dado, não ausência de dado.** Zero erro no kernel durante uma falha
de rede é informação **forte**: quer dizer que a falha está acima ou fora da
camada que loga. Eu li como "bug silencioso" quando devia ter lido como "cara,
não é aqui".

**Sem grupo de controle não é experimento, é fé.** Duas vezes eu apontei culpado
por correlação e nas duas eu estava errado. O rodízio com uma condição `CTRL` foi
o que separou causa de coincidência, e escrever ele foi mais fácil que inventar
o quinto palpite.

**Mede a camada, não o sintoma.** "Caiu a internet" não serve pra nada. "O ping
pro gateway falha mas o ARP pro gateway responde" já te entrega a resposta
mastigada.

**O teu instrumento é uma hipótese também.** O `ping -I` me deu 100% de falha
com a rede boa. Antes de acreditar num resultado extremo, testa o medidor contra
um caso que tu sabe que está funcionando.

**Confere o número antes de usar ele como argumento.** Eu quase publiquei "8
segundos, caro demais" de cabeça. Era 7, e não era caro. Ler a RFC custou dois
minutos e derrubou a conclusão inteira.

E o bônus: quando o sintoma é esquisito demais pro software, às vezes o problema
não está no software. Está na sala, ligado na tomada, com IP estático que alguém
configurou em 2019 e esqueceu.
