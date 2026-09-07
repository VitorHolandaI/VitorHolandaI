(function runSecretMetricsEngine() {
  var username = "VitorHolandaI";
  var badgeUrl = "https://komarev.com/ghpvc/?username=" + username;
  var proxyUrl = "/api/github-views";

  console.log("%c=======================================================", "color: #475569;");
  console.log(
    "%c[ ACCESS GRANTED: TOP SECRET OPERATIONAL METRICS ]",
    "color: #22c55e; font-size: 15px; font-weight: bold; background: #052e16; padding: 6px 12px; border-radius: 4px; border: 1px solid #22c55e;"
  );
  console.log("%c🔥 Badge em tempo real no Console:", "color: #38bdf8; font-size: 13px; font-weight: bold;");
  console.log(
    "%c       ",
    "font-size: 1px; padding: 12px 55px; background: url('" + badgeUrl + "') no-repeat center; background-size: contain;"
  );
  console.log("%c🔗 Link do badge: %c" + badgeUrl, "color: #94a3b8; font-size: 12px;", "color: #38bdf8; font-size: 12px; text-decoration: underline;");
  console.log("%c🛡️ Modo Stealth: %cATIVO (Badge oculto no README)", "color: #94a3b8; font-size: 12px;", "color: #22c55e; font-weight: bold;");

  fetch(proxyUrl, { cache: "no-store" })
    .then(function(res) {
      if (!res.ok) throw new Error("Status " + res.status);
      return res.text();
    })
    .then(function(svgText) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(svgText, "image/svg+xml");
      var texts = doc.querySelectorAll("text");
      var count = texts.length > 0 ? texts[texts.length - 1].textContent.trim() : null;
      if (count) {
        window.githubViews = count;
        console.log(
          "%c📊 Contagem exata extraida: %c" + count + " visitas",
          "color: #94a3b8; font-size: 14px;",
          "color: #facc15; font-size: 18px; font-weight: bold;"
        );
      }
    })
    .catch(function() {
      // Ignora erro no ambiente local sem proxy
    });

  console.log("%c💡 Pressione a tecla [ M ] ou clique no badge do topo para ver o HUD na tela!", "color: #eab308; font-size: 11px;");
  console.log("%c=======================================================", "color: #475569;");

  function toggleHud() {
    var hud = document.getElementById("secret-hud");
    if (hud) hud.classList.toggle("active");
  }

  var clicks = 0;
  var badge = document.getElementById("btn-reveal-badge");
  if (badge) {
    badge.addEventListener("click", function() {
      clicks++;
      if (clicks >= 3) {
        toggleHud();
        clicks = 0;
      }
    });
  }

  window.addEventListener("keydown", function(e) {
    if (e.key === "m" || e.key === "M") {
      toggleHud();
    }
  });
})();
