FROM node:14
ARG GIT_BOT_TOKEN

WORKDIR /tmp/workspace

COPY package.json .
COPY yarn.lock .

RUN echo @wings-software:registry=https://npm.pkg.github.com > .npmrc
RUN echo "//npm.pkg.github.com/:_authToken="$GIT_BOT_TOKEN >> .npmrc
RUN echo always-auth=true >> .npmrc
RUN yarn install
