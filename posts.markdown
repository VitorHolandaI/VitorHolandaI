---
layout: page
title: "All Posts"
permalink: /posts/
---

<h2>All Posts</h2>

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <span>— {{ post.date | date: "%Y-%m-%d" }}</span>
    </li>
  {% endfor %}
</ul>

