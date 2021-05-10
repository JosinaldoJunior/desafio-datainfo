FROM node:latest as angular
WORKDIR /app
COPY package.json /app
RUN npm install -g npm@7.11.2
RUN npm install --silent
COPY . .
RUN npm run buildhomol

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/datainfo-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN sudo apt-get install nginx-extras

# docker build -t .
