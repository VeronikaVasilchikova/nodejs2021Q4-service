FROM node

WORKDIR /hapi-service

COPY package.json /hapi-service/

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
