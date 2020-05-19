FROM node:12.3.1-alpine

EXPOSE 3000

RUN mkdir -p /usr/bin/front
WORKDIR /usr/bin/front

COPY ./package.json /usr/bin/front/
COPY ./yarn.json /usr/bin/front/

RUN yarn install

COPY . /usr/bin/front/

RUN npm run build

CMD [ "npm", "start" ]