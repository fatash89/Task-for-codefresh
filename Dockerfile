FROM node:8

WORKDIR /var/www/test

COPY package.json package.json

RUN npm install mocha -g

RUN npm install

COPY . .

EXPOSE 5002

CMD [ "npm", "run", "start" ]