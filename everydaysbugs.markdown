---
layout: page
title: "Everydaysbugs"
permalink: /everydaysbugs/
---

{% assign default_lang = site.default_lang | default: "pt" %}
{% assign bugs = site.posts | where_exp:"post","post.path contains 'everydaysbugs/'" %}

<h2>Everydaysbugs</h2>

<p>Bug que eu cacei, achei massa, e escrevi pra não esquecer. O caminho errado
inteiro, não só a resposta: as teorias que eu matei, o que derrubou cada uma, e
o comando barato que eu devia ter rodado na primeira hora.</p>

<ul>
  {% for post in bugs %}
    {% if post.lang == nil or post.lang == default_lang %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <span>- {{ post.date | date: "%Y-%m-%d" }}</span>
      </li>
    {% endif %}
  {% endfor %}
</ul>
