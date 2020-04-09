FROM node:12
WORKDIR /usr/src/app
COPY package.json .
RUN npm i --silent
COPY . .
RUN npm i -g typescript --silent
RUN tsc
EXPOSE 3000
CMD ["node", "./build/server/server.js" ]