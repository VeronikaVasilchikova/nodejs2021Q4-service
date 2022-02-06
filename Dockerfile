FROM node:16.13-alpine

WORKDIR /server

COPY package*.json .

RUN npm install

COPY . .

CMD npm run start:dev


# ARG NODE_VERSION
# FROM node:${NODE_VERSION}
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# ARG PORT
# ENV PORT ${PORT}
# EXPOSE ${PORT}
# CMD ["nest build && npm run migrations:run && cross-env NODE_ENV=docker nest start"]
