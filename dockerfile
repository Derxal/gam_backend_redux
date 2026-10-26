FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]



# Se levanta junto con MySQL desde ../docker-compose.yml:
# cd ..
# docker compose up -d --build
# curl localhost:3000/tasks
