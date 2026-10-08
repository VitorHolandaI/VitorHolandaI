source "https://rubygems.org"

# O site é publicado pelo Dockerfile deste repo (jekyll build + nginx), não pelo
# GitHub Pages. A gem `github-pages` saiu daqui porque ela trazia
# jekyll-remote-theme — que este site não usa — e com ele rubyzip < 3.0,
# vulnerável a path traversal (CVE-2026-85396). O jekyll continua no 3.10 que a
# github-pages 232 fixava; minima e jekyll-seo-tag sobem de patch (2.5.1 -> 2.5.2
# e 2.8.0 -> 2.9.1) porque só o guarda-chuva os segurava.
gem "jekyll", "~> 3.10"
gem "minima", "~> 2.5"
# O jekyll 3 usa kramdown com input GFM por padrão, e o parser mora numa gem
# separada desde o kramdown 2. Vinha de carona na github-pages.
gem "kramdown-parser-gfm", "~> 1.1"

# Security pins for transitive deps flagged by Dependabot. Os pins de nokogiri,
# activesupport e faraday saíram junto com a github-pages: nenhuma gem da árvore
# atual depende deles, então fixá-los só instalaria gem que o site não usa.
gem "addressable", ">= 2.8.8"          # ReDoS in templates (vem do jekyll)
gem "rexml", ">= 3.4.1"                # DoS on malformed XML (vem do kramdown)
gem "uri", ">= 1.0.4"                  # CVE-2025-27221 credential leakage bypass

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag", "~> 2.8"       # a tag {% seo %} em _includes/head.html
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
