FROM jekyll/jekyll:latest
WORKDIR /srv/jekyll

USER root
RUN apk add --no-cache wkhtmltopdf
USER jekyll

COPY --chown=jekyll:jekyll . .
RUN rm -f Gemfile.lock
RUN bundle install

# Build site, generate CV PDF, then clean _site for runtime
RUN jekyll build \
    && mkdir -p assets \
    && wkhtmltopdf --enable-local-file-access _site/cv/index.html assets/cv.pdf \
    && rm -rf _site
