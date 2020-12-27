FROM node:12.3.1-alpine

RUN apk update && apk add nginx

EXPOSE 80

RUN mkdir -p /usr/bin/front
WORKDIR /usr/bin/front

COPY ./package.json /usr/bin/front/
COPY ./yarn.lock /usr/bin/front/

RUN yarn

COPY . /usr/bin/front/

RUN yarn build

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy config files
# *.conf files in conf.d/ dir get included in main config
COPY ./nginx/default.conf /etc/nginx/conf.d/

RUN mkdir -p /run/nginx

CMD nginx && yarn start