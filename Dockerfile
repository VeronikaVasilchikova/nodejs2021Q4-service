# FROM node:lts-alpine3.14 as base
FROM node:16.13-alpine as base

WORKDIR /hapi-server

COPY package*.json ./

RUN npm install

FROM base as dev

COPY . .

CMD ["npm", "run", "dev"]
