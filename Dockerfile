FROM node:lts-alpine as build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./

RUN npm run build

FROM nginx:1.17.0-alpine

RUN rm -rf /var/www/*

COPY --from=build /app/dist /var/www

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]




