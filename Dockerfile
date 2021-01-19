FROM node:10-alpine as build-step
RUN mkdir -p /dive-deploy
WORKDIR /dive-deploy
COPY package*.json /dive-deploy/
RUN npm install
COPY . /dive-deploy/
CMD npm start
