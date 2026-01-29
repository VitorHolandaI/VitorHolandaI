---
layout: page
title: Projects
permalink: /projects/
---

{% assign projects = site.posts | where_exp:"post","post.path contains 'projects/'" | sort: "date" | reverse %}

{% for project in projects %}
## [{{ project.title }}]({{ project.url }})

{{ project.excerpt }}

{% if project.technologies %}
**Technologies:** {{ project.technologies }}
{% endif %}

<p><a href="{{ project.url }}">Read more →</a></p>
{% endfor %}

