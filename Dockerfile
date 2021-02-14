FROM node:10-alpine as build-step
RUN apk update && \
    apk upgrade && \
    apk --no-cache add git
RUN git clone https://github.com/biomedbigdata/Dive.git
WORKDIR /Dive
RUN npm install && \
    npm run build --prod


FROM node:10-alpine as run-step
RUN mkdir -p /dive-deploy
COPY . /dive-deploy/
WORKDIR /dive-deploy
COPY --from=build-step /Dive/dist ./dist
RUN npm install
CMD npm start
