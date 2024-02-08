FROM node:20
WORKDIR /usr/app/clean-node-api
COPY package.json .
RUN npm install --only=prod
