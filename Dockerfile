FROM node:6.2.2

ENV APP=/usr/src/app
RUN mkdir -p $APP
WORKDIR $APP

RUN npm i -g yarn

ADD package.json yarn.lock ./
RUN yarn

ADD . ./

CMD "/bin/bash"
