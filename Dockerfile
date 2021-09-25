FROM node:14-alpine as base

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

WORKDIR /usr/src/app

ADD package*.json ./

RUN npm install

FROM base
COPY . .

EXPOSE 3978

CMD ["npm", "start"]
