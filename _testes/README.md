# _testes

Os testes do JavaScript do site. A pasta começa com `_`, então o Jekyll não a
publica: os testes ficam no repositório e não vão para bitssand.blog.

- `cv-pdf.test.js` - testa `../assets/cv-pdf.js`, que liga os botões de PDF
  das páginas de currículo (`cv-pt.markdown`, `cv-pt-curto.markdown` e
  `cv.markdown`). Usa classes falsas com nome (`BotaoFalso`,
  `DocumentoFalso`, `JanelaFalsa`) no lugar do DOM e da janela: confere que o
  botão sem destino imprime, que o botão com destino abre a outra versão e que
  `?imprimir` na URL imprime quando a página termina de carregar.

O `cv-pdf.js` existe porque o CSP do site (`script-src 'self'`, em
`../nginx-security-headers.conf`) bloqueia `onclick` inline: o botão antigo
de "Salvar como PDF" não fazia nada no site publicado.

Para rodar, da raiz do repositório:

```sh
node --test _testes/*.test.js
```
