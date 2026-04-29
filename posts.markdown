---
layout: page
title: "Posts"
permalink: /posts/
---

{% assign default_lang = site.default_lang | default: "pt" %}

<h2>Posts</h2>

<ul>
  {% for post in site.posts %}
    {% if post.lang == nil or post.lang == default_lang %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <span>— {{ post.date | date: "%Y-%m-%d" }}</span>
      </li>
    {% endif %}
  {% endfor %}
</ul>
