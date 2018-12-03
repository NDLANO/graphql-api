FROM node:10-alpine as builder

ENV HOME=/home/app
ENV APP_PATH=$HOME/graphql-api

# Copy necessary files for installing dependencies
COPY yarn.lock package.json tsconfig.json  $APP_PATH/

# Run yarn before src copy to enable better layer caching
WORKDIR $APP_PATH
RUN yarn

COPY src $APP_PATH/src

RUN yarn build

### Run stage
FROM node:10-alpine

RUN npm install pm2 -g
WORKDIR /home/app/graphql-api
COPY --from=builder /home/app/graphql-api/build build

ENV NODE_ENV=production

CMD ["pm2-runtime", "-i", "max", "build/server.js", "|", "bunyan"]
