---
layout: page
title: "CI"
permalink: /ci/
---

{% assign default_lang = site.default_lang | default: "pt" %}
{% assign ci_posts = site.posts | where_exp:"post","post.path contains '_posts/ci/'" %}

<h2>Circuitos integrados</h2>

<p>Anotações de CI: transistor, CMOS, layout, o que eu desenho no papel e depois
preciso ver em 3D pra acreditar. Sai do grupo de circuitos integrados que eu
participo — é estudo em andamento, não material de aula.</p>

<ul>
  {% for post in ci_posts %}
    {% if post.lang == nil or post.lang == default_lang %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <span>- {{ post.date | date: "%Y-%m-%d" }}</span>
      </li>
    {% endif %}
  {% endfor %}
</ul>
