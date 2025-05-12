FROM node:20

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY . /app

RUN npm install
RUN npm run build
