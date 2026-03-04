# Stage 1: Generate CV PDF from markdown using pandoc + LaTeX
FROM pandoc/latex:latest AS pdf-builder
WORKDIR /data
COPY cv.markdown .
# Strip Jekyll front matter (--- block) before passing to pandoc,
# because the --- used as <hr> in the body confuses pandoc's YAML parser.
RUN awk '
    NR==1 && /^---$/ { in_fm=1; next }
    in_fm && /^---$/ { in_fm=0; next }
    in_fm            { next }
    /^---$/          { print ""; print "---"; print ""; next }
    { print }
' cv.markdown | pandoc \
    --from commonmark \
    --pdf-engine=xelatex \
    -V geometry:margin=2cm \
    -V fontsize=11pt \
    -V colorlinks=true \
    -V linkcolor=blue \
    -V urlcolor=blue \
    -V title="Curriculum Vitae" \
    -o cv.pdf

# Stage 2: Build Jekyll site with the generated PDF available as a static asset
FROM jekyll/jekyll:latest
WORKDIR /srv/jekyll
COPY --chown=jekyll:jekyll . .
COPY --from=pdf-builder --chown=jekyll:jekyll /data/cv.pdf assets/cv.pdf
RUN rm -f Gemfile.lock
RUN bundle install
