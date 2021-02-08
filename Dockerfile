FROM node:14-slim

WORKDIR /app

COPY package*.json ./

RUN ls

RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]