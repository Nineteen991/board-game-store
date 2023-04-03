FROM node:18-slim

WORKDIR /home/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]