FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 9000
CMD ["sh", "-c", "npm run test && npm run start"]