FROM node:alpine

WORKDIR /app

COPY ./package.json ./

RUN npm install
ENV NODE_PATH=/app/node_modules

COPY . .

CMD [ "npm", "run", "start" ]