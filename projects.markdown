---
layout: page
title: Projetos
permalink: /projects/
---

{% assign default_lang = site.default_lang | default: "pt" %}
{% assign all_projects = site.posts | where_exp:"post","post.path contains 'projects/'" %}
{% assign projects = all_projects | sort: "date" | reverse %}

<div class="project-list">
{% for project in projects %}
  {% if project.lang == nil or project.lang == default_lang %}
    <article class="project-card{% unless project.image %} project-card--text{% endunless %}">
      {% if project.image %}
        {% assign image_src = project.image %}
        {% unless image_src contains "://" %}
          {% assign image_src = image_src | relative_url %}
        {% endunless %}
        <a class="project-card__media" href="{{ project.url | relative_url }}" aria-label="{{ project.title | escape }}">
          <img src="{{ image_src }}" alt="{{ project.image_alt | default: project.title | escape }}" loading="lazy">
        </a>
      {% endif %}

      <div class="project-card__body">
        <h2><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h2>
        <p>{{ project.excerpt | strip_html }}</p>

        {% if project.technologies %}
          {% assign technologies = project.technologies | split: "," %}
          <div class="project-card__tech" aria-label="Tecnologias">
            {% for technology in technologies %}
              <span>{{ technology | strip }}</span>
            {% endfor %}
          </div>
        {% endif %}

        <p><a class="project-card__link" href="{{ project.url | relative_url }}">Ler mais &rarr;</a></p>
      </div>
    </article>
  {% endif %}
{% endfor %}
</div>
