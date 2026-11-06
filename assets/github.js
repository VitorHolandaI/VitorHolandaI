(() => {
  const username = "VitorHolandaI";
  const featuredRepos = [
    {
      name: "ServitorAssisstant",
      focus: "Local LLM voice assistant with FastAPI, LangChain, speech recognition, TTS, SQLite reminders, and Raspberry Pi hardware.",
      stack: ["Python", "FastAPI", "LangChain", "Raspberry Pi"],
      project: "/projects/servitor-assistant/"
    },
    {
      name: "rc-rover",
      focus: "Remote rover using an ESP32, 3D-printed chassis, HTTP controls, and a smartphone for video and network access.",
      stack: ["C++", "ESP32", "Nginx", "3D Printing"],
      project: "/projects/rc-rover/"
    },
    {
      name: "power_ups_front",
      focus: "UPS monitoring dashboard that parses NUT upslog output and displays voltage, load, battery, runtime, and history.",
      stack: ["Python", "Flask", "Chart.js", "NUT"],
      project: "/projects/power-ups-front/"
    },
    {
      name: "meshtastic_file_transfer",
      focus: "File transfer experiment over Meshtastic LoRa links with chunking, metadata, and low-bandwidth constraints.",
      stack: ["Python", "Meshtastic", "LoRa"],
      project: "/projects/meshtastic-file-transfer/"
    },
    {
      name: "mesh_system_pager",
      focus: "Remote Linux system monitor that broadcasts compact CPU, RAM, network, and disk reports over a Meshtastic mesh.",
      stack: ["Python", "psutil", "Meshtastic"],
      project: "/projects/mesh-system-pager/"
    },
    {
      name: "task-tracker",
      focus: "Nim command-line task manager with JSON storage, recurring tasks, due dates, and CI releases.",
      stack: ["Nim", "CLI", "JSON"],
      project: "/projects/task-tracker/"
    }
  ];

  const formatDate = (value) => {
    if (!value) return "No activity";
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).format(new Date(value));
  };

  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  };

  const escapeHtml = (value) => String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const createMeta = (items) => items
    .filter(Boolean)
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("");

  const featuredStats = (repo) => [
    repo.language,
    `${repo.stargazers_count || 0} stars`,
    `${repo.forks_count || 0} forks`,
    `Updated ${formatDate(repo.pushed_at)}`
  ];

  const featuredMarkup = (featured, repos) => {
    const repo = repos.find((item) => item.name === featured.name) || {};
    const description = featured.focus || repo.description || "Public GitHub repository.";
    const repoUrl = repo.html_url || `https://github.com/${username}/${featured.name}`;
    return `
      <article class="github-repo-card">
        <div class="github-repo-card__topline">
          <h3><a href="${repoUrl}">${featured.name}</a></h3>
          ${featured.project ? `<a class="github-repo-card__project" href="${featured.project}">Project notes</a>` : ""}
        </div>
        <p>${escapeHtml(description)}</p>
        <div class="github-repo-card__meta">${createMeta(featured.stack.concat(featuredStats(repo)))}</div>
      </article>
    `;
  };

  const renderFeatured = (repos) => {
    const target = document.querySelector("[data-github-featured]");
    if (!target) return;
    target.innerHTML = featuredRepos.map((featured) => featuredMarkup(featured, repos)).join("");
  };

  const visibleRepos = (repos) => repos
      .filter((repo) => !repo.fork && repo.name !== username)
      .sort((a, b) => new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0))
      .slice(0, 10);

  const repoMarkup = (repo) => `
      <article class="github-activity-row">
        <div>
          <h3><a href="${repo.html_url}">${escapeHtml(repo.name)}</a></h3>
          <p>${escapeHtml(repo.description || "No repository description yet.")}</p>
        </div>
        <div class="github-activity-row__facts">
          <span>${escapeHtml(repo.language || "Mixed")}</span>
          <span>${repo.stargazers_count} stars</span>
          <span>${repo.forks_count} forks</span>
          <span>${escapeHtml(formatDate(repo.pushed_at))}</span>
        </div>
      </article>
    `;

  const renderRepoList = (repos) => {
    const target = document.querySelector("[data-github-repos]");
    if (!target) return;
    target.innerHTML = visibleRepos(repos).map(repoMarkup).join("");
  };

  // O github-readme-stats.vercel.app que servia este grafico respondeu
  // 503 DEPLOYMENT_PAUSED, entao as barras saem dos mesmos repositorios que a
  // pagina ja busca. E' a linguagem principal de cada repositorio: contagem de
  // bytes exigiria uma requisicao por repo e estoura o limite nao autenticado.
  const hiddenLanguages = new Set(["html", "css"]);
  const languageLimit = 8;

  const countLanguages = (repos) => {
    const counts = new Map();
    for (const repo of repos) {
      const name = repo.language;
      if (!name || hiddenLanguages.has(name.toLowerCase())) continue;
      counts.set(name, (counts.get(name) || 0) + 1);
    }
    return [...counts].sort((a, b) => b[1] - a[1]).slice(0, languageLimit);
  };

  const languageRow = ([name, count], total) => {
    const share = Math.round((count / total) * 100);
    const repos = count === 1 ? "1 repo" : `${count} repos`;
    return `
      <li class="github-lang">
        <span class="github-lang__name">${escapeHtml(name)}</span>
        <span class="github-lang__track"><span class="github-lang__bar" style="width:${share}%"></span></span>
        <span class="github-lang__share">${escapeHtml(repos)}</span>
      </li>
    `;
  };

  const renderLanguages = (repos) => {
    const target = document.querySelector("[data-github-langs]");
    if (!target) return;
    const ranked = countLanguages(repos);
    if (!ranked.length) {
      target.textContent = "No language is set on the public repositories.";
      return;
    }
    const total = ranked.reduce((sum, item) => sum + item[1], 0);
    target.innerHTML = `<ul class="github-lang-list">${ranked.map((item) => languageRow(item, total)).join("")}</ul>`;
  };

  const requestGitHub = async () => {
    const [profileResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=owner`)
    ]);
    if (!profileResponse.ok || !reposResponse.ok) {
      throw new Error(`GitHub API returned profile=${profileResponse.status}, repos=${reposResponse.status}; expected 2xx`);
    }
    return Promise.all([profileResponse.json(), reposResponse.json()]);
  };

  const renderGitHub = (profile, repos) => {
    const ownRepos = repos.filter((repo) => !repo.fork);
    const avatar = document.querySelector("[data-github-avatar]");
    if (avatar && profile.avatar_url) avatar.src = profile.avatar_url;
    setText("[data-github-bio]", profile.bio || "Linux, DevOps, networking, embedded systems, and practical tools.");
    renderFeatured(ownRepos);
    renderRepoList(ownRepos);
    renderLanguages(ownRepos);
  };

  const renderGitHubError = (error) => {
    console.error(JSON.stringify({ event: "github_api_load_failed", error: String(error) }));
    const target = document.querySelector("[data-github-repos]");
    if (target) {
      target.textContent = "GitHub API data is temporarily unavailable. Featured repository links above still work.";
    }
    const langs = document.querySelector("[data-github-langs]");
    if (langs) {
      langs.textContent = "Language data is temporarily unavailable.";
    }
  };

  const loadGitHub = async () => {
    try {
      const [profile, repos] = await requestGitHub();
      renderGitHub(profile, repos);
    } catch (error) {
      renderGitHubError(error);
    }
  };

  loadGitHub();
})();
