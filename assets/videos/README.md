# assets/videos

Vídeo hospedado no próprio site, para os posts que precisam mostrar algo em
movimento. Serve o elemento `<video>` nativo do HTML: o
`Content-Security-Policy` do `nginx-security-headers.conf` traz `media-src
'self'`, então o arquivo tem que sair deste domínio, e `frame-src` só libera o
`youtube-nocookie.com` se um dia for preciso embutir vídeo de terceiro.

Cada vídeo entra em par com o seu pôster, que é o quadro que o navegador mostra
antes de alguém dar play. Sem pôster o `<video>` aparece como um retângulo
preto no meio do texto.

## Arquivos

- `disquetes-mario.mp4` + `disquetes-mario-poster.jpg` — os três drives de
  disquete tocando o tema do Mario, dezembro de 2023. Lidos pelo post
  `_posts/2026-11-20-disquetes-tocando-mario.markdown`, que referencia os dois
  caminhos com `relative_url` e estiliza o player com a classe `.post-video`,
  definida no fim do `assets/css/neuropunk.css`. O original tem 4,5 MB e saiu
  do WhatsApp; o que está aqui é a versão reduzida.

## Como acrescentar um vídeo

O que vem de celular costuma ser grande demais para um repositório. Reduza
antes de commitar, e gere o pôster de um quadro que mostre o assunto:

```bash
ffmpeg -i original.mp4 -c:v libx264 -crf 30 -preset slow \
  -profile:v high -pix_fmt yuv420p -movflags +faststart \
  -c:a aac -b:a 96k -ac 1 assets/videos/nome.mp4

ffmpeg -ss 6 -i original.mp4 -frames:v 1 -q:v 4 \
  assets/videos/nome-poster.jpg
```

O `-movflags +faststart` move o índice do arquivo para o começo, que é o que
deixa o vídeo começar a tocar antes de baixar inteiro. O `-crf 30` levou o
vídeo dos disquetes de 4,5 MB para 1,5 MB sem perder o áudio, que nesse caso é
o conteúdo. Para vídeo onde a imagem importa mais, use um `crf` menor.
