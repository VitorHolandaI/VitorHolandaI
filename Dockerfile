FROM jekyll/jekyll:latest
WORKDIR /srv/jekyll
COPY --chown=jekyll:jekyll . .
RUN rm -f Gemfile.lock
RUN bundle install
RUN rm -rf _site
