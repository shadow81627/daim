FROM node:18
# Install Chrome and its dependencies
RUN apt-get update && apt-get install --no-install-recommends -y wget=1.10 gnupg2=2.2.41 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  && apt-get update \
  && apt-get install -y google-chrome-stable
# Set environment variables
ENV CHROME_BIN=/usr/bin/google-chrome \
    CHROME_PATH=/usr/lib/google-chrome-unstable
# USER node
WORKDIR /src
COPY . .
RUN yarn install --immutable --immutable-cache
RUN yarn build
COPY --chown=node . .
ENV HOST 0.0.0.0
EXPOSE 3000
CMD [ "yarn", "start" ]
