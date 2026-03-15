FROM node:20-slim

WORKDIR /app

RUN npm config set registry https://registry.npmjs.org/

COPY package*.json ./
RUN npm install --verbose

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
