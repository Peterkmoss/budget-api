FROM node:12-slim
WORKDIR /usr/src/app
COPY package.json .
RUN npm i --silent
COPY . .
RUN npm i -g typescript --silent
RUN tsc
EXPOSE 443
EXPOSE 80
CMD [ "npm", "start" ]