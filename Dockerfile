FROM node:12
WORKDIR /usr/src/app
COPY package.json .
RUN npm i
COPY . .
RUN npm i -g typescript --silent
RUN tsc
EXPOSE 443
EXPOSE 80
CMD [ "npm", "start" ]