FROM node:19 AS builder
WORKDIR /app
COPY ./package.json ./
COPY .env.production .env
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]