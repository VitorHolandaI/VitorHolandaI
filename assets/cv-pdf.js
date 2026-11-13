// Os botões de PDF do currículo. O CSP do site (script-src 'self', em
// nginx-security-headers.conf) bloqueia onclick inline, então eles moram aqui.
(function () {
  /** "?imprimir" na URL abre o diálogo de impressão. Ex.: pedeImpressao("?imprimir") */
  function pedeImpressao(busca) {
    return new URLSearchParams(busca).has("imprimir");
  }

  /** Botão sem destino imprime a página; com destino, abre a outra versão. */
  function ligarBotoes(documento, janela) {
    documento.querySelectorAll("[data-cv-pdf]").forEach(function (botao) {
      botao.addEventListener("click", function () {
        const destino = botao.getAttribute("data-cv-pdf");
        if (destino) janela.location.href = destino;
        else janela.print();
      });
    });
    if (!pedeImpressao(janela.location.search)) return;
    janela.addEventListener("load", function () { janela.print(); });
  }

  if (typeof module !== "undefined") module.exports = { pedeImpressao, ligarBotoes };
  else ligarBotoes(document, window);
})();
