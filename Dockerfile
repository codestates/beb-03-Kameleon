# Install dependencies only when needed
FROM node:16-alpine

WORKDIR /app

COPY ./server/package*.json /app/

RUN yarn install --production

COPY ./server /app

ENV PORT 4001

EXPOSE $PORT

CMD ["yarn", "start"]