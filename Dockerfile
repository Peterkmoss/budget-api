FROM node:12
WORKDIR /usr/src/app
COPY package.json .
RUN npm i --silent
EXPOSE 3000
RUN npm i -g typescript --silent
COPY . .
RUN tsc
CMD ["node", "./build/server/server.js" ]