FROM node:12.19.0

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 5000

CMD [ "npm","start"]
