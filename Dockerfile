# Stage 1: Generate CV PDFs from markdown using pandoc + LaTeX
FROM pandoc/latex:latest AS pdf-builder
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

# Stage 2: Build Jekyll site with the generated PDFs available as static assets
FROM jekyll/jekyll:latest
WORKDIR /srv/jekyll
COPY --chown=jekyll:jekyll . .
COPY --from=pdf-builder --chown=jekyll:jekyll /data/cv-en.pdf assets/cv-en.pdf
COPY --from=pdf-builder --chown=jekyll:jekyll /data/cv-pt.pdf assets/cv-pt.pdf
RUN rm -f Gemfile.lock
RUN bundle install
