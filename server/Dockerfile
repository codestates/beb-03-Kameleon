# Install dependencies only when needed
FROM node:16-alpine

WORKDIR /app

#npm install 을 위해, package.json과 package-lock.json을 먼저 copy해둠
COPY package*.json /app/

RUN yarn install --production

COPY . /app

EXPOSE 4001

RUN yarn add pm2 -g

CMD ["yarn", "startPro"]