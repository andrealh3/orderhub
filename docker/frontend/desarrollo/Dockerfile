FROM node:latest

WORKDIR /usr/src/app/frontend/

COPY ../../frontend/package*.json ./

RUN yarn

EXPOSE 5173

ENTRYPOINT ["yarn", "dev", "--", "--host", "0.0.0.0"]