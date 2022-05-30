# Install dependencies only when needed
FROM node:16-alpine AS deps

WORKDIR /app

#npm install 을 위해, package.json과 package-lock.json을 먼저 copy해둠
COPY package*.json /app/

RUN npm install

COPY . /app

EXPOSE 4001

#컨테이너가 켜지자마자 실행할 명령어 
#npm start : package.json의 scripts에 있는 start 명령어를 실행

RUN npm install pm2 -g

CMD ["npm", "startPro"]