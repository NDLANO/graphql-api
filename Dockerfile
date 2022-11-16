### Build stage
FROM node:16.17-alpine as builder

ENV HOME=/home/app
ENV APP_PATH=$HOME/graphql-api

WORKDIR $APP_PATH

# Copy necessary files for installing dependencies
COPY yarn.lock package.json tsconfig.json  $APP_PATH/

# Run yarn before src copy to enable better layer caching
RUN yarn

COPY src $APP_PATH/src

# Compiles the server into a single file, together with all its dependencies.
RUN yarn ncc

### Run stage
FROM node:16.17-alpine

WORKDIR /home/app/graphql-api
COPY --from=builder /home/app/graphql-api/build/index.js index.js

ENV NODE_ENV=production

CMD ["node index.js '|' bunyan"]
