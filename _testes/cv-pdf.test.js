// Roda com: node --test _testes/*.test.js (pasta com _ não vai para o site)
const test = require("node:test");
const assert = require("node:assert");
const { pedeImpressao, ligarBotoes } = require("../assets/cv-pdf.js");

class BotaoFalso {
  constructor(destino) { this.destino = destino; this.ouvintes = {}; }
  getAttribute(nome) { return nome === "data-cv-pdf" ? this.destino : null; }
  addEventListener(evento, fn) { this.ouvintes[evento] = fn; }
  clicar() { this.ouvintes.click(); }
}

class DocumentoFalso {
  constructor(botoes) { this.botoes = botoes; }
  querySelectorAll(seletor) {
    assert.strictEqual(seletor, "[data-cv-pdf]");
    return this.botoes;
  }
}

class JanelaFalsa {
  constructor(busca) {
    this.location = { search: busca, href: "/cv-pt/" };
    this.impressoes = 0;
    this.ouvintes = {};
  }
  print() { this.impressoes += 1; }
  addEventListener(evento, fn) { this.ouvintes[evento] = fn; }
}

test("?imprimir na URL pede impressão; outra busca, não", () => {
  assert.strictEqual(pedeImpressao("?imprimir"), true);
  assert.strictEqual(pedeImpressao("?x=1&imprimir=1"), true);
  assert.strictEqual(pedeImpressao(""), false);
  assert.strictEqual(pedeImpressao("?imprimirx"), false);
});

test("botão sem destino imprime a própria página", () => {
  const botao = new BotaoFalso("");
  const janela = new JanelaFalsa("");
  ligarBotoes(new DocumentoFalso([botao]), janela);
  botao.clicar();
  assert.strictEqual(janela.impressoes, 1);
});

test("botão com destino abre a outra versão, que imprime ao carregar", () => {
  const botao = new BotaoFalso("/cv-pt/curto/?imprimir");
  const janela = new JanelaFalsa("");
  ligarBotoes(new DocumentoFalso([botao]), janela);
  botao.clicar();
  assert.strictEqual(janela.location.href, "/cv-pt/curto/?imprimir");
  assert.strictEqual(janela.impressoes, 0);
});

test("página aberta com ?imprimir imprime quando termina de carregar", () => {
  const janela = new JanelaFalsa("?imprimir");
  ligarBotoes(new DocumentoFalso([]), janela);
  assert.strictEqual(janela.impressoes, 0);
  janela.ouvintes.load();
  assert.strictEqual(janela.impressoes, 1);
});
