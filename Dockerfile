FROM node:19

ENV APP_ROOT /src
ENV HOST 0.0.0.0
ENV PORT 3000

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}

COPY package*.json ./
RUN npm ci

COPY . ${APP_ROOT}
RUN npm run generate
