FROM node:16.13-alpine

WORKDIR /server

COPY package*.json .

RUN npm install

COPY . .

CMD npm run start:dev
