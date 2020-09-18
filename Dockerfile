FROM node:12.3.1-alpine

EXPOSE 3000

RUN mkdir -p /usr/bin/front
WORKDIR /usr/bin/front

COPY ./package.json /usr/bin/front/
COPY ./yarn.lock /usr/bin/front/

RUN yarn

COPY . /usr/bin/front/

RUN yarn build

CMD [ "yarn", "start" ]