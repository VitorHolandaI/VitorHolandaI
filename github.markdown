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

<script src="{{ '/assets/github.js' | relative_url }}" defer></script>
