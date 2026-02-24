FROM ruby:3.2-bookworm

# Install dependencies
RUN apt-get update \
    && apt-get install -y \
        build-essential \
        nodejs \
        wkhtmltopdf \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Jekyll
RUN gem install jekyll bundler

WORKDIR /srv/jekyll

COPY . .

RUN bundle install

# Build site + generate PDF
RUN jekyll build \
    && mkdir -p assets \
    && wkhtmltopdf --enable-local-file-access _site/cv/index.html assets/cv.pdf \
    && rm -rf _site

EXPOSE 4000

CMD ["jekyll", "serve", "--host", "0.0.0.0"]
