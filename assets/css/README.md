# assets/css

As folhas de estilo que o `_includes/head.html` carrega em todas as páginas do
site, depois do `assets/main.css` que o Jekyll gera a partir do
`assets/main.scss` (tema minima + estilos próprios). São arquivos estáticos:
nada aqui passa pelo Sass do build.

**A ordem no `head.html` é a interface entre estes arquivos** e é o que resolve
empate de especificidade. Quem carrega depois ganha quando o seletor tem o
mesmo peso, e três dos quatro arquivos dependem disso para funcionar:

1. `/assets/main.css` (gerado do `main.scss`) — tema minima e layout de base
2. `fonts.css`
3. `neuropunk.css`
4. `print.css`

## Arquivos

- `fonts.css` — declara as famílias do tema com `@font-face` apontando para
  `../fonts/`. Só `@font-face` e as variáveis de família; nenhum seletor de
  página. Carregado antes do `neuropunk.css`, que é quem usa as variáveis.

- `neuropunk.css` — o tema visual do site (escuro), e o arquivo que decide a
  aparência de quase tudo: cores em variáveis `--np-*`, tipografia, cabeçalho,
  cartões de projeto e de repositório do GitHub, tabelas e a coloração do
  rouge nos blocos de código. Carrega depois do `main.css` de propósito: a
  seção "Correções de especificidade" no meio do arquivo existe porque o
  minima crava fundo claro com seletores mais específicos, e ali cada regra
  perdedora foi reescrita com o peso necessário. As variáveis `--np-*` daqui
  são lidas também pelo `assets/ci/ci-post.css`, que traduz elas para os nomes
  que os widgets dos posts de CI usam.

- `print.css` — a folha de impressão, inteira, dentro de um `@media print`.
  Serve os botões "Salvar como PDF" das páginas de currículo (`cv.markdown`,
  `cv-pt.markdown`, `cv-pt-curto.markdown`), que chamam `window.print()` pelo
  `assets/cv-pdf.js`. Esconde cabeçalho, rodapé e os próprios botões, troca o
  tema escuro por preto no branco, define corpo de 10.5pt e controla quebra de
  página. **Precisa continuar sendo o último `<link>` do `head.html`**: as
  regras de tela do `neuropunk.css` cravam `body { font-size: 17px }` e margens
  grandes nos títulos com a mesma especificidade das regras de impressão, e
  enquanto esse `@media print` morava no `main.scss` a tela vencia o empate e o
  PDF do `/cv/` saía com 14 páginas em vez de 7.

## Como mexer

Regra de aparência na tela vai no `neuropunk.css`; regra que só vale no papel
vai no `print.css`. Antes de escrever uma regra nova, procure o seletor do lado
claro no `_site/assets/main.css` gerado: se ele for mais específico que o seu,
a regra nova não vai pegar só por estar num arquivo carregado depois.

Para conferir o resultado impresso sem abrir o diálogo do navegador:

```bash
google-chrome-stable --headless=new --disable-gpu \
  --run-all-compositor-stages-before-draw --virtual-time-budget=8000 \
  --no-pdf-header-footer --print-to-pdf=/tmp/cv.pdf http://127.0.0.1:4000/cv/
pdfinfo /tmp/cv.pdf | grep Pages
```

Sem o `--virtual-time-budget` o Chrome imprime antes das fontes carregarem e o
PDF sai com as páginas em branco.
