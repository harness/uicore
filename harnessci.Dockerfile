FROM zenika/alpine-chrome:89-with-node-14
ARG GIT_BOT_TOKEN

WORKDIR /tmp/workspace

COPY package.json .
COPY yarn.lock .

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser


RUN echo @wings-software:registry=https://npm.pkg.github.com > .npmrc
RUN echo "//npm.pkg.github.com/:_authToken="$GIT_BOT_TOKEN >> .npmrc
RUN echo always-auth=true >> .npmrc
RUN yarn install
