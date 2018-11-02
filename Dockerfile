FROM trajoewu/goall-image

WORKDIR /root/goall-server/code

COPY . .

RUN npm i

EXPOSE 8000

CMD [ "sh", "scripts/start.sh" ]