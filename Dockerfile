FROM node:12
WORKDIR /usr/src/app
COPY package.json .
RUN npm i --silent
COPY . .
RUN npm i -g typescript serve --silent
RUN tsc
EXPOSE 5000
CMD ["serve", "-s", "build" ]