FROM node:20
WORKDIR /usr/app/clean-node-api
COPY package.json .
RUN npm install --only=prod
COPY dist dist
EXPOSE 5000
CMD ["npm", "start"]
