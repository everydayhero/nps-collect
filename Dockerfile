FROM node:6.2.2

ENV APP=/usr/src/app
RUN mkdir -p $APP
WORKDIR $APP

ADD package.json package.json
RUN npm install

ADD . ./

CMD "/bin/bash"
