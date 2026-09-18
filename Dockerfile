FROM node:20-alpine

WORKDIR /app

COPY package* /app/
RUN npm i

EXPOSE 8080
