FROM node:16.13-alpine

WORKDIR /hapi-server

# COPY package*.json ./
COPY package-docker.json ./package.json

RUN npm install --production

COPY . .

CMD ["npm", "run", "dev"]
