FROM node:latest AS builder

WORKDIR /usr/src/app/frontend/

COPY ../../frontend/package*.json ./

RUN yarn install

COPY ../../frontend/. ./

RUN yarn build && ls -la /usr/src/app/frontend/dist

FROM nginx:alpine

COPY --from=builder /usr/src/app/frontend/dist /usr/share/nginx/html

COPY /docker/frontend/produccion/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]