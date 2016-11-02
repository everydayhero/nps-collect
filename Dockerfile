FROM node:6.2.2

ENV APP=/usr/src/app
RUN mkdir -p $APP
WORKDIR $APP

RUN npm i -g yarn

ADD package.json package.json
RUN yarn

ADD . ./

CMD "/bin/bash"
