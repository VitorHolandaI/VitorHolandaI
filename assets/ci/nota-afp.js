// Circuito de 2023: nota de 0 a 10 em 4 bits, display mostra A, F ou R.
// O widget avalia as duas equacoes que foram pro cobre e deduz a letra do
// desenho que acende, em vez de reimplementar a regra das faixas: assim ele
// mostra o que a placa faz, inclusive onde isso diverge da intencao.
(function () {
  const raiz = document.getElementById('afp');
  if (!raiz) return;

  // Peso de cada chave, na ordem em que aparecem no circuito original.
  const BITS = [
    { id: 'W', peso: 8 },
    { id: 'X', peso: 4 },
    { id: 'Z', peso: 2 },
    { id: 'Y', peso: 1 }
  ];

  // Desenho de cada letra no padrao de segmentos a,b,c,d,e,f,g. O R usa a
  // forma do P porque sete segmentos nao fazem a perna diagonal do R.
  const DESENHOS = {
    abcefg: { letra: 'A', nome: 'aprovado' },
    aefg: { letra: 'F', nome: 'final' },
    abefg: { letra: 'R', nome: 'reprovado' }
  };

  const elValor = document.getElementById('afp-valor');
  const elLetra = document.getElementById('afp-letra');
  const elNome = document.getElementById('afp-nome');
  const elEq = document.getElementById('afp-eq');
  const segmentos = {};

  function lerBits() {
    const bits = {};
    BITS.forEach(x => {
      bits[x.id] = raiz.querySelector(`[data-bit="${x.id}"]`).checked ? 1 : 0;
    });
    return bits;
  }

  // As duas equacoes escritas na lousa em 2023, aplicadas como estao.
  function segB({ W, X, Z, Y }) {
    return (!X || W || (Z && Y)) ? 1 : 0;
  }

  function segC({ W, X, Z, Y }) {
    return ((X && !W && Z && Y) || (W && !X)) ? 1 : 0;
  }

  function acender(acesos) {
    Object.keys(segmentos).forEach(s => {
      segmentos[s].classList.toggle('afp-on', acesos.includes(s));
    });
  }

  function atualizar() {
    const bits = lerBits();
    const nota = BITS.reduce((soma, x) => soma + bits[x.id] * x.peso, 0);
    const b = segB(bits);
    const c = segC(bits);

    // a, e, f e g ficam sempre acesos e d sempre apagado: o circuito so
    // precisou calcular b e c, que e' o que separa as tres letras.
    const acesos = ['a', 'e', 'f', 'g'];
    if (b) acesos.push('b');
    if (c) acesos.push('c');
    acender(acesos);

    const desenho = DESENHOS[acesos.slice().sort().join('')];
    elValor.textContent = nota;
    elLetra.textContent = desenho ? desenho.letra : '?';
    elEq.textContent = `b = ${b}   c = ${c}`;
    elNome.textContent = nota > 10
      ? 'acima de 10 não é nota, então o circuito nunca precisou decidir'
      : (desenho ? desenho.nome : 'combinação de segmentos sem letra');
  }

  function montar() {
    raiz.querySelectorAll('[data-seg]').forEach(el => {
      segmentos[el.dataset.seg] = el;
    });
    raiz.querySelectorAll('[data-bit]').forEach(el => {
      el.addEventListener('change', atualizar);
    });
    atualizar();
  }

  montar();
})();
