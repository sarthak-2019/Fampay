FROM node:16.9.1-alpine
WORKDIR /app
ADD package*.json ./
RUN npm install
ADD server.js ./
CMD node server.js --bind 0.0.0.0:$PORT


