FROM node:12

# Create app directory
WORKDIR /usr/app

COPY package*.json ./

RUN npm i

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
