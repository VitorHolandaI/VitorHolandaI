---
layout: page
title: GitHub
permalink: /github/
---

<section class="github-page" data-github-page>
  <header class="github-profile">
    <img class="github-profile__avatar" data-github-avatar src="https://avatars.githubusercontent.com/u/67565234?v=4" alt="Vitor Holanda on GitHub" loading="lazy">
    <div>
      <p class="github-profile__eyebrow">GitHub profile</p>
      <h2>Vitor Holanda</h2>
      <p data-github-bio>Learning through DevOps, Linux, networking, embedded systems, and small tools that solve real problems.</p>
      <div class="github-profile__links">
        <a href="https://github.com/VitorHolandaI">github.com/VitorHolandaI</a>
        <a href="/projects/">Projetos documentados</a>
      </div>
    </div>
  </header>

  <section class="github-section">
    <div class="github-section__heading">
      <h2>Featured repositories</h2>
      <p>Curated projects with working code, hardware notes, infrastructure experiments, and write-ups on this site.</p>
    </div>
    <div class="github-featured" data-github-featured>
      <article class="github-repo-card">
        <h3><a href="https://github.com/VitorHolandaI/ServitorAssisstant">ServitorAssisstant</a></h3>
        <p>Distributed voice assistant with local LLM tooling, speech recognition, TTS, and a Raspberry Pi interface.</p>
        <div class="github-repo-card__meta"><span>Python</span><span>FastAPI</span><span>Raspberry Pi</span></div>
      </article>
      <article class="github-repo-card">
        <h3><a href="https://github.com/VitorHolandaI/rc-rover">rc-rover</a></h3>
        <p>ESP32 rover with a 3D-printed chassis, phone-based video stream, and remote control over HTTP.</p>
        <div class="github-repo-card__meta"><span>ESP32</span><span>C++</span><span>3D Printing</span></div>
      </article>
      <article class="github-repo-card">
        <h3><a href="https://github.com/VitorHolandaI/power_ups_front">power_ups_front</a></h3>
        <p>Flask dashboard for UPS metrics collected with Network UPS Tools and rendered as operational charts.</p>
        <div class="github-repo-card__meta"><span>Flask</span><span>Chart.js</span><span>NUT</span></div>
      </article>
    </div>
  </section>

  <section class="github-section">
    <div class="github-section__heading">
      <h2>Live repository activity</h2>
      <p>Recent public repositories pulled from the GitHub API. Forks and the profile repository are filtered out.</p>
    </div>
    <div class="github-repo-list" data-github-repos>
      <p class="github-loading">Loading repositories from GitHub...</p>
    </div>
  </section>

  <section class="github-section">
    <div class="github-section__heading">
      <h2>Top languages</h2>
      <p>Generated from public repositories, with HTML and CSS hidden so the chart focuses on programming languages.</p>
    </div>
    <div class="github-stats-cards">
      <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=VitorHolandaI&langs_count=8&layout=compact&hide=html,css&theme=default&hide_border=true" alt="Most used programming languages on Vitor Holanda's GitHub profile" loading="lazy">
    </div>
  </section>
</section>

<script>
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

  const renderFeatured = (repos) => {
    const target = document.querySelector("[data-github-featured]");
    if (!target) return;

    target.innerHTML = featuredRepos.map((featured) => {
      const repo = repos.find((item) => item.name === featured.name) || {};
      const description = featured.focus || repo.description || "Public GitHub repository.";
      const repoUrl = repo.html_url || `https://github.com/${username}/${featured.name}`;
      const stats = [
        repo.language,
        `${repo.stargazers_count || 0} stars`,
        `${repo.forks_count || 0} forks`,
        `Updated ${formatDate(repo.pushed_at)}`
      ];

      return `
        <article class="github-repo-card">
          <div class="github-repo-card__topline">
            <h3><a href="${repoUrl}">${featured.name}</a></h3>
            ${featured.project ? `<a class="github-repo-card__project" href="${featured.project}">Project notes</a>` : ""}
          </div>
          <p>${escapeHtml(description)}</p>
          <div class="github-repo-card__meta">${createMeta(featured.stack.concat(stats))}</div>
        </article>
      `;
    }).join("");
  };

  const renderRepoList = (repos) => {
    const target = document.querySelector("[data-github-repos]");
    if (!target) return;

    const visibleRepos = repos
      .filter((repo) => !repo.fork && repo.name !== username)
      .sort((a, b) => new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0))
      .slice(0, 10);

    target.innerHTML = visibleRepos.map((repo) => `
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
    `).join("");
  };

  const loadGitHub = async () => {
    try {
      const [profileResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=owner`)
      ]);

      if (!profileResponse.ok || !reposResponse.ok) {
        throw new Error("GitHub API request failed");
      }

      const profile = await profileResponse.json();
      const repos = await reposResponse.json();
      const ownRepos = repos.filter((repo) => !repo.fork);
      const totalStars = ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const totalForks = ownRepos.reduce((sum, repo) => sum + repo.forks_count, 0);

      const avatar = document.querySelector("[data-github-avatar]");
      if (avatar && profile.avatar_url) avatar.src = profile.avatar_url;

      setText("[data-github-bio]", profile.bio || "Linux, DevOps, networking, embedded systems, and practical tools.");
      renderFeatured(ownRepos);
      renderRepoList(ownRepos);
    } catch (error) {
      const target = document.querySelector("[data-github-repos]");
      if (target) {
        target.innerHTML = '<p class="github-loading">GitHub API data is temporarily unavailable. Featured repository links above still work.</p>';
      }
    }
  };

  loadGitHub();
})();
</script>
