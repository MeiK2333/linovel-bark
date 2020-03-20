FROM node:13-alpine

RUN apk add --no-cache git

COPY . /app

WORKDIR /app

RUN rm -rf node_modules && \
    npm install -g ts-node typescript @types/node -registry=https://registry.npm.taobao.org && \
    npm install -registry=https://registry.npm.taobao.org

CMD ["ts-node", "src/index.ts"]
