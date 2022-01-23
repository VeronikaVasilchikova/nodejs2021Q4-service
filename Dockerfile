FROM node:16.13-alpine

WORKDIR /hapi-server

COPY package-docker.json ./package.json

RUN npm install --production

COPY . .

CMD ["nodemon", "src/server.ts", "development", "--exitcrash", "-L"]
