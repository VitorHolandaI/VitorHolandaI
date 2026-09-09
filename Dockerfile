# Stage 1: Generate CV PDFs from markdown using pandoc + LaTeX
FROM pandoc/latex@sha256:f5e8002f6cdec21dcd000b23817fd385d4db8234fbbbb54c43c2c173d9fa2d71 AS pdf-builder
WORKDIR /data
COPY cv.markdown cv-pt.markdown ./

# Strip Jekyll front matter then convert to PDF (runs for both files)
RUN awk 'NR==1&&/^---$/{f=1;next} f&&/^---$/{f=0;next} f{next} /^---$/{print"";print"---";print"";next} {print}' cv.markdown | pandoc \
    --from commonmark \
    --pdf-engine=xelatex \
    -V geometry:margin=2cm \
    -V fontsize=11pt \
    -V colorlinks=true \
    -V linkcolor=blue \
    -V urlcolor=blue \
    -V title="Curriculum Vitae" \
    -o cv-en.pdf

RUN awk 'NR==1&&/^---$/{f=1;next} f&&/^---$/{f=0;next} f{next} /^---$/{print"";print"---";print"";next} {print}' cv-pt.markdown | pandoc \
    --from commonmark \
    --pdf-engine=xelatex \
    -V geometry:margin=2cm \
    -V fontsize=11pt \
    -V colorlinks=true \
    -V linkcolor=blue \
    -V urlcolor=blue \
    -V title="Currículo" \
    -o cv-pt.pdf

# Stage 2: Build the static site with the generated PDFs available as assets
FROM ruby:3.3.12-slim-trixie@sha256:005ed5a2d39180f571c1a6041513803651b68269ee1e735ae7f2f29d983f87b0 AS site-builder
WORKDIR /srv/jekyll
RUN apt-get update && apt-get install -y --no-install-recommends build-essential git && rm -rf /var/lib/apt/lists/*
COPY Gemfile Gemfile.lock ./
RUN bundle config set deployment true && bundle install
COPY . .
COPY --from=pdf-builder /data/cv-en.pdf assets/cv-en.pdf
COPY --from=pdf-builder /data/cv-pt.pdf assets/cv-pt.pdf
RUN JEKYLL_ENV=production bundle exec jekyll build --destination /tmp/site

# Stage 3: Serve only generated static files from an unprivileged nginx
FROM nginxinc/nginx-unprivileged:1.30.4-alpine@sha256:442753882674b49ae2c1de83ed67896131c0777f56df5005e356e62bc3f7e7ce
COPY --chown=101:101 nginx-default.conf /etc/nginx/conf.d/default.conf
COPY --chown=101:101 nginx-security-headers.conf /etc/nginx/security-headers.conf
COPY --from=site-builder --chown=101:101 /tmp/site /usr/share/nginx/html
USER 101:101
EXPOSE 8080
ENTRYPOINT []
CMD ["nginx", "-g", "daemon off;"]
