FROM node:10.13.0-alpine

WORKDIR /root/goall-server/code

COPY . .

RUN apk add curl && \
    npm i && \
    npm i -g nodemon

EXPOSE 8000

CMD [ "sh", "scripts/start.sh" ]