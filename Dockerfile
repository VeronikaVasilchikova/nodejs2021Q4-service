FROM node:16.13-alpine

WORKDIR /server

COPY package*.json .

RUN npm install

COPY . .

# CMD ["nest", "start", "--watch"]
CMD npm run start:dev
